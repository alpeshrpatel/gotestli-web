import React, { useEffect, useState } from "react";
import Preloader from "@/components/common/Preloader";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import { API } from "@/utils/AxiosInstance";
import { auth } from "@/firebase/Firebase";
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { Breadcrumbs, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { students } from "@/data--backup/students";

// import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const ViewStudents = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [isDisabled, setIsDisabled] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  const { set } = location.state;
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userRole = user.role;
  const userId = user.id;
  const token = localStorage.getItem("token");
  useEffect(() => {
    async function getstudents() {
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
          console.log(data);
          setStudentsData(data);
        }
      } catch (error) {
        if (error.status == 403) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          // toast.error("Invaild token!");
          navigate('/login')
          return;
        }
        console.error("Failed to fetch student data:", error);
      }
    }
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
              if(token){
                const response = await API.put("/api/sendemail/check/status", {
                  studentId: student.id,
                }, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                console.log(response);
              }
            } catch (error) {
              if (error.status == 403) {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                // toast.error("Invaild token!");
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
  console.log(isDisabled);

  const handleReminderClick = async (studentData) => {
    setIsDisabled((prev) => [...prev, { id: studentData.id }]);
    try {
      if(token){
      const { data } = await API.get(`api/users/${studentData.user_id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      const response = await API.get(`api/users/${userId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.email && response.data) {
        const res = await API.post(`/api/sendemail/`, {
          userResultId: studentData.id,
          studentData: data,
          quizData: set,
          instructor: response?.data?.first_name,
        },{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res);
        if (res.status == 200) {
          toast.success("Reminder Email sent!");
        } else {
          toast.error("Error in sending reminder!");
        }
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
      console.error(error);
    }
  };
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
            <table className="custom-table student-table">
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
            </table>
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
