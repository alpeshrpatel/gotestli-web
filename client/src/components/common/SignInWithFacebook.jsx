import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { API } from "@/utils/AxiosInstance";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { CircularProgress } from "@mui/material";
import { showToast } from "@/utils/toastService";
import {
  deleteUser as firebaseDeleteUser
} from "firebase/auth";

const SignInWithFacebook = ({ selectedRole }) => {
  const [open, setOpen] = useState(false);
  // const [selectedRole, setSelectedRole] = useState("");
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

  const org = JSON.parse(localStorage.getItem("org")) || "";
  let orgid = org?.id || 0;

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => setOpen(false);
  const navigate = useNavigate();
  const facebookLogin = async () => {
    try {
      setIsLoading(true);
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);

      const email = auth.currentUser.email;
      let userRole;
      let names = auth.currentUser?.displayName?.split(" ");
      let firstname = names[0];
      let lastname = "";
      if (names.length > 1) {
        lastname = names[names.length - 1];
      }
      // console.log(auth.currentUser)
      const rolesRef = collection(db, "roles");
      const q = query(rolesRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        try {
          const res = await API.post("/api/users", {
            org_id: orgid,
            username: auth.currentUser.email,
            email: auth.currentUser.email,
            created_on: auth.currentUser.metadata?.createdAt,
            last_login: auth.currentUser.metadata?.lastLoginAt,
            first_name: firstname,
            last_name: lastname,
            uid: auth.currentUser.uid,
            role: selectedRole,
            provider: "facebook",
          });
          // console.log(res);
        } catch (error) {
          try {
            await firebaseDeleteUser(auth.currentUser);
            showToast('error', 'Registration failed: ' + error.message);
          } catch (deleteError) {
            console.error('Failed to delete user:', deleteError);
            showToast('error', 'Registration and user deletion failed');
          }
          showToast("error", error);
          navigate("/login");
        }
        try {
          await setDoc(doc(db, "roles", auth.currentUser.uid), {
            uid: auth.currentUser.uid,
            role: selectedRole,
            email: email,
          });
          // console.log("Document written ");
        } catch (e) {
          showToast("error", error);
          console.error("Error adding document: ", e);
          navigate("/login");
        }
      } else {
        // console.log("Email already exists in roles collection.");
      }

      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const docRef = doc(db, "roles", userId);
        const docSnap = await getDoc(docRef);
        // console.log(docRef);
        if (docSnap.exists()) {
          userRole = docSnap.data().role;
          // setUserRole(docSnap.data().role);
          try {
            const { data } = await API.get(`/api/users/uid/${userId}?orgid=${orgid}`);
            if (data.role !== selectedRole) {
              showToast("error", `You are not authorized as ${selectedRole}`);
              setIsLoading(false);
              return;
            }
            const resData = await API.get(
              `/api/users/generate/token/${data.id}`
            );
            localStorage.setItem("token", resData.data?.token);
            localStorage.setItem(
              "user",
              JSON.stringify({ id: data.id, role: userRole, email: data.email })
            );
          } catch (error) {
            showToast("error", error);
            navigate("/login");
          }

          // console.log(docSnap.data().role);
        } else {
          // console.log("No role found for this user");
        }
      } else {
        showToast("error", "Login Failed! ");
        navigate("/login");
        // console.log("No user is logged in ");
      }
      setIsLoading(false);
      if (auth.currentUser) {
        showToast("success", "Logged In Successfully!");
      }

      userRole == "instructor"
        ? navigate("/instructor/home")
        : userRole == "student"
          ? navigate("/")
          : navigate("/admin/dashboard");
    } catch (error) {
      // console.log(error);
      showToast("error", error);
      navigate("/login");
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={onCloseModal}
        center={false}
        styles={{
          modal: {
            position: "fixed",
            top: "40%",
            right: isSmallScreen ? '0' : '15%',
            transform: "translateY(-50%)",
            width: isSmallScreen ? "300px" : "450px",
          },
          //   overlay: {
          //     background: "transparent",
          //   },
        }}
      >
        <div className="col-lg-12 border-1 rounded">
          {/* <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
              * Please Select Role
            </label>
            <div className="role-radio-buttons bg-white px-5  rounded row gap-2">
              <div className="form-check col-12">
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
              <div className="form-check col-12">
                <input
                  className="form-check-input"
                  type="radio"
                  id="instructorRole"
                  name="role"
                  value="instructor"
                  required
                  onChange={(e) => setSelectedRole(e.target.value)}
                />
                <label className="form-check-label" htmlFor="instructorRole">
                  Instructor
                </label>
              </div>
            </div> */}
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
              // className="button -sm px-24 py-10 -blue-3 mt-3 text-white fw-500  text-14 mx-auto"
              className={`button -sm px-24 py-10 -blue-3 mt-3 text-white fw-500  text-14 mx-auto `}
              disabled={!selectedRole}
              onClick={facebookLogin}
            >
              {isLoading ? (
                <CircularProgress
                  size={30}
                  sx={{
                    color: "inherit",
                  }}
                />
              ) : (
                "Continue with Facebook"
              )}
            </button>
          )}
        </div>
      </Modal>
      {isSmallScreen ? (
        <button
          // className="button -sm px-2 py-3 -outline-blue-3 text-blue-3 text-16 fw-bolder lh-sm "
          // onClick={onOpenModal}
          className={`button -sm px-2 py-3 -outline-blue-3 text-blue-3 text-16 fw-bolder lh-sm `}
          // disabled={!selectedRole}
          onClick={facebookLogin}
        >
          <i className="icon-facebook text-24 " aria-hidden="true"></i>
        </button>
      ) : (
        <button
          // className="button -sm px-24 py-25 -outline-blue-3 text-blue-3 text-16 fw-bolder lh-sm "
          // onClick={onOpenModal}
          className={`button -sm px-24 py-25 -outline-blue-3 text-blue-3 text-16 fw-bolder lh-sm `}
          // disabled={!selectedRole}
          onClick={facebookLogin}
        >
          <i className="icon-facebook text-24 me-2" aria-hidden="true"></i>
          Facebook
        </button>
      )}
    </div>
  );
};

export default SignInWithFacebook;
