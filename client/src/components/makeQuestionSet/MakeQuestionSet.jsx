import React, { useEffect, useState, useMemo } from "react";
import "./MakeQuestionSet.css";
import { API } from "@/utils/AxiosInstance";

const MakeQuestionSet = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [questionSets, setQuestionSets] = useState([]);
  const [questionSetsQuestions, setQuestionSetsQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesResponse, questionsResponse] = await Promise.all([
          API.get("/categories"),
          API.get("/question_master"),
        ]);
        setCategories(categoriesResponse.data);
        setQuestions(questionsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const getQuestionSetId = async (categoryId) => {
    try {
      const { data } = await API.get(`/api/questionset/${categoryId}`);

      setQuestionSets(data);
    } catch (error) {
      console.error("Error fetching question set:", error);
    }
  };

  const handleFilter = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    setSelectedQuestions([])
    const filteredCategory = categories.find(
      (category) =>
        category.title?.toLowerCase() === selectedFilter?.toLowerCase()
    );
    if (filteredCategory) {
      getQuestionSetId(filteredCategory.id);
    }
    // else {
    //   setQuestions([]); // Clear questions if no category matches the filter
    // }
  };

  const getQuestionsFromQSetId = async (questionId) => {
    try {
      const { data } = await API.get(`/question_sets/${questionId}`);

      setQuestionSetsQuestions((prevQuestions) => [...prevQuestions, ...data]);
    } catch (error) {
      console.error("Error fetching question set:", error);
    }
  };

  useEffect(() => {
    setQuestionSetsQuestions([]);
    questionSets.forEach((q) => {
      getQuestionsFromQSetId(q.question_set_id);
    });
  }, [questionSets]);

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
    // question.question?.toLowerCase()?.includes(filter?.toLowerCase()))
  );

  console.log(selectedQuestions);

const questionSetStore = async (id,questionSetId,questionId) => {
  try {
    const res = await API.post('/api/post/questionset',{id,questionSetId,questionId})
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

  const handleSubmit = async() => {
    try {
      async function getId(){
        const {data} = await API.get('/api/get/last-question-set-id');
        const id = data[0].id + 1;
        const questionSetId = data[0].question_set_id + 1;
        return {id,questionSetId};
      }
      let { id, questionSetId } = await getId();
      selectedQuestions.forEach((question)=>{
         questionSetStore(id, questionSetId, question.id);
        id++;
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container">
      <h1>Make Question Set</h1>
      <input
        type="text"
        placeholder="Search questions..."
        value={searchTerm}
        onChange={handleSearch}
        className="searchInput"
      />
      <select value={filter} onChange={handleFilter} className="filterDropdown">
        <option value="">All</option>
        {categories.map((category, index) => (
          <option key={index} value={category?.title?.toLowerCase()}>
            {category.title}
          </option>
        ))}
      </select>
      <div className="checkboxContainer">
        <ul>
          {filteredQuestions.map((question, index) => (
            <div key={index} className="checkboxItem">
              <input
                type="checkbox"
                checked={selectedQuestions.includes(question)}
                onChange={() => handleCheckboxChange(question)}
              />
              <label>{question.question}</label>
            </div>
          ))}
        </ul>
        <button
          className="btn btn-success px-3 py-2 w-auto text-18 mt-4"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default MakeQuestionSet;
