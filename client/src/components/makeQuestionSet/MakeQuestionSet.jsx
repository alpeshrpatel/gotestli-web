import { useEffect, useState } from "react";
import "./MakeQuestionSet.css";
import { API } from "@/utils/AxiosInstance";
// import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
// import Pagination from "../common/Pagination";
import PaginationTwo from "../common/PaginationTwo";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import QuestionSetDetailForm from "./QuestionSetDetailForm";
import Header from "../layout/headers/Header";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BootstrapTooltip } from "../common/Tooltip";
// import axios from "axios";

const MakeQuestionSet = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [complexityFilter, setComplexityFilter] = useState("");
  const [filteredFromAll, setFilteredFromAll] = useState([]);
  const [complexityCounter, setComplexityCounter] = useState({
    easy: 0,
    medium: 0,
    hard: 0,
  });
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [questionSets, setQuestionSets] = useState([]);
  const [questionSetsQuestions, setQuestionSetsQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionSetId, setQuestionSetId] = useState();
  const [open, setOpen] = useState(false);
  const [pageCapicity, setPageCapicity] = useState(10);
  const [viewQuestion, setViewQuestion] = useState(true);
  const navigate = useNavigate();

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userId = user.id;
  const userRole = user.role;
  const indexOfLastRecord = currentPage * pageCapicity;
  const indexOfFirstRecord = indexOfLastRecord - pageCapicity;
  let shouldRenderPagination = questions.length > pageCapicity;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const [categoriesResponse, questionsResponse] = await Promise.all([
            API.get("/api/category", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
            API.get(`/api/questionmaster/user/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          ]);
          setCategories(categoriesResponse.data);
          setQuestions(questionsResponse.data);
          setFilteredFromAll(questionsResponse.data);
        }
      } catch (error) {
        if (error.status == 403) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          // showToast("error","Invaild token!");
          navigate("/login");
          return;
        }
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setQuestionSetsQuestions([]);
    questionSets.forEach((q) => {
      getQuestionsFromQSetId(q.question_set_id);
    });
  }, [questionSets]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const getQuestionSetId = async (categoryId) => {
    try {
      if (token) {
        const { data } = await API.get(
          `/api/questionset/category/${categoryId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setQuestionSets(data);
      }
    } catch (error) {
      if (error.status == 403) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // showToast("error","Invaild token!");
        navigate("/login");
        return;
      }
      console.error("Error fetching question set:", error);
    }
  };
  // console.log(questionSets);

  const handleFilter = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    setSelectedQuestions([]);

    const filteredCategory = categories.find(
      (category) =>
        category.title?.toLowerCase() === selectedFilter?.toLowerCase()
    );
    if (filteredCategory) {
      getQuestionSetId(filteredCategory.id);
    }
  };
  // console.log("filtered: " + questionSets);

  const getQuestionsFromQSetId = async (questionId) => {
    try {
      if (token) {
        const { data } = await API.get(
          `/api/questionset/questions/${questionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setQuestionSetsQuestions((prevQuestions) => [
          ...prevQuestions,
          ...data,
        ]);
      }
    } catch (error) {
      if (error.status == 403) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // showToast("error","Invaild token!");
        navigate("/login");
        return;
      }
      console.error("Error fetching question set:", error);
    }
  };

  const handleCheckboxChange = (question) => {
    setComplexityCounter((prevCount) => {
      const complexityKey = question?.complexity?.toLowerCase()
      return selectedQuestions.includes(question)
        ? {
            ...prevCount,
            [complexityKey]: (prevCount[complexityKey] || 0) - 1,
          }
        : {
            ...prevCount,
            [complexityKey]: (prevCount[complexityKey] || 0) + 1,
          };
    });
    setSelectedQuestions((prevSelectedQuestions) =>
      prevSelectedQuestions.includes(question)
        ? prevSelectedQuestions.filter((q) => q !== question)
        : [...prevSelectedQuestions, question]
    );
  };

  let filteredQuestions = questions.filter(
    (question) =>
      question.question?.toLowerCase()?.includes(searchTerm?.toLowerCase()) &&
      (filter === "" ||
        questionSetsQuestions.some(
          (q) => q.question?.toLowerCase() === question.question?.toLowerCase()
        ))
  );

  // console.log(selectedQuestions);
  const questionSetStore = async (jsonData) => {
    try {
      if (token) {
        const res = await API.post("/api/questionset/question", jsonData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // console.log(res);
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
  };

  const handleSubmit = async () => {
    try {
      if (token) {
        async function getId() {
          const { data } = await API.get(
            "/api/questionset/question/questionsetid",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // console.log(data);
          const questionsetid = data?.id + 1 || 1;
          setQuestionSetId(questionsetid);
          return { questionsetid };
        }
        let { questionsetid } = await getId();

        let jsonData = [];
        selectedQuestions.forEach((question) => {
          jsonData.push({
            question_set_id: questionsetid,
            question_id: question.id,
            userId: userId,
          });
        });
        questionSetStore(jsonData);

        onOpenModal();
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
  };

  const handlePageChange = (event) => {
    const value = event.target.value;
    setPageCapicity(parseInt(value));
  };
  // console.log(pageCapicity);

  const handleComplexityFilter = (event) => {
    const selectedFilter = event.target.value;
    // setComplexityFilter((prev) => (prev.toLowerCase().includes(selectedFilter.toLowerCase())) ? prev.replace(selectedFilter,'') : prev?.join(selectedFilter))
    let updatedComplexity = "";
    setComplexityFilter((prev) => {
      const lowerCaseSelectedFilter = selectedFilter.toLowerCase();
      if (prev.toLowerCase().includes(lowerCaseSelectedFilter)) {
        updatedComplexity = prev.replace(
          new RegExp(lowerCaseSelectedFilter, "gi"),
          ""
        );
        return prev.replace(new RegExp(lowerCaseSelectedFilter, "gi"), "");
      } else {
        updatedComplexity = `${prev}${selectedFilter}`;
        return `${prev}${selectedFilter}`;
      }
    });

    const filteredQuestions = questions.filter((question) => {
      const matchesSearch = question.question
        ?.toLowerCase()
        ?.includes(searchTerm?.toLowerCase());
      const matchesCategory =
        filter === "" ||
        questionSetsQuestions.some(
          (q) => q.question?.toLowerCase() === question.question?.toLowerCase()
        );
      const matchesComplexity =
        updatedComplexity
          ?.toLowerCase()
          ?.includes(question?.complexity?.toLowerCase()) ||
        updatedComplexity === "";
      // console.log("sf", selectedFilter);
      // console.log("qc", question?.complexity);
      return matchesSearch && matchesCategory && matchesComplexity;
    });

    setFilteredFromAll(filteredQuestions);
  };

  const handleActiveChange = async (questionId, value) => {
    // setStatus(value)
    try {
      if (token) {
        const { data } = await API.put(
          `/api/questionmaster/status/question/${questionId}`,
          {
            statusId: value,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        showToast("success","Status Change Saved Successfully!");

        setFilteredFromAll((prevQuestions) =>
          prevQuestions.map((question) =>
            question.id == questionId
              ? { ...question, status_id: value }
              : question
          )
        );

        setQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question.id == questionId
              ? { ...question, status_id: value }
              : question
          )
        );
      }
    } catch (error) {
      if (error.status == 403) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // showToast("error","Invaild token!");
        navigate("/login");
        return;
      }
    }
  };

  const handleViewChange = (selectedView) => {
    // setFilteredFromAll((prevQuestions) =>
    //   prevQuestions.filter((question) => question.status_id == checked)
    // );
    let filteredQuestions = [];
    if (selectedView === "all") {
      // Show all questions
      filteredQuestions = questions;
    } else if (selectedView === "active") {
      // Show only active questions (status_id truthy)
      filteredQuestions = questions.filter(
        (question) => question.status_id == 1
      );
      // setFilteredFromAll(questions.filter((question) => question.status_id));
    } else if (selectedView === "retired") {
      // Show only retired questions (status_id falsy)
      filteredQuestions = questions.filter((question) => !question.status_id);
    }

    setFilteredFromAll(filteredQuestions);
    setViewQuestion(selectedView);
  };
  console.log(viewQuestion);
  return (
    <>
      <Header userRole={userRole} />
      <div
        className="mx-auto"
        style={{
          marginTop: "100px",
          width: "60vw",
          padding: "30px",
          backgroundColor: "#bfdeee",
          borderRadius: "10px",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);",
        }}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: "center", marginBottom: "10px" }}
        >
          Make Question Set
        </Typography>
        <div>
          <TextField
            id="outlined-search"
            label="Search Questions"
            type="search"
            className="searchInput mb-2"
            onChange={handleSearch}
          />
        </div>

        <select
          value={filter}
          onChange={handleFilter}
          className="filterDropdown mb-2"
        >
          <option value="">All</option>
          {categories.map((category, index) => (
            <option key={index} value={category?.title?.toLowerCase()}>
              {category.title}
            </option>
          ))}
        </select>
        {/* <div style={{display:'flex'}}>
          <div style={{width:'33vw',display:'flex',gap:4,alignItems:'center'}}>
            <Typography variant="h6" gutterBottom>Easy</Typography>
            <div style={{border:'1px solid black', padding:'1px 6px', margin:'10px 0'}}>{complexityCounter.easy}</div>
          </div>
          <div style={{width:'33vw',display:'flex',gap:4,alignItems:'center'}}>
            <Typography variant="h6" gutterBottom>Medium</Typography>
            <div style={{border:'1px solid black', padding:'1px 6px', margin:'10px 0'}}>{complexityCounter.medium}</div>
          </div>
          <div style={{width:'33vw',display:'flex',gap:4,alignItems:'center'}}>
            <Typography variant="h6" gutterBottom>Hard</Typography>
            <div style={{border:'1px solid black', padding:'1px 6px', margin:'10px 0'}}>{complexityCounter.hard}</div>
          </div>
        </div> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            padding: "10px",
            background: "#f8f9fa",
            borderRadius: "6px",
          }}
        >
          {/* Easy Section */}
          <div
            style={{
              // width: "20%",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Checkbox
                value="easy"
                checked={complexityFilter?.toLowerCase()?.includes("easy")}
                onChange={handleComplexityFilter}
              />

              <label
                htmlFor="easy"
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "#155724",
                  marginBottom: 0,
                }}
              >
                Easy
              </label>
            </div>
            <div
              style={{
                border: "1px solid #155724",
                padding: "4px 12px",
                backgroundColor: "#d4edda",
                borderRadius: "4px",
                color: "#155724",
                fontWeight: "bold",
              }}
            >
              {complexityCounter.easy}
            </div>
          </div>

          {/* Medium Section */}
          <div
            style={{
              // width: "20%",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Checkbox
                value="medium"
                checked={complexityFilter.includes("medium")}
                onChange={handleComplexityFilter}
              />
              <label
                htmlFor="medium"
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "#856404",
                  marginBottom: 0,
                }}
              >
                Medium
              </label>
            </div>
            <div
              style={{
                border: "1px solid #856404",
                padding: "4px 12px",
                backgroundColor: "#fff3cd",
                borderRadius: "4px",
                color: "#856404",
                fontWeight: "bold",
              }}
            >
              {complexityCounter.medium}
            </div>
          </div>

          {/* Hard Section */}
          <div
            style={{
              // width: "20%",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Checkbox
                value="hard"
                checked={complexityFilter.includes("hard")}
                onChange={handleComplexityFilter}
              />
              <label
                htmlFor="hard"
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: "#721c24",
                  marginBottom: 0,
                }}
              >
                Hard
              </label>
            </div>
            <div
              style={{
                border: "1px solid #721c24",
                padding: "4px 12px",
                backgroundColor: "#f8d7da",
                borderRadius: "4px",
                color: "#721c24",
                fontWeight: "bold",
              }}
            >
              {complexityCounter.hard}
            </div>
          </div>
        </div>
        <div className="d-flex " style={{ justifyContent: "flex-start" }}>
          <div className="d-flex" style={{ justifyContent: "flex-start" }}>
            <FormControl>
              <RadioGroup
                aria-labelledby="view-questions-radio-group-label"
                defaultValue="all" // Default to "All" questions
                name="view-questions-radio-group"
                onChange={(e) => handleViewChange(e.target.value)}
                style={{ flexDirection: "row" }} // Horizontal layout
              >
                <FormControlLabel value="all" control={<Radio />} label="All" />
                <FormControlLabel
                  value="active"
                  control={<Radio />}
                  label="Active"
                />
                <FormControlLabel
                  value="retired"
                  control={<Radio />}
                  label="Retired"
                />
              </RadioGroup>
            </FormControl>
          </div>

          {/* <BootstrapTooltip title={'Toggle to see active or retire questions.'}>
                      <Switch
                        checked={viewQuestion}
                        onChange={(e) =>
                          handleViewChange( e.target.checked)
                        }
                        inputProps={{ "aria-label": "controlled" }}
                      />
                      </BootstrapTooltip> */}
        </div>

        <div className="checkboxContainer mt-3">
          <ul>
            {filteredFromAll &&
              filteredFromAll
                .slice(indexOfFirstRecord, indexOfLastRecord)
                .map((question, index) => (
                  <div
                    key={index}
                    className="checkboxItem gap-2 text-black d-flex justify-content-between"
                  >
                    <div
                      className="d-flex gap-2 "
                      style={{ alignItems: "center" }}
                    >
                      <BootstrapTooltip
                        title={"Toggle to activate or retire this question."}
                      >
                        <Switch
                          checked={question.status_id}
                          onChange={(e) =>
                            handleActiveChange(question.id, e.target.checked)
                          }
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </BootstrapTooltip>

                      <input
                        className="p-2 border-0"
                        type="checkbox"
                        checked={selectedQuestions.includes(question)}
                        onChange={() => handleCheckboxChange(question)}
                      />
                      <label>{question.question}</label>
                    </div>
                    <h6>{question.complexity}</h6>
                  </div>
                ))}
          </ul>
          {shouldRenderPagination && (
            <div className="w-75 m-auto d-flex align-items-center justify-content-center">
              <PaginationTwo
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                data={filteredFromAll}
                pageCapacity={pageCapicity}
              />
              <select
                className="filterDropdown"
                value={pageCapicity}
                onChange={handlePageChange}
                style={{ margin: "auto 30px" }}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          )}

          {selectedQuestions.length > 0 && (
            <button
              className="btn btn-success px-3 py-2 w-50 text-18 mt-4 mx-auto"
              onClick={handleSubmit}
            >
              Create
            </button>
          )}
        </div>
      </div>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        styles={{
          modal: {
            width: "75vw",
          },
        }}
      >
        <QuestionSetDetailForm
          selectedQuestions={selectedQuestions}
          categories={categories}
          questionSetId={questionSetId}
        />
      </Modal>
    </>
  );
};

export default MakeQuestionSet;
