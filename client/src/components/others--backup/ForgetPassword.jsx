import { auth } from "@/firebase/Firebase";
import { API } from "@/utils/AxiosInstance";
import { CircularProgress } from "@mui/material";

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [otp, setOtp] = useState("");   
  const [email, setEmail] = useState("");   
  const [isOtpSent,setIsOtpSent] = useState(false)


 async function handleSubmitOtp (e){
    e.preventDefault()
    try {
        // const response = await sendPasswordResetOtp(auth,otp);
        const response = await API.post('/api/forgetpwd/verify/otp',{otp:otp,email:email})
        console.log(response)
        navigate('/login') 
    } catch (error) {
        console.error(error)
    }
   
  }
  async function handleSendOtp(){

    try {
      const response = await API.post('/api/sendemail/send/otp',{email:email});
      console.log(response)
      setIsOtpSent(true)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="form-page__content lg:py-50">
      <div className="container mt-5" style={{ backgroundColor: "#bfdeee" }}>
        <div className="row justify-center items-center ">
          <div className="col-xl-12 col-lg-12">
            <div className=" bg-transparent shadow-1 rounded-16">
              <h3 className="text-30 lh-13">Forget Password</h3>
              {
                !isOtpSent && (
                  <div className="col-12">
                  <label
                        htmlFor="email"
                        style={{
                          marginBottom: "5px",
                          fontWeight: "600",
                          color: "#333",
                          fontSize: "14px",
                        }}
                      >
                        Enter Email
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
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <div className="col-4 mx-auto">
                    <button
                      onClick={() => handleSendOtp()}
                      className="button -sm -purple-1 text-white fw-500 w-1/1 mt-8"
                    >
                      {false ? (
                        <CircularProgress size={30} sx={{ color: "inherit" }} />
                      ) : (
                        "Send OTP"
                      )}
                    </button>
                  </div>
                  </div>
                )
              }
            
              {
                isOtpSent && (
                  <form
                  className="contact-form respondForm__form row y-gap-20 pt-30 "
                  onSubmit={handleSubmitOtp}
                >
                  <p>OTP sent to your <b>{email}</b> Address</p>
                  <div className="col-12">   
                    {/* <TextField
                        required
                        id="outlined-required"
                        label="otp"
                        type="otp"
                        className="bg-white rounded w-100"
                        onChange={(e) => setOtp(e.target.value)}
                      /> */}
                    <label
                      htmlFor="otp"
                      style={{
                        marginBottom: "5px",
                        fontWeight: "600",
                        color: "#333",
                        fontSize: "14px",
                      }}
                    >
                      Enter OTP
                    </label>
                    <input
                      required
                      type="text"
                      name="otp"
                      id="otp"
                      style={{
                        padding: "10px",
                        border: "1px solid #ced4da",
                        borderRadius: "8px",
                        fontSize: "14px",
                        outline: "none",
                        backgroundColor: "#f8f9fa",
                        boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                      }}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                 
                  <div className="col-4 mx-auto">
                    <button
                      type="submit"
                      name="submit"
                      id="submit"
                      className="button -sm -purple-1 text-white fw-500 w-1/1"
                    >
                      {false ? (
                        <CircularProgress size={30} sx={{ color: "inherit" }} />
                      ) : (
                        "Verify OTP"
                      )}
                    </button>
                  </div>
                </form>
                )
              }
            

              <div className="lh-12 text-dark-1 fw-500 text-center mt-20">
                <Link to="/login" className="text-purple-1">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
