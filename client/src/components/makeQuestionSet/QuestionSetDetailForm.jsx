import React, { useEffect, useState } from "react";
import "./QuestionSetDetailForm.css";
import { API } from "@/utils/AxiosInstance";
import { auth } from "@/firebase/Firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { showToast } from "@/utils/toastService";

const QuestionSetDetailForm = ({
  selectedQuestions,
  categories,
  questionSetId,
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
    totalmarks: "",
    pass_percentage: "",
  });
  const [tagsId, setTagsId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

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
  const userRole = userdata.role;
  const userId = userdata.id;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataWithTime = {
      ...formData,
      start_time: startTime,
      end_time: endTime,
      created_by: userId,
      modified_by: userId,
    };

    // console.log(formDataWithTime);
    // console.log(formData);
    // console.log(questionSetId, tagsId);
    try {
      if (token) {
        const response = await API.post("/api/questionset", formDataWithTime, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response)
        const res = await API.post(
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
        data.forEach(async (follower) => {
          await API.post(
            "/api/sendemail/followers/update",
            {
              username: follower.first_name,
              email: follower.email,
              instructor: formData.author,
              title: formData.title,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        });
        // if (response) {
        showToast("success", "Followers Notified!!");
        navigate("/instructor/home");
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

    // }
  };
  // console.log(categories);
  return (
    <form className="quiz-form " onSubmit={handleSubmit}>
      <div className="form-group">
        {/* <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        /> */}
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
        <input
          type="text"
          name="title"
          id="title"
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
          value={formData.title}
          onChange={handleChange}
        />
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
          value={formData.image}
          onChange={handleChange}
        />
        <span className="mt-2"><span style={{color:'red',fontWeight:'500'}}>Note. </span>Add an image URL or provide a public image URL.</span>
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
        <input
          type="text"
          name="short_desc"
          id="short_desc"
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
          value={formData.short_desc}
          onChange={handleChange}
        />
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
        <textarea
          name="description"
          id="description"
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
          value={formData.description}
          onChange={handleChange}
        />
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
            value={formData.start_date}
            onChange={handleChange}
          />
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
            value={formData.end_date}
            onChange={handleChange}
          />
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
            value={formData.time_duration}
            onChange={handleChange}
          />
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
            value={formData.pass_percentage}
            onChange={handleChange}
          />
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
