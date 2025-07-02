// import HomeOne from "@/components/homes/home";
import Header from "@/components/layout/headers/Header";
// import MobileMenu from "@/components/layout/component/MobileMenu";
import HomeHero from "@/components/homes/heros/HomeHero";
// import Brands from "@/components/common/Brands";
// import Categories from "@/components/homes/categories/Categories";
import Courses from "@/components/homes/courses/Courses";
import FooterOne from "@/components/layout/footers/FooterOne";
import Preloader from "@/components/common/Preloader";

import MetaComponent from "@/components/common/MetaComponent";
// import { auth, db } from "@/firebase/Firebase";
// import {
//   addDoc,
//   collection,
//   doc,
//   Firestore,
//   getDoc,
//   setDoc,
// } from "firebase/firestore";
import { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import FeedbackButton from "@/components/common/FeedbackButton";
import PayPalButton from "@/components/common/PayPalButton";
import PaymentComponent from "@/components/common/PaymentComponent";

// const metadata = {
//   title: " Home || GoTestli - Ultimate School & General Purpose Quiz Platform",
//   description:
//     "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges.",
// };

// const pageMetadata = {
//   title: "GoTestli - Ultimate Quiz & LMS Platform | Transform E-Learning with Interactive Assessments",
//   description: "Elevate your e-learning experience with GoTestli's impressive LMS template. Create stunning online courses, interactive quizzes, and comprehensive educational platforms. Perfect for schools, educators, and training organizations.",
//   keywords: "gotestli lms platform, e-learning template, online course platform, quiz lms system, educational platform template, interactive learning management, online education template, lms for schools, e-learning solution, quiz creation lms, educational technology platform, online learning template, course management system",
//   canonical: "https://gotestli.com/home-1",
//   category: "LMS Landing Page",
//   subject: "LMS Platform, E-Learning Template, Online Education, Course Management",
//   audience: "Educational Institutions, Course Creators, Training Organizations, E-Learning Developers, School Administrators"
// };
// const pageMetadata = {
//   title: "GoTestli – Best Quiz App for Learning, Trivia & LMS Platform | Transform E-Learning",
//   description:
//     "Elevate e-learning with GoTestli, the best quiz maker app for learning and trivia. Create interactive online courses, engaging quizzes, and a complete LMS platform designed for schools, educators, and training organizations.",
//   keywords:
//     "best quiz app for learning, best quiz maker app, quiz app for trivia, gotestli lms platform, e-learning template, online course platform, quiz lms system, educational platform template, interactive learning management, online education template, lms for schools, e-learning solution, quiz creation lms, educational technology platform, course management system",
//   canonical: "https://gotestli.com/home-1",
//   category: "LMS, Quiz Platform, E-Learning, Interactive Assessments",
//   subject: "LMS Platform, E-Learning Tools, Quiz Maker, Online Education, Course Management",
//   audience: "Educators, Course Creators, Training Organizations, E-Learning Professionals, School Administrators, Students"
// };
const pageMetadata = {
  title: "Gotestli – Best Quiz App for Learning & Trivia | Interactive LMS Platform for E-Learning",
  description:
    "Transform e-learning with Gotestli, the best quiz maker app for learning and trivia. Create interactive online courses, engaging quizzes, and a complete LMS platform for schools, educators, and training organizations.",
  keywords:
    "best quiz app for learning, best quiz maker app, quiz app for trivia, GoTestli LMS platform, e-learning template, online course builder, interactive quizzes, educational platform, learning management system, quiz creation LMS, LMS for schools, online education tools, course management software, e-learning solution, digital classroom platform",
  canonical: "https://gotestli.com/",
  category: "LMS, E-Learning, Interactive Quizzes, Educational Technology",
  subject: "Quiz Platform, Learning Management System, E-Learning Tools, Online Education",
  audience: "Educators, Schools, Training Organizations, E-Learning Professionals, Course Creators, School Administrators"
};



export default function HomePage1() {
  // const [userRole, setUserRole] = useState("");
   const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   async function checkUserRole() {
  //     setIsLoading(true);
  //     if (auth.currentUser) {
  //       const userId = auth.currentUser.uid;
  //       const docRef = doc(db, "roles", userId);
  //       const docSnap = await getDoc(docRef);

  //       if (docSnap.exists()) {
  //         setUserRole(docSnap.data().role);
  //          // console.log(docSnap.data().role);
  //       } else {
  //          // console.log("No role found for this user");
  //       }
  //     } else {
  //        // console.log("No user is logged in");
  //     }
  //     setIsLoading(false);
  //   }
  //   checkUserRole();
  // }, []);
  const user = JSON.parse( localStorage.getItem('user')) || '';
  const userRole = user.role;

  const handleSuccess = (data) => {
    console.log('Payment successful:', data);
    // Handle successful payment
  };

  const handleError = (error) => {
    console.error('Payment error:', error);
    // Handle payment error
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Preloader />
          <MetaComponent meta={pageMetadata} />
          <Header userRole = {userRole}/>

          <div className="content-wrapper  js-content-wrapper overflow-hidden w-100">
            <FeedbackButton />
            {!userRole && (
              <>
                <HomeHero />
                {/* <Brands />
                <Categories /> */}
              </>
            )}

            <div className={`${userRole && `mt-80`}`}></div>
            <Courses userRole={userRole}/>
            {/* <TestimonialsOne />
        <FeaturesOne />
        <WhyCourse />
        <Instructors />
        <GetApp />
        <Blog />
        <Join /> */}
         {/* <PayPalButton
      amount="99.99"
      onSuccess={handleSuccess}
      onError={handleError}
    /> */}
    {/* <PaymentComponent/> */}
            <FooterOne />
          </div>
        </>
      )}
    </>
  );
}
