import { auth } from "@/firebase/Firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";

const SignInWithGoogle = () => {
  const navigate = useNavigate();
  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
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
