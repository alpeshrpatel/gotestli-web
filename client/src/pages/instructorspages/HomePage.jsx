import MetaComponent from "@/components/common/MetaComponent";
import Preloader from "@/components/common/Preloader";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import React, { useEffect, useState } from "react";
import "./homepage.css";
import { API } from "@/utils/AxiosInstance";
import { auth } from "@/firebase/Firebase";
import { Button, IconButton, Switch } from "@mui/material";
import { Delete, Edit, SaveAsRounded } from "@mui/icons-material";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const metadata = {
  title:
    " Instructor Home || GoTestli - Ultimate School & General Purpose Quiz Platform",
  description:
    "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges.",
};

const HomePage = () => {
  const [questionSets, setQuestionSets] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [editOn, setEditOn] = useState(false);
  const [changedQSet, setChangedQSet] = useState({
    title: "",
    short_desc: "",
    time_duration: 0,
    is_demo: "",
  });
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userRole = user.role;
  const userId = user.id;
  const token = localStorage.getItem("token");

  useEffect(() => {
    // const author = auth.currentUser.displayName;
    async function getQuestionSets() {
      try {
        if (token) {
          const { data } = await API.get(
            `/api/questionset/instructor/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(data);
          setQuestionSets(data);
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
    }
    getQuestionSets();
  }, []);

  // async function handleRowClick(id, index) {
  //   setExpandedRow(index === expandedRow ? null : index);
  //   if (index !== expandedRow) {
  //     try {
  //       const { data } = await API.get(`/api/userresult/students/list/${id}`);
  //       console.log(data);
  //       setStudentsData(data);
  //     } catch (error) {
  //       console.error("Failed to fetch student data:", error);
  //     }
  //   }
  // }

  async function handleQSetChange(name, value) {
    setChangedQSet((prev) => ({
      ...prev,
      [name]: value !== undefined ? value : "",
    }));
  }

  function handleEdit(set) {
    setEditOn(set.id);
    setChangedQSet({
      title: set.title || "",
      short_desc: set.short_desc || "",
      time_duration: set.time_duration || "",
      is_demo: set.is_demo || false,
    });
  }
  async function handleDelete(set) {
    try {
      if (token) {
        setEditOn(set.id);
        const res = await API.delete(`/api/questionset/${set.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        await API.delete(`/api/questionset/question/${set.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        await API.delete(`/api/questionset/category/${set.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setEditOn(null);
        if (res.status == 200) {
          setQuestionSets((prev) => prev.filter((qSet) => qSet.id !== set.id));
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
    }
  }

  async function handleSave(set) {
    try {
      if(token){
      const res = await API.put(`/api/questionset/${set.id}`, {
        changedQSet,
        userId,
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEditOn(null);
      if (res.status == 200) {
        setQuestionSets((prev) =>
          prev.map((qSet) =>
            qSet.id == set.id ? { ...qSet, ...changedQSet } : qSet
          )
        );
      }
    }
      // Refresh question sets or update the current state
    } catch (error) {
      if (error.status == 403) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // toast.error("Invaild token!");
        navigate("/login");
        return;
      }
      console.error("Failed to save changes:", error);
    }
  }

  console.log(changedQSet);
  const handleNavigate = (set) => {
    navigate(`/quiz/students`, { state: { set: set } });
  };
  const handleViewQuestionsClick = (set) => {
    console.log("hello");
    navigate(`/quiz/questions/${set.id}`);
  };
  return (
    <div>
      <Preloader />
      <MetaComponent meta={metadata} />
      <Header userRole={userRole} />

      <div className="content-wrapper js-content-wrapper overflow-hidden w-100">
        {questionSets.length > 0 ? (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Question Set Title</th>
                  <th>Description</th>
                  <th>Total Questions</th>
                  <th>Duration</th>
                  <th>Total Marks</th>
                  <th>Visible</th>
                  <th>Questions</th>
                  <th>Total Attempted</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {questionSets.map((set, index) => (
                  <React.Fragment key={set.id}>
                    <tr
                    // onClick={
                    //   !(editOn == set.id)
                    //     ? () => handleRowClick(set.id, index)
                    //     : null
                    // }
                    // className={expandedRow === index ? "expanded" : ""}
                    >
                      <td>{index + 1}</td>
                      <td>
                        {editOn === set.id ? (
                          <input
                            type="text"
                            value={changedQSet.title || set.title}
                            onChange={(e) =>
                              handleQSetChange("title", e.target.value)
                            }
                          />
                        ) : (
                          set.title
                        )}
                      </td>
                      <td>
                        {editOn === set.id ? (
                          <input
                            type="text"
                            value={changedQSet.short_desc || set.short_desc}
                            onChange={(e) =>
                              handleQSetChange("short_desc", e.target.value)
                            }
                          />
                        ) : (
                          set.short_desc
                        )}
                      </td>
                      <td>{set.no_of_question}</td>
                      <td>
                        {editOn === set.id ? (
                          <input
                            type="text"
                            value={
                              changedQSet.time_duration || set.time_duration
                            }
                            onChange={(e) =>
                              handleQSetChange("time_duration", e.target.value)
                            }
                          />
                        ) : (
                          set.time_duration
                        )}
                      </td>
                      <td>{set.totalmarks}</td>
                      <td>
                        {editOn === set.id ? (
                          <>
                            {changedQSet.is_demo ? "Public" : "Private"}
                            <Switch
                              checked={changedQSet.is_demo}
                              onChange={(e) =>
                                handleQSetChange("is_demo", e.target.checked)
                              }
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          </>
                        ) : set.is_demo ? (
                          "Public"
                        ) : (
                          "Private"
                        )}
                      </td>
                      <td
                        onClick={() => handleViewQuestionsClick(set)}
                        style={{
                          textDecoration: "underline",
                          color: "blue",
                          textAlign: "center",
                        }}
                      >
                        View
                      </td>
                      <td
                        onClick={() => handleNavigate(set)}
                        style={{
                          textDecoration: "underline",
                          color: "blue",
                          textAlign: "center",
                        }}
                      >
                        View
                      </td>
                      <td>
                        <div
                          className=" d-flex ms-1 "
                          style={{ alignItems: "center" }}
                        >
                          {editOn == set.id ? (
                            <Button
                              onClick={() => handleSave(set)}
                              variant="contained"
                              color="primary"
                              size="small"
                            >
                              Save
                            </Button>
                          ) : (
                            <>
                              <IconButton onClick={() => handleEdit(set)}>
                                <Edit sx={{ color: "#3f51b5" }} />
                              </IconButton>
                              <IconButton onClick={() => handleDelete(set)}>
                                <Delete sx={{ color: "#f50057" }} />
                              </IconButton>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                    {/* {expandedRow === index && (
                      <tr>
                        <td colSpan="7">
                          <table className="custom-table student-table">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Student ID</th>
                                <th>Correct</th>
                                <th>Wrong</th>
                                <th>Score</th>
                                <th>%</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {studentsData &&
                                studentsData.map((student, i) => (
                                  <tr key={student.id}>
                                    <td>{i + 1}</td>
                                    <td>{student.user_id}</td>
                                    <td>
                                      {Math.floor(
                                        student.marks_obtained /
                                          (set.totalmarks / set.no_of_question)
                                      )}
                                    </td>
                                    <td>
                                      {set.no_of_question -
                                        Math.floor(
                                          student.marks_obtained /
                                            (set.totalmarks /
                                              set.no_of_question)
                                        )}
                                    </td>
                                    <td>{student.marks_obtained}</td>
                                    <td>{student.percentage}</td>
                                    <td>
                                      {student.status == 2
                                        ? `In Progress`
                                        : `Completed`}
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )} */}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h4 className="no-content text-center">
            It looks a bit empty here! 🌟 Unleash your creativity by crafting
            your very own Question Set. Let's make learning exciting—your
            students are waiting!
          </h4>
        )}

        <FooterOne />
      </div>
    </div>
  );
};

export default HomePage;
