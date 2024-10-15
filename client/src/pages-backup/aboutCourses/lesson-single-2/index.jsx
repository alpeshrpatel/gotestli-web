import Descriptions from "@/components/aboutCourses-backup/lesson/Descriptions";
import LessonItems from "@/components/aboutCourses-backup/lesson/LessonItems";
import Reviews from "@/components/aboutCourses-backup/lesson/Reviews";
import Video from "@/components/aboutCourses-backup/lesson/Video";
import VideoTwo from "@/components/aboutCourses-backup/lesson/VideoTwo";
import Preloader from "@/components/common/Preloader";
import HeaderTen from "@/components/layout/headers/HeaderTen";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Lesson-single-1 || GoTestli - Ultimate School & General Purpose Quiz Platform",
  description:
    "Elevate your e-learning content with GoTestli, the most impressive LMS template for online courses, education and LMS platforms.",
};

export default function LessonSinglePage2() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />
      <HeaderTen />
      <div className="content-wrapper  js-content-wrapper overflow-hidden">
        <section className="layout-pt-lg layout-pb-lg lg:pt-40 lg:order-1">
          <div className="container">
            <div className="row justify-start marginCustom ">
              <div className="col-xxl-8 col-xl-7 col-lg-8">
                <VideoTwo />

                <Descriptions />
                <Reviews />
              </div>
            </div>
          </div>
        </section>
        <LessonItems rightPosition={true} />
      </div>
    </div>
  );
}
