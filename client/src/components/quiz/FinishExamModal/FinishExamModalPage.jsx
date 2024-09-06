import React, { useEffect } from "react";
import { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import SubmitQuizModal from "../SubmitQuizModal/SubmitQuizModal";
import { API } from "@/utils/AxiosInstance";

const FinishExamModalPage = ({
  questionSetId,
  totalQuestions,
  selectedOption,
  setSelectedOption,
  reviewQuestions,
  onCloseModal,
  userResultId,
}) => {
  const [viewReviewQuestions, setViewReviewQuestions] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   async function getOptions() {
  //     try {
  //       const reviewQuestionsData = await Promise.all(
  //         selectedOption.map(async (q) => {
  //           const response = await API.get(`/api/options/${q.id}`);
  //           const { data } = await API.get(`/api/questionmaster/${q.id}`);
  //           console.log(data)
  //           console.log(response)
  //           return {
  //             id: q.id,
  //             question: data.question,
  //             options: response.data,
  //             status: q.status,
  //             selectedOption: q.selectedOption,
  //           };
  //         })
  //       );
  //       setReviewData(reviewQuestionsData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getOptions();
  // }, [selectedOption]);

  useEffect(() => {
    async function getOptions() {
      const reviewQuestionsData = [];
      console.log(selectedOption)
      for (const q of selectedOption) {
        try {
          console.log(`Fetching options for id: ${q.id}`);
          
          const response = await API.get(`/api/options/${q.id}`);
          const { data } = await API.get(`/api/questionmaster/${q.id}`);
          
          console.log('Question Data:', data);
          console.log('Options Response:', response);
          
          reviewQuestionsData.push({
            id: q.id,
            question: data.question,
            options: response.data,
            status: q.status,
            selectedOption: q.selectedOption,
          });
        } catch (error) {
          console.error('Error fetching options:', error.response?.data || error.message || error);
          break; // Optionally, stop further execution on error
        }
      }
      console.log(reviewQuestionsData);
      setReviewData(reviewQuestionsData);
    }
  
    getOptions();
  }, [selectedOption]);
  
  // console.log(reviewQuestionsData);
  const onOpenModal = () => setOpen(true);
  const onCloseSubmitModal = () => setOpen(false);
 console.log(selectedOption)
  const attempted = selectedOption.filter((q) => q.selectedOption !== null);
  const reviewed = selectedOption.filter((q) => q.status == 2 || q.status == 3);
  console.log(reviewed);
  const skipped = selectedOption.filter((q) => q.status === 0);
  console.log(skipped);

  const totalAnswered = attempted.length;
  const totalReviewed = reviewed.length;
  const skippedQuestion = skipped.length;

  console.log("totalanswered" + totalAnswered);
  console.log("totalReviewed" + totalReviewed);
  console.log("skipped" + skippedQuestion);

  const handleReviewQuestions = () => {
    setViewReviewQuestions(true);
  };

  async function testResultDtlSetData(
    questionId,
    findSelectedOption,
    isReviewed,
    newstatus
  ) {
    try {
      const status = newstatus;

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

  const handleOptionClick = async (questionId, question, option) => {
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
    const isReviewed = 1;
    const newstatus = 3;
    const response = await testResultDtlSetData(
      questionId,
      option,
      isReviewed,
      newstatus
    );
    console.log(response);
  };

  const handleQuizSubmit = () => {
    onOpenModal();
  };
  console.log(reviewQuestions);
  return (
    <div className="px-5 ">
      {skippedQuestion > 0 && (
        <div className="card p-4">
          <h2>Do You Want to Skip All the {skippedQuestion} Questions ? </h2>
          <div className="d-flex justify-content-evenly items-center mt-4 ">
            <button className="btn btn-success " onClick={onOpenModal}>
              Yes
            </button>

            <button className="btn btn-danger " onClick={onCloseModal}>
              No
            </button>
          </div>
        </div>
      )}
      <div className={` ${viewReviewQuestions ? `d-none` : ``}  `}>
        <div className="d-flex justify-content-evenly items-center gap-4 mt-4">
          {reviewQuestions.filter(
            (reviewQuestion) =>
              reviewQuestion.status === 2 || reviewQuestion.status === 3
          ).length > 0 && (
            <button
              className="btn btn-primary p-2"
              onClick={handleReviewQuestions}
            >
              Review Questions
            </button>
          )}
          {/* <button className="btn btn-secondary p-2" onClick={onCloseModal}>
            Review All Questions
          </button> */}
        </div>
        <button
          className="btn btn-success px-3 py-2 w-auto text-18 mt-4 d-flex justify-content-center   "
          style={{ margin: " 4px auto" }}
          onClick={handleQuizSubmit}
        >
          Submit
        </button>
      </div>
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
          userResultId={userResultId}
        />
      </Modal>
      {viewReviewQuestions && (
        <div>
          {reviewQuestions.filter(
            (reviewQuestion) =>
              reviewQuestion.status === 2 || reviewQuestion.status === 3
          ).length > 0 ? (
            <>
              <h3>Review Questions</h3>
              <ul className="list-group">
                {reviewData
                  .filter(
                    (reviewQuestion) =>
                      reviewQuestion.status === 2 || reviewQuestion.status === 3
                  )
                  .sort((a, b) => b.id - a.id)
                  .map((reviewQuestion, index) => (
                    <div className="card-body" key={reviewQuestion.id}>
                      <li
                        key={reviewQuestion.id}
                        className="list-group-item text-18 text-black "
                      >
                        {reviewQuestion.question}
                      </li>
                      <ul className="list-group list-group-flush mt-3 mb-4">
                        {reviewQuestion.options.map((option, index) => (
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
          </div>
        </div>
      )}
    </div>
  );
};

export default FinishExamModalPage;