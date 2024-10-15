import Preloader from "@/components/common/Preloader";
import DashboardOne from "@/components/dashboard/DashboardOne";
import Quiz from "@/components/dashboard/Quiz";
import Sidebar from "@/components/dashboard/Sidebar";
import HeaderDashboard from "@/components/layout/headers/HeaderDashboard";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Dashboard-quiz || GoTestli - Ultimate School & General Purpose Quiz Platform",
  description:
    "Elevate your e-learning content with GoTestli, the most impressive LMS template for online courses, education and LMS platforms.",
};
export default function DshbQuizPage() {
  return (
    <div className="barba-container" data-barba="container">
      <MetaComponent meta={metadata} />
      <main className="main-content">
        <Preloader />
        <HeaderDashboard />
        <div className="content-wrapper js-content-wrapper overflow-hidden">
          <div
            id="dashboardOpenClose"
            className="dashboard -home-9 js-dashboard-home-9"
          >
            <div className="dashboard__sidebar scroll-bar-1">
              <Sidebar />
            </div>
            <Quiz />
          </div>
        </div>
      </main>
    </div>
  );
}
