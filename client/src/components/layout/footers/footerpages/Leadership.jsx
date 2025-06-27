

// export default Leadership;
import MetaComponent from "@/components/common/MetaComponent";
import Preloader from "@/components/common/Preloader";
import React from "react";
import Header from "../../headers/Header";
import ContactOne from "@/components/contacts-backup/ContactOne";
import Faq from "@/components/common/Faq";
import FooterOne from "../FooterOne";
import LeadershipContent from "./LeadershipContent";


// const metadata = {
//     title: " Leadership || GoTestli - Ultimate School & General Purpose Quiz Platform",
//     description:
//       "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges.",
// };

// const pageMetadata = {
//   title: "Leadership Team - GoTestli Quiz Platform | Meet Our Educational Technology Leaders",
//   description: "Meet the visionary leadership team behind GoTestli's innovative quiz platform. Learn about our founders, executives, and key leaders who are transforming education through cutting-edge assessment technology and e-learning solutions.",
//   keywords: "gotestli leadership, leadership team, gotestli founders, company executives, educational technology leaders, quiz platform team, gotestli management, company leadership, edtech founders, platform creators, gotestli team members, educational innovation leaders, quiz platform executives",
//   canonical: "https://gotestli.com/leadership",
//   category: "Company Information",
//   subject: "Leadership Team, Company Executives, Founders, Management Team",
//   audience: "Investors, Partners, Media, Job Seekers, Stakeholders, Educational Institutions"
// };
const pageMetadata = {
  title: "Leadership Team | Innovators Behind the Best Quiz App for Learning & Trivia – GoTestli",
  description:
    "Meet the leaders behind GoTestli, the best quiz app for learning, trivia, and education. Our founders and executives are building the future of assessment with cutting-edge quiz maker tools and edtech innovation.",
  keywords:
    "gotestli leadership, best quiz app for learning, best quiz maker app, quiz app for trivia, educational technology leaders, edtech founders, quiz platform executives, company leadership team, platform creators, online quiz platform leadership, assessment technology experts, education innovation, GoTestli executives",
  canonical: "https://gotestli.com/leadership",
  category: "Company Information, EdTech Leadership",
  subject: "Leadership Team, Founders, EdTech Executives, Quiz Platform Creators, Educational Innovation",
  audience: "Investors, Partners, Media, Talent, Educational Institutions, Strategic Stakeholders"
};


export default function Leadership() {
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userRole = user.role;
  return (
    <div className="main-content  " style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <MetaComponent meta={pageMetadata} />

      <Preloader />

      <Header userRole={userRole}/>
      <div className="content-wrapper js-content-wrapper overflow-hidden" style={{ flex: 1 }}>
        <LeadershipContent/>
       
      </div>
       <FooterOne />
    </div>
  );
}
