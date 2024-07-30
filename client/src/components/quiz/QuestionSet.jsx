import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleChoice from "./SingleChoice";

const QuestionSet = () => {
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);

  useEffect(() => {
    async function getQuestions() {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/question_master"
        );
        console.log(data);
        setQuestions(data);
      } catch (error) {
        console.log(error);
      }
    }
    getQuestions();
    async function getOptions() {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/all_question_options"
        );
        console.log(data);
        setOptions(data);
      } catch (error) {
        console.log(error);
      }
    }
    getOptions();
    
  }, []);
  
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
  const questionOptions = options
    .filter((option) => option.question_id === questionNumber)
    .map((option) => option.question_option);

  console.log(questionOptions);

//   const correctAnswer = options.filter((option) => option.question_id === questionNumber).filter((option)=> option.is_correct_answer === 1 ).map((option) => option.question_option);
  
//  console.log(correctAnswer)

  return (
    <div>
      {questions.length > 0 && (
        <SingleChoice
          totalQuestions={questions.length}
          question={questions[questionNumber].question}
          questionOptions={questionOptions}         
          index={questionNumber}
          onNext={handleNextClick}
          onPrevious={handlePreviousClick}
        />
      )}
    </div>
  );
};

export default QuestionSet;
