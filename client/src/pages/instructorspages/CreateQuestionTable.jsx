import CommonTable from "@/components/common/CommonTable";
import MetaComponent from "@/components/common/MetaComponent";
import Preloader from "@/components/common/Preloader";
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

const CreateQuestionTable = () => {
  const [emptyRow, setEmptyRow] = useState([
    {
      org_id: "",
      paragraph_id: "",
      question: "",
      options: "",
      correct_option: "",
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
  const [changedQSet, setChangedQSet] = useState([
    {
      org_id: 0,
      paragraph_id: "",
      question: "",
      options: "",
      correct_option: "",
      description: "",
      explanation: "",
      question_type_id: 0,
      status_id: 1,
      complexity: "",
      marks: 0,
      is_negative: 0,
      negative_marks: 0,
    },
  ]);

  const columns = [
    { id: "index", label: "#", sortable: false },
    { id: "question_type_id", label: "Type", sortable: false },
    // changedQSet?.question_type_id == 1 &&  { id: "paragraph", label: "Paragraph", sortable: false },

    { id: "question", label: "Question", sortable: true },
    { id: "options", label: "Options", sortable: true },
    { id: "correct_option", label: "Correct Option(s)", sortable: true },
    { id: "description", label: "Description", sortable: true },
    { id: "explanation", label: "Explanation", sortable: true },
    { id: "complexity", label: "Complexity", sortable: true },
    { id: "marks", label: "Marks", sortable: true },
    { id: "is_negative", label: "Negative", sortable: true },
    { id: "negative_marks", label: "Negative Marks", sortable: false },
  ];

  const [editOn, setEditOn] = useState(0);
  const [option, setOption] = useState("");
  const [correctOption, setCurrentOption] = useState("");
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const userRole = user?.role;
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    async function getQuestions() {
      try {
        if (token) {
          const { data } = await API.get(
            `/api/questionmaster/detailded/question/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const questionsWithOptions = await Promise.all(
            data.map(async (question) => {
              const response = await API.get(`/api/options/${question.id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              const result = response?.data?.reduce(
                (acc, item) => {
                  if (!acc.correctAnswer) acc.correctAnswer = [];
                  if (!acc.options) acc.options = [];

                  if (item.correctAnswer === 1) {
                    acc.correctAnswer.push(item.options);
                  }

                  acc.options.push(item.options);
                  return acc;
                },
                { correctAnswer: [], options: [] }
              );

              return {
                ...question,
                correctAnswer: result.correctAnswer.join(":"),
                options: result.options.join(":"),
              };
            })
          );

          setQuestions(questionsWithOptions);

          showToast("success", "Questions Fetched Successfully!");
        }
      } catch (error) {
        if (error.status === 403) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        showToast("error", "Error occurred: " + error.message);
      }
    }

    getQuestions();
  }, [token, userId]);

  function handleEdit(set, index) {
    setEditOn(set.id);
    onOpenModal();
    setChangedQSet(set);
  }

  async function handleQSetChange(name, value) {
    if (name == "question_type_id" && value == 1) {
      onOpenModal();
    }
    setChangedQSet((prev) => ({
      ...prev,
      [name]: value !== undefined ? value : "",
    }));
  }

  async function handleSave() {
    // setQuestions(changedQSet);
    
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
        console.log(response.data);
        console.log(changedQSet);
        let finalQId = 0
        if(editOn){
          const res2 = await API.put(
            `/api/questionmaster/${editOn}`,
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
          console.log(res2.data)
          finalQId = res2.data.id
        }else{
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
          finalQId = res.data.id
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
            correct_option: changedQSet.correct_option,
            userId: userId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        setChangedQSet({
          org_id: 0,
          paragraph_id: "",
          question: "",
          options: "",
          correct_option: "",
          description: "",
          explanation: "",
          question_type_id: 0,
          status_id: 1,
          complexity: "",
          marks: 0,
          is_negative: 0,
          negative_marks: 0,
        });
        onCloseModal()
        if(editOn){
          showToast("success", "Question Edited Successfully!");
        }else{
          showToast("success", "Question Created Successfully!");
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
      console.error(error)
      showToast("error", `Error occured: ${error}`);
      // console.log(error);
    }
  }
  async function handleAddOption() {
    if (!changedQSet.options && option) {
      setChangedQSet((prev) => ({
        ...prev,
        options: option,
      }));
    } else if (option) {
      setChangedQSet((prev) => ({
        ...prev,
        options: changedQSet?.options?.concat(`:${option}`),
      }));
    }
    setOption("");
  }
  async function handleAddCorrectOption() {
    if (!changedQSet.correct_option && correctOption) {
      setChangedQSet((prev) => ({
        ...prev,
        correct_option: correctOption,
      }));
    } else if (correctOption) {
      setChangedQSet((prev) => ({
        ...prev,
        correct_option: changedQSet?.correct_option?.concat(
          `:${correctOption}`
        ),
      }));
    }
    setCurrentOption("");
  }
  
  const validate = () => {
    const newErrors = {};

    if (!changedQSet.question_type_id) newErrors.question_type_id = 'Type is required';
    if (!changedQSet.question) newErrors.question = 'Question is required';
    if (!changedQSet.explanation) newErrors.explanation = 'Explanation is required';
    if (!changedQSet.complexity) newErrors.complexity = 'Complexity is required';
    if (!changedQSet.marks) newErrors.marks = 'Marks is required';
   
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  console.log("questions:", questions);
  const getRowId = (row) => row.id;
  const renderRowCells = (set, index) => (
    <>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{set?.question_type_id}</TableCell>
      <TableCell>
        <BootstrapTooltip title={set?.question}>
       <p className="text-truncate"
            style={{
              maxWidth: "200px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              
            }}> {set?.question}</p>
        </BootstrapTooltip>
       </TableCell>
      <TableCell> <BootstrapTooltip title={set?.options}>
       <p className="text-truncate"
            style={{
              maxWidth: "200px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              
            }}> {set?.options}</p>
        </BootstrapTooltip></TableCell>
      <TableCell> <BootstrapTooltip title={set?.correctAnswer}>
       <p className="text-truncate"
            style={{
              maxWidth: "200px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              
            }}> {set?.correctAnswer}</p>
        </BootstrapTooltip></TableCell>
      <TableCell> <BootstrapTooltip title={set?.description}>
       <p className="text-truncate"
            style={{
              maxWidth: "200px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              
            }}> {set?.description}</p>
        </BootstrapTooltip></TableCell>
      <TableCell> <BootstrapTooltip title={set?.explanation}>
       <p className="text-truncate"
            style={{
              maxWidth: "200px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              
            }}> {set?.explanation}</p>
        </BootstrapTooltip></TableCell>
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
    <div>
      <Preloader />
      {/* <MetaComponent meta={metadata} /> */}
      <Header userRole={userRole} />
      <Modal open={open} onClose={onCloseModal} center  styles={{
          modal: {
            width: "70%", 
            maxWidth: "80%", 
          },
        }}>
        <div style={{ width: "100%" }}>
          <div className="form-group">
            <label>Question Type</label>
            <select className=" px-10 py-2"
            required
              value={changedQSet.question_type_id}
              onChange={(e) =>
                handleQSetChange("question_type_id", e.target.value)
              }
            >
              <option value="2">Single Choice</option>
              <option value="1">Paragraph</option>
              <option value="6">Comprehensive</option>
              <option value="7">Multiple Choice</option>
            </select>
            {errors.question_type_id && <p style={{ color: 'red', fontSize: '12px' }}>{errors.question_type_id}</p>}
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
              style={{maxHeight: "150px"}}
            />
            {errors.question && <p style={{ color: 'red', fontSize: '12px' }}>{errors.question}</p>}
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
              </div>
              <input
                type="text"
                readOnly
                value={changedQSet.options}
                onChange={(e) => handleQSetChange("options", e.target.value)}
                style={{ marginTop: "10px" }}
              />
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
                  onChange={(e) => setCurrentOption(e.target.value)}
                />
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
              </div>
              <input
                type="text"
                readOnly
                value={changedQSet.correct_option}
                onChange={(e) =>
                  handleQSetChange("correct_option", e.target.value)
                }
                style={{ marginTop: "10px" }}
              />
            </>
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
             
              type="text"
              value={changedQSet.description}
              onChange={(e) => handleQSetChange("description", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Explanation</label>
            <input
            required
              type="text"
              value={changedQSet.explanation}
              onChange={(e) => handleQSetChange("explanation", e.target.value)}
            />
            {errors.explanation && <p style={{ color: 'red', fontSize: '12px' }}>{errors.explanation}</p>}
          </div>
          <div className="row col-12">
          <div className="form-group col-12 col-sm-6 col-md-3 ">
            <label className="w-full">Complexity</label>
            <select
            required
            className="w-full px-10 py-2"
              value={changedQSet.complexity}
              onChange={(e) => handleQSetChange("complexity", e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="very hard">Very Hard</option>
            </select>
            {errors.complexity && <p style={{ color: 'red', fontSize: '12px' }}>{errors.complexity}</p>}
          </div>
          <div className="form-group col-12 col-sm-6 col-md-3">
            <label>Marks</label>
            <input
            required
              type="number"
              value={changedQSet.marks}
              onChange={(e) => handleQSetChange("marks", e.target.value)}
            />
            {errors.marks && <p style={{ color: 'red', fontSize: '12px' }}>{errors.marks}</p>}
          </div>
          <div className="form-group col-12 col-sm-6 col-md-3 ">
            <label>Negative Marking</label>
            <select className="px-10 py-2"
            required
              value={changedQSet.is_negative}
              onChange={(e) => handleQSetChange("is_negative", e.target.value)}
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
              value={changedQSet.negative_marks}
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
      <div className="content-wrapper js-content-wrapper overflow-hidden w-100">
        <div className="table-responsive ">
          {questions && (
            <CommonTable
              columns={columns}
              data={questions?.length > 0 ? questions : emptyRow}
              getRowId={getRowId}
              renderRowCells={renderRowCells}
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

        <FooterOne />
      </div>
    </div>
  );
};

export default CreateQuestionTable;
