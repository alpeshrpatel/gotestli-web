import CommonTable from "@/components/common/CommonTable";
import MetaComponent from "@/components/common/MetaComponent";
import Preloader from "@/components/common/Preloader";
import ReadOnlyOption from "@/components/common/ReadOnlyOption";
import { BootstrapTooltip } from "@/components/common/Tooltip";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import { API } from "@/utils/AxiosInstance";
import { showToast } from "@/utils/toastService";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Edit } from "@mui/icons-material";
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TableCell,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import { toast } from "react-toastify";

const pageMetadata = {
  title: "Question Bank - GoTestli Instructor Panel | Create & Manage Quiz Questions",
  description: "Create, edit, and organize your quiz questions on GoTestli. Build comprehensive question banks, manage multiple choice questions, add multimedia content, and streamline your quiz creation process with our powerful question management tools.",
  keywords: "instructor question bank, create quiz questions, question management, gotestli questions, quiz question builder, question library, multiple choice questions, quiz creation tools, question editing, instructor question panel, educational content creation, quiz bank management, question organization",
  canonical: "https://gotestli.com/instructor/questions",
  category: "Instructor Tools",
  subject: "Question Management, Quiz Creation, Content Development, Question Bank",
  audience: "Instructors, Teachers, Educators, Content Creators, Quiz Makers"
};

const CreateQuestionTable = () => {
  const [emptyRow, setEmptyRow] = useState([
    {
      org_id: "",
      paragraph_id: "",
      question: "",
      options: "",
      correctAnswer: "",
      description: "",
      explanation: "",
      question_type_id: "",
      status_id: "",
      complexity: "",
      marks: "",
      is_negative: "",
      negative_marks: "",
    },
  ]);
  const [questions, setQuestions] = useState([]);
  const [paragraph, setParagraph] = useState("");
  // const [changedQSet, setChangedQSet] = useState(JSON.parse(localStorage.getItem('createQuestionCache')?.changedQSet) || {
  //   org_id: 0,
  //   paragraph_id: "",
  //   question: "",
  //   options: "",
  //   correctAnswer: "",
  //   description: "",
  //   explanation: "",
  //   question_type_id: 2,
  //   status_id: 1,
  //   complexity: "easy",
  //   marks: 1,
  //   is_negative: 0,
  //   negative_marks: "",
  // });
  const [changedQSet, setChangedQSet] = useState(() => {
    const cachedData = localStorage.getItem('createQuestionCache');
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        return parsed.changedQSet || {
          org_id: 0,
          paragraph_id: "",
          question: "",
          options: "",
          correctAnswer: "",
          description: "",
          explanation: "",
          question_type_id: 2,
          status_id: 1,
          complexity: "easy",
          marks: 1,
          is_negative: 0,
          negative_marks: "",
        };
      } catch (error) {
        console.error('Error parsing localStorage data:', error);
        return {
          org_id: 0,
          paragraph_id: "",
          question: "",
          options: "",
          correctAnswer: "",
          description: "",
          explanation: "",
          question_type_id: 2,
          status_id: 1,
          complexity: "easy",
          marks: 1,
          is_negative: 0,
          negative_marks: "",
        };
      }
    }
    
    return {
      org_id: 0,
      paragraph_id: "",
      question: "",
      options: "",
      correctAnswer: "",
      description: "",
      explanation: "",
      question_type_id: 2,
      status_id: 1,
      complexity: "easy",
      marks: 1,
      is_negative: 0,
      negative_marks: "",
    };
  });
  const [options, setOptions] = useState([""]);
  const [correctOptions, setCorrectOptions] = useState([""]);

  const columns = [
    { id: "index", label: "#", sortable: false },
    { id: "question_type_id", label: "Type", sortable: false },
    // changedQSet?.question_type_id == 1 &&  { id: "paragraph", label: "Paragraph", sortable: false },

    { id: "question", label: "Question", sortable: true },
    { id: "options", label: "Options", sortable: true },
    { id: "correctAnswer", label: "Correct Option(s)", sortable: true },
    { id: "description", label: "Description", sortable: true },
    { id: "explanation", label: "Explanation", sortable: true },
    { id: "complexity", label: "Complexity", sortable: true },
    { id: "marks", label: "Marks", sortable: true },
    { id: "is_negative", label: "Negative", sortable: true },
    { id: "negative_marks", label: "Negative Marks", sortable: false },
  ];

  const [editOn, setEditOn] = useState(0);
  const [option, setOption] = useState("");
  const [correctOption, setCorrectOption] = useState("");
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const userRole = user?.role;
  const org = JSON.parse(localStorage.getItem("org")) || "";
  let orgid = org?.id || 0;
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  // async function fetchData(page = 1, rowsPerPage = 10) {
  //   const start = (page - 1) * rowsPerPage + 1;
  //   const end = page * rowsPerPage;
  //   try {
  //     if (token) {
  //       const { data } = await API.get(
  //         `/api/questionmaster/detailded/question/${userId}?start=${start}&end=${end}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`, 
  //           },
  //         }
  //       );
  //       console.log('================================',data)
  //       const questionsWithOptions = await Promise.all(
  //         data.map(async (question) => {
  //           const response = await API.get(`/api/options/${question.id}`, {
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //             },
  //           });
  //           console.log(response.data)
  //           const result = response?.data?.reduce(
  //             (acc, item) => {
  //               if (!acc.correctAnswer) acc.correctAnswer = [];
  //               if (!acc.options) acc.options = [];

  //               if (item.correctAnswer === 1) {
  //                 acc.correctAnswer.push(item.options);
  //               }

  //               acc.options.push(item.options);
  //               return acc;
  //             },
  //             { correctAnswer: [], options: [] }
  //           );

  //           return {
  //             ...question,
  //             correctAnswer: result.correctAnswer.join(":"),
  //             options: result.options.join(":"),
  //           };
  //         })
  //       );

  //       setQuestions(questionsWithOptions);
  //       console.log('data after promise.all',data)
  //       // showToast("success", "Questions Fetched Successfully!");
  //       return { data: [...data?.res] , totalRecords: data?.totalRecords}
  //     }
      
  //   } catch (error) {
  //     if (error.status === 403) {
  //       localStorage.removeItem("user");
  //       localStorage.removeItem("token");
  //       navigate("/login");
  //       return;
  //     }
  //     showToast("error", "Error occurred: " + error.message);
  //   }
  // }
  async function fetchData(page = 1, rowsPerPage = 5) {
    const start = (page - 1) * rowsPerPage + 1;
    const end = page * rowsPerPage;
    
    try {
      if (!token) {
        throw new Error('No token available');
      }
  
      // Fetch initial questions data
      const { data } = await API.get(
        `/api/questionmaster/detailded/question/${userId}?start=${start}&end=${end}&orgid=${orgid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
  
      // Check if we received valid data
      if (!data?.res || !Array.isArray(data.res)) {
        throw new Error('Invalid data received from API');
      }
  
      // Store the original data
      const originalData = [...data.res];
      const questionsWithOptions = data.res.map(question => {
        // Check if options exist
        if (question.options && Array.isArray(question.options)) {
          // Extract all option texts
          const optionTexts = question.options.map(opt => opt.options);
          
          // Find correct answer(s)
          const correctAnswers = question.options
            .filter(opt => opt.correctAnswer === 1)
            .map(opt => opt.options);
          
          return {
            ...question,
            options: optionTexts.join(':'),
            correctAnswer: correctAnswers.join(':')
          };
        } else {
          // If no options, return question with empty options and correctAnswer
          return {
            ...question,
            options: '',
            correctAnswer: ''
          };
        }
      });
      
      // Update state with the processed questions
      setQuestions(questionsWithOptions);
      // Fetch options for each question
      // const questionsWithOptions = await Promise.all(
        // const questionsWithOptions = originalData.map(async (question) => {
          // const response = await API.get(`/api/options/${question.id}?orgid=${orgid}`, {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // });
          // console.log('options data:', response)
        //   if (!data?.res?.options?.length <= 0) {
        //     return {
        //       ...question,
        //       correctAnswer: '',
        //       options: '',
        //     };
        //   }
        //   console.log('data:',data)
        //   const result = data?.res?.options?.reduce(
        //     (acc, item) => {
        //       if (!acc.correctAnswer) acc.correctAnswer = [];
        //       if (!acc.options) acc.options = [];
        //       if (item.correctAnswer === 1) {
        //         acc.correctAnswer.push(item.options);
        //       }
        //       acc.options.push(item.options);
        //       return acc;
        //     },
        //     { correctAnswer: [], options: [] }
        //   );
        //   console.log('result,', result)
        //   return {
        //     ...question,
        //     correctAnswer: result.correctAnswer.join(':'),
        //     options: result.options.join(':'),
        //   };
        // })
      // );
      // console.log(questionsWithOptions)
      // Update state with the processed questions
      // setQuestions(questionsWithOptions);
  
      // Create the final object using the original structure from API
      const theNewObj = {
        // data: data.res,
        data: questionsWithOptions,
        totalRecords: data.totalRecords
      };
  
      // console.log('Final theNewObj:', theNewObj);
      return theNewObj;
  
    } catch (error) {
      console.error('Error in fetchData:', error);
  
      if (error?.status === 403) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
        return 'came from error';
      }
  
      showToast('error', `Error occurred: ${error.message}`);
      return null;
    }
  }
  useEffect(() => {
    // async function getQuestions() {
    //   try {
    //     if (token) {
    //       const { data } = await API.get(
    //         `/api/questionmaster/detailded/question/${userId}`,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${token}`, 
    //           },
    //         }
    //       );

    //       const questionsWithOptions = await Promise.all(
    //         data.map(async (question) => {
    //           const response = await API.get(`/api/options/${question.id}`, {
    //             headers: {
    //               Authorization: `Bearer ${token}`,
    //             },
    //           });
    //           console.log(response.data)
    //           const result = response?.data?.reduce(
    //             (acc, item) => {
    //               if (!acc.correctAnswer) acc.correctAnswer = [];
    //               if (!acc.options) acc.options = [];

    //               if (item.correctAnswer === 1) {
    //                 acc.correctAnswer.push(item.options);
    //               }

    //               acc.options.push(item.options);
    //               return acc;
    //             },
    //             { correctAnswer: [], options: [] }
    //           );

    //           return {
    //             ...question,
    //             correctAnswer: result.correctAnswer.join(":"),
    //             options: result.options.join(":"),
    //           };
    //         })
    //       );

    //       setQuestions(questionsWithOptions);

    //       // showToast("success", "Questions Fetched Successfully!");
    //     }
    //   } catch (error) {
    //     if (error.status === 403) {
    //       localStorage.removeItem("user");
    //       localStorage.removeItem("token");
    //       navigate("/login");
    //       return;
    //     }
    //     showToast("error", "Error occurred: " + error.message);
    //   }
    // }

    fetchData();
  }, [token, userId, changedQSet]);

  function handleEdit(set, index) {
    setEditOn(set.id);
    onOpenModal();
    setChangedQSet(set);
    setOption('')
    setCorrectOption('')
  }

  async function handleQSetChange(name, value) {
   
    if (name == "question_type_id" && value == 1) {
      onOpenModal();
    }
    setChangedQSet((prev) => ({
      ...prev,
      [name]: value !== undefined ? value : "",
    }));
    localStorage.setItem('createQuestionCache', JSON.stringify({changedQSet:changedQSet}))
  }

  async function handleSave() {
    // setQuestions(changedQSet);
    localStorage.removeItem('createQuestionCache')
    

    try {
      if (token && validate()) {
        if (editOn) {
          const res1 = await API.delete(`/api/options/${editOn}`, {
            headers: {
              Authorization: `Bearer ${token}`,   
            },
          });
          // const res2 = await API.put(
          //   `/api/questionmaster/${editOn}`,
          //   {
          //     ...changedQSet,
          //     userId: userId,
          //     paragraph_id: response.data.id,
          //     org_id: 0,
          //     status_id: 1,
          //   },
          //   {
          //     headers: {
          //       Authorization: `Bearer ${token}`,
          //     },
          //   }
          // );
          const res3 = await API.delete(`/api/question/paragraph/${editOn}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        const response = await API.post(
          "/api/question/paragraph",
          { paragraph: paragraph, userId: userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
       
        let finalQId = 0;
        if (editOn) {
          const res2 = await API.put(
            `/api/questionmaster/${editOn}?orgid=${orgid}`,
            {
              ...changedQSet,
              userId: userId,
              paragraph_id: response.data.id,
              org_id: 0,
              status_id: 1,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
       
          finalQId = res2.data.id;
        } else {
          const res = await API.post(
            "/api/questionmaster",
            {
              ...changedQSet,
              userId: userId,
              paragraph_id: response.data.id,
              org_id: 0,
              status_id: 1,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (res.status === 409) {
            showToast(
              "error",
              "A question with the same title and description already exists!"
            );
          }
          finalQId = res.data.id;
        }
        // const res = await API.post(
        //   "/api/questionmaster",
        //   {
        //     ...changedQSet,
        //     userId: userId,
        //     paragraph_id: response.data.id,
        //     org_id: 0,
        //     status_id: 1,
        //   },
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }
        // );

        const { data } = await API.post(
          "/api/options",
          {
            qid: finalQId,
            options: changedQSet.options,
            correctAnswer: changedQSet.correctAnswer,
            userId: userId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      
        setChangedQSet({
          org_id: 0,
          paragraph_id: "",
          question: "",
          options: "",
          correctAnswer: "",
          description: "",
          explanation: "",
          question_type_id: 0,
          status_id: 1,
          complexity: "",
          marks: 0,
          is_negative: 0,
          negative_marks: 0,
        });
        onCloseModal();
        if (editOn) {
          showToast("success", "Question Edited Successfully!");
        } else {
          showToast("success", "Question Created Successfully!");
        }
      }
      // window.location.reload();
    } catch (error) {
      if (error.status == 403) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // showToast("error","Invaild token!");
        navigate("/login");
        return;
      }
      console.error(error);
      showToast("error", `Error occured: ${error}`);
      // console.log(error);
    }
  }
  async function handleAddOption() {
    let updatedOptionString = "";
    if (!changedQSet.options && option) {
      setChangedQSet((prev) => ({
        ...prev,
        options: option,
      }));
      updatedOptionString = option;
    } else if (option) {
      updatedOptionString = changedQSet?.options?.concat(`:${option}`);
      setChangedQSet((prev) => ({
        ...prev,
        options: changedQSet?.options?.concat(`:${option}`),
      }));
    }
    handleQSetChange("options", updatedOptionString);
    setOption("");
  }
  async function handleAddCorrectOption() {
    // if (correctOptions.length < 4) {
    //   setCorrectOptions([...correctOptions, ""]);
    // }
    let updatedOptionString = "";
    if (!changedQSet.correctAnswer && correctOption) {
      setChangedQSet((prev) => ({
        ...prev,
        correctAnswer: correctOption,
      }));
      updatedOptionString = correctOption;
    } else if (correctOption) {
      updatedOptionString = changedQSet?.correctAnswer?.concat(`:${correctOption}`);
      setChangedQSet((prev) => ({
        ...prev,
        correctAnswer: changedQSet?.correctAnswer?.concat(
          `:${correctOption}`
        ),
      }));
    }
    handleQSetChange("correctAnswer", updatedOptionString);
    setCorrectOption("");
  }

  // const validate = () => {
  //   const newErrors = {};

  //   if (!changedQSet.question_type_id)
  //     newErrors.question_type_id = "Type is required";
  //   if (!changedQSet.question) newErrors.question = "Question is required";
  //   if (!changedQSet.description)
  //     newErrors.description = "Description is required";
  //   if (!changedQSet.explanation)
  //     newErrors.explanation = "Explanation is required";
  //   if (!changedQSet.complexity)
  //     newErrors.complexity = "Complexity is required";
  //   if (!changedQSet.marks) newErrors.marks = "Marks is required";

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };
  const validate = () => {
  const newErrors = {};

  if (!changedQSet.question_type_id && changedQSet.question_type_id !== 0)
    newErrors.question_type_id = "Type is required";
  if (!changedQSet.question) newErrors.question = "Question is required";
  if (!changedQSet.description)
    newErrors.description = "Description is required";
  if (!changedQSet.explanation)
    newErrors.explanation = "Explanation is required";
  if (!changedQSet.complexity)
    newErrors.complexity = "Complexity is required";
  if (!changedQSet.marks && changedQSet.marks !== 0) 
    newErrors.marks = "Marks is required";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  // handle remove options functions
  const handleRemoveOption = (optionToRemove) => {
    const currentOptions = changedQSet.options?.split(":") || [];
    const updatedOptions = currentOptions.filter(opt => opt !== optionToRemove);
    const updatedOptionString = updatedOptions.join(":");
    
    // Also remove from correct answers if it exists there
    if (changedQSet.correctAnswer?.includes(optionToRemove)) {
      const currentCorrectOptions = changedQSet.correctAnswer?.split(":") || [];
      const updatedCorrectOptions = currentCorrectOptions.filter(opt => opt !== optionToRemove);
      const updatedCorrectOptionString = updatedCorrectOptions.join(":");
      
      setChangedQSet(prev => ({
        ...prev,
        options: updatedOptionString,
        correctAnswer: updatedCorrectOptionString
      }));
    } else {
      setChangedQSet(prev => ({
        ...prev,
        options: updatedOptionString
      }));
    }
  };

  const handleRemoveCorrectOption = (optionToRemove) => {
    const currentCorrectOptions = changedQSet.correctAnswer?.split(":") || [];
    const updatedCorrectOptions = currentCorrectOptions.filter(opt => opt !== optionToRemove);
    const updatedCorrectOptionString = updatedCorrectOptions.join(":");
    
    setChangedQSet(prev => ({
      ...prev,
      correctAnswer: updatedCorrectOptionString
    }));
  };

  console.log("changedqset:", changedQSet);
  const getRowId = (row) => row.id;
  const renderRowCells = (set, index) => (
    <>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{set?.question_type_id}</TableCell>
      <TableCell>
        <BootstrapTooltip title={set?.question}>
          <p
            className="text-truncate"
            style={{
              maxWidth: "200px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {" "}
            {set?.question}
          </p>
        </BootstrapTooltip>
      </TableCell>
      <TableCell>
        {" "}
        <BootstrapTooltip title={set?.options}>
          <p
            className="text-truncate"
            style={{
              maxWidth: "200px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {" "}
            {set?.options}
          </p>
        </BootstrapTooltip>
      </TableCell>
      <TableCell>
        {" "}
        <BootstrapTooltip title={set?.correctAnswer}>
          <p
            className="text-truncate"
            style={{
              maxWidth: "200px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {" "}
            {set?.correctAnswer}
          </p>
        </BootstrapTooltip>
      </TableCell>
      <TableCell>
        {" "}
        <BootstrapTooltip title={set?.description}>
          <p
            className="text-truncate"
            style={{
              maxWidth: "200px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {" "}
            {set?.description}
          </p>
        </BootstrapTooltip>
      </TableCell>
      <TableCell>
        {" "}
        <BootstrapTooltip title={set?.explanation}>
          <p
            className="text-truncate"
            style={{
              maxWidth: "200px",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {" "}
            {set?.explanation}
          </p>
        </BootstrapTooltip>
      </TableCell>
      <TableCell>{set?.complexity}</TableCell>
      <TableCell>{set?.marks}</TableCell>
      <TableCell>{set?.is_negative}</TableCell>
      <TableCell>{set?.negative_marks}</TableCell>
      <TableCell>
        <IconButton onClick={() => handleEdit(set, index)}>
          <Edit sx={{ color: "#3f51b5" }} />
        </IconButton>
      </TableCell>
    </>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Preloader />
      <MetaComponent meta={pageMetadata} />
      <Header userRole={userRole} />
      <Modal
        open={open}
        onClose={() => {}}
        showCloseIcon={false}
        center
        styles={{
          modal: {
            width: "70%",
            maxWidth: "80%",
          },
        }}
      >
        <div style={{ width: "100%" }}>
          <button
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "24px",
            }}
            onClick={onCloseModal}
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7a.996.996 0 1 0-1.41 1.41L10.59 12l-4.89 4.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.39-.38.39-1.02 0-1.4z" />
            </svg>
          </button>
          <div className="form-group">
            <label>Question Type</label>
            <select
              className=" px-10 py-2"
              required
              style={{ border: "1px solid gray", borderRadius: "5px" }}
              value={changedQSet.question_type_id || 2}
              onChange={(e) =>
                handleQSetChange("question_type_id", e.target.value)
              }
            >
              {/* <option value="">Select Question Type</option> */}
              <option value="2">Single Choice</option>
              <option value="1">Paragraph</option>
              <option value="6">Comprehensive</option>
              <option value="7">Multiple Choice</option>
            </select>
            {!changedQSet.question_type_id && errors.question_type_id && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.question_type_id}
              </p>
            )}
          </div>
          <div>
            {changedQSet?.question_type_id == 1 ? (
              <>
                {/* <h4>Add Paragraph</h4> */}
                <label>Add Paragraph</label>
                <textarea
                  type="text"
                  value={paragraph}
                  onChange={(e) => setParagraph(e.target.value)}
                  style={{
                    width: "350px",
                    maxHeight: "150px",
                    overflowY: "auto",
                  }}
                />
              </>
            ) : null}
          </div>
          <div className="form-group">
            <label>Question</label>
            <textarea
              required
              type="text"
              value={changedQSet.question}
              onChange={(e) => handleQSetChange("question", e.target.value)}
              style={{ maxHeight: "150px" }}
            />
            {!changedQSet.question && errors.question && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {errors.question}
              </p>
            )}
          </div>
          <div className="">
            <label>Options</label>
            <>
              <div
                style={{ display: "flex", gap: "4px", alignItems: "center" }}
              >
                <input
                  type="text"
                  value={option}
                  onChange={(e) => setOption(e.target.value)}
                />
                {
                  (changedQSet?.options?.split(":")?.length < 4 && option) && (
                    <button
                  className=""
                  onClick={handleAddOption}
                  style={{
                    height: "30px",
                    width: "42px",
                    backgroundColor: "#1565C0",
                    color: "white",
                    borderRadius: "100%",
                  }}
                >
                  {" "}
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="fs-5"
                    style={{ marginX: "auto" }}
                  />{" "}
                </button>
                  )
                }
                
              </div>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {changedQSet?.options?.split(":").map((option, index) => (
                  <ReadOnlyOption  key={index} 
                  option={option} 
                  onRemove={handleRemoveOption} />
                ))}
              </div>
            </>
          </div>
          <div className="">
            <label>Correct Option</label>
            <>
              <div
                style={{ display: "flex", gap: "4px", alignItems: "center" }}
              >
                <input
                  type="text"
                  value={correctOption}
                  onChange={(e) => setCorrectOption(e.target.value)}
                />
                {
                  (changedQSet?.correctAnswer?.split(":")?.length < 4 && correctOption) && (
                    <button
                  className=""
                  onClick={handleAddCorrectOption}
                  style={{
                    height: "30px",
                    width: "42px",
                    backgroundColor: "#1565C0",
                    color: "white",
                    borderRadius: "100%",
                  }}
                >
                  {" "}
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="fs-5"
                    style={{ marginX: "auto" }}
                  />{" "}
                </button>
                  )
                }
                
              </div>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {changedQSet?.correctAnswer
                  ?.split(":")
                  .map((option, index) => (
                    <ReadOnlyOption key={index} 
                    option={option} 
                    onRemove={handleRemoveCorrectOption}/>
                  ))}
              </div>
              {/* <input
                type="text"
                readOnly
                value={changedQSet.correctAnswer}
                onChange={(e) =>
                  handleQSetChange("correctAnswer", e.target.value)
                }
                style={{ marginTop: "10px" }}
              /> */}
            </>
          </div>
          {/* <div>
        <label>Options</label>
        {options.map((option, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              gap: "4px",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <input
              type="text"
              value={option}
              onChange={(e) => setOption(e.target.value)}
              style={{
                border: "1px solid gray",
                borderRadius: "4px",
                padding: "5px",
                flexGrow: 1,
              }}
            />
          </div>
        ))}
        {options.length < 4 && (
          <button
            onClick={handleAddOption}
            style={{
              height: "30px",
              width: "42px",
              backgroundColor: "#1565C0",
              color: "white",
              borderRadius: "100%",
              marginTop: "10px",
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        )}
      </div> */}

          {/* Correct Options Section */}
          {/* <div>
        <label>Correct Options</label>
        {correctOptions.map((correctOption, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              gap: "4px",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <input
              type="text"
              value={correctOption}
              onChange={(e) => setCorrectOption(e.target.value)}
              style={{
                border: "1px solid gray",
                borderRadius: "4px",
                padding: "5px",
                flexGrow: 1,
              }}
            />
          </div>
        ))}
        {correctOptions.length < 4 && (
          <button
            onClick={handleAddCorrectOption}
            style={{
              height: "30px",
              width: "42px",
              backgroundColor: "#1565C0",
              color: "white",
              borderRadius: "100%",
              marginTop: "10px",
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        )}
      </div> */}
          <div className="row col-12">
            <div className="form-group col-sm-12 col-md-6">
              <label>Description</label>
              <textarea
                value={changedQSet.description}
                onChange={(e) =>
                  handleQSetChange("description", e.target.value)
                }
                style={{
                  maxHeight: "150px",
                  overflowY: "auto",
                }}
              />
              {!changedQSet.description && errors.description && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {errors.description}
                </p>
              )}
            </div>
            <div className="form-group  col-sm-12 col-md-6">
              <label>Explanation</label>
              <textarea
                required
                value={changedQSet.explanation}
                onChange={(e) =>
                  handleQSetChange("explanation", e.target.value)
                }
                style={{
                  maxHeight: "150px",
                  overflowY: "auto",
                }}
              />
              {!changedQSet.explanation && errors.explanation && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {errors.explanation}
                </p>
              )}
            </div>
          </div>

          <div className="row col-12">
            <div className="form-group col-12 col-sm-6 col-md-3 ">
              <label className="w-full">Complexity</label>
              <select
                required
                className="w-full px-10 py-2"
                value={changedQSet.complexity || "easy"}
                onChange={(e) => handleQSetChange("complexity", e.target.value)}
                style={{ border: "1px solid gray", borderRadius: "5px" }}
              >
                {/* <option value="">Select Complexity</option> */}
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="very hard">Very Hard</option>
              </select>
              {!changedQSet.complexity && errors.complexity && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {errors.complexity}
                </p>
              )}
            </div>
            <div className="form-group col-12 col-sm-6 col-md-3">
              <label>Marks</label>
              <input
                required
                type="number"
                value={changedQSet.marks || 1}
                onChange={(e) => handleQSetChange("marks", e.target.value)}
              />
              {!changedQSet.marks && errors.marks && (
                <p style={{ color: "red", fontSize: "12px" }}>{errors.marks}</p>
              )}
            </div>
            <div className="form-group col-12 col-sm-6 col-md-3 ">
              <label>Negative Marking</label>
              <select
                className="px-10 py-2 "
                style={{ border: "1px solid gray", borderRadius: "5px" }}
                required
                value={changedQSet.is_negative || 0}
                onChange={(e) =>
                  handleQSetChange("is_negative", e.target.value)
                }
              >
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
            <div className="form-group col-12 col-sm-6 col-md-3">
              <label>Negative Marks</label>
              <input
                required
                type="number"
                value={changedQSet.negative_marks || 0}
                onChange={(e) =>
                  handleQSetChange("negative_marks", e.target.value)
                }
              />
            </div>
          </div>
        </div>

        <Button
          onClick={() => handleSave()}
          variant="contained"
          color="primary"
          size="small"
        >
          Save
        </Button>
        {/* <Button onClick={() => setEditOn(null)}>Cancel</Button> */}

        {/* <Button onClick={() => handleSave()}>Save</Button> */}
      </Modal>
      <div className="content-wrapper js-content-wrapper overflow-hidden w-100" style={{ flex: 1 }}>
        <div className="table-responsive ">
          {questions && (
            <CommonTable
              columns={columns}
              getRowId={getRowId}
              renderRowCells={renderRowCells}
              fetchData={fetchData}
              // tableData={questions?.length > 0 ? questions : []}
            />
          )}
          <div
            className=""
            style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
          >
            <button
              className=""
              onClick={onOpenModal}
              style={{
                height: "45px",
                width: "50px",
                backgroundColor: "#1565C0",
                color: "white",
                borderRadius: "100%",
                margin: "auto",
              }}
            >
              <FontAwesomeIcon
                icon={faPlus}
                className="fs-4"
                style={{ marginX: "auto" }}
              />{" "}
            </button>
          </div>
        </div>


      </div>
    <FooterOne />
    </div>
  );
};

export default CreateQuestionTable;
