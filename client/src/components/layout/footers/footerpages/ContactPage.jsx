
import MetaComponent from "@/components/common/MetaComponent";
import Preloader from "@/components/common/Preloader";
import React from "react";
import Header from "../../headers/Header";
import ContactOne from "@/components/contacts-backup/ContactOne";
import Faq from "@/components/common/Faq";
import FooterOne from "../FooterOne";


const metadata = {
    title: " Contact || GoTestli - Ultimate School & General Purpose Quiz Platform",
    description:
      "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges.",
};

export default function ContactPage() {
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userRole = user.role;
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />

      <Preloader />

      <Header userRole={userRole}/>
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <ContactOne />
        <Faq />
        <FooterOne />
      </div>
    </div>
  );
}
