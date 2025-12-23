import React, { useRef } from "react";
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
import CourseList from "../courseCards/ListView";
import WidgetsIcon from "@mui/icons-material/Widgets";
import ListIcon from "@mui/icons-material/List";
import TableHeader from "../courseCards/TableHeader";
import ListView from "../courseCards/ListView";
import TableBodyContent from "../courseCards/TableBodyContent";
import { showToast } from "@/utils/toastService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Courses({ userRole }) {
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [value, setValue] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [view, setView] = useState("card");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationLoading, setRecommendationLoading] = useState(false);
  const navigate = useNavigate();
  const loaderRef = useRef(null);

  const limit = 4;
  // const start = (page - 1) * limit;
  // const end = page * limit;

  const token = localStorage.getItem("token");
  const org = JSON.parse(localStorage.getItem("org")) || "";
  const userValue = JSON.parse(localStorage.getItem("user")) || "";
  let orgid = org?.id || 0;
  useEffect(() => {
    async function getCategory() {
      const { data } = await API.get("/api/category/parent/categories");
      setCategories(data);
      // console.log(data);
    }
    getCategory();
    if (userRole && userRole === "student") {
      recommendCall();
    }
  }, []);

  async function getQuestionsSet() {
    if (loading || !hasMore) return;
    try {
      setLoading(true);
      const start = (page - 1) * limit;
      const end = page * limit;
      console.log("Fetching questions set for page:", page, "start:", start, "end:", end);
      const { data } = await API.get(`/api/questionset?start=${start}&end=${end}&limit=${limit}&orgid=${orgid}`);
      // console.log("Fetched questions set:", data);
      if (Array.isArray(data)) {
        const newQuizzes = data
        // setFiltered(data);
        if (newQuizzes.length === 0) {
          setHasMore(false);
        } else {
          if (page === 1) {

            setFiltered(newQuizzes);
            setPage(prevPage => prevPage + 1);

          } else {
            setFiltered(prevQuizzes => [...prevQuizzes, ...newQuizzes]);
            setPage(prevPage => prevPage + 1);
          }

        }
      } else {
        console.error("Expected an array, got:", data);
        setFiltered([]);
      }
    } catch (error) {
      console.error("Error fetching questions set:", error);
      setFiltered([]);
    }
    setLoading(false);
  }

  const recommendCall = async () => {
    setRecommendationLoading(true);
    try {
      // await API.post('/api/recommend/quizzes')
      const response = await API.post(`/api/recommend/users?email=${userValue.email}`);



      // console.log('Recommendations:', response.data);


      const titles = response?.data?.map(item => item.title).filter(Boolean);

      if (titles.length === 0) {
        setRecommendations([]);
        return;
      }


      const questionSetRecommendationResults = await Promise.all(
        titles.map(async (title) => {
          // console.log(`Fetching questions for ${title}...`);
          try {
            const questionResponse = await API.get(`/api/questionset/getquestionsetbytitle/recommendations?title=${encodeURIComponent(title)}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              }
            });
            // console.log(`Fetched questions for ${title}:`, questionResponse.data);
            return questionResponse.data;
          } catch (err) {
            console.error(`Failed to fetch questions for ${title}:`, err);
            return { title, data: null, error: err.message };
          }
        })
      );
      // const questionSetPromises = titles.map(async (title) => {

      // });

      // const questionSetResults = await Promise.all(questionSetPromises);




      // const questionSetsMap = questionSetResults.reduce((acc, result) => {
      //   acc[result.title] = result.data;
      //   return acc;
      // }, {});

      setRecommendations(questionSetRecommendationResults);


    } catch (error) {
      console.error("Error fetching recommendations:", error);
      showToast("error", "Failed to fetch recommendations. Please try again later." + error.message);
    }
    setRecommendationLoading(false);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const target = entries[0];
        if (target.isIntersecting) {
          getQuestionsSet();
        }
      },
      { threshold: 0.1 }
    );

    const currentLoaderRef = loaderRef.current;
    if (currentLoaderRef) {
      observer.observe(currentLoaderRef);
    }

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef);
      }
    };
  }, [loaderRef, page, loading, hasMore]);

  useEffect(() => {

    getQuestionsSet();
  }, []);

  const handleChange = async (event, newValue) => {
    // console.log(event);
    let title = event.target.textContent;
    if (title == "All Categories") {
      setSelectedCategory(filtered);
    } else {
      // console.log("Selected Category:", title);
      try {
        if (token) {
          const { data } = await API.get(
            `/api/userresult/students/list/${set.id}?orgid=${orgid}`,
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
          // showToast("error","Invaild token!");
          navigate("/login");
          return;
        }
        console.error("Failed to fetch student data:", error);
      }
      try {
        // if (token) {
        const res = await API.get(
          `/api/category/selected/questionsets/${title}`,
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
        );
        // console.log('selectedcategoryres', res);
        if (res.data) {
          setSelectedCategory(res.data);
        }
        // }
      } catch (error) {
        if (error.status == 403) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          // showToast("error","Invaild token!");
          navigate("/login");
          return;
        }
        throw error;
      }
    }

    setValue(newValue);
  };
  // console.log("Selected Category:", selectedCategory);
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

  // console.log('qs by ins', filtered);
  // console.log('recommendations for student', recommendations);
  // console.log(value);

  const handleViewChange = (viewType) => setView(viewType);

  return (
    <section
      className="layout-pt-lg layout-pb-lg"
      style={{ paddingTop: "10px", paddingBottom: "40px" }}
    >
      
      {
        userRole === "student" && (
          <div>
            <h3 className=" sectionTitle__title text-30 sm:text-24  text-center">Recommended Quizzes for You  <img style={{ width: "30px", height: '35px' }} src="/assets/img/bulb.png" /></h3>
            <div
              className="pt-40 m-auto row y-gap-30 pl-0 pr-0" style={{ width: '95vw' }}
              data-aos="fade-right"
              data-aos-offset="80"
              data-aos-duration={200}
            >
              {
                !recommendationLoading && recommendations && recommendations.length > 0 ? (
                  recommendations.map((elm, index) => (
                    <CourceCard
                      view={'card'}
                      role={userRole}
                      key={index}
                      data={elm}
                      index={index}
                      data-aos="fade-right"
                      data-aos-duration={(index + 1) * 300}
                    />
                  ))
                ) : recommendationLoading ? (
                  <div className="flex justify-center my-4 text-center">
                    <FontAwesomeIcon icon={faSpinner} spin size="24" />
                    {/* <div className="w-6 h-6 border-2 border-t-blue-500 rounded-full animate-spin"></div> */}
                  </div>
                )
                  : (
                    <p className="text-center text-gray-500 my-4">No recommendations available</p>
                  )
              }
            </div>
          </div>
        )
      }
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
      <div className=" flex-wrap  pt-20 d-flex justify-center x-gap-10 js-tabs-controls ">
        <Box sx={{ width: "100%" }} className="d-flex justify-center">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            // sx={{ overflowX:'scroll' }}
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
        className="pt-40 m-auto row y-gap-30 pl-0 pr-0" style={{ width: '95vw' }}
        data-aos="fade-right"
        data-aos-offset="80"
        data-aos-duration={800}
      >
        <div className="view-toggle text-center d-flex gap-2 justify-content-center">
          <Button
            onClick={() => handleViewChange("card")}
            className={`d-flex gap-2 `}
            style={{
              backgroundColor: view === "card" ? "#E4E7EA" : "transparent",
            }}
          >
            <WidgetsIcon />
            Card View
          </Button>
          <Button
            onClick={() => handleViewChange("list")}
            className="d-flex gap-2"
            style={{
              backgroundColor: view === "list" ? "#E4E7EA" : "transparent",
            }}
          >
            {" "}
            <ListIcon /> List View
          </Button>
        </div>
        {userRole && userRole === "instructor" ? (
          questionSetByInstructor?.length > 0 ? (
            <>
              {view == "list" ? (
                <ListView header={<TableHeader />}>
                  {questionSetByInstructor.map((elm, index) => (
                    <CourceCard
                      view={view}
                      role={userRole}
                      key={index}
                      data={elm}
                      index={index}
                      data-aos="fade-right"
                      data-aos-duration={(index + 1) * 300}
                    />
                  ))}
                </ListView>
              ) : (
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
              )}
              {/* { questionSetByInstructor.map((elm, index) => (
              <CourceCard
                view={view}
                role={userRole}
                key={index}
                data={elm}
                index={index}
                data-aos="fade-right"
                data-aos-duration={(index + 1) * 300}
              />
            ))}
             */}
            </>
          ) : (
            <h4 className="no-content text-center mt-8">
              No Questionsets found for this instructor.
            </h4>
          )
        ) : !selectedCategory ? (
          <>
            {view == "list" ? (
              <ListView header={<TableHeader />}>
                {filtered &&
                  Array.isArray(filtered) &&
                  filtered?.map((elm, index) => (
                    <CourceCard
                      view={view}
                      role={userRole}
                      key={index}
                      data={elm}
                      index={index}
                      data-aos="fade-right"
                      data-aos-duration={(index + 1) * 300}
                    />
                  ))}
              </ListView>
            ) : (
              filtered &&
              Array.isArray(filtered) &&
              filtered?.map((elm, index) => (
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
            )}

            {/* {filtered &&
              Array.isArray(filtered) &&
              filtered?.map((elm, index) => (
                <CourceCard
                  view={view}
                  role={userRole}
                  key={index}
                  data={elm}
                  index={index}
                  data-aos="fade-right"
                  data-aos-duration={(index + 1) * 300}
                />
              ))} */}
          </>
        ) : selectedCategory.length > 0 ? (
          <>
            {view == "list" ? (
              <ListView header={<TableHeader />}>
                {selectedCategory.map((elm, index) => (
                  <CourceCard
                    view={view}
                    role={userRole}
                    key={index}
                    data={elm}
                    index={index}
                    data-aos="fade-right"
                    data-aos-duration={(index + 1) * 300}
                  />
                ))}
              </ListView>
            ) : (
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
            )}
            {/* {selectedCategory.map((elm, index) => (
              <CourceCard
                view={view}
                role={userRole}
                key={index}
                data={elm}
                index={index}
                data-aos="fade-right"
                data-aos-duration={(index + 1) * 300}
              />
            ))} */}
          </>
        ) : (
          <h4 className="no-content text-center mt-8">
            No Questionsets found for this Category.
          </h4>
        )}
        {loading && (
          <div className="flex justify-center my-4">
            <div className="w-6 h-6 border-2 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        )}

        {!loading && hasMore && (
          <div ref={loaderRef} className="h-10" />
        )}

        {!hasMore && filtered.length > 0 && (
          <p className="text-center text-gray-500 my-4">No more quizzes to load</p>
        )}

        {!loading && filtered.length === 0 && (
          <p className="text-center text-gray-500 my-4">No quizzes available</p>
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
