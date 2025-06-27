import NotFound from "@/components/not-found/NotFound";
import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";

import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";

// const metadata = {
//   title:
//     "Page not found || GoTestli - Ultimate School & General Purpose Quiz Platform",
//   description:
//   "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges.",
// };

// const pageMetadata = {
//   title: "Page Not Found (404) - GoTestli Quiz Platform | Return to Creating Amazing Quizzes",
//   description: "Oops! The page you're looking for doesn't exist. Don't worry - explore GoTestli's powerful quiz creation tools, browse our quiz library, or create your free account to start building engaging educational content.",
//   keywords: "404 error, page not found, gotestli quiz platform, quiz maker, create quizzes, educational platform, quiz library, online assessment tools, quiz creation help, quiz platform navigation, gotestli homepage, return to platform",
//   canonical: "https://gotestli.com/404",
//   category: "Error Page",
//   subject: "404 Error, Page Not Found, Quiz Platform Navigation",
//   audience: "All Users, Educators, Students, Quiz Creators"
// };
const pageMetadata = {
  title: "Page Not Found (404) | Return to the Best Quiz App for Learning & Trivia – GoTestli",
  description:
    "Oops! This page doesn’t exist. Head back to GoTestli, the best quiz maker app for learning and trivia. Explore powerful quiz creation tools, browse our quiz library, or sign up free to start engaging students today.",
  keywords:
    "404 error, page not found, best quiz app for learning, best quiz maker app, quiz app for trivia, GoTestli quiz platform, create quizzes, educational content creation, online assessment tools, quiz library, quiz maker help, return to homepage, GoTestli navigation",
  canonical: "https://gotestli.com/404",
  category: "Error Page, Navigation Help",
  subject: "404 Error, Page Not Found, Quiz Platform Navigation, Educational Tools",
  audience: "All Users, Educators, Students, Quiz Creators, Visitors"
};


export default function NotFoundPage() {
  return (
    <div className="main-content " style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <MetaComponent meta={pageMetadata} />

      <Preloader />

      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden" style={{ flex: 1 }}>
        {/* <PageLinks /> */}
        <NotFound />
       
      </div>
       <FooterOne />
    </div>
  );
}
