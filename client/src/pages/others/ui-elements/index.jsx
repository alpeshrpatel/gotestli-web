import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";

import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import Accordions from "@/components/uiElements--backup/Accordions";
import Buttons from "@/components/uiElements--backup/Buttons";
import Form from "@/components/uiElements--backup/Form";
import MessageBoxes from "@/components/uiElements--backup/MessageBoxes";
import PageHeading from "@/components/uiElements--backup/PageHeading";
import ProgressBars from "@/components/uiElements--backup/ProgressBars";
import Table from "@/components/uiElements--backup/Table";
import Tabs from "@/components/uiElements--backup/Tabs";
import Tooltips from "@/components/uiElements--backup/Tooltips";
import Typography from "@/components/uiElements--backup/Typography";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "UI elements || Educrat - Professional LMS Online Education Course ReactJS Template",
  description:
    "Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.",
};
import React from "react";

export default function UIElementsPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />

      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />
        <PageHeading />
        <section className="layout-pb-lg">
          <div className="container">
            <div className="row y-gap-50">
              <Accordions />
              <Tabs />
              <Table />
              <MessageBoxes />
            </div>
            <Buttons />
            <Form />
            <div className="row y-gap-30 justify-between mt-50">
              <Tooltips />
              <ProgressBars />
            </div>
            <Typography />
          </div>
        </section>

        <FooterOne />
      </div>
    </div>
  );
}
