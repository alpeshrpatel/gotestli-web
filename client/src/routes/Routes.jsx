import Layout from "@/layout/Layout";
import HomePage1 from "@/pages/homes/home-1";
import React, { useState } from "react";
import { createBrowserRouter } from "react-router-dom";
import { auth, db } from "@/firebase/Firebase";
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { useEffect } from "react";
import LoginPage from "@/pages/others/login";
import SignupPage from "@/pages/others/signup";
import PrivateRoutesUser from "@/privateroutes/PrivateRoutesUser";
import QuizResult from "@/components/quiz/QuizResult";
import QuestionSet from "@/components/quiz/QuestionSet";
import SingleChoice from "@/components/quiz/SingleChoice";
import ExamInstructions from "@/components/quiz/examInstructions/ExamInstructions";
import PrivateRoutesAdmin from "@/privateroutes/PrivateRoutesAdmin";
import DashboardPage from "@/pages/dashboard/dashboard";
import PrivateRoutesInstructor from "@/privateroutes/PrivateRoutesInstructor";
import MakeQuestionSet from "@/components/makeQuestionSet/MakeQuestionSet";
import Loader from "@/components/common/Loader";

const Routes = () => {
  const [userRole, setUserRole] = useState("");
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    }
    checkUserRole();
  }, []); 
   // console.log(userRole);

  if (loading) {
    return <div><Loader/></div>; 
}

//   return createBrowserRouter([
//     { path: "/", element: <HomePage1 /> },
//     {
//       element: <Layout />,
//       children: [
//         {
//           element: (
//             <PrivateRoutesUser
//               isUserAuth={userRole == "student" ? true : false}
//             />
//           ),
//           children: [
//             {
//               path: "quiz/result",
//               element: <QuizResult />,
//             },
//             {
//               path: "quiz/questions",
//               element: <QuestionSet />,
//             },
//             {
//               path: "quiz/singlechoice",
//               element: <SingleChoice />,
//             },
//             {
//               path: "quiz/start",
//               element: <ExamInstructions />,
//             },
//           ],
//         },

//         {
//           element: (
//             <PrivateRoutesAdmin
//               isAdminAuth={userRole == "admin" ? true : false}
//             />
//           ),
//           children: [
           
//             {
//               path: "dashboard",
//               element: <DashboardPage />,
//             },
//           ],
//         },
//         {
//           element: (
//             <PrivateRoutesInstructor
//               isInstructorAuth={userRole == "instructor" ? true : false}
//             />
//           ),
//           children: [
           
//             {
//               path: "create/questionset",
//               element: <MakeQuestionSet />,
//             },
//           ],
//         },
//       ],
      
//     },
//     {
//         path: "*",
//         element: <<NotFoundPage /> />,
//     },
//     {
//         path: "login",
//         element: <LoginPage />,
//     },
//     {
//         path:"signup",
//         element:<SignupPage/>
//     }
//   ]);
};

export default Routes;
