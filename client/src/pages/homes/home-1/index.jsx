// import HomeOne from "@/components/homes/home";
import Header from "@/components/layout/headers/Header";
// import MobileMenu from "@/components/layout/component/MobileMenu";
import HomeHero from "@/components/homes/heros/HomeHero";
// import Brands from "@/components/common/Brands";
// import Categories from "@/components/homes/categories/Categories";
import Courses from "@/components/homes/courses/Courses";
import FooterOne from "@/components/layout/footers/FooterOne";
import Preloader from "@/components/common/Preloader";

import MetaComponent from "@/components/common/MetaComponent";
// import { auth, db } from "@/firebase/Firebase";
// import {
//   addDoc,
//   collection,
//   doc,
//   Firestore,
//   getDoc,
//   setDoc,
// } from "firebase/firestore";
import { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import FeedbackButton from "@/components/common/FeedbackButton";
import PayPalButton from "@/components/common/PayPalButton";
import PaymentComponent from "@/components/common/PaymentComponent";

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
  //          // console.log(docSnap.data().role);
  //       } else {
  //          // console.log("No role found for this user");
  //       }
  //     } else {
  //        // console.log("No user is logged in");
  //     }
  //     setIsLoading(false);
  //   }
  //   checkUserRole();
  // }, []);
  const user = JSON.parse( localStorage.getItem('user')) || '';
  const userRole = user.role;

  const handleSuccess = (data) => {
    console.log('Payment successful:', data);
    // Handle successful payment
  };

  const handleError = (error) => {
    console.error('Payment error:', error);
    // Handle payment error
  };

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
            <FeedbackButton />
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
         <PayPalButton
      amount="99.99"
      onSuccess={handleSuccess}
      onError={handleError}
    />
    <PaymentComponent/>
            <FooterOne />
          </div>
        </>
      )}
    </>
  );
}
