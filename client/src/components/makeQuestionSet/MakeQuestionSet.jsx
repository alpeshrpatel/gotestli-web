

import React, { useEffect, useState, useMemo } from "react";
import "./MakeQuestionSet.css";
import { API } from "@/utils/AxiosInstance";

const MakeQuestionSet = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [questionSets,setQuestionSets] = useState([])
  const [questionSetsQuestions,setQuestionSetsQuestions] = useState([])
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
        console.log("Categories:", categoriesResponse.data);
        console.log("Questions:", questionsResponse.data);
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
      console.log("Question Set ID:", data);
      setQuestionSets(data); // Update questions state here
    } catch (error) {
      console.error("Error fetching question set:", error);
    }
  };

  const handleFilter = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    const filteredCategory = categories.find(
      (category) => category.title?.toLowerCase() === selectedFilter?.toLowerCase()
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
      console.log("Question Sets :", data);
      setQuestionSetsQuestions(prevQuestions => [
        ...prevQuestions,
        ...data
      ]);
    } catch (error) {
      console.error("Error fetching question set:", error);
    }
  };
  console.log(questionSetsQuestions)

  useEffect(() => {
    console.log(questionSets);
    setQuestionSetsQuestions([])
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

  const filteredQuestions = 
      questions.filter(
        (question) =>
          question.question?.toLowerCase()?.includes(searchTerm?.toLowerCase()) &&
          (filter === "" ||
            questionSetsQuestions.some((q) => q.question?.toLowerCase() === question.question?.toLowerCase())
          )
            // question.question?.toLowerCase()?.includes(filter?.toLowerCase()))
      );
 
  

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
      </div>
    </div>
  );
};

export default MakeQuestionSet;
