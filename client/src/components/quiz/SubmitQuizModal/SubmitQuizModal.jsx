import React, { useEffect, useState } from "react";
import "./SubmitQuizModal.css";
import { auth } from "@/firebase/Firebase";
import { API } from "@/utils/AxiosInstance";
import { v4 as uuidv4 } from "uuid";
import {
  faCircleCheck,
  faPlaneCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const SubmitQuizModal = ({
  questionSetId,
  totalQuestions,
  selectedOption,
  setSelectedOption,
  totalAnswered,
  totalReviewed,
  skippedQuestion,
  reviewQuestions,
  userResultId,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [passingCriteria, setPassingCriteria] = useState([]);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getPassCriteria() {
      try {
        const [dataResponse, answersResponse] = await Promise.all([
          API.get(`/api/get/questionset/passcriteria/${questionSetId}`),
          API.get(`/api/get/testresult/answers/${userResultId}`),
        ]);

        const data = dataResponse.data;
        const response = answersResponse.data;
        setPassingCriteria(data);
        setAnswers(response);
        console.log(data);
        console.log(response);
      } catch (error) {
        throw error;
      }
    }
    getPassCriteria();
  }, []);

  const user = auth.currentUser;

  let passingStatus;
  let percentage;
  let marks;
  let count = 0;
  if (passingCriteria.length > 0) {
    const totalmarks = passingCriteria[0]?.totalmarks;
    const marksPerQuestion = totalmarks / totalQuestions;

    answers.forEach((answer) => {
      if (answer.answer == answer.correct_answer) {
        count++;
      }
    });
    marks = Math.round(marksPerQuestion * count);

    percentage = Math.round((100 * marks) / passingCriteria[0].totalmarks);

    if (percentage < passingCriteria[0].pass_percentage) {
      passingStatus = "Fail";
    } else {
      passingStatus = "Pass";
    }
  }

  
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const SubmitUserResult = async () => {
    try {
      
      console.log("About to post test result");
      const response = await API.put("/api/put/testresult", {
        userResultId,
        questionSetId,
        totalQuestions,
        totalAnswered,
        skippedQuestion,
        totalReviewed,
        marks,
        percentage,
      });
      console.log("Post response:", response);

      setIsSubmitted(true);
      await delay(3000);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      console.log("Error posting test result:", error);
    }

    navigate("/quiz/result", {
      state: {
        totalQuestions: totalQuestions,
        correct: count,
        wrong: totalAnswered - count,
        skippedQuestion: skippedQuestion,
        percentage: percentage,
        passPercentage: passingCriteria[0].pass_percentage,
      },
    });
  };

  return (
    <div className="modal-container">
      <h3 className="header">Do you want to finish the quiz?</h3>
      <h5 className="note">
        Note:
        <span className="note-span">
          {" "}
          After submitting the quiz, you will not be able to re-attempt it.
        </span>
      </h5>
      <div>
        <button className="submit-button" onClick={SubmitUserResult}>
          Submit
        </button>
        <div className="checkmark-container">
          {isSubmitted && (
            <div className="modal-overlay">
              <div className="checkmark-wrapper">
                <FontAwesomeIcon
                  className="checkmark-icon"
                  icon={faCircleCheck}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmitQuizModal;
