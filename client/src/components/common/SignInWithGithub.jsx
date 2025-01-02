import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { auth, db } from "@/firebase/Firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { API } from "@/utils/AxiosInstance";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { showToast } from "@/utils/toastService";

const SignInWithGithub = () => {
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
    
      useEffect(() => {
        const handleResize = () => {
          setIsSmallScreen(window.innerWidth < 600);
        };
    
        window.addEventListener("resize", handleResize);
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);
  const navigate = useNavigate();

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const githubLogin = async () => {
    try {
      setIsLoading(true);
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);

      const email = auth.currentUser?.email;
      const names = auth.currentUser?.displayName?.split(" ") || [];
      const firstname = names[0] || "";
      const lastname = names.length > 1 ? names[names.length - 1] : "";

      const rolesRef = collection(db, "roles");
      const q = query(rolesRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // New user
        try {
          await API.post("/api/users", {
            username: auth.currentUser?.email,
            email: auth.currentUser?.email,
            created_on: auth.currentUser?.metadata?.createdAt,
            last_login: auth.currentUser?.metadata?.lastLoginAt,
            first_name: firstname,
            last_name: lastname,
            uid: auth.currentUser?.uid,
            role: selectedRole,
            provider: "github",
          });

          await setDoc(doc(db, "roles", auth.currentUser?.uid || ""), {
            uid: auth.currentUser?.uid,
            role: selectedRole,
            email,
          });
        } catch (error) {
          console.error(error);
          showToast("error","Failed to save user data.");
          navigate("/login");
        }
      }

      // Retrieve user role
      const userId = auth.currentUser?.uid;
      const docRef = doc(db, "roles", userId || "");
      const docSnap = await getDoc(docRef);

      let userRole = "";
      if (docSnap.exists()) {
        userRole = docSnap.data().role;
        try {
          const { data } = await API.get(`/api/users/uid/${userId}`);
          const resData = await API.get(`/api/users/generate/token/${data.id}`);
          localStorage.setItem("token", resData.data?.token);
          localStorage.setItem(
            "user",
            JSON.stringify({ id: data.id, role: userRole, email: data.email })
          );
        } catch (error) {
          showToast("error","Failed to generate token.");
          navigate("/login");
        }
      }

      setIsLoading(false);
      showToast("success","Logged in successfully!");
      if (userRole === "instructor") navigate("/instructor/home");
      else if (userRole === "student") navigate("/");
      else navigate("/admin/dashboard");
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      showToast("error","Login failed. Please try again.", error);
      navigate("/login");
    }
  };

  return (
    <div>
      <Modal open={open} onClose={onCloseModal} center={false} styles={{
          modal: {
            position: "fixed",
            top: "40%",
            right: isSmallScreen ? '0' : '15%',
            transform: "translateY(-50%)",
            width: "450px",
          },
        //   overlay: {
        //     background: "transparent",
        //   },
        }}>
        <div className="col-lg-12 border-1 rounded">
        <div className="role-radio-buttons bg-white px-5  rounded row gap-2">
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                * Please Select Role
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
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
          {selectedRole && (
            <button
              className="button -sm px-24 py-10 -black mt-3 text-white fw-500  text-14 mx-auto"
              onClick={githubLogin}
            >
              {isLoading ? (
                <CircularProgress size={30} sx={{ color: "inherit" }} />
              ) : (
                "Continue with GitHub"
              )}
            </button>
          )}
        </div>
      </Modal>
      {
        isSmallScreen ? (
          <button className="button -sm px-2 py-3 -outline-black text-black text-16 fw-bolder lh-sm "
          onClick={onOpenModal}>
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-github "
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
          </svg>
          </button>
        ) : (
          <button
          className="button -sm px-24 py-25 -outline-black text-black text-16 fw-bolder lh-sm "
          onClick={onOpenModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-github me-2"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
          </svg>
          {/* <i className="icon-github text-24 me-2" aria-hidden="true"></i> */}
          GitHub
        </button>
        )
      }
     
    </div>
  );
};

export default SignInWithGithub;
