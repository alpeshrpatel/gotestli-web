import NotFound from "@/components/not-found/NotFound";
import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import EventsOne from "@/components/events-backup/EventsOne";
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
  title: "Page Not Found (404) – Explore Best Quiz App & LMS for Learning & Trivia | GoTestli",
  description:
    "Oops! The page you're looking for doesn't exist. Explore GoTestli, the best quiz maker app for learning and trivia, or discover our impressive LMS solutions for online courses and e-learning. Return to creating exceptional educational experiences.",
  keywords:
    "best quiz app for learning, best quiz maker app, quiz app for trivia, 404 error, page not found, gotestli lms, e-learning template, online courses platform, educational lms, learning management system, course creation, lms template, educational platform navigation, gotestli homepage, return to lms",
  canonical: "https://gotestli.com/404",
  category: "Error Page, Site Navigation, Educational Platform",
  subject: "404 Error, Page Not Found, LMS Navigation, E-Learning Platform, Quiz Platform",
  audience: "All Users, Course Creators, Educators, LMS Users, Students, Educational Institutions"
};


export default function NotFoundpage() {
  return (
    <div className="main-content  ">
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
