import Preloader from "@/components/common/Preloader";
import HeaderAuth from "@/components/layout/headers/HeaderAuth";
import AuthImageMove from "@/components/others--backup/AuthImageMove";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";
import ForgetPassword from "@/components/others--backup/ForgetPassword";

// const metadata = {
//   title: " Forget Password || GoTestli - Ultimate School & General Purpose Quiz Platform",
//   description: "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges."
// };

// const pageMetadata = {
//   title: "Forgot Password - GoTestli Quiz Platform | Reset Your Account Password Securely",
//   description: "Reset your GoTestli account password quickly and securely. Enter your email to receive password reset instructions and regain access to your quiz platform account, courses, and educational content.",
//   keywords: "forgot password gotestli, password reset, recover account, reset password, account recovery, forgotten password, password help, login assistance, account access help, password recovery gotestli, reset account password, login problems",
//   canonical: "https://gotestli.com/forgot-password",
//   category: "Account Recovery",
//   subject: "Password Reset, Account Recovery, Login Assistance, Security",
//   audience: "All Users, Students, Instructors, Educators, Account Holders"
// };
const pageMetadata = {
  title: "Forgot Password | Reset Access on Best Quiz App for Learning & Trivia – GoTestli Platform",
  description:
    "Reset your GoTestli account password quickly and securely. Regain access to the best quiz maker app for learning and trivia by entering your email to receive password reset instructions and resume creating engaging educational content.",
  keywords:
    "best quiz app for learning, best quiz maker app, quiz app for trivia, forgot password gotestli, password reset, recover account, reset password, account recovery, forgotten password, password help, login assistance, account access help, password recovery gotestli, reset account password, login problems",
  canonical: "https://gotestli.com/forgot-password",
  category: "Account Recovery, Password Assistance, User Support",
  subject: "Password Reset, Account Recovery, Login Assistance, Account Security",
  audience: "All Users, Students, Instructors, Educators, Account Holders, Quiz Creators"
};


export default function ForgetPasswordPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={pageMetadata} />
      <Preloader />

      <HeaderAuth />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <section className="form-page js-mouse-move-container">
          <AuthImageMove />
          <ForgetPassword />
        </section>
      </div>
    </div>
  );
}
