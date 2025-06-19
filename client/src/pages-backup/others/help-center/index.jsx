import Faq from "@/components/common/Faq";
import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";

import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import HelpCenter from "@/components/others--backup/HelpCenter";
import Terms from "@/components/terms/Terms";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";

// const metadata = {
//   title:
//     "Help-center || GoTestli - Ultimate School & General Purpose Quiz Platform",
//   description:
//     "Elevate your e-learning content with GoTestli, the most impressive LMS template for online courses, education and LMS platforms.",
// };
const pageMetadata = {
  title: "Help Center - GoTestli Quiz Platform | Support & Documentation for Ultimate Quiz Creation",
  description: "Get comprehensive support for GoTestli's quiz platform. Find tutorials, FAQs, troubleshooting guides, and step-by-step documentation for creating engaging quizzes, managing assessments, and maximizing your e-learning experience.",
  keywords: "gotestli help center, quiz platform support, quiz creation help, LMS documentation, online quiz tutorials, assessment platform guide, quiz maker support, e-learning help, educational platform assistance, quiz troubleshooting, gotestli tutorials, quiz platform FAQ, online assessment help, quiz creation guide, LMS support center",
  canonical: "https://gotestli.com/faq",
  category: "Support & Documentation",
  subject: "Help Center, Platform Support, Quiz Creation Assistance, User Documentation",
  audience: "Educators, Students, Quiz Creators, Platform Administrators, E-learning Professionals"
};

export default function HelpCenterPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={pageMetadata} />
      <Preloader />

      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />
        <HelpCenter />
        <Faq />
        <FooterOne />
      </div>
    </div>
  );
}
