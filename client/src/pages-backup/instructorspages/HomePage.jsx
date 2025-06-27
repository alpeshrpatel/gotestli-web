import MetaComponent from "@/components/common/MetaComponent";
import Preloader from "@/components/common/Preloader";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import React, { useEffect, useState } from "react";
import "./homepage.css";
import { API } from "@/utils/AxiosInstance";
import { auth } from "@/firebase/Firebase";

// const metadata = {
//   title: " Instructor Home || GoTestli - Ultimate School & General Purpose Quiz Platform",
//   description: "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges."
// };
// const pageMetadata = {
//   title: "Instructor Home - GoTestli Quiz Platform | Create, Manage & Track Educational Quizzes",
//   description: "Welcome to your GoTestli instructor dashboard. Create engaging quizzes, manage student assessments, track performance analytics, and deliver exceptional e-learning experiences with our comprehensive quiz creation and management tools.",
//   keywords: "instructor dashboard, gotestli instructor, quiz creator dashboard, teacher quiz platform, educational quiz management, instructor home, quiz creation tools, student assessment platform, quiz analytics, instructor portal, teaching dashboard, quiz maker for educators, classroom quiz platform, online assessment tools, instructor quiz management",
//   canonical: "https://gotestli.com/instructor/home",
//   category: "Instructor Dashboard",
//   subject: "Instructor Home, Quiz Management, Educational Dashboard, Teaching Tools",
//   audience: "Instructors, Teachers, Educators, Course Creators, Training Professionals"
// };
const pageMetadata = {
  title: "Instructor Home – GoTestli Quiz Platform | Create, Manage & Analyze Educational Quizzes",
  description:
    "Welcome to your GoTestli instructor dashboard. Effortlessly create engaging quizzes, manage student assessments, analyze performance data, and deliver exceptional e-learning experiences with our powerful quiz creation and management tools.",
  keywords:
    "instructor dashboard, gotestli instructor home, quiz creator dashboard, teacher quiz platform, educational quiz management, quiz creation tools, student assessment platform, quiz analytics, instructor portal, teaching dashboard, online quiz builder, classroom quiz platform, instructor tools, educational technology, online assessment tools",
  canonical: "https://gotestli.com/instructor/home",
  category: "Instructor Dashboard, Educational Management, Teaching Tools",
  subject: "Instructor Home, Quiz Management, Teaching Dashboard, E-Learning Tools",
  audience: "Instructors, Teachers, Educators, Course Creators, Training Professionals, Educational Institutions"
};


const HomePage = () => {
  const [questionSets, setQuestionSets] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    const author = auth.currentUser.displayName;
    async function getQuestionSets() {
      const { data } = await API.get(`/api/instructor/questionset/${author}`);
       // console.log(data);
      setQuestionSets(data);
    }
    getQuestionSets();
  }, []);

  async function handleRowClick(id, index) {
    setExpandedRow(index === expandedRow ? null : index);
    if (index !== expandedRow) {
      try {
        const { data } = await API.get(`/api/get/userslist/${id}`);
         // console.log(data)
        setStudentsData(data);
      } catch (error) {
        console.error("Failed to fetch student data:", error);
      }
    }
  }

  return (
    <div>
      <Preloader />
      <MetaComponent meta={pageMetadata} />
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
                              {studentsData.map((student, i) => (
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
