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
  { id: "comment", label: "Comment", sortable: true },
 
];

const ViewComments = () => {
  const [comments, setComments] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const { questionId } = useParams();
  const {questionSetId} = location.state;
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userRole = user.role;

  async function getComments(page = 1, rowsPerPage = 10) {
    const start = (page - 1) * rowsPerPage + 1;
    const end = page * rowsPerPage;
    try {
      if (token) {
        const { data } = await API.get(`/api/comments/type/question/question/${questionId}?start=${start}&end=${end}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
          console.log(data);
        setComments(data.res);
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
      console.error("Failed to fetch Comments:" , error)
    }
  }
  useEffect(() => {
    // const author = auth.currentUser.displayName;
    
    getComments();
  }, []);
 

  const getRowId = (row) => row.id;

  const renderRowCells = (comment, index) => (
    <>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{comment.comment}</TableCell>
     
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
          <Link
            to={`/quiz/questions/${questionSetId}`}
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
             Questions
            </Typography>
          </Link>
          
          <Typography sx={{ color: "text.primary" }} variant="h6">
            View Comments
          </Typography>
        </Breadcrumbs>
        {comments.length > 0 ? (
          <div className="table-responsive mt-1" style={{ paddingTop: "20px" }}>
            <CommonTable
              columns={columns}
              data={comments}
              getRowId={getRowId}
              renderRowCells={renderRowCells}
              fetchData={getComments}
              // tableData={comments}
            />
          </div>
        ) : (
          <h4 className="no-content text-center">
            This question not have any comments! 🌟
          </h4>
        )}
      </div>
      <FooterOne />
    </div>
  );
};

export default ViewComments;
