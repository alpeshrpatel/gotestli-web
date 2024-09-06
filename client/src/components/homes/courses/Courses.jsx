import React from "react";
import CourceCard from "../courseCards/CourseCard";
import { coursesData, catagories } from "../../../data--backup/courses";
import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "@/utils/AxiosInstance";
import { auth, db } from "@/firebase/Firebase";
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { Tabs, Tab, Box, Button } from "@mui/material";

export default function Courses() {
  const [filtered, setFiltered] = useState();
  const [categories, setCategories] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    async function getCategory(){
      const {data} = await API.get("/api/category/parent/categories");
      setCategories(data)
      console.log(data);
    }
    getCategory();
    
  }, []);

  useEffect(() => {
    async function checkUserRole() {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const docRef = doc(db, "roles", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserRole(docSnap.data().role.toLowerCase());
          console.log(docSnap.data().role);
        } else {
          console.log("No role found for this user");
        }
      } else {
        console.log("No user is logged in");
      }
    }
    checkUserRole();
  });
  useEffect(() => {
    async function getQuestionsSet() {
      try {
        const { data } = await API.get("/api/questionset");
        console.log(data);
        setFiltered(data);
      } catch (error) {
        console.log(error);
      }
    }
    getQuestionsSet();
  }, []);
  const user = auth?.currentUser?.displayName;
  console.log(filtered);
  console.log(userRole);
  let questionSetByInstructor = [];
  if (userRole == "instructor") {
    questionSetByInstructor = filtered?.filter(
      (set) => set.author.toLowerCase() == user.toLowerCase()
    );
  }

  console.log(questionSetByInstructor);

  return (
    <section
      className="layout-pt-lg layout-pb-lg"
      style={{ paddingTop: "10px" }}
    >
      <div className="row justify-center text-center">
        <div className="col-auto">
          <div className="sectionTitle ">
            <h2 className="sectionTitle__title sm:text-24">
              Our Most Popular Courses
            </h2>

            <p className="sectionTitle__text ">
              10,000+ unique online course list designs
            </p>
          </div>
        </div>
      </div>
      <div className="tabs__controls flex-wrap  pt-50 d-flex justify-center x-gap-10 js-tabs-controls ">
        
        <Box sx={{ width: "100%" }} className = "d-flex justify-center">
          <Tabs value={value} onChange={handleChange} aria-label="category tabs">
            <Tab sx={{fontWeight:'bold',fontSize:'14px'}} label="All Categories" />
            {categories && categories.map((category, index) => (
              <Tab key={index} label={category.title} sx={{fontWeight:'bold',fontSize:'14px'}} />
            ))}
          </Tabs>
        </Box>
      </div>

      <div
        className="pt-60 m-auto row y-gap-30 w-75 pl-0 pr-0"
        data-aos="fade-right"
        data-aos-offset="80"
        data-aos-duration={800}
      >
        {userRole && userRole === "instructor" ? (
          questionSetByInstructor.length > 0 ? (
            questionSetByInstructor.map((elm, index) => (
              <CourceCard
                role={userRole}
                key={index}
                data={elm}
                index={index}
                data-aos="fade-right"
                data-aos-duration={(index + 1) * 300}
              />
            ))
          ) : (
            <h4 className="no-content text-center mt-8">No Questionsets found for this instructor.</h4>
          )
        ) : (
          filtered &&
          filtered.map((elm, index) => (
            <CourceCard
              role={userRole}
              key={index}
              data={elm}
              index={index}
              data-aos="fade-right"
              data-aos-duration={(index + 1) * 300}
            />
          ))
        )}
        {/* { filtered &&
          filtered.map((elm, index) => (
            <CourceCard
              key={index}
              data={elm}
              index={index}
              data-aos="fade-right"
              data-aos-duration={(index + 1) * 300}
            />
          ))
        } */}
        {/* {filtered
          ? filtered.map((elm, index) => (
              <CourceCard
                key={index}
                data={elm}
                index={index}
                data-aos="fade-right"
                data-aos-duration={(index + 1) * 300}
              />
            ))
          : coursesData             
              .map((elm, index) => <CourceCard key={index} data={elm} />)} */}
      </div>
    </section>
  );
}
