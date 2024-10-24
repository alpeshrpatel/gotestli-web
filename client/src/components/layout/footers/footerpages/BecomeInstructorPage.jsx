
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
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />

      <Preloader />
      <Header />
      <div className="content-wrapper  js-content-wrapper overflow-hidden">
        {/* <PageLinks /> */}
        <PageHeading />
        <section className=" layout-pb-lg">
          <div className="container-fluid w-100 " style={{display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center'}}>
            <Tabs />
            <LearningCommon />
          </div>
        </section>

        <JoinToday />

        {/* <Instructors /> */}

        <FooterOne />
      </div>
    </div>
  );
}