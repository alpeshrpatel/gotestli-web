import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  // const metadata = {
  //   title:
  //     "Home-1 || GoTestli - Ultimate School & General Purpose Quiz Platform",
  //   description:
  //     "Elevate your e-learning content with GoTestli, the most impressive LMS template for online courses, education and LMS platforms.",
  // };

//   const pageMetadata = {
//   title: "GoTestli - Ultimate Quiz & LMS Platform | Transform E-Learning with Interactive Assessments",
//   description: "Elevate your e-learning experience with GoTestli's impressive LMS template. Create stunning online courses, interactive quizzes, and comprehensive educational platforms. Perfect for schools, educators, and training organizations.",
//   keywords: "gotestli lms platform, e-learning template, online course platform, quiz lms system, educational platform template, interactive learning management, online education template, lms for schools, e-learning solution, quiz creation lms, educational technology platform, online learning template, course management system",
//   canonical: "https://gotestli.com/home-1",
//   category: "LMS Landing Page",
//   subject: "LMS Platform, E-Learning Template, Online Education, Course Management",
//   audience: "Educational Institutions, Course Creators, Training Organizations, E-Learning Developers, School Administrators"
// };

const pageMetadata = {
  title: "GoTestli – Best Quiz App for Learning, Trivia & E-Learning | Interactive LMS Platform",
  description:
    "Transform your e-learning experience with GoTestli, the best quiz maker app for learning and trivia. Build interactive courses, create quizzes, and manage online education with our powerful LMS platform. Ideal for schools, educators, and training teams.",
  keywords:
    "best quiz app for learning, best quiz maker app, quiz app for trivia, GoTestli LMS platform, online education system, e-learning template, interactive quiz platform, course creation LMS, quiz LMS system, educational technology, learning management system, quiz creation tool, online course builder, LMS for schools, digital classroom tools",
  canonical: "https://gotestli.com/home-1",
  category: "LMS, Online Education, E-Learning, Assessment Tools",
  subject: "Quiz Platform, LMS Software, Educational Technology, E-Learning System",
  audience: "Educators, Training Organizations, Course Creators, School Admins, Online Tutors, EdTech Professionals"
};


  return (
    <>
      {/* <Wrapper> */}
        <Preloader />
        <MetaComponent meta={pageMetadata} />
        <Header />
        <div className="content-wrapper  js-content-wrapper overflow-hidden w-100">
            <Outlet/>
          {/* <HomeHero />
          <Brands />
          <Categories />
          <Courses /> */}
          {/* <TestimonialsOne />
        <FeaturesOne />
        <WhyCourse />
        <Instructors />
        <GetApp />
        <Blog />
        <Join /> */}
          <FooterOne />
        </div>
      {/* </Wrapper> */}
    </>
  );
};

export default Layout;
