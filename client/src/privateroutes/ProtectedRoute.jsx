// import React, { useState } from "react";
// import { Navigate } from "react-router-dom";
// import { auth, db } from "@/firebase/Firebase";
// import {
//   addDoc,
//   collection,
//   doc,
//   Firestore,
//   getDoc,
//   setDoc,
// } from "firebase/firestore";
// import { useEffect } from "react";
// import Loader from "@/components/common/Loader";

// const ProtectedRoute = ({ element, role }) => {
//   // const [userRole, setUserRole] = useState("");
//   // const [loading, setLoading] = useState(true);

 
//   // useEffect(() => {
//   //   async function checkUserRole() {
//   //     if (auth.currentUser) {
//   //       const userId = auth.currentUser.uid;
//   //       const docRef = doc(db, "roles", userId);
//   //       const docSnap = await getDoc(docRef);

//   //       if (docSnap.exists()) {
//   //         setUserRole(docSnap.data().role);
//   //          // console.log(docSnap.data().role);
//   //       } else {
//   //          // console.log("No role found for this user");
//   //       }
//   //     } else {
//   //        // console.log("No user is logged in");
//   //     }
      
//   //     setLoading(false);
//   //   }
//   //   checkUserRole();
//   // });
//   const [currentOrg, setCurrentOrg] = useState(null);
//   const user = JSON.parse( localStorage.getItem('user')) || '';
//   const userRole = user.role;
//   const org = JSON.parse( localStorage.getItem('org')) || '';

//   useEffect(() => {
//     const hostname = window.location.hostname;
//     console.log('host:',hostname)
//     const parts = hostname.split('.');
    
//     // Check if we're on a subdomain
//     if (parts.length > 2 && parts[0] !== 'www') {
//       const orgSubdomain = parts[0];
//       setCurrentOrg(orgSubdomain);
//     }
//   },[])
//    // console.log(userRole);

//   // if (loading) {
//   //   return <Loader/>;
//   // }
//   console.log(currentOrg)
//   // if(currentOrg){
//   //   return <Navigate to="/" />
//   // }else{
//   //   if (!userRole) {
//   //     return <Navigate to="/login" />;
//   //   }
  
//   //   if (role && userRole !== role) {
//   //     if(userRole == 'instructor'){
//   //       return <Navigate to="/instructor/home" />; 
//   //     }else if(userRole == 'admin'){
//   //       return <Navigate to="/admin/dashboard" />; 
//   //     }
      
//   //   }
//   // }
  
//   if (org && org.id != 0) {
    
//     const protocol = window.location.protocol;
//     const redirectUrl = `${protocol}//${org.subdomain}.localhost:5173/`;
//     console.log(redirectUrl,'=====>')
    
//     // window.location.href = redirectUrl;
//     if (!userRole) {
//       return <Navigate to="/login" />;
//     }
    
//     if (role && userRole !== role) {
//       if (userRole === 'instructor') {
//         return <Navigate to={`${redirectUrl}/instructor/home`}/>;
//       } else if (userRole === 'admin') {
//         return <Navigate to={`${redirectUrl}/admin/dashboard`}/>;
//       }else if (userRole === 'student') {
//         return <Navigate to={`${redirectUrl}`}/>;
//       }
//     }
//     return element;
//   } else {
//     if (!userRole) {
//       return <Navigate to="/login" />;
//     }
    
//     if (role && userRole !== role) {
//       if (userRole === 'instructor') {
//         return <Navigate to="/instructor/home" />;
//       } else if (userRole === 'admin') {
//         return <Navigate to="/admin/dashboard" />;
//       }
//     }
//   }

//   return element;
// };

// export default ProtectedRoute;


import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Loader from "@/components/common/Loader";
import { showToast } from "@/utils/toastService";

const ProtectedRoute = ({ element, role }) => {
  const [loading, setLoading] = useState(true);
  const [subdomainChecked, setSubdomainChecked] = useState(false);
  const [currentSubdomain, setCurrentSubdomain] = useState(null);
  
  // Get user and org from localStorage
  const user = JSON.parse(localStorage.getItem('user')) || '';
  const userRole = user.role;
  const org = JSON.parse(localStorage.getItem('org')) || { id: 0 };

  useEffect(() => {
    // Check if we're on a subdomain
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    
    if (parts.length > 1 && parts[0] !== 'www' && parts[0] !== 'gotestli') {
      setCurrentSubdomain(parts[0]);
    }
    
    setSubdomainChecked(true);
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader />;
  }
  console.log(org)
  console.log(currentSubdomain)
  // Case 1: Not logged in - redirect to login
  if (!userRole) {
    if(org.id !== 0){
      showToast('success', 'Redirecting to your organization!')
    }
    return <Navigate to="/login" />;
  }

  // Case 2: Organization user (org.id !== 0) but not on correct subdomain
  if (org.id !== 0 && (org.subdomain && currentSubdomain != org.subdomain) ) {
    // Need to redirect to the org's subdomain
    const protocol = window.location.protocol;
    const host = window.location.host.split('.').slice(1).join('.');
    const redirectUrl = `http://${org.subdomain}.gotestli.com${window.location.pathname}`;
    console.log(redirectUrl)
    // Use window.location for a full redirect
    window.location.href = redirectUrl;
    return element;
  }

  // Case 3: On subdomain but user doesn't have correct org.id or subdomain doesn't match
  if (currentSubdomain && org.id == 0) {
    // Redirect to main site
    const protocol = window.location.protocol;
    const host = window.location.host.split('.').slice(1).join('.');
    window.location.href = `https://gotestli.com/`;
    return element;
  }

  // Case 4: Role mismatch - redirect to appropriate home page
  if (role && userRole !== role) {
    if (userRole === 'instructor') {
      return <Navigate to="/instructor/home" />;
    } else if (userRole === 'admin') {
      return <Navigate to="/admin/dashboard" />; 
    } else if (userRole === 'student') {
      return <Navigate to="/student/dashboard" />;
    }
  }

  // Case 5: All conditions met, render the requested element
  return element;
};

export default ProtectedRoute;