
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import FinishExamModalPage from "./FinishExamModal/FinishExamModalPage";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { API } from "@/utils/AxiosInstance";
import { NULL } from "sass";
import QuestionSet from "./QuestionSet";
import { useNavigate } from "react-router-dom";

const SingleChoice = ({
  resumeQuizUserResultId,
  questionSetId,
  questionId,
  totalQuestions,
  question,
  index,
  onNext,
  onPrevious,
}) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [reviewQuestions, setReviewQuestion] = useState([]);
  const [open, setOpen] = useState(false);
  const [userResultId, setUserResultId] = useState();
  const [answerPersist, setAnswerPersist] = useState([]);
  const [status, setStatus] = useState(0);
  const [updatedStatus, setUpdatedStatus] = useState(0);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const userId = 99;
  const questionSetLength = totalQuestions;

 

  const navigate = useNavigate();

  useEffect(() => {
    async function getOptions() {
      try {
        const response = await API.get(`/api/options/${questionId}`);
        setOptions(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getOptions();
    async function getUserResultId() {
      if(resumeQuizUserResultId){
        setUserResultId(resumeQuizUserResultId)
      }else{
        try {
          const { data } = await API.get(
            `/api/userresult/user/${userId}/questionset/${questionSetId}`
          );
          console.log(data[0]?.id)
          setUserResultId(data[0]?.id);
        } catch (error) {
          console.log(error);
        }

      }
    }
    getUserResultId();
  }, [questionId, questionSetId]);

  useEffect(() => {
    async function getAnswers() {
      if(userResultId){
        try {
          console.log(userResultId)
          const { data } = await API.get(
            `/api/userresultdetails/get/answers/userresult/${userResultId}/length/${questionSetLength}`
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
        } catch (error) {
          console.log(error);
        }

      }

    }
    getAnswers();
  }, [userResultId, questionId,updatedStatus]);

 console.log(selectedOption)
  const findSelectedOption =
    selectedOption?.find((question) => question.id === questionId)
      ?.selectedOption || null;

  async function getStatus() {
      const { data } = await API.get(
        `/api/userresultdetails/status/userresult/${userResultId}/questionid/${questionId}`
      );
      const reviewStatus = data[0]?.status;
      setStatus(reviewStatus);
  }

  async function getUpdatedStatus(isReviewed,newstatus = 0) {
   
    if(newstatus == 3){
      setUpdatedStatus(3)
      return 3;
    }else if(newstatus == 1){
      setUpdatedStatus(1)
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
    setUpdatedStatus(newStatus)
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
            ? { ...question, selectedOption: option, status:1 }
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
    if(status == 2 || status == 3){
      isReviewed = 1
      newStatus= 3
    }else{
      isReviewed = 0
      newStatus = 1
    }
   
   await testResultDtlSetData(option,isReviewed ,newStatus );
   console.log(selectedOption)
   
  };
 
  async function testResultDtlSetData(findSelectedOption,isReviewed = 0,newstatus = 0) {
    try {
      const status = await getUpdatedStatus(isReviewed,newstatus);
      console.log(status);
      const res = await API.put("/api/userresultdetails", {
        user_test_result_id:userResultId,
        question_set_question_id:questionId ,
        answer:findSelectedOption,
        status:status,
      });
      
      return res;
    } catch (error) {
      console.log(error);
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
     const isReviewed = 1
     console.log("status"+status);
    console.log("findselectedoption"+ findSelectedOption)
    let newstatus;
    findSelectedOption && ( newstatus = 3)
    console.log("newstatus"+newstatus)
    const response = await testResultDtlSetData(findSelectedOption,isReviewed,newstatus);
    console.log(" updatedstatus :"+updatedStatus)
    if (response?.status == 200) {
      console.log("review");
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

  const handleCancel = async() =>{
    navigate("/");
  }

  const onFinishQuiz = async () => {
   
    const response = await testResultDtlSetData(findSelectedOption);
    if (response?.status == 200) {
      onOpenModal();
    }
  };
  console.log(selectedOption)
  return (
    // linear-gradient(to bottom right, #a18cd1, #fbc2eb)
    <>
      <div
        className="d-flex justify-content-center align-items-center vh-100"
        style={{ background: "rgb(26,6,79)" }}
      >
        <div
          className="card shadow p-4 "
          style={{ width: "60vw", borderRadius: "15px" }}
        >
          <div className="card-body ">
            <div className="d-flex justify-content-between items-center">
              <h4 className="card-title text-center">
                Question {index} of {totalQuestions}{" "}
              </h4>
              <div className="card-title gap-2">
                <button className="btn btn-success px-3 py-2 w-auto text-18" onClick={handleCancel} >Cancel</button>
                &nbsp;
                <button
                  className="btn btn-success px-3 py-2 w-auto text-18"
                  onClick={onFinishQuiz}
                >
                  Finish
                </button>
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
              </div>
            </div>
            <hr />
            <h5 className="card-text text-center">{question}</h5>
            <ul className="list-group list-group-flush mt-3 mb-4">
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
            </ul>
            <div className="d-flex justify-content-around">
              <div className="d-flex justify-content-center align-align-items-center gap-5">
                {index > 1 && (
                  <button
                    className="btn btn-primary w-auto p-2"
                    style={{
                      backgroundColor: "#6a1b9a",
                      borderColor: "#6a1b9a",
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
                    className="btn btn-primary w-auto p-2"
                    style={{
                      backgroundColor: "#6a1b9a",
                      borderColor: "#6a1b9a",
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
                <button
                  className="btn btn-primary w-auto p-2"
                  style={{
                    backgroundColor: "#6a1b9a",
                    borderColor: "#6a1b9a",
                  }}
                  onClick={handleReviewClick}
                >
                  Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SingleChoice;
