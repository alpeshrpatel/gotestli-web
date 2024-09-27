import { useEffect, useState } from "react";
import "./MakeQuestionSet.css";
import { API } from "@/utils/AxiosInstance";
// import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
// import Pagination from "../common/Pagination";
import PaginationTwo from "../common/PaginationTwo";
import { TextField, Typography } from "@mui/material";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import QuestionSetDetailForm from "./QuestionSetDetailForm";
import Header from "../layout/headers/Header";
// import axios from "axios";


const MakeQuestionSet = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [questionSets, setQuestionSets] = useState([]);
  const [questionSetsQuestions, setQuestionSetsQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionSetId,setQuestionSetId] = useState();
  const [open, setOpen] = useState(false);
  const [pageCapicity,setPageCapicity] = useState(10);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const user = JSON.parse( localStorage.getItem('user')) || '';
  const userId = user.id;
  const userRole = user.role;
  const indexOfLastRecord = currentPage * pageCapicity;
  const indexOfFirstRecord = indexOfLastRecord - pageCapicity;
  let shouldRenderPagination = questions.length > pageCapicity;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, questionsResponse] = await Promise.all([
          API.get("/api/category"),
          API.get("/api/questionmaster"),
        ]);
        setCategories(categoriesResponse.data);
        setQuestions(questionsResponse.data);
      } catch (error) {
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
      const { data } = await API.get(`/api/questionset/category/${categoryId}`);

      setQuestionSets(data);
    } catch (error) {
      console.error("Error fetching question set:", error);
    }
  };
  console.log(questionSets);

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
  console.log("filtered: " + questionSets)

  const getQuestionsFromQSetId = async (questionId) => {
    try {
      const { data } = await API.get(`/api/questionset/questions/${questionId}`);

      setQuestionSetsQuestions((prevQuestions) => [...prevQuestions, ...data]);
    } catch (error) {
      console.error("Error fetching question set:", error);
    }
  };


  const handleCheckboxChange = (question) => {
    setSelectedQuestions((prevSelectedQuestions) =>
      prevSelectedQuestions.includes(question)
        ? prevSelectedQuestions.filter((q) => q !== question)
        : [...prevSelectedQuestions, question]
    );
  };

  const filteredQuestions = questions.filter(
    (question) =>
      question.question?.toLowerCase()?.includes(searchTerm?.toLowerCase()) &&
      (filter === "" ||
        questionSetsQuestions.some(
          (q) => q.question?.toLowerCase() === question.question?.toLowerCase()
        ))
  );

  console.log(selectedQuestions);
  const questionSetStore = async (jsonData) => {
    try {
      const res = await API.post("/api/questionset/question",
       jsonData
      );
     
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      async function getId() {
        const { data } = await API.get("/api/questionset/question/questionsetid");
       
        console.log(data)
        const questionsetid = data?.id + 1 || 1;
       setQuestionSetId(questionsetid)
        return {  questionsetid };
      }
      let {  questionsetid } = await getId();
      
      let jsonData = [];
      selectedQuestions.forEach((question) => {
        jsonData.push({question_set_id:questionsetid, question_id:question.id, userId:userId})
        
      });
      questionSetStore(jsonData);
      
     
      onOpenModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (event) =>{
    const value = event.target.value;
    setPageCapicity(parseInt(value))
  }
console.log(pageCapicity)
  return (
    <>
      <Header userRole={userRole}/>
      <div className="mx-auto" style={{ marginTop: "100px",width:'60vw', padding:'30px',backgroundColor:'#bfdeee',borderRadius:'10px',boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);'}}>
       <Typography variant="h4" sx={{textAlign:'center',marginBottom:'10px'}}>Make Question Set</Typography>
       
        <TextField id="outlined-search" label="Search Questions" type="search" className="searchInput mb-2" onChange={handleSearch}/>
        <select
          value={filter}
          onChange={handleFilter}
          className="filterDropdown"
        >
          <option value="">All</option>
          {categories.map((category, index) => (
            <option key={index} value={category?.title?.toLowerCase()}>
              {category.title}
            </option>
          ))}
        </select>
        <div className="checkboxContainer">
          <ul>
            {filteredQuestions
              .slice(indexOfFirstRecord, indexOfLastRecord)
              .map((question, index) => (
                <div key={index} className="checkboxItem gap-2 text-black ">
                  <input
                    className="p-2 border-0"
                    type="checkbox"
                    checked={selectedQuestions.includes(question)}
                    onChange={() => handleCheckboxChange(question)}
                  />
                  <label>{question.question}</label>
                </div>
              ))}
          </ul>
          {shouldRenderPagination && (
            <div className="w-75 m-auto d-flex align-items-center justify-content-center">
              <PaginationTwo
                pageNumber={currentPage}
                setPageNumber={setCurrentPage}
                data={questions}
                pageCapacity={pageCapicity}
              />
              <select className="filterDropdown" value={pageCapicity} onChange={handlePageChange} style={{margin:'auto 30px'}}>
                <option value='10'>10</option>
                <option value='25'>25</option>
                <option value='50'>50</option>
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
        <QuestionSetDetailForm selectedQuestions={selectedQuestions} categories = {categories} questionSetId = {questionSetId}/>
      </Modal>
    </>
  );
};

export default MakeQuestionSet;
