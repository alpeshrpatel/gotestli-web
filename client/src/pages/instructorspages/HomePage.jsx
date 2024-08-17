import MetaComponent from "@/components/common/MetaComponent";
import Preloader from "@/components/common/Preloader";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import React, { useEffect, useState } from "react";
import "./homepage.css";
import { API } from "@/utils/AxiosInstance";
import { auth } from "@/firebase/Firebase";

const metadata = {
  title:
    "Home-1 || Educrat - Professional LMS Online Education Course ReactJS Template",
  description:
    "Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.",
};

const HomePage = () => {
  const [questionSets, setQuestionSets] = useState([]);

  useEffect(() => {
    const author = auth.currentUser.displayName;
    async function getQuestionSets() {
      const { data } = await API.get(`/api/instructor/questionset/${author}`);
      console.log(data);
      setQuestionSets(data);
    }
    getQuestionSets();
  }, []);
  return (
    <div>
      <Preloader />
      <MetaComponent meta={metadata} />
      <Header />

      <div className="content-wrapper  js-content-wrapper overflow-hidden w-100">
        {questionSets.length > 0 ? (
          <div class="table-responsive ">
            <table class="custom-table">
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
                  <tr>
                    <td>{index+1}</td>
                    <td>{set.title}</td>
                    <td>{set.short_desc}</td>
                    <td>{set.no_of_question}</td>
                    <td>{set.time_duration}</td>
                    <td>{set.totalmarks}</td>
                    <td>{set.is_demo ? 'Private' : 'Public'  }</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h4>Create Your own QuestionSet... </h4>
        )}

        <FooterOne />
      </div>
    </div>
  );
};

export default HomePage;
