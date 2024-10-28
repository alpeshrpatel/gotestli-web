// import HomeOne from "@/components/homes/home";
import Header from "@/components/layout/headers/Header";
// import MobileMenu from "@/components/layout/component/MobileMenu";
import HomeHero from "@/components/homes/heros/HomeHero";
import Brands from "@/components/common/Brands";
import Categories from "@/components/homes/categories/Categories";
import Courses from "@/components/homes/courses/Courses";
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
import Loader from "@/components/common/Loader";

const metadata = {
  title: " Home || GoTestli - Ultimate School & General Purpose Quiz Platform",
  description:
    "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges.",
};

export default function HomePage1() {
  // const [userRole, setUserRole] = useState("");
   const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   async function checkUserRole() {
  //     setIsLoading(true);
  //     if (auth.currentUser) {
  //       const userId = auth.currentUser.uid;
  //       const docRef = doc(db, "roles", userId);
  //       const docSnap = await getDoc(docRef);

  //       if (docSnap.exists()) {
  //         setUserRole(docSnap.data().role);
  //         console.log(docSnap.data().role);
  //       } else {
  //         console.log("No role found for this user");
  //       }
  //     } else {
  //       console.log("No user is logged in");
  //     }
  //     setIsLoading(false);
  //   }
  //   checkUserRole();
  // }, []);
  const user = JSON.parse( localStorage.getItem('user')) || '';
  const userRole = user.role;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Preloader />
          <MetaComponent meta={metadata} />
          <Header userRole = {userRole}/>

          <div className="content-wrapper  js-content-wrapper overflow-hidden w-100">
            {!userRole && (
              <>
                <HomeHero />
                {/* <Brands />
                <Categories /> */}
              </>
            )}

            <div className={`${userRole && `mt-80`}`}></div>
            <Courses userRole={userRole}/>
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
      )}
    </>
  );
}
