import About from "@/components/about/About";
import WhyQuiz from "./WhyQuiz";
import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";

import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

// const metadata = {
//   title: " About || GoTestli - Ultimate School & General Purpose Quiz Platform",
//   description:
//     "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges.",
// };

 const pageMetadata = {
    title: "About GoTestli - Leading Quiz Platform for Schools & Educators",
    description: "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges",
    keywords: "about gotestli, quiz platform company, educational technology",
    canonical: "https://gotestli.com/about",
    category: "About Us",
    subject: "Company Information, Educational Technology",
    audience: "Educators, Students, Corporate Trainers"
  };

export default function AboutPage() {
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userRole = user.role;
  return (
    <div className="main-content" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <MetaComponent meta={pageMetadata} />
      <Preloader />

      <Header userRole={userRole}/>
      <div className="content-wrapper js-content-wrapper overflow-hidden w-100" style={{ flex: 1 }}>
        {/* <PageLinks /> */}
        <About />
        <WhyQuiz />

        {/* <TestimonialsOne />
        <Instructors />
        <Brands /> */}

       
      </div>
       <FooterOne />
    </div>
  );
}
