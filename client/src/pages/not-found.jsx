import NotFound from "@/components/not-found/NotFound";
import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";

import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Page not found || GoTestli - Ultimate School & General Purpose Quiz Platform",
  description:
  "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges.",
};
export default function NotFoundPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />

      <Preloader />

      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        {/* <PageLinks /> */}
        <NotFound />
        <FooterOne />
      </div>
    </div>
  );
}
