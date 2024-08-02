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

const SingleChoice = ({
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

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    async function getOptions() {
      try {
        const response = await API.get(
          `/options/${questionId}`
        );
        console.log(response);
        setOptions(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getOptions();
  }, [questionId]);

  const handleOptionClick = (option) => {
    const findQuestion = selectedOption.find(
      (question) => questionId === question.id
    );

    if (findQuestion) {
      setSelectedOption(
        selectedOption.map((question) =>
          question.id === questionId
            ? { ...question, selectedOption: option }
            : question
        )
      );
    } else {
      setSelectedOption([
        ...selectedOption,
        {
          id: questionId,
          question: question,
          selectedOption: option,
        },
      ]);
    }
  };

  console.log(selectedOption);

  const handleReviewClick = () => {
    const findQuestion = reviewQuestions.find(
      (question) => questionId === question.id
    );
    if (!findQuestion) {
      setReviewQuestion([
        ...reviewQuestions,
        {
          id: questionId,
          question: question,
          option:options,
          
        },
      ]);
      onNext();
    }
  };
  console.log(reviewQuestions);
  return (
    // linear-gradient(to bottom right, #a18cd1, #fbc2eb)
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "rgb(26,6,79)" }}
    >
      <div
        className="card shadow p-4"
        style={{ width: "60vw", borderRadius: "15px" }}
      >
        <div className="card-body">
          <div className="d-flex justify-content-between items-center">
          <h4 className="card-title text-center">
            Question {index} of {totalQuestions}{" "}
          </h4>
          <div className="card-title ">
            <button className="btn btn-success px-3 py-2 w-auto text-18" onClick={onOpenModal} >Finish</button>
            <Modal open={open} onClose={onCloseModal} center>
                <FinishExamModalPage questionSetId={questionSetId} totalQuestions = {totalQuestions} selectedOption= {selectedOption} setSelectedOption= {setSelectedOption} reviewQuestions= {reviewQuestions} onCloseModal={onCloseModal}/>
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
            <div className="d-flex justify-content-center gap-3">
              {index > 1 && (
                <button
                  className="btn btn-primary w-auto p-2"
                  style={{ backgroundColor: "#6a1b9a", borderColor: "#6a1b9a" }}
                  onClick={onPrevious}
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
                  style={{ backgroundColor: "#6a1b9a", borderColor: "#6a1b9a" }}
                  onClick={onNext}
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
                style={{ backgroundColor: "#6a1b9a", borderColor: "#6a1b9a" }}
                onClick={handleReviewClick}
              >
                Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleChoice;