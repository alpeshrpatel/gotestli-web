
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
import Preloader from "@/components/common/Preloader";
import Header from "../../headers/Header";
import PageHeading from "@/components/courseList-backup/PageHeading";
import Tabs from "@/components/uiElements--backup/Tabs";
import JoinToday from "@/components/aboutCourses-backup/become/JoinToday";
import FooterOne from "../FooterOne";
import LearningCommon from "@/components/common/LearningCommon";

// const metadata = {
//   title: " Become Instructor || GoTestli - Ultimate School & General Purpose Quiz Platform",
//     description:
//       "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges.",
// };

// const pageMetadata = {
//   title: "Become an Instructor - GoTestli Quiz Platform | Join & Start Teaching with Powerful Quiz Tools",
//   description: "Join GoTestli as an instructor and transform your teaching experience. Create engaging quizzes, reach students worldwide, and monetize your expertise with our comprehensive quiz creation platform. Sign up free and start teaching today!",
//   keywords: "become instructor gotestli, join as teacher, instructor signup, teach online quizzes, quiz instructor registration, become quiz creator, online teaching platform, instructor application, teaching opportunities, quiz platform instructor, educator signup, join teaching platform, create educational content, instructor onboarding, teaching with quizzes",
//   canonical: "https://gotestli.com/become-instructor",
//   category: "Instructor Registration",
//   subject: "Become Instructor, Teacher Registration, Instructor Signup, Teaching Opportunities",
//   audience: "Aspiring Instructors, Teachers, Subject Matter Experts, Educators, Content Creators, Training Professionals"
// };

const pageMetadata = {
  title: "Become an Instructor | Teach on the Best Quiz App for Learning & Trivia - GoTestli",
  description:
    "Become a quiz creator on GoTestli — the best quiz app for learning and trivia. Share your expertise, create engaging quizzes with our quiz maker tools, and teach students globally. Start free today!",
  keywords:
    "become instructor GoTestli, best quiz app for learning, best quiz maker app, quiz app for trivia, teach online quizzes, instructor signup, create learning quizzes, quiz teaching platform, educator tools, join as teacher, online teaching platform, create educational content, instructor onboarding, teaching opportunities, monetize your knowledge, quiz creator platform",
  canonical: "https://gotestli.com/become-instructor",
  category: "Instructor Registration, Online Teaching",
  subject: "Instructor Opportunities, Online Teaching, Quiz Creation, Educational Platform",
  audience: "Teachers, Instructors, Subject Experts, Content Creators, Quiz Makers, Training Professionals"
};


export default function BecomeInstructorPage() {
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userRole = user.role;
  return (
    <div className="main-content  " style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* <MetaComponent meta={metadata} /> */}
      <MetaComponent meta={pageMetadata} />

      <Preloader />
      <Header userRole={userRole}/>
      <div className="content-wrapper  js-content-wrapper overflow-hidden" style={{ flex: 1 }}>
        {/* <PageLinks /> */}
        <PageHeading />
        <section className="">
          <div className="container-fluid w-100 " style={{display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center'}}>
            <Tabs />
            <LearningCommon />
          </div>
        </section>

        <JoinToday />

        {/* <Instructors /> */}

       
      </div>
       <FooterOne />
    </div>
  );
}
