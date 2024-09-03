import MetaComponent from "@/components/common/MetaComponent";
import Preloader from "@/components/common/Preloader";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import React, { useEffect, useState } from "react";
import "./homepage.css";
import { API } from "@/utils/AxiosInstance";
import { auth } from "@/firebase/Firebase";

const metadata = {
  title: " Instructor Home || GoTestli - Ultimate School & General Purpose Quiz Platform",
  description: "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges."
};


const HomePage = () => {
  const [questionSets, setQuestionSets] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    const author = auth.currentUser.displayName;
    async function getQuestionSets() {
      const { data } = await API.get(`/api/questionset/instructor/${author}`);
      console.log(data);
      setQuestionSets(data);
    }
    getQuestionSets();
  }, []);

  async function handleRowClick(id, index) {
    setExpandedRow(index === expandedRow ? null : index);
    if (index !== expandedRow) {
      try {
        const { data } = await API.get(`/api/userresult/students/list/${id}`);
        console.log(data)
        setStudentsData(data);
      } catch (error) {
        console.error("Failed to fetch student data:", error);
      }
    }
  }

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
                  <th></th>
                  <th>Question Set Title</th>
                  <th>Description</th>
                  <th>Total Questions</th>
                  <th>Duration</th>
                  <th>Total Marks</th>
                  <th>Demo</th>
                </tr>
              </thead>
              <tbody>
                {questionSets.map((set, index) => (
                  <React.Fragment key={set.id}>
                    <tr
                      onClick={() => handleRowClick(set.id, index)}
                      className={expandedRow === index ? "expanded" : ""}
                    >
                      <td>{index + 1}</td>
                      <td>{set.title}</td>
                      <td>{set.short_desc}</td>
                      <td>{set.no_of_question}</td>
                      <td>{set.time_duration}</td>
                      <td>{set.totalmarks}</td>
                      <td>{set.is_demo ? "Private" : "Public"}</td>
                    </tr>
                    {expandedRow === index && (
                      <tr>
                        <td colSpan="7">
                          <table className="custom-table student-table">
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Student ID</th>
                                <th>Correct</th>
                                <th>Wrong</th>
                                <th>Score</th>
                                <th>%</th>
                                <th>Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              {studentsData && studentsData.map((student, i) => (
                                <tr key={student.id}>
                                  <td>{i + 1}</td>
                                  <td>{student.user_id}</td>
                                  <td>{ Math.floor( student.marks_obtained /(set.totalmarks / set.no_of_question) ) }</td>
                                  <td>{set.no_of_question -  Math.floor( student.marks_obtained /(set.totalmarks / set.no_of_question) )}</td>
                                  <td>{student.marks_obtained}</td>
                                  <td>{student.percentage}</td>
                                  <td>{ student.status == 2 ? `In Progress` : `Completed` }</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h4 className="no-content text-center">
  It looks a bit empty here! 🌟 Unleash your creativity by crafting your very own Question Set. Let's make learning exciting—your students are waiting!
</h4>
        )}

        <FooterOne />
      </div>
    </div>
  );
};

export default HomePage;
