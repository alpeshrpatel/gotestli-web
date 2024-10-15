import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import CourseDetailsFour from "@/components/courseSingle-backup/CourseDetailsFour";

import CourseSlider from "@/components/courseSingle-backup/CourseSlider";
import FooterOne from "@/components/layout/footers/FooterOne";
import { useParams } from "react-router-dom";
import Header from "@/components/layout/headers/Header";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Couese-single-4 || GoTestli - Ultimate School & General Purpose Quiz Platform",
  description:
    "Elevate your e-learning content with GoTestli, the most impressive LMS template for online courses, education and LMS platforms.",
};

export default function CourseSinglePage4() {
  let params = useParams();
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />
      <div className="content-wrapper  js-content-wrapper">
        <PageLinks />
        <CourseDetailsFour id={params.id} />
        <CourseSlider />
        <FooterOne />
      </div>
    </div>
  );
}
