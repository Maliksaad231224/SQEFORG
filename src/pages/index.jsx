import Layout from "./Layout.jsx";

import Dashboard from "./Dashboard";

import QuestionBank from "./QuestionBank";

import MockExams from "./MockExams";

import CreateMockExam from "./CreateMockExam";

import TakeExam from "./TakeExam";

import AIGenerator from "./AIGenerator";

import ContactUs from "./ContactUs";

import Packages from "./Packages";

import ReviewBank from "./ReviewBank";

import StudyNotes from "./StudyNotes";

import RevisionPlanner from "./RevisionPlanner";

import ComingSoon from "./ComingSoon";

import ExamReview from "./ExamReview";

import AIGenerateExam from "./AIGenerateExam";

import AdminQuestionEditor from "./AdminQuestionEditor";

import FileManager from "./FileManager";

import PersonalisedPractice from "./PersonalisedPractice";

import ExamTips from "./ExamTips";

import CommunityForum from "./CommunityForum";

import PostDetails from "./PostDetails";

import MindMaps from "./MindMaps";

import FlashCards from "./FlashCards";

import BlackLetterLaw from "./BlackLetterLaw";

import EditApp from "./EditApp";

import AdminNoteGenerator from "./AdminNoteGenerator";

import AIGenerateExamPack from "./AIGenerateExamPack";

import AIBulkExamImporter from "./AIBulkExamImporter";

import CustomMockSession from "./CustomMockSession";

import FeedbackReviews from "./FeedbackReviews";

import ScaledScoring from "./ScaledScoring";

import MockExamAnalytics from "./MockExamAnalytics";

import FinalPrep from "./FinalPrep";

import AdminMockStandardizer from "./AdminMockStandardizer";

import AIGenerateMockSeries from "./AIGenerateMockSeries";

import BulkMockGenerator from "./BulkMockGenerator";

import BulkQuestionImporter from "./BulkQuestionImporter";

import ExamDaySimulator from "./ExamDaySimulator";

import UserManagement from "./UserManagement";

import TermsAndConditions from "./TermsAndConditions";

import MockQuestionReview from "./MockQuestionReview";

import ManualMockCreator from "./ManualMockCreator";

import ViewManualMock from "./ViewManualMock";

import ProgressTracker from "./ProgressTracker";

import Leaderboard from "./Leaderboard";

import AIQuestionAuditor from "./AIQuestionAuditor";

import RevisionBooks from "./RevisionBooks";

import AdminRevisionBookGenerator from "./AdminRevisionBookGenerator";

import BatchRevisionBookGenerator from "./BatchRevisionBookGenerator";

import ManualQuestionAuditor from "./ManualQuestionAuditor";

import MasteredQuestions from "./MasteredQuestions";

import DuplicateQuestionRemover from "./DuplicateQuestionRemover";

import SubjectReviewTool from "./SubjectReviewTool";

import KeywordCategorizer from "./KeywordCategorizer";

import PersonalizedStudyPath from "./PersonalizedStudyPath";

import StudyGroups from "./StudyGroups";

import GroupDiscussion from "./GroupDiscussion";

import PerformanceBenchmarks from "./PerformanceBenchmarks";

import PrivacyPolicy from "./PrivacyPolicy";

import ContentSharingMonitor from "./ContentSharingMonitor";

import AdminReporting from "./AdminReporting";

import AdminFlashCardGenerator from "./AdminFlashCardGenerator";

import FlashCardProgress from "./FlashCardProgress";

import MassQuestionGenerator from "./MassQuestionGenerator";

import BlackLetterLawPractice from "./BlackLetterLawPractice";

import FlashCardReviewBanks from "./FlashCardReviewBanks";

import MyDecks from "./MyDecks";

import AdminBLLGenerator from "./AdminBLLGenerator";

import PremiumContentLibrary from "./PremiumContentLibrary";

import InteractivePractice from "./InteractivePractice";

import AdminGenerateAllContent from "./AdminGenerateAllContent";

import MentalPreparation from "./MentalPreparation";

import InteractiveFlowcharts from "./InteractiveFlowcharts";

import AnalyticsDashboard from "./AnalyticsDashboard";

import AdminMentalHealthMonitor from "./AdminMentalHealthMonitor";

import QuickAIGenerator from "./QuickAIGenerator";

import LaunchChecklist from "./LaunchChecklist";

import ModularRevisionBookGenerator from "./ModularRevisionBookGenerator";

import BulkBLLGenerator from "./BulkBLLGenerator";

import BulkMCQGenerator from "./BulkMCQGenerator";

import SpacedRepetitionReview from "./SpacedRepetitionReview";

import TopicMockGenerator from "./TopicMockGenerator";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Dashboard: Dashboard,
    
    QuestionBank: QuestionBank,
    
    MockExams: MockExams,
    
    CreateMockExam: CreateMockExam,
    
    TakeExam: TakeExam,
    
    AIGenerator: AIGenerator,
    
    ContactUs: ContactUs,
    
    Packages: Packages,
    
    ReviewBank: ReviewBank,
    
    StudyNotes: StudyNotes,
    
    RevisionPlanner: RevisionPlanner,
    
    ComingSoon: ComingSoon,
    
    ExamReview: ExamReview,
    
    AIGenerateExam: AIGenerateExam,
    
    AdminQuestionEditor: AdminQuestionEditor,
    
    FileManager: FileManager,
    
    PersonalisedPractice: PersonalisedPractice,
    
    ExamTips: ExamTips,
    
    CommunityForum: CommunityForum,
    
    PostDetails: PostDetails,
    
    MindMaps: MindMaps,
    
    FlashCards: FlashCards,
    
    BlackLetterLaw: BlackLetterLaw,
    
    EditApp: EditApp,
    
    AdminNoteGenerator: AdminNoteGenerator,
    
    AIGenerateExamPack: AIGenerateExamPack,
    
    AIBulkExamImporter: AIBulkExamImporter,
    
    CustomMockSession: CustomMockSession,
    
    FeedbackReviews: FeedbackReviews,
    
    ScaledScoring: ScaledScoring,
    
    MockExamAnalytics: MockExamAnalytics,
    
    FinalPrep: FinalPrep,
    
    AdminMockStandardizer: AdminMockStandardizer,
    
    AIGenerateMockSeries: AIGenerateMockSeries,
    
    BulkMockGenerator: BulkMockGenerator,
    
    BulkQuestionImporter: BulkQuestionImporter,
    
    ExamDaySimulator: ExamDaySimulator,
    
    UserManagement: UserManagement,
    
    TermsAndConditions: TermsAndConditions,
    
    MockQuestionReview: MockQuestionReview,
    
    ManualMockCreator: ManualMockCreator,
    
    ViewManualMock: ViewManualMock,
    
    ProgressTracker: ProgressTracker,
    
    Leaderboard: Leaderboard,
    
    AIQuestionAuditor: AIQuestionAuditor,
    
    RevisionBooks: RevisionBooks,
    
    AdminRevisionBookGenerator: AdminRevisionBookGenerator,
    
    BatchRevisionBookGenerator: BatchRevisionBookGenerator,
    
    ManualQuestionAuditor: ManualQuestionAuditor,
    
    MasteredQuestions: MasteredQuestions,
    
    DuplicateQuestionRemover: DuplicateQuestionRemover,
    
    SubjectReviewTool: SubjectReviewTool,
    
    KeywordCategorizer: KeywordCategorizer,
    
    PersonalizedStudyPath: PersonalizedStudyPath,
    
    StudyGroups: StudyGroups,
    
    GroupDiscussion: GroupDiscussion,
    
    PerformanceBenchmarks: PerformanceBenchmarks,
    
    PrivacyPolicy: PrivacyPolicy,
    
    ContentSharingMonitor: ContentSharingMonitor,
    
    AdminReporting: AdminReporting,
    
    AdminFlashCardGenerator: AdminFlashCardGenerator,
    
    FlashCardProgress: FlashCardProgress,
    
    MassQuestionGenerator: MassQuestionGenerator,
    
    BlackLetterLawPractice: BlackLetterLawPractice,
    
    FlashCardReviewBanks: FlashCardReviewBanks,
    
    MyDecks: MyDecks,
    
    AdminBLLGenerator: AdminBLLGenerator,
    
    PremiumContentLibrary: PremiumContentLibrary,
    
    InteractivePractice: InteractivePractice,
    
    AdminGenerateAllContent: AdminGenerateAllContent,
    
    MentalPreparation: MentalPreparation,
    
    InteractiveFlowcharts: InteractiveFlowcharts,
    
    AnalyticsDashboard: AnalyticsDashboard,
    
    AdminMentalHealthMonitor: AdminMentalHealthMonitor,
    
    QuickAIGenerator: QuickAIGenerator,
    
    LaunchChecklist: LaunchChecklist,
    
    ModularRevisionBookGenerator: ModularRevisionBookGenerator,
    
    BulkBLLGenerator: BulkBLLGenerator,
    
    BulkMCQGenerator: BulkMCQGenerator,
    
    SpacedRepetitionReview: SpacedRepetitionReview,
    
    TopicMockGenerator: TopicMockGenerator,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Dashboard />} />
                
                
                <Route path="/Dashboard" element={<Dashboard />} />
                
                <Route path="/QuestionBank" element={<QuestionBank />} />
                
                <Route path="/MockExams" element={<MockExams />} />
                
                <Route path="/CreateMockExam" element={<CreateMockExam />} />
                
                <Route path="/TakeExam" element={<TakeExam />} />
                
                <Route path="/AIGenerator" element={<AIGenerator />} />
                
                <Route path="/ContactUs" element={<ContactUs />} />
                
                <Route path="/Packages" element={<Packages />} />
                
                <Route path="/ReviewBank" element={<ReviewBank />} />
                
                <Route path="/StudyNotes" element={<StudyNotes />} />
                
                <Route path="/RevisionPlanner" element={<RevisionPlanner />} />
                
                <Route path="/ComingSoon" element={<ComingSoon />} />
                
                <Route path="/ExamReview" element={<ExamReview />} />
                
                <Route path="/AIGenerateExam" element={<AIGenerateExam />} />
                
                <Route path="/AdminQuestionEditor" element={<AdminQuestionEditor />} />
                
                <Route path="/FileManager" element={<FileManager />} />
                
                <Route path="/PersonalisedPractice" element={<PersonalisedPractice />} />
                
                <Route path="/ExamTips" element={<ExamTips />} />
                
                <Route path="/CommunityForum" element={<CommunityForum />} />
                
                <Route path="/PostDetails" element={<PostDetails />} />
                
                <Route path="/MindMaps" element={<MindMaps />} />
                
                <Route path="/FlashCards" element={<FlashCards />} />
                
                <Route path="/BlackLetterLaw" element={<BlackLetterLaw />} />
                
                <Route path="/EditApp" element={<EditApp />} />
                
                <Route path="/AdminNoteGenerator" element={<AdminNoteGenerator />} />
                
                <Route path="/AIGenerateExamPack" element={<AIGenerateExamPack />} />
                
                <Route path="/AIBulkExamImporter" element={<AIBulkExamImporter />} />
                
                <Route path="/CustomMockSession" element={<CustomMockSession />} />
                
                <Route path="/FeedbackReviews" element={<FeedbackReviews />} />
                
                <Route path="/ScaledScoring" element={<ScaledScoring />} />
                
                <Route path="/MockExamAnalytics" element={<MockExamAnalytics />} />
                
                <Route path="/FinalPrep" element={<FinalPrep />} />
                
                <Route path="/AdminMockStandardizer" element={<AdminMockStandardizer />} />
                
                <Route path="/AIGenerateMockSeries" element={<AIGenerateMockSeries />} />
                
                <Route path="/BulkMockGenerator" element={<BulkMockGenerator />} />
                
                <Route path="/BulkQuestionImporter" element={<BulkQuestionImporter />} />
                
                <Route path="/ExamDaySimulator" element={<ExamDaySimulator />} />
                
                <Route path="/UserManagement" element={<UserManagement />} />
                
                <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
                
                <Route path="/MockQuestionReview" element={<MockQuestionReview />} />
                
                <Route path="/ManualMockCreator" element={<ManualMockCreator />} />
                
                <Route path="/ViewManualMock" element={<ViewManualMock />} />
                
                <Route path="/ProgressTracker" element={<ProgressTracker />} />
                
                <Route path="/Leaderboard" element={<Leaderboard />} />
                
                <Route path="/AIQuestionAuditor" element={<AIQuestionAuditor />} />
                
                <Route path="/RevisionBooks" element={<RevisionBooks />} />
                
                <Route path="/AdminRevisionBookGenerator" element={<AdminRevisionBookGenerator />} />
                
                <Route path="/BatchRevisionBookGenerator" element={<BatchRevisionBookGenerator />} />
                
                <Route path="/ManualQuestionAuditor" element={<ManualQuestionAuditor />} />
                
                <Route path="/MasteredQuestions" element={<MasteredQuestions />} />
                
                <Route path="/DuplicateQuestionRemover" element={<DuplicateQuestionRemover />} />
                
                <Route path="/SubjectReviewTool" element={<SubjectReviewTool />} />
                
                <Route path="/KeywordCategorizer" element={<KeywordCategorizer />} />
                
                <Route path="/PersonalizedStudyPath" element={<PersonalizedStudyPath />} />
                
                <Route path="/StudyGroups" element={<StudyGroups />} />
                
                <Route path="/GroupDiscussion" element={<GroupDiscussion />} />
                
                <Route path="/PerformanceBenchmarks" element={<PerformanceBenchmarks />} />
                
                <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
                
                <Route path="/ContentSharingMonitor" element={<ContentSharingMonitor />} />
                
                <Route path="/AdminReporting" element={<AdminReporting />} />
                
                <Route path="/AdminFlashCardGenerator" element={<AdminFlashCardGenerator />} />
                
                <Route path="/FlashCardProgress" element={<FlashCardProgress />} />
                
                <Route path="/MassQuestionGenerator" element={<MassQuestionGenerator />} />
                
                <Route path="/BlackLetterLawPractice" element={<BlackLetterLawPractice />} />
                
                <Route path="/FlashCardReviewBanks" element={<FlashCardReviewBanks />} />
                
                <Route path="/MyDecks" element={<MyDecks />} />
                
                <Route path="/AdminBLLGenerator" element={<AdminBLLGenerator />} />
                
                <Route path="/PremiumContentLibrary" element={<PremiumContentLibrary />} />
                
                <Route path="/InteractivePractice" element={<InteractivePractice />} />
                
                <Route path="/AdminGenerateAllContent" element={<AdminGenerateAllContent />} />
                
                <Route path="/MentalPreparation" element={<MentalPreparation />} />
                
                <Route path="/InteractiveFlowcharts" element={<InteractiveFlowcharts />} />
                
                <Route path="/AnalyticsDashboard" element={<AnalyticsDashboard />} />
                
                <Route path="/AdminMentalHealthMonitor" element={<AdminMentalHealthMonitor />} />
                
                <Route path="/QuickAIGenerator" element={<QuickAIGenerator />} />
                
                <Route path="/LaunchChecklist" element={<LaunchChecklist />} />
                
                <Route path="/ModularRevisionBookGenerator" element={<ModularRevisionBookGenerator />} />
                
                <Route path="/BulkBLLGenerator" element={<BulkBLLGenerator />} />
                
                <Route path="/BulkMCQGenerator" element={<BulkMCQGenerator />} />
                
                <Route path="/SpacedRepetitionReview" element={<SpacedRepetitionReview />} />
                
                <Route path="/TopicMockGenerator" element={<TopicMockGenerator />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}