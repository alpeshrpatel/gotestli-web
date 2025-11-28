import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faUsers,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { useLocation, useNavigate } from 'react-router-dom';
import { API } from '@/utils/AxiosInstance';
import { showToast } from '@/utils/toastService';

const MultiPlayerQuiz = () => {
  const location = useLocation();
  const navigate = useNavigate();


  // const questionSetId = location?.state?.questionSetId || null;
  const userId = location?.state?.userId || null;
  const [questionSetId, setQuestionSetId] = useState(location?.state?.questionSetId || null);
  const [gameState, setGameState] = useState(questionSetId ? 'nickname' : 'pin');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [scores, setScores] = useState(0);
  const [quizData, setQuizData] = useState({ questions: [], gameTime:  15, gameScore:  100 });
  const [timeLeft, setTimeLeft] = useState(quizData.gameTime || 15);
  const [showCorrect, setShowCorrect] = useState(false);
  const [flipCard, setFlipCard] = useState(false);

  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);

  const [gamePin, setGamePin] = useState('');
  const [nickname, setNickname] = useState('');
  const [pinError, setPinError] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  // const navigate = useNavigate();
  // const {

  //   questionSetId,
  //   userId,
  // } = location.state;
  const org = JSON.parse(localStorage.getItem("org")) || "";
  let orgid = org?.id || 0;
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userid = user?.id || 0;

  console.log("Question Set in MultiPlayerQuiz:", questionSetId, userId);

  useEffect(() => {
    const fetchQuestionSet = async () => {
      try {
        const questionResponse = await API.get(
          `/api/questionset/gameplay/public/allquestions/qset/${questionSetId}?orgid=${orgid}`,

        );
        setQuestions(questionResponse.data.res || []);
        console.log("questionResponse.data:", questionResponse.data);
        const quizDataFinal = {
          questions: questionResponse.data.res.length > 0 ? questionResponse.data.res.map((q) => ({
            id: q.question_id,
            question: q.question,
          })) : [],
          gameTime: questionResponse.data.res[0].game_time,
          gameScore: questionResponse.data.res[0].game_score
        };
        console.log("quizDataFinal:", quizDataFinal);
        setQuizData(quizDataFinal);

      } catch (error) {
        console.error("Error fetching question set:", error);
      }
    };

    fetchQuestionSet();
  }, [questionSetId]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {

        const response = await API.get(`/api/options/gameplay/public/${quizData?.questions[currentQuestion]?.id}?orgid=${orgid}`);
        const shuffleArray = (arr) => {
          return arr
            .map((a) => [Math.random(), a])
            .sort((a, b) => a[0] - b[0])
            .map((a) => a[1]);
        };
        console.log("Options response data:", response);
        const shuffledOptions = shuffleArray(response.data || []);

        setOptions(shuffledOptions);
        //       const quizDataFinal = {
        //   questions: questions.length > 0 ? questions.map((q) => ({
        //     id: q.question_id,
        //     question: q.question,
        //     options: options
        //       .filter((opt) => opt.question_id === q.id)
        //       .map((opt) => opt.question_option),
        //     correct: options.findIndex((opt) => opt.question_id === q.id && opt.is_correct_answer === 1)
        //   })) : []
        // };
        setQuizData((prev) => {
          return (
            prev.questions.length > 0 ? {
              ...prev, questions: prev.questions.map((q, idx) => quizData?.questions[currentQuestion]?.id ? {
                ...q,
                options: shuffledOptions
                  .filter((opt) => opt.question_id === q.id)
                  .map((opt) => opt.options),
                correct: shuffledOptions.findIndex((opt) => opt.question_id === q.id && opt.answer === 1)
              } : q)
            } : prev
          )
        })
      } catch (error) {
        console.error("Error fetching question set:", error);
      }
    };

    fetchOptions();
  }, [currentQuestion, questionSetId]);



  // Sample quiz data
  // const quizData = {
  //   questions: [
  //     {
  //       question: "What is the capital of France?",
  //       options: ["London", "Berlin", "Paris", "Madrid"],
  //       correct: 2
  //     },
  //     {
  //       question: "Which planet is known as the Red Planet?",
  //       options: ["Venus", "Mars", "Jupiter", "Saturn"],
  //       correct: 1
  //     },
  //     {
  //       question: "What is 2 + 2?",
  //       options: ["3", "4", "5", "6"],
  //       correct: 1
  //     }
  //   ]
  // };
  console.log("Questions:", questions);
  console.log('quizData:', quizData);
  console.log("Options:", options);

  const quizDataFinal = {
    questions: questions.length > 0 ? questions.map((q) => ({
      id: q.question_id,
      question: q.question,
      options: options
        .filter((opt) => opt.question_id === q.id)
        .map((opt) => opt.question_option),
      correct: options.findIndex((opt) => opt.question_id === q.id && opt.is_correct_answer === 1)
    })) : []
  };


  // Sample players data
  const players = { id: 1, name: nickname, avatar: "🎮", score: 0 };



  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0 && !showCorrect) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showCorrect) {
      handleTimeUp();
    }
  }, [timeLeft, gameState, showCorrect]);

  useEffect(() => {
    if (gameState === 'results') {
      fetchLeaderBoard()
    }
  }, [gameState])

  const startGame = () => {
    setGameState('playing');
    setScores(0);
    setFlipCard(true);
    setTimeout(() => setFlipCard(false), 600);
  };

  const handleAnswer = (index) => {
    if (showCorrect) return;
    setSelectedAnswer(index);
    setShowCorrect(true);

    // Simulate score calculation
    const isCorrect = index === quizData.questions[currentQuestion].correct;
    const basePoints = quizData.gameScore || 100;
    const timeBonus = timeLeft * 10;
    const pointsEarned = isCorrect ? basePoints + timeBonus : 0;
    // const pointsEarned = isCorrect ? Math.max(100, timeLeft * 10) : 0;

    setScores(prevScores => (prevScores + pointsEarned));

    setTimeout(() => {
      if (currentQuestion < quizData.questions.length - 1) {
        nextQuestion();
      } else {
        endGame();
      }
    }, 2500);
  };

  const handleTimeUp = () => {
    setShowCorrect(true);
    setTimeout(() => {
      if (currentQuestion < quizData.questions.length - 1) {
        nextQuestion();
      } else {
        endGame();
      }
    }, 2500);
  };

  const nextQuestion = () => {
    setFlipCard(true);
    setTimeout(() => {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowCorrect(false);
      setTimeLeft(quizData.gameTime || 15);
      setFlipCard(false);
    }, 600);
  };

  const submitScore = async () => {
    try {
      const response = await API.post('/api/leaderboard', {
        user_id: userid,
        user_name: nickname,
        game_pin: gamePin,
        quiz_id: questionSetId,
        total_score: scores,
        total_time_taken: (quizData.questions.length * quizData.gameTime) - timeLeft,
        rank_position: 0,
        badges_earned: '',
        created_by: userid,
        modified_by: userid
      });
      console.log("Leaderboard submission response:", response.data);
      return response.data; // Return the data for potential use
    } catch (error) {
      console.error("Error submitting score to leaderboard:", error);
      throw error; // Re-throw to handle in endGame if needed
    }
  }

  const fetchLeaderBoard = async () => {
    try {
      const response = await API.get(`/api/leaderboard/quiz/${questionSetId}`);
      console.log("Leaderboard fetch response:", response.data);
      const sorted = [...response.data].sort((a, b) => b.total_score - a.total_score);
      setLeaderboard(sorted || []);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
      showToast("Error fetching leaderboard data", "error");
    }
  }

  const endGame = async () => {
    try {
      await submitScore(); // Wait for POST to complete
      setGameState('results');
      await fetchLeaderBoard(); // Then fetch updated data
    } catch (error) {
      console.error("Error in endGame:", error);
      // Handle error appropriately
    }
  };
  const resetGame = () => {
    setGameState('lobby');
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setTimeLeft(quizData.gameTime || 15);
    setShowCorrect(false);
    setFlipCard(false);
  };

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    setPinError('');

    if (gamePin.length !== 6) {
      setPinError('Game PIN must be exactly 6 digits');
      return;
    }

    if (!/^\d+$/.test(gamePin)) {
      setPinError('Game PIN must contain only numbers');
      return;
    }

    try {
      const questionResponse = await API.get(
        `/api/questionset/gameplay/allquestions/gamepin/${gamePin}?orgid=${orgid}`,

      );
      setQuestions(questionResponse.data.res || []);
      setQuestionSetId(questionResponse.data.res[0]?.question_set_id || null);
      console.log("questionResponse.data:", questionResponse.data);
      const quizDataFinal = {
        questions: questionResponse.data.res.length > 0 ? questionResponse.data.res.map((q) => ({
          id: q.question_id,
          question: q.question,

        })) : [],
        gameTime: questionResponse.data.res[0].game_time,
        gameScore: questionResponse.data.res[0].game_score
      };

      console.log("quizDataFinal:", quizDataFinal);
      setQuizData(quizDataFinal);

    } catch (error) {
      console.error("Error validating Game PIN:", error);
    }
    setGameState('nickname');
  };

  const handleNicknameSubmit = (e) => {
    e.preventDefault();
    setNicknameError('');

    if (nickname.trim().length < 2) {
      setNicknameError('Nickname must be at least 2 characters');
      return;
    }

    if (nickname.trim().length > 20) {
      setNicknameError('Nickname must be less than 20 characters');
      return;
    }

    // Here you would register the player with your backend
    setGameState('lobby');
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #140342 0%, #2a0866 50%, #140342 100%)',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    },
    bgAnimation: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.1,
      pointerEvents: 'none'
    },
    circle: {
      position: 'absolute',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #478be5, #bb52c7)',
      animation: 'float 20s infinite ease-in-out'
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      animation: 'fadeIn 0.3s ease-out'
    },
    modal: {
      background: 'rgba(20, 3, 66, 0.95)',
      backdropFilter: 'blur(20px)',
      border: '3px solid rgba(107, 163, 247, 0.4)',
      borderRadius: '30px',
      padding: '50px',
      maxWidth: '500px',
      width: '90%',
      position: 'relative',
      animation: 'slideUp 0.4s ease-out',
      boxShadow: '0 20px 60px rgba(71, 139, 229, 0.5)'
    },
    modalTitle: {
      fontSize: '2.5rem',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #6ba3f7, #e597ec)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '30px',
      textAlign: 'center'
    },
    input: {
      width: '100%',
      padding: '18px 24px',
      fontSize: '1.2rem',
      fontWeight: '600',
      border: '2px solid rgba(107, 163, 247, 0.4)',
      borderRadius: '15px',
      background: 'rgba(71, 139, 229, 0.1)',
      color: 'white',
      outline: 'none',
      transition: 'all 0.3s ease',
      textAlign: 'center',
      letterSpacing: gameState === 'pin' ? '8px' : 'normal'
    },
    submitBtn: {
      width: '100%',
      background: 'linear-gradient(135deg, #478be5, #bb52c7)',
      border: 'none',
      borderRadius: '15px',
      padding: '18px',
      fontSize: '1.2rem',
      fontWeight: '700',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '20px',
      boxShadow: '0 10px 30px rgba(71, 139, 229, 0.4)'
    },
    error: {
      color: '#ff4757',
      fontSize: '0.9rem',
      marginTop: '10px',
      textAlign: 'center',
      fontWeight: '600'
    },
    helper: {
      color: '#6ba3f7',
      fontSize: '0.9rem',
      marginTop: '10px',
      textAlign: 'center'
    },
    lobby: {
      maxWidth: '800px',
      margin: '0 auto',
      textAlign: 'center',
      position: 'relative',
      zIndex: 1,
      animation: 'fadeIn 0.6s ease-out'
    },
    title: {
      fontSize: '3.5rem',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #6ba3f7, #e597ec)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '20px',
      animation: 'slideDown 0.8s ease-out'
    },
    playerGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: '20px',
      margin: '40px 0',
      animation: 'slideUp 0.8s ease-out'
    },
    playerCard: {
      background: 'rgba(71, 139, 229, 0.15)',
      backdropFilter: 'blur(10px)',
      border: '2px solid rgba(107, 163, 247, 0.3)',
      borderRadius: '20px',
      padding: '25px',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    startBtn: {
      background: 'linear-gradient(135deg, #478be5, #bb52c7)',
      border: 'none',
      borderRadius: '50px',
      padding: '18px 60px',
      fontSize: '1.3rem',
      fontWeight: '700',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 10px 30px rgba(71, 139, 229, 0.4)',
      animation: 'pulse 2s infinite'
    },
    gameContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 1
    },
    topBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      flexWrap: 'wrap',
      gap: '15px'
    },
    timer: {
      background: 'rgba(187, 82, 199, 0.2)',
      backdropFilter: 'blur(10px)',
      border: '2px solid rgba(229, 151, 236, 0.4)',
      borderRadius: '50%',
      width: '120px',
      height: '100px',
      display: 'flex',
    
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.8rem',
      fontWeight: '800',
      color: '#e597ec',
      animation: timeLeft <= 5 ? 'shake 0.5s infinite' : 'none'
    },
    playersBar: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap',
      flex: 1,
      justifyContent: 'center'
    },
    playerChip: {
      background: 'rgba(71, 139, 229, 0.2)',
      backdropFilter: 'blur(10px)',
      border: '2px solid rgba(107, 163, 247, 0.4)',
      borderRadius: '25px',
      padding: '8px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: 'white',
      fontSize: '0.9rem',
      fontWeight: '600'
    },
    cardContainer: {
      perspective: '1500px',
      marginBottom: '30px'
    },
    card: {
      background: 'rgba(20, 3, 66, 0.6)',
      backdropFilter: 'blur(20px)',
      border: '3px solid rgba(107, 163, 247, 0.3)',
      borderRadius: '30px',
      padding: '50px',
      minHeight: '400px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      // transform: flipCard ? 'rotateY(180deg)' : 'rotateY(0deg)',
      transition: 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
      transformStyle: 'preserve-3d',
      boxShadow: '0 20px 60px rgba(71, 139, 229, 0.3)'
    },
    questionText: {
      fontSize: '2rem',
      fontWeight: '700',
      color: 'white',
      marginBottom: '40px',
      textAlign: 'center',
      lineHeight: '1.4'
    },
    optionsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px'
    },
    option: {
      background: 'rgba(71, 139, 229, 0.15)',
      backdropFilter: 'blur(10px)',
      border: '2px solid rgba(107, 163, 247, 0.3)',
      borderRadius: '20px',
      padding: '25px',
      fontSize: '1.1rem',
      fontWeight: '600',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      textAlign: 'center'
    },
    optionSelected: {
      background: 'rgba(187, 82, 199, 0.3)',
      border: '2px solid #e597ec',
      transform: 'scale(1.05)',
      boxShadow: '0 10px 30px rgba(187, 82, 199, 0.4)'
    },
    optionCorrect: {
      background: 'rgba(46, 213, 115, 0.3)',
      border: '2px solid #2ed573',
      animation: 'correctPulse 0.6s ease-out'
    },
    optionWrong: {
      background: 'rgba(255, 71, 87, 0.3)',
      border: '2px solid #ff4757',
      animation: 'shake 0.5s ease-out'
    },
    resultsContainer: {
      maxWidth: '700px',
      margin: '0 auto',
      position: 'relative',
      zIndex: 1,
      animation: 'fadeIn 0.8s ease-out'
    },
    resultsTitle: {
      fontSize: '3rem',
      fontWeight: '800',
      textAlign: 'center',
      marginBottom: '40px',
      background: 'linear-gradient(135deg, #6ba3f7, #e597ec)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    podium: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '20px',
      alignItems: 'end',
      marginBottom: '30px'
    },
    podiumPlace: {
      background: 'rgba(71, 139, 229, 0.2)',
      backdropFilter: 'blur(20px)',
      border: '3px solid rgba(107, 163, 247, 0.4)',
      borderRadius: '20px',
      padding: '30px 20px',
      textAlign: 'center',
      transition: 'all 0.5s ease',
      animation: 'slideUp 0.8s ease-out'
    },
    rank1: {
      background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 193, 7, 0.2))',
      border: '3px solid gold',
      gridRow: 'span 1',
      order: 2,
      transform: 'scale(1.1)',
      height: '280px'
    },
    rank2: {
      background: 'rgba(192, 192, 192, 0.2)',
      border: '3px solid silver',
      order: 1,
      height: '240px'
    },
    rank3: {
      background: 'rgba(205, 127, 50, 0.2)',
      border: '3px solid #cd7f32',
      order: 3,
      height: '200px'
    },
    otherPlayers: {
      background: 'rgba(71, 139, 229, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '2px solid rgba(107, 163, 247, 0.3)',
      borderRadius: '15px',
      padding: '15px',
      marginTop: '20px'
    }
  };

  const LobbyScreen = () => (
    <div style={styles.lobby}>
      <h1 style={styles.title}>🎮 Quiz Battle 🎮</h1>
      <p style={{ color: '#6ba3f7', fontSize: '1.3rem', marginBottom: '30px' }}>
        <FontAwesomeIcon icon={faUsers} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
        {/* <Users size={24} style={{ verticalAlign: 'middle', marginRight: '8px' }} /> */}
        {/* {players.length} Players Ready */}
      </p>
      {/* <div style={styles.playerGrid}>
        {players.map((player, i) => (
          <div
            key={player.id}
            style={{
              ...styles.playerCard,
              animationDelay: `${i * 0.1}s`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
              e.currentTarget.style.borderColor = '#e597ec';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(187, 82, 199, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.borderColor = 'rgba(107, 163, 247, 0.3)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '10px' }}>{player.avatar}</div>
            <div style={{ color: 'white', fontSize: '1.1rem', fontWeight: '600' }}>{player.name}</div>
          </div>
        ))}
      </div> */}
      <button
        style={styles.startBtn}
        onClick={startGame}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.boxShadow = '0 15px 50px rgba(71, 139, 229, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 10px 30px rgba(71, 139, 229, 0.4)';
        }}
      >
        <FontAwesomeIcon icon={faBolt} style={{ verticalAlign: 'middle', marginRight: '10px' }} />
        {/* <Zap size={24} style={{ verticalAlign: 'middle', marginRight: '10px' }} /> */}
        Start Quiz
      </button>
    </div>
  );

  const GameScreen = () => (
    <div style={styles.gameContainer}>
      <div style={styles.topBar}>
        <div style={styles.timer}>
          <FontAwesomeIcon icon={faClock} style={{ position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)' }} />

          {/* <Clock size={24}  /> */}
          {timeLeft}
        </div>
        <div style={styles.playersBar}>

          <div key={players.id} style={styles.playerChip}>
            <span>{players.avatar}</span>
            <span>{players.name}</span>
            <span>{scores}</span>
          </div>

        </div>
        <div style={{ color: '#6ba3f7', fontSize: '1.2rem', fontWeight: '700' }}>
          {currentQuestion + 1}/{quizData.questions.length}
        </div>
      </div>

      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <div style={styles.questionText}>
            {quizData.questions[currentQuestion].question}
          </div>
          <div style={styles.optionsGrid}>
            {quizData.questions[currentQuestion]?.options?.map((option, index) => {
              let optionStyle = { ...styles.option };

              if (showCorrect && index === quizData.questions[currentQuestion].correct) {
                optionStyle = { ...optionStyle, ...styles.optionCorrect };
              } else if (showCorrect && selectedAnswer === index && index !== quizData.questions[currentQuestion].correct) {
                optionStyle = { ...optionStyle, ...styles.optionWrong };
              } else if (selectedAnswer === index) {
                optionStyle = { ...optionStyle, ...styles.optionSelected };
              }

              return (
                <button
                  key={index}
                  style={optionStyle}
                  onClick={() => handleAnswer(index)}
                  disabled={showCorrect}
                  onMouseEnter={(e) => {
                    if (!showCorrect) {
                      e.target.style.transform = 'scale(1.05)';
                      e.target.style.borderColor = '#e597ec';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!showCorrect && selectedAnswer !== index) {
                      e.target.style.transform = 'scale(1)';
                      e.target.style.borderColor = 'rgba(107, 163, 247, 0.3)';
                    }
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );

  const ResultsScreen = () => (
    <div style={styles.resultsContainer}>
      <h1 style={styles.resultsTitle}>
        {/* <FontAwesomeIcon icon={faTrophy} color='#' style={{ verticalAlign: 'middle', marginRight: '15px' }} /> */}
        <span>🏆</span>
        {/* <Trophy size={50} style={{ verticalAlign: 'middle', marginRight: '15px' }} /> */}
        Final Results
      </h1>

      <div style={styles.podium}>
        {leaderboard.slice(0, 3).map((player, index) => {
          let placeStyle = { ...styles.podiumPlace };
          if (index === 0) placeStyle = { ...placeStyle, ...styles.rank1 };
          else if (index === 1) placeStyle = { ...placeStyle, ...styles.rank2 };
          else placeStyle = { ...placeStyle, ...styles.rank3 };

          return (
            <div key={player.id} style={placeStyle}>
              <div style={{ fontSize: '4rem', marginBottom: '10px' }}>
                {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
              </div>
              <div style={{ fontSize: '2.5rem', marginBottom: '5px' }}>{player.avatar}</div>
              <div style={{ color: 'white', fontSize: '1.3rem', fontWeight: '700', marginBottom: '10px' }}>
                {player.user_name}
              </div>
              <div style={{ color: '#6ba3f7', fontSize: '2rem', fontWeight: '800' }}>
                {player.total_score}
              </div>
            </div>
          );
        })}
      </div>

      {leaderboard.length > 3 && (
        <div style={styles.otherPlayers}>
          {leaderboard.slice(3).map((player, index) => (
            <div key={player.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px',
              borderBottom: index < leaderboard.length - 4 ? '1px solid rgba(107, 163, 247, 0.2)' : 'none'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ color: '#6ba3f7', fontSize: '1.2rem', fontWeight: '700' }}>#{index + 4}</span>
                <span style={{ fontSize: '1.5rem' }}>{player.avatar}</span>
                <span style={{ color: 'white', fontSize: '1rem', fontWeight: '600' }}>{player.user_name}</span>
              </div>
              <span style={{ color: '#6ba3f7', fontSize: '1.3rem', fontWeight: '700' }}>{player.total_score}</span>
            </div>
          ))}
        </div>
      )}

      <button
        style={{ ...styles.startBtn, marginTop: '40px' }}
        onClick={resetGame}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.boxShadow = '0 15px 50px rgba(71, 139, 229, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 10px 30px rgba(71, 139, 229, 0.4)';
        }}
      >
        Play Again
      </button>
    </div>
  );

  const PinModal = () => (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <h2 style={styles.modalTitle}>🎮 Enter Game PIN</h2>
        <form onSubmit={handlePinSubmit}>
          <input
            type="text"
            style={styles.input}
            placeholder="000000"
            value={gamePin}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 6);
              setGamePin(value);
              setPinError('');
            }}
            maxLength={6}
            autoFocus
          />
          <p style={styles.helper}>Enter the 6-digit game PIN</p>
          {pinError && <p style={styles.error}>{pinError}</p>}
          <button
            type="submit"
            style={styles.submitBtn}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.02)';
              e.target.style.boxShadow = '0 15px 40px rgba(71, 139, 229, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 10px 30px rgba(71, 139, 229, 0.4)';
            }}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );

  const NicknameModal = () => (
    <div style={styles.modalOverlay}>
      <div style={styles.modal}>
        <h2 style={styles.modalTitle}>👤 Choose Your Nickname</h2>
        <form onSubmit={handleNicknameSubmit}>
          <input
            type="text"
            style={styles.input}
            placeholder="Enter your nickname"
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value);
              setNicknameError('');
            }}
            maxLength={20}
            autoFocus
          />
          <p style={styles.helper}>Choose a nickname (2-20 characters)</p>
          {nicknameError && <p style={styles.error}>{nicknameError}</p>}
          <button
            type="submit"
            style={styles.submitBtn}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.02)';
              e.target.style.boxShadow = '0 15px 40px rgba(71, 139, 229, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 10px 30px rgba(71, 139, 229, 0.4)';
            }}
          >
            Join Game
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <div style={styles.bgAnimation}>
        <div style={{ ...styles.circle, width: '300px', height: '300px', top: '10%', left: '5%', animationDelay: '0s' }} />
        <div style={{ ...styles.circle, width: '200px', height: '200px', top: '60%', right: '10%', animationDelay: '2s' }} />
        <div style={{ ...styles.circle, width: '150px', height: '150px', bottom: '10%', left: '50%', animationDelay: '4s' }} />
      </div>

      {gameState === 'pin' && <PinModal />}
      {gameState === 'nickname' && <NicknameModal />}
      {gameState === 'lobby' && <LobbyScreen />}
      {gameState === 'playing' && <GameScreen />}
      {gameState === 'results' && <ResultsScreen />}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { transform: translateY(-50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 20px) scale(1.05); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        @keyframes correctPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default MultiPlayerQuiz;