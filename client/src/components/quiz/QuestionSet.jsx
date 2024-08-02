import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleChoice from "./SingleChoice";
import { useLocation } from "react-router-dom";

const QuestionSet = () => {
  const [questions, setQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);

  const location = useLocation();
  const {questionSetId,questionSet,time} = location.state;

  useEffect(() => {
    setQuestions(questionSet)
  
  }, [questionSet]);
  
  function handleNextClick() {
    if (questionNumber < questions.length ) {
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
console.log(questionSet)

  return (
    <div>
      {questions.length > 0 && (
        <SingleChoice
          questionSetId = {questionSetId}
          questionId = {questionSet[questionNumber-1].question_id}
          totalQuestions={questions.length}
          question={questions[questionNumber-1].question}                 
          index={questionNumber}
          onNext={handleNextClick}
          onPrevious={handlePreviousClick}
        />
      )}
    </div>
  );
};

export default QuestionSet;
