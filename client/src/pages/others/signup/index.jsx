
import Preloader from "@/components/common/Preloader";

import HeaderAuth from "@/components/layout/headers/HeaderAuth";
import AuthImageMove from "@/components/others--backup/AuthImageMove";
import LoginForm from "@/components/others--backup/LoginForm";
import SignUpForm from "@/components/others--backup/SignUpForm";

import React from "react";
import MetaComponent from "@/components/common/MetaComponent";

// const metadata = {
//   title: " Sign up || GoTestli - Ultimate School & General Purpose Quiz Platform",
//   description: "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges."
// };

// const pageMetadata = {
//   title: "Sign Up - GoTestli Quiz Platform | Create Your Free Educational Account Today",
//   description: "Join GoTestli and start creating engaging quizzes for free. Sign up as a student or instructor to access powerful quiz creation tools, interactive assessments, and comprehensive educational features. Get started in minutes!",
//   keywords: "gotestli sign up, create account, register gotestli, free quiz platform, join gotestli, student registration, instructor signup, quiz maker registration, educational platform signup, create free account, quiz platform registration, gotestli membership",
//   canonical: "https://gotestli.com/signup",
//   category: "User Registration",
//   subject: "Account Creation, User Registration, Platform Signup, New Member Registration",
//   audience: "New Users, Students, Instructors, Educators, Quiz Creators, Educational Institutions"
// };
const pageMetadata = {
  title: "Sign Up – Join the Best Quiz App for Learning & Trivia | GoTestli Quiz Platform",
  description:
    "Create your free account with GoTestli, the best quiz maker app for engaging learning and fun trivia. Sign up as a student or instructor to access powerful quiz creation tools, interactive assessments, and comprehensive educational features. Get started in minutes and elevate your e-learning experience!",
  keywords:
    "best quiz app for learning, best quiz maker app, quiz app for trivia, gotestli sign up, create account, register gotestli, free quiz platform, join gotestli, student registration, instructor signup, quiz maker registration, educational platform signup, create free account, quiz platform registration, gotestli membership",
  canonical: "https://gotestli.com/signup",
  category: "User Registration, Quiz Platform, E-Learning Tools",
  subject: "Account Creation, User Registration, Quiz Maker Signup, Educational Platform Access",
  audience: "New Users, Students, Instructors, Educators, Quiz Creators, Educational Institutions"
};

export default function SignupPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={pageMetadata} />
      <Preloader />

      <HeaderAuth />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <section className="form-page js-mouse-move-container">
          <AuthImageMove />
          <SignUpForm />
        </section>
      </div>
    </div>
  );
}
