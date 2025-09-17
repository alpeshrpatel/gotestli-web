import Preloader from "@/components/common/Preloader";
import Sidebar from "@/components/dashboard/Sidebar";
import React, { useEffect, useState } from "react";
import MetaComponent from "@/components/common/MetaComponent";
import Header from "@/components/layout/headers/Header";
import { useLocation } from "react-router-dom";
import AdminDashboardOne from "./AdminDashboardOne";
import EmailMarketingDashboard from "./EmailMarketingDashboard";

// const metadata = {
//   title:
//     "Dashboard || GoTestli - Ultimate School & General Purpose Quiz Platform",
//   description:
//     "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges.",
// };

// const pageMetadata = {
//   title: "Dashboard - GoTestli Quiz Platform | Your Central Hub for Quiz Management & Analytics",
//   description: "Access your GoTestli dashboard to manage quizzes, track performance, view analytics, and control your educational content. Your comprehensive control center for quiz creation, student management, and learning insights.",
//   keywords: "gotestli dashboard, quiz platform dashboard, quiz management center, educational dashboard, quiz analytics, platform control center, quiz creator dashboard, learning management dashboard, quiz performance tracking, educational analytics, platform overview, quiz administration",
//   canonical: "https://gotestli.com/dashboard",
//   category: "Platform Dashboard",
//   subject: "Dashboard, Quiz Management, Platform Control, Analytics Overview",
//   audience: "All Users, Instructors, Students, Administrators, Quiz Creators"
// };

const pageMetadata = {
  title: "Dashboard | Best Quiz App for Learning, Trivia & Analytics – GoTestli",
  description:
    "Access your GoTestli dashboard, the control center of the best quiz app for learning and trivia. Manage quizzes, track student performance, analyze quiz results, and get insights to elevate your educational content.",
  keywords:
    "best quiz app for learning, best quiz maker app, quiz app for trivia, GoTestli dashboard, quiz management center, quiz analytics, educational dashboard, quiz creator tools, learning management system, student performance tracking, educational analytics, quiz administration, online quiz platform",
  canonical: "https://gotestli.com/dashboard",
  category: "Dashboard, Quiz Management, Analytics",
  subject: "Dashboard, Quiz Platform Control, Learning Analytics, Quiz Creator Center",
  audience: "Educators, Instructors, Quiz Creators, Administrators, Students, Training Organizations"
};


export default function EmailMarketingPage() {
 
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userRole = user.role;
  const { pathname } = useLocation();

  
  return (
    <div className="barba-container" data-barba="container">
      <MetaComponent meta={pageMetadata} />
      <main className="main-content">
        <Preloader />
        <Header userRole={userRole} />
        <div className="">
          <div
           
          >
            {/* <div className="dashboard__sidebar scroll-bar-1">
              <Sidebar />
            </div> */}

           <EmailMarketingDashboard />
          </div>
        </div>
      </main>
    </div>
  );
}
