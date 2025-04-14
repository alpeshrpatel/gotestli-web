import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
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
import { CircularProgress, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { API } from "@/utils/AxiosInstance";
import SignInWithGithub from "../common/SignInWithGithub";
import { showToast } from "@/utils/toastService";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState('student');
  const [isLoading, setIsLoading] = useState(false);
  //const [userRole,setUserRole] = useState('');
  const navigate = useNavigate();
  const org = JSON.parse(localStorage.getItem("org")) || "";
  let orgid = org?.id || 0;
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
          // console.log(docSnap.data().role);
          const { data } = await API.get(`/api/users/uid/${userId}?orgid=${orgid}`);
          const resData = await API.get(`/api/users/generate/token/${data.id}`);
          // console.log(resData.data?.token)
          localStorage.setItem('token', resData.data?.token);
          localStorage.setItem("user", JSON.stringify({ id: data.id, role: userRole, email: data.email }))
          if (data.org_id) {
            localStorage.setItem("org", JSON.stringify({ id: data.org_id, role: userRole, email: data.email, subdomain: data.company, logo: data.profile_pic, org_name: data.first_name }))
          }
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
      showToast('error', error.message)
    }
    console.log(userRole);
    userRole == "instructor"
      ? navigate("/instructor/home")
      : userRole == "student"
        ? navigate("/")
        : navigate("/admin/dashboard");
  };

  const handleChangePassword = () => {
    navigate('/forget-password')
  }

  async function handleForgotPassword() {

    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          showToast("success", 'Reset Password mail sent successfully!');
        })
        .catch((error) => {
          showToast("error", error.message);
        });
    } else {
      showToast("error", 'Please add email!');
    }

  }

  return (
    <>
      <div className="form-page__content lg:py-50" style={{ backgroundColor: "#bfdeee" }}>
        <div className="container mt-5" style={{ backgroundColor: "#bfdeee" ,border:'none'}}>
          <div className="row justify-center items-center ">
            <div className="col-xl-12 col-lg-12">
              <div className=" bg-transparent shadow-1 rounded-16">
                <h3 className="text-30 lh-13">Login</h3>
                <p className="mt-10">
                  Don't have an account yet?
                  <Link to="/signup" className="text-purple-1">
                    Sign up for free
                  </Link>
                </p>
                <div className=" text-white p-3 rounded-lg text-center font-medium" style={{ backgroundColor: "#877cf6",borderRadius:'20px', marginBottom:'20px' }}>
                  Select your Role to continue
                </div>
                <div className="col-lg-12  rounded " style={{display:'flex',alignItems:'center',border:'none',justifyContent:'space-between'}}>
                  <FormControl>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",marginLeft:'0',gap:'20px' }}>
                    <FormLabel id="demo-radio-buttons-group-label" sx={{fontWeight: "600",
                        color: "#333",
                        fontSize: "14px"}}>
                       Please Select Role
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="student"
                      name="radio-buttons-group"
                      sx={{ display: "flex", flexDirection: "row", justifyContent:'space-evenly', gap: "20px" }}
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
                    </div>
                   
                  </FormControl>
                </div>
                <form
                  className="contact-form respondForm__form row y-gap-5 pt-30 "
                  onSubmit={handleSubmit}
                >
                  <div className="col-12">
                    {/* <TextField
                      required
                      id="outlined-required"
                      label="Email"
                      type="Email"
                      className="bg-white rounded w-100"
                      onChange={(e) => setEmail(e.target.value)}
                    /> */}
                    <label
                      htmlFor="email"
                      style={{
                        marginBottom: "5px",
                        fontWeight: "600",
                        color: "#333",
                        fontSize: "14px",
                      }}
                    >
                      Email
                    </label>
                    <input
                      required
                      type="text"
                      name="email"
                      id="email"
                      style={{
                        padding: "10px",
                        border: "1px solid #ced4da",
                        borderRadius: "8px",
                        fontSize: "14px",
                        outline: "none",
                        backgroundColor: "#f8f9fa",
                        boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                      }}
                      value={email}
                      onChange={(e) => setEmail((e.target.value).trim())}

                    />
                  </div>
                  <div className="col-12">
                    {/* <TextField
                      required
                      id="outlined-password-input"
                      label="Password"
                      type="password"
                      autoComplete="current-password"
                      className="bg-white rounded w-100"
                      onChange={(e) => setPassword(e.target.value)}
                    /> */}
                    <label
                      htmlFor="password"
                      style={{
                        marginBottom: "5px",
                        fontWeight: "600",
                        color: "#333",
                        fontSize: "14px",
                      }}
                    >
                      Password
                    </label>
                    <input
                      required
                      type="text"
                      name="password"
                      id="password"
                      style={{
                        padding: "10px",
                        border: "1px solid #ced4da",
                        borderRadius: "8px",
                        fontSize: "14px",
                        outline: "none",
                        backgroundColor: "#f8f9fa",
                        boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                      }}
                      value={password}
                      onChange={(e) => setPassword((e.target.value).trim())}

                    />
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      name="submit"
                      id="submit"
                      className="button -md -purple-1 text-white fw-500 w-1/1"
                    >
                      {isLoading ? (<CircularProgress size={30} sx={{ color: "inherit" }} />) : 'Login'}

                    </button>
                  </div>
                </form>
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                  <div className="text-purple-1 mt-4" style={{ cursor: 'pointer' }} onClick={handleChangePassword}>
                    Change Password
                  </div>
                  <div className="text-purple-1 mt-4" style={{ cursor: 'pointer' }} onClick={handleForgotPassword}>
                    Forgot Password?
                  </div>
                </div>

                <div className="lh-12 text-dark-1 fw-500 text-center mt-20">
                  Or sign in using

                </div>


              </div>
              <div className="d-flex x-gap-20 items-center justify-between pt-20">
                <SignInWithFacebook selectedRole={selectedRole} />
                <SignInWithGoogle selectedRole={selectedRole} />
                <SignInWithGithub selectedRole={selectedRole} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
