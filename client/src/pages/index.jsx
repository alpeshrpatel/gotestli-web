import React from "react";
import Wrapper from "./Wrapper";
import HomePage1 from "./homes/home-1";
import MetaComponent from "@/components/common/MetaComponent";
import { Button, useTheme } from "@mui/material";

// const metadata = {
//   title: " Home || GoTestli - Ultimate School & General Purpose Quiz Platform",
//   description: "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges."
// };

// const pageMetadata = {
//   title: "GoTestli - Ultimate Quiz & LMS Platform | Transform E-Learning with Interactive Assessments",
//   description: "Elevate your e-learning experience with GoTestli's impressive LMS template. Create stunning online courses, interactive quizzes, and comprehensive educational platforms. Perfect for schools, educators, and training organizations.",
//   keywords: "gotestli lms platform, e-learning template, online course platform, quiz lms system, educational platform template, interactive learning management, online education template, lms for schools, e-learning solution, quiz creation lms, educational technology platform, online learning template, course management system",
//   canonical: "https://gotestli.com/home-1",
//   category: "LMS Landing Page",
//   subject: "LMS Platform, E-Learning Template, Online Education, Course Management",
//   audience: "Educational Institutions, Course Creators, Training Organizations, E-Learning Developers, School Administrators"
// };

const pageMetadata = {
  title: "GoTestli – Best Quiz App for Learning & Trivia | Interactive LMS Platform for E-Learning",
  description:
    "Transform e-learning with GoTestli, the best quiz maker app for learning and trivia. Create interactive online courses, engaging quizzes, and a complete LMS platform for schools, educators, and training organizations.",
  keywords:
    "best quiz app for learning, best quiz maker app, quiz app for trivia, GoTestli LMS platform, e-learning template, online course builder, interactive quizzes, educational platform, learning management system, quiz creation LMS, LMS for schools, online education tools, course management software, e-learning solution, digital classroom platform",
  canonical: "https://gotestli.com/home-1",
  category: "LMS, E-Learning, Interactive Quizzes, Educational Technology",
  subject: "Quiz Platform, Learning Management System, E-Learning Tools, Online Education",
  audience: "Educators, Schools, Training Organizations, E-Learning Professionals, Course Creators, School Administrators"
};


export default function index() {
  const theme = useTheme();
  return (
    <Wrapper >
      <MetaComponent meta={pageMetadata} />
      <HomePage1 />
    </Wrapper>
  );
}
