import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "@/firebase/Firebase";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";

const SignInWithFacebook = ({selectedRole}) => {
  const navigate = useNavigate();
  const facebookLogin = async () => {
    if(!selectedRole){
      alert('*Please select any Role');
      return;
    }
    try {
      const provider = new FacebookAuthProvider();
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
        className="button -sm px-24 py-20 -outline-blue-3 text-blue-3 text-14 "
        onClick={facebookLogin}
      >
        Log In via Facebook
      </button>
    </div>
  );
};

export default SignInWithFacebook;
