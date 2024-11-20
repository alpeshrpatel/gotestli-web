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
  const userdata = JSON.parse( localStorage.getItem('user')) || '';
  const userRole = userdata.role;
  const userId = userdata.id;
  const user = auth.currentUser;
  const token = localStorage.getItem("token");

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const SubmitUserResult = async () => {
    try {
      if(token){
      const { data } = await API.put("/api/userresult/calculate/finalresult", {userResultId, questionSetId, totalQuestions, totalAnswered, skippedQuestion, totalReviewed, userId}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

       // console.log(data);
      const correct = data.correct;
      const wrong = data.wrong;
      const percentage = data.percentage;
      const passPercentage = data.passPercentage;
       // console.log(correct);
       // console.log(wrong);

      setIsSubmitted(true);
      await delay(1000);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 1000);

      navigate("/quiz/result", {
        state: {
          totalQuestions: totalQuestions,
          correct: correct,
          wrong: wrong,
          skippedQuestion: skippedQuestion,
          percentage: percentage,
          passPercentage: passPercentage,
          questionSetId:questionSetId,
          userResultId:userResultId

        },
      });
    }
    } catch (error) {
      if (error.status == 403) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // toast.error("Invaild token!");
        navigate("/login");
        return;
      }
       // console.log(error);
       // console.log("Error posting test result:", error);
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