// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import SingleChoice from "./SingleChoice";
// import { useLocation } from "react-router-dom";
// import ComprehensiveType from "./ComprehensiveType";
// import { API } from "@/utils/AxiosInstance";

// const QuestionSet = () => {
//   const [questions, setQuestions] = useState([]);
//   const [questionNumber, setQuestionNumber] = useState(1);
//   const [paragraph,setParagraph] = useState('')

//   const token = localStorage.getItem("token");
//   const location = useLocation();
//   const {
//     userResultId = 0,
//     questionSetId,
//     questionSet,
//     time,
//     timerOn,
//   } = location.state;

//   useEffect(() => {
//     if(questionSet){
//       setQuestions(questionSet);
//     }
   
//   }, [questionSet]);
 
//   useEffect(()=> {
//     async function getParagraph() {
//       try {
//         if (questions.length > 0 && questionNumber <= questions.length) {
//         const paragraphId = questions[questionNumber - 1]?.paragraph_id
//         if (token && paragraphId) {
//           const response = await API.get(
//             `/api/questionmaster/paragraph/${paragraphId}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//            // console.log(response.data)
//           setParagraph(response.data.paragraph);
//           para = response.data.paragraph
//         }else{
//           setParagraph('')
//         }
//       }
//       } catch (error) {
//         if (error.status == 403) {
//           localStorage.removeItem("user");
//           localStorage.removeItem("token");
//           // showToast("error","Invaild token!");
//           navigate("/login");
//           return;
//         }
//          // console.log(error);
//       }
//     }
//     if (questions.length > 0) {
//       getParagraph();
//     }
//   },[questionSetId,questionSet,questionNumber,token])

//   function handleNextClick() {
//     if (questionNumber < questions.length) {
//       setQuestionNumber(questionNumber + 1);
//     }
//   }
//   function handlePreviousClick() {
//     if (questionNumber > 1) {
//       setQuestionNumber(questionNumber - 1);
//     }
//   }
//   // const questionOptions = options
//   //   .filter((option) => option.question_id === questionNumber)
//   //   .map((option) => option.question_option);

//   //  // console.log(questionOptions);

//   //   const correctAnswer = options.filter((option) => option.question_id === questionNumber).filter((option)=> option.is_correct_answer === 1 ).map((option) => option.question_option);

//   //   // console.log(correctAnswer)
//    // console.log(questionSet);

//   return (
//     <div>
//       {questions.length > 0 &&
//         (questions[questionNumber - 1].question_type_id == "6"  ? (
//           <ComprehensiveType
//             time={time}
//             timerOn={timerOn}
//             resumeQuizUserResultId={userResultId}
//             questionSetId={questionSetId}
//             questionId={questionSet[questionNumber - 1].question_id}
//             totalQuestions={questions.length}
//             question={questions[questionNumber - 1].question}
//             paragraph={paragraph}
//             index={questionNumber}
//             onNext={handleNextClick}
//             onPrevious={handlePreviousClick}
//           />
//         ) : (
//           <SingleChoice
//             time={time}
//             timerOn={timerOn}
//             resumeQuizUserResultId={userResultId}
//             questionSetId={questionSetId}
//             questionId={questionSet[questionNumber - 1].question_id}
//             totalQuestions={questions.length}
//             question={questions[questionNumber - 1].question}
//             index={questionNumber}
//             onNext={handleNextClick}
//             onPrevious={handlePreviousClick}
//           />
//         ))}
//     </div>
//   );
// };

// export default QuestionSet;


import React, { useEffect, useState } from "react";
import SingleChoice from "./SingleChoice";
import { useLocation, useNavigate } from "react-router-dom";
import ComprehensiveType from "./ComprehensiveType";
import { API } from "@/utils/AxiosInstance";
import MultipleChoice from "./MultipleChoice";

const QuestionSet = () => {
  const [questions, setQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [paragraph, setParagraph] = useState('');

  const token = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();
  const {
    userResultId = 0,
    questionSetId,
    questionSet,
    time,
    timerOn,
    lastAttemptedQuestion, questionsData
  } = location.state;
  const org = JSON.parse(localStorage.getItem("org")) || "";
  let orgid = org?.id || 0;

  // Set questions only when questionSet is available and valid
  useEffect(() => {
    if (Array.isArray(questionSet?.res) && questionSet?.res.length > 0) {
      console.log(questionSet)
      setQuestions(questionSet?.res?.sort((a, b) => b.question_id - a.question_id));
      console.log(lastAttemptedQuestion)
      lastAttemptedQuestion && setQuestionNumber(lastAttemptedQuestion || 1);
    }
  }, [questionSet,lastAttemptedQuestion]);

  // Fetch paragraph based on the current question
  useEffect(() => {
    async function getParagraph() {
      try {
        // Ensure questions are populated and question number is valid
        if (questions.length > 0 && questionNumber <= questions.length) {
          const paragraphId = questions[questionNumber - 1]?.paragraph_id;
          if (token && paragraphId) {
            const response = await API.get(
              `/api/questionmaster/paragraph/${paragraphId}?orgid=${orgid}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setParagraph(response.data.paragraph || '');
          } else {
            setParagraph(''); // Clear paragraph if no paragraph ID
          }
        }
      } catch (error) {
        if (error.response?.status === 403) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          console.error(error);
        }
      }
    }

    // Only run getParagraph if questions are populated
    if (questions.length > 0) {
      getParagraph();
    }
  }, [questions, questionNumber, token]);

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
  console.log('hello',questionSet)
  return (
    <div>
      {questions.length > 0 && questions[questionNumber - 1] && (
        questions[questionNumber - 1].question_type_id == "6" ? (
          <ComprehensiveType
            time={time}
            timerOn={timerOn}
            resumeQuizUserResultId={userResultId}
            questionSetId={questionSetId}
            questionId={questions[questionNumber - 1].question_id}
            totalQuestions={questions.length}
            question={questions[questionNumber - 1].question}
            paragraph={paragraph}
            index={questionNumber}
            onNext={handleNextClick}
            onPrevious={handlePreviousClick}
            marks={questions[questionNumber - 1].marks}
            isNegative={questions[questionNumber - 1].is_negative}
            negativeMarks={questions[questionNumber - 1].negative_marks}
          />
        ) : (
          questions[questionNumber - 1].question_type_id == "7" ? (
            <MultipleChoice
            time={time}
            timerOn={timerOn}
            resumeQuizUserResultId={userResultId}
            questionSetId={questionSetId}
            questionId={questions[questionNumber - 1].question_id}
            totalQuestions={questions.length}
            question={questions[questionNumber - 1].question}
            index={questionNumber}
            onNext={handleNextClick}
            onPrevious={handlePreviousClick}
             marks={questions[questionNumber - 1].marks}
            isNegative={questions[questionNumber - 1].is_negative}
            negativeMarks={questions[questionNumber - 1].negative_marks}
            />
          ): (
            <SingleChoice
            time={time}
            timerOn={timerOn}
            resumeQuizUserResultId={userResultId}
            questionSetId={questionSetId}
            questionId={questions[questionNumber - 1].question_id}
            totalQuestions={questions.length}
            question={questions[questionNumber - 1].question}
            index={questionNumber}
            onNext={handleNextClick}
            onPrevious={handlePreviousClick}
             marks={questions[questionNumber - 1].marks}
            isNegative={questions[questionNumber - 1].is_negative}
            negativeMarks={questions[questionNumber - 1].negative_marks}
          />
          )
          
        )
      )}
    </div>
  );
};

export default QuestionSet;
