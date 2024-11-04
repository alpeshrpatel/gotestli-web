import React, { useEffect, useRef, useState } from "react";
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
import Confetti from "react-confetti";
import { delay, motion } from "framer-motion";
import "./quiz.css";
import { toast } from "react-toastify";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Rating } from "react-simple-star-rating";

export const satisfactionTooltips = [
  "Very Unsatisfied",
  "Unsatisfied",
  "Neutral",
  "Satisfied",
  "Very Satisfied",
];
export const difficultyTooltips = ["Very Easy", "Easy", "Medium", "Hard", "Very Hard"];
export const contentQualityTooltips = [
  "Poor",
  "Fair",
  "Good",
  "Very Good",
  "Excellent",
];

const QuizResult = ({}) => {
  const [isCelebOn, setIsCelebOn] = useState(false);
  const hasFetchedBadgeData = useRef(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [open, setOpen] = useState(false);
  const [givenReview,setGivenReview] = useState();
  const [rating, setRating] = useState({
    satisfaction: 0,
    difficulty: 0,
    contentQuality: 0,
  });
  
  const [review, setReview] = useState('');
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [downloadData, setDownloadData] = useState({
    quizTitle: "",
    studentName: "",
    category: "",
    instructor:""
  });
  
  const maxCharacters = 500;
  const handleRating = (name, newRating) => {
    setRating((prev) => ({ ...prev, [name]: newRating }));
  };
  const handleReviewChange = (e) => {
    if (e.target.value.length <= maxCharacters) {
      setReview(e.target.value);
    }
  };
  const navigate = useNavigate();
  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => setOpen(false);
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
    navigate("/");
    return <div>No data available</div>;
  }

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  let userId = user.id;

  useEffect(() => {
    if (percentage >= passPercentage) {
      setIsCelebOn(true);
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

      const timer = setTimeout(() => {
        setIsCelebOn(false);
      }, 3000);

      async function getQuizTitle() {
        try {
          if (token) {
            const res = await API.get(`/api/questionset/${questionSetId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log(res.data);
            let tags = res.data?.tags?.split(",");
            setDownloadData((prev) => ({
              ...prev,
              category: tags[0],
              quizTitle: res.data.title,
              instructor: res.data.author
            }));

            const { data } = await API.get(`/api/users/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log(data.first_name + " " + data.last_name);
            setDownloadData((prev) => ({ ...prev, studentName: data.first_name + " " + data.last_name }));
            setIsDataLoaded(true);
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

      async function getReviewIfGiven(){
        try {
          if(token){
            const {data} = await API.get(`/api/reviews/qset/${questionSetId}/user/${userId}`,{
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            if(data){
              console.log(data)
              setGivenReview(data);
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
          throw error;
        }
      }
      getReviewIfGiven()
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (givenReview) {
      setRating({
        satisfaction: givenReview.satisfaction || 0,
        difficulty: givenReview.difficulty || 0,
        contentQuality: parseInt(givenReview.content_quality) || 0,
      });
      setReview(givenReview.review || '');
    }
  }, [givenReview]);

  useEffect(() => {
    if (hasFetchedBadgeData.current) return;
    async function createBadgeData() {
      try {
        if (token) {
          if (percentage >= 80) {
            const { data } = await API.put(
              `/api/badge/qsetid/${questionSetId}/userid/${userId}`,
              {},
              { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success("Achievement saved!");
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
        throw error;
      }
    }
    createBadgeData();
    hasFetchedBadgeData.current = true;
  }, []);

  const isPassed = percentage >= passPercentage;

  window.onload = function () {
    history.pushState(null, null, window.location.href);

    window.onpopstate = function (event) {
      navigate("/");
    };
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: [1, 1.2, 1], 
      transition: { duration: 1.5, ease: "easeInOut" },
    },
    exit: { opacity: 0, scale: 0.5, transition: { duration: 1 } },
  };

  const submitSurvey = async () => {
    try {
      if (token) {
        if(!givenReview){
          const res = await API.post(
            "/api/reviews",
            {
              questionset_id: questionSetId,
              satisfaction: rating.satisfaction,
              difficulty: rating.difficulty,
              content_quality: rating.contentQuality,
              review: review,
              created_by: userId,
              modified_by: userId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (res.status == 200) {
            toast.success("Thank you for giving review!");
            navigate("/");
          }
        }else{
          const res = await API.put(
            `/api/reviews/update/qset/${questionSetId}/user/${userId}`,
            {
             
              satisfaction: rating.satisfaction,
              difficulty: rating.difficulty,
              content_quality: rating.contentQuality,
              review: review,
              
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (res.status == 200) {
            toast.success("Review updated!");
            navigate("/");
          }
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
      throw error;
    }
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
        {isPassed && isDataLoaded && (
          <button
            className="button -sm px-24 py-25 -outline-green-4 text-green-4  text-18 fw-700 lh-sm "
            onClick={() =>
              downloadCertificate(downloadData.studentName, percentage, downloadData.quizTitle, downloadData.category,downloadData.instructor)
            }
          >
            {/* <i className="fa-solid fa-circle-down text-24 me-2" aria-hidden="true"></i> */}
            Download Certificate
            <FontAwesomeIcon icon={faCircleDown} className="text-30 ms-2" />
          </button>
        )}

        {location.state ? (
          <div
            className="card shadow w-60 text-center p-4 "
            style={{ maxWidth: "500px", width: "100%" }}
          >
            <div className="mb-4 w-50 mx-auto">
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

        {/* Confetti animation */}
        {isCelebOn && (
          <div className="modal-overlay">
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              recycle={true}
            />
          </div>
        )}
        <div
          className="card shadow w-60 text-center p-4 "
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h5 className="text-center my-2">
            Take a moment to answer the review questions
          </h5>
          <button
            className="button -sm px-24 py-25 -outline-blue-3 text-blue-3 text-16 fw-bolder lh-sm "
            onClick={onOpenModal}
          >
            {/* <i className="fa fa-facebook text-24 me-2" aria-hidden="true"></i> */}
            {
              givenReview ? 'Edit Review' : 'Start Review'
            }
            
          </button>
          <Modal open={open} onClose={onCloseModal} center>
            <div className="col-12 rounded p-5 border-1">
              <h5 className="mb-2">
                How satisfied are you with the quiz you just completed?
              </h5>
              <Rating
                onClick={(newRating) => handleRating("satisfaction", newRating)}
                initialValue={rating.satisfaction}
                ratingValue={rating.satisfaction}
                size={50}
                tooltipArray={satisfactionTooltips}
                showTooltip
                activeColor="#ffd700"
                emptyColor="#d3d3d3"
              />
              <h5 className="mb-2">How difficult did you find the quiz?</h5>
              <Rating
                onClick={(newRating) => handleRating("difficulty", newRating)}
                initialValue={rating.difficulty}
                ratingValue={rating.difficulty}
                size={50}
                tooltipArray={ difficultyTooltips}
                showTooltip
                activeColor="#ffd700"
                emptyColor="#d3d3d3"
              />
              <h5 className="mb-2">
                How would you rate the quality of the content?
              </h5>
              <Rating
                onClick={(newRating) =>
                  handleRating("contentQuality", newRating)
                }
                initialValue={rating.contentQuality}
                ratingValue={rating.contentQuality}
                size={50}
                tooltipArray={contentQualityTooltips}
                showTooltip
                activeColor="#ffd700"
                emptyColor="#d3d3d3"
              />
              <div className="mt-4">
                <h5 className="mb-2">Write a review (Optional)</h5>
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Share your feedback here..."
                  value={review}
                  onChange={handleReviewChange}
                ></textarea>
                <div className="text-muted">
                  {maxCharacters - review.length} characters remaining
                </div>
              </div>
              <button
                className="button -sm px-20 py-20 -outline-green-5 text-green-5 text-16 fw-bolder lh-sm mx-auto"
                onClick={submitSurvey}
              >
                Submit
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default QuizResult;
