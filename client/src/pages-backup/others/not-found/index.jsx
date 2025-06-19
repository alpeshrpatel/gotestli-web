import NotFound from "@/components/not-found/NotFound";
import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";
import EventsOne from "@/components/events-backup/EventsOne";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";

// const metadata = {
//   title:
//     "Page not found || GoTestli - Ultimate School & General Purpose Quiz Platform",
//   description:
//     "Elevate your e-learning content with GoTestli, the most impressive LMS template for online courses, education and LMS platforms.",
// };
const pageMetadata = {
  title: "Page Not Found (404) - GoTestli General Purpose Quiz Platform | Return to Creating Amazing Quizzes",
  description: "Oops! The page you're looking for doesn't exist. Don't worry - explore GoTestli's powerful quiz creation tools, browse our quiz library, or create your free account to start building engaging educational content.",
  keywords: "404 error, page not found, gotestli quiz platform, quiz maker, create quizzes, educational platform, quiz library, online assessment tools, quiz creation help, quiz platform navigation",
  canonical: "https://gotestli.com/404",
  category: "Error Page",
  subject: "404 Error, Page Not Found, Quiz Platform Navigation",
  audience: "All Users, Educators, Students, Quiz Creators",
}
export default function NotFoundpage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={pageMetadata} />

      <Preloader />

      <Header />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <PageLinks />
        <NotFound />
        <FooterOne />
      </div>
    </div>
  );
}
