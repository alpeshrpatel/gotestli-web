import RelatedBlogs from "@/components/blogs-backup/RelatedBlogs";
import PageLinks from "@/components/common/PageLinks";

import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import React from "react";
import BlogDetails from "@/components/blogs-backup/BlogDetails";
import Preloader from "@/components/common/Preloader";
import { useParams } from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Blog-details || GoTestli - Ultimate School & General Purpose Quiz Platform",
  description:
    "Elevate your e-learning content with GoTestli, the most impressive LMS template for online courses, education and LMS platforms.",
};

export default function BlogdetailsPage() {
  let params = useParams();
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />

      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />

        <BlogDetails id={params.id} />

        <RelatedBlogs />

        <FooterOne />
      </div>
    </div>
  );
}
