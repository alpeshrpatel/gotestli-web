import React, { useState } from 'react';
import './QuestionSetDetailForm.css' 

const QuestionSetDetailForm = ( ) => {
  const [formData, setFormData] = useState({
    org_id: '',
    title: '',
    question_set_url: '',
    image: '',
    author: '',
    short_desc: '',
    description: '',
    start_time: '',
    end_time: '',
    start_date: '',
    end_date: '',
    time_duration: '',
    no_of_question: '',
    status_id: '',
    is_demo: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form className="quiz-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Org ID:</label>
        <input
          type="number"
          name="org_id"
          value={formData.org_id}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Question Set URL:</label>
        <input
          type="text"
          name="question_set_url"
          value={formData.question_set_url}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Image:</label>
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Author:</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Short Description:</label>
        <input
          type="text"
          name="short_desc"
          value={formData.short_desc}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="form-group">
        <label>Start Time:</label>
        <input
          type="time"
          name="start_time"
          value={formData.start_time}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>End Time:</label>
        <input
          type="time"
          name="end_time"
          value={formData.end_time}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Start Date:</label>
        <input
          type="date"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>End Date:</label>
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Time Duration:</label>
        <input
          type="text"
          name="time_duration"
          value={formData.time_duration}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>No. of Questions:</label>
        <input
          type="number"
          name="no_of_question"
          value={formData.no_of_question}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Status ID:</label>
        <input
          type="number"
          name="status_id"
          value={formData.status_id}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>
          Is Demo:
          <input
            type="checkbox"
            name="is_demo"
            checked={formData.is_demo}
            onChange={handleChange}
          />
        </label>
      </div>
      <button className='questionset-form-button' type="submit">Submit</button>
    </form>
  );
};

export default QuestionSetDetailForm; 
