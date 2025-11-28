import { API } from '@/utils/AxiosInstance';
import { useState } from 'react';

export default function GameConfigModal({ onClose, qSetId, ViewGamePin }) {

    const [timePerQuestion, setTimePerQuestion] = useState('');
    const [scorePerQuestion, setScorePerQuestion] = useState('');
      const [copySuccess, setCopySuccess] = useState(false);
    const [timeError, setTimeError] = useState('');
    const [scoreError, setScoreError] = useState('');

    const generateRandomPin = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        let isValid = true;



        if (!timePerQuestion || parseInt(timePerQuestion) < 5 || parseInt(timePerQuestion) > 300) {
            setTimeError('Time must be between 5-300 seconds');
            isValid = false;
        }

        if (!scorePerQuestion || parseInt(scorePerQuestion) < 1 || parseInt(scorePerQuestion) > 1000) {
            setScoreError('Score must be between 1-1000 points');
            isValid = false;
        }

        if (isValid) {
            console.log('Game Config:', {

                timePerQuestion: parseInt(timePerQuestion),
                scorePerQuestion: parseInt(scorePerQuestion)
            });

            try {
                const response = await API.put(`/api/questionset/update/gameconfig/${qSetId}`, {
                    timePerQuestion: parseInt(timePerQuestion),
                    scorePerQuestion: parseInt(scorePerQuestion),
                    gamePin: generateRandomPin()
                });
            } catch (error) {

            }
            // Handle successful submission here
            if (onClose) onClose();
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget && onClose) {
            onClose();
        }
    };

     const handleCopyPin = async () => {
    try {
      await navigator.clipboard.writeText(ViewGamePin);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
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
        closeBtn: {
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '20px',
            color: '#ffffff',
            transition: 'all 0.3s ease',
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
        inputGroup: {
            marginBottom: '20px',
        },
        label: {
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: '8px',
        },
        input: {
            width: '100%',
            padding: '14px 16px',
            fontSize: '16px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            color: '#333',
            outline: 'none',
            transition: 'all 0.3s ease',
            boxSizing: 'border-box',
        },

        error: {
            fontSize: '13px',
            color: '#ff6b6b',
            marginTop: '6px',
            marginBottom: 0,
            fontWeight: '500',
        },
        submitBtn: {
            width: '100%',
            padding: '16px',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#ffffff',
            backgroundColor: '#478be5',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 10px 30px rgba(71, 139, 229, 0.4)',
            marginTop: '30px',
        },
         pinDisplayContainer: {
      textAlign: 'center',
    },
    pinDisplayTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: '20px',
    },
    pinDisplayBox: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '16px',
      padding: '30px',
      marginBottom: '24px',
    },
    pinDisplayText: {
      fontSize: '48px',
      fontWeight: 'bold',
      color: '#667eea',
      letterSpacing: '8px',
      marginBottom: '10px',
    },
    pinDisplayHelper: {
      fontSize: '14px',
      color: '#666',
      marginTop: '10px',
    },
    copyBtn: {
      width: '100%',
      padding: '16px',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#ffffff',
      backgroundColor: '#10b981',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)',
      marginBottom: '12px',
    },
    doneBtn: {
      width: '100%',
      padding: '16px',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#ffffff',
      backgroundColor: '#478be5',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 10px 30px rgba(71, 139, 229, 0.4)',
    },
    };
    console.log('viewGamePin:', ViewGamePin);

    return (
        <div style={styles.modalOverlay}>
            <div style={styles.modal}>
                {
                    ViewGamePin ? (
                        <div style={styles.pinDisplayContainer}>
                             <button
                                style={styles.closeBtn}
                                onClick={onClose}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                                }}
                            >
                                ✕
                            </button>
                            <h2 style={styles.pinDisplayTitle}>🎉 Game Ready!</h2>
                            <div style={styles.pinDisplayBox}>
                                <p style={styles.pinDisplayText}>{ViewGamePin}</p>
                                <p style={styles.pinDisplayHelper}>Share this PIN with players to join</p>
                            </div>
                            <button
                                onClick={handleCopyPin}
                                style={styles.copyBtn}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'scale(1.02)';
                                    e.target.style.boxShadow = '0 15px 40px rgba(16, 185, 129, 0.6)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'scale(1)';
                                    e.target.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.4)';
                                }}
                            >
                                {copySuccess ? '✓ Copied!' : '📋 Copy PIN'}
                            </button>
                            <button
                                onClick={onClose}
                                style={styles.doneBtn}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'scale(1.02)';
                                    e.target.style.boxShadow = '0 15px 40px rgba(71, 139, 229, 0.6)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'scale(1)';
                                    e.target.style.boxShadow = '0 10px 30px rgba(71, 139, 229, 0.4)';
                                }}
                            >
                                Done
                            </button>
                        </div>
                    ) : (
                        <>

                            <button
                                style={styles.closeBtn}
                                onClick={onClose}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                                }}
                            >
                                ✕
                            </button>
                            <h2 style={styles.modalTitle}>🎮 Game Configuration</h2>
                            <div>


                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Time Per Question (seconds)</label>
                                    <input
                                        type="number"
                                        style={styles.input}
                                        placeholder="30"
                                        value={timePerQuestion}
                                        onChange={(e) => {
                                            setTimePerQuestion(e.target.value);
                                            setTimeError('');
                                        }}
                                        min="5"
                                        max="300"
                                    />
                                    <p style={styles.helper}>How long players have to answer (5-300 seconds)</p>
                                    {timeError && <p style={styles.error}>{timeError}</p>}
                                </div>

                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Score Per Question (points)</label>
                                    <input
                                        type="number"
                                        style={styles.input}
                                        placeholder="100"
                                        value={scorePerQuestion}
                                        onChange={(e) => {
                                            setScorePerQuestion(e.target.value);
                                            setScoreError('');
                                        }}
                                        min="1"
                                        max="1000"
                                    />
                                    <p style={styles.helper}>Points awarded for correct answers (1-1000 points)</p>
                                    {scoreError && <p style={styles.error}>{scoreError}</p>}
                                </div>

                                <button
                                    onClick={handleSubmit}
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
                                    Save
                                </button>
                            </div>
                        </>
                    )
                }

            </div>
        </div>
    );
}