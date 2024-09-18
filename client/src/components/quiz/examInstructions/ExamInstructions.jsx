import React, { useEffect, useState } from "react";
import "./ExamInstructions.css";
import { useNavigate } from "react-router-dom";
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
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  faClipboard,
  faClock,
  faCheckCircle,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ExamInstructions = ({ id, time, questionSet, data, onCloseModal }) => {
  const [startTestResultData, setStartTestResultData] = useState([]);
  const [inProgressQuizId, setInProgressQuizId] = useState();
  const [setQuestionsSet] = useState([]);
  const [history, setHistory] = useState([]);
  const [followersData, setFollowersData] = useState([]);
  // const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || "";

  const userRole = user.role;
  const userId = user.id;
  const questionSetId = id;
  const totalQuestions = questionSet.length;
  const totalAnswered = 0;
  const notAnswered = questionSet.length;
  const notVisited = questionSet.length;
  const skippedQuestion = 0;
  const totalReviewed = 0;
  let userResultId;

  useEffect(() => {
    // async function getPendingQuiz() {
    //   console.log(questionSetId)
    //   const { data } = await API.get(`/api/userresult/history/user/${userId}/questionset/${questionSetId}`);
    //   console.log(data)
    //   setInProgressQuizId(data[0]?.id);
    // }
    // getPendingQuiz();
    async function getHistory() {
      try {
        const { data } = await API.get(
          `/api/userresult/history/user/${userId}/questionset/${questionSetId}`
        );
        console.log(data);
        if (
          data.message != "Some error occurred while retrieving userresults."
        ) {
          if (data.length > 4) {
            const historyData = data.slice(0, 4);
            setHistory(historyData);
          } else {
            setHistory(data);
          }
          console.log(data);
          data.forEach((element) => {
            if (element.status == 2) {
              setInProgressQuizId(data[0]?.id);
            }
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
    getHistory();

    async function getFollowersData() {
     
        const { data } = await API.get(
          `/api/followers/list/${userId}`
        );
        console.log(data);
        if(data.length > 0 ){
          setFollowersData(data);
        }
      
    }
    getFollowersData();
  }, []);

  async function testResultDtlSetData(userId, questionSetId, userResultId) {
    try {
      const res = await API.post("/api/userresultdetails/add/user/questions", {
        userId,
        questionSetId,
        userResultId,
      });
      if (res.status == 200) {
        navigate("/quiz/questions", {
          state: { questionSetId: id, questionSet: questionSet, time: time },
        });
      }
      console.log("Result Detail Submit Response:", res);
    } catch (error) {
      console.error("Error in testResultDtlSetData:", error);
    }
  }

  const handleStartQuiz = async () => {
    if (userRole !== "student") {
      navigate("/login");
      return;
    }
    try {
      const res = await API.post("/api/userresult", {
        user_id: userId,
        question_set_id: questionSetId,
        total_question: totalQuestions,
        total_answered: totalAnswered,
        total_not_answered: notAnswered,
        total_reviewed: totalReviewed,
        total_not_visited: notVisited,
        percentage: 0,
        marks_obtained: 0,
        status: 2,
        created_by: userId,
        modified_by: userId,
      });
      console.log("Start Quiz Response:", res);
      userResultId = res.data.userResultId;

      await testResultDtlSetData(userId, questionSetId, userResultId);
    } catch (error) {
      console.error("Error in handleStartQuiz:", error);
    }
  };

  const handleResumeQuiz = () => {
    if (userRole !== "student") {
      navigate("/login");
      return;
    }
    // async function getQuestionsSet() {

    //   try {
    //     const response = await API.get(`/api/questionset/questions/${data.id}`);

    //    setQuestionsSet(response.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    //  getQuestionsSet();
    navigate("/quiz/questions", {
      state: {
        userResultId: inProgressQuizId,
        questionSetId: id,
        questionSet: questionSet,
        time: time,
      },
    });
  };

  const handleFollowClick = async (instructor_id) => {
    const followed = followersData?.some(
      (entry) => entry.follower_id == userId && entry.instructor_id == instructor_id
    );
    if (followed) {
      const res = await API.delete(`/api/followers/list/instructor/${instructor_id}/follower/${userId}`);
      setFollowersData((prev) =>
        prev.filter(
          (entry) =>
            entry.follower_id !== userId &&
            entry.instructor_id !== instructor_id
        )
      );
      // setFollow(true)
    } else {
      const res = await API.post("/api/followers/list", {
        instructor_id,
        follower_id: userId,
      });
      setFollowersData((prev) => [
        ...prev,
        { instructor_id: instructor_id, follower_id: userId },
      ]);
    }
  };
  console.log(followersData);

  return (
    <div className="exam-instructions-container">
      {/* <h2>Exam Instructions</h2> */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Box
              sx={{ backgroundColor: "#1c1c1c", padding: 2, borderRadius: 2 }}
            >
              <Grid container alignItems="center">
                {/* Left - Image */}
                <Grid item xs={12} sm={2}>
                  <Box
                    component="img"
                    src={data.image}
                    alt="Course image"
                    sx={{ width: "100%", borderRadius: 2 }}
                  />
                </Grid>

                {/* Middle - Course Title */}
                <Grid item xs={12} sm={8} sx={{ paddingLeft: 2 }}>
                  <div className="d-flex gap-4 items-center mb-2">
                    <Typography
                      variant="h5"
                      sx={{ color: "#ffffff", fontWeight: "bold" }}
                    >
                      {data.title}
                    </Typography>
                    {userRole == "student" && (
                      <>
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "#ffffff" }}
                        >
                          By {data.author}
                        </Typography>
                        <button
                          className="button -sm px-8 py-10 -purple-4 text-white text-purple-4 text-10 "
                          style={{ height: "30px" }}
                          onClick={() => handleFollowClick(data.created_by)}
                        >
                          {followersData?.some(
                            (entry) =>
                              entry.follower_id == userId &&
                              entry.instructor_id == data.created_by
                          )
                            ? "Following"
                            : `Follow ${data.author}`}
                        </button>
                      </>
                    )}
                  </div>
                  <Typography variant="body2" sx={{ color: "#8a8a8a" }}>
                    {data.short_desc}
                  </Typography>
                </Grid>

                {/* Right - Back Button */}
                {/* <Grid item xs={12} sm={2} sx={{ textAlign: "right" }}>
                  <IconButton sx={{ color: "#ffffff" }} onClick={onCloseModal}>
                    <ArrowBackIcon />
                    <Typography sx={{ color: "#ffffff", marginLeft: 1 }}>
                      Back
                    </Typography>
                  </IconButton>
                </Grid> */}
              </Grid>
            </Box>
            <Grid container spacing={3} sx={{ marginTop: "2vw" }}>
              {/* Left Side: Exam Details */}
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom>
                  Exam Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          backgroundColor: "#FDE8E4",
                          borderRadius: "50%",
                          padding: " 8px 10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faClipboard}
                          style={{ color: "#D97E6D", fontSize: "2rem" }}
                        />
                      </div>
                      <div style={{ marginLeft: "10px" }}>
                        <Typography variant="h6">
                          {data.no_of_question}
                        </Typography>
                        <Typography variant="body2">Question</Typography>
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={6}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          backgroundColor: "#E3F6FC",
                          borderRadius: "50%",
                          padding: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faClock}
                          style={{ color: "#4ABDF1", fontSize: "2rem" }}
                        />
                      </div>
                      <div style={{ marginLeft: "10px" }}>
                        <Typography variant="h6">
                          {data.time_duration}m
                        </Typography>
                        <Typography variant="body2">Time</Typography>
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={6}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          backgroundColor: "#F7E2EC",
                          borderRadius: "50%",
                          padding: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          style={{ color: "#D06B9A", fontSize: "2rem" }}
                        />
                      </div>
                      <div style={{ marginLeft: "10px" }}>
                        <Typography variant="h6">{data.totalmarks}</Typography>
                        <Typography variant="body2">Max. Marks</Typography>
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={6}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          backgroundColor: "#E3F8ED",
                          borderRadius: "50%",
                          padding: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faThumbsUp}
                          style={{ color: "#32A466", fontSize: "2rem" }}
                        />
                      </div>
                      <div style={{ marginLeft: "10px" }}>
                        <Typography variant="h6">
                          {data.pass_percentage}%
                        </Typography>
                        <Typography variant="body2">Passing</Typography>
                      </div>
                    </div>
                  </Grid>
                  {userRole == "student" && (
                    <Grid item xs={12}>
                      {!inProgressQuizId ? (
                        <button
                          className="button -sm px-24 py-20 -green-5 text-white text-green-5 text-16 mx-auto mt-4"
                          onClick={handleStartQuiz}
                        >
                          Start Quiz
                        </button>
                      ) : (
                        <button
                          className=" button -sm px-24 py-20 -blue-3 text-white text-blue-3 text-16 mx-auto mt-4 "
                          onClick={handleResumeQuiz}
                        >
                          Resume Quiz
                        </button>
                      )}
                    </Grid>
                  )}
                </Grid>
              </Grid>

              {/* Right Side: Exam Instructions */}
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom>
                  Exam Instructions
                </Typography>
                <Typography variant="body2">
                  1. The exam comprises of the following types of questions:
                  <ul>
                    <li>Multiple Choice Single Response (MCSR)</li>
                    <li>Multiple Choice Multiple Response (MCMR)</li>
                  </ul>
                  2. There is no negative marking.
                  <br />
                  3. The exam screen shows the remaining time at the top-right
                  corner.
                  <br />
                  4. You can pause/resume the exam using the buttons provided.
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

      {userRole == "student" && (
        <div className="previous-attempts">
          {history.length > 0 ? (
            <Grid item xs={12} sx={{ marginTop: "20px" }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Your Previous {history.length} Attempts
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>#Attempt(s)</TableCell>
                          <TableCell>Start Date</TableCell>
                          <TableCell>Complete Date</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Marks</TableCell>
                          <TableCell>Percentage</TableCell>

                          <TableCell>Mode</TableCell>
                          <TableCell>Result</TableCell>
                          <TableCell>Report</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {history &&
                          history.map((attempt, id) => (
                            <>
                              <TableRow key={id}>
                                <TableCell>{id + 1}</TableCell>
                                {attempt.created_date ? (
                                  <TableCell>
                                    {attempt.created_date
                                      .slice(0, 19)
                                      .replace("T", " ")}
                                  </TableCell>
                                ) : (
                                  <TableCell> --- </TableCell>
                                )}
                                {attempt.modified_date &&
                                attempt.status == 1 ? (
                                  <TableCell>
                                    {attempt.modified_date
                                      .slice(0, 19)
                                      .replace("T", " ")}
                                  </TableCell>
                                ) : (
                                  <TableCell> --- </TableCell>
                                )}
                                <TableCell>
                                  {attempt.status == 1 || attempt.status == 0
                                    ? "Completed"
                                    : "In Progress"}
                                </TableCell>
                                <TableCell>{attempt.marks_obtained}</TableCell>
                                <TableCell>{attempt.percentage}</TableCell>
                                <TableCell>Exam</TableCell>
                                <TableCell>
                                  {attempt.percentage >=
                                  questionSet[0]?.pass_percentage
                                    ? "Pass"
                                    : "Fail"}
                                </TableCell>
                                <TableCell>
                                  {/* {row.report === 'Report' ? ( */}
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                  >
                                    Report
                                  </Button>
                                  {/* ) : row.report} */}
                                </TableCell>
                              </TableRow>
                            </>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
          ) : (
            <Typography variant="h6" gutterBottom>
              No Previous Attempt of this Question Set
            </Typography>
          )}
        </div>
      )}
    </div>
  );
};

export default ExamInstructions;
