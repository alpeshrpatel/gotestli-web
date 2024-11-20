import React, { useState } from "react";
import { Navigate } from "react-router-dom";
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
import Loader from "@/components/common/Loader";

const ProtectedRoute = ({ element, role }) => {
  // const [userRole, setUserRole] = useState("");
  // const [loading, setLoading] = useState(true);

 
  // useEffect(() => {
  //   async function checkUserRole() {
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
      
  //     setLoading(false);
  //   }
  //   checkUserRole();
  // });
  const user = JSON.parse( localStorage.getItem('user')) || '';
  const userRole = user.role;
   // console.log(userRole);

  // if (loading) {
  //   return <Loader/>;
  // }
  if (!userRole) {
    return <Navigate to="/login" />;
  }

  if (role && userRole !== role) {
    if(userRole == 'instructor'){
      return <Navigate to="/instructor/home" />; 
    }else if(userRole == 'admin'){
      return <Navigate to="/admin/dashboard" />; 
    }
    
  }

  return element;
};

export default ProtectedRoute;
