import React, { useState } from "react";
import "./QuestionSetDetailForm.css";
import { API } from "@/utils/AxiosInstance";
import { auth } from "@/firebase/Firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";

const QuestionSetDetailForm = ({ selectedQuestions }) => {
  const user = auth.currentUser.displayName;
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    author: user,
    short_desc: "",
    description: "",
    start_date: "",
    end_date: "",
    time_duration: "",
    no_of_question: selectedQuestions.length,
    is_demo: false,
    totalmarks:'',
    pass_percentage:'',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const response = await API.post("/api/questionset", formData);
    // if (response) {
      toast.success("QuestionSet Created Successfully!");
      navigate("/");
    // }
  };

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
        <TextField
          required
          id="outlined-required"
          label="Title"
          type="text"
          name="title"
          value={formData.title}
          className="custom-height-questionsetform bg-white rounded w-100"
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        {/* <label>Image:</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
        /> */}
        <TextField
          required
          id="outlined-required"
          label="Image"
          type="text"
          name="image"
          value={formData.image}
          className="custom-height-questionsetform bg-white rounded w-100"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        {/* <label>Author:</label>
        <input
          readOnly
          type="text"
          name="author"
          value={user}
          onChange={handleChange}
        /> */}
        <TextField
          id="outlined-read-only-input"
          label="Author"
          defaultValue={user}
          InputProps={{
            readOnly: true,
          }}
          className="custom-height-questionsetform bg-white rounded w-100"
        />
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
        <TextField
          required
          id="outlined-required"
          label="Short Description"
          type="text"
          name="short_desc"
          value={formData.short_desc}
          className="custom-height-questionsetform bg-white rounded w-100"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        {/* <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea> */}
        <TextField
          id="outlined-multiline-flexible"
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="custom-height-questionsetform bg-white rounded w-100"
          multiline
          maxRows={4}
        />
      </div>

      <div className="form-group row  ">
        <div className="d-flex align-content-center col gap-4">
          {/* <label className="align-content-center">Start Date:</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            className="w-auto"
          /> */}
          <TextField
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
          />
        </div>
        <div className="d-flex align-content-center col gap-4">
          {/* <label className="align-content-center">End Date:</label>
          <input
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            className="w-auto"
          /> */}
          <TextField
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
          />
        </div>
      </div>
      <div className="form-group">
        {/* <label>Time Duration:</label>
        <input
          type="text"
          name="time_duration"
          value={formData.time_duration}
          onChange={handleChange}
        /> */}
        <TextField
          required
          id="outlined-number"
          label="Time Duration (in minutes)"
          type="number"
          // InputLabelProps={{
          //   shrink: true,
          // }}
          inputProps={{ 
            max: 200, 
            min: 0    
          }}
          name="time_duration"
          value={formData.time_duration}
          className="custom-height-questionsetform bg-white rounded w-100"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        {/* <label>No. of Questions:</label>
        <input
          readOnly
          type="number"
          name="no_of_question"
          value={selectedQuestions.length}
          onChange={handleChange}
        /> */}
        <TextField
          id="outlined-read-only-input"
          label="No. of Questions"
          defaultValue={selectedQuestions.length}
          InputProps={{
            readOnly: true,
          }}
          className="custom-height-questionsetform bg-white rounded w-100"
        />
      </div>
      <div className="form-group row">
        <div className="d-flex align-content-center col gap-4">
          {/* <label className="align-content-center">Total Marks:</label>
          <input
            type="number"
            name="totalmarks"
            value={formData.totalmarks}
            onChange={handleChange}
            required
            className="w-auto"
          /> */}
           <TextField
          required
          id="outlined-number"
          label="Total Marks"
          type="number"
          // InputLabelProps={{
          //   shrink: true,
          // }}
          inputProps={{ 
            max: 400, 
            min: 0    
          }}
          name="totalmarks"
          value={formData.totalmarks}
          className="custom-height-questionsetform bg-white rounded w-100"
          onChange={handleChange}
        />
        </div>
        <div className="d-flex align-content-center col gap-4">
          {/* <label className="align-content-center">Pass Percentage:</label>
          <input
            type="number"
            name="pass_percentage"
            value={formData.pass_percentage}
            onChange={handleChange}
            required
            className="w-auto"
          /> */}
           <TextField
          required
          id="outlined-number"
          label="Pass Percentage"
          type="number"
          // InputLabelProps={{
          //   shrink: true,
          // }}
          inputProps={{ 
            max: 100, 
            min: 0    
          }}
          name="pass_percentage"
          value={formData.pass_percentage}
          className="custom-height-questionsetform bg-white rounded w-100"
          onChange={handleChange}
        />
        </div>
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
        label="Is Demo"
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
