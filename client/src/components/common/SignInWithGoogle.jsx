import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "@/firebase/Firebase";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";

const SignInWithGoogle = ({selectedRole}) => {
  const navigate = useNavigate();
  const googleLogin = async () => {
    if(!selectedRole){
      alert('*Please select any Role');
      return;
    }
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      try {
        const docRef = await setDoc(doc(db, "roles", auth.currentUser.uid), {
          uid: auth.currentUser.uid,                
          role: selectedRole,
          email: auth.currentUser.email       
        });
      
        console.log("Document written ");
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      
      navigate("/");
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
