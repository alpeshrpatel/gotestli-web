
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FooterNine from "@/components/layout/footers/FooterNine";
import Charts from "@/components/dashboard/Charts";
import PieChartComponent from "@/components/dashboard/PieCharts";
import { getMonthWiseAttemptCount, getMonthWiseQSetCreateCount } from "@/utils/GetDatesOfMonth";
import { API } from "@/utils/AxiosInstance";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboardOne() {
  const [questionSets, setQuestionSets] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [states, setStates] = useState([]);
  const [radarData, setRadarData] = useState([]);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userId = user.id;

  useEffect(() => {
    async function getDashboardData() {
      try {
        if (token) {
          const { data } = await API.get(
            `/api/users`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const res = await API.get(
            `/api/questionset/active/allqset`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const response = await API.get(
            `/api/userresult/all/attempts`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ); 
        
      
          console.log(res.data);
          // setTotalAttemptCnt(res.data.attempt_count);
          setQuestionSets(data);
          setUserResults(response.data)
          let studentCnt = 0 ;
          let insCnt = 0 ;
          data.forEach((user) => {
            if(user.role == 'student'){
              studentCnt += 1
            }else if(user.role == 'instructor') {
              insCnt += 1
            }
          })

          const dataArr = [
            {
              id: 1,
              title: "Students",
              value: studentCnt,
              iconClass: "icon-online-learning-4",
            },
            {
              id: 2,
              title: "Instructors",
              value: insCnt,
              iconClass: "icon-friend",
            },
            {
              id: 3,
              title: "QuestionSets",
              value: res.data.length,
              iconClass: "icon-creative-web",
            },
            {
              id: 4,
              title: "Quiz Attempts",
              value: response.data.length,
              iconClass: "icon-edit",
            },
          ];
          setStates(dataArr);
          // const radarDataArr = [
          //   {
          //     subject: "Content Quality ",
          //     A: reviewResponse.data.content_quality,
          //     fullRate: 5,
          //   },
          //   {
          //     subject: "Satisfaction",
          //     A: reviewResponse.data.satisfaction,
          //     fullRate: 5,
          //   },
          //   {
          //     subject: "Difficulty",
          //     A: reviewResponse.data.difficulty,
          //     fullRate: 5,
          //   },
          // ];
          // setRadarData(radarDataArr);
        }
      } catch (error) {
        if (error.status == 403) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          // showToast("error","Invaild token!");
          navigate("/login");
          return;
        }
        console.error("Failed to fetch uploaded files data:", error);
      }
    }
    getDashboardData();
  }, []);

  const monthWiseQuestions = getMonthWiseQSetCreateCount(questionSets);
  console.log(monthWiseQuestions);
  const monthWiseAttempts = getMonthWiseAttemptCount(userResults);
  console.log(monthWiseAttempts);


  return (
    <div className=" w-100" style={{ marginTop: "90px" }}>
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Dashboard</h1>
            <div className="mt-10">Welcome to Admin Dashboard.</div>
          </div>
        </div>

        <div className="row y-gap-30">
          {states.map((elm, i) => (
            <div key={i} className="col-xl-3 col-md-6">
              <div className="d-flex justify-between items-center py-35 px-30 rounded-16 bg-white -dark-bg-dark-1 shadow-4">
                <div>
                  <div className="lh-1 fw-500">{elm.title}</div>
                  <div className="text-24 lh-1 fw-700 text-dark-1 mt-20">
                    {elm.value}
                  </div>
                  {/* <div className="lh-1 mt-25">
                    <span className="text-purple-1">${elm.new}</span> New Sales
                  </div> */}
                </div>

                <i className={`text-40 ${elm.iconClass} text-purple-1`}></i>
              </div>
            </div>
          ))}
        </div>

        <div className="row y-gap-30 pt-30">
          <div className="col-xl-6 col-lg-6">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">
                  QuestionSet Creation Trend
                </h2>
               
              </div>
              <div className="py-40 px-30">
                <Charts data={monthWiseQuestions} type='create' />
              </div>
            </div>
          </div>

          <div className="col-xl-6 col-lg-6">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">
                  Quiz Attempt Trend
                </h2>
               
              </div>
              <div className="py-40 px-30">
                <Charts data={monthWiseAttempts} type ='attempt' />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="row y-gap-30 pt-30">
          <div className="col-xl-4 col-md-6">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 fw-500">Popular Instructor</h2>
                <Link
                  to="/instructors-list-2"
                  className="text-14 text-purple-1 underline"
                >
                  View All
                </Link>
              </div>
              <div className="py-30 px-30">
                <div className="y-gap-40">
                  {teamMembers.slice(0, 5).map((elm, i) => (
                    <div
                      key={i}
                      className={`d-flex ${i != 0 ? "border-top-light" : ""} `}
                    >
                      <img className="size-40" src={elm.image} alt="avatar" />
                      <div className="ml-10 w-1/1">
                        <h4 className="text-15 lh-1 fw-500">
                          <Link
                            className="linkCustom"
                            to={`/instructors/${elm.id}`}
                          >
                            {elm.name}
                          </Link>
                        </h4>
                        <div className="d-flex items-center x-gap-20 y-gap-10 flex-wrap pt-10">
                          <div className="d-flex items-center">
                            <i className="icon-message text-15 mr-10"></i>
                            <div className="text-13 lh-1">
                              {elm.reviews} Reviews
                            </div>
                          </div>
                          <div className="d-flex items-center">
                            <i className="icon-online-learning text-15 mr-10"></i>
                            <div className="text-13 lh-1">
                              {elm.students} Students
                            </div>
                          </div>
                          <div className="d-flex items-center">
                            <i className="icon-play text-15 mr-10"></i>
                            <div className="text-13 lh-1">
                              {elm.courses} Course
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Recent Courses</h2>
                <a href="#" className="text-14 text-purple-1 underline">
                  View All
                </a>
              </div>
              <div className="py-30 px-30">
                <div className="y-gap-40">
                  {resentCourses.map((elm, i) => (
                    <div
                      key={i}
                      className={`d-flex ${i != 0 ? "border-top-light" : ""} `}
                    >
                      <div className="shrink-0">
                        <img src={elm.imageSrc} alt="image" />
                      </div>
                      <div className="ml-15">
                        <h4 className="text-15 lh-16 fw-500">{elm.title}</h4>
                        <div className="d-flex items-center x-gap-20 y-gap-10 flex-wrap pt-10">
                          <div className="d-flex items-center">
                            <img
                              className="size-16 object-cover mr-8"
                              src={elm.authorImg}
                              alt="icon"
                            />
                            <div className="text-14 lh-1">{elm.title}</div>
                          </div>
                          <div className="d-flex items-center">
                            <i className="icon-document text-16 mr-8"></i>
                            <div className="text-14 lh-1">
                              {elm.lessonCount} lesson
                            </div>
                          </div>
                          <div className="d-flex items-center">
                            <i className="icon-clock-2 text-16 mr-8"></i>
                            <div className="text-14 lh-1">{`${Math.floor(
                              elm.duration / 60,
                            )}h ${Math.floor(elm.duration % 60)}m`}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6">
            <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
              <div className="d-flex justify-between items-center py-20 px-30 border-bottom-light">
                <h2 className="text-17 lh-1 fw-500">Notifications</h2>
              </div>
              <div className="py-30 px-30">
                <div className="y-gap-40">
                  {notifications.map((elm, i) => (
                    <div
                      key={i}
                      className={`d-flex items-center ${
                        i != 0 ? "border-top-light" : ""
                      } `}
                    >
                      <div className="shrink-0">
                        <img src={elm.imageSrc} alt="image" />
                      </div>
                      <div className="ml-12">
                        <h4 className="text-15 lh-1 fw-500">{elm.heading}</h4>
                        <div className="text-13 lh-1 mt-10">
                          {elm.time} Hours Ago
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <FooterNine />
    </div>
  );
}
