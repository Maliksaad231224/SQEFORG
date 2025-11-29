# SQEForge MVP - Product Requirements Document

## Executive Summary

Transform SQEForge from a frontend-only mock application into a production-ready MVP using Next.js, Turso (SQLite), and Stripe. This document outlines the technical architecture, feature requirements, and implementation roadmap.

---

## 1. Project Overview

### Vision
SQEForge is a comprehensive exam preparation platform for law students, offering:
- Question banks and practice tests
- Mock exams and simulators
- AI-powered content generation
- Gamification and progress tracking
- Admin tools for content management

### Tech Stack
- **Frontend/Backend**: Next.js (App Router)
- **Database**: Turso (SQLite with LibSQL)
- **Payment Processing**: Stripe
- **Authentication**: NextAuth.js v5 (optional but recommended)
- **UI Library**: React with Tailwind CSS (existing)
- **State Management**: TanStack Query (React Query)

---

## 2. Architecture Overview

### 2.1 Project Structure
```
sqeforge/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes & integrations
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── users/                # User management
│   │   ├── questions/            # Question CRUD
│   │   ├── mocks/                # Mock exam endpoints
│   │   ├── stripe/               # Payment processing
│   │   └── ai/                   # LLM integration
│   ├── (auth)/                   # Auth layout group
│   │   ├── login/
│   │   └── signup/
│   ├── (dashboard)/              # Protected routes
│   │   ├── dashboard/
│   │   ├── questions/
│   │   ├── mocks/
│   │   └── admin/
│   └── layout.tsx                # Root layout
├── lib/
│   ├── db/                       # Turso client & queries
│   ├── auth/                     # Auth utilities
│   ├── stripe/                   # Stripe helpers
│   ├── api-client.ts             # Server-side API utils
│   └── utils.ts                  # Shared utilities
├── components/
│   ├── ui/                       # Shadcn components
│   ├── admin/                    # Admin-specific components
│   ├── dashboard/                # Dashboard components
│   └── [feature]/                # Feature components
├── db/
│   ├── schema.sql                # Database schema
│   └── migrations/               # DB migrations
├── public/                       # Static assets
├── .env.local                    # Environment variables
└── package.json
```

---

## 3. Database Schema (Turso/SQLite)

### 3.1 Core Tables

#### Users
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user', -- 'user', 'admin'
  subscription_tier TEXT DEFAULT 'starter', -- 'starter', 'pro', 'ultimate'
  mock_exam_credits INT DEFAULT 10,
  ai_credits INT DEFAULT 100,
  terms_accepted BOOLEAN DEFAULT false,
  terms_accepted_date DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
```

#### Subscriptions
```sql
CREATE TABLE subscriptions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  stripe_subscription_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  plan_type TEXT, -- 'starter', 'pro', 'ultimate'
  status TEXT, -- 'active', 'cancelled', 'past_due'
  current_period_start DATETIME,
  current_period_end DATETIME,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_stripe_id ON subscriptions(stripe_subscription_id);
```

#### Questions
```sql
CREATE TABLE questions (
  id TEXT PRIMARY KEY,
  subject TEXT,
  topic TEXT,
  question_text TEXT NOT NULL,
  question_type TEXT, -- 'mcq', 'essay', 'fill-blank'
  difficulty TEXT, -- 'easy', 'medium', 'hard'
  created_by TEXT,
  is_ai_generated BOOLEAN DEFAULT false,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE INDEX idx_questions_subject ON questions(subject);
CREATE INDEX idx_questions_topic ON questions(topic);
CREATE INDEX idx_questions_difficulty ON questions(difficulty);
```

#### Question Answers (MCQ Options)
```sql
CREATE TABLE question_answers (
  id TEXT PRIMARY KEY,
  question_id TEXT NOT NULL,
  answer_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT false,
  explanation TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

CREATE INDEX idx_answers_question_id ON question_answers(question_id);
```

#### Mock Exams
```sql
CREATE TABLE mock_exams (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  subject TEXT,
  total_questions INT,
  duration_minutes INT,
  passing_score INT,
  created_by TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

CREATE INDEX idx_mocks_created_by ON mock_exams(created_by);
CREATE INDEX idx_mocks_subject ON mock_exams(subject);
```

#### Mock Exam Questions
```sql
CREATE TABLE mock_exam_questions (
  id TEXT PRIMARY KEY,
  mock_exam_id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  sequence_order INT,
  FOREIGN KEY (mock_exam_id) REFERENCES mock_exams(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES questions(id)
);

CREATE INDEX idx_mock_questions_mock_id ON mock_exam_questions(mock_exam_id);
```

#### Exam Attempts
```sql
CREATE TABLE exam_attempts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  mock_exam_id TEXT NOT NULL,
  score INT,
  total_questions INT,
  correct_answers INT,
  time_taken_seconds INT,
  status TEXT, -- 'in_progress', 'completed', 'abandoned'
  started_at DATETIME,
  completed_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (mock_exam_id) REFERENCES mock_exams(id)
);

CREATE INDEX idx_attempts_user_id ON exam_attempts(user_id);
CREATE INDEX idx_attempts_mock_id ON exam_attempts(mock_exam_id);
```

#### User Answer Logs
```sql
CREATE TABLE user_answer_logs (
  id TEXT PRIMARY KEY,
  exam_attempt_id TEXT NOT NULL,
  question_id TEXT NOT NULL,
  user_answer_id TEXT,
  is_correct BOOLEAN,
  time_spent_seconds INT,
  flagged BOOLEAN DEFAULT false,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (exam_attempt_id) REFERENCES exam_attempts(id),
  FOREIGN KEY (question_id) REFERENCES questions(id)
);

CREATE INDEX idx_answer_logs_attempt_id ON user_answer_logs(exam_attempt_id);
```

#### Study Notes
```sql
CREATE TABLE study_notes (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  question_id TEXT,
  title TEXT NOT NULL,
  content TEXT,
  tags TEXT, -- JSON array stored as string
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_notes_user_id ON study_notes(user_id);
```

#### Flash Cards
```sql
CREATE TABLE flash_cards (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  deck_id TEXT,
  front_text TEXT NOT NULL,
  back_text TEXT NOT NULL,
  difficulty TEXT DEFAULT 'medium',
  review_count INT DEFAULT 0,
  last_reviewed_at DATETIME,
  next_review_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_cards_user_id ON flash_cards(user_id);
```

#### AI Credit Log
```sql
CREATE TABLE ai_credit_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  action TEXT, -- 'generate_question', 'generate_exam', 'audit_question'
  credits_used INT,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_credit_logs_user_id ON ai_credit_logs(user_id);
```

#### Study Logs
```sql
CREATE TABLE study_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  activity_type TEXT, -- 'question_practice', 'mock_exam', 'note_creation'
  duration_minutes INT,
  questions_attempted INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_study_logs_user_id ON study_logs(user_id);
```

---

## 4. Authentication & Authorization

### 4.1 Implementation
- Use **NextAuth.js v5** or custom JWT-based auth
- Email/Password authentication
- Optional: Google OAuth for quick signup
- Session management with secure HTTP-only cookies
- Role-based access control (RBAC)

### 4.2 Protected Routes
```
/dashboard/*              -- Requires authentication
/admin/*                 -- Requires 'admin' role
/api/protected/*         -- Requires authentication
/api/admin/*             -- Requires 'admin' role
```

### 4.3 Public Routes
```
/                        -- Homepage
/login
/signup
/terms-and-conditions
/privacy-policy
```

---

## 5. Payment & Subscription (Stripe Integration)

### 5.1 Subscription Plans

#### Starter (Free)
- Price: $0/month
- Mock Exam Credits: 10/month
- AI Credits: 100/month
- Features: Basic question bank, limited mocks

#### Pro
- Price: $29/month or $290/year
- Mock Exam Credits: 50/month
- AI Credits: 500/month
- Features: All starter + advanced tools, progress tracking

#### Ultimate
- Price: $99/month or $990/year
- Mock Exam Credits: Unlimited
- AI Credits: Unlimited
- Features: All pro + admin tools, priority support

### 5.2 Stripe Integration Points

#### Endpoints Required
- `POST /api/stripe/create-checkout-session` -- Create subscription
- `POST /api/stripe/webhook` -- Handle Stripe events
- `GET /api/stripe/customer-portal` -- Billing management
- `POST /api/stripe/cancel-subscription` -- Cancel subscription

#### Webhook Events to Handle
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

---

## 6. API Endpoints Structure

### 6.1 Authentication Endpoints
```
POST   /api/auth/signup              -- User registration
POST   /api/auth/login               -- User login
POST   /api/auth/logout              -- User logout
POST   /api/auth/refresh-token       -- Refresh session
GET    /api/auth/me                  -- Get current user
POST   /api/auth/update-profile      -- Update user info
```

### 6.2 User Endpoints
```
GET    /api/users/me                 -- Get current user
PUT    /api/users/me                 -- Update current user
GET    /api/users/[id]               -- Get user (admin only)
PUT    /api/users/[id]               -- Update user (admin only)
GET    /api/users                    -- List users (admin only)
DELETE /api/users/[id]               -- Delete user (admin only)
```

### 6.3 Questions Endpoints
```
GET    /api/questions                -- List questions
GET    /api/questions/[id]           -- Get question
POST   /api/questions                -- Create question (admin)
PUT    /api/questions/[id]           -- Update question (admin)
DELETE /api/questions/[id]           -- Delete question (admin)
GET    /api/questions/search         -- Search questions
POST   /api/questions/bulk-create    -- Bulk create (admin)
```

### 6.4 Mock Exams Endpoints
```
GET    /api/mocks                    -- List mock exams
GET    /api/mocks/[id]               -- Get mock exam
POST   /api/mocks                    -- Create mock (admin)
PUT    /api/mocks/[id]               -- Update mock (admin)
DELETE /api/mocks/[id]               -- Delete mock (admin)
POST   /api/mocks/[id]/start         -- Start exam attempt
POST   /api/mocks/[id]/submit        -- Submit exam
GET    /api/mocks/[id]/results       -- Get exam results
```

### 6.5 AI Endpoints
```
POST   /api/ai/generate-questions    -- Generate questions (paid)
POST   /api/ai/generate-exam         -- Generate exam (paid)
POST   /api/ai/audit-questions       -- Audit questions (paid)
POST   /api/ai/generate-notes        -- Generate study notes (paid)
GET    /api/ai/credit-balance        -- Get AI credit balance
```

### 6.6 Admin Endpoints
```
GET    /api/admin/users              -- User list with stats
GET    /api/admin/analytics          -- Platform analytics
GET    /api/admin/questions          -- Question management
GET    /api/admin/reports            -- Generate reports
POST   /api/admin/users/[id]/credits -- Adjust user credits
```

---

## 7. Feature Implementation Roadmap

### Phase 1: Core Infrastructure (Weeks 1-2)
- [ ] Next.js project setup with App Router
- [ ] Turso database setup and schema creation
- [ ] Environment configuration
- [ ] Database migration system
- [ ] Basic API structure

### Phase 2: Authentication & Authorization (Weeks 2-3)
- [ ] User registration/login
- [ ] Session management (NextAuth.js or custom JWT)
- [ ] RBAC implementation
- [ ] Protected routes & API endpoints
- [ ] Password hashing (bcrypt)

### Phase 3: User Management (Week 3)
- [ ] User profile pages
- [ ] Profile update functionality
- [ ] User dashboard
- [ ] Admin user management panel

### Phase 4: Stripe Integration (Weeks 3-4)
- [ ] Stripe account setup
- [ ] Subscription plan creation
- [ ] Checkout flow
- [ ] Webhook handling
- [ ] Subscription management UI

### Phase 5: Question Bank (Week 4)
- [ ] Question CRUD operations
- [ ] Question search/filter
- [ ] Bulk question import
- [ ] Question validation

### Phase 6: Mock Exams (Weeks 5-6)
- [ ] Mock exam creation
- [ ] Exam attempt logic
- [ ] Answer submission
- [ ] Score calculation
- [ ] Results analysis

### Phase 7: Study Features (Weeks 6-7)
- [ ] Flash cards system
- [ ] Study notes
- [ ] Progress tracking
- [ ] Spaced repetition

### Phase 8: Admin Tools (Weeks 7-8)
- [ ] Admin dashboard
- [ ] Analytics & reporting
- [ ] Content management
- [ ] User management

### Phase 9: AI Integration (Weeks 8-9)
- [ ] LLM API integration (OpenAI/Claude)
- [ ] Question generation
- [ ] Exam generation
- [ ] Content auditing
- [ ] Credit system

### Phase 10: Testing & Deployment (Weeks 9-10)
- [ ] Unit & integration tests
- [ ] E2E testing
- [ ] Performance optimization
- [ ] Security audit
- [ ] Production deployment

---

## 8. Environment Variables

```env
# Database
DATABASE_URL=libsql://[token]@[org-id]-[db-id].turso.io

# Authentication
NEXTAUTH_SECRET=<random-secret>
NEXTAUTH_URL=http://localhost:3000

# Stripe
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# AI/LLM
OPENAI_API_KEY=sk-...
CLAUDE_API_KEY=sk-...

# Admin Credentials (for testing)
VITE_ADMIN_EMAIL=admin@sqeforge.com
VITE_ADMIN_PASSWORD=Admin@123456
```

---

## 9. Database Migration Strategy

### Using Turso CLI:
```bash
turso db create sqeforge
turso db shell sqeforge < db/schema.sql
```

### Using Migration Files:
```
db/migrations/
├── 001_initial_schema.sql
├── 002_add_subscriptions.sql
├── 003_add_indexes.sql
└── ...
```

### Node.js Migration Script:
Create `/lib/db/migrations.ts` to run migrations programmatically.

---

## 10. Testing Strategy

### Unit Tests
- API route handlers
- Database queries
- Authentication logic
- Payment processing logic

### Integration Tests
- User registration → Login → Access Dashboard
- Mock exam creation → Attempt → Submission
- Subscription creation → Payment → Access features

### E2E Tests (Playwright)
- Complete user journey
- Admin workflows
- Payment flows

### Tools
- Jest for unit tests
- Vitest for faster testing
- Playwright for E2E
- Testing Library for component tests

---

## 11. Security Considerations

- [ ] HTTPS enforced in production
- [ ] CSRF protection
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS protection
- [ ] Rate limiting on API endpoints
- [ ] Password hashing with bcrypt
- [ ] Secure headers (CSP, X-Frame-Options, etc.)
- [ ] API key rotation
- [ ] Sensitive data encryption
- [ ] Regular security audits

---

## 12. Performance Optimization

- [ ] Database query optimization with indexes
- [ ] API response caching (Redis optional)
- [ ] Image optimization
- [ ] Code splitting
- [ ] CDN for static assets
- [ ] Database connection pooling
- [ ] Query result pagination
- [ ] Lazy loading components

---

## 13. Monitoring & Analytics

- [ ] Error tracking (Sentry)
- [ ] Performance monitoring (Vercel Analytics)
- [ ] User analytics
- [ ] Database query monitoring
- [ ] API endpoint monitoring
- [ ] Stripe transaction monitoring

---

## 14. Deployment

### Hosting Options
- **Vercel** (recommended for Next.js)
- AWS EC2/App Runner
- Railway
- Render

### Database Hosting
- **Turso** (SQLite cloud)

### File Storage (if needed)
- AWS S3
- Cloudinary
- Vercel Blob

### CI/CD
- GitHub Actions for automated testing and deployment
- Pre-deployment checks:
  - Linting (ESLint)
  - Type checking (TypeScript)
  - Tests passing
  - Build successful

---

## 15. Data Migration from Current App

### Current App Data Structure
- Uses mock data from `base44Client.js`
- No persistent storage
- In-memory state management

### Migration Plan
1. Export mock data as JSON
2. Create import scripts for Turso
3. Validate data integrity
4. Map old component state to new database schema
5. Update React Query keys to match new API structure

---

## 16. Success Metrics

- User signup completion rate > 80%
- Mock exam completion rate > 60%
- Subscription conversion rate > 5%
- API response time < 200ms
- 99.9% uptime
- Zero critical security issues
- User satisfaction > 4.5/5

---

## 17. Risk & Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|-----------|
| Data loss | Low | Critical | Daily automated backups, database replication |
| Payment processing failures | Low | High | Comprehensive Stripe webhook handling, retry logic |
| Performance issues at scale | Medium | High | Load testing, database optimization, CDN |
| Security vulnerabilities | Medium | Critical | Regular audits, dependency scanning, penetration testing |
| User migration from mock app | High | Medium | Clear documentation, support portal, gradual rollout |

---

## 18. Dependencies to Add

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "@libsql/client": "^0.3.0",
    "next-auth": "^5.0.0",
    "@auth/core": "^0.18.0",
    "stripe": "^14.0.0",
    "@tanstack/react-query": "^5.0.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.1.0",
    "zod": "^3.22.0",
    "@hookform/resolvers": "^3.3.0",
    "react-hook-form": "^7.50.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.0.0",
    "jest": "^29.0.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.1.0",
    "playwright": "^1.40.0"
  }
}
```

---

## 19. Conclusion

This PRD provides a comprehensive roadmap for transforming SQEForge into a production-ready MVP. The architecture is scalable, secure, and aligned with industry best practices. Implementation should follow the phased approach to ensure quality and manageable development cycles.

**Estimated Total Duration**: 10 weeks (with 1 developer)

**Next Steps**:
1. Review and approve this PRD
2. Set up development environment
3. Begin Phase 1 implementation
4. Establish CI/CD pipeline
5. Set up monitoring and error tracking
