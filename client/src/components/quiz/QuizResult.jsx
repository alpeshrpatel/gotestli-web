import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";

const QuizResult = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    totalQuestions = 0,
    correct = 0,
    wrong = 0,
    skippedQuestion = 0,
    percentage = 0,
    passPercentage = 0,
  } = location.state || {};

  if (!location.state) {
    console.log("No state available, redirecting...");
    return <div>No data available</div>;
  }

  const isPassed = percentage >= passPercentage;

  return (
    <>
      <div
        className="d-flex  gap-4 justify-content-center align-items-center vh-100"
        style={{ background: "rgb(26,6,79)" , flexDirection: 'column'}}
      >
        <div className=" bg-white p-2 fw-500 text-18 w-60 btn btn-light "  onClick={() => navigate("/")}>
          <FontAwesomeIcon icon={faArrowLeft} className="fa-lg ml-5" />
          {/* <FontAwesomeIcon icon={faAngleDoubleRight} className="fa-lg ml-5" /> */}
          {" "}Back to Home Page
        </div>
         
        {location.state ? (
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
                <span className="text-18">{totalQuestions}</span>
              </div>
              <div className="d-flex justify-content-between w-100 mb-2">
                <span className="text-18">Correct:</span>
                <span className="text-18">{correct}</span>
              </div>
              <div className="d-flex justify-content-between w-100 mb-2">
                <span className="text-18">Wrong:</span>
                <span className="text-18">{wrong}</span>
              </div>
              <div className="d-flex justify-content-between w-100 mb-2">
                <span className="text-18">Skipped:</span>
                <span className="text-18">{skippedQuestion}</span>
              </div>
            </div>
          </div>
        ) : (
          <h3>No data available</h3>
        )}
      </div>
    </>
  );
};

export default QuizResult;
