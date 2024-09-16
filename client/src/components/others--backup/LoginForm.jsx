import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import SignInWithFacebook from "../common/SignInWithFacebook";
import SignInWithGoogle from "../common/SignInWithGoogle";
import Loader from "../common/Loader";
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
import { CircularProgress, TextField } from "@mui/material";
import { API } from "@/utils/AxiosInstance";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState();
  const [isLoading, setIsLoading] = useState(false);
  //const [userRole,setUserRole] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userRole = "";

    try {
      setIsLoading(true);
      const data = await signInWithEmailAndPassword(auth, email, password);

      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const docRef = doc(db, "roles", userId);
        const docSnap = await getDoc(docRef);
        console.log(docRef);
        if (docSnap.exists()) {
          userRole = docSnap.data().role;
          // setUserRole(docSnap.data().role);
          console.log(docSnap.data().role);
         const{ data }=  await API.get(`/api/users/${userId}`)
          localStorage.setItem("user",JSON.stringify({id:data.id,role:userRole,email:data.email}))
        } else {
          console.log("No role found for this user");
        }
      } else {
        console.log("No user is logged in ");
      }

      console.log("Logged in Successfully!!");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
    console.log(userRole);
    userRole == "instructor"
      ? navigate("/instructor/home")
      : userRole == "student"
      ? navigate("/")
      : navigate("/admin/dashboard");
  };

  return (
    <>
      <div className="form-page__content lg:py-50">
        <div className="container mt-5" style={{ backgroundColor: "#bfdeee" }}>
          <div className="row justify-center items-center ">
            <div className="col-xl-8 col-lg-8">
              <div className=" bg-transparent shadow-1 rounded-16">
                <h3 className="text-30 lh-13">Login</h3>
                <p className="mt-10">
                  Don't have an account yet?
                  <Link to="/signup" className="text-purple-1">
                    Sign up for free
                  </Link>
                </p>

                <form
                  className="contact-form respondForm__form row y-gap-20 pt-30 "
                  onSubmit={handleSubmit}
                >
                  <div className="col-12">
                    <TextField
                      required
                      id="outlined-required"
                      label="Email"
                      type="Email"
                      className="bg-white rounded w-100"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <TextField
                      required
                      id="outlined-password-input"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      className="bg-white rounded w-100"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      name="submit"
                      id="submit"
                      className="button -md -purple-1 text-white fw-500 w-1/1"
                    >
                      {isLoading ? (<CircularProgress size={30}/>) : 'Login'}
                     
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
    </>
  );
}
