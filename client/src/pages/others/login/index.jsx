import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";

import FooterOne from "@/components/layout/footers/FooterOne";
// import Header from "@/components/layout/headers/Header";
import HeaderAuth from "@/components/layout/headers/HeaderAuth";
import AuthImageMove from "@/components/others--backup/AuthImageMove";
import LoginForm from "@/components/others--backup/LoginForm";

import React from "react";
import MetaComponent from "@/components/common/MetaComponent";

// const metadata = {
//   title: " Login || GoTestli - Ultimate School & General Purpose Quiz Platform",
//   description: "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges."
// };

// const pageMetadata = {
//   title: "Login - GoTestli Quiz Platform | Access Your Educational Dashboard & Quizzes",
//   description: "Sign in to your GoTestli account to access your personalized dashboard, create quizzes, take assessments, track progress, and engage with interactive educational content. Secure login for students, instructors, and educators.",
//   keywords: "gotestli login, sign in, user login, quiz platform login, student login, instructor login, educator sign in, account access, platform login, quiz maker login, educational platform access, gotestli account, user authentication",
//   canonical: "https://gotestli.com/login",
//   category: "User Authentication",
//   subject: "User Login, Account Access, Platform Authentication, Sign In",
//   audience: "All Users, Students, Instructors, Educators, Quiz Creators, Account Holders"
// };
const pageMetadata = {
  title: "Login | Access Best Quiz App for Learning, Trivia & Quiz Maker – GoTestli Platform",
  description:
    "Sign in securely to GoTestli, the best quiz maker app for learning and trivia. Access your personalized dashboard, create interactive quizzes, take engaging assessments, track progress, and elevate your educational journey with our powerful quiz platform.",
  keywords:
    "best quiz app for learning, best quiz maker app, quiz app for trivia, gotestli login, sign in, user login, quiz platform login, student login, instructor login, educator sign in, account access, platform login, quiz maker login, educational platform access, gotestli account, user authentication",
  canonical: "https://gotestli.com/login",
  category: "User Authentication, Secure Login, Platform Access",
  subject: "User Login, Account Access, Secure Authentication, Educational Dashboard",
  audience: "All Users, Students, Instructors, Educators, Quiz Creators, Account Holders, Educational Professionals"
};


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
