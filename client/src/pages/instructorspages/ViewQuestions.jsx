import React, { useEffect, useState } from "react";
import Preloader from "@/components/common/Preloader";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import { API } from "@/utils/AxiosInstance";
import { auth } from "@/firebase/Firebase";
import { Link, useLocation, useParams } from "react-router-dom";
import { Breadcrumbs } from "@mui/material";
import Typography from "@mui/material/Typography";

// import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const ViewQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userRole = user.role;
  useEffect(() => {
    // const author = auth.currentUser.displayName;
    async function getQuestions() {
      try {
        const { data } = await API.get(
          `/api/questionset/questions/${id}`
        );
        console.log(data);
        setQuestions(data);
      } catch (error) {
        console.error("Failed to fetch Questions data:", error);
      }
    }
    getQuestions();
  }, []);
  console.log(isHovered);
  return (
    <div>
      <Preloader />
      <Header userRole={userRole} />
      <div className="content-wrapper js-content-wrapper overflow-hidden w-100">
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{ marginTop: "130px", display: "flex", justifyContent: "center" }}
        >
          <Link
            to="/instructor/home"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Typography
              variant="h7"
              style={{
                color: isHovered ? "blue" : "black",
                textDecoration: isHovered ? "underline" : "none",
              }}
            >
              Home
            </Typography>
          </Link>

          <Typography sx={{ color: "text.primary" }} variant="h6">
            View Questions
          </Typography>
        </Breadcrumbs>
        {questions.length > 0 ? (
          <div className="table-responsive mt-1" style={{ paddingTop: "20px" }}>
            <table className="custom-table Question-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Question</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((Question, i) => (
                  <tr key={Question.id}>
                    <td>{i + 1}</td>
                    <td>{Question.question}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h4 className="no-content text-center">
            This Questionsets not have any questions! 🌟 
          </h4>
        )}
      </div>
      <FooterOne />
    </div>
  );
};

export default ViewQuestions;
