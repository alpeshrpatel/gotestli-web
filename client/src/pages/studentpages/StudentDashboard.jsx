import Preloader from "@/components/common/Preloader";
import DashboardOne from "@/components/dashboard/DashboardOne";
import Sidebar from "@/components/dashboard/Sidebar";
import HeaderDashboard from "@/components/layout/headers/HeaderDashboard";
import React, { useEffect, useState } from "react";

import MetaComponent from "@/components/common/MetaComponent";
import Header from "@/components/layout/headers/Header";
import StudentDashboardOne from "./StudentDashboardOne";
import { useLocation } from "react-router-dom";
import StudentQuizzes from "./StudentQuizzes";
import NotFoundPage from "../not-found";

// const metadata = {
//   title:
//     "Dashboard || GoTestli - Ultimate School & General Purpose Quiz Platform",
//   description:
//     "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges.",
// };
const pageMetadata = {
  title: "Student Dashboard - GoTestli Quiz Platform | Your Learning Hub & Progress Center",
  description: "Welcome to your GoTestli student dashboard. Access your quizzes, track learning progress, view upcoming assessments, review performance analytics, and manage your educational journey all in one place.",
  keywords: "student dashboard gotestli, learning dashboard, student portal, quiz dashboard, student progress hub, learning analytics, student performance tracking, educational dashboard, quiz management for students, student learning center, academic progress tracker, quiz platform dashboard, student assessment portal, learning progress overview",
  canonical: "https://gotestli.com/student/dashboard",
  category: "Student Dashboard",
  subject: "Student Dashboard, Learning Hub, Progress Tracking, Student Portal",
  audience: "Students, Learners, Quiz Participants, Educational Users"
};


export default function StudentDashboard() {
 
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userRole = user.role;
  const { pathname } = useLocation();

  
  return (
    <div className="barba-container" data-barba="container">
      <MetaComponent meta={pageMetadata} />
      <main className="main-content">
        <Preloader />
        <Header userRole={userRole} />
        <div className="content-wrapper js-content-wrapper overflow-hidden">
          <div
            id="dashboardOpenClose"
            className="dashboard -home-9 js-dashboard-home-9"
          >
            {/* <div className="dashboard__sidebar scroll-bar-1">
              <Sidebar />
            </div> */}

            <StudentDashboardOne />
          </div>
        </div>
      </main>
    </div>
  );
}
