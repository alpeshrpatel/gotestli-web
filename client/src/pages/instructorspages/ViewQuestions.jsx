import React, { useEffect, useState } from "react";
import Preloader from "@/components/common/Preloader";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import { API } from "@/utils/AxiosInstance";
import { auth } from "@/firebase/Firebase";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Breadcrumbs, TableCell } from "@mui/material";
import Typography from "@mui/material/Typography";
import CommonTable from "@/components/common/CommonTable";

// import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const columns = [
  { id: "index", label: "#", sortable: false },
  { id: "question", label: "Question", sortable: true },
  { id: "comments", label: "Comments", sortable: false },
];

const ViewQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userRole = user?.role;
  const org = JSON.parse(localStorage.getItem("org")) || "";
  let orgid = org?.id || 0;

  async function getQuestions(page = 1, rowsPerPage = 10) {
    const start = (page - 1) * rowsPerPage + 1;
    const end = page * rowsPerPage;
    try {
      if (token) {
        const { data } = await API.get(`/api/questionset/questions/${id}?start=${start}&end=${end}&orgid=${orgid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
          console.log(data);
        setQuestions(data.res);
        const theNewObj = {
          data: data.res,
          totalRecords: data.totalRecords
        };
    
        console.log('Final theNewObj:', theNewObj);
        return theNewObj;
      }
    } catch (error) {
      if (error.status == 403) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // showToast("error","Invaild token!");
        navigate("/login");
        return;
      }
      console.error("Failed to fetch Questions data:", error);
    }
  }

  useEffect(() => {
    // const author = auth.currentUser.displayName;
    
    getQuestions();
  }, []);
   // console.log(isHovered);
   const handleViewCommentsClick = (questionId) => {
    navigate(`/quiz/question/comments/${questionId}`,{ state:{questionSetId:id}});
  };

  const getRowId = (row) => row.id;

  const renderRowCells = (question, index) => (
    <>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{question.question}</TableCell>
      <TableCell
        onClick={() => handleViewCommentsClick(question.question_id)}
        style={{
          textDecoration: "underline",
          color: "blue",
          textAlign: "center",
        }}
      >
        View
      </TableCell>
    </>
  );

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
            <CommonTable
              columns={columns}
              getRowId={getRowId}
              renderRowCells={renderRowCells}
              fetchData={getQuestions}
              // tableData={questions}
            />
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
