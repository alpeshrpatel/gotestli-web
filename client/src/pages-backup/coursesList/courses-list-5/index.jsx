import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import CourseListFive from "@/components/courseList-backup/CourseListFive";

import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Couese-list-5 || GoTestli - Ultimate School & General Purpose Quiz Platform",
  description:
    "Elevate your e-learning content with GoTestli, the most impressive LMS template for online courses, education and LMS platforms.",
};

export default function CourseListPage5() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />
      <div className="content-wrapper  js-content-wrapper overflow-hidden">
        <PageLinks />
        <CourseListFive />
        <FooterOne />
      </div>
    </div>
  );
}
