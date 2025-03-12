
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
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
import { Button, Card, CardContent, CircularProgress, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { generateStrongTempPassword } from "@/utils/TemporaryPasswordGenerator";
import { showToast } from "@/utils/toastService";

export default function AdminDashboardOne() {
  const [questionSets, setQuestionSets] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const [states, setStates] = useState([]);
  const [radarData, setRadarData] = useState([]);
  const [organizationList, setOrganizationList] = useState([]);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState();
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userId = user.id;
  const org = JSON.parse(localStorage?.getItem("org")) || "";
  console.log(org)

  const isPublicAdmin = org?.id == 0 || !org?.id;
  const adminType = isPublicAdmin ? "Public Admin" : "Organization Admin";

  useEffect(() => {
    async function getDashboardData() {
      try {
        if (token) {
          // const url = org?.id ? `/api/users/orgid/${org.id || 0}` : `/api/users/orgid/0`;
          const { data } = await API.get(
            `/api/users/orgid/${org.id || 0}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const res = await API.get(
            `/api/questionset/active/allqset/orgid/${org.id || 0}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const response = await API.get(
            `/api/userresult/all/attempts/orgid/${org.id || 0}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const organizationResponse = await API.get(
            `/api/org/getall/organizations`,
          );
          setOrganizationList(organizationResponse?.data)

          console.log(res.data);
          // setTotalAttemptCnt(res.data.attempt_count);
          setQuestionSets(res.data);
          setUserResults(response.data)
          let studentCnt = 0;
          let insCnt = 0;
          data.forEach((user) => {
            if (user.role == 'student') {
              studentCnt += 1
            } else if (user.role == 'instructor') {
              insCnt += 1
            }
          })

          // const dataArr = [
          //   {
          //     id: 1,
          //     title: "Students",
          //     value: studentCnt,
          //     iconClass: "icon-online-learning-4",
          //   },
          //   {
          //     id: 2,
          //     title: "Instructors",
          //     value: insCnt,
          //     iconClass: "icon-friend",
          //   },
          //   {
          //     id: 3,
          //     title: "QuestionSets",
          //     value: res.data.length,
          //     iconClass: "icon-creative-web",
          //   },
          //   {
          //     id: 4,
          //     title: "Quiz Attempts",
          //     value: response.data.length,
          //     iconClass: "icon-edit",
          //   },
          //   org?.id == 0
          //     && {
          //       id: 5,
          //       title: "Organizations",
          //       value: organizationResponse?.data?.length,
          //       iconClass: "icon-edit",
          //     },
          // ];
          if (isPublicAdmin) {
            // Public admin stats
            const dataArr = [
              {
                id: 1,
                title: "Students",
                value: studentCnt,
                iconClass: "icon-online-learning-4",
                link: "/admin/students-list"
              },
              {
                id: 2,
                title: "Instructors",
                value: insCnt,
                iconClass: "icon-friend",
                link: "/admin/instructors-list"
              },
              {
                id: 3,
                title: "QuestionSets",
                value: res.data.length,
                iconClass: "icon-creative-web",
                link: "/admin/questionsets"
              },
              {
                id: 4,
                title: "Quiz Attempts",
                value: response.data.length,
                iconClass: "icon-edit",
                link: "/admin/attempts"
              },
              {
                id: 5,
                title: "Organizations",
                value: organizationList?.length || 0,
                iconClass: "icon-building",
                link: "/admin/organization-list/approval"
              },
            ];
            setStates(dataArr);
          } else {
            // Organization admin stats
            const dataArr = [
              {
                id: 1,
                title: "Students",
                value: studentCnt,
                iconClass: "icon-online-learning-4",
                link: "/admin/students-list"
              },
              {
                id: 2,
                title: "Instructors",
                value: insCnt,
                iconClass: "icon-friend",
                link: "/admin/instructors-list"
              },
              {
                id: 3,
                title: "QuestionSets",
                value: res.data.length,
                iconClass: "icon-creative-web",
                link: "/admin/questionsets"
              },
              {
                id: 4,
                title: "Quiz Attempts",
                value: response.data.length,
                iconClass: "icon-edit",
                link: "/admin/attempts"
              },
            ];
            setStates(dataArr);
          }

          // setStates(dataArr);
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

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => setOpen(false);

  let names = userName?.split(" ");
  let firstname = names[0];
  let lastname = "";
  if (names.length > 1) {
    lastname = names[names.length - 1];
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const password = generateStrongTempPassword()

      if (password) {
        const data = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        updateProfile(auth.currentUser, {
          displayName: userName,
        });
        // console.log(auth.currentUser);
        try {
          const res = await API.post("/api/users", {
            username: auth.currentUser.email,
            email: auth.currentUser.email,
            created_on: auth.currentUser.metadata?.createdAt,
            last_login: auth.currentUser.metadata?.lastLoginAt,
            first_name: firstname,
            last_name: lastname,
            uid: auth.currentUser.uid,
            role: selectedRole,
            provider: "manual",
            org_id: org.id,
            company:org.subdomain,
          });
          // console.log(res);
          try {
            const response = await API.post('/api/sendemail/org/user/invitation/from-admin',{ orgName: org.org_name, email: email, password: password, subdomain: org.subdomain, role: selectedRole }, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            if (response.status == 200) {
              showToast('success', 'User registered and invitaion email sent!')
            }
          } catch (error) {
            console.log(error)
            showToast('error', error.message)
          }
          
        setOpen(false)
          
        } catch (error) {
          // console.log(error);
        }
        try {
          const docRef = await setDoc(doc(db, "roles", auth.currentUser.uid), {
            uid: auth.currentUser.uid,
            role: selectedRole,
            email: email,
          });

          // console.log("Document written ");
        } catch (e) {
          console.error("Error adding document: ", e);
          showToast('error', 'Error adding document:',e.message)
        }

        // console.log("account created successfully!");
        setIsLoading(false);
        
      } else {
        
        showToast('error', 'Password not matched!!')
        setIsLoading(false)
        // console.log("Password not matched!!");
      }
    } catch (error) {
      // console.log(error);
      showToast('error', error.message)
      setIsLoading(false)
    }
  };

  const monthWiseQuestions = getMonthWiseQSetCreateCount(questionSets);
  console.log(monthWiseQuestions);
  const monthWiseAttempts = getMonthWiseAttemptCount(userResults);
  console.log(monthWiseAttempts);

  const getModalWidth = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth > 1024) return "450px"; // Large screens
    if (screenWidth > 768) return "350px";  // Medium screens
    return "80%"; // Small screens
  };

  return (
    <div className=" w-100" style={{ marginTop: "90px" }}>
      <Modal
        open={open}
        // onClose={() => { }}
        showCloseIcon={true}
        onClose={onCloseModal}
        center
        styles={{
          modal: {
            width: getModalWidth,
          },
        }}
      >
        <div className="col-12 rounded px-3 pt-4 border-1 " style={{overflowX:'hidden',margin:'0px auto'}}>
          <div className=" justify-content-around items-center mb-8" >

            <label
              htmlFor="email"
              style={{
                marginBottom: "5px",
                fontWeight: "600",
                color: "#333",
                fontSize: "14px",
              }}
            >
              Select Member Role
            </label>
            <div className="role-radio-buttons bg-white px-5  rounded row gap-2 col-8" style={{
              padding: "10px",
              border: "1px solid #ced4da",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
              backgroundColor: "#f8f9fa",
              boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
            }}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  className=""
                  style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}
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
          </div>
          <div className=" justify-content-evenly items-center">
            {/* <TextField
                      required
                      id="outlined-required"
                      label="Email"
                      type="Email"
                      className="bg-white rounded w-100"
                      onChange={(e) => setEmail(e.target.value)}
                    /> */}
            <label
              htmlFor="email"
              style={{
                marginBottom: "5px",
                fontWeight: "600",
                color: "#333",
                fontSize: "14px",
              }}
            >
              Email
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
              className="w-75"
              value={email}
              onChange={(e) => setEmail(e.target.value)}

            />
          </div>
          <div className=" justify-content-evenly items-center">
            {/* <TextField
                      required
                      id="outlined-required"
                      label="Email"
                      type="Email"
                      className="bg-white rounded w-100"
                      onChange={(e) => setEmail(e.target.value)}
                    /> */}
            <label
              htmlFor="email"
              style={{
                marginBottom: "5px",
                fontWeight: "600",
                color: "#333",
                fontSize: "14px",
              }}
            >
              Username
            </label>
            <input
              required
              type="text"
              name="username"
              id="username"
              style={{
                padding: "10px",
                border: "1px solid #ced4da",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                backgroundColor: "#f8f9fa",
                boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
              className="w-75"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}

            />
          </div>
          <Button
            variant="contained"
            style={{ backgroundColor: "#6440FB", margin: "10px 10vw" }}
            className="py-8 px-20 text-center"
            // onClick={() => navigate('/admin/invite-members')}
            onClick={handleSubmit}
          >
            <i className="icon-email mr-10"></i>
            {isLoading ? <CircularProgress size={30} sx={{ color: "inherit" }} /> : "Invite Member"}

          </Button>
        </div>
      </Modal>
      <div className="dashboard__content bg-light-4">
        <div className="d-flex align-items-center justify-content-between pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Dashboard</h1>
            <div className="mt-10">Welcome to Admin Dashboard.</div>
          </div>

          {
            !isPublicAdmin && (
              <div
              // className="d-flex align-items-center justify-content-center p-4 border rounded"
              // style={{
              //   backgroundColor: "#f8f9fa",
              //   maxWidth: "500px",
              //   margin: "auto",
              //   boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              // }}
              >
                {/* First Brand Logo */}
                <img
                  src='/assets/img/header-logo3.png'
                  alt="GoTestli"
                  className="img-fluid"
                  style={{ maxWidth: "100px", height: "auto" }}
                />

                {/* 'X' Mark for Collaboration */}
                <CloseIcon
                  style={{
                    fontSize: "40px",
                    margin: "0 10px",
                    color: "#dc3545", // Bootstrap danger color
                  }}
                />

                {/* Second Brand Logo */}
                <img
                  src={org.logo}
                  alt={org.org_name}
                  className="img-fluid"
                  style={{ maxWidth: "100px", height: "auto" }}
                />
              </div>
            )
          }

        </div>
      
        {
          !isPublicAdmin && (
            <div className="d-flex flex-wrap">
              <Typography variant="subtitle1" className="w-100 mb-10 fw-600">
                Organization Overview
              </Typography>
              <div className="row w-100">
                <div className="col-md-6">
                  <Card className="shadow-sm d-flex align-items-center justify-content-between">
                    <CardContent>
                      <Typography variant="subtitle2">Organization Details</Typography>
                      <Typography variant="body2" className="mt-10">
                        Name: {org?.org_name || 'N/A'}
                      </Typography>
                      {/* <Typography variant="body2">
                         {org?.createdAt ? new Date(org.createdAt).toLocaleDateString() : 'N/A'}
                      </Typography> */}
                      <Button
                        variant="text"
                        color="primary"
                        size="small"
                        className="mt-10"
                        onClick={() => navigate('/admin/organization-settings')}
                      >
                        View Details
                      </Button>
                    </CardContent>
                    {/* <div className=" d-flex  justify-end items-center">
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "#6440FB", marginRight: "10px" }}
                        className="py-8 px-20"
                        onClick={onOpenModal}
                      // onClick={() => navigate('/admin/invite-members')}
                      >
                        <i className="icon-email mr-10"></i>
                        Invite Members
                      </Button>

                      <Button
                        variant="outlined"
                        style={{ borderColor: "#6440FB", color: "#6440FB" }}
                        className="py-8 px-20"
                        onClick={() => navigate('/admin/organization-settings')}
                      >
                        <i className="icon-setting mr-10"></i>
                        Organization Settings
                      </Button>
                    </div> */}
                  </Card>
                </div>
                <div className="col-md-6">
                  <Card className="shadow-sm h-100">
                    <CardContent>
                      <Typography variant="subtitle2">Quick Actions</Typography>
                      {!isPublicAdmin && (
          <div className=" d-flex justify-end items-center">
            <Button
              variant="contained"
              style={{ backgroundColor: "#6440FB", marginRight: "10px" }}
              className="py-8 px-20"
              // onClick={() => navigate('/admin/invite-members')}
              onClick={onOpenModal}
            >
              <i className="icon-email mr-10"></i>
              Invite Members
            </Button>

            <Button
              variant="outlined"
              style={{ borderColor: "#6440FB", color: "#6440FB" }}
              className="py-8 px-20"
              onClick={() => navigate('/admin/organization-settings')}
            >
              <i className="icon-setting mr-10"></i>
              Organization Settings
            </Button>
          </div>
        )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )
        }

        <div className="row y-gap-30">
          {states.map((elm, i) => (
            <div key={i} className="col-xl-3 col-md-6" style={{ cursor: elm?.title === 'Organizations' ? 'pointer' : 'default' }} onClick={() => navigate('/admin/organization-list/approval', { state: { organizationList: organizationList } })}>
              <div className="d-flex justify-between items-center py-35 px-30 rounded-16 bg-white -dark-bg-dark-1 shadow-4">
                <div >
                  <div className="lh-1 fw-500">{elm?.title}</div>
                  <div className="text-24 lh-1 fw-700 text-dark-1 mt-20">
                    {elm?.value}
                  </div>
                  {/* <div className="lh-1 mt-25">
                    <span className="text-purple-1">${elm.new}</span> New Sales
                  </div> */}
                </div>

                <i className={`text-40 ${elm?.iconClass} text-purple-1`}></i>
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
                <Charts data={monthWiseAttempts} type='attempt' />
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
