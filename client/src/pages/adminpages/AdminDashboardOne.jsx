
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
import emailTemplates from "../../../../email_templates/emailtemplates";
import { renderTemplate } from "@/utils/renderTemplate";
import AddCategoryModal from "./AddCategoryModal";


const APP_ID = 1;
const API_TOKEN = '7b9e6c5f-8a1d-4d3e-b5f2-c9a8e7d6b5c4';

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
  const [isLoadingRecommendationsRefresh, setIsLoadingRecommendationsRefresh] = useState(null);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const navigate = useNavigate()

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userId = user.id;
  const org = JSON.parse(localStorage?.getItem("org")) || "";
  console.log(org)
  let orgid = org?.id || 0;
  const isPublicAdmin = org?.id == 0 || !org?.id;
  const adminType = isPublicAdmin ? "Public Admin" : "Organization Admin";

  const headers = {
    "X-API-Token": API_TOKEN,
    "app-id": APP_ID
  };

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
            `/api/questionset/active/allqset/?orgid=${org.id || 0}`,
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
          console.log(organizationResponse?.data)
          const transactionsResponse = await API.get(
            `/api/transactions/getall/payments/0?start=1&end=5`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          },
          );
          console.log(transactionsResponse);
          // setTotalAttemptCnt(res.data.attempt_count);
          console.log(res.data);
          setQuestionSets(res?.data?.res);
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
          setOrganizationList(organizationResponse?.data)
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
                value: studentCnt || 0,
                iconClass: "icon-online-learning-4",
                link: "/admin/students-list"
              },
              {
                id: 2,
                title: "Instructors",
                value: insCnt || 0,
                iconClass: "icon-friend",
                link: "/admin/instructors-list"
              },
              {
                id: 3,
                title: "QuestionSets",
                value: res.data.res.length || 0,
                iconClass: "icon-creative-web",
                link: "/admin/questionsets"
              },
              {
                id: 4,
                title: "Quiz Attempts",
                value: response.data.length || 0,
                iconClass: "icon-edit",
                link: "/admin/attempts"
              },
              {
                id: 4,
                title: "Refund Requests",
                value: transactionsResponse?.data?.totalRecords,
                iconClass: "icon-save-money",
                link: "/admin/refund/requests"
              },
              {
                id: 5,
                title: "Organizations",
                value: organizationResponse?.data?.length || 0,
                iconClass: "icon-person-3",
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
                value: studentCnt || 0,
                iconClass: "icon-online-learning-4",
                link: "/admin/students-list"
              },
              {
                id: 2,
                title: "Instructors",
                value: insCnt || 0,
                iconClass: "icon-friend",
                link: "/admin/instructors-list"
              },
              {
                id: 3,
                title: "QuestionSets",
                value: res?.data?.res?.length || 0,
                iconClass: "icon-creative-web",
                link: "/admin/questionsets"
              },
              {
                id: 4,
                title: "Quiz Attempts",
                value: response?.data?.length || 0,
                iconClass: "icon-edit",
                link: "/admin/attempts"
              },
              {
                id: 5,
                title: "Refund Requests",
                value: transactionsResponse?.data?.totalRecords || 0,
                iconClass: "icon-save-money",
                link: "/admin/refund/requests"
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

   const handleOpenCategoryModal = () => {
    setCategoryModalOpen(true);
  };

  const handleCloseCategoryModal = () => {
    setCategoryModalOpen(false);
  };

  const handleCategoryCreated = (newCategory) => {
    // Optional: Handle the newly created category
    // You can refresh data, update state, etc.
    console.log('New category created:', newCategory);
    
    // Example: Refresh dashboard data if needed
    // getDashboardData();
  };

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
            company: org.subdomain,
          });
          // console.log(res);
          try {
            // const response = await API.post('/api/sendemail/org/user/invitation/from-admin', { orgName: org.org_name, email: email, password: password, subdomain: org.subdomain, role: selectedRole }, {
            //   headers: {
            //     Authorization: `Bearer ${token}`,
            //   },
            // })
            const userOrgAcessEmail = emailTemplates.userOrgAcessEmail;
            const dynamicData = {
              org_name: org.org_name,
              email: email,
              password: password,
              subdomain: org.subdomain,
              selectedRole: selectedRole,
              first_name: firstname,

            }
            const renderedContent = {
              subject: renderTemplate(userOrgAcessEmail.subject, dynamicData),
              body_text: renderTemplate(userOrgAcessEmail.body_text, dynamicData),
              body_html: renderTemplate(userOrgAcessEmail.body_html, dynamicData),
            };
            const res = await API.post(
              `https://api.communication.gotestli.com/api/send/email`,
              {
                app_id: APP_ID,
                sender: "gotestli07@gmail.com",
                sender_name: "Gotestli",
                recipients: [
                  {
                    email: email,
                    name: '',
                  }
                ],
                //                 content: {
                //                   subject: `🎊 Welcome to GoTestli! Your Organization Access is Ready 🚀`,
                //                   body_text:
                //                     `Dear ${selectedRole === 'instructor' ? 'Instructor' : 'Student'},

                // We’re excited to welcome you to GoTestli! Your organization, ${org.org_name}, is now onboarded, and your access has been set up. You’re just a step away from unlocking powerful tools designed to enhance learning and assessments.

                // Here are your login details:

                // 🔑 Login Credentials  
                // 🔗 Platform URL: https://${org.subdomain}.gotestli.com  
                // 📧 Username: ${email}  
                // 🔒 Temporary Password: ${password} (Please change upon first login)  

                // As a ${selectedRole}, you will have access to:

                // ${selectedRole === 'instructor'
                //                       ? `- 📚 Create and manage interactive assessments  
                //   - 📊 Track student progress with real-time analytics  
                //   - 🔄 Integrate learning content effortlessly  
                //   - 🏫 Oversee student participation and performance`
                //                       : `- 📝 Access engaging quizzes and assessments  
                //   - 📈 Monitor your progress and performance  
                //   - 🎯 Enhance learning with personalized content  
                //   - 🎓 Stay on top of your academic journey`}  

                // 💡 **Next Steps:**  
                // 📅 Join us for a live onboarding session on **Wednesday, March 12th at 10:00 AM EST**, where our specialists will guide you through the platform.  

                // In the meantime, check out our **Getting Started Guide** (https://help.gotestli.com/getting-started) and **Resource Center** (https://help.gotestli.com/resources) to familiarize yourself with GoTestli.  

                // We’re thrilled to have you on board and can’t wait to see you excel!  

                // Wishing you success,
                // The GoTestLI Team

                // ---------------------
                // GoTestli
                // Test Your Limits, Expand Your Knowledge
                // https://gotestli.com

                // 📩 Need help? Reach out to us at **gotestli07@gmail.com** or call **(800) 555-TEST**.  
                //   `,
                //                   body_html: `
                // <p>Dear <strong>${selectedRole === 'instructor' ? 'Instructor' : 'Student'}</strong>,</p>

                // <p>We’re excited to welcome you to <strong>GoTestli</strong>! Your organization, <strong>${org.org_name}</strong>, is now onboarded, and your access has been set up. You’re just a step away from unlocking powerful tools designed to enhance learning and assessments.</p>

                // <div style="background-color: #f8f9fa; border-left: 5px solid #4CAF50; padding: 15px; margin: 20px 0;">
                //   <p><strong>🔑 Login Credentials</strong></p>
                //   <p>🔗 <strong>Platform URL:</strong> <a href="https://${org.subdomain}.gotestli.com" style="color: #007BFF;">https://${org.subdomain}.gotestli.com</a></p>
                //   <p>📧 <strong>Username:</strong> ${email}</p>
                //   <p>🔒 <strong>Temporary Password:</strong> <strong>${password}</strong> (Please change upon first login)</p>
                // </div>

                // <p>As a <strong>${selectedRole}</strong>, you will have access to:</p>

                // ${selectedRole === 'instructor'
                //                       ? `<ul>
                //        <li>📚 Create and manage interactive assessments</li>
                //        <li>📊 Track student progress with real-time analytics</li>
                //        <li>🔄 Integrate learning content effortlessly</li>
                //        <li>🏫 Oversee student participation and performance</li>
                //      </ul>`
                //                       : `<ul>
                //        <li>📝 Access engaging quizzes and assessments</li>
                //        <li>📈 Monitor your progress and performance</li>
                //        <li>🎯 Enhance learning with personalized content</li>
                //        <li>🎓 Stay on top of your academic journey</li>
                //      </ul>`}


                // <p>We’re thrilled to have you on board and can’t wait to see you excel!</p>

                //  <p>Wishing you success,<br/>  
                // <p>GoTestli Team</p>
                // <hr style="margin: 30px 0;" />

                // <div style="font-size: 13px; color: #888; text-align: center;">
                //   <img src="https://gotestli.com/assets/img/header-logo3.png" alt="GoTestLI Logo" width="120" style="margin-bottom: 10px;" />
                //   <p><b>GoTestli</b><br/>
                //   Test Your Limits, Expand Your Knowledge<br/>
                //   <a href="https://gotestli.com" style="color: #ff6600; text-decoration: none;">www.gotestli.com</a></p>
                //   <p style="margin-top: 10px; font-size: 12px;">

                //     <a href="mailto:gotestli07@gmail.com" style="color: #666; text-decoration: none; margin: 0 5px;">✉️ gotestli07@gmail.com</a>
                //   </p>

                // </div>

                // <p style="font-size: 12px; color: #666;">
                // 📩 Need help? Reach out to us at <a href="mailto:gotestli07@gmail.com" style="color: #007BFF;">gotestli07@gmail.com</a> or call (800) 555-TEST.
                // </p>

                //   `,
                //                 },
                content: renderedContent,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`, ...headers
                },
              }
            );
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
          showToast('error', 'Error adding document:', e.message)
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

  const handleRefreshRecommendationsQuizzes = async () => {
    try {
      setIsLoadingRecommendationsRefresh('quizzes');
      const response = await API.post(
        `/api/recommend/quizzes`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status == 200) {
        showToast('success', 'Recommendations refreshed successfully!')
      }
    } catch (error) {
      console.log(error)
      showToast('error', error.message)
    }
    setIsLoadingRecommendationsRefresh(null);
  }

   const handleRefreshRecommendationsUsers = async () => {
    try {
      setIsLoadingRecommendationsRefresh('users');
      const response = await API.post(
        `/api/recommend/update/collections`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status == 200) {
        showToast('success', 'Recommendations refreshed successfully!')
      }
    } catch (error) {
      console.log(error)
      showToast('error', error.message)
    }
    setIsLoadingRecommendationsRefresh(null);
  }
  const handleStartCronJob = async () => {
    try {
      const response = await API.post(
        `/api/cron/job`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      if (response.status == 200) {
        showToast('success', 'Cron job started successfully!')
      }
    } catch (error) {
      console.log(error)
      showToast('error', error.message)
    }
  }

  return (
    <div className=" w-100" style={{ marginTop: "90px" }}>
       <AddCategoryModal
        open={categoryModalOpen}
        onClose={handleCloseCategoryModal}
        onCategoryCreated={handleCategoryCreated}
      />
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
        <div className="col-12 rounded px-3 pt-4 border-1 " style={{ overflowX: 'hidden', margin: '0px auto' }}>
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
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              className="button -sm px-12 py-20 -outline-purple-1 text-purple-1 text-16 fw-bolder lh-sm"
              onClick={handleOpenCategoryModal}
            >
              <i className="icon-plus mr-5"></i>
              Add Category
            </button>
          <button
            className={`button -sm px-12 py-20 -outline-green-5 text-green-5 text-16 fw-bolder lh-sm  `}
            // disabled={!selectedRole}
            // onClick={onOpenModal}
            onClick={handleStartCronJob}
          >
            Start Cron Job
          </button>
          <button
            className={`button -sm px-12 py-20 -outline-green-5 text-green-5 text-16 fw-bolder lh-sm  `}
            // disabled={!selectedRole}
            // onClick={onOpenModal}
            onClick={handleRefreshRecommendationsQuizzes}
          >
            {
              isLoadingRecommendationsRefresh === 'quizzes' ? <CircularProgress size={20} sx={{ color: "inherit" }} /> : 'Refresh Quizzes'
            }
            
          </button>
          <button
            className={`button -sm px-12 py-20 -outline-green-5 text-green-5 text-16 fw-bolder lh-sm  `}
            // disabled={!selectedRole}
            // onClick={onOpenModal}
             onClick={() => navigate('/admin/bulk/email/marketing')}
          >
            Start Email Marketing
          </button>
          <button
            className={`button -sm px-12 py-20 -outline-green-5 text-green-5 text-16 fw-bolder lh-sm  `}
            // disabled={!selectedRole}
            // onClick={onOpenModal}
            onClick={handleRefreshRecommendationsUsers}
          >
            {
              isLoadingRecommendationsRefresh === 'users' ? <CircularProgress size={20} sx={{ color: "inherit" }} /> : 'Refresh Users'
            }
           
          </button>
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
            <div key={i} className="col-xl-3 col-md-6" style={{ cursor: (elm?.title === 'Organizations' || elm?.title === 'Refund Requests') ? 'pointer' : 'default' }}
              onClick={() => {
                if (elm?.title === 'Organizations') {
                  navigate('/admin/organization-list/approval', { state: { organizationList: organizationList } });
                } else if (elm?.title === 'Refund Requests') {
                  navigate('/admin/refund/requests');
                }else if (elm?.title === 'Students') {
                  navigate('/admin/students/list');
                }else if (elm?.title === 'Instructors') {
                  navigate('/admin/instructors/list');  
                }else if (elm?.title === 'QuestionSets') {
                  navigate('/admin/questionsets/list');
                }
              }}>
              <div className="d-flex justify-between items-center py-35 px-30 rounded-16 -dark-bg-dark-1 shadow-4" style={{ backgroundColor: (elm?.title === 'Organizations' || elm?.title === 'Refund Requests') ? '#D9EAFD' : '' }}>
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
                <Charts data={monthWiseQuestions} type='QuestionSet_created' />
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




