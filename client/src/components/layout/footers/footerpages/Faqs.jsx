import MetaComponent from "@/components/common/MetaComponent";
import Preloader from "@/components/common/Preloader";
import React from "react";
import Header from "../../headers/Header";
import ContactOne from "@/components/contacts-backup/ContactOne";
import Faq from "@/components/common/Faq";
import FooterOne from "../FooterOne";


// const metadata = {
//     title: " FAQs || GoTestli - Ultimate School & General Purpose Quiz Platform",
//     description:
//       "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges.",
// };

// const pageMetadata = {
//   title: "FAQs - GoTestli Quiz Platform | Frequently Asked Questions & Quick Answers",
//   description: "Find answers to common questions about GoTestli's quiz platform. Get quick solutions for account setup, quiz creation, platform features, billing, and technical issues. Everything you need to know in one place.",
//   keywords: "gotestli faqs, frequently asked questions, quiz platform help, gotestli questions, platform support, quiz maker faq, common questions, gotestli answers, troubleshooting, platform guide, user questions, quiz creation help, gotestli documentation, platform assistance, quick answers",
//   canonical: "https://gotestli.com/faqs",
//   category: "Support & Documentation",
//   subject: "Frequently Asked Questions, Platform Help, User Support, Quick Answers",
//   audience: "All Users, New Users, Educators, Students, Platform Administrators, Potential Customers"
// };

const pageMetadata = {
  title: "FAQs – Best Quiz Maker App for Learning & Trivia | GoTestli Help & Support",
  description:
    "Explore FAQs about GoTestli, the best quiz app for learning and trivia. Find quick answers about quiz creation, platform features, billing, account setup, and more. Everything you need, all in one place.",
  keywords:
    "gotestli faqs, best quiz app for learning, best quiz maker app, quiz app for trivia, quiz platform help, quiz maker support, common questions, quiz creation help, troubleshooting, quiz platform documentation, platform assistance, user guide, quick answers, gotestli support center",
  canonical: "https://gotestli.com/faqs",
  category: "Support, Help Center, Documentation",
  subject: "Frequently Asked Questions, Quiz Platform Support, Learning App Help, Online Quiz Builder",
  audience: "New Users, Educators, Students, Quiz Creators, Platform Admins, Support Seekers"
};


export default function Faqs() {
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userRole = user.role;
  return (
    <div className="main-content  " style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <MetaComponent meta={pageMetadata} />

      <Preloader />

      <Header userRole={userRole}/>
      <div className="content-wrapper js-content-wrapper overflow-hidden" style={{ flex: 1 }}>
        <Faq />
      
      </div>
        <FooterOne />
    </div>
  );
}
