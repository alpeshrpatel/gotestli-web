import MetaComponent from "@/components/common/MetaComponent";
import Preloader from "@/components/common/Preloader";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import React, { useEffect, useState } from "react";

import { API } from "@/utils/AxiosInstance";
import { auth } from "@/firebase/Firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { downloadCertificate } from "@/components/quiz/downloadCertificate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import Table from "@/components/common/CommonTable";
import { IconButton, TableCell } from "@mui/material";
import CommonTable from "@/components/common/CommonTable";
import { Rating } from "react-simple-star-rating";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { contentQualityTooltips, difficultyTooltips, satisfactionTooltips } from "@/components/quiz/QuizResult";

const metadata = {
  title:
    " student Home || GoTestli - Ultimate School & General Purpose Quiz Platform",
  description:
    "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges.",
};

const columns = [
  { id: "index", label: "#", sortable: false },
  { id: "title", label: "Quiz Title", sortable: true },
  { id: "created_date", label: "Start Date", sortable: true },
  { id: "modified_date", label: "Complete Date", sortable: true },
  { id: "status", label: "Status", sortable: false },
  { id: "marks_obtained", label: "Marks", sortable: true },
  { id: "percentage", label: "Percentage", sortable: true },
  { id: "mode", label: "Mode", sortable: false },
  { id: "result", label: "Result", sortable: true },
  { id: "review", label: "Review", sortable: true },
  { id: "download", label: "Download", sortable: false },
];

const StudentQuizzes = () => {
  const [questionSets, setQuestionSets] = useState([]);
  const [givenReview, setGivenReview] = useState();
  const [rating, setRating] = useState({
    satisfaction: 0,
    difficulty: 0,
    contentQuality: 0,
  });

  const [review, setReview] = useState("");
  const [questionSetId,setQuestionSetId] = useState();
  const [open, setOpen] = useState(false);
  // const [studentsData, setStudentsData] = useState([]);
  // const [expandedRow, setExpandedRow] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userRole = user.role;
  let userId = user.id;
  const maxCharacters = 500;
  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => setOpen(false);
  useEffect(() => {
    // const author = auth.currentUser.displayName;
    async function getQuestionSets() {
      try {
        if (token) {
          const { data } = await API.get(`/api/userresult/user/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(data);
          setQuestionSets(data);
        }
      } catch (error) {
        if (error.status == 403) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          toast.error("Your Session timedout!");
          navigate("/login");
          return;
        }
      }
    }
    getQuestionSets();
  }, []);

  const handleFetchedReview = async (qSetId) => {
    try {
      if (token) {
        onOpenModal()
        setQuestionSetId(qSetId)
        const { data } = await API.get(
          `/api/reviews/qset/${qSetId}/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (data.review_id) {
          console.log(data);
          setGivenReview(data);
          setRating({
            satisfaction: data.satisfaction || 0,
            difficulty: data.difficulty || 0,
            contentQuality: parseInt(data.content_quality) || 0,
          });
          setReview(data.review || '');
           onOpenModal()
        }else{
          setRating({
            satisfaction:  0,
            difficulty: 0,
            contentQuality:  0,
          });
          setReview('');
          onOpenModal()
        }
        // onOpenModal()
      }
    } catch (error) {
      if (error.status == 403) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast.error("Your Session timedout!");
        navigate("/login");
        return;
      }
      throw error;
    }
  };
  const submitSurvey = async () => {
    try {
      if (token) {
        if(!givenReview?.review_id){
          const res = await API.post(
            "/api/reviews",
            {
              questionset_id: questionSetId,
              satisfaction: rating.satisfaction,
              difficulty: rating.difficulty,
              content_quality: rating.contentQuality,
              review: review,
              created_by: userId,
              modified_by: userId,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (res.status == 200) {
            toast.success("Thank you for giving review!");
            navigate("/");
          }
        }else{
          const res = await API.put(
            `/api/reviews/update/qset/${questionSetId}/user/${userId}`,
            {
             
              satisfaction: rating.satisfaction,
              difficulty: rating.difficulty,
              content_quality: rating.contentQuality,
              review: review,
              
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (res.status == 200) {
            toast.success("Review updated!");
            navigate("/");
          }
        }
        
      }
    } catch (error) {
      if (error.status == 403) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // toast.error("Invaild token!");
        navigate("/login");
        return;
      }
      throw error;
    }
  };
  console.log(questionSets);

  const handleRating = (name, newRating) => {
    setRating((prev) => ({ ...prev, [name]: newRating }));
  };
  const handleReviewChange = (e) => {
    if (e.target.value.length <= maxCharacters) {
      setReview(e.target.value);
    }
  };

  const getRowId = (row, index) => row.id;

  const renderRowCells = (quiz, index) => (
    <>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{quiz.title}</TableCell>
      <TableCell>
        {quiz.created_date
          ? quiz.created_date.slice(0, 19).replace("T", " ")
          : "---"}
      </TableCell>
      <TableCell>
        {quiz.modified_date && quiz.status == 1
          ? quiz.modified_date.slice(0, 19).replace("T", " ")
          : "---"}
      </TableCell>
      <TableCell>
        {quiz.status == 1 || quiz.status == 0 ? "Completed" : "In Progress"}
      </TableCell>
      <TableCell>{quiz.marks_obtained}</TableCell>
      <TableCell>{quiz.percentage}</TableCell>
      <TableCell>Exam</TableCell>
      <TableCell>
        {quiz.percentage >= quiz?.pass_percentage ? "Pass" : "Fail"}
      </TableCell>
      <TableCell
        onClick={() => handleFetchedReview(quiz.question_set_id)}
        style={{
          textDecoration: "underline",
          color: "blue",
          // textAlign: "center",
        }}
      >
        Review
      </TableCell>
      <TableCell style={{}}>
        {quiz.percentage >= quiz?.pass_percentage ? (
          <IconButton
            onClick={() =>
              downloadCertificate(
                quiz.first_name + " " + quiz?.last_name,
                quiz.percentage,
                quiz.title,
                quiz?.tags?.split(",")[0],
                quiz.author
              )
            }
          >
            <FontAwesomeIcon
              icon={faFileArrowDown}
              style={{ fontSize: "30px", color: "#4CAF50" }}
            />
          </IconButton>
        ) : null}
      </TableCell>
    </>
  );
  return (
    <div>
      <Preloader />
      <MetaComponent meta={metadata} />
      <Header userRole={userRole} />

      <div className="content-wrapper js-content-wrapper overflow-hidden w-100">
        {questionSets.length > 0 ? (
          // <div className="table-responsive">
          //   <table className="custom-table">
          //     <thead>
          //       <tr>
          //         <th>#</th>
          //         <th>Quiz Title</th>
          //         <th>Start Date</th>
          //         <th>Complete Date</th>
          //         <th>Status</th>
          //         <th>Marks</th>
          //         <th>Percentage</th>

          //         <th>Mode</th>
          //         <th>Result</th>
          //         <th>Download</th>
          //       </tr>
          //     </thead>
          //     <tbody>
          //       {questionSets.map((quiz, index) => (
          //         <React.Fragment key={quiz.id}>
          //           <tr>
          //             <td>{index + 1}</td>
          //             <td>{quiz.title}</td>
          //             {quiz.created_date ? (
          //               <td>
          //                 {quiz.created_date.slice(0, 19).replace("T", " ")}
          //               </td>
          //             ) : (
          //               <td> --- </td>
          //             )}
          //             {quiz.modified_date && quiz.status == 1 ? (
          //               <td>
          //                 {quiz.modified_date.slice(0, 19).replace("T", " ")}
          //               </td>
          //             ) : (
          //               <td> --- </td>
          //             )}
          //             <td>
          //               {quiz.status == 1 || quiz.status == 0
          //                 ? "Completed"
          //                 : "In Progress"}
          //             </td>
          //             <td>{quiz.marks_obtained}</td>
          //             <td>{quiz.percentage}</td>
          //             <td>Exam</td>
          //             <td>
          //               {quiz.percentage >= quiz?.pass_percentage
          //                 ? "Pass"
          //                 : "Fail"}
          //             </td>
          //             <td style={{textAlign:'center'}}>
          //               {quiz.percentage >= quiz?.pass_percentage ? (
          //                 <FontAwesomeIcon
          //                   icon={faFileArrowDown}
          //                   style={{ fontSize: "30px", color: "#4CAF50" }}
          //                   onClick={() =>
          //                     downloadCertificate(
          //                       quiz.first_name + " " + quiz?.last_name,
          //                       quiz.percentage,
          //                       quiz.title,
          //                       quiz?.tags?.split(',')[0],
          //                       quiz.author
          //                     )
          //                   }
          //                 />
          //               ) : null}
          //             </td>
          //           </tr>
          //         </React.Fragment>
          //       ))}
          //     </tbody>
          //   </table>
          // </div>
          <div className="table-responsive">
            <CommonTable
              columns={columns}
              data={questionSets}
              getRowId={getRowId}
              renderRowCells={renderRowCells}
            />
          </div>
        ) : (
          <h4 className="no-content text-center">
            It looks a bit empty here! 🌟 Please attend amazing Quizzes and
            Start your Learning journey with us!
          </h4>
        )}

        <FooterOne />
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <div className="col-12 rounded p-5 border-1">
          <h5 className="mb-2">
            How satisfied are you with the quiz you just completed?
          </h5>
          <Rating
            onClick={(newRating) => handleRating("satisfaction", newRating)}
            initialValue={rating.satisfaction}
            ratingValue={rating.satisfaction}
            size={50}
            tooltipArray={satisfactionTooltips}
            showTooltip
            activeColor="#ffd700"
            emptyColor="#d3d3d3"
          />
          <h5 className="mb-2">How difficult did you find the quiz?</h5>
          <Rating
            onClick={(newRating) => handleRating("difficulty", newRating)}
            initialValue={rating.difficulty}
            ratingValue={rating.difficulty}
            size={50}
            tooltipArray={difficultyTooltips}
            showTooltip
            activeColor="#ffd700"
            emptyColor="#d3d3d3"
          />
          <h5 className="mb-2">
            How would you rate the quality of the content?
          </h5>
          <Rating
            onClick={(newRating) => handleRating("contentQuality", newRating)}
            initialValue={rating.contentQuality}
            ratingValue={rating.contentQuality}
            size={50}
            tooltipArray={contentQualityTooltips}
            showTooltip
            activeColor="#ffd700"
            emptyColor="#d3d3d3"
          />
          <div className="mt-4">
            <h5 className="mb-2">Write a review (Optional)</h5>
            <textarea
              className="form-control"
              rows="5"
              placeholder="Share your feedback here..."
              value={review}
              onChange={handleReviewChange}
            ></textarea>
            <div className="text-muted">
              {maxCharacters - review.length} characters remaining
            </div>
          </div>
          <button
            className="button -sm px-20 py-20 -outline-green-5 text-green-5 text-16 fw-bolder lh-sm mx-auto"
            onClick={submitSurvey}
          >
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default StudentQuizzes;
