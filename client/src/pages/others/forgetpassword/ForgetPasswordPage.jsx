import Preloader from "@/components/common/Preloader";
import HeaderAuth from "@/components/layout/headers/HeaderAuth";
import AuthImageMove from "@/components/others--backup/AuthImageMove";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";
import ForgetPassword from "@/components/others--backup/ForgetPassword";

const metadata = {
  title: " Forget Password || GoTestli - Ultimate School & General Purpose Quiz Platform",
  description: "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges."
};
export default function ForgetPasswordPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
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
