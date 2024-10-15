import JoinToday from "@/components/aboutCourses-backup/become/JoinToday";
import PageHeading from "@/components/aboutCourses-backup/become/PageHeading";
import Tabs from "@/components/aboutCourses-backup/become/Tabs";
import Instructors from "@/components/common/Instructors";
import LearningCommon from "@/components/common/LearningCommon";

import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";

import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Instractors-become || GoTestli - Ultimate School & General Purpose Quiz Platform",
  description:
    "Elevate your e-learning content with GoTestli, the most impressive LMS template for online courses, education and LMS platforms.",
};

export default function InstractoBacomePage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />

      <Preloader />
      <Header />
      <div className="content-wrapper  js-content-wrapper overflow-hidden">
        <PageLinks />
        <PageHeading />
        <section className=" layout-pb-lg">
          <div className="container">
            <Tabs />
            <LearningCommon />
          </div>
        </section>

        <JoinToday />

        <Instructors />

        <FooterOne />
      </div>
    </div>
  );
}
