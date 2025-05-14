
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
import Preloader from "@/components/common/Preloader";
import Header from "../../headers/Header";
import PageHeading from "@/components/courseList-backup/PageHeading";
import Tabs from "@/components/uiElements--backup/Tabs";
import JoinToday from "@/components/aboutCourses-backup/become/JoinToday";
import FooterOne from "../FooterOne";
import LearningCommon from "@/components/common/LearningCommon";

const metadata = {
  title: " Become Instructor || GoTestli - Ultimate School & General Purpose Quiz Platform",
    description:
      "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges.",
};

export default function BecomeInstructorPage() {
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userRole = user.role;
  return (
    <div className="main-content  " style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* <MetaComponent meta={metadata} /> */}
      <MetaComponent meta={metadata} />

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
