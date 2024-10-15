import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";

import { useParams } from "react-router-dom";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import ProductDetails from "@/components/shop-backup/ProductDetails";
import RelatedProducts from "@/components/shop-backup/RelatedProducts";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Shop-details || GoTestli - Ultimate School & General Purpose Quiz Platform",
  description:
    "Elevate your e-learning content with GoTestli, the most impressive LMS template for online courses, education and LMS platforms.",
};
export default function ShopdetailsPage() {
  let params = useParams();
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />

      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />

        <ProductDetails id={params.id} />
        <RelatedProducts />

        <FooterOne />
      </div>
    </div>
  );
}
