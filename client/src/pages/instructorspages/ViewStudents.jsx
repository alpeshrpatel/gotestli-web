import React, { useEffect, useState } from "react";
import Preloader from "@/components/common/Preloader";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import { API } from "@/utils/AxiosInstance";
import { auth } from "@/firebase/Firebase";
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Breadcrumbs, Button, TableCell } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { students } from "@/data--backup/students";
import CommonTable from "@/components/common/CommonTable";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import { showToast } from "@/utils/toastService";
import emailTemplates from "../../../../email_templates/emailtemplates";
import { renderTemplate } from "@/utils/renderTemplate";


// import NavigateNextIcon from "@mui/icons-material/NavigateNext";
const columns = [
  { id: "index", label: "#", sortable: false },
  { id: "user_id", label: "Student ID", sortable: true },
  { id: "modified_date", label: "Date", sortable: true },
  { id: "marks_obtained", label: "Score", sortable: true },
  { id: "percentage", label: "%", sortable: true },
  { id: "status", label: "Status", sortable: true },
  { id: "actions", label: "", sortable: false },
];

const APP_ID = 1;
const API_TOKEN = '7b9e6c5f-8a1d-4d3e-b5f2-c9a8e7d6b5c4';

const ViewStudents = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [isDisabled, setIsDisabled] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(location);
  const { set } = location.state;
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userRole = user.role;
  const userId = user.id;
  const token = localStorage.getItem("token");
  const org = JSON.parse(localStorage.getItem("org")) || "";
  let orgid = org?.id || 0;

  async function getstudents(page = 1, rowsPerPage = 10) {
    const start = (page - 1) * rowsPerPage + 1;
    const end = page * rowsPerPage;
    try {
      if (token) {
        let url = ''
        if (searchQuery) {
          url = `/api/userresult/students/list/${set.id}?start=${start}&end=${end}&search=${encodeURIComponent(searchQuery)}&orgid=${orgid}`;
        } else {
          url = `/api/userresult/students/list/${set.id}?start=${start}&end=${end}&orgid=${orgid}`;
        }
        const { data } = await API.get(
          url,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(data);
        setStudentsData(data.res);
        const theNewObj = {
          data: data.res,
          totalRecords: data.totalRecords
        };

        console.log('Final theNewObj:', theNewObj);
        return theNewObj;
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
  }
  useEffect(() => {

    getstudents();
  }, []);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const now = Date.now();
        let lastTimeStamp = studentsData.map((student) => {
          return {
            id: student.id,
            hours:
              (now - new Date(student.last_click_timestamp).getTime()) /
              (1000 * 60 * 60),
          };
        });

        lastTimeStamp.forEach(async (student) => {
          if (student.hours >= 24) {
            try {
              if (token) {
                const response = await API.put(
                  "/api/sendemail/check/status",
                  {
                    studentId: student.id,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                // console.log(response);
              }
            } catch (error) {
              if (error.status == 403) {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                // showToast("error","Invaild token!");
                navigate("/login");
                return;
              }
            }
          } else if (student.hours) {
            setIsDisabled((prev) => [...prev, { id: student.id }]);
          }
        });
      } catch (error) {
        console.error("Error checking status:", error);
      }
    };

    if (studentsData.length > 0) {
      checkStatus();
    }
  }, [studentsData]);
  // console.log(isDisabled);

  const handleReminderClick = async (studentData) => {
    setIsDisabled((prev) => [...prev, { id: studentData.id }]);
    try {
      if (token) {
        const { data } = await API.get(`api/users/${studentData.user_id}?orgid=${orgid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(data);
        const response = await API.get(`api/users/${userId}?orgid=${orgid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (data.email && response.data) {
          const headers = {
            "X-API-Token": API_TOKEN,
            "app-id": APP_ID
          };
          const quizReminderEmail = emailTemplates.quizReminderEmail;
          const dynamicData = {
            first_name: studentData.first_name,

            title: set.title,

            time_duration: set.time_duration,
            no_of_question: set.no_of_question,
            instructor: response.data.first_name,
          }
          const renderedContent = {
            subject: renderTemplate(quizReminderEmail.subject, dynamicData),
            body_text: renderTemplate(quizReminderEmail.body_text, dynamicData),
            body_html: renderTemplate(quizReminderEmail.body_html, dynamicData),
          };
          const res = await API.post(
            `https://communication.gotestli.com/api/send/email`,
            {
              app_id: APP_ID,
              sender: "dipakkarmur45@gmail.com",
              sender_name: "Gotestli",
              recipients: [
                {
                  email: studentData.email,
                  name: studentData.first_name,
                }
              ],
              cc: [
                {
                  email: studentData.email,
                  name: studentData.first_name,
                }
              ],
              bcc: [
                {
                  email: studentData.email,
                  name: studentData.first_name,
                }
              ],
              //               content: {
              //                 subject: "🚀 Reminder: Your Quiz Awaits! Don't Miss It! 🎯",
              //                 body_text: `
              //                 Hi ${studentData.first_name},

              //                 I hope you're doing great! 🌟 This is a friendly reminder to complete your quiz on **${quizData.title}**. ⏰ The quiz is an important step in reinforcing what you've learned, and I know you'll do amazing! 💪

              //                 Quiz Details:
              //                 - Topic: ${quizData.title}
              //                 - Questions: ${quizData.no_of_question}
              //                 - Duration: ${quizData.time_duration} Minutes

              //                 Make sure you're prepared, and don't forget to review your notes before starting! 📚 If you have any questions or need help, feel free to reach out! 📨

              //                 Good luck! 🍀 I'm rooting for you, and I can't wait to see your results! 🎉

              //                 Best regards,
              //                 ${instructor}
              //                 Instructor ✨

              //                 Wishing you success,
              // The GoTestLI Team

              // ---------------------
              // GoTestli
              // Test Your Limits, Expand Your Knowledge
              // https://gotestli.com
              //                   `,
              //                 body_html: `
              //                   <p>Hi <b>${studentData.first_name}</b>,</p>

              //                   <p>I hope you're doing great! 🌟 This is a friendly reminder to complete your quiz on <b>${quizData.title}</b>. ⏰ The quiz is an important step in reinforcing what you've learned, and I know you'll do amazing! 💪</p>

              //                   <h3>📝 <b>Quiz Details:</b></h3>
              //                   <ul>
              //                     <li><b>Topic:</b> ${quizData.title}</li>
              //                     <li><b>Questions:</b> ${quizData.no_of_question}</li>
              //                     <li><b>Duration:</b> ${quizData.time_duration}</li>
              //                   </ul>

              //                   <p>Make sure you're prepared, and don't forget to review your notes before starting! 📚 If you have any questions or need help, feel free to reach out! 📨</p>

              //                   <p>Good luck! 🍀 I'm rooting for you, and I can't wait to see your results! 🎉</p>

              //                   <p>Best regards,<br/>
              //                   ${instructor}<br/>
              //                   <b>Instructor</b> ✨</p>
              //                   <br/>
              //                    <p>Wishing you success,<br/>  
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
              //                   `,
              //               },
              content: renderedContent,

            },
            // {
            //   userResultId: studentData.id,
            //   studentData: data,
            //   quizData: set,
            //   instructor: response?.data?.first_name,
            // },
            {
              headers: {
                Authorization: `Bearer ${token}`, ...headers
              },
            }
          );
          // console.log(res);
          if (res.status == 200) {
            showToast("success", "Reminder Email sent!");
          } else {
            showToast("error", "Error in sending reminder!");
          }
        }
      }
    } catch (error) {
      if (error.status == 403) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // showToast("error","Invaild token!");
        navigate("/login");
        return;
      }
      console.error(error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };
  // console.log(studentsData)
  const filteredData = studentsData.filter((quiz) =>
    // Object.values(quiz).some((value) =>
    //   value ? value.toString().toLowerCase().includes(searchQuery) : false
    // )
    quiz?.created_by.toString().toLowerCase().includes(searchQuery)
      ? true
      : false
  );

  const getRowId = (row) => row.id;

  const renderRowCells = (student, index) => (
    <>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{student.user_id}</TableCell>
      <TableCell>
        {student.modified_date.slice(0, 19).replace("T", " ")}
      </TableCell>
      <TableCell>{student.marks_obtained}</TableCell>
      <TableCell>{student.percentage}</TableCell>
      <TableCell>
        {student.status === 2 ? "In Progress" : "Completed"}
      </TableCell>
      <TableCell>
        {student.status === 2 ? (
          <button
            className={`button -sm px-15 py-15 -outline-blue-3 text-blue-3 text-12 fw-bolder lh-sm mx-auto ${isDisabled.some((element) => element.id === student.id)
              ? "disabled"
              : ""
              }`}
            onClick={() => handleReminderClick(student)}
            disabled={isDisabled.some((element) => element.id === student.id)}
            style={{
              cursor: isDisabled.some((element) => element.id === student.id)
                ? "not-allowed"
                : "pointer",
              color: isDisabled.some((element) => element.id === student.id)
                ? "red"
                : "inherit",
              opacity: isDisabled.some((element) => element.id === student.id)
                ? 0.5
                : 1,
            }}
          >
            Send Reminder{" "}
            <span style={{ marginLeft: "5px" }}>
              <FontAwesomeIcon icon={faBell} />
            </span>
          </button>
        ) : (
          ""
        )}
      </TableCell>
    </>
  );
  return (
    <div>
      <Preloader />
      <Header userRole={userRole} />
      <div className="content-wrapper js-content-wrapper overflow-hidden w-100">
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ marginTop: "130px", display: "flex", justifyContent: "center" }}
        >
          <Link
            to="/instructor/home"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Typography
              variant="h7"
              style={{
                color: isHovered ? "blue" : "black",
                textDecoration: isHovered ? "underline" : "none",
              }}
            >
              Home
            </Typography>
          </Link>

          <Typography sx={{ color: "text.primary" }} variant="h6">
            View Students
          </Typography>
        </Breadcrumbs>
        {studentsData.length > 0 ? (
          <div className="table-responsive mt-1" style={{ paddingTop: "20px" }}>
            {/* <table className="custom-table student-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student ID</th>
                  <th>Date</th>

                  <th>Score</th>
                  <th>%</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {studentsData.map((student, i) => (
                  <tr key={student.id}>
                    <td>{i + 1}</td>
                    <td>{student.user_id}</td>
                    <td>
                      {student.modified_date.slice(0, 19).replace("T", " ")}
                    </td>

                    <td>{student.marks_obtained}</td>
                    <td>{student.percentage}</td>
                    <td>
                      {student.status === 2 ? "In Progress" : "Completed"}
                    </td>
                    <td>
                      {student.status === 2 ? (
                        <button
                          className={`button -sm px-20 py-20 -outline-blue-3 text-blue-3 text-16 fw-bolder lh-sm mx-auto ${
                            isDisabled.some(
                              (element) => element.id === student.id
                            )
                              ? "disabled"
                              : ""
                          }`}
                          onClick={() => handleReminderClick(student)}
                          disabled={isDisabled.some(
                            (element) => element.id == student.id
                          )}
                          style={{
                            cursor: isDisabled.some(
                              (element) => element.id === student.id
                            )
                              ? "not-allowed"
                              : "pointer",
                            color: isDisabled.some(
                              (element) => element.id === student.id
                            )
                              ? "red"
                              : "inherit",
                            opacity: isDisabled.some(
                              (element) => element.id === student.id
                            )
                              ? 0.5
                              : 1,
                          }}
                        >
                          Send Reminder{" "}
                          <span style={{ marginLeft: "5px" }}>
                            {" "}
                            <FontAwesomeIcon icon={faBell} />
                          </span>
                        </button>
                      ) : (
                        ""
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}
            {/* <CommonTable
              columns={columns}
              data={studentsData}
              getRowId={getRowId}
              renderRowCells={renderRowCells}
            /> */}
            <div
              className="header-search__field position-relative d-flex align-items-center rounded-5 mt-10"
              style={{ height: "40px", width: "300px" }}
            >
              <SearchIcon
                className="position-absolute ms-3 text-muted"
                style={{ fontSize: "20px" }}
              />
              <input
                required
                type="text"
                className="form-control ps-5 pe-5 text-18 lh-12 text-dark-1 fw-500 w-100"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery && (
                <CancelIcon
                  className="position-absolute end-0 me-3 text-muted"
                  fontSize="medium"
                  onClick={() => setSearchQuery('')}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
            {searchQuery && filteredData.length <= 0 ? (
              <h4 className="no-content text-center">
                It looks a bit empty here! 🌟 No fields matched!
              </h4>
            ) : (
              <CommonTable
                columns={columns}
                getRowId={getRowId}
                renderRowCells={renderRowCells}
                fetchData={getstudents}
                searchQuery={searchQuery}
              // tableData={filteredData.length > 0 ? filteredData : studentsData}
              />
            )}
            <h5 className=" text-center mt-4" style={{ color: "red" }}>
              Note.{" "}
              <span
                className="text-18 "
                style={{ color: "black", fontWeight: "600" }}
              >
                You can send reminder again after 24 hours.
              </span>
            </h5>
          </div>
        ) : (
          <h4 className="no-content text-center">
            It looks a bit empty here! 🌟 No students attended quiz yet!
          </h4>
        )}
      </div>
      <FooterOne />
    </div>
  );
};

export default ViewStudents;
