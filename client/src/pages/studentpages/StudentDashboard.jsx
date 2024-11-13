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

const metadata = {
  title:
    "Dashboard || GoTestli - Ultimate School & General Purpose Quiz Platform",
  description:
    "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges.",
};

export default function StudentDashboard() {
 
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userRole = user.role;
  const { pathname } = useLocation();

  
  return (
    <div className="barba-container" data-barba="container">
      <MetaComponent meta={metadata} />
      <main className="main-content">
        <Preloader />
        <Header userRole={userRole} />
        <div className="content-wrapper js-content-wrapper overflow-hidden">
          <div
            id="dashboardOpenClose"
            className="dashboard -home-9 js-dashboard-home-9"
          >
            <div className="dashboard__sidebar scroll-bar-1">
              <Sidebar />
            </div>

            <StudentDashboardOne />
          </div>
        </div>
      </main>
    </div>
  );
}
