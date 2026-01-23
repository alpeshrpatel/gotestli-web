import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
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
  const [errorMessage, setErrorMessage] = useState(false);
  //const [userRole,setUserRole] = useState('');
  const navigate = useNavigate();
  const org = JSON.parse(localStorage.getItem("org")) || "";
  let orgid = org?.id || 0;

  useEffect(() => {
    setErrorMessage(false);
  }, [selectedRole]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let userRole = "";

    try {
      setErrorMessage(false);
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
          console.log(data);
          if (data.role !== selectedRole) {
            showToast("error", `You are not authorized as ${selectedRole}`);
            setErrorMessage(true)
            setIsLoading(false);
            return;
          }
          const resData = await API.get(`/api/users/generate/token/${data.id}`);
          // console.log(resDat
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
      const pendingQuiz = localStorage.getItem('pendingQuiz');
      console.log("pendingQuiz:", pendingQuiz);
      if (pendingQuiz && userRole === 'student') {
        // Navigate back with the quiz data
        navigate('/', {
          state: { data: JSON.parse(pendingQuiz)?.data, questionSet: JSON.parse(pendingQuiz)?.questionSet },
          replace: true
        });
        // Clear the pending quiz
        // localStorage.removeItem('pendingQuiz');
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
  console.log(errorMessage)
  return (
    <>
      <div className="form-page__content  overflow-scroll hide-scrollbar" style={{ backgroundColor: "#bfdeee" }}>
        <div className="container mt-5" style={{ backgroundColor: "#bfdeee", border: 'none' }}>
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
                {/* {
                  errorMessage ? (
                    <div className=" text-white p-3 rounded-lg text-center font-medium" style={{ backgroundColor: "#FF8282", borderRadius: '20px', marginBottom: '20px' }}>
                      Authentication Error: You attempted to log in as a {selectedRole}, but your account is not registered as a {selectedRole}. Please select the correct role and try again.
                    </div>
                  ) : (
                    <div className=" text-white p-3 rounded-lg text-center font-medium" style={{ backgroundColor: "#877cf6", borderRadius: '20px', marginBottom: '20px' }}>
                      Select your Role to continue
                    </div>
                  )
                } */}
                {errorMessage ? (
                    <div
                      className="text-white p-3 text-center"
                      style={{
                        backgroundColor: "#FF8282",
                        borderRadius: "12px",
                        marginBottom: "20px",
                      }}
                    >
                      You tried to login as <b>{selectedRole}</b>, but this account is registered with a different role.
                      <br />
                      Please select the correct role and try again.
                    </div>
                  ) : (
                    <div
                      className="text-white p-3 text-center"
                      style={{
                        backgroundColor: "#877cf6",
                        borderRadius: "12px",
                        marginBottom: "20px",
                      }}
                    >
                      Choose your role to continue
                    </div>
                  )}


                {/* <div className="col-lg-12  rounded " style={{ display: 'flex', alignItems: 'center', border: 'none', justifyContent: 'space-between' }}> */}
                  {/* <FormControl>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginLeft: '0', gap: '20px' }}>
                      <FormLabel id="demo-radio-buttons-group-label" sx={{
                        fontWeight: "600",
                        color: "#333",
                        fontSize: "14px"
                      }}>
                        Please Select Role
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="student"
                        name="radio-buttons-group"
                        sx={{ display: "flex", flexDirection: "row", justifyContent: 'space-evenly', gap: "20px" }}
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

                  </FormControl> */}
                  <div style={{ marginBottom: "25px" }}>
                    <p style={{ fontWeight: "600", marginBottom: "10px" }}>
                      Select how you want to login
                    </p>

                    <div style={{ display: "flex", gap: "20px" }}>
                      {/* Student Card */}
                      <div
                        onClick={() => setSelectedRole("student")}
                        style={{
                          flex: 1,
                          padding: "16px",
                          borderRadius: "12px",
                          cursor: "pointer",
                          border: selectedRole === "student" ? "2px solid #877cf6" : "1px solid #ced4da",
                          backgroundColor: selectedRole === "student" ? "#f4f2ff" : "#fff",
                          boxShadow: selectedRole === "student" ? "0 4px 12px rgba(135,124,246,0.2)" : "none",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <h4 style={{ marginBottom: "6px" }}>🎓 Student</h4>
                        <p style={{ fontSize: "13px", color: "#555" }}>
                          Take quizzes, attend exams, view results
                        </p>
                      </div>

                      {/* Instructor Card */}
                      <div
                        onClick={() => setSelectedRole("instructor")}
                        style={{
                          flex: 1,
                          padding: "16px",
                          borderRadius: "12px",
                          cursor: "pointer",
                          border: selectedRole === "instructor" ? "2px solid #877cf6" : "1px solid #ced4da",
                          backgroundColor: selectedRole === "instructor" ? "#f4f2ff" : "#fff",
                          boxShadow: selectedRole === "instructor" ? "0 4px 12px rgba(135,124,246,0.2)" : "none",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <h4 style={{ marginBottom: "6px" }}>👨‍🏫 Instructor</h4>
                        <p style={{ fontSize: "13px", color: "#555" }}>
                          Create question sets, manage students
                        </p>
                      </div>
                    </div>
                  </div>
                  

                {/* </div> */}
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
