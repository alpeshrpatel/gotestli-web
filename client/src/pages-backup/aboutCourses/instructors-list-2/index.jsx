import InatractorsTwo from "@/components/aboutCourses-backup/instractors/InatractorsTwo";
import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Instractors-list-2 || GoTestli - Ultimate School & General Purpose Quiz Platform",
  description:
    "Elevate your e-learning content with GoTestli, the most impressive LMS template for online courses, education and LMS platforms.",
};

export default function InstractorListPage2() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Header />
      <Preloader />
      <div className="content-wrapper  js-content-wrapper overflow-hidden">
        <PageLinks />
        <InatractorsTwo />
        <FooterOne />
      </div>
    </div>
  );
}
