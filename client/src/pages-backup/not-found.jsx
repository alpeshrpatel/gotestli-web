import NotFound from "@/components/not-found/NotFound";
import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";

import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";

// const metadata = {
//   title:
//     "Page not found || GoTestli - Ultimate School & General Purpose Quiz Platform",
//   description:
//     "Elevate your e-learning content with GoTestli, the most impressive LMS template for online courses, education and LMS platforms.",
// };

// const pageMetadata = {
//   title: "Page Not Found (404) - GoTestli LMS Platform | Discover Our E-Learning Solutions",
//   description: "Oops! The page you're looking for doesn't exist. Explore GoTestli's impressive LMS template for online courses, educational platforms, and comprehensive e-learning solutions. Return to creating exceptional learning experiences.",
//   keywords: "404 error, page not found, gotestli lms, e-learning template, online courses platform, educational lms, learning management system, course creation, lms template, educational platform navigation, gotestli homepage, return to lms",
//   canonical: "https://gotestli.com/404",
//   category: "Error Page",
//   subject: "404 Error, Page Not Found, LMS Navigation, E-Learning Platform",
//   audience: "All Users, Course Creators, Educational Institutions, E-Learning Developers, LMS Users"
// };
const pageMetadata = {
  title: "Page Not Found (404) – GoTestli LMS Platform | Return to E-Learning & Online Courses",
  description:
    "Oops! The page you’re looking for doesn’t exist. Discover GoTestli’s powerful LMS platform for online courses, interactive quizzes, and comprehensive e-learning solutions. Return to our homepage and start creating exceptional learning experiences today.",
  keywords:
    "404 error, page not found, gotestli lms, e-learning platform, online courses platform, educational lms, learning management system, course creation tools, lms template, educational navigation, gotestli homepage, online learning, return to lms",
  canonical: "https://gotestli.com/404",
  category: "Error Page, Navigation, E-Learning Platform",
  subject: "404 Error, Missing Page, LMS Navigation, E-Learning Solutions",
  audience: "All Users, Course Creators, Educators, E-Learning Developers, Educational Institutions, LMS Users"
};

export default function NotFoundPage() {
  return (
    <div className="main-content  " style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <MetaComponent meta={pageMetadata} />

      <Preloader />

      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />
        <NotFound />
        <FooterOne />
      </div>
    </div>
  );
}
