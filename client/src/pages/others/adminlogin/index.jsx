
import MetaComponent from "@/components/common/MetaComponent";
import Preloader from "@/components/common/Preloader";
import HeaderAuth from "@/components/layout/headers/HeaderAuth";
import AdminLoginForm from "@/components/others--backup/AdminLoginForm";
import AuthImageMove from "@/components/others--backup/AuthImageMove";
import React from "react";


// const metadata = {
//   title: "Admin Login || GoTestli - Ultimate School & General Purpose Quiz Platform",
//   description: "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges."
// };

// const pageMetadata = {
//   title: "Admin Login - GoTestli Quiz Platform | Secure Administrator Access Portal",
//   description: "Secure login portal for GoTestli platform administrators. Access administrative controls, manage platform operations, oversee user accounts, and maintain system integrity with our protected admin authentication system.",
//   keywords: "gotestli admin login, administrator access, platform admin portal, secure admin login, administrative authentication, system administrator login, platform management access, admin control panel login, administrative portal, secure access admin",
//   canonical: "https://gotestli.com/admin/login",
//   category: "Admin Authentication",
//   subject: "Admin Login, Administrator Access, Secure Authentication, Platform Management",
//   audience: "Platform Administrators, System Administrators, GoTestli Management Team, Authorized Admin Staff"
// };
const pageMetadata = {
  title: "Admin Login | Secure Access to Best Quiz Maker App for Learning & Trivia – GoTestli Platform",
  description:
    "Secure login portal for GoTestli administrators, the best quiz app for learning and trivia. Access administrative controls, manage platform operations, oversee user accounts, and maintain system integrity with our protected authentication system.",
  keywords:
    "best quiz app for learning, best quiz maker app, quiz app for trivia, gotestli admin login, administrator access, platform admin portal, secure admin login, administrative authentication, system administrator login, platform management access, admin control panel login, administrative portal, secure access admin",
  canonical: "https://gotestli.com/admin/login",
  category: "Admin Authentication, Secure Login, Platform Management",
  subject: "Admin Login, Administrator Access, Secure Authentication, Platform Control",
  audience: "Platform Administrators, System Admins, GoTestli Management Team, Authorized Admin Staff, Security Officers"
};


export default function AdminLoginPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={pageMetadata} />
      <Preloader />

      <HeaderAuth />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <section className="form-page js-mouse-move-container">
          <AuthImageMove />
          <AdminLoginForm />
        </section>
      </div>
    </div>
  );
}
