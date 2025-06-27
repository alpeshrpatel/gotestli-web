
import MetaComponent from "@/components/common/MetaComponent";
import Preloader from "@/components/common/Preloader";
import React from "react";
import Header from "../../headers/Header";
import ContactOne from "@/components/contacts-backup/ContactOne";
import Faq from "@/components/common/Faq";
import FooterOne from "../FooterOne";


// const metadata = {
//     title: " Contact || GoTestli - Ultimate School & General Purpose Quiz Platform",
//     description:
//       "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges.",
// };


// const pageMetadata = {
//   title: "Contact Us - GoTestli Quiz Platform | Get Support & Connect with Our Team",
//   description: "Get in touch with GoTestli's support team. Contact us for platform assistance, sales inquiries, technical support, or partnership opportunities. We're here to help you succeed with our quiz creation platform.",
//   keywords: "contact gotestli, gotestli support, quiz platform contact, customer support, technical help, sales inquiry, contact quiz platform, gotestli customer service, platform assistance, quiz maker support, educational platform contact, gotestli team, support ticket, help center contact",
//   canonical: "https://gotestli.com/contact",
//   category: "Contact & Support",
//   subject: "Contact Information, Customer Support, Platform Assistance, Communication",
//   audience: "All Users, Potential Customers, Existing Users, Educators, Students, Business Inquiries"
// };
const pageMetadata = {
  title: "Contact GoTestli – Support for the Best Quiz Maker App for Learning & Trivia",
  description:
    "Need help with the best quiz app for learning and trivia? Contact GoTestli for platform assistance, technical support, sales, or partnerships. Our team is here to support your success with our quiz maker app.",
  keywords:
    "contact GoTestli, best quiz maker app support, best quiz app for learning help, quiz app for trivia assistance, quiz platform contact, customer support, educational quiz tool help, GoTestli team support, sales inquiry, contact educational platform, help center, technical quiz help, get support from GoTestli",
  canonical: "https://gotestli.com/contact",
  category: "Contact & Support, Customer Service",
  subject: "Contact Information, Quiz Platform Support, Technical Assistance, Sales & Partnerships",
  audience: "All Users, Educators, Students, Business Partners, Quiz Creators, Potential Customers"
};


export default function ContactPage() {
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userRole = user.role;
  return (
    <div className="main-content  " style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <MetaComponent meta={pageMetadata} />

      <Preloader />

      <Header userRole={userRole}/>
      <div className="content-wrapper js-content-wrapper overflow-hidden" style={{ flex: 1 }}>
        <ContactOne />
        <Faq />

      </div>
      <FooterOne />
    </div>
  );
}
