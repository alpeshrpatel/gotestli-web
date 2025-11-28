import "./styles/index.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-calendar/dist/Calendar.css";
import {
  BrowserRouter,
  Routes,
  Route,
  RouterProvider,
  json,
  useLocation,
} from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { lazy, Suspense, useEffect, useState } from "react";

// Keep these as regular imports (needed immediately)
import Context from "@/context/Context";
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";
import Loader from "./components/common/Loader";
import ErrorBoundary from "./components/common/ErrorBoundary";

// Lazy load all page components
const HomePage1 = lazy(() => import("./pages"));
const LoginPage = lazy(() => import("./pages/others/login"));
const SignupPage = lazy(() => import("./pages/others/signup"));
const AdminLoginPage = lazy(() => import("./pages/others/adminlogin"));
const ForgetPasswordPage = lazy(() => import("./pages/others/forgetpassword/ForgetPasswordPage"));

// Quiz Components
const SingleChoice = lazy(() => import("./components/quiz/SingleChoice"));
const QuizResult = lazy(() => import("./components/quiz/QuizResult"));
const QuestionSet = lazy(() => import("./components/quiz/QuestionSet"));
const ExamInstructions = lazy(() => import("./components/quiz/examInstructions/ExamInstructions"));
const QuizReport = lazy(() => import("./components/quiz/QuizReport"));
const MultiPlayerQuiz = lazy(() => import("./components/quiz/MultiPlayerQuiz"));

// Question Set Components
const MakeQuestionSet = lazy(() => import("./components/makeQuestionSet/MakeQuestionSet"));
const UploadQuestionSet = lazy(() => import("./components/makeQuestionSet/UploadQuestionSet"));

// Protected Routes
const ProtectedRoute = lazy(() => import("./privateroutes/ProtectedRoute"));
const CheatSheetHeaderFooterLayout = lazy(() => import("./privateroutes/CheatsheetHeaderFooterLayout"));

// Instructor Pages
const HomePage = lazy(() => import("./pages/instructorspages/HomePage"));
const ViewStudents = lazy(() => import("./pages/instructorspages/ViewStudents"));
const UploadedFiles = lazy(() => import("./pages/instructorspages/UploadedFiles"));
const ViewQuestions = lazy(() => import("./pages/instructorspages/ViewQuestions"));
const ViewComments = lazy(() => import("./pages/instructorspages/ViewComments"));
const InstructorDashboard = lazy(() => import("./pages/instructorspages/InstructorDashboard"));
const CreateQuestionTable = lazy(() => import("./pages/instructorspages/CreateQuestionTable"));

// Student Pages
const StudentQuizzes = lazy(() => import("./pages/studentpages/StudentQuizzes"));
const StudentDashboard = lazy(() => import("./pages/studentpages/StudentDashboard"));
const StudentWishlist = lazy(() => import("./pages/studentpages/StudentWishlist"));
const PurchasePage = lazy(() => import("./pages/studentpages/PurchasePage"));
const PurchaseListing = lazy(() => import("./pages/studentpages/PurchaseListing"));
const StudentTransactions = lazy(() => import("./pages/studentpages/StudentTransctions"));

// Admin Pages
const AdminDashboard = lazy(() => import("./pages/adminpages/AdminDashboard"));
const OrganizationList = lazy(() => import("./pages/adminpages/OrganizationList"));
const RefundRequestsList = lazy(() => import("./pages/adminpages/RefundRequestsList"));
const StudentsList = lazy(() => import("./pages/adminpages/StudentsList"));
const InstructorsList = lazy(() => import("./pages/adminpages/InstructorsList"));
const QuestionSetsList = lazy(() => import("./pages/adminpages/QuestionSetsList"));
const EmailMarketingPage = lazy(() => import("./pages/adminpages/EmailMarketingPage"));

// Organization Pages
const OrganizationHomePage = lazy(() => import("./pages/organization/OrganizationHomePage"));
const OrgOnboardingForm = lazy(() => import("./pages/organization/OrgOnboardingForm"));
const AcceptInvitation = lazy(() => import("./pages/organization/AcceptInvitation"));

// Other Pages
const SearchResult = lazy(() => import("./pages/searchresult/SearchResult"));
const ProfilePage = lazy(() => import("./pages/profilepage/ProfilePage"));
const NotFoundPage = lazy(() => import("./pages/not-found"));

// Footer Pages
const AboutPage = lazy(() => import("./components/layout/footers/footerpages/AboutPage"));
const ContactPage = lazy(() => import("./components/layout/footers/footerpages/ContactPage"));
const BecomeInstructorPage = lazy(() => import("./components/layout/footers/footerpages/BecomeInstructorPage"));
const Faqs = lazy(() => import("./components/layout/footers/footerpages/Faqs"));
const Leadership = lazy(() => import("./components/layout/footers/footerpages/Leadership"));
const PrivacyPolicy = lazy(() => import("./components/layout/footers/footerpages/PrivacyPolicy"));

// AWS Cheat Sheets
const AwsEC2CheatSheet = lazy(() => import("./pages/cheatsheets/cheatsheetpages/AwsEC2CheatSheet"));
const AwsS3CheatSheet = lazy(() => import("./pages/cheatsheets/cheatsheetpages/AwsS3CheatSheet"));
const AwsLambdaCheatSheet = lazy(() => import("./pages/cheatsheets/cheatsheetpages/AwsLambdaCheatSheet"));

// Azure Cheat Sheets
const AzureVmCheatSheet = lazy(() => import("./pages/cheatsheets/cheatsheetpages/AzureVmCheatSheet"));
const AzureBlobCheatSheet = lazy(() => import("./pages/cheatsheets/cheatsheetpages/AzureBlobCheatSheet"));

// GCP Cheat Sheets
const GcpComputeCheatSheet = lazy(() => import("./pages/cheatsheets/cheatsheetpages/GcpComputeCheatSheet"));
const GcpFunctionsCheatSheet = lazy(() => import("./pages/cheatsheets/cheatsheetpages/GcpFunctionsCheatSheet"));

// AI/ML Cheat Sheets
const AiSentimentAnalysisCheatSheet = lazy(() => import("./pages/cheatsheets/cheatsheetpages/AiSentimentAnalysisCheatSheet"));
const AiTextGenerationCheatSheet = lazy(() => import("./pages/cheatsheets/cheatsheetpages/AiTextGenerationCheatSheet"));
const CvImageClassCheatSheet = lazy(() => import("./pages/cheatsheets/cheatsheetpages/CvImageClassCheatSheet"));
const CvObjectDetectCheatSheet = lazy(() => import("./pages/cheatsheets/cheatsheetpages/CvObjectDetectCheatSheet"));
const MlRegressionCheatSheet = lazy(() => import("./pages/cheatsheets/cheatsheetpages/MlRegressionCheatSheet"));
const ClassificationCheatSheet = lazy(() => import("./pages/cheatsheets/cheatsheetpages/ClassificationCheatSheet"));
const ClusteringCheatSheet = lazy(() => import("./pages/cheatsheets/cheatsheetpages/ClusteringCheatSheet"));
const DimensionalityReductionCheatSheet = lazy(() => import("./pages/cheatsheets/cheatsheetpages/DimensionalityReductionCheatSheet"));

// Frontend Framework Cheat Sheets
const ReactJsCheatSheet = lazy(() => import("./pages/cheatsheets/cheatsheetpages/ReactJsCheatSheet"));
const AngularJsCheatSheet = lazy(() => import("./pages/cheatsheets/cheatsheetpages/AngularJsCheatSheet"));
const VueJsCheatSheet = lazy(() => import("./pages/cheatsheets/cheatsheetpages/VeuJsCheatSheet"));
const NextJsCheatSheet = lazy(() => import("./pages/cheatsheets/cheatsheetpages/NextJsCheatSheet"));

// Backend Framework Cheat Sheets
const NodeJsCheatSheet = lazy(() => import("./pages/cheatsheets/cheatsheetpages/NodeJsCheatSheet"));
const ExpressJsCheatSheet = lazy(() => import("./pages/cheatsheets/cheatsheetpages/ExpressJsCheatSheet"));
const DjangoCheatSheet = lazy(() => import("./pages/cheatsheets/cheatsheetpages/DjangoCheatSheet"));
const FlaskCheatSheet = lazy(() => import("./pages/cheatsheets/cheatsheetpages/FlaskCheatSheet"));
const FastApiCheatSheet = lazy(() => import("./pages/cheatsheets/cheatsheetpages/FastApiCheatSheet"));

// import Context from "@/context/Context";
// import HomePage1 from "./pages";

// import LoginPage from "./pages/others/login";
// import SignupPage from "./pages/others/signup";

// import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";

// import SingleChoice from "./components/quiz/SingleChoice";
// import QuizResult from "./components/quiz/QuizResult";
// import QuestionSet from "./components/quiz/QuestionSet";
// import ExamInstructions from "./components/quiz/examInstructions/ExamInstructions";
// import MakeQuestionSet from "./components/makeQuestionSet/MakeQuestionSet";
// import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import ProtectedRoute from "./privateroutes/ProtectedRoute";
// import HomePage from "./pages/instructorspages/HomePage";
import { Bounce, ToastContainer } from "react-toastify";
import GameQuizCreator from "./components/quiz/GameQuizCreator";
// import Loader from "./components/common/Loader";
// import SearchResult from "./pages/searchresult/SearchResult";
// import ProfilePage from "./pages/profilepage/ProfilePage";
// import StudentQuizzes from "./pages/studentpages/StudentQuizzes";
// import StudentDashboard from "./pages/studentpages/StudentDashboard";
// import ViewStudents from "./pages/instructorspages/ViewStudents";
// import UploadQuestionSet from "./components/makeQuestionSet/UploadQuestionSet";
// import UploadedFiles from "./pages/instructorspages/UploadedFiles";
// import ViewQuestions from "./pages/instructorspages/ViewQuestions";
// import AboutPage from "./components/layout/footers/footerpages/AboutPage";
// import ContactPage from "./components/layout/footers/footerpages/ContactPage";
// import BecomeInstructorPage from "./components/layout/footers/footerpages/BecomeInstructorPage";
// import Faq from "./components/common/Faq";
// import Faqs from "./components/layout/footers/footerpages/Faqs";
// import Leadership from "./components/layout/footers/footerpages/Leadership";
// import NotFoundPage from "./pages/not-found";
// import { ThemeProvider } from "@mui/material";
// import { darkTheme, lightTheme } from "./components/common/MaterialTheme";
// import QuizReport from "./components/quiz/QuizReport";
// import StudentWishlist from "./pages/studentpages/StudentWishlist";
// import ViewComments from "./pages/instructorspages/ViewComments";
// import InstructorDashboardOne from "./pages/instructorspages/InstructorDashboardOne";
// import InstructorDashboard from "./pages/instructorspages/InstructorDashboard";
// import AdminDashboard from "./pages/adminpages/AdminDashboard";
// import PurchasePage from "./pages/studentpages/PurchasePage";
// import PurchaseListing from "./pages/studentpages/PurchaseListing";
// import CreateQuestionTable from "./pages/instructorspages/CreateQuestionTable";
// import ForgetPasswordPage from "./pages/others/forgetpassword/ForgetPasswordPage";
// import PrivacyPolicy from "./components/layout/footers/footerpages/PrivacyPolicy";
// import OrganizationHomePage from "./pages/organization/OrganizationHomePage";
// import OrgOnboardingForm from "./pages/organization/OrgOnboardingForm";
// import OrganizationList from "./pages/adminpages/OrganizationList";
// import AcceptInvitation from "./pages/organization/AcceptInvitation";
// import StudentTransactions from "./pages/studentpages/StudentTransctions";
// import RefundRequestsList from "./pages/adminpages/RefundRequestsList";
// import AdminLoginPage from "./pages/others/adminlogin";
// import AwsEC2CheatSheet from "./pages/cheatsheets/cheatsheetpages/AwsEC2CheatSheet";
// import AwsS3CheatSheet from "./pages/cheatsheets/cheatsheetpages/AwsS3CheatSheet";
// import AwsLambdaCheatSheet from "./pages/cheatsheets/cheatsheetpages/AwsLambdaCheatSheet";
// import AzureVmCheatSheet from "./pages/cheatsheets/cheatsheetpages/AzureVmCheatSheet";
// import AzureBlobCheatSheet from "./pages/cheatsheets/cheatsheetpages/AzureBlobCheatSheet";
// import GcpComputeCheatSheet from "./pages/cheatsheets/cheatsheetpages/GcpComputeCheatSheet";
// import GcpFunctionsCheatSheet from "./pages/cheatsheets/cheatsheetpages/GcpFunctionsCheatSheet";
// import AiSentimentAnalysisCheatSheet from "./pages/cheatsheets/cheatsheetpages/AiSentimentAnalysisCheatSheet";
// import AiTextGenerationCheatSheet from "./pages/cheatsheets/cheatsheetpages/AiTextGenerationCheatSheet";
// import CvImageClassCheatSheet from "./pages/cheatsheets/cheatsheetpages/CvImageClassCheatSheet";
// import CvObjectDetectCheatSheet from "./pages/cheatsheets/cheatsheetpages/CvObjectDetectCheatSheet";
// import MlRegressionCheatSheet from "./pages/cheatsheets/cheatsheetpages/MlRegressionCheatSheet";
// import ClassificationCheatSheet from "./pages/cheatsheets/cheatsheetpages/ClassificationCheatSheet";
// import ClusteringCheatSheet from "./pages/cheatsheets/cheatsheetpages/ClusteringCheatSheet";
// import DimensionalityReductionCheatSheet from "./pages/cheatsheets/cheatsheetpages/DimensionalityReductionCheatSheet";
// import CheatSheetHeaderFooterLayout from "./privateroutes/CheatsheetHeaderFooterLayout";
// import ReactJsCheatSheet from "./pages/cheatsheets/cheatsheetpages/ReactJsCheatSheet";
// import AngularJsCheatSheet from "./pages/cheatsheets/cheatsheetpages/AngularJsCheatSheet";
// import VueJsCheatSheet from "./pages/cheatsheets/cheatsheetpages/VeuJsCheatSheet";
// import NextJsCheatSheet from "./pages/cheatsheets/cheatsheetpages/NextJsCheatSheet";
// import NodeJsCheatSheet from "./pages/cheatsheets/cheatsheetpages/NodeJsCheatSheet";
// import ExpressJsCheatSheet from "./pages/cheatsheets/cheatsheetpages/ExpressJsCheatSheet";
// import DjangoCheatSheet from "./pages/cheatsheets/cheatsheetpages/DjangoCheatSheet";
// import FlaskCheatSheet from "./pages/cheatsheets/cheatsheetpages/FlaskCheatSheet";
// import FastApiCheatSheet from "./pages/cheatsheets/cheatsheetpages/FastApiCheatSheet";
// import StudentsList from "./pages/adminpages/StudentsList";
// import InstructorsList from "./pages/adminpages/InstructorsList";
// import QuestionSetsList from "./pages/adminpages/QuestionSetsList";
// import EmailMarketingPage from "./pages/adminpages/EmailMarketingPage";
// import ErrorBoundary from "./components/common/ErrorBoundary";
// import MultiPlayerQuiz from "./components/quiz/MultiPlayerQuiz";
// import AppProvider from "./utils/AppContext";


function App() {
  const [loading, setLoading] = useState(false);
  const [currentOrg, setCurrentOrg] = useState(null);
  const [subdomainChecked, setSubdomainChecked] = useState(false);
  // const location = useLocation();
  const [isOnline, setIsOnline] = useState(navigator.onLine);


  useEffect(() => {
    // Online/Offline detection
    const handleOnline = () => {
      setIsOnline(true);
      toast.success("Connection restored!");
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.error("No internet connection. Please check your network.");
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial loading
    const timer = setTimeout(() => setLoading(false), 200);

    // Initialize AOS
    AOS.init({
      duration: 700,
      offset: 120,
      easing: "ease-out",
      once: true,
    });

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearTimeout(timer);
    };
  }, []);

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Function to toggle theme and persist to localStorage
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  // On initial load, check localStorage for saved theme

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
    // const hostname = window.location.hostname;
    // console.log('host:', hostname)
    // const parts = hostname.split('.');

    // // Check if we're on a subdomain
    // if (parts.length > 1 && parts[0] !== 'www') {
    //   const orgSubdomain = parts[0];
    //   console.log(orgSubdomain)
    //   setCurrentOrg(orgSubdomain);
    // }
    // setSubdomainChecked(true);
  }, []);

  const [toastIds, setToastIds] = useState({
    success: null,
    error: null,
    warning: null,
  });

  const showToast = (message, type) => {
    if (toastIds[type]) {
      toast.dismiss(toastIds[type]);
    }

    const toastOptions = {
      position: "bottom-center",
      theme: "dark",
      autoClose: type === "success" ? 3000 : 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    };

    const newToastId = toast[type](message, toastOptions);

    setToastIds((prev) => ({ ...prev, [type]: newToastId }));
  };

  const user = JSON.parse(localStorage.getItem("user")) || "";
  const org = JSON.parse(localStorage.getItem("org")) || "";
  const userRole = user.role;
  console.log(org)
  const protocol = window.location.protocol;
  const host = window.location.host.split('.').slice(1).join('.');
  if (org.subdomain) {
    const redirectUrl = `https://${org.subdomain}.gotestli.com${window.location.pathname}`;
    console.log(redirectUrl)
    // window.location.href = redirectUrl;
  } else {
    const redirectUrl = `https://gotestli.com/`;
    // window.location.href = redirectUrl;
  }




  // if (!subdomainChecked) {
  //   return <Loader />;
  // }
  // Show offline message
  if (!isOnline) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#f5f5f5'
      }}>
        <Loader />
        <div style={{ marginTop: '30px' }}>
          <h2 style={{ fontSize: '24px', marginBottom: '10px', color: '#333' }}>
            No Internet Connection
          </h2>
          <p style={{ fontSize: '16px', color: '#666' }}>
            Please check your internet connection and try again.
          </p>
          <p style={{ fontSize: '14px', color: '#999', marginTop: '10px' }}>
            Waiting for connection to be restored...
          </p>
        </div>
      </div>
    );
  }
  return (
    <>

      {/* <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}> */}
      {loading ? (
        <Loader />
      ) : (
        // <AppProvider>
        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <Context>
              <BrowserRouter>
                {/* <Routes>
            <Route path="/">
              <Route index element={<HomePage1 />} />
              <Route path="home-1" element={<HomePage1 />} />
            
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="dshb-courses" element={<DshbCoursesPage />} />
              <Route path="dshb-bookmarks" element={<DshbBookmarksPage />} />
              <Route path="dshb-listing" element={<DshbListingPage />} />
              <Route path="dshb-reviews" element={<DshbReviewsPage />} />
              <Route path="dshb-settings" element={<DshbSettingsPage />} />
             
              <Route path="not-found" element={<NotFoundPage />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="help-center" element={<HelpCenterPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="signup" element={<SignupPage />} />
              <Route path="ui-elements" element={<UIElementsPage />} />
              <Route path="quiz/singlechoice" element={<SingleChoice />} />
              <Route path="quiz/result" element={<QuizResult />} />
              <Route path="quiz/questions" element={<QuestionSet />} />
              <Route path="quiz/start" element={<ExamInstructions />} />
              <Route
                path="/api/create/questionset"
                element={<MakeQuestionSet />}
              />
            </Route>
          </Routes> */}

                <Routes>
                 
                        {/* Public Routes */}

                        <Route path="/" element={<HomePage1 />} />
                        {/* )} */}
                        <Route path="/" element={<HomePage1 />} />
                   <Route path="/login" element={<LoginPage />} />
                   <Route path="/admin/login" element={<AdminLoginPage />} /> 
                         <Route path="/signup" element={<SignupPage />} />
                        {/* <Route path="/login" element={<ProtectedRoute element={<LoginPage />} />} />
    <Route path="/admin/login" element={<ProtectedRoute element={<AdminLoginPage />} />} />
    <Route path="/signup" element={<ProtectedRoute element={<SignupPage />} />} />
    <Route path="/forget-password" element={<ProtectedRoute element={<ForgetPasswordPage />} />} /> */}
    {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
                        {/* <Route
                          path="/forget-password"
                          element={<ForgetPasswordPage />}
                        /> */}
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/helpcenter" element={<Faqs />} />
                        <Route path="/leadership" element={<Leadership />} />
                        <Route
                          path="/become/instructor"
                          element={<BecomeInstructorPage />}
                        />
                        <Route path="/play" element={<MultiPlayerQuiz />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/org-onboarding" element={<OrgOnboardingForm />} />
                        <Route path="/admin/invite-members" element={<AcceptInvitation />} />

                        {/* cheatsheet routes */}
                        <Route path="/" element={<CheatSheetHeaderFooterLayout />}>

                          <Route path="/cheatsheet/aws/ec2" element={<AwsEC2CheatSheet />} />
                          <Route path="/cheatsheet/aws/s3" element={<AwsS3CheatSheet />} />
                          <Route path="/cheatsheet/aws/lambda" element={<AwsLambdaCheatSheet />} />
                          <Route path="/cheatsheet/azure/vm" element={<AzureVmCheatSheet />} />
                          <Route path="/cheatsheet/azure/blob" element={<AzureBlobCheatSheet />} />
                          <Route path="/cheatsheet/gcp/compute" element={<GcpComputeCheatSheet />} />
                          <Route path="/cheatsheet/gcp/functions" element={<GcpFunctionsCheatSheet />} />
                          <Route path="/cheatsheet/ai/sentiment/analysis" element={<AiSentimentAnalysisCheatSheet />} />
                          <Route path="/cheatsheet/ai/text/generation" element={<AiTextGenerationCheatSheet />} />
                          <Route path="/cheatsheet/cv/image/classification" element={<CvImageClassCheatSheet />} />
                          <Route path="/cheatsheet/cv/object/detection" element={<CvObjectDetectCheatSheet />} />
                          <Route path="/cheatsheet/ml/supervised/regression" element={<MlRegressionCheatSheet />} />
                          <Route path="/cheatsheet/ml/supervised/classification" element={<ClassificationCheatSheet />} />
                          <Route path="/cheatsheet/ml/unsupervised/clustering" element={<ClusteringCheatSheet />} />
                          <Route path="/cheatsheet/ml/unsupervised/dimensionality/reduction" element={<DimensionalityReductionCheatSheet />} />
                          <Route path="/cheatsheet/web/reactjs" element={<ReactJsCheatSheet />} />
                          <Route path="/cheatsheet/web/angular" element={<AngularJsCheatSheet />} />
                          <Route path="/cheatsheet/web/vuejs" element={<VueJsCheatSheet />} />
                          <Route path="/cheatsheet/web/nextjs" element={<NextJsCheatSheet />} />
                          <Route path="/cheatsheet/web/nodejs" element={<NodeJsCheatSheet />} />
                          <Route path="/cheatsheet/web/expressjs" element={<ExpressJsCheatSheet />} />
                          <Route path="/cheatsheet/web/django" element={<DjangoCheatSheet />} />
                          <Route path="/cheatsheet/web/flask" element={<FlaskCheatSheet />} />
                          <Route path="/cheatsheet/web/fastapi" element={<FastApiCheatSheet />} />
                        </Route>
                        {/* Student Routes */}
                        {/* <Route path="/" element={
                <ProtectedRoute element={<HomePage1 />} role="student" />
              } /> */}
                        <Route
                          path="quiz/singlechoice"
                          element={
                            <ProtectedRoute element={<SingleChoice />} role="student" />
                          }
                        />
                        <Route
                          path="quiz/report"
                          element={
                            <ProtectedRoute element={<QuizReport />} role="student" />
                          }
                        />
                        <Route
                          path="quiz/result"
                          element={
                            <ProtectedRoute element={<QuizResult />} role="student" />
                          }
                        />
                        <Route
                          path="quiz/questions"
                          element={
                            <ProtectedRoute element={<QuestionSet />} role="student" />
                          }
                        />
                        <Route
                          path="quiz/start"
                          element={
                            <ProtectedRoute
                              element={<ExamInstructions />}
                              role="student"
                            />
                          }
                        />
                        <Route
                          path="/dshb/quizzes"
                          element={
                            <ProtectedRoute
                              element={<StudentQuizzes />}
                              role="student"
                            />
                          }
                        />
                        <Route
                          path="/dshb/wishlist"
                          element={
                            <ProtectedRoute
                              element={<StudentWishlist />}
                              role="student"
                            />
                          }
                        />
                        <Route
                          path="/student/dashboard"
                          element={
                            <ProtectedRoute
                              element={<StudentDashboard />}
                              role="student"
                            />
                          }
                        />
                        <Route
                          path="/buy/questionset"
                          element={
                            <ProtectedRoute element={<PurchasePage />} role="student" />
                          }
                        />
                        <Route
                          path="/user/purchases"
                          element={
                            <ProtectedRoute
                              element={<PurchaseListing />}
                              role="student"
                            />
                          }
                        />
                        <Route
                          path="/user/transactions"
                          element={
                            <ProtectedRoute
                              element={<StudentTransactions />}
                              role="student"
                            />
                          }
                        />
                        <Route path="/search/result" element={<SearchResult />} />
                        <Route
                          path="/dshb/profilepage"
                          element={
                            <ProtectedRoute
                              element={<ProfilePage />}
                              role={
                                userRole == `student`
                                  ? `student`
                                  : userRole == "instructor"
                                    ? "instructor"
                                    : ""
                              }
                            />
                          }
                        />

                        {/* Admin Routes */}
                        <Route
                          path="/admin/dashboard"
                          element={
                            <ProtectedRoute element={<AdminDashboard />} role="admin" />
                          }
                        />
                        <Route
                          path="/admin/organization-list/approval"
                          element={
                            <ProtectedRoute element={<OrganizationList />} role="admin" />
                          }
                        />
                        <Route path="/org/homepage" element={
                          <ProtectedRoute element={<OrganizationHomePage orgName={org.org_name} />} role="admin" />
                        } />
                        <Route
                          path="/admin/refund/requests"
                          element={
                            <ProtectedRoute element={<RefundRequestsList />} role="admin" />
                          }
                        />
                        <Route
                          path="/admin/students/list"
                          element={
                            <ProtectedRoute element={<StudentsList />} role="admin" />
                          }
                        />
                        <Route
                          path="/admin/instructors/list"
                          element={
                            <ProtectedRoute element={<InstructorsList />} role="admin" />
                          }
                        />

                        <Route
                          path="/admin/questionsets/list"
                          element={
                            <ProtectedRoute element={<QuestionSetsList />} role="admin" />
                          }
                        />
                        <Route
                          path="/admin/bulk/email/marketing"
                          element={
                            <ProtectedRoute element={<EmailMarketingPage />} role="admin" />
                          }
                        />

                        {/* Instructor Routes */}
                        <Route
                          path="/create/questionset"
                          element={
                            <ProtectedRoute
                              element={<MakeQuestionSet />}
                              role="instructor"
                            />
                          }
                        />
                        <Route
                          path="/create/question"
                          element={
                            <ProtectedRoute
                              element={<CreateQuestionTable />}
                              role="instructor"
                            />
                          }
                        />
                         <Route
                          path="/create/gamequiz"
                          element={
                            <ProtectedRoute
                              element={<GameQuizCreator />}
                              role="instructor"
                            />
                          }
                        />
                        <Route
                          path="/upload/questionset"
                          element={
                            <ProtectedRoute
                              element={<UploadQuestionSet />}
                              role="instructor"
                            />
                          }
                        />
                        <Route
                          path="/instructor/home"
                          element={
                            <ProtectedRoute element={<HomePage />} role="instructor" />
                          }
                        />

                        <Route
                          path="/quiz/students"
                          element={
                            <ProtectedRoute
                              element={<ViewStudents />}
                              role="instructor"
                            />
                          }
                        />
                        <Route
                          path="/quiz/questions/:id"
                          element={
                            <ProtectedRoute
                              element={<ViewQuestions />}
                              role="instructor"
                            />
                          }
                        />
                        <Route
                          path="/quiz/question/comments/:questionId"
                          element={
                            <ProtectedRoute
                              element={<ViewComments />}
                              role="instructor"
                            />
                          }
                        />
                        <Route
                          path="/instructor/dashboard"
                          element={<InstructorDashboard role="instructor" />}
                          role="instructor"
                        />

                        <Route
                          path="/dshb/uploaded/files"
                          element={<UploadedFiles />}
                          role="instructor"
                        />
                        <Route path="*" element={<NotFoundPage />} />
                     
                      <>

                        {/* <Route path="*" element={<LoginPage />} /> */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/admin/login" element={<AdminLoginPage />} />
                        <>
    {/* <Route path="/login" element={<ProtectedRoute element={<LoginPage />} />} />
    <Route path="/admin/login" element={<ProtectedRoute element={<AdminLoginPage />} />} />
    <Route path="/signup" element={<ProtectedRoute element={<SignupPage />} />} />
    <Route path="/forget-password" element={<ProtectedRoute element={<ForgetPasswordPage />} />} />
    <Route path="*" element={<Navigate to="/login" replace />} /> */}
  </>
                      </>
                   
                </Routes>
                <ScrollTopBehaviour />
              </BrowserRouter>

              <ToastContainer
                position="bottom-center"
                autoClose={true}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
              />
            </Context>
          </Suspense>
        </ErrorBoundary>

      )}

      {/* </ThemeProvider> */}
    </>
  );
}

export default App;
