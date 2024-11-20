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
import { API } from "@/utils/AxiosInstance";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { CircularProgress, TextField } from "@mui/material";

export default function SignUpForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  let names = userName?.split(" ")
  let firstname = names[0];
  let lastname = '';
  if(names.length > 1){
    lastname = names[names.length - 1];
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      if (password === confirmPassword) {
        const data = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        updateProfile(auth.currentUser, {
          displayName: userName,
        });
         // console.log(auth.currentUser);
        try {
          const res = await API.post("/api/users", {
            username: auth.currentUser.email,
            email: auth.currentUser.email,
            created_on: auth.currentUser.metadata?.createdAt,
            last_login: auth.currentUser.metadata?.lastLoginAt,
            first_name:firstname,
            last_name:lastname,
            uid: auth.currentUser.uid,
            role:selectedRole,
            provider:'manual'
          });
           // console.log(res);
         
        } catch (error) {
           // console.log(error);
        }
        try {
          const docRef = await setDoc(doc(db, "roles", auth.currentUser.uid), {
            uid: auth.currentUser.uid,
            role: selectedRole,
            email: email,
          });

           // console.log("Document written ");
        } catch (e) {
          console.error("Error adding document: ", e);
        }

         // console.log("account created successfully!");
        setIsLoading(false);
        navigate("/login");
      } else {
        alert("Password not matched!!");
         // console.log("Password not matched!!");
      }
    } catch (error) {
       // console.log(error);
      alert(error.message);
    }
  };
   // console.log(selectedRole);
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
                 
                  <FormLabel
                    id="demo-radio-buttons-group-label"
                    className="text-16 lh-1 fw-500 text-dark-1 mb-10"
                  >
                    Role *
                  </FormLabel>
                  <div className="role-radio-buttons bg-white px-5  rounded row gap-2">
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        className="rounded row"
                      >
                        <FormControlLabel
                          value="student"
                          control={<Radio />}
                          label="Student"
                          onChange={(e) => setSelectedRole(e.target.value)}
                        />
                        <FormControlLabel
                          value="instructor"
                          control={<Radio />}
                          label="Instructor"
                          onChange={(e) => setSelectedRole(e.target.value)}
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>

                <div className="col-lg-6 ">
                  <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    type="Email"
                    className="bg-white rounded"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  
                </div>
                <div className="col-lg-6">
                 
                  <TextField
                    required
                    id="outlined-required"
                    label="Username"
                    type="text"
                    className="custom-height bg-white rounded "
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="col-lg-6">
                 
                  <TextField
                    required
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    className="bg-white rounded"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="col-lg-6">
                 
                  <TextField
                    required
                    id="outlined-password-input"
                    label="Confirm Password"
                    type="password"
                    autoComplete="current-password"
                    className="bg-white rounded"
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
                     {isLoading ? (<CircularProgress size={30}/>) : 'Register'}
                  </button>
                </div>
              </form>

              <div className="lh-12 text-dark-1 fw-500 text-center mt-20">
                Or sign in using
              </div>

              <div className="d-flex x-gap-20 items-center justify-between pt-20">
                <SignInWithFacebook />
                <SignInWithGoogle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
