import { auth } from "@/firebase/Firebase";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";

const SignInWithFacebook = () => {
  const navigate = useNavigate();
  const facebookLogin = async () => {
    try {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button
        className="button -sm px-24 py-20 -outline-blue-3 text-blue-3 text-14"
        onClick={facebookLogin}
      >
        Log In via Facebook
      </button>
    </div>
  );
};

export default SignInWithFacebook;
