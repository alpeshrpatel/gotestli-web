import MetaComponent from "@/components/common/MetaComponent";
import Preloader from "@/components/common/Preloader";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import React, { useEffect, useState } from "react";

import { API } from "@/utils/AxiosInstance";
import { auth } from "@/firebase/Firebase";

const metadata = {
  title:
    " student Home || GoTestli - Ultimate School & General Purpose Quiz Platform",
  description:
    "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges.",
};

const StudentQuizzes = () => {
  const [questionSets, setQuestionSets] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);

  let userId = 99;
  useEffect(() => {
    const author = auth.currentUser.displayName;
    async function getQuestionSets() {
      const { data } = await API.get(`/api/userresult/user/${userId}`);
      console.log(data);
      setQuestionSets(data);
    }
    getQuestionSets();
  }, []);

  //   async function handleRowClick(id, index) {
  //     setExpandedRow(index === expandedRow ? null : index);
  //     if (index !== expandedRow) {
  //       try {
  //         const { data } = await API.get(`/api/userresult/students/list/${id}`);
  //         console.log(data)
  //         setStudentsData(data);
  //       } catch (error) {
  //         console.error("Failed to fetch student data:", error);
  //       }
  //     }
  //   }

  return (
    <div>
      <Preloader />
      <MetaComponent meta={metadata} />
      <Header />

      <div className="content-wrapper js-content-wrapper overflow-hidden w-100">
        {questionSets.length > 0 ? (
          <div className="table-responsive">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Quiz Title</th>
                  <th>Start Date</th>
                  <th>Complete Date</th>
                  <th>Status</th>
                  <th>Marks</th>
                  <th>Percentage</th>

                  <th>Mode</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {questionSets.map((quiz, index) => (
                  <React.Fragment key={quiz.id}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{quiz.title}</td>
                      {quiz.created_date ? (
                        <td>
                          {quiz.created_date.slice(0, 19).replace("T", " ")}
                        </td>
                      ) : (
                        <td> --- </td>
                      )}
                      {quiz.modified_date && quiz.status == 1 ? (
                        <td>
                          {quiz.modified_date.slice(0, 19).replace("T", " ")}
                        </td>
                      ) : (
                        <td> --- </td>
                      )}
                      <td>
                        {quiz.status == 1 || quiz.status == 0
                          ? "Completed"
                          : "In Progress"}
                      </td>
                      <td>{quiz.marks_obtained}</td>
                      <td>{quiz.percentage}</td>
                      <td>Exam</td>
                      <td>
                        {quiz.percentage >= quiz?.pass_percentage
                          ? "Pass"
                          : "Fail"}
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h4 className="no-content text-center">
            It looks a bit empty here! 🌟 Please attend amazing Quizzes and
            Start your Learning journey with us!
          </h4>
        )}

        <FooterOne />
      </div>
    </div>
  );
};

export default StudentQuizzes;
