import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import CourseDetailsOne from "@/components/courseSingle-backup/CourseDetailsOne";
import CourseSlider from "@/components/courseSingle-backup/CourseSlider";
import FooterOne from "@/components/layout/footers/FooterOne";
import { useParams } from "react-router-dom";
import Header from "@/components/layout/headers/Header";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Couese-single-1 || GoTestli - Ultimate School & General Purpose Quiz Platform",
  description:
    "Elevate your e-learning content with GoTestli, the most impressive LMS template for online courses, education and LMS platforms.",
};

export default function CourseSinglePage1() {
  let params = useParams();
  <Preloader />;
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Header />
      <div className="content-wrapper  js-content-wrapper ">
        <PageLinks />
        <CourseDetailsOne id={params.id} />
        <CourseSlider />
        <FooterOne />
      </div>
    </div>
  );
}
