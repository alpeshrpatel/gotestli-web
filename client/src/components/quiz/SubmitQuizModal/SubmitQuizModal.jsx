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

  const user = auth.currentUser;

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const SubmitUserResult = async () => {
    try {
      const { data } = await API.post("/api/userresult/calculate/finalresult", {
        userResultId,
        questionSetId,
        totalQuestions,
        totalAnswered,
        skippedQuestion,
        totalReviewed,
      });

      console.log(data);
      const correct = data.data.correct;
      const wrong = data.data.wrong;
      const percentage = data.data.percentage;
      const passPercentage = data.data.passPercentage;
      console.log(correct);
      console.log(wrong);

      setIsSubmitted(true);
      await delay(3000);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);

      navigate("/quiz/result", {
        state: {
          totalQuestions: totalQuestions,
          correct: correct,
          wrong: wrong,
          skippedQuestion: skippedQuestion,
          percentage: percentage,
          passPercentage: passPercentage,
        },
      });
    } catch (error) {
      console.log(error);
      console.log("Error posting test result:", error);
    }
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
