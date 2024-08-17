import { Link, useNavigate } from "react-router-dom";
import "./signupform.css";
import React, { useState } from "react";
import SignInWithFacebook from "../common/SignInWithFacebook";
import SignInWithGoogle from "../common/SignInWithGoogle";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "@/firebase/Firebase";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";

export default function SignUpForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState();

  const navigate = useNavigate();

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password === confirmPassword) {
        const data = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        updateProfile(auth.currentUser, {
          displayName: userName,
        });
        console.log(auth.currentUser.uid)

        try {
          const docRef = await setDoc(doc(db, "roles", auth.currentUser.uid), {
            uid: auth.currentUser.uid,                
            role: selectedRole,
            email: email       
          });
        
          console.log("Document written ");
        } catch (e) {
          console.error("Error adding document: ", e);
        }

       
        console.log("account created successfully!");

        navigate("/login");
      } else {
        alert("Password not matched!!");
        console.log("Password not matched!!");
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
  console.log(selectedRole)
  return (
    <div className="form-page__content lg:py-50">
      <div className="container mt-5" style={{ backgroundColor: "#bfdeee" }}>
        <div className="row justify-center items-center">
          <div className="col-xl-10 col-lg-10">
            <div className=" shadow-1 rounded-16">
              <h3 className="text-30 lh-13">Sign Up</h3>
              <p className="mt-10">
                Already have an account?
                <Link to="/login" className="text-purple-1">
                  Log in
                </Link>
              </p>

              <form
                className="contact-form respondForm__form row y-gap-20 pt-30 "
                onSubmit={handleSubmit}
              >
                <div className="col-lg-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Role *
                  </label>
                  <div className="role-radio-buttons bg-white ps-5 pt-3 rounded row  ">
                    
                  
                    <div className="form-check col-6">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="studentRole"
                        name="role"
                        value="student"
                        required
                        onChange={(e) => setSelectedRole(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="studentRole">
                        Student
                      </label>
                    </div>
                    <div className="form-check col-6">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="instructorRole"
                        name="role"
                        value="instructor"
                        required
                        onChange={(e) => setSelectedRole(e.target.value)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="instructorRole"
                      >
                        Instructor
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Email address *
                  </label>
                  <input
                    required
                    className="bg-white"
                    type="text"
                    name="title"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Username *
                  </label>
                  <input
                    required
                    className="bg-white"
                    type="text"
                    name="title"
                    placeholder="Username"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Password *
                  </label>
                  <input
                    required
                    className="bg-white"
                    type="text"
                    name="title"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="col-lg-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Confirm Password *
                  </label>
                  <input
                    required
                    className="bg-white"
                    type="text"
                    name="title"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    className="button -md -purple-1 text-white fw-500 w-1/1"
                  >
                    Register
                  </button>
                </div>
              </form>

              <div className="lh-12 text-dark-1 fw-500 text-center mt-20">
                Or sign in using
              </div>

              <div className="d-flex x-gap-20 items-center justify-between pt-20">
                <SignInWithFacebook selectedRole={selectedRole}/>
                <SignInWithGoogle selectedRole={selectedRole}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
