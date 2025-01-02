import { auth } from "@/firebase/Firebase";
import { API } from "@/utils/AxiosInstance";
import { CircularProgress } from "@mui/material";

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSetPassword() {
    if (password === confirmPassword) {
      const data = await createUserWithEmailAndPassword(auth, email, password);
    }
  }

  return (
    <div className="form-page__content lg:py-50">
      <div className="container mt-5" style={{ backgroundColor: "#bfdeee" }}>
        <div className="row justify-center items-center ">
          <div className="col-xl-12 col-lg-12">
            <div className=" bg-transparent shadow-1 rounded-16">
              <h3 className="text-30 lh-13">Add New Password</h3>

              <div className="col-12">
                {/* <TextField
                    required
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    className="bg-white rounded"
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
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="col-12">
                {/* <TextField
                    required
                    id="outlined-password-input"
                    label="Confirm Password"
                    type="password"
                    autoComplete="current-password"
                    className="bg-white rounded"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  /> */}
                <label
                  htmlFor="cnm_password"
                  style={{
                    marginBottom: "5px",
                    fontWeight: "600",
                    color: "#333",
                    fontSize: "14px",
                  }}
                >
                  Confirm Password
                </label>
                <input
                  required
                  type="text"
                  name="cnm_password"
                  id="cnm_password"
                  style={{
                    padding: "10px",
                    border: "1px solid #ced4da",
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none",
                    backgroundColor: "#f8f9fa",
                    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="col-4 mx-auto">
                <button
                  onClick={handleSetPassword}
                  className="button -sm -purple-1 text-white fw-500 w-1/1"
                >
                  {false ? (
                    <CircularProgress size={30} sx={{ color: "inherit" }} />
                  ) : (
                    "Update"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
