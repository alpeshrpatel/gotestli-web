import React from "react";
import Wrapper from "./Wrapper";
import HomePage1 from "./homes/home-1";
import MetaComponent from "@/components/common/MetaComponent";

// const metadata = {
//   title: " Home || GoTestli - Ultimate School & General Purpose Quiz Platform",
//   description: "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges."
// };
const pageMetadata = {
  title: "GoTestli - Ultimate Quiz Platform for Schools & Education | Create Engaging Online Assessments",
  description: "Transform education with GoTestli's powerful quiz platform. Create interactive quizzes, manage assessments, and boost student engagement. Perfect for schools, teachers, and educational institutions. Start your free trial today!",
  keywords: "online quiz platform, educational quiz maker, school quiz software, quiz creation platform, interactive assessments, gotestli quiz app, e-learning platform, student engagement tools, classroom quizzes, educational technology, online assessment tools, quiz builder, learning management system, digital education platform, quiz platform for schools",
  canonical: "https://gotestli.com",
  category: "Landing Page",
  subject: "Quiz Platform, Educational Technology, Online Assessments, E-learning Solutions",
  audience: "Educators, Teachers, Students, School Administrators, Educational Institutions, Training Organizations"
};
export default function index() {
  return (
    <Wrapper>
      <MetaComponent meta={pageMetadata} />
      <HomePage1 />
    </Wrapper>
  );
}
