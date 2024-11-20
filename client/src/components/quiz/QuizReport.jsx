import React, { useEffect, useState } from "react";
import Flashcard from "../common/FlashCard";
import { API } from "@/utils/AxiosInstance";

const QuizReport = ({ attemptId }) => {
  const [userResults, setUserResults] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getQuestions() {
      try {
        if (token) {
          const { data } = await API.get(
            `/api/userresultdetails/userresult/${attemptId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
           // console.log(data);
          setUserResults(data);
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
    getQuestions();
  }, []);

   // console.log(userResults);


  return (
    <div className="container-fluid shadow mt-4">
      {userResults.length > 0 &&
        userResults.map((result, id) => (
          <Flashcard
            questionId={result.question_set_question_id}
            userAnswer={result.answer}
            correctAnswer={result.correct_answer}
          />
        ))}
    </div>
  );
};

export default QuizReport;
