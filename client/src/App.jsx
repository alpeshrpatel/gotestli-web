import "./styles/index.scss";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-calendar/dist/Calendar.css";
import { BrowserRouter, Routes, Route, RouterProvider } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";
import { Suspense, useEffect } from "react";
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

function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      offset: 120,
      easing: "ease-out",
      once: true,
    });
  }, []);

 

  return (
    <>
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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

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
                <ProtectedRoute element={<ExamInstructions />} role="student" />
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute element={<DashboardPage />} role="admin" />
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
              path="/instructor/home"
              element={
                <ProtectedRoute
                  element={<HomePage/> }
                  role="instructor"
                />
              }
            />
          </Routes>
          <ScrollTopBehaviour />
        </BrowserRouter>
       
        <ToastContainer
          position="top-center"
          autoClose={3000}
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
    </>
  );
}

export default App;
