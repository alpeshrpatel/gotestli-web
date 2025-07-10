import React, { useEffect, useState } from "react";
import "./QuestionSetDetailForm.css";
import { API } from "@/utils/AxiosInstance";
import { auth } from "@/firebase/Firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Checkbox, Chip, FormControlLabel, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { showToast } from "@/utils/toastService";
import { renderTemplate } from "@/utils/renderTemplate";
import emailTemplates from "../../../../email_templates/emailtemplates";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faLightbulb, faSpinner } from "@fortawesome/free-solid-svg-icons";


const APP_ID = 1;
const API_TOKEN = '7b9e6c5f-8a1d-4d3e-b5f2-c9a8e7d6b5c4';

const QuestionSetDetailForm = ({
  selectedQuestions,
  categories,
  onCloseModal
}) => {
  const user = auth.currentUser.displayName;
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    author: user,
    short_desc: "",
    description: "",
    start_time: "",
    end_time: "",
    status_id: "",
    start_date: "",
    end_date: "",
    time_duration: "",
    no_of_question: selectedQuestions.length,
    tags: "",
    is_demo: true,
    totalmarks: selectedQuestions?.map((question) => question.marks).reduce((a, b) => a + b, 0),
    pass_percentage: "",
    org_id: 0
  });
  const [tagsId, setTagsId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [errors, setErrors] = useState({});
  const [aiSuggestions, setAiSuggestions] = useState({
    title: [],
    short_desc: [],
    description: []
  });
  const [isGeneratingAI, setIsGeneratingAI] = useState({
    title: false,
    short_desc: false,
    description: false
  });
  const [showSuggestions, setShowSuggestions] = useState({
    title: false,
    short_desc: false,
    description: false
  });

  const generateAISuggestions = async (field) => {
    setIsGeneratingAI(prev => ({ ...prev, [field]: true }));

    try {

      const response = await API.post('/api/groq/questionset/detail/suggestions', { selectedQuestions, field },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }

      );

      if (!response.data.success) {
        throw new Error('Failed to generate AI suggestions');
      }

      // const data = await response.data?.slice(1, 4); // Assuming the response is an array of suggestions
      // const suggestions = data.choices[0].message.content
      //   .split('\n')
      //   .filter(line => line.trim().length > 0)
      //   .slice(0, 3);
      const suggestions = response.data.data.slice(1, 4).map(item => item.trim());
      console.log(response.data.data);
      setAiSuggestions(prev => ({
        ...prev,
        [field]: suggestions
      }));

      setShowSuggestions(prev => ({ ...prev, [field]: true }));

    } catch (error) {
      console.error('Error generating AI suggestions:', error);
      showToast("error", "Failed to generate AI suggestions");
    } finally {
      setIsGeneratingAI(prev => ({ ...prev, [field]: false }));
    }
  };

  // Apply AI suggestion to form field
  const applySuggestion = (field, suggestion) => {
    setFormData(prev => ({
      ...prev,
      [field]: suggestion
    }));
    setShowSuggestions(prev => ({ ...prev, [field]: false }));
  };

  useEffect(() => {
    const updateStatusId = () => {
      const currentDate = new Date();
      const endDate = new Date(`${formData.end_date}T00:00:00`);

      const newStatusId = currentDate > endDate ? 0 : 1;
      setFormData((prevData) => ({
        ...prevData,
        status_id: newStatusId,
      }));
    };

    if (formData.end_date) {
      updateStatusId();
      const intervalId = setInterval(updateStatusId, 100000);
      return () => clearInterval(intervalId);
    }
  }, [formData.end_date]);

  useEffect(() => {
    if (formData.time_duration) {
      const startTime = "12:00:00";
      const minutesToAdd = parseInt(formData.time_duration, 10);

      function addMinutesToTime(startTime, minutesToAdd) {
        const [hours, minutes] = startTime.split(":").map(Number);
        const totalMinutes = hours * 60 + minutes;
        const newTotalMinutes = totalMinutes + minutesToAdd;
        const newHours = Math.floor(newTotalMinutes / 60);
        const newMinutes = newTotalMinutes % 60;
        return `${String(newHours % 24).padStart(2, "0")}:${String(
          newMinutes
        ).padStart(2, "0")}:00`;
      }

      const endTime = addMinutesToTime(startTime, minutesToAdd);
      // console.log("Calculated Start Time:", startTime);
      // console.log("Calculated End Time:", endTime);
      setStartTime(startTime);
      setEndTime(endTime);
    }
  }, [formData.time_duration]);

  const navigate = useNavigate();
  const userdata = JSON.parse(localStorage.getItem("user")) || "";
  const token = localStorage.getItem("token");
  const userRole = userdata?.role;
  const userId = userdata?.id;
  const org = JSON.parse(localStorage.getItem("org")) || "";
  let orgid = org?.id || 0;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

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

  const validate = () => {
    const newErrors = {};

    if (!formData.title && formData.title.length == 0)
      newErrors.question_type_id = "Title is required";
    if (formData.title.length > 200)
      newErrors.title = "Title should not exceed 100 characters";
    if (formData.title.length < 5)
      newErrors.title = "Title should be at least 5 characters long";
    if (!formData.image) newErrors.image = "Image URL is required";
    if (formData.image.length > 900 && formData.image.length < 10)
      newErrors.image = "Image URL should not exceed 900 characters";
    if (!formData.short_desc)
      newErrors.short_desc = "Short Description is required";
    if (formData.short_desc.length > 500)
      newErrors.short_desc = "Short Description should not exceed 200 characters";
    if (formData.short_desc.length < 10)
      newErrors.short_desc = "Short Description should be at least 10 characters long";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (formData.description.length > 1000)
      newErrors.description = "Description should not exceed 1000 characters";
    if (formData.description.length < 20)
      newErrors.description = "Description should be at least 20 characters long";
    if (!formData.start_date) newErrors.start_date = "Start Date is required";
    if (!formData.end_date) newErrors.end_date = "End Date is required";
    if (!formData.time_duration)
      newErrors.time_duration = "Time Duration is required";
    if (formData.time_duration < 0 || formData.time_duration > 200)
      newErrors.time_duration = "Time Duration should be between 0 and 200 minutes";
    if (!formData.pass_percentage)
      newErrors.pass_percentage = "Pass Percentage is required";
    if (formData.pass_percentage < 0 || formData.pass_percentage > 100)
      newErrors.pass_percentage = "Pass Percentage should be between 0 and 100";



    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataWithTime = {
      ...formData,
      start_time: startTime,
      end_time: endTime,
      created_by: userId,
      modified_by: userId,
      org_id: orgid,
      totalmarks: selectedQuestions?.map((question) => question.marks).reduce((a, b) => a + b, 0),
    };

    // console.log(formDataWithTime);
    // console.log(formData);
    // console.log(questionSetId, tagsId);
    try {
      if (token && validate()) {
        const response = await API.post("/api/questionset", formDataWithTime, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const a = response.status == 200 && response.data.id
        console.log(a);
        if (response.status == 200 && response.data.id) {
          let questionSetId = response?.data?.id;
          let jsonData = [];
          selectedQuestions.forEach((question) => {
            jsonData.push({
              question_set_id: response?.data?.id,
              question_id: question.id,
              userId: userId,
            });
          });
          await questionSetStore(jsonData);


          await API.post(
            "/api/questionset/category",
            { tagsId, questionSetId, userId },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // console.log("tags res:", res);
          const { data } = await API.get(
            `/api/followers/list/follower/detail/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          showToast("success", "QuestionSet Created Successfully!");
          // setFollowers(data)
          console.log(data)
          const headers = {
            "X-API-Token": API_TOKEN,
            "app-id": APP_ID
          };
          if (data?.length > 0) {
            await data?.forEach(async (follower) => {
              const quizAlertEmail = emailTemplates.quizAlertEmail;
              const dynamicData = {
                first_name: follower.first_name,
                last_name: follower.last_name,
                title: formData.title,
                author: formData.author,
              }
              const renderedContent = {
                subject: renderTemplate(quizAlertEmail.subject, dynamicData),
                body_text: renderTemplate(quizAlertEmail.body_text, dynamicData),
                body_html: renderTemplate(quizAlertEmail.body_html, dynamicData),
              };

              const res = await API.post(
                `https://api.communication.gotestli.com/api/send/email`,
                {
                  app_id: APP_ID,
                  sender: "gotestli07@gmail.com",
                  sender_name: "Gotestli",
                  recipients: [
                    {
                      email: follower.email,
                      name: follower.first_name,
                    }
                  ],
                  //                   content: {
                  //                     subject: `📢 New Quiz Alert from ${formData.author}! 🚀 Check it Out Now!`,
                  //                     body_text: `
                  //                           Hi ${follower.first_name},

                  //                           Great news! ${formData.author} just released a brand new quiz: "${formData.title}" on Gotestli, and you're invited to be one of the first to check it out. 🎉

                  //                           By staying updated, you get:
                  //                           - 🌟 Exclusive access to fresh quizzes
                  //                           - 📈 A chance to improve your knowledge and skills
                  //                           - 🎯 Opportunities to engage and learn with other members of the Gotestli community

                  //                           Don't miss out on the fun and the learning. Dive into the latest quiz now and see how well you can do!

                  //                           Wishing you success,
                  // The GoTestLI Team

                  // ---------------------
                  // GoTestli
                  // Test Your Limits, Expand Your Knowledge
                  // https://gotestli.com
                  //                             `,
                  //                     body_html: `
                  //                           <p>Hi <b>${follower.first_name}</b>,</p>

                  //                           <p>Great news! <b>${formData.author}</b> just released a brand new quiz: "<b>${formData.title}</b>" on Gotestli, and you're invited to be one of the first to check it out. 🎉</p>

                  //                           <p>By staying updated, you get:</p>
                  //                           <ul>
                  //                             <li>🌟 Exclusive access to fresh quizzes</li>
                  //                             <li>📈 A chance to improve your knowledge and skills</li>
                  //                             <li>🎯 Opportunities to engage and learn with other members of the Gotestli community</li>
                  //                           </ul>

                  //                           <p>Don't miss out on the fun and the learning. Dive into the latest quiz now and see how well you can do!</p>

                  //                           <p>Happy learning,<br/>
                  //                            <p>Wishing you success,<br/>  
                  // <p>GoTestli Team</p>
                  // <hr style="margin: 30px 0;" />

                  // <div style="font-size: 13px; color: #888; text-align: center;">
                  //   <img src="https://gotestli.com/assets/img/header-logo3.png" alt="GoTestLI Logo" width="120" style="margin-bottom: 10px;" />
                  //   <p><b>GoTestli</b><br/>
                  //   Test Your Limits, Expand Your Knowledge<br/>
                  //   <a href="https://gotestli.com" style="color: #ff6600; text-decoration: none;">www.gotestli.com</a></p>
                  //   <p style="margin-top: 10px; font-size: 12px;">

                  //     <a href="mailto:gotestli07@gmail.com" style="color: #666; text-decoration: none; margin: 0 5px;">✉️ gotestli07@gmail.com</a>
                  //   </p>

                  // </div>
                  //                             `,
                  //                   },
                  content: renderedContent,
                },
                // {
                //   userResultId: studentData.id,
                //   studentData: data,
                //   quizData: set,
                //   instructor: response?.data?.first_name,
                // },
                {
                  headers: {
                    Authorization: `Bearer ${token}`, ...headers
                  },
                }
              );
              // await API.post(
              //   "/api/sendemail/followers/update",

              //   {
              //     username: follower.first_name,
              //     email: follower.email,
              //     instructor: formData.author,
              //     title: formData.title,
              //   },
              //   {
              //     headers: {
              //       Authorization: `Bearer ${token}`,
              //     },
              //   }
              // );
            });
            showToast("success", "Followers Notified!!");
          }

          // if (response) {

          navigate("/instructor/home");
        }
      }
    } catch (error) {
      if (error.status == 403) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        showToast("error", "Session Timedout!");
        navigate("/login");
        return;
      } else {
        console.log(error)
        showToast("error", "Questionset Creation Failed!");
        navigate("/create/questionset");
      }
    }

    // }
  };
  // console.log(categories);
  return (
    <form className="quiz-form " onSubmit={handleSubmit}>
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
        {/* <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        /> */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>

          <label
            htmlFor="title"
            style={{
              marginBottom: "5px",
              fontWeight: "600",
              color: "#333",
              fontSize: "14px",
            }}
          >
            Title
          </label>
          <Button
            size="small"
            variant="outlined"
            onClick={() => generateAISuggestions('title')}
            disabled={isGeneratingAI.title}
            style={{
              fontSize: '12px',
              padding: '4px 8px',
              minWidth: 'auto',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {isGeneratingAI.title ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              // <FontAwesomeIcon icon={faLightbulb}/>
              <img style={{width:"25px",height:'20px'}} src="/assets/img/bulb.png"/>
            )}
            &nbsp;AI Suggest
          </Button>
        </div>
        <input
          type="text"
          name="title"
          id="title"
          // required
          style={{
            padding: "10px",
            border: "1px solid #ced4da",
            borderRadius: "8px",
            fontSize: "14px",
            outline: "none",
            backgroundColor: "#e9ecef",
            color: "#495057",
            boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
          value={formData.title}
          onChange={handleChange}
        />
        {
          errors.title && (
            <span style={{ color: 'red', fontSize: '13px' }}> <FontAwesomeIcon icon={faCircleExclamation} /> {errors.title}</span>
          )
        }
        {showSuggestions.title && aiSuggestions.title.length > 0 && (
          <div style={{ marginTop: '10px' }}>
            <small style={{ color: '#666', fontSize: '13px' }}>AI Suggestions:</small>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '5px' }}>
              {aiSuggestions.title.map((suggestion, index) => (
                <Chip
                  key={index}
                  label={suggestion}
                  variant="outlined"
                  size="small"
                  onClick={() => applySuggestion('title', suggestion)}
                  style={{
                    cursor: 'pointer',
                    fontSize: '13px',
                    maxWidth: '100%'
                  }}
                />
              ))}
            </div>
          </div>
        )}
        {/* <TextField
          required
          id="outlined-required"
          label="Title"
          type="text"
          name="title"
          value={formData.title}
          className="custom-height-questionsetform bg-white rounded w-100"
          onChange={handleChange}
        /> */}
      </div>
      <div className="form-group row ">
        <div className="form-group col-sm-12 col-md-6 d-flex flex-column ">
          {/* <label>Image:</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
        /> */}
          <label
            htmlFor="image"
            style={{
              marginBottom: "5px",
              fontWeight: "600",
              color: "#333",
              fontSize: "14px",
            }}
          >
            Image
          </label>
          <input
            type="url"
            name="image"
            id="image"
            // required
            style={{
              padding: "10px",
              border: "1px solid #ced4da",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
              backgroundColor: "#e9ecef",
              color: "#495057",
              boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
            value={formData.image}
            onChange={handleChange}
          />
          {
            errors.image && (
              <span style={{ color: 'red', fontSize: '13px' }}> <FontAwesomeIcon icon={faCircleExclamation} /> {errors.image}</span>
            )
          }
          <span className="mt-2"><span style={{ color: 'red', fontWeight: '500' }}>Note. </span>Add an image URL or provide a public image URL.</span>

          {/* <TextField
          required
          id="outlined-required"
          label="Image"
          type="text"
          name="image"
          value={formData.image}
          className="custom-height-questionsetform bg-white rounded w-100"
          onChange={handleChange}
        /> */}
        </div>

        <div className="form-group col-sm-12 col-md-6">
          {/* <label>Author:</label>
        <input
          readOnly
          type="text"
          name="author"
          value={user}
          onChange={handleChange}
        /> */}
          <label
            htmlFor="user"
            style={{
              marginBottom: "5px",
              fontWeight: "600",
              color: "#333",
              fontSize: "14px",
            }}
          >
            Author
          </label>
          <input
            type="text"
            name="user"
            id="user"
            readOnly
            style={{
              padding: "10px",
              border: "1px solid #ced4da",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
              backgroundColor: "#e9ecef",
              color: "#495057",
              boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
            value={user}
          />
          {/* <TextField
          id="outlined-read-only-input"
          label="Author"
          defaultValue={user}
          InputProps={{
            readOnly: true,
          }}
          className="custom-height-questionsetform bg-white rounded w-100"
        /> */}
        </div>
      </div>

      <div className="form-group">
        {/* <label>Short Description:</label>
        <input
          type="text"
          name="short_desc"
          value={formData.short_desc}
          onChange={handleChange}
          required
        /> */}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>

          <label
            htmlFor="short_desc"
            style={{
              marginBottom: "5px",
              fontWeight: "600",
              color: "#333",
              fontSize: "14px",
            }}
          >
            Short Description
          </label>
          <Button
            size="small"
            variant="outlined"
            onClick={() => generateAISuggestions('short_desc')}
            disabled={isGeneratingAI.short_desc}
            style={{
              fontSize: '12px',
              padding: '4px 8px',
              minWidth: 'auto'
            }}
          >
            {isGeneratingAI.short_desc ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <img style={{width:"25px",height:'20px'}} src="/assets/img/bulb.png"/>
            )}
            &nbsp;AI Suggest
          </Button>
        </div>
        <input
          type="text"
          name="short_desc"
          id="short_desc"
          // required
          style={{
            padding: "10px",
            border: "1px solid #ced4da",
            borderRadius: "8px",
            fontSize: "14px",
            outline: "none",
            backgroundColor: "#e9ecef",
            color: "#495057",
            boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
          value={formData.short_desc}
          onChange={handleChange}
        />
        {
          errors.short_desc && (
            <span style={{ color: 'red', fontSize: '13px' }}> <FontAwesomeIcon icon={faCircleExclamation} /> {errors.short_desc}</span>
          )
        }
        {showSuggestions.short_desc && aiSuggestions.short_desc.length > 0 && (
          <div style={{ marginTop: '10px' }}>
            <small style={{ color: '#666', fontSize: '13px' }}>AI Suggestions:</small>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '5px' }}>
              {aiSuggestions.short_desc.map((suggestion, index) => (
                <Chip
                  key={index}
                  label={suggestion}
                  variant="outlined"
                  size="small"
                  onClick={() => applySuggestion('short_desc', suggestion)}
                  style={{
                    cursor: 'pointer',
                    fontSize: '13px',
                    maxWidth: '100%'
                  }}
                />
              ))}
            </div>
          </div>
        )}
        {/* <TextField
          required
          id="outlined-required"
          label="Short Description"
          type="text"
          name="short_desc"
          value={formData.short_desc}
          className="custom-height-questionsetform bg-white rounded w-100"
          onChange={handleChange}
        /> */}
      </div>
      <div className="form-group">
        {/* <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea> */}
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>

          <label
          htmlFor="description"
          style={{
            marginBottom: "5px",
            fontWeight: "600",
            color: "#333",
            fontSize: "14px",
          }}
        >
          Description
        </label>
          <Button
            size="small"
            variant="outlined"
            onClick={() => generateAISuggestions('description')}
            disabled={isGeneratingAI.description}
            style={{
              fontSize: '12px',
              padding: '4px 8px',
              minWidth: 'auto'
            }}
          >
            {isGeneratingAI.description ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <img style={{width:"25px",height:'20px'}} src="/assets/img/bulb.png"/>
            )}
            &nbsp;AI Suggest
          </Button>
        </div>
        <textarea
          name="description"
          id="description"
          // required
          style={{
            padding: "10px",
            border: "1px solid #ced4da",
            borderRadius: "8px",
            fontSize: "14px",
            outline: "none",
            backgroundColor: "#e9ecef",
            color: "#495057",
            boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
          value={formData.description}
          onChange={handleChange}
        />
        {
          errors.description && (
            <span style={{ color: 'red', fontSize: '13px' }}> <FontAwesomeIcon icon={faCircleExclamation} /> {errors.description}</span>
          )
        }
         {showSuggestions.description && aiSuggestions.description.length > 0 && (
          <div style={{ marginTop: '10px' }}>
            <small style={{ color: '#666', fontSize: '13px' }}>AI Suggestions:</small>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '5px' }}>
              {aiSuggestions.description.map((suggestion, index) => (
                <Chip
                  key={index}
                  label={suggestion}
                  variant="outlined"
                  size="small"
                  onClick={() => applySuggestion('description', suggestion)}
                  style={{
                    cursor: 'pointer',
                    fontSize: '13px',
                    maxWidth: '100%'
                  }}
                />
              ))}
            </div>
          </div>
        )}
        {/* <TextField
          id="outlined-multiline-flexible"
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="custom-height-questionsetform bg-white rounded w-100"
          multiline
          maxRows={4}
        /> */}
      </div>

      <div className="form-group row  ">
        <div className="d-flex align-content-center flex-column col-sm-12 col-md-6 col-lg-4 ">
          {/* <label className="align-content-center">Start Date:</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="w-auto"
          /> */}
          <label
            htmlFor="start_date"
            style={{
              marginBottom: "5px",
              fontWeight: "600",
              color: "#333",
              fontSize: "14px",
            }}
          >
            Start Date
          </label>
          <input
            type="date"
            name="start_date"
            id="start_date"
            // required
            style={{
              padding: "10px",
              border: "1px solid #ced4da",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
              backgroundColor: "#e9ecef",
              color: "#495057",
              boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
            value={formData.start_date}
            onChange={handleChange}
          />
          {
            errors.start_date && (
              <span style={{ color: 'red', fontSize: '13px' }}> <FontAwesomeIcon icon={faCircleExclamation} /> {errors.start_date}</span>
            )
          }
          {/* <TextField
            required
            id="outlined-required"
            label="Start Date"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              placeholder: "Start Date",
            }}
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="custom-height-questionsetform bg-white rounded w-100"
          /> */}
        </div>
        <div className="d-flex align-content-center flex-column col-sm-12 col-md-6 col-lg-4 ">
          {/* <label className="align-content-center">End Date:</label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            className="w-auto"
          /> */}
          <label
            htmlFor="end_date"
            style={{
              marginBottom: "5px",
              fontWeight: "600",
              color: "#333",
              fontSize: "14px",
            }}
          >
            End Date
          </label>
          <input
            type="date"
            name="end_date"
            id="end_date"
            // required
            style={{
              padding: "10px",
              border: "1px solid #ced4da",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
              backgroundColor: "#e9ecef",
              color: "#495057",
              boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
            value={formData.end_date}
            onChange={handleChange}
          />
          {
            errors.end_date && (
              <span style={{ color: 'red', fontSize: '13px' }}><FontAwesomeIcon icon={faCircleExclamation} /> {errors.end_date}</span>
            )
          }
          {/* <TextField
            required
            id="outlined-required"
            label="End Date"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              placeholder: "End Date",
            }}
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            className="custom-height-questionsetform bg-white rounded w-100"
          /> */}
        </div>
        <div className="form-group col-sm-12 col-md-6 col-lg-4">
          {/* <label>Time Duration:</label>
        <input
          type="text"
          name="time_duration"
          value={formData.time_duration}
          onChange={handleChange}
        /> */}
          <label
            htmlFor="time_duration"
            style={{
              marginBottom: "5px",
              fontWeight: "600",
              color: "#333",
              fontSize: "14px",
            }}
          >
            Time Duration (in minutes)
          </label>
          <input
            type="number"
            name="time_duration"
            id="time_duration"
            min="0"
            max="200"
            // required
            style={{
              padding: "10px",
              border: "1px solid #ced4da",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
              backgroundColor: "#e9ecef",
              color: "#495057",
              boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
            value={formData.time_duration}
            onChange={handleChange}
          />
          {
            errors.time_duration && (
              <span style={{ color: 'red', fontSize: '13px' }}> <FontAwesomeIcon icon={faCircleExclamation} /> {errors.time_duration}</span>
            )
          }
          {/* <TextField
          required
          id="outlined-number"
          label="Time Duration (in minutes)"
          type="number"
          // InputLabelProps={{
          //   shrink: true,
          // }}
          inputProps={{
            max: 200,
            min: 0,
          }}
          name="time_duration"
          value={formData.time_duration}
          className="custom-height-questionsetform bg-white rounded w-100"
          onChange={handleChange}
        /> */}
        </div>
      </div>
      <div className="form-group row">
        <div className="form-group col-sm-12 col-md-6 col-lg-4">
          {/* <label>No. of Questions:</label>
        <input
          readOnly
          type="number"
          name="no_of_question"
          value={selectedQuestions.length}
          onChange={handleChange}
        /> */}
          <label
            htmlFor="no_of_question"
            style={{
              marginBottom: "5px",
              fontWeight: "600",
              color: "#333",
              fontSize: "14px",
            }}
          >
            No. of Questions
          </label>
          <input
            type="number"
            readOnly
            // required
            style={{
              padding: "10px",
              border: "1px solid #ced4da",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
              backgroundColor: "#e9ecef",
              color: "#495057",
              boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
            value={selectedQuestions.length}
            onChange={handleChange}
          />
          {/* <TextField
          id="outlined-read-only-input"
          label="No. of Questions"
          defaultValue={selectedQuestions.length}
          InputProps={{
            readOnly: true,
          }}
          className="custom-height-questionsetform bg-white rounded w-100"
        /> */}
        </div>

        <div className="d-flex align-content-center flex-column col-sm-12 col-md-6 col-lg-4 ">
          {/* <label className="align-content-center">Total Marks:</label>
          <input
            type="number"
            name="totalmarks"
            value={formData.totalmarks}
            onChange={handleChange}
            required
            className="w-auto"
          /> */}
          <label
            htmlFor="totalmarks"
            style={{
              marginBottom: "5px",
              fontWeight: "600",
              color: "#333",
              fontSize: "14px",
            }}
          >
            Total Marks
          </label>
          <input
            readOnly
            type="number"
            name="totalmarks"
            id="totalmarks"
            min="0"
            max="400"
            required
            style={{
              padding: "10px",
              border: "1px solid #ced4da",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
              backgroundColor: "#e9ecef",
              color: "#495057",
              boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
            value={formData.totalmarks}
            onChange={handleChange}
          />
          {/* <TextField
            required
            id="outlined-number"
            label="Total Marks"
            type="number"
            // InputLabelProps={{
            //   shrink: true,
            // }}
            inputProps={{
              max: 400,
              min: 0,
            }}
            name="totalmarks"
            value={formData.totalmarks}
            className="custom-height-questionsetform bg-white rounded w-100"
            onChange={handleChange}
          /> */}
        </div>
        <div className="d-flex align-content-center flex-column col-sm-12 col-md-6 col-lg-4">
          {/* <label className="align-content-center">Pass Percentage:</label>
          <input
            type="number"
            name="pass_percentage"
            value={formData.pass_percentage}
            onChange={handleChange}
            required
            className="w-auto"
          /> */}
          <label
            htmlFor="pass_percentage"
            style={{
              marginBottom: "5px",
              fontWeight: "600",
              color: "#333",
              fontSize: "14px",
            }}
          >
            Pass Percentage
          </label>
          <input
            type="number"
            name="pass_percentage"
            id="pass_percentage"
            min="0"
            max="100"
            // required
            style={{
              padding: "10px",
              border: "1px solid #ced4da",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
              backgroundColor: "#e9ecef",
              color: "#495057",
              boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
            value={formData.pass_percentage}
            onChange={handleChange}
          />
          {
            errors.pass_percentage && (
              <span style={{ color: 'red', fontSize: '13px' }}> <FontAwesomeIcon icon={faCircleExclamation} /> {errors.pass_percentage}</span>
            )
          }
          {/* <TextField
            required
            id="outlined-number"
            label="Pass Percentage"
            type="number"
            // InputLabelProps={{
            //   shrink: true,
            // }}
            inputProps={{
              max: 100,
              min: 0,
            }}
            name="pass_percentage"
            value={formData.pass_percentage}
            className="custom-height-questionsetform bg-white rounded w-100"
            onChange={handleChange}
          /> */}
        </div>
      </div>
      <div className="form-group">
        <Autocomplete
          multiple
          id="tags-outlined"
          options={categories}
          getOptionLabel={(option) => option.title || ""}
          filterSelectedOptions
          sx={{
            "& .MuiInputBase-input": {
              height: "35px",
              border: "none",
              padding: "12px",
              border: "1px solid #ced4da",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
              backgroundColor: "#f8f9fa",
              boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
            },
            "& .MuiOutlinedInput-root": {
              padding: "10px",
              border: "1px solid #ced4da",
              borderRadius: "8px",
              boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#f8f9fa",
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Categories"
              placeholder="Select categories"
            />
          )}
          className="custom-height-questionsetform bg-white rounded w-100"
          onChange={(event, newValue) => {
            let tags = "";
            let tagsId = "";
            // console.log(newValue);
            newValue.forEach((tag) => {
              tags = tags + "," + tag.title;
              tagsId = tagsId + "," + tag.id;
            });
            setTagsId(tagsId.slice(1));
            setFormData({
              ...formData,
              tags: tags.slice(1),
            });
          }}
        />
      </div>
      <div className="form-group ">
        {/* <label className=" d-flex gap-2 align-content-center">
          Is Demo:
          <input
            type="checkbox"
            name="is_demo"
            checked={formData.is_demo}
            onChange={handleChange}
            className="align-content-center"
          />
        </label> */}

        <FormControlLabel
          control={
            <Checkbox
              checked={formData.is_demo}
              onChange={handleChange}
              name="is_demo"
              color="primary"
            />
          }
          label="Public"
          className="w-100"
        />
      </div>
      <button className="questionset-form-button " type="submit">
        Submit
      </button>
    </form>
  );
};

export default QuestionSetDetailForm;
