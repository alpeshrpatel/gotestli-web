import JoinToday from "@/components/aboutCourses-backup/become/JoinToday";
import PageHeading from "@/components/aboutCourses-backup/become/PageHeading";
import Tabs from "@/components/aboutCourses-backup/become/Tabs";
import Instructors from "@/components/common/Instructors";
import LearningCommon from "@/components/common/LearningCommon";

import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";

import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

// const metadata = {
//   title:
//     "Instractors-become || GoTestli - Ultimate School & General Purpose Quiz Platform",
//   description:
//     "Elevate your e-learning content with GoTestli, the most impressive LMS template for online courses, education and LMS platforms.",
// };

const pageMetadata = {
  title: "Become an Instructor - GoTestli Quiz Platform | Join & Start Teaching with Powerful Quiz Tools",
  description: "Join GoTestli as an instructor and transform your teaching experience. Create engaging quizzes, reach students worldwide, and monetize your expertise with our comprehensive quiz creation platform. Sign up free and start teaching today!",
  keywords: "become instructor gotestli, join as teacher, instructor signup, teach online quizzes, quiz instructor registration, become quiz creator, online teaching platform, instructor application, teaching opportunities, quiz platform instructor, educator signup, join teaching platform, create educational content, instructor onboarding, teaching with quizzes",
  canonical: "https://gotestli.com/become-instructor",
  category: "Instructor Registration",
  subject: "Become Instructor, Teacher Registration, Instructor Signup, Teaching Opportunities",
  audience: "Aspiring Instructors, Teachers, Subject Matter Experts, Educators, Content Creators, Training Professionals"
};

export default function InstractoBacomePage() {
  return (
    <div className="main-content  " style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* <MetaComponent meta={metadata} /> */}
      <MetaComponent meta={pageMetadata} />

      <Preloader />
      <Header />
      <div className="content-wrapper  js-content-wrapper overflow-hidden" style={{ flex: 1 }}>
        <PageLinks />
        <PageHeading />
        <section className=" layout-pb-lg">
          <div className="container">
            <Tabs />
            <LearningCommon />
          </div>
        </section>

        <JoinToday />

        <Instructors />

      
      </div>
        <FooterOne />
    </div>
  );
}
