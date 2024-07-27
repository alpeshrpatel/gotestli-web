import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { auth } from "@/firebase/Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import SignInWithFacebook from "../common/SignInWithFacebook";
import SignInWithGoogle from "../common/SignInWithGoogle";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const data = await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      console.log("Logged in Successfully!!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="form-page__content lg:py-50">
      <div className="container">
        <div className="row justify-center items-center">
          <div className="col-xl-6 col-lg-8">
            <div className="px-50 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
              <h3 className="text-30 lh-13">Login</h3>
              <p className="mt-10">
                Don't have an account yet?
                <Link to="/signup" className="text-purple-1">
                  Sign up for free
                </Link>
              </p>

              <form
                className="contact-form respondForm__form row y-gap-20 pt-30"
                onSubmit={handleSubmit}
              >
                <div className="col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Email
                  </label>
                  <input
                    required
                    type="text"
                    name="title"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <label
                    className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                    
                  >
                    Password
                  </label>
                  <input
                    required
                    type="password"
                    name="title"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    className="button -md -green-1 text-dark-1 fw-500 w-1/1"
                  >
                    Login
                  </button>
                </div>
              </form>

              <div className="lh-12 text-dark-1 fw-500 text-center mt-20">
                Or sign in using
              </div>

              <div className="d-flex x-gap-20 items-center justify-between pt-20">
                <SignInWithFacebook/>
                <SignInWithGoogle/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
