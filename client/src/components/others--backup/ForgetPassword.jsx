import { auth } from "@/firebase/Firebase";
import { API } from "@/utils/AxiosInstance";
import { CircularProgress } from "@mui/material";

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { showToast } from "@/utils/toastService";

const ForgetPassword = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isPasswordChange, setIsPasswordChange] = useState(false)


  // async function handleSubmitOtp(e) {
  //   e.preventDefault()
  //   try {
  //     // const response = await sendPasswordResetOtp(auth,otp);
  //     const response = await API.post('/api/forgetpwd/verify/otp', { otp: otp, email: email })
  //     console.log(response)
  //     navigate('/login')
  //   } catch (error) {
  //     console.error(error)
  //   }

  // }
  // async function handleSendOtp() {

  //   try {
  //     const response = await API.post('/api/sendemail/send/otp', { email: email });
  //     console.log(response)
  //     setIsOtpSent(true)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  const handleChangePassword = async () => {
    setIsPasswordChange(true)
    const user = auth.currentUser;
    if (user && user.email) {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);

      try {
        // Re-authenticate the user
        await reauthenticateWithCredential(user, credential);
        // Update password
        await updatePassword(user, newPassword);
        setIsPasswordChange(false)
        showToast("success", 'Password changed successfully!');
      } catch (error) {
        setIsPasswordChange(false)
        showToast("error", error.message);
      }

    } else {
      setIsPasswordChange(false)
      showToast("error", 'No user is logged in.');
    }
  };

  return (
    <div className="form-page__content lg:py-50">
      <div className="container mt-5" style={{ backgroundColor: "#bfdeee" }}>
        <div className="row justify-center items-center ">
          <div className="col-xl-12 col-lg-12">
            <div className=" bg-transparent shadow-1 rounded-16">
              <h3 className="text-30 lh-13">Change Password</h3>
              {
                (
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
                    <div className="" style={{ display: 'flex', justifyContent:'space-between', marginBottom:'20px', marginTop:'20px'}}>
                      <div className="w-100">
                        <label
                          htmlFor="email"
                          style={{
                            marginBottom: "5px",
                            fontWeight: "600",
                            color: "#333",
                            fontSize: "14px",
                          }}
                        >
                          Enter Current Password
                        </label>
                        <input
                          required
                          type="password"
                          name="currentpassword"
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
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                      </div>
                      <div className="w-100">
                        <label
                          htmlFor="newpassword"
                          style={{
                            marginBottom: "5px",
                            fontWeight: "600",
                            color: "#333",
                            fontSize: "14px",
                          }}
                        >
                          Enter New Password
                        </label>
                        <input
                          required
                          type="password"
                          name="newpassword"
                          id="newpassword"
                          style={{
                            padding: "10px",
                            border: "1px solid #ced4da",
                            borderRadius: "8px",
                            fontSize: "14px",
                            outline: "none",
                            backgroundColor: "#f8f9fa",
                            boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                          }}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="col-4 mx-auto">
                      <button
                        onClick={() => handleChangePassword()}
                        className="button -sm -purple-1 text-white fw-500 w-1/1 mt-8"
                      >
                        {isPasswordChange ? (
                          <CircularProgress size={30} sx={{ color: "inherit" }} />
                        ) : (
                          "Change Password"
                        )}
                      </button>
                    </div>
                  </div>
                )
              }

              {/* {
                isOtpSent && (
                  <form
                    className="contact-form respondForm__form row y-gap-20 pt-30 "
                    onSubmit={handleSubmitOtp}
                  >
                    <p>OTP sent to your <b>{email}</b> Address</p>
                    <div className="col-12">
                      
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
              } */}


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
