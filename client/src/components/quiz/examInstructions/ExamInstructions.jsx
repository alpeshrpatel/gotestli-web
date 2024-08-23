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

const ExamInstructions = ({ id, time, questionSet }) => {
  const [startTestResultData, setStartTestResultData] = useState([]);
  const [inProgressQuizId, setInProgressQuizId] = useState();
  const [history, setHistory] = useState([]);
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();
  const userId = 99;
  const questionSetId = id;
  const totalQuestions = questionSet.length;
  const totalAnswered = 0;
  const notAnswered = questionSet.length;
  const notVisited = questionSet.length;
  const skippedQuestion = 0;
  const totalReviewed = 0;
  let userResultId;

  useEffect(() => {
    async function getPendingQuiz() {
      const { data } = await API.get( 
        `/api/userresult/user/${userId}/questionset/${questionSetId}`
      );
      setInProgressQuizId(data[0]?.id);
    }
    getPendingQuiz();
    async function getHistory() {
      const { data } = await API.get(
        `/api/userresult/history/user/${userId}/questionset/${questionSetId}`
      );
      console.log(data);
      setHistory(data);
    }
    getHistory();

    async function checkUserRole() {
      if (auth.currentUser) {
        const userId = auth.currentUser.uid;
        const docRef = doc(db, "roles", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserRole(docSnap.data().role);
          console.log(docSnap.data().role);
        } else {
          console.log("No role found for this user");
        }
      } else {
        console.log("No user is logged in");
      }
    }
    checkUserRole();
  }, []);

  async function testResultDtlSetData(jsonData) {
    try {
      const res = await API.post("/api/userresultdetails/add/questions", { jsonData });
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
    if(!userRole){
    return  navigate('/login')
    }
    try {
      const res = await API.post("/api/userresult", {
        userId,
        questionSetId,
        totalQuestions,
        totalAnswered,
        notAnswered,
        totalReviewed,
        notVisited,
        skippedQuestion,
      });
      console.log("Start Quiz Response:", res.data.user_test_result_id);
      userResultId = res.data.user_test_result_id;

      const newData = await Promise.all(
        questionSet.map(async (question) => {
          
          return {
            userResultId,
            questionId: question.question_id,
            status: 0,
          };
        })
      );

      setStartTestResultData(newData);
      await testResultDtlSetData(newData);
    } catch (error) {
      console.error("Error in handleStartQuiz:", error);
    }
  };

  const handleResumeQuiz = () => {
    if(userRole !== 'student'){
      navigate('/login')
    }
    navigate("/quiz/questions", {
      state: {
        userResultId: inProgressQuizId,
        questionSetId: id,
        questionSet: questionSet,
        time: time,
      },
    });
  };
  console.log(questionSet);
  return (
    <div className="exam-instructions-container">
      <h2>Exam Instructions</h2>
      <ul>
        <li>
          This exam comprises of {questionSet.length} questions and you have{" "}
          {time} minutes to complete the exam, including the review.
        </li>
        <li>
          You need to score at least {questionSet[0]?.pass_percentage}% to pass
          the exam.
        </li>
        <li>
          The exam comprises of the following types of questions:
          <ol>
            <li>Multiple Choice Single Response (MCSR)</li>
          </ol>
        </li>
        <li>There is no negative marking.</li>
        <li>
          There is a timer at the upper-right corner of the exam screen that
          indicates the time remaining for the completion of the exam.
        </li>

        {/* <li>
          You can go to any question in random by clicking on the question
          number displayed on the left hand side.
        </li> */}
        <li>
          Mark for Review - You can Review particular question during submission
          of quiz.
        </li>
        <li>
          At any point of time during the exam, you can go back to any question
          and modify your choice(s) by clicking on the Previous and the Next
          buttons.
        </li>
        <li>You can stop the Quiz by clicking on the 'Finish' button.</li>
        <li>
          Click the 'Start Quiz' Now to start the exam or 'Resume Quiz' to
          resume the in-progress quiz.
        </li>
      </ul>
      {userRole == "student" && (
        <div className="previous-attempts">
          {history.length > 0 ? (
            <>
              <h3>Your Last {history.length} Attempts</h3>
              <table>
                <thead>
                  <tr>
                    <th>Attempt(s)</th>
                    <th>Completed on</th>
                    <th>Status</th>
                    <th>Marks Obtained</th>
                    <th>Percentage(%)</th>

                    <th>Mode</th>
                    <th>Result</th>
                    <th>Report</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((attempt, id) => (
                    <>
                      <tr key={id}>
                        <td>{id + 1}</td>
                        {attempt.modified_date ? (
                          <td>
                            {attempt.modified_date
                              .slice(0, 19)
                              .replace("T", " ")}
                          </td>
                        ) : (
                          <td> --- </td>
                        )}
                        <td>
                          {attempt.status == 1 || attempt.status == 0
                            ? "Completed"
                            : "In Progress"}
                        </td>
                        <td>{attempt.marks_obtained}</td>
                        <td>{attempt.percentage} %</td>

                        <td>Exam</td>
                        <td>
                          {attempt.percentage >= questionSet[0]?.pass_percentage
                            ? "Pass"
                            : "Fail"}
                        </td>
                        <td>
                          <a href="#report">Report</a>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <h3>No Previous Attempt of this Question Set</h3>
          )}
        </div>
      )}
      {!inProgressQuizId ? (
        <button className="start-quiz-button" onClick={handleStartQuiz}>
          Start Quiz
        </button>
      ) : (
        <button
          className=" button -sm px-24 py-20 -blue-3 text-white text-blue-3 text-14 mx-auto mt-4 "
          onClick={handleResumeQuiz}
        >
          Resume Quiz
        </button>
      )}
    </div>
  );
};

export default ExamInstructions;
