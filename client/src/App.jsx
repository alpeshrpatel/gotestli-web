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
import { Suspense, useEffect, useState } from "react";
import Context from "@/context/Context";
import HomePage1 from "./pages";
// import HomePage2 from "./pages/homes/home-2";
// import HomePage3 from "./pages/homes/home-3";
// import HomePage4 from "./pages/homes/home-4";
// import HomePage5 from "./pages/homes/home-5";
// import HomePage6 from "./pages/homes/home-6";
// import HomePage7 from "./pages/homes/home-7";
// import HomePage8 from "./pages/homes/home-8";
// import HomePage9 from "./pages/homes/home-9";
// import HomePage10 from "./pages/homes/home-10";
// import CourseListPage1 from "./pages/coursesList/courses-list-1";
// import CourseListPage2 from "./pages/coursesList/courses-list-2";
// import CourseListPage3 from "./pages/coursesList/courses-list-3";
// import CourseListPage4 from "./pages/coursesList/courses-list-4";
// import CourseListPage5 from "./pages/coursesList/courses-list-5";
// import CourseListPage6 from "./pages/coursesList/courses-list-6";
// import CourseListPage7 from "./pages/coursesList/courses-list-7";
// import CourseListPage8 from "./pages/coursesList/courses-list-8";
// import CourseSinglePage1 from "./pages/courseSingle/courses";
// import CourseSinglePage2 from "./pages/courseSingle/courses-single-2";
// import CourseSinglePage3 from "./pages/courseSingle/courses-single-3";
// import CourseSinglePage4 from "./pages/courseSingle/courses-single-4";
// import CourseSinglePage5 from "./pages/courseSingle/courses-single-5";
// import CourseCartPage from "./pages/cartPages/course-cart";
// import CourseCheckoutPage from "./pages/cartPages/course-checkout";
// import LessonSinglePage1 from "./pages/aboutCourses/lesson-single-1";
// import LessonSinglePage2 from "./pages/aboutCourses/lesson-single-2";
// import InstractorListPage1 from "./pages/aboutCourses/instructors-list-1";
// import InstractorListPage2 from "./pages/aboutCourses/instructors-list-2";
// import InstractorSinglePage from "./pages/aboutCourses/instructors";
// import InstractoBacomePage from "./pages/aboutCourses/instructor-become";
import DashboardPage from "./pages/dashboard/dashboard";
// import DshbCoursesPage from "./pages/dashboard/dshb-courses";
// import DshbBookmarksPage from "./pages/dashboard/dshb-bookmarks";
// import DshbListingPage from "./pages/dashboard/dshb-listing";
// import DshbReviewsPage from "./pages/dashboard/dshb-reviews";
// import DshbSettingsPage from "./pages/dashboard/dshb-settings";
// import DshbAdministrationPage from "./pages/dashboard/dshb-administration";
// import DshbAssignmentPage from "./pages/dashboard/dshb-assignment";
// import DshbCalenderPage from "./pages/dashboard/dshb-calendar";
// import DshbDashboardPage from "./pages/dashboard/dshb-dashboard";
// import DshbDictionaryPage from "./pages/dashboard/dshb-dictionary";
// import DshbForumsPage from "./pages/dashboard/dshb-forums";
// import DshbGradesPage from "./pages/dashboard/dshb-grades";
// import DshbMessagesPage from "./pages/dashboard/dshb-messages";
// import DshbPartcipentPage from "./pages/dashboard/dshb-participants";
// import DshbQuizPage from "./pages/dashboard/dshb-quiz";
// import DshbServeyPage from "./pages/dashboard/dshb-survey";
// import EventListPage1 from "./pages/events/event-list-1";
// import EventSingPage from "./pages/events/events";
// import EventCartPage from "./pages/cartPages/event-cart";
// import EventCheckoutPage from "./pages/cartPages/event-checkout";
// import BlogListpage1 from "./pages/blogs/blog-list-1";
// import BlogListpage2 from "./pages/blogs/blog-list-2";
// import BlogListpage3 from "./pages/blogs/blog-list-3";
// import BlogdetailsPage from "./pages/blogs/blogs";
// import AboutPage1 from "./pages/about/about-1";
// import AboutPage2 from "./pages/about/about-2";
// import ContactPage1 from "./pages/contacts/contact-1";
// import ContactPage2 from "./pages/contacts/contact-2";
// import ShopCartPage from "./pages/cartPages/shop-cart";
// import ShopCheckoutPage from "./pages/cartPages/shop-checkout";
// import ShopListPage from "./pages/shop/shop-list";
// import ShopOrderPage from "./pages/shop/shop-order/page";
// import ShopdetailsPage from "./pages/shop/shop";
// import PricingPage from "./pages/others/pricing";

// import TermsPage from "./pages/others/terms";
// import HelpCenterPage from "./pages/others/help-center";
import LoginPage from "./pages/others/login";
import SignupPage from "./pages/others/signup";
// import UIElementsPage from "./pages/others/ui-elements";
// import EventListPage2 from "./pages/events/event-list-2";
// import CourseSinglePage6 from "./pages/courseSingle/courses-single-6/page";
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";
// import NotFoundPage from "./pages/not-found";
import SingleChoice from "./components/quiz/SingleChoice";
import QuizResult from "./components/quiz/QuizResult";
import QuestionSet from "./components/quiz/QuestionSet";
import ExamInstructions from "./components/quiz/examInstructions/ExamInstructions";
import MakeQuestionSet from "./components/makeQuestionSet/MakeQuestionSet";
// import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./privateroutes/ProtectedRoute";
import HomePage from "./pages/instructorspages/HomePage";
import { Bounce, ToastContainer } from "react-toastify";
import Loader from "./components/common/Loader";
import SearchResult from "./pages/searchresult/SearchResult";
import ProfilePage from "./pages/profilepage/ProfilePage";
import StudentQuizzes from "./pages/studentpages/StudentQuizzes";
import StudentDashboard from "./pages/studentpages/StudentDashboard";
import ViewStudents from "./pages/instructorspages/ViewStudents";
import UploadQuestionSet from "./components/makeQuestionSet/UploadQuestionSet";
import UploadedFiles from "./pages/instructorspages/UploadedFiles";
import ViewQuestions from "./pages/instructorspages/ViewQuestions";
import AboutPage from "./components/layout/footers/footerpages/AboutPage";
import ContactPage from "./components/layout/footers/footerpages/ContactPage";
import BecomeInstructorPage from "./components/layout/footers/footerpages/BecomeInstructorPage";
import Faq from "./components/common/Faq";
import Faqs from "./components/layout/footers/footerpages/Faqs";
import Leadership from "./components/layout/footers/footerpages/Leadership";
import NotFoundPage from "./pages/not-found";
import { ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from "./components/common/MaterialTheme";
import QuizReport from "./components/quiz/QuizReport";
import StudentWishlist from "./pages/studentpages/StudentWishlist";
import ViewComments from "./pages/instructorspages/ViewComments";
import InstructorDashboardOne from "./pages/instructorspages/InstructorDashboardOne";
import InstructorDashboard from "./pages/instructorspages/InstructorDashboard";
import AdminDashboard from "./pages/adminpages/AdminDashboard";
import PurchasePage from "./pages/studentpages/PurchasePage";
import PurchaseListing from "./pages/studentpages/PurchaseListing";
import CreateQuestionTable from "./pages/instructorspages/CreateQuestionTable";
import ForgetPasswordPage from "./pages/others/forgetpassword/ForgetPasswordPage";
import PrivacyPolicy from "./components/layout/footers/footerpages/PrivacyPolicy";
import OrganizationHomePage from "./pages/organization/OrganizationHomePage";
import OrgOnboardingForm from "./pages/organization/OrgOnboardingForm";
import OrganizationList from "./pages/adminpages/OrganizationList";
import AcceptInvitation from "./pages/organization/AcceptInvitation";
import StudentTransactions from "./pages/studentpages/StudentTransctions";
import RefundRequestsList from "./pages/adminpages/RefundRequestsList";
import AdminLoginPage from "./pages/others/adminlogin";
import AwsEC2CheatSheet from "./pages/cheatsheets/cheatsheetpages/AwsEC2CheatSheet";
import AwsS3CheatSheet from "./pages/cheatsheets/cheatsheetpages/AwsS3CheatSheet";
import AwsLambdaCheatSheet from "./pages/cheatsheets/cheatsheetpages/AwsLambdaCheatSheet";
import AzureVmCheatSheet from "./pages/cheatsheets/cheatsheetpages/AzureVmCheatSheet";
import AzureBlobCheatSheet from "./pages/cheatsheets/cheatsheetpages/AzureBlobCheatSheet";
import GcpComputeCheatSheet from "./pages/cheatsheets/cheatsheetpages/GcpComputeCheatSheet";
import GcpFunctionsCheatSheet from "./pages/cheatsheets/cheatsheetpages/GcpFunctionsCheatSheet";
import AiSentimentAnalysisCheatSheet from "./pages/cheatsheets/cheatsheetpages/AiSentimentAnalysisCheatSheet";
import AiTextGenerationCheatSheet from "./pages/cheatsheets/cheatsheetpages/AiTextGenerationCheatSheet";
import CvImageClassCheatSheet from "./pages/cheatsheets/cheatsheetpages/CvImageClassCheatSheet";
import CvObjectDetectCheatSheet from "./pages/cheatsheets/cheatsheetpages/CvObjectDetectCheatSheet";
import MlRegressionCheatSheet from "./pages/cheatsheets/cheatsheetpages/MlRegressionCheatSheet";
import ClassificationCheatSheet from "./pages/cheatsheets/cheatsheetpages/ClassificationCheatSheet";
import ClusteringCheatSheet from "./pages/cheatsheets/cheatsheetpages/ClusteringCheatSheet";
import DimensionalityReductionCheatSheet from "./pages/cheatsheets/cheatsheetpages/DimensionalityReductionCheatSheet";
import CheatSheetHeaderFooterLayout from "./privateroutes/CheatsheetHeaderFooterLayout";
import ReactJsCheatSheet from "./pages/cheatsheets/cheatsheetpages/ReactJsCheatSheet";
import AngularJsCheatSheet from "./pages/cheatsheets/cheatsheetpages/AngularJsCheatSheet";
import VueJsCheatSheet from "./pages/cheatsheets/cheatsheetpages/VeuJsCheatSheet";
import NextJsCheatSheet from "./pages/cheatsheets/cheatsheetpages/NextJsCheatSheet";
import NodeJsCheatSheet from "./pages/cheatsheets/cheatsheetpages/NodeJsCheatSheet";
import ExpressJsCheatSheet from "./pages/cheatsheets/cheatsheetpages/ExpressJsCheatSheet";
import DjangoCheatSheet from "./pages/cheatsheets/cheatsheetpages/DjangoCheatSheet";
import FlaskCheatSheet from "./pages/cheatsheets/cheatsheetpages/FlaskCheatSheet";
import FastApiCheatSheet from "./pages/cheatsheets/cheatsheetpages/FastApiCheatSheet";
import StudentsList from "./pages/adminpages/StudentsList";
import InstructorsList from "./pages/adminpages/InstructorsList";
import QuestionSetsList from "./pages/adminpages/QuestionSetsList";
// import AppProvider from "./utils/AppContext";

function App() {
  const [loading, setLoading] = useState(false);
  const [currentOrg, setCurrentOrg] = useState(null);
  const [subdomainChecked, setSubdomainChecked] = useState(false);
  // const location = useLocation();
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 200);

    AOS.init({
      duration: 700,
      offset: 120,
      easing: "ease-out",
      once: true,
    });
    return () => clearTimeout(timer);
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

  return (
    <>
      {/* <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}> */}
      {loading ? (
        <Loader />
      ) : (
        // <AppProvider>
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
                {/* {(org.id != 0) && (user.role == 'admin') ? (
                  <Route path="/" element={<OrganizationHomePage orgName={org.org_name} />} />
                ) : ( */}
                <Route path="/" element={<HomePage1 />} />
                {/* )} */}
                <Route path="/" element={<HomePage1 />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route
                  path="/forget-password"
                  element={<ForgetPasswordPage />}
                />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/helpcenter" element={<Faqs />} />
                <Route path="/leadership" element={<Leadership />} />
                <Route
                  path="/become/instructor"
                  element={<BecomeInstructorPage />}
                />
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

      )}

      {/* </ThemeProvider> */}
    </>
  );
}

export default App;
