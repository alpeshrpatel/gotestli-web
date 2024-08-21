import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
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


const SignInWithGoogle = () => {
  const [open, setOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => setOpen(false);
  const navigate = useNavigate();

  const googleLogin = async () => {
    
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      const email = auth.currentUser.email;
      let userRole;

      const rolesRef = collection(db, "roles");
      const q = query(rolesRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        try {
          await setDoc(doc(db, "roles", auth.currentUser.uid), {
            uid: auth.currentUser.uid,
            role: selectedRole,
            email: email,
          });
          console.log("Document written ");
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      } else {
        console.log("Email already exists in roles collection.");
      }
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const docRef = doc(db, "roles", userId);
        const docSnap = await getDoc(docRef);
        console.log(docRef);
        if (docSnap.exists()) {
          userRole = docSnap.data().role;
          // setUserRole(docSnap.data().role);
          console.log(docSnap.data().role);
        } else {
          console.log("No role found for this user");
        }
      } else {
        console.log("No user is logged in ");
      }
      userRole == "instructor"
        ? navigate("/instructor/home")
        : userRole == "student"
        ? navigate("/")
        : navigate("/admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal open={open} onClose={onCloseModal} center>
        <div className="col-lg-12 border-1 rounded">
          <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
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
          </div>
          {selectedRole && (
            <button
              className="button -sm px-24 py-10 -red-3 mt-3 text-white fw-500  text-14 mx-auto"
              onClick={googleLogin}
            >
              Continue with Google
            </button>
          )}
        </div>
      </Modal>
      <button
        className="button -sm px-24 py-25 -outline-red-3 text-red-3 text-16 fw-bolder lh-sm"
        onClick={onOpenModal}
        // onClick={googleLogin}
      >
        <i className="fa fa-google text-24 me-2" aria-hidden="true"></i>
        Google
      </button>
    </div>
  );
};

export default SignInWithGoogle;
