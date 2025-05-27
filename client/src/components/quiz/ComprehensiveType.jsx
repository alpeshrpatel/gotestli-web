import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FinishExamModalPage from "./FinishExamModal/FinishExamModalPage";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { API } from "@/utils/AxiosInstance";
import QuestionSet from "./QuestionSet";
import { useNavigate } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import SubmitQuizModal from "./SubmitQuizModal/SubmitQuizModal";
import { Radio, Typography } from "@mui/material";
import CommentForQuestion from "../common/CommentForQuestion";

const ComprehensiveType = ({
  time,
  timerOn,
  resumeQuizUserResultId,
  questionSetId,
  questionId,
  totalQuestions,
  question,
  paragraph,
  index,
  onNext,
  onPrevious,
  marks = 0, isNegative = 0, negativeMarks = 0,
}) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [reviewQuestions, setReviewQuestion] = useState([]);
  const [open, setOpen] = useState(false);
  const [userResultId, setUserResultId] = useState();
  const [answerPersist, setAnswerPersist] = useState([]);
  const [status, setStatus] = useState(0);
  const [updatedStatus, setUpdatedStatus] = useState(0);
  const remainingTimeRef = useRef();

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const user = JSON.parse(localStorage.getItem("user")) || "";

  //const userRole = user.role;
  const userId = user.id;
  const questionSetLength = totalQuestions;

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const org = JSON.parse(localStorage.getItem("org")) || "";
  let orgid = org?.id || 0;
  useEffect(() => {
    async function getOptions() {
      try {
        if (token) {
          const response = await API.get(`/api/options/${questionId}?orgid=${orgid}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setOptions(response.data);
        }
      } catch (error) {
        if (error.status == 403) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          // showToast("error","Invaild token!");
          navigate("/login");
          return;
        }
         // console.log(error);
      }
    }
    getOptions();
    async function getUserResultId() {
      if (resumeQuizUserResultId) {
        setUserResultId(resumeQuizUserResultId);
      } else {
        try {
          if (token) {
            const { data } = await API.get(
              `/api/userresult/user/${userId}/questionset/${questionSetId}?orgid=${orgid}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
             // console.log(data[0]?.id);
            setUserResultId(data[0]?.id);
          }
        } catch (error) {
          if (error.status == 403) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            // showToast("error","Invaild token!");
            navigate("/login");
            return;
          }
           // console.log(error);
        }
      }
    }
    getUserResultId();
  }, [questionId, questionSetId]);

  useEffect(() => {
    async function getAnswers() {
      if (userResultId) {
        try {
          if (token) {
             // console.log(userResultId);
            const { data } = await API.get(
              `/api/userresultdetails/get/answers/userresult/${userResultId}/length/${questionSetLength}?orgid=${orgid}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            const persistedAnswers = data.map((q) => {
              return {
                id: q.question_set_question_id,
                selectedOption: q.answer,
                status: q.status,
              };
            });

            setSelectedOption(persistedAnswers);
            setReviewQuestion(persistedAnswers);
            setAnswerPersist(persistedAnswers);

            await getStatus();
          }
        } catch (error) {
          if (error.status == 403) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            // showToast("error","Invaild token!");
            navigate("/login");
            return;
          }
           // console.log(error);
        }
      }
    }
    getAnswers();
  }, [userResultId, questionId, updatedStatus]);

   // console.log(selectedOption);
  const findSelectedOption =
    selectedOption?.find((question) => question.id === questionId)
      ?.selectedOption || null;

  async function getStatus() {
    try {
      if (token) {
        const { data } = await API.get(
          `/api/userresultdetails/status/userresult/${userResultId}/questionid/${questionId}?orgid=${orgid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const reviewStatus = data[0]?.status;
        setStatus(reviewStatus);
      }
    } catch (error) {
      if (error.status == 403) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // showToast("error","Invaild token!");
        navigate("/login");
        return;
      }
       // console.log(error);
    }
  }

  async function getUpdatedStatus(isReviewed, newstatus = 0) {
    if (newstatus == 3) {
      setUpdatedStatus(3);
      return 3;
    } else if (newstatus == 1) {
      setUpdatedStatus(1);
      return 1;
    }
    let newStatus;
    if (status === 0) {
      newStatus = isReviewed ? 2 : 1;
    } else if (status === 1) {
      newStatus = isReviewed ? 3 : 1;
    } else if (findSelectedOption) {
      newStatus = isReviewed ? 3 : 1;
    } else {
      newStatus = isReviewed ? 2 : 0;
    }
    setUpdatedStatus(newStatus);
    return newStatus;
  }

  const handleOptionClick = async (option) => {
    const findQuestion = selectedOption.find(
      (question) => questionId === question.id
    );

    if (findQuestion) {
      setSelectedOption(
        selectedOption.map((question) =>
          question.id === questionId
            ? { ...question, selectedOption: option, status: ((question.status == 2 || question.status == 3) ? 3 : 1) }
            : question
        )
      );
    } else {
      setSelectedOption([
        ...selectedOption,
        {
          id: questionId,
          selectedOption: option,
        },
      ]);
    }
    let isReviewed;
    let newStatus;
    if (status == 2 || status == 3) {
      isReviewed = 1;
      newStatus = 3;
    } else {
      isReviewed = 0;
      newStatus = 1;
    }

    await testResultDtlSetData(option, isReviewed, newStatus);
     // console.log(selectedOption);
  };

  async function testResultDtlSetData(
    findSelectedOption,
    isReviewed = 0,
    newstatus = 0
  ) {
    try {
      if (token) {
        const status = await getUpdatedStatus(isReviewed, newstatus);
         // console.log(status);
        const res = await API.put(
          "/api/userresultdetails",
          {
            user_test_result_id: userResultId,
            question_set_question_id: questionId,
            answer: findSelectedOption,
            modified_by: userId,
            status: status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return res;
      }
    } catch (error) {
      if (error.status == 403) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // showToast("error","Invaild token!");
        navigate("/login");
        return;
      }
       // console.log(error);
      throw error;
    }
  }

  const handleReviewClick = async () => {
    const findQuestion = reviewQuestions.find(
      (question) => questionId === question.id
    );

    if (findQuestion) {
      setReviewQuestion(
        reviewQuestions.map((question) =>
          question.id === questionId
            ? {
                ...question,
                selectedOption: findSelectedOption,
                status: status,
                option: options,
              }
            : question
        )
      );
    } else {
      setReviewQuestion([
        ...reviewQuestions,
        {
          id: questionId,
          selectedOption: findSelectedOption,
          status: status,
          option: options,
        },
      ]);
    }
    const isReviewed = 1;
     // console.log("status" + status);
     // console.log("findselectedoption" + findSelectedOption);
    let newstatus;
    findSelectedOption && (newstatus = 3);
     // console.log("newstatus" + newstatus);
    const response = await testResultDtlSetData(
      findSelectedOption,
      isReviewed,
      newstatus
    );
     // console.log(" updatedstatus :" + updatedStatus);
    if (response?.status == 200) {
       // console.log("review");
      onNext();
    }
  };

  const handleNextClick = async () => {
    // const response = await testResultDtlSetData();
    // if (response?.status == 200) {
    //   onNext();
    // }
    onNext();
  };

  const handlePreviousClick = async () => {
    // const response = await testResultDtlSetData();
    // if (response?.status == 200) {
    //   onPrevious();
    // }
    onPrevious();
  };

  const handleCancel = async () => {
    navigate("/");
  };

   // console.log(selectedOption);
   // console.log(reviewQuestions);

  const attempted = selectedOption.filter((q) => q.selectedOption !== null);
  const reviewed = selectedOption.filter((q) => q.status == 2 || q.status == 3);
   // console.log(reviewed);
  const skipped = selectedOption.filter((q) => q.status === 0);
   // console.log(skipped);

  let totalAnswered = attempted.length;
  let totalReviewed = reviewed.length;
  let skippedQuestion = skipped.length;

  const onFinishQuiz = async () => {
     // console.log('remaining:'+remainingTimeRef.current)
    
    const response = await testResultDtlSetData(findSelectedOption);
    if (response?.status == 200) {
      onOpenModal();
    }
  };

  const renderTime = ({ remainingTime }) => {
    remainingTimeRef.current = remainingTime;
    if (remainingTime === 0) {
      return <div className="timer text-14 fw-500 text-center">Time Up...</div>;
    }
  
    return (
      <div className="timer">
        <div className="text text-10 fw-500">Remaining</div>
        <div className="value text-14 fw-600 text-center">{remainingTime}</div>
        <div className="text text-10 fw-500 text-center">seconds</div>
      </div>
    );
  };
  return (
    // linear-gradient(to bottom right, #a18cd1, #fbc2eb)
    <>
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ background: "rgb(26,6,79)" }}
      >
        <div
          className="card shadow p-4 "
          style={{ width: "90vw", borderRadius: "15px" ,userSelect: "none",}}
        >
          <div className="card-body ">
            <div className="d-flex justify-content-between items-center">
              <h4 className="card-title text-center">
                Question {index} of {totalQuestions}{" "}
              </h4>
              <h5>Comprehensive</h5>
              {/* {
                timerOn == 'yes' ? (
                  <CountdownCircleTimer
                  // style={{height:'70px',width:'70px'}}
                  size={130}
                  isPlaying
                  duration={time*60}
                  colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                  colorsTime={[time*60, time*40, time*20, 0]} 
                  onComplete={() => {
                    onOpenModal()
                    return { shouldRepeat: false }; 
                  }}
                >
                  {renderTime}
                </CountdownCircleTimer>
                ) : (
                  null
                )
              } */}
             
              <div className="card-title gap-2 d-flex align-items-center">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="bi bi-flag-fill pointer"
                  viewBox="0 0 16 16"
                  onClick={handleReviewClick}
                  style={{ marginRight: "50px", color: selectedOption.some(
                    (selected) =>
                      selected.id === questionId &&
                      (selected.status == 2 || selected.status == 3)
                  ) ? 'blue' : '' }}
                >
                  <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
                </svg>
                <div className='d-flex '>
                <button
                  className="btn btn-success px-3 py-2 w-auto text-18"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                &nbsp;
                <button
                  className="btn btn-success px-3 py-2 w-auto text-18"
                  onClick={onFinishQuiz}
                >
                  Finish
                </button>
                </div>
                {((totalReviewed > 0 || skippedQuestion > 0) && remainingTimeRef.current !== 0 ) ? (
                  <Modal open={open} onClose={onCloseModal} center>
                    <FinishExamModalPage
                      questionSetId={questionSetId}
                      totalQuestions={totalQuestions}
                      selectedOption={selectedOption}
                      setSelectedOption={setSelectedOption}
                      reviewQuestions={reviewQuestions}
                      onCloseModal={onCloseModal}
                      userResultId={userResultId}
                    />
                  </Modal>
                ) : (
                  <Modal open={open} center>
                    <SubmitQuizModal
                      questionSetId={questionSetId}
                      totalQuestions={totalQuestions}
                      selectedOption={selectedOption}
                      setSelectedOption={setSelectedOption}
                      totalAnswered={totalAnswered}
                      totalReviewed={totalReviewed}
                      skippedQuestion={skippedQuestion}
                      reviewQuestions={reviewQuestions}
                      userResultId={userResultId}
                    />
                  </Modal>
                )}
              </div>
            </div>
            <hr />
             <div className="alert alert-info py-2 px-3 mb-3" role="alert">
              <strong>Instructions:</strong> Please read each question carefully. You can select multiple answers if applicable. Questions may carry negative marking.
            </div>


            <div className="d-flex justify-content-between mb-3 px-2">
              <h6>
                Marks:{" "}
                <span className=" bg-success px-2 py-1 text-white" style={{ borderRadius: '5px' }}>
                  {marks}
                </span>
              </h6>
              <h6>
                Negative Marks:{" "}
                <span className=" bg-danger px-2 py-1 text-white" style={{ borderRadius: '5px' }}>

                  {isNegative ? negativeMarks : 0}
                </span>
              </h6>
            </div>
            <h6> <strong>Note.</strong> Read this paragraph carefully and attempt below questions.</h6>
            <Typography className="card-text text-center mt-2 mb-2 " color='InfoText' variant='h8'>
            {paragraph}
            </Typography>
            {/* <h6 className="card-text  mt-2 mb-2 ">{paragraph}</h6> */}
            <hr />
            <div
              className="d-flex gap-4 justify-center "
              style={{ alignItems: "center" }}
            >
              <h5 className="card-text text-center">{question}</h5>

              <CommentForQuestion questionId={questionId} />
            </div>
            {/* <ul className="list-group list-group-flush mt-3 mb-4">
              {options?.map((option, id) => (
                <li
                  key={id}
                  className={`list-group-item border-1 border-secondary-subtle rounded mb-2 `}
                  onClick={() => handleOptionClick(option.options)}
                  style={{
                    backgroundColor: selectedOption.some(
                      (selected) =>
                        selected.id === questionId &&
                        selected.selectedOption === option.options
                    )
                      ? "rgb(247, 191, 234)"
                      : "",
                    cursor: "pointer",
                  }}
                >
                  {option.options}
                </li>
              ))}
            </ul> */}
             <ul className="list-group list-group-flush mt-3 mb-4">
              <div className="row">
                {options?.map((option, id) => (
                  <div className={`col-12 col-md-6 mb-2`} key={id}>
                    <li
                      className={`list-group-item border border-secondary rounded d-flex align-items-center `}
                      onClick={() => handleOptionClick(option.options)}
                      style={{
                        backgroundColor: selectedOption.some(
                          (selected) =>
                            selected.id === questionId &&
                            selected.selectedOption === option.options
                        )
                          ? "rgb(247, 191, 234)"
                          : "",
                        cursor: "pointer",
                        userSelect: "none",
                      }}
                    >
                      <Radio
                        checked={selectedOption.some(
                          (selected) =>
                            selected.id === questionId &&
                            selected.selectedOption === option.options
                        )}
                        value={option.options}
                        color="primary"
                        style={{ marginRight: "8px" }}
                      />
                      {option.options}
                    </li>
                  </div>
                ))}
              </div>
            </ul>
            <div className="d-flex justify-content-center">
              <div className="d-flex justify-content-center align-items-center" style={{gap:'75px'}}>
                {index > 1 && (
                  <button
                    className="btn btn-primary p-2"
                    style={{
                      backgroundColor: "#6a1b9a",
                      borderColor: "#6a1b9a",
                      width:'130px'
                    }}
                    onClick={handlePreviousClick}
                  >
                    <FontAwesomeIcon
                      icon={faAngleDoubleLeft}
                      className="fa-lg mr-5"
                    />
                    Previous{" "}
                  </button>
                )}
                {index !== totalQuestions && (
                  <button
                    className="btn btn-primary p-2"
                    style={{
                      backgroundColor: "#6a1b9a",
                      borderColor: "#6a1b9a",
                      width:'130px'
                    }}
                    onClick={handleNextClick}
                  >
                    Next{" "}
                    <FontAwesomeIcon
                      icon={faAngleDoubleRight}
                      className="fa-lg ml-5"
                    />
                  </button>
                )}
              </div>

              <div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ComprehensiveType;
