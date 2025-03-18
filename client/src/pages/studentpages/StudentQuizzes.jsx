import MetaComponent from "@/components/common/MetaComponent";
import Preloader from "@/components/common/Preloader";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import React, { useEffect, useState } from "react";

import { API } from "@/utils/AxiosInstance";
import { auth } from "@/firebase/Firebase";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { downloadCertificate } from "@/components/quiz/downloadCertificate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import Table from "@/components/common/CommonTable";
import {
  Button,
  IconButton,
  MenuItem,
  Select,
  TableCell,
  TextField,
} from "@mui/material";
import CommonTable from "@/components/common/CommonTable";
import { Rating } from "react-simple-star-rating";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import {
  contentQualityTooltips,
  difficultyTooltips,
  satisfactionTooltips,
} from "@/components/quiz/QuizResult";
import { BootstrapTooltip } from "@/components/common/Tooltip";
import ExamInstructions from "@/components/quiz/examInstructions/ExamInstructions";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import QuizReport from "@/components/quiz/QuizReport";
import { showToast } from "@/utils/toastService";

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
  { id: "status", label: "Status", sortable: true },
  { id: "marks_obtained", label: "Marks", sortable: true },
  { id: "percentage", label: "Percentage", sortable: true },
  { id: "mode", label: "Mode", sortable: false },
  { id: "result", label: "Result", sortable: true },
  { id: "review", label: "Review", sortable: true },
  { id: "report", label: "Report", sortable: true },
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
  const [questionSetId, setQuestionSetId] = useState();
  const [open, setOpen] = useState(false);
  const [openExamIns, setOpenExamIns] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [selectedAttemptId, setSelectedAttemptId] = useState(null);
  const [questionSet, setQuestionsSet] = useState([]);
  const [quiz, setQuiz] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [percentageFilter, setPercentageFilter] = useState("");
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
  async function getQuestionSets(page = 1, rowsPerPage = 10) {
    const start = (page - 1) * rowsPerPage + 1;
    const end = page * rowsPerPage;
    try {
      if (token) {
        let url = ''
        if(searchQuery){
            url = `/api/userresult/pagelimit/user/${userId}?start=${start}&end=${end}&search=${encodeURIComponent(searchQuery)}`;
        }else{
          url = `/api/userresult/pagelimit/user/${userId}?start=${start}&end=${end}`
        }
        const { data } = await API.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(data);
        setQuestionSets(data.res);
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
        showToast("error","Your Session timedout!");
        navigate("/login");
        return;
      }
    }
  }
  useEffect(() => {
    // const author = auth.currentUser.displayName;
   
    getQuestionSets();
  }, [searchQuery]);

  const handleFetchedReview = async (qSetId) => {
    try {
      if (token) {
        onOpenModal();
        setQuestionSetId(qSetId);
        const { data } = await API.get(
          `/api/reviews/qset/${qSetId}/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (data.review_id) {
          // console.log(data);
          setGivenReview(data);
          setRating({
            satisfaction: data.satisfaction || 0,
            difficulty: data.difficulty || 0,
            contentQuality: parseInt(data.content_quality) || 0,
          });
          setReview(data.review || "");
          onOpenModal();
        } else {
          // console.log("null loaded!");
          setGivenReview({});
          setRating({
            satisfaction: 0,
            difficulty: 0,
            contentQuality: 0,
          });
          setReview("");
          onOpenModal();
        }
        // onOpenModal()
      }
    } catch (error) {
      if (error.status == 403) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        showToast("error","Your Session timedout!");
        navigate("/login");
        return;
      }
      throw error;
    }
  };
  const submitSurvey = async () => {
    try {
      if (token) {
        if (givenReview?.review_id) {
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
            showToast("success","Review updated!");
            navigate("/");
          }
        } else {
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
            showToast("success","Thank you for giving review!");
            navigate("/");
          }
        }
      }
    } catch (error) {
      if (error.status == 403) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // showToast("error","Invaild token!");
        navigate("/login");
        return;
      }
      throw error;
    }
  };
  // console.log(questionSets);

  const handleRating = (name, newRating) => {
    setRating((prev) => ({ ...prev, [name]: newRating }));
  };
  const handleReviewChange = (e) => {
    if (e.target.value.length <= maxCharacters) {
      setReview(e.target.value);
    }
  };

  const onOpenExamInsModal = (id) => {
    async function getQuestions() {
      try {
        if (token) {
          const response = await API.get(`/api/questionset/questions/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setQuestionsSet(response.data);
        }
      } catch (error) {
        if (error.status == 403) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          // showToast("error","Invaild token!");
          navigate("/login");
          return;
        }
        // console.log(error);
      }
    }
    getQuestions();
    setOpenExamIns(true);
  };

  const onCloseExamInsModal = () => setOpenExamIns(false);

  const onCloseReportModal = () => setOpenReport(false);
  const onOpenReportModal = (attemptId) => {
    setSelectedAttemptId(attemptId);
    setOpenReport(true);
  };

  const handleInProgressClick = (quiz) => {
    setQuiz(quiz);
    onOpenExamInsModal(quiz.question_set_id);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredData = questionSets.filter((quiz) =>
    // Object.values(quiz).some((value) =>
    //   value ? value.toString().toLowerCase().includes(searchQuery) : false
    // )
    quiz.title.toLowerCase().includes(searchQuery) ||
    quiz?.short_desc.toLowerCase().includes(searchQuery) ||
    quiz?.tags.toLowerCase().includes(searchQuery) ||
    quiz.author.toLowerCase().includes(searchQuery) ||
    (quiz.status == 1 || quiz.status == 0
      ? "completed".includes(searchQuery)
      : "in progress".includes(searchQuery))
      ? true
      : false
  );

  const handleFilterChange = (filter, value) => {
    switch (filter) {
      case "status":
        setStatusFilter(value);
        break;
      case "author":
        setAuthorFilter(value);
        break;
      case "percentage":
        setPercentageFilter(value);
        break;
      default:
        break;
    }
  };

  const filteredDataByFilter = questionSets
    .filter(
      (quiz) =>
        quiz.title.toLowerCase().includes(searchQuery) ||
        quiz.author.toLowerCase().includes(authorFilter.toLowerCase())
    )
    .filter((quiz) => (statusFilter ? quiz.status === statusFilter : true))
    .filter((quiz) =>
      percentageFilter ? quiz.percentage >= percentageFilter : true
    )
    .filter((quiz) => {
      if (dateRange.start && dateRange.end) {
        const quizDate = new Date(quiz.created_date);
        return (
          quizDate >= new Date(dateRange.start) &&
          quizDate <= new Date(dateRange.end)
        );
      }
      return true;
    });
    console.log(questionSets)

  const getRowId = (row, index) => index;

  const renderRowCells = (quiz, index) => (
    <>
      <TableCell>{index + 1}</TableCell>
      <TableCell className="text-truncate" sx={{ maxWidth: "100px" }}>
        <BootstrapTooltip title={quiz.title}>{quiz.title}</BootstrapTooltip>
      </TableCell>
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
        {quiz.status == 1 || quiz.status == 0 ? (
          "Completed"
        ) : (
          <BootstrapTooltip title="Click to Attempt it">
            <button
              onClick={() => handleInProgressClick(quiz)}
              style={{
                textDecoration: "underline",
                color: "blue",
                // textAlign: "center",
              }}
            >
              In Progress
            </button>
          </BootstrapTooltip>
        )}
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
      <TableCell>
        {quiz.status == 1 || quiz.status == 0 ? (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => onOpenReportModal(quiz.user_test_result_id)}
          >
            Report
          </Button>
        ) : (
          "-"
        )}
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
          <>
            <div className="table-responsive">
              <div
                className="header-search__field position-relative d-flex align-items-center rounded-5 mt-10"
                style={{ height: "40px", width: "300px" }}
              >
                <SearchIcon
                  className="position-absolute ms-3 text-muted"
                  style={{ fontSize: "20px" }}
                />
                <input
                  required
                  type="text"
                  className="form-control ps-5 pe-5 text-18 lh-12 text-dark-1 fw-500 w-100"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                {searchQuery && (
                  <CancelIcon
                    className="position-absolute end-0 me-3 text-muted"
                    fontSize="medium"
                    onClick={() => setSearchQuery("")}
                    style={{ cursor: "pointer" }}
                  />
                )}
              </div>
              {/* <div className="filter-bar">
                <TextField
                  label="Search Title"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <TextField
                  label="Author"
                  value={authorFilter}
                  onChange={(e) => handleFilterChange("author", e.target.value)}
                />
                <Select
                  value={statusFilter}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                >
                  <MenuItem value="">All Statuses</MenuItem>
                  <MenuItem value={1}>Completed</MenuItem>
                  <MenuItem value={0}>In Progress</MenuItem>
                </Select>
                <TextField
                  type="number"
                  label="Minimum Percentage"
                  value={percentageFilter}
                  onChange={(e) =>
                    handleFilterChange("percentage", e.target.value)
                  }
                />
                <TextField
                  type="date"
                  label="Start Date"
                  value={dateRange.start}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, start: e.target.value })
                  }
                />
                <TextField
                  type="date"
                  label="End Date"
                  value={dateRange.end}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, end: e.target.value })
                  }
                />
              </div> */}
              {searchQuery && filteredData.length <= 0 ? (
                <h4 className="no-content text-center">
                  It looks a bit empty here! 🌟 No fields matched!
                </h4>
              ) : (
                <CommonTable
                  columns={columns}
                  
                  getRowId={getRowId}
                  renderRowCells={renderRowCells}
                  fetchData={getQuestionSets}
                  // tableData={filteredData.length > 0 ? filteredData : questionSets}
                />
              )}
            </div>
          </>
        ) : (
          <h4 className="no-content text-center">
            It looks a bit empty here! 🌟 Please attend amazing Quizzes and
            Start your Learning journey with us!
          </h4>
        )}

        <FooterOne />
      </div>
      <Modal open={openExamIns} onClose={onCloseExamInsModal} center>
        <ExamInstructions
          id={quiz?.question_set_id}
          time={quiz?.time_duration}
          questionSet={questionSet}
          data={quiz}
          onCloseModal={onCloseExamInsModal}
        />
      </Modal>
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
      <Modal open={openReport} onClose={onCloseReportModal} center>
        <QuizReport attemptId={selectedAttemptId} />
      </Modal>
    </div>
  );
};

export default StudentQuizzes;
