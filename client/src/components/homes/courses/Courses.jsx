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

export default function Courses({userRole}) {
  const [filtered, setFiltered] = useState();
  const [categories, setCategories] = useState([]);
  const [value, setValue] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading,setIsLoading] = useState(false);

  
  useEffect(() => {
    async function getCategory() {
      const { data } = await API.get("/api/category/parent/categories");
      setCategories(data);
      console.log(data);
    }
    getCategory();
  }, []);

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

  const handleChange = async (event, newValue) => {
    console.log(event);
    let title = event.target.textContent;
    if (title == "All Categories") {
      setSelectedCategory(filtered);
    } else {
      try {
        const res = await API.get(
          `/api/category/selected/questionsets/${title}`
        );
        console.log(res);
        if (res.data) {
          setSelectedCategory(res.data);
        }
      } catch (error) {
        throw error;
      }
    }

    setValue(newValue);
  };
  const user = auth?.currentUser?.displayName;
  console.log(filtered);
  console.log(userRole);
  let questionSetByInstructor = [];
  if (userRole == "instructor") {
    selectedCategory && selectedCategory?.length > 0
      ? (questionSetByInstructor = selectedCategory?.filter(
          (set) => set.author.toLowerCase() == user.toLowerCase()
        ))
      : (questionSetByInstructor = filtered?.filter(
          (set) => set.author.toLowerCase() == user.toLowerCase()
        ));
  }

  console.log(questionSetByInstructor);
  console.log(value);
  return (
    <section
      className="layout-pt-lg layout-pb-lg"
      style={{ paddingTop: "10px" }}
    >
      <div className="row justify-center text-center">
        <div className="col-auto">
          <div className="sectionTitle mt-4 ">
            {userRole == "instructor" ? (
              
              <h4 className="sectionTitle__title text-30 sm:text-24 ">
                Preview How Your Quizzes Appear To Users In The Public View
              </h4>
            ) : (
              <>
                <h2 className="sectionTitle__title sm:text-24 ">
                  Our Most Popular Quizzes
                </h2>

                <p className="sectionTitle__text ">
                  Attend various Quizzes of different categories
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="tabs__controls flex-wrap  pt-50 d-flex justify-center x-gap-10 js-tabs-controls ">
        <Box sx={{ width: "100%" }} className="d-flex justify-center">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="category tabs"
          >
            <Tab
              sx={{ fontWeight: "bold", fontSize: "14px" }}
              label="All Categories"
            />
            {categories &&
              categories.map((category, index) => (
                <Tab
                  key={index}
                  label={category.title}
                  categoryId={category.id}
                  sx={{ fontWeight: "bold", fontSize: "14px" }}
                />
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
          questionSetByInstructor?.length > 0 ? (
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
            <h4 className="no-content text-center mt-8">
              No Questionsets found for this instructor.
            </h4>
          )
        ) : !selectedCategory ? (
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
        ) : selectedCategory.length > 0 ? (
          selectedCategory.map((elm, index) => (
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
          <h4 className="no-content text-center mt-8">
            No Questionsets found for this Category.
          </h4>
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
