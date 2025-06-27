import Preloader from "@/components/common/Preloader";
import DashboardOne from "@/components/dashboard/DashboardOne";
import Sidebar from "@/components/dashboard/Sidebar";
import HeaderDashboard from "@/components/layout/headers/HeaderDashboard";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
import Header from "@/components/layout/headers/Header";
import InstructorDashboardOne from "./InstructorDashboardOne";

// const metadata = {
//   title:
//     "Dashboard || GoTestli - Ultimate School & General Purpose Quiz Platform",
//   description:
//     "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges.",
// };

// const pageMetadata = {
//   title: "Instructor Dashboard - GoTestli Quiz Platform | Teaching Analytics & Quiz Management Center",
//   description: "Access your comprehensive instructor dashboard on GoTestli. Monitor student progress, analyze quiz performance, manage educational content, track engagement metrics, and optimize your teaching effectiveness with powerful analytics tools.",
//   keywords: "instructor dashboard gotestli, teaching dashboard, educator analytics, quiz performance tracking, student progress monitoring, instructor control panel, teaching metrics, educational analytics dashboard, quiz management interface, instructor workspace, teaching effectiveness tools, educator dashboard",
//   canonical: "https://gotestli.com/instructor/dashboard",
//   category: "Instructor Dashboard",
//   subject: "Instructor Analytics, Teaching Dashboard, Student Progress, Quiz Performance",
//   audience: "Instructors, Teachers, Educators, Course Creators, Training Professionals"
// };
const pageMetadata = {
  title: "Instructor Dashboard | Best Quiz Maker App for Learning & Trivia – GoTestli Teaching Analytics",
  description:
    "Access your GoTestli instructor dashboard, the best quiz app for learning and trivia. Monitor student progress, analyze quiz performance, manage educational content, and track engagement metrics with advanced analytics to optimize your teaching effectiveness.",
  keywords:
    "best quiz app for learning, best quiz maker app, quiz app for trivia, instructor dashboard gotestli, teaching dashboard, educator analytics, quiz performance tracking, student progress monitoring, instructor control panel, teaching metrics, educational analytics dashboard, quiz management interface, instructor workspace, teaching effectiveness tools, educator dashboard",
  canonical: "https://gotestli.com/instructor/dashboard",
  category: "Instructor Dashboard, Teaching Analytics, Quiz Management",
  subject: "Instructor Analytics, Teaching Dashboard, Student Progress, Quiz Performance, Educator Tools",
  audience: "Instructors, Teachers, Educators, Course Creators, Training Professionals, E-Learning Specialists"
};


export default function InstructorDashboard({role}) {
  return (
    <div className="barba-container" data-barba="container">
      <MetaComponent meta={pageMetadata} />
      <main className="main-content">
        <Preloader />
        <Header userRole={role}/>
        <div className="content-wrapper js-content-wrapper overflow-hidden">
          <div
            id="dashboardOpenClose"
            className="dashboard -home-9 js-dashboard-home-9 w-100"
          >
            {/* <div className="dashboard__sidebar scroll-bar-1">
              <Sidebar />
            </div> */}
            <InstructorDashboardOne />
          </div>
        </div>
      </main>
    </div>
  );
}
