import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const QuizResult = ({
  totalQuestions,
  correctAnswers,
  wrongAnswers,
  skippedAnswers,
  // passPercentage
}) => {
  // (correctAnswers * 100)/totalQuestions
  const percentage = 84;
  const passPercentage = 80;
  const isPassed = percentage >= passPercentage;

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "rgb(26,6,79)" }}
    >
      <div
        className="card shadow w-60 text-center p-4 "
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <div className="mb-4 w-50  mx-auto">
          <CircularProgressbar
            value={percentage}
            text={`${Math.round(percentage)}%`}
            styles={buildStyles({
              strokeLinecap: "round",
              textSize: "13px",
              pathTransitionDuration: 1,
              pathColor: percentage >= passPercentage ? "green" : "red",
              textColor: "black",
              trailColor: "#eee",
              backgroundColor: "#f8f9fa",
            })}
          />
        </div>
        <div
          className={`mb-4 p-2 ${
            isPassed ? "bg-success" : "bg-danger"
          } text-white`}
        >
          {isPassed ? (
            <span className="text-18 ">
              Passed <FontAwesomeIcon icon={faCheck} className="fa-lg" />
            </span>
          ) : (
            <span className="text-18 ">
              Failed <FontAwesomeIcon icon={faTimes} className="fa-lg" />
            </span>
          )}
        </div>
        <div className="d-flex flex-column align-items-center w-100">
          <div className="d-flex justify-content-between w-100 mb-2">
            <span className="text-18">Questions:</span>
            <span className="text-18">10</span>
          </div>
          <div className="d-flex justify-content-between w-100 mb-2">
            <span className="text-18">Correct:</span>
            <span className="text-18">3</span>
          </div>
          <div className="d-flex justify-content-between w-100 mb-2">
            <span className="text-18">Wrong:</span>
            <span className="text-18">4</span>
          </div>
          <div className="d-flex justify-content-between w-100 mb-2">
            <span className="text-18">Skipped:</span>
            <span className="text-18">3</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
