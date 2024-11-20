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
import { useNavigate } from "react-router-dom";
import { BootstrapTooltip } from "@/components/common/Tooltip";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CourseList from "../courseCards/CourseList";
import WidgetsIcon from "@mui/icons-material/Widgets";
import ListIcon from "@mui/icons-material/List";

export default function Courses({ userRole }) {
  const [filtered, setFiltered] = useState();
  const [categories, setCategories] = useState([]);
  const [value, setValue] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState("card");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  useEffect(() => {
    async function getCategory() {
      const { data } = await API.get("/api/category/parent/categories");
      setCategories(data);
       // console.log(data);
    }
    getCategory();
  }, []);

  useEffect(() => {
    async function getQuestionsSet() {
      try {
        const { data } = await API.get("/api/questionset");
         // console.log(data);
        setFiltered(data);
      } catch (error) {
         // console.log(error);
      }
    }
    getQuestionsSet();
  }, []);

  const handleChange = async (event, newValue) => {
     // console.log(event);
    let title = event.target.textContent;
    if (title == "All Categories") {
      setSelectedCategory(filtered);
    } else {
      try {
        if (token) {
          const { data } = await API.get(
            `/api/userresult/students/list/${set.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
           // console.log(data);
          setStudentsData(data);
        }
      } catch (error) {
        if (error.status == 403) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          // toast.error("Invaild token!");
          navigate("/login");
          return;
        }
        console.error("Failed to fetch student data:", error);
      }
      try {
        if (token) {
          const res = await API.get(
            `/api/category/selected/questionsets/${title}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
           // console.log(res);
          if (res.data) {
            setSelectedCategory(res.data);
          }
        }
      } catch (error) {
        if (error.status == 403) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          // toast.error("Invaild token!");
          navigate("/login");
          return;
        }
        throw error;
      }
    }

    setValue(newValue);
  };
  const user = auth?.currentUser?.displayName;
  const userData = JSON.parse(localStorage.getItem("user")) || "";
  // const userRole = userData.role;
  const userId = userData.id;
   // console.log(filtered);
   // console.log(userRole);
  let questionSetByInstructor = [];
  if (userRole == "instructor") {
    selectedCategory && selectedCategory?.length > 0
      ? (questionSetByInstructor = selectedCategory?.filter(
          (set) => set.created_by == userId
        ))
      : (questionSetByInstructor = filtered?.filter(
          (set) => set.created_by == userId
        ));
  }

   // console.log(questionSetByInstructor);
   // console.log(value);

  const handleViewChange = (viewType) => setView(viewType);

  return (
    <section
      className="layout-pt-lg layout-pb-lg"
      style={{ paddingTop: "10px", paddingBottom: "40px" }}
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
      <div className="tabs__controls flex-wrap  pt-20 d-flex justify-center x-gap-10 js-tabs-controls ">
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
        className="pt-40 m-auto row y-gap-30 w-75 pl-0 pr-0"
        data-aos="fade-right"
        data-aos-offset="80"
        data-aos-duration={800}
      >
        <div className="view-toggle text-center d-flex gap-2 justify-content-center">
          <Button onClick={() => handleViewChange("card")} className={`d-flex gap-2 `} style={{ backgroundColor: view === 'card' ? '#E4E7EA' : 'transparent' }}>
            <WidgetsIcon />
            Card View
          </Button>
          <Button onClick={() => handleViewChange("list")} className="d-flex gap-2" style={{ backgroundColor: view === 'list' ? '#E4E7EA' : 'transparent' }}>
            {" "}
            <ListIcon /> List View
          </Button>
        </div>
        {userRole && userRole === "instructor" ? (
          questionSetByInstructor?.length > 0 ? (
            questionSetByInstructor.map((elm, index) => (
              <CourceCard
                view={view}
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
              view={view}
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
              view={view}
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
