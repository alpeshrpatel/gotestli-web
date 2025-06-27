import { useEffect, useState } from "react";
import "./MakeQuestionSet.css";
import { API } from "@/utils/AxiosInstance";
// import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
// import Pagination from "../common/Pagination";
import PaginationTwo from "../common/PaginationTwo";
import {
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import QuestionSetDetailForm from "./QuestionSetDetailForm";
import Header from "../layout/headers/Header";
import { json, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BootstrapTooltip } from "../common/Tooltip";
import { showToast } from "@/utils/toastService";
import FooterOne from "../layout/footers/FooterOne";
import QuizGuidelines from "./QuizGuidelines";
import QuizAnalysisDisplay from "./QuizAnalysisDisplay";
import { Cell, Pie, PieChart, ResponsiveContainer, Legend } from "recharts";
import AiQuizToggle from "./AiQuizToggle";
import ResponsivePieChart from "../common/ResponsivePieChart";

// import axios from "axios";

const SELECTED_QUESTIONS_KEY = "makeQuestionSet_selectedQuestions";
const COMPLEXITY_COUNTER_KEY = "makeQuestionSet_complexityCounter";

const COLORS = ["#FF6347", "#6A5ACD", "#20B2AA", "#FF69B4", "#FFD700", "#ADFF2F"];

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
  const [totalRecords, setTotalRecords] = useState();
  const [loading, setLoading] = useState(false)
  const [selectedViewOfActiveOrRetr, setSelectedViewOfActiveOrRetr] = useState('')
  const [errors, setErrors] = useState([]);
  const [analysisData, setAnalysisData] = useState(null);
  const [complexityCounterPieChartData, setComplexityCounterPieChartData] = useState([]);
  const [aiMode, setAiMode] = useState(false);
  const [customSettings, setCustomSettings] = useState({
    easyPercentage: 40,
    mediumPercentage: 40,
    hardPercentage: 20,
    minQuestions: 10,
    minTopics: 3
  });
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 });
  const navigate = useNavigate();

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userId = user.id;
  const userRole = user.role;
  const org = JSON.parse(localStorage.getItem("org")) || "";
  let orgid = org?.id || 0;
  const indexOfLastRecord = currentPage * pageCapicity;
  const indexOfFirstRecord = indexOfLastRecord - pageCapicity;
  // let shouldRenderPagination = questions.length > pageCapicity;
  let shouldRenderPagination = 1;
  // let complexityCounterPieChartData = []

  const fetchData = async () => {
    setLoading(true)
    const start = (currentPage - 1) * pageCapicity + 1;
    const end = currentPage * pageCapicity;
    try {
      if (token) {
        setLoading(true)
        let queryParams = `start=${start}&end=${end}`;


        if (searchTerm) {
          queryParams += `&search=${encodeURIComponent(searchTerm)}`;
        }


        if (complexityFilter) {
          queryParams += `&complexity=${encodeURIComponent(complexityFilter)}`;
        }

        // Add view filter (active/retired)
        if (selectedViewOfActiveOrRetr === "active") {
          queryParams += "&status=1";
        } else if (selectedViewOfActiveOrRetr === "retired") {
          queryParams += "&status=0";
        }

        // Add category filter if exists
        if (filter) {
          const filteredCategory = categories.find(
            (category) => category.title?.toLowerCase() === filter?.toLowerCase()
          );
          if (filteredCategory) {
            queryParams += `&categoryId=${filteredCategory.id}`;
          }
        }
        const [categoriesResponse, questionsResponse] = await Promise.all([
          API.get("/api/category", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),              //${userId}?start=${start}&end=${end}
          API.get(`/api/questionmaster/user/${userId}?${queryParams}&orgid=${orgid}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);
        setCategories(categoriesResponse.data);
        setQuestions(questionsResponse.data.res);
        setFilteredFromAll(questionsResponse.data.res);
        setTotalRecords(questionsResponse.data.totalRecords)
        setLoading(false)
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
  useEffect(() => {
    fetchData();
  }, [pageCapicity, currentPage]);

  useEffect(() => {
    fetchData();
  }, [currentPage, pageCapicity]);



  useEffect(() => {
    fetchData();
  }, [searchTerm, complexityFilter, viewQuestion, questionSetsQuestions, selectedViewOfActiveOrRetr]);

  useEffect(() => {

    if (selectedQuestions.length === 0) {
      const savedSelectedQuestions = localStorage.getItem(SELECTED_QUESTIONS_KEY);

      if (savedSelectedQuestions) {
        try {
          const parsedQuestions = JSON.parse(savedSelectedQuestions);
          console.log("Parsed selected questions:", parsedQuestions);
          setSelectedQuestions(parsedQuestions);
        } catch (error) {
          console.error("Error parsing saved selected questions:", error);
          localStorage.removeItem(SELECTED_QUESTIONS_KEY);
        }
      }
    }
    console.log("Selected questions:", selectedQuestions);

    if (complexityCounter.easy === 0 && complexityCounter.medium === 0 && complexityCounter.hard === 0) {
      const savedComplexityCounter = localStorage.getItem(COMPLEXITY_COUNTER_KEY);
      console.log("Saved complexity counter:", savedComplexityCounter);
      if (savedComplexityCounter) {
        try {
          const parsedCounter = JSON.parse(savedComplexityCounter);
          setComplexityCounter(parsedCounter);
        } catch (error) {
          console.error("Error parsing saved complexity counter:", error);
          localStorage.removeItem(COMPLEXITY_COUNTER_KEY);
        }
      }
    }
    setComplexityCounterPieChartData([
      {
        name: "Easy",
        value: complexityCounter.easy || 0,
        color: '#FF6347',
        percentage: selectedQuestions.length > 0 ? Math.round((complexityCounter.easy / selectedQuestions.length) * 100) : 0,
      },
      {
        name: "Medium",
        value: complexityCounter.medium || 0,
        color: '#6A5ACD',
        percentage: selectedQuestions.length > 0 ? Math.round((complexityCounter.medium / selectedQuestions.length) * 100) : 0,
      },
      {
        name: "Hard",
        value: complexityCounter.hard || 0,
        color: '#20B2AA',
        percentage: selectedQuestions.length > 0 ? Math.round((complexityCounter.hard / selectedQuestions.length) * 100) : 0,
      },
    ])
  }, [pageCapicity, currentPage, selectedQuestions.length]);


  useEffect(() => {
    if (selectedQuestions.length > 0) {
      localStorage.setItem(SELECTED_QUESTIONS_KEY, JSON.stringify(selectedQuestions));
    } else {
      localStorage.removeItem(SELECTED_QUESTIONS_KEY);
    }
  }, [selectedQuestions]);


  useEffect(() => {
    if (selectedQuestions.length > 0) {
      localStorage.setItem(COMPLEXITY_COUNTER_KEY, JSON.stringify(complexityCounter));
    } else {
      localStorage.removeItem(COMPLEXITY_COUNTER_KEY);
    }

  }, [selectedQuestions]);

  useEffect(() => {
    setFilteredFromAll(questions);
  }, [questions]);

  useEffect(() => {
    setQuestionSetsQuestions([]);
    questionSets.forEach((q) => {
      getQuestionsFromQSetId(q.question_set_id);
    });
  }, [questionSets, pageCapicity, currentPage]);

  // useEffect(() => {
  //   if (filteredFromAll) {
  //     setLoading(false); 

  //   }
  // }, [filteredFromAll]);

  // const applyFilters = (sourceQuestions = questions) => {

  //   let result = [...sourceQuestions];
  //   console.log(' before applyfilter result length:',result.length)
  //   // Apply search filter
  //   if (searchTerm) {
  //     result = result.filter(question => 
  //       question.question?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  //     );
  //   }

  //   // Apply category filter
  //   // if (filter !== "") {
  //   //   result = result.filter(question =>
  //   //     questionSetsQuestions.some(
  //   //       q => q.question?.toLowerCase() === question.question?.toLowerCase()
  //   //     )
  //   //   );
  //   // }

  //   // Apply complexity filter
  //   if (complexityFilter) {
  //      result = result?.filter((question) => {
  //       const matchesSearch = question.question
  //         ?.toLowerCase()
  //         ?.includes(searchTerm?.toLowerCase());
  //       const matchesCategory =
  //         filter === "" ||
  //         questionSetsQuestions.some(
  //           (q) => q.question?.toLowerCase() === question.question?.toLowerCase()
  //         );
  //       const matchesComplexity =
  //         updatedComplexity
  //           ?.toLowerCase()
  //           ?.includes(question?.complexity?.toLowerCase()) ||
  //         updatedComplexity === "";
  //       // console.log("sf", selectedFilter);
  //       // console.log("qc", question?.complexity);
  //       return matchesSearch && matchesCategory && matchesComplexity;
  //     });
  //   }

  //   // Apply view filter (all, active, retired)
  //   if(selectedViewOfActiveOrRetr){
  //     if (selectedViewOfActiveOrRetr === "all") {
  //       // Show all questions
  //       result = result;
  //       // setTotalRecords(filteredFromAll.length)
  //     } else if (selectedViewOfActiveOrRetr === "active") {
  //       // Show only active questions (status_id truthy)
  //       result = result?.filter(
  //         (question) => question.status_id == 1
  //       );
  //       // setFilteredFromAll(questions.filter((question) => question.status_id));
  //     } else if (selectedViewOfActiveOrRetr === "retired") {
  //       // Show only retired questions (status_id falsy)
  //       result = result?.filter((question) => !question.status_id);
  //     }
  //   }


  //   // Update total records and filtered questions
  //   setTotalRecords(result.length);
  //   console.log('applyfilter:',result)
  //   console.log('applyfilter result length:',result.length)
  //   // Apply pagination to filtered results
  //   const paginatedResults = result.slice(indexOfFirstRecord, indexOfLastRecord);
  //   setQuestions(result);
  //   setFilteredFromAll(result);
  //   result = questions
  // };

  //  complexityCounterPieChartData = [
  //   {
  //     name: "Easy",
  //     value: complexityCounter.easy || 0,
  //     color: COLORS.easy,
  //     percentage: selectedQuestions.length > 0 ? Math.round((complexityCounter.easy / selectedQuestions.length) * 100) : 0,
  //   },
  //   {
  //     name: "Medium",
  //     value: complexityCounter.medium || 0,
  //     color: COLORS.medium,
  //     percentage: selectedQuestions.length > 0 ? Math.round((complexityCounter.medium / selectedQuestions.length) * 100) : 0,
  //   },
  //   {
  //     name: "Hard",
  //     value: complexityCounter.hard || 0,
  //     color: COLORS.hard,
  //     percentage: selectedQuestions.length > 0 ? Math.round((complexityCounter.hard / selectedQuestions.length) * 100) : 0,
  //   },
  // ];


  // const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  //   const RADIAN = Math.PI / 180;
  //   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  //   const x = cx + radius * Math.cos(-midAngle * RADIAN);
  //   const y = cy + radius * Math.sin(-midAngle * RADIAN);

  //   const complexityName = complexityCounterPieChartData[index]?.name || "";

  // return (
  //   <text
  //     x={x}
  //     y={y}
  //     fill="white"
  //     textAnchor={x > cx ? 'start' : 'end'}
  //     dominantBaseline="central"
  //     fontSize="12"
  //     fontWeight="bold"
  //   >
  //     {`${complexityName}: ${(percent * 100).toFixed(0)}%`}
  //   </text>
  // );
  // };

   

  // Sample data with some zero values to demonstrate the solution
  // const complexityCounterPieChartData = [
  //   { name: 'Easy', value: 25, color: '#22c55e' },
  //   { name: 'Medium', value: 45, color: '#f59e0b' },
  //   { name: 'Hard', value: 30, color: '#ef4444' },
  //   { name: 'Expert', value: 0, color: '#8b5cf6' }, // Zero value example
  // ];

  // Filter out zero values for the pie chart, but keep them for labels
  const nonZeroData = complexityCounterPieChartData.filter(item => item.value > 0);
  const hasZeroData = complexityCounterPieChartData.some(item => item.value === 0);

  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById('chart-container');
      if (container) {
        const rect = container.getBoundingClientRect();
        setDimensions({
          width: Math.max(300, rect.width),
          height: Math.max(300, rect.height)
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    
    // Calculate responsive radius based on container size
    const baseRadius = Math.min(dimensions.width, dimensions.height) * 0.15;
    const radius = outerRadius + baseRadius;
    
    // Calculate label position
    let x = cx + radius * Math.cos(-midAngle * RADIAN);
    let y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    // Anti-collision logic: adjust positions to prevent overlap
    const labelHeight = 16; // Approximate height of text
    const minDistance = 20; // Minimum distance between labels
    
    // Get the actual data item (from nonZeroData since that's what's being rendered)
    const dataItem = nonZeroData[index];
    const complexityName = dataItem?.name || "";
    const actualValue = dataItem?.value || 0;
    
    // Calculate total for percentage
    const total = complexityCounterPieChartData.reduce((sum, item) => sum + item.value, 0);
    const actualPercent = total > 0 ? (actualValue / total) * 100 : 0;

    return (
      <text
        x={x}
        y={y}
        fill="#374151"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={Math.max(10, Math.min(14, dimensions.width / 30))}
        fontWeight="600"
        className="select-none"
      >
        {`${complexityName}: ${actualPercent.toFixed(0)}%`}
      </text>
    );
  };

  const CustomLegend = () => {
    return (
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {complexityCounterPieChartData.map((item, index) => {
          const total = complexityCounterPieChartData.reduce((sum, dataItem) => sum + dataItem.value, 0);
          const percentage = total > 0 ? ((item.value / total) * 100).toFixed(0) : 0;
          
          return (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-medium text-gray-700">
                {item.name}: {percentage}% ({item.value})
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  // const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  //   const RADIAN = Math.PI / 180;
  //   // Position labels outside the pie chart
  //   const radius = outerRadius + 30; // Add padding outside the pie
  //   const x = cx + radius * Math.cos(-midAngle * RADIAN);
  //   const y = cy + radius * Math.sin(-midAngle * RADIAN);

  //   const complexityName = complexityCounterPieChartData[index]?.name || "";

  //   return (
  //     <text
  //       x={x}
  //       y={y}
  //       fill="black"
  //       textAnchor={x > cx ? 'start' : 'end'}
  //       dominantBaseline="central"
  //       fontSize="12"
  //       fontWeight="bold"
  //     >
  //       {`${complexityName}: ${(percent * 100).toFixed(0)}%`}
  //     </text>
  //   );
  // };

  // const CustomLegend = (props) => {
  //   const { payload } = props;
  //   return (
  //     <Box display="flex" justifyContent="center" gap={3} mt={2}>
  //       {payload.map((entry, index) => (
  //         <Box key={index} display="flex" alignItems="center" gap={1}>
  //           <Box
  //             width={16}
  //             height={16}
  //             bgcolor={entry.color}
  //             borderRadius="50%"
  //           />
  //           <Typography variant="body2" color="textSecondary">
  //             {entry.value}: {complexityCounterPieChartData[index].value}
  //           </Typography>
  //         </Box>
  //       ))}
  //     </Box>
  //   );
  // };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const getQuestionSetId = async (categoryId) => {
    try {
      if (token) {
        const { data } = await API.get(
          `/api/questionset/category/${categoryId}?orgid=${orgid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setQuestionSets(data);
        setFilteredFromAll(data)
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


  const getQuestionsFromQSetId = async (questionId) => {
    try {
      if (token) {
        const start = (currentPage - 1) * pageCapicity + 1;
        const end = currentPage * pageCapicity;
        const { data } = await API.get(
          `/api/questionset/questions/${questionId}?start=${start}&end=${end}?orgid=${orgid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setQuestionSetsQuestions((prevQuestions) => [
          ...prevQuestions,
          ...data.res,
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
      const complexityKey = question?.complexity?.toLowerCase();
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
      prevSelectedQuestions?.includes(question)
        ? prevSelectedQuestions?.filter((q) => q !== question)
        : [...prevSelectedQuestions, question]
    );
  };

  let filteredQuestions = questions?.filter(
    (question) =>
      question.question?.toLowerCase()?.includes(searchTerm?.toLowerCase()) &&
      (filter === "" ||
        questionSetsQuestions.some(
          (q) => q.question?.toLowerCase() === question.question?.toLowerCase()
        ))
  );


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
    // try {
    //   if (token) {
    //     async function getId() {
    //       const { data } = await API.get(
    //         `/api/questionset/question/questionsetid?orgid=${orgid}`,
    //         {
    //           headers: {
    //             Authorization: `Bearer ${token}`,
    //           },
    //         }
    //       );

    //       // console.log(data);
    //       const questionsetid = data?.id + 1 || 1;
    //       setQuestionSetId(questionsetid);
    //       return { questionsetid };
    //     }
    //     let { questionsetid } = await getId();

    //     let jsonData = [];
    //     selectedQuestions.forEach((question) => {
    //       jsonData.push({
    //         question_set_id: questionsetid,
    //         question_id: question.id,
    //         userId: userId,
    //       });
    //     });
    //     questionSetStore(jsonData);

    //     onOpenModal();
    //   }
    // } catch (error) {
    //   if (error.status == 403) {
    //     localStorage.removeItem("user");
    //     localStorage.removeItem("token");
    //     // showToast("error","Invaild token!");
    //     navigate("/login");
    //     return;
    //   }
    //   // console.log(error);
    // }
    if (aiMode) {
      if (selectedQuestions.length < customSettings.minQuestions) {
        setErrors(prev => [`Please select at least ${customSettings.minQuestions} questions to create a question set.`])
        return;
      } else if (selectedQuestions.length > 100) {
        setErrors(prev => ['You can select a maximum of 100 questions.'])
        return;
      } else if (!validateDifficultyDistribution(selectedQuestions)) {
        setErrors(prev => [`Please ensure ${customSettings.easyPercentage}% easy, ${customSettings.mediumPercentage}% medium, and ${customSettings.hardPercentage}% hard questions are selected.`])
        return;
      }
      setErrors([]);
      const aiAnalysisResponse = await API.post('/api/groq/analyze/question/topics', {
        questions: selectedQuestions,
        topics: customSettings.minTopics
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setAnalysisData(aiAnalysisResponse);

      if (aiAnalysisResponse?.data?.data?.topicDistribution?.balanced) {
        onOpenModal()
      }
    } else {
      onOpenModal()
    }
    // onOpenModal()
  };

  const validateDifficultyDistribution = (questions) => {
    console.log('questions', questions);
    const total = questions.length;
    const easyCount = questions.filter(q => q.complexity?.toLowerCase() === 'easy').length;
    const mediumCount = questions.filter(q => q.complexity?.toLowerCase() === 'medium').length;
    const hardCount = questions.filter(q => q.complexity?.toLowerCase() === 'hard').length;

    const easyPercentage = (easyCount / total) * 100;
    const mediumPercentage = (mediumCount / total) * 100;
    const hardPercentage = (hardCount / total) * 100;

    // Allow some tolerance (±5%) for the percentages
    const tolerance = 5;

    return (
      Math.abs(easyPercentage - customSettings.easyPercentage) <= tolerance &&
      Math.abs(mediumPercentage - customSettings.mediumPercentage) <= tolerance &&
      Math.abs(hardPercentage - customSettings.hardPercentage) <= tolerance
    );
  }

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
        return `${prev}:${selectedFilter}`;
      }
    });
    setCurrentPage(1)
    // const filteredQuestions = questions?.filter((question) => {
    //   const matchesSearch = question.question
    //     ?.toLowerCase()
    //     ?.includes(searchTerm?.toLowerCase());
    //   const matchesCategory =
    //     filter === "" ||
    //     questionSetsQuestions.some(
    //       (q) => q.question?.toLowerCase() === question.question?.toLowerCase()
    //     );
    //   const matchesComplexity =
    //     updatedComplexity
    //       ?.toLowerCase()
    //       ?.includes(question?.complexity?.toLowerCase()) ||
    //     updatedComplexity === "";
    //   // console.log("sf", selectedFilter);
    //   // console.log("qc", question?.complexity);
    //   return matchesSearch && matchesCategory && matchesComplexity;
    // });
    // setQuestions(filteredQuestions)
    // setFilteredFromAll(filteredQuestions);

    // setTotalRecords(filteredQuestions.length)
  };

  const handleActiveChange = async (questionId, value) => {
    // setStatus(value)
    try {
      if (token) {
        const { data } = await API.put(
          `/api/questionmaster/status/question/${questionId}?orgid=${orgid}`,
          {
            statusId: value,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        showToast("success", "Status Change Saved Successfully!");

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
    // fetchData();
    setSelectedViewOfActiveOrRetr(selectedView)
    setCurrentPage(1)
    // let filteredQuestions = [];
    // if (selectedView === "all") {
    //   // Show all questions
    //   filteredQuestions = questions;
    //   setTotalRecords(filteredFromAll.length)
    // } else if (selectedView === "active") {
    //   // Show only active questions (status_id truthy)
    //   filteredQuestions = questions?.filter(
    //     (question) => question.status_id == 1
    //   );
    //   // setFilteredFromAll(questions.filter((question) => question.status_id));
    // } else if (selectedView === "retired") {
    //   // Show only retired questions (status_id falsy)
    //   filteredQuestions = questions?.filter((question) => !question.status_id);
    // }
    // console.log('qqqqq',filteredFromAll)
    // setFilteredFromAll(filteredQuestions);
    // setViewQuestion(selectedView);
    // setQuestions(filteredFromAll)
    // setTotalRecords(filteredQuestions.length)
  };

  const handleResetSelectedQUestions = () => {
    setSelectedQuestions([]);
    setComplexityCounter({
      easy: 0,
      medium: 0,
      hard: 0,
    });
    localStorage.removeItem(SELECTED_QUESTIONS_KEY);
    localStorage.removeItem(COMPLEXITY_COUNTER_KEY);
    setErrors([]);
  }
  // console.log('sdgsg',filteredFromAll);
  // console.log('total records',totalRecords);
  // console.log('last sdgsg',filteredFromAll.slice(indexOfFirstRecord, indexOfLastRecord));
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header userRole={userRole} />
      <div
        className="mx-auto"
        style={{
          marginTop: "130px",
          width: "80%",
          padding: "30px",
          backgroundColor: "#bfdeee",
          borderRadius: "10px",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);",
          marginBottom: '20px',
        }}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: "center", marginBottom: "10px" }}
        >
          Make Question Set
        </Typography>
        <AiQuizToggle aiMode={aiMode} setAiMode={setAiMode} />
        {
          aiMode && (
            <QuizGuidelines customSettings={customSettings} setCustomSettings={setCustomSettings} />
          )
        }

        <div className="d-flex justify-content-center gap-4 align-items-center mb-3">
          <div>


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
              {categories && categories.length > 0 && categories?.map((category, index) => (
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
                flexWrap: "wrap",
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
              <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', gap: '20px', marginBottom:'15px' }}>
                <ul className={`col-md-12 ${selectedQuestions.length > 0 ? 'col-lg-8' : 'col-lg-12'} `}>
                  {
                    !loading && filteredFromAll.length > 0 ? (
                      filteredFromAll
                        // .slice(indexOfFirstRecord, indexOfLastRecord)
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
                              {question.status_id == 1 ? (
                                <input
                                  className="p-2 border-0"
                                  type="checkbox"
                                  // checked={selectedQuestions.includes(question)}
                                  checked={selectedQuestions.some(selectedQ => selectedQ.id === question.id)}
                                  onChange={() => handleCheckboxChange(question)}
                                />
                              ) : ' '}

                              <label>{question.question}</label>
                            </div>
                            <h6>{question.complexity}</h6>
                          </div>
                        ))) : (
                      totalRecords ? 'Loading......' : 'No Questions Found!'
                    )
                  }
                </ul>

                {
                  selectedQuestions.length > 0 && (
                    // <Grid item className="col-md-12 col-lg-4">
                    //   <Card sx={{ height: "500px" }}>
                    //     <CardContent>
                    //       <Typography variant="h6">Selected Questions (%)</Typography>
                    //       <div style={{ width: "100%", height: 400 }}>
                    //         <ResponsiveContainer>
                    //           <PieChart>
                    //             <Pie
                    //               data={complexityCounterPieChartData}
                    //               cx="50%" // Center horizontally
                    //               cy="50%" // Center vertically
                    //               labelLine={false}
                    //               label={renderCustomizedLabel}
                    //               outerRadius='60%' // Reduced to make room for external labels
                    //               fill="#8884d8"
                    //               dataKey="value"
                    //             >
                    //               {complexityCounterPieChartData.map((entry, index) => (
                    //                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    //               ))}
                    //             </Pie>
                    //             <Tooltip
                    //               formatter={(value, name) => [`${value}%`, name]}
                    //               contentStyle={{
                    //                 backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    //                 border: '1px solid #ccc',
                    //                 borderRadius: '4px'
                    //               }}
                    //             />
                    //             <Legend
                    //               verticalAlign="bottom"
                    //               height={36}
                    //               wrapperStyle={{
                    //                 paddingTop: '10px',
                    //                 fontSize: '12px'
                    //               }}
                    //               iconSize={8}
                    //             />
                    //           </PieChart>
                    //         </ResponsiveContainer>
                    //       </div>
                    //     </CardContent>
                    //   </Card>
                    // </Grid>
                    <ResponsivePieChart complexityCounterPieChartData={complexityCounterPieChartData}/>
                  )
                }

              </div>

              {shouldRenderPagination && (
                <div className="w-75 m-auto d-flex align-items-center justify-content-center">
                  <PaginationTwo
                    pageNumber={currentPage}
                    setPageNumber={setCurrentPage}
                    data={filteredFromAll}
                    pageCapacity={pageCapicity}
                    totalRecords={totalRecords}
                  />
                  <select
                    className="filterDropdown"
                    value={pageCapicity}
                    onChange={handlePageChange}
                    style={{ margin: "auto 30px", width: '100px' }}
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
              )}
              {
                errors && errors.length > 0 && (
                  <div className="error-details" style={{
                    background: 'white',
                    border: '2px solid #ff6b6b',
                    borderRadius: '10px',
                    padding: '20px', alignContent: 'center', marginTop: '20px'
                  }}>
                    <h4 className="text-red-5 fs-5">⚠️ Please Note:</h4>

                    {errors && errors.map((error, index) => (
                      <div key={index} className="error-row">

                        <ul>
                          {/* {errors.map((err, errIndex) => ( */}
                          <li key={index}>{error}</li>
                          {/* ))} */}
                        </ul>
                      </div>
                    ))}
                  </div>
                )
              }
              {
                analysisData && aiMode && (
                  <QuizAnalysisDisplay analysisData={analysisData} />
                )
              }


              {selectedQuestions.length > 0 && (
                <div className="d-flex flex-row align-items-center justify-content-center gap-4 mx-auto ">
                  <button
                    className="button -md px-24 py-20 text-green-5 -outline-green-5  text-16 fw-bolder lh-sm mt-4 "
                    // style={{ cursor: analysisData?.data?.data?.topicDistribution?.balanced ? 'pointer' : 'not-allowed' }}

                    onClick={handleSubmit}
                  >
                    Create QuestionSet
                  </button>
                  <button className="button -sm px-24 py-10 text-red-3 -outline-red-3 mt-4  fw-bolder  text-14 mx-auto"
                    // style={{ cursor: analysisData?.data?.data?.topicDistribution?.balanced ? 'pointer' : 'not-allowed' }}

                    onClick={handleResetSelectedQUestions}
                  >
                    Reset
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* {
            selectedQuestions.length > 0 && (
              <Grid item className="col-md-12 col-lg-4">
                <Card sx={{ height: "500px" }}>
                  <CardContent>
                    <Typography variant="h6">Selected Questions (%)</Typography>
                    <div style={{ width: "100%", height: 400 }}>
                      <ResponsiveContainer>
                        <PieChart>
                          <Pie
                            data={complexityCounterPieChartData}
                            cx="50%" // Center horizontally
                            cy="50%" // Center vertically
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={60} // Reduced to make room for external labels
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {complexityCounterPieChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            )
          } */}

        </div>

      </div>
      <Modal
        open={open}
        onClose={() => { }}
        showCloseIcon={false}
        // onClose={onCloseModal}
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
          // questionSetId={questionSetId}
          onCloseModal={onCloseModal}
        />
      </Modal>
      <FooterOne />
    </div>
  );
};

export default MakeQuestionSet;
