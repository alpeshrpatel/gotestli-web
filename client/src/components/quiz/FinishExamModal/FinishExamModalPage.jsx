import React from "react";
import { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import SubmitQuizModal from "../SubmitQuizModal/SubmitQuizModal";

const FinishExamModalPage = ({
  questionSetId,
  totalQuestions,
  selectedOption,
  setSelectedOption,
  reviewQuestions,
  onCloseModal,
}) => {
  const [viewReviewQuestions, setViewReviewQuestions] = useState(false);
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseSubmitModal = () => setOpen(false);

  const totalAnswered = selectedOption.length;
  const totalReviewed = reviewQuestions.length;
  const skippedQuestion = totalQuestions - selectedOption.length;

  const handleReviewQuestions = () => {
    setViewReviewQuestions(true);
  };

  const handleOptionClick = (questionId, question, option) => {
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

  const handleQuizSubmit = () => {
    onOpenModal();
  };

  console.log(selectedOption);
  console.log(reviewQuestions);
  return (
    <div>
      {skippedQuestion > 0 && (
        <div className="card p-4">
          <h2>Do You Want to Skip All the {skippedQuestion} Questions ? </h2>
          <div className="d-flex justify-content-evenly items-center mt-4 ">
            <button className="btn btn-success ">Yes</button>
            <button className="btn btn-danger " onClick={onCloseModal}>
              No
            </button>
          </div>
        </div>
      )}
      <div
        className={`d-flex justify-content-evenly items-center gap-4 mt-4 ${
          viewReviewQuestions ? `d-none` : ``
        }  `}
      >
        <button className="btn btn-primary p-2" onClick={handleReviewQuestions}>
          Review Questions
        </button>
        <button className="btn btn-secondary p-2" onClick={onCloseModal}>
          Review All Questions
        </button>
      </div>

      {viewReviewQuestions && (
        <div>
          {reviewQuestions.length > 0 ? (
            <>
              <h3>Review Questions</h3>
              <ul className="list-group">
                {reviewQuestions.map((reviewQuestion, index) => (
                  <div className="card-body" key={index}>
                    <li
                      key={index}
                      className="list-group-item text-18 text-black "
                    >
                      {reviewQuestion.question}
                    </li>
                    <ul className="list-group list-group-flush mt-3 mb-4">
                      {reviewQuestion.option.map((option, index) => (
                        <li
                          key={index}
                          className="list-group-item border-1 border-secondary-subtle rounded mb-2 "
                          onClick={() =>
                            handleOptionClick(
                              reviewQuestion.id,
                              reviewQuestion.question,
                              option.options
                            )
                          }
                          style={{
                            backgroundColor: selectedOption.some(
                              (selected) =>
                                selected.id === reviewQuestion.id &&
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
                  </div>
                ))}
              </ul>
            </>
          ) : (
            <h4 className="mt-4">No Questions in Review</h4>
          )}
          <div className="d-flex justify-content-evenly gap-4">
            <button
              className="btn btn-secondary mpx-3 py-2 w-auto text-18 mt-4"
              onClick={() => setViewReviewQuestions(false)}
            >
              Back
            </button>
            <button
              className="btn btn-success px-3 py-2 w-auto text-18 mt-4"
              onClick={handleQuizSubmit}
            >
              Submit
            </button>
            <Modal open={open} onClose={onCloseSubmitModal} center>
              <SubmitQuizModal
                questionSetId={questionSetId}
                totalQuestions={totalQuestions}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                totalAnswered={totalAnswered}
                totalReviewed={totalReviewed}
                skippedQuestion={skippedQuestion}
                reviewQuestions={reviewQuestions}
              />
            </Modal>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinishExamModalPage;
