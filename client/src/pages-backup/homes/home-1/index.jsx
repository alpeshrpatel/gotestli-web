// import HomeOne from "@/components/homes/home";
import Header from "@/components/layout/headers/Header";
// import MobileMenu from "@/components/layout/component/MobileMenu";

import HomeHero from "@/components/homes/heros/HomeHero";

import Brands from "@/components/common/Brands";
import Categories from "@/components/homes/categories/Categories";
import Courses from "@/components/homes/courses/Courses";
import TestimonialsOne from "@/components/common/TestimonialsOne";
import FeaturesOne from "@/components/homes/features/FeaturesOne";
import WhyCourse from "@/components/homes/WhyCourse";
import Instructors from "@/components/common/Instructors";
import GetApp from "@/components/homes/getApp/GetApp";
import Blog from "@/components/homes/blogs/Blog";
import Join from "@/components/homes/join/Join";
import FooterOne from "@/components/layout/footers/FooterOne";
import Preloader from "@/components/common/Preloader";

import MetaComponent from "@/components/common/MetaComponent";
import { auth, db } from "@/firebase/Firebase";
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

// const metadata = {
//   title: " Home || GoTestli - Ultimate School & General Purpose Quiz Platform",
//   description:
//     "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges.",
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
export default function HomePage1() {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    async function checkUserRole() {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const docRef = doc(db, "roles", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserRole(docSnap.data().role);
           // console.log(docSnap.data().role);
        } else {
           // console.log("No role found for this user");
        }
      } else {
         // console.log("No user is logged in");
      }
    }
    checkUserRole();
  }, []);

  return (
    <>
      <Preloader />
      <MetaComponent meta={pageMetadata} />
      <Header />

      <div className="content-wrapper  js-content-wrapper overflow-hidden w-100">
        {!userRole && (
          <>
            <HomeHero />
            <Brands />
            <Categories />
          </>
        )}
       
       <div className={`${userRole && `mt-80`}`}>
        
       </div>
        <Courses />
        {/* <TestimonialsOne />
        <FeaturesOne />
        <WhyCourse />
        <Instructors />
        <GetApp />
        <Blog />
        <Join /> */}
        <FooterOne />
      </div>
    </>
  );
}
