import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleChoice from "./SingleChoice";
import { useLocation } from "react-router-dom";
import ComprehensiveType from "./ComprehensiveType";

const QuestionSet = () => {
  const [questions, setQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);

  const location = useLocation();
  const {
    userResultId = 0,
    questionSetId,
    questionSet,
    time,
    timerOn,
  } = location.state;

  useEffect(() => {
    setQuestions(questionSet);
  }, [questionSet]);

  function handleNextClick() {
    if (questionNumber < questions.length) {
      setQuestionNumber(questionNumber + 1);
    }
  }
  function handlePreviousClick() {
    if (questionNumber > 1) {
      setQuestionNumber(questionNumber - 1);
    }
  }
  // const questionOptions = options
  //   .filter((option) => option.question_id === questionNumber)
  //   .map((option) => option.question_option);

  // console.log(questionOptions);

  //   const correctAnswer = options.filter((option) => option.question_id === questionNumber).filter((option)=> option.is_correct_answer === 1 ).map((option) => option.question_option);

  //  console.log(correctAnswer)
  console.log(questionSet);

  return (
    <div>
      {questions.length > 0 &&
        (questions[questionNumber - 1].question_type_id == "6" ? (
          <ComprehensiveType
            time={time}
            timerOn={timerOn}
            resumeQuizUserResultId={userResultId}
            questionSetId={questionSetId}
            questionId={questionSet[questionNumber - 1].question_id}
            totalQuestions={questions.length}
            question={questions[questionNumber - 1].question}
            paragraph={questions[questionNumber - 1].paragraph}
            index={questionNumber}
            onNext={handleNextClick}
            onPrevious={handlePreviousClick}
          />
        ) : (
          <SingleChoice
            time={time}
            timerOn={timerOn}
            resumeQuizUserResultId={userResultId}
            questionSetId={questionSetId}
            questionId={questionSet[questionNumber - 1].question_id}
            totalQuestions={questions.length}
            question={questions[questionNumber - 1].question}
            index={questionNumber}
            onNext={handleNextClick}
            onPrevious={handlePreviousClick}
          />
        ))}
    </div>
  );
};

export default QuestionSet;
