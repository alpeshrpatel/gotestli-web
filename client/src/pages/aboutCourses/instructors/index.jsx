import InstractorSingle from "@/components/aboutCourses-backup/instractors/InstractorSingle";
import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import React from "react";
import { useParams } from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Instractors-single || GoTestli - Ultimate School & General Purpose Quiz Platform",
  description:
    "Elevate your e-learning content with GoTestli, the most impressive LMS template for online courses, education and LMS platforms.",
};
export default function InstractorSinglePage() {
  let params = useParams();
  return (
    <div className="main-content  " style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <MetaComponent meta={metadata} />
      <Preloader />
      <Header />
      <div className="content-wrapper  js-content-wrapper overflow-hidden" style={{ flex: 1 }}>
        <PageLinks />
        <InstractorSingle id={params.id} />
      
      </div>
        <FooterOne />
    </div>
  );
}
