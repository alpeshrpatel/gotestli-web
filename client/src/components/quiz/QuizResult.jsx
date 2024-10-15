import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCheck,
  faCircleDown,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { downloadCertificate } from "./downloadCertificate";
import { API } from "@/utils/AxiosInstance";

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
    questionSetId,
  } = location.state || {};

  if (!location.state) {
    console.log("No state available, redirecting...");
    navigate('/')
    return <div>No data available</div>;
  }

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  let userId = user.id;
  let quizTitle = '';
  let studentName = '';
  let category = '';
  useEffect(() => {
    async function getQuizTitle() {
      try {
        if (token) {
          const res = await API.get(`/api/questionset/${questionSetId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(res.data);
          let tags = res.data?.tags?.split(',');
          category = tags[0];
          quizTitle = res.data.title;
          const {data} = await API.get(`/api/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(data.first_name + " " + data.last_name);
          studentName = data.first_name + " " + data.last_name;
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
    getQuizTitle();
  }, []);
  const isPassed = percentage >= passPercentage;

  window.onload = function() {
    history.pushState(null, null, window.location.href);

    window.onpopstate = function(event) {
       
       navigate('/')
    };
};

  return (
    <>
      <div
        className="d-flex  gap-4 justify-content-center align-items-center vh-100"
        style={{ background: "rgb(26,6,79)", flexDirection: "column" }}
      >
        <div
          className=" bg-white p-2 fw-500 text-18 w-60 btn btn-light "
          onClick={() => navigate("/")}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="fa-lg ml-5" />
          {/* <FontAwesomeIcon icon={faAngleDoubleRight} className="fa-lg ml-5" /> */}{" "}
          Back to Home Page
        </div>
        {
          // isPassed && (
          <button
            className="button -sm px-24 py-25 -outline-green-4 text-green-4  text-18 fw-700 lh-sm "
            onClick={() => downloadCertificate(studentName,percentage,'Apprentice',quizTitle,category)}
          >
            {/* <i className="fa-solid fa-circle-down text-24 me-2" aria-hidden="true"></i> */}
            Download Certificate
            <FontAwesomeIcon icon={faCircleDown} className="text-30 ms-2" />
          </button>

          // )
        }

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
