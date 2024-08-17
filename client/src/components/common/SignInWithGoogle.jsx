import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "@/firebase/Firebase";
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

const SignInWithGoogle = ({ selectedRole }) => {
  const navigate = useNavigate();
  const googleLogin = async () => {
    if (!selectedRole) {
      alert("*Please select any Role");
      return;
    }
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      const email = auth.currentUser.email;
      let userRole;

      const rolesRef = collection(db, "roles");
      const q = query(rolesRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        try {
          await setDoc(doc(db, "roles", auth.currentUser.uid), {
            uid: auth.currentUser.uid,
            role: selectedRole,
            email: email,
          });
          console.log("Document written ");
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      } else {
        console.log("Email already exists in roles collection.");
      }
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const docRef = doc(db, "roles", userId);
        const docSnap = await getDoc(docRef);
        console.log(docRef);
        if (docSnap.exists()) {
          userRole = docSnap.data().role;
          // setUserRole(docSnap.data().role);
          console.log(docSnap.data().role);
        } else {
          console.log("No role found for this user");
        }
      } else {
        console.log("No user is logged in ");
      }
      userRole == "instructor"
        ? navigate("/instructor/home")
        : userRole == "student"
        ? navigate("/")
        : navigate("/admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        className="button -sm px-24 py-20 -outline-red-3 text-red-3 text-14"
        onClick={googleLogin}
      >
        Log In via Google+
      </button>
    </div>
  );
};

export default SignInWithGoogle;
