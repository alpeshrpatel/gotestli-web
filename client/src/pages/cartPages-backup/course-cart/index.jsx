import BlogsOne from "@/components/blogs-backup/BlogsOne";
import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";

import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";

import React from "react";

import CourseCart from "../../../components/cartsAndCheckout-backup/CourseCart";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Course-cart || GoTestli - Ultimate School & General Purpose Quiz Platform",
  description:
    "Elevate your e-learning content with GoTestli, the most impressive LMS template for online courses, education and LMS platforms.",
};
export default function CourseCartPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />

      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />

        <CourseCart />

        <FooterOne />
      </div>
    </div>
  );
}
