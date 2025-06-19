import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";

import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import HeaderAuth from "@/components/layout/headers/HeaderAuth";
import AuthImageMove from "@/components/others--backup/AuthImageMove";
import LoginForm from "@/components/others--backup/LoginForm";
import Terms from "@/components/terms/Terms";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";

// const metadata = {
//   title: " Login || GoTestli - Ultimate School & General Purpose Quiz Platform",
//   description: "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges."
// };

const pageMetadata = {
  title: "Sign Up Free - GoTestli Quiz Platform | Create Professional Quizzes in Minutes",
  description: "Join educators worldwide using GoTestli's advanced quiz maker. Create engaging quizzes, assessments & tests for free. No credit card required. Start building professional quizzes today!",
  keywords: "sign up gotestli, create quiz account, free quiz maker signup, quiz platform registration, educational quiz account, online assessment signup, quiz builder free trial, teacher quiz account, student quiz registration, quiz creation tool signup, assessment platform account, e-learning quiz signup, interactive quiz maker, quiz software registration, educational technology signup",
  canonical: "https://gotestli.com/login",
  category: "User Registration",
  subject: "Account Creation, Quiz Platform Access, Educational Technology Signup",
  audience: "Educators, Teachers, Students, Corporate Trainers, Educational Institutions, HR Professionals",
}
export default function LoginPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={pageMetadata} />
      <Preloader />

      <HeaderAuth />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <section className="form-page js-mouse-move-container">
          <AuthImageMove />
          <LoginForm />
        </section>
      </div>
    </div>
  );
}
