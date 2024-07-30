import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SingleChoice = ({
  totalQuestions,
  question,
  questionOptions,
  index,
  onNext,
  onPrevious,
}) => {
  const [selectedOption, setSelectedOption] = useState([]);
  const [reviewQuestions, setReviewQuestion] = useState([]);

  const handleOptionClick = (option) => {
    // Find if the question already exists in the selectedOption array
    const findQuestion = selectedOption.find(
      (question) => index === question.id
    );

    if (findQuestion) {
      // Update the existing question with the new selected option
      setSelectedOption(
        selectedOption.map((question) =>
          question.id === index
            ? { ...question, selectedOption: option }
            : question
        )
      );
    } else {
      // Add the new question and its selected option
      setSelectedOption([
        ...selectedOption,
        {
          id: index,
          question: question,
          selectedOption: option,
        },
      ]);
    }
  };

  console.log(selectedOption);
  const handleReviewClick = () => {
    const findQuestion = reviewQuestions.find(
      (question) => index === question.id
    );
    if (!findQuestion) {
      setReviewQuestion([
        ...reviewQuestions,
        {
          id: index,
          question: question,
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
          <h4 className="card-title text-center">
            Question {index} of {totalQuestions}{" "}
          </h4>
          <hr />
          <h5 className="card-text text-center">{question}</h5>
          <ul className="list-group list-group-flush mt-3 mb-4">
            {questionOptions.map((option, id) => (
              <li
                key={id}
                className={`list-group-item border-1 border-secondary-subtle rounded mb-2 `}
                onClick={() => handleOptionClick(option)}
                style={{
                  backgroundColor: selectedOption.some(
                    (selected) =>
                      selected.id === index &&
                      selected.selectedOption === option
                  )
                    ? "rgb(247, 191, 234)"
                    : "",
                  cursor: "pointer",
                }}
              >
                {option}
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
