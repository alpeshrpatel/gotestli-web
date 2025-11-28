import React, { useState, useEffect } from 'react';
import { faPlus, faTrash, faSave, faCheckCircle, faTimesCircle, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const GameQuizCreator = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    imageUrl: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock data - replace with actual API calls
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = user?.id;
  const org = JSON.parse(localStorage.getItem('org') || '{}');
  const orgid = org?.id || 0;

  const handleOptionChange = (index, value) => {
    const newOptions = [...currentQuestion.options];
    newOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: newOptions });
    
    // Clear error for this option
    if (errors[`option${index}`]) {
      const newErrors = { ...errors };
      delete newErrors[`option${index}`];
      setErrors(newErrors);
    }
  };

  const handleCorrectAnswerChange = (optionText) => {
    setCurrentQuestion({ ...currentQuestion, correctAnswer: optionText });
    if (errors.correctAnswer) {
      const newErrors = { ...errors };
      delete newErrors.correctAnswer;
      setErrors(newErrors);
    }
  };

  const validateQuestion = () => {
    const newErrors = {};
    
    if (!currentQuestion.question.trim()) {
      newErrors.question = 'Question is required';
    }
    
    const filledOptions = currentQuestion.options.filter(opt => opt.trim());
    if (filledOptions.length < 2) {
      newErrors.options = 'At least 2 options are required';
    }
    
    currentQuestion.options.forEach((opt, index) => {
      if (opt.trim() && opt.length > 200) {
        newErrors[`option${index}`] = 'Option too long (max 200 chars)';
      }
    });
    
    if (!currentQuestion.correctAnswer) {
      newErrors.correctAnswer = 'Please select a correct answer';
    } else if (!currentQuestion.options.includes(currentQuestion.correctAnswer)) {
      newErrors.correctAnswer = 'Correct answer must be one of the options';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddQuestion = () => {
    if (validateQuestion()) {
      const questionData = {
        ...currentQuestion,
        options: currentQuestion.options.filter(opt => opt.trim()),
        id: Date.now() // Temporary ID
      };
      
      setQuestions([...questions, questionData]);
      setCurrentQuestion({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: '',
        imageUrl: '',
        description: ''
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
  };

  const handleRemoveQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const createQuestionPayload = (question, paragraphId) => {
    return {
      org_id: orgid,
      paragraph_id: paragraphId || null,
      question: question.question,
      options: question.options.join(':'),
      correctAnswer: question.correctAnswer,
      description: question.description || 'Game Quiz Question',
      explanation: question.description || 'Game Quiz Question',
      question_type_id: 2, // Single choice
      status_id: 1,
      complexity: 'easy',
      marks: 1,
      is_negative: 0,
      negative_marks: 0,
      userId: userId
    };
  };

  const handleSubmitQuiz = async () => {
    if (questions.length === 0) {
      alert('Please add at least one question');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // This is a simulation - replace with actual API calls
      console.log('Submitting questions:', questions);
      
      // Step 1: Create paragraph entry (if needed)
      const paragraphResponse = await mockApiCall('/api/question/paragraph', {
        paragraph: 'Game Quiz',
        userId: userId
      });
      
      const paragraphId = paragraphResponse.id;
      
      // Step 2: Insert each question
      const insertedQuestions = [];
      for (const question of questions) {
        const questionPayload = createQuestionPayload(question, paragraphId);
        
        const questionResponse = await mockApiCall('/api/questionmaster', questionPayload);
        const questionId = questionResponse.id;
        
        // Step 3: Insert options for each question
        await mockApiCall('/api/options', {
          qid: questionId,
          options: questionPayload.options,
          correctAnswer: questionPayload.correctAnswer,
          userId: userId
        });
        
        insertedQuestions.push({
          ...question,
          id: questionId,
          dbId: questionId
        });
      }
      
      // Step 4: Prepare data for QuestionSetDetailForm
      const questionSetData = {
        selectedQuestions: insertedQuestions.map(q => ({
          id: q.dbId,
          question: q.question,
          options: q.options.join(':'),
          correctAnswer: q.correctAnswer,
          description: q.description,
          complexity: 'easy',
          marks: 1,
          imageUrl: q.imageUrl
        })),
        isGameQuiz: true
      };
      
      console.log('Question set data ready:', questionSetData);
      alert('Questions created successfully! Ready to create question set.');
      
      // Here you would open the QuestionSetDetailForm modal
      // onOpenQuestionSetModal(questionSetData);
      
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Error creating quiz. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock API call function - replace with actual API calls
  const mockApiCall = async (endpoint, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ id: Math.floor(Math.random() * 10000), data });
      }, 500);
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #06b6d4 0%, #2f8dee 50%, #8b5cf6 100%)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '20px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <h1 style={{
            fontSize: 'clamp(24px, 5vw, 36px)',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '10px',
            textAlign: 'center'
          }}>
            🎮 Create Game Quiz
          </h1>
          <p style={{
            textAlign: 'center',
            color: '#64748b',
            fontSize: 'clamp(14px, 2vw, 16px)'
          }}>
            Build engaging single-choice quiz questions for your game
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth > 968 ? '1fr 1fr' : '1fr',
          gap: '20px'
        }}>
          {/* Question Creator */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{
              fontSize: 'clamp(20px, 4vw, 24px)',
              marginBottom: '20px',
              color: '#1e293b'
            }}>
              Create Question
            </h2>

            {/* Question Input */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#334155',
                fontSize: '14px'
              }}>
                Question *
              </label>
              <textarea
                value={currentQuestion.question}
                onChange={(e) => {
                  setCurrentQuestion({ ...currentQuestion, question: e.target.value });
                  if (errors.question) {
                    const newErrors = { ...errors };
                    delete newErrors.question;
                    setErrors(newErrors);
                  }
                }}
                placeholder="Enter your quiz question..."
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: errors.question ? '2px solid #ef4444' : '2px solid #e2e8f0',
                  fontSize: '15px',
                  fontFamily: 'inherit',
                  minHeight: '80px',
                  resize: 'vertical',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#06b6d4'}
                onBlur={(e) => e.target.style.borderColor = errors.question ? '#ef4444' : '#e2e8f0'}
              />
              {errors.question && (
                <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                  {errors.question}
                </p>
              )}
            </div>

            {/* Image URL */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#334155',
                fontSize: '14px'
              }}>
                <FontAwesomeIcon icon={faImage} style={{ marginRight: '6px' }} />
                Image URL (Optional)
              </label>
              <input
                type="url"
                value={currentQuestion.imageUrl}
                onChange={(e) => setCurrentQuestion({ ...currentQuestion, imageUrl: e.target.value })}
                placeholder="https://example.com/image.jpg"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '2px solid #e2e8f0',
                  fontSize: '15px',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#06b6d4'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>

            {/* Description */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '600',
                color: '#334155',
                fontSize: '14px'
              }}>
                Description (Optional)
              </label>
              <input
                type="text"
                value={currentQuestion.description}
                onChange={(e) => setCurrentQuestion({ ...currentQuestion, description: e.target.value })}
                placeholder="Brief description or hint..."
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '10px',
                  border: '2px solid #e2e8f0',
                  fontSize: '15px',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#06b6d4'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              />
            </div>

            {/* Options */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '12px',
                fontWeight: '600',
                color: '#334155',
                fontSize: '14px'
              }}>
                Answer Options * (At least 2 required)
              </label>
              {currentQuestion.options.map((option, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '12px'
                }}>
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={currentQuestion.correctAnswer === option && option.trim() !== ''}
                    onChange={() => handleCorrectAnswerChange(option)}
                    disabled={!option.trim()}
                    style={{
                      width: '20px',
                      height: '20px',
                      cursor: option.trim() ? 'pointer' : 'not-allowed',
                      accentColor: '#06b6d4'
                    }}
                  />
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      borderRadius: '10px',
                      border: errors[`option${index}`] ? '2px solid #ef4444' : '2px solid #e2e8f0',
                      fontSize: '14px',
                      transition: 'all 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#06b6d4'}
                    onBlur={(e) => e.target.style.borderColor = errors[`option${index}`] ? '#ef4444' : '#e2e8f0'}
                  />
                </div>
              ))}
              {errors.options && (
                <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                  {errors.options}
                </p>
              )}
              {errors.correctAnswer && (
                <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>
                  {errors.correctAnswer}
                </p>
              )}
              <p style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>
                💡 Select the radio button to mark the correct answer
              </p>
            </div>

            {/* Add Question Button */}
            <button
              onClick={handleAddQuestion}
              style={{
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(135deg, #06b6d4, #2f8dee)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(6, 182, 212, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(6, 182, 212, 0.3)';
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
              Add Question
            </button>

            {showSuccess && (
              <div style={{
                marginTop: '12px',
                padding: '12px',
                background: '#dcfce7',
                color: '#166534',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px'
              }}>
                <FontAwesomeIcon icon={faCheckCircle} />
                Question added successfully!
              </div>
            )}
          </div>

          {/* Questions List */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '30px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            maxHeight: '700px',
            overflow: 'auto'
          }}>
            <h2 style={{
              fontSize: 'clamp(20px, 4vw, 24px)',
              marginBottom: '20px',
              color: '#1e293b',
              position: 'sticky',
              top: 0,
              background: 'rgba(255, 255, 255, 0.95)',
              paddingBottom: '10px',
              zIndex: 1
            }}>
              Questions ({questions.length})
            </h2>

            {questions.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                color: '#94a3b8'
              }}>
                <p style={{ fontSize: '48px', marginBottom: '10px' }}>📝</p>
                <p>No questions added yet. Start creating!</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {questions.map((q, index) => (
                  <div key={q.id} style={{
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05), rgba(139, 92, 246, 0.05))',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '2px solid rgba(6, 182, 212, 0.2)',
                    position: 'relative'
                  }}>
                    <button
                      onClick={() => handleRemoveQuestion(q.id)}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: '#fee2e2',
                        color: '#dc2626',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#fecaca';
                        e.target.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = '#fee2e2';
                        e.target.style.transform = 'scale(1)';
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>

                    <p style={{
                      fontWeight: '600',
                      color: '#1e293b',
                      marginBottom: '12px',
                      paddingRight: '40px',
                      fontSize: '15px'
                    }}>
                      Q{index + 1}: {q.question}
                    </p>

                    {q.imageUrl && (
                      <div style={{
                        marginBottom: '12px',
                        padding: '8px',
                        background: 'rgba(255, 255, 255, 0.6)',
                        borderRadius: '8px',
                        fontSize: '12px',
                        color: '#64748b',
                        wordBreak: 'break-all'
                      }}>
                        🖼️ {q.imageUrl}
                      </div>
                    )}

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {q.options.map((opt, i) => (
                        <div key={i} style={{
                          padding: '8px 12px',
                          background: opt === q.correctAnswer ? 
                            'rgba(34, 197, 94, 0.1)' : 
                            'rgba(255, 255, 255, 0.6)',
                          borderRadius: '8px',
                          fontSize: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          border: opt === q.correctAnswer ? 
                            '2px solid #22c55e' : 
                            '1px solid rgba(226, 232, 240, 0.8)'
                        }}>
                          {opt === q.correctAnswer && (
                            <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#22c55e' }} />
                          )}
                          <span style={{
                            color: opt === q.correctAnswer ? '#166534' : '#475569',
                            fontWeight: opt === q.correctAnswer ? '600' : '400'
                          }}>
                            {opt}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit Quiz Button */}
        {questions.length > 0 && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '20px',
            padding: '30px',
            marginTop: '20px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <button
              onClick={handleSubmitQuiz}
              disabled={isSubmitting}
              style={{
                padding: '16px 48px',
                background: isSubmitting ? 
                  '#94a3b8' : 
                  'linear-gradient(135deg, #8b5cf6, #06b6d4)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 6px 20px rgba(139, 92, 246, 0.4)'
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 24px rgba(139, 92, 246, 0.5)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.4)';
                }
              }}
            >
              <FontAwesomeIcon icon={faSave} />
              {isSubmitting ? 'Creating Quiz...' : 'Create Question Set'}
            </button>
            <p style={{
              marginTop: '16px',
              color: '#64748b',
              fontSize: '14px'
            }}>
              {questions.length} question{questions.length !== 1 ? 's' : ''} ready to be saved
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameQuizCreator;