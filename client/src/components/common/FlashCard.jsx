// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { API } from '@/utils/AxiosInstance';

// const Flashcard = ({ questionId,  userAnswer, correctAnswer }) => {
//   const [question,setQuestion] = useState()
//   const [options,setOptions] = useState()
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     async function getQuestions() {
//       try {
//         if (token) {
//           const { data } = await API.get(
//             `/api/questionmaster/${questionId}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           console.log(data);
//           setQuestion(data.question);
//         }
//       } catch (error) {
//         if (error.status == 403) {
//           localStorage.removeItem("user");
//           localStorage.removeItem("token");
//           // toast.error("Invaild token!");
//           navigate("/login");
//           return;
//         }
//         throw error
//       }
//     }
//     getQuestions();
//     async function getOptions() {
//       try {
//         if (token) {
//           const { data } = await API.get(
//             `/api/options/${questionId}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           console.log(data);
//           setOptions(data);
//         }
//       } catch (error) {
//         if (error.status == 403) {
//           localStorage.removeItem("user");
//           localStorage.removeItem("token");
//           // toast.error("Invaild token!");
//           navigate("/login");
//           return;
//         }
//         throw error
//       }
//     }
//     getOptions();
//   }, []);
//   console.log('op',options)
//   return (                                                                          //#ef3c69
//     <div className="card p-3 mb-3" style={{ borderLeft: `5px solid ${correctAnswer === userAnswer ? `#00c985` : `#e74c3c`}` }}>
//       <div className="card-body">
//         <h6 className="card-title">
//           { question && question}
//         </h6>
//         <ul className="list-group list-group-flush">
//           {options && options.map((option, index) => {
//             // Determine if the option is the correct answer or the user's answer
//             const isCorrect = option.options === correctAnswer;
//             const isUserAnswer = option.options === userAnswer;
//             return (
//               <li
//                 key={index}
//                 className={`list-group-item  ${
//                   isCorrect ? 'text-success' : ''
//                 } ${isUserAnswer && !isCorrect ? 'text-danger' : ''}`}
//               >
//                 <input
//                   type="radio"
//                   name="options"
//                   disabled
//                   checked={isUserAnswer}
//                   className="me-2"
//                 />
//                 {option.options}
//                 {isCorrect && <span className="badge bg-success ms-lg-4">Correct Answer</span>}
//                 {isUserAnswer && !isCorrect && <span className="badge bg-danger ms-lg-4">Your Answer</span>}
//               </li>
//             );
//           })}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Flashcard;


import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API } from '@/utils/AxiosInstance';
import { useNavigate } from 'react-router-dom';

const Flashcard = ({ questionId, userAnswer, correctAnswer }) => {
  const [question, setQuestion] = useState();
  const [options, setOptions] = useState([]);
  const [explanation, setExplanation] = useState();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    async function getQuestions() {
      try {
        if (token) {
          const { data } = await API.get(`/api/questionmaster/${questionId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(data);
          setQuestion(data.question);
          setExplanation(data.explanation)
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          console.error(error);
        }
      }
    }

    async function getOptions() {
      try {
        if (token) {
          const { data } = await API.get(`/api/options/${questionId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(data);
          setOptions(data);
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          console.error(error);
        }
      }
    }

    getQuestions();
    getOptions();
  }, [questionId, token, navigate]);
 console.log(userAnswer , correctAnswer)
  return (
    <div
      className="card p-3 mb-3"
      style={{
        borderLeft: `5px solid ${correctAnswer === userAnswer ? '#00c985' : '#e74c3c'}`,
      }}
    >
      <div className="card-body">
        <h6 className="card-title"> Q. {question ? question : 'Loading question...'}</h6>
        <ul className="list-group list-group-flush">
          {options.map((option, index) => {
            const isCorrect = option.options === correctAnswer;
            const isUserAnswer = option.options === userAnswer;
            return (
              <li
                key={index}
                className={`list-group-item ${isCorrect ? 'text-success' : ''} ${
                  isUserAnswer && !isCorrect ? 'text-danger' : ''
                }`}
              >
                <input
                  type="radio"
                  name={`options-${questionId}`} // Unique name for each question
                  disabled
                  checked={isUserAnswer}
                  className="me-2"
                />
                {option.options}
                {isCorrect && <span className="badge bg-success ms-lg-4">Correct Answer</span>}
                {isUserAnswer && !isCorrect && <span className="badge bg-danger ms-lg-4">Your Answer</span>}
              </li>
            );
          })}
        </ul>
        <h7 className="card-title mt-4 "> <strong>Explanation:- </strong>  {explanation ? explanation : ''}</h7>
      </div>
    </div>
  );
};

export default Flashcard;
