import React, { useState, useEffect } from 'react';

const ProgressBar = ({ 
  progress = 0, 
}) => {
  const [motivationalMessage, setMotivationalMessage] = useState('');

  // Motivational messages based on progress percentage
  const getMotivationalMessage = (progressPercent) => {
    if (progressPercent === 0) {
      return "🚀 Ready to begin your journey? Let's dive in!";
    } else if (progressPercent <= 20) {
      return "🌟 Great start! You're building momentum!";
    } else if (progressPercent <= 40) {
      return "💪 You're doing amazing! Keep the energy flowing!";
    } else if (progressPercent <= 60) {
      return "🔥 Halfway there! Your knowledge is shining through!";
    } else if (progressPercent <= 80) {
      return "⭐ Excellent progress! You're almost at the finish line!";
    } else if (progressPercent < 100) {
      return "🏆 So close to victory! Don't stop now, champion!";
    } else {
      return "🎉 Congratulations! Quiz completed successfully!";
    }
  };

  useEffect(() => {
    setMotivationalMessage(getMotivationalMessage(progress));
  }, [progress]);

 

  return (
    <div style={{
      padding: '20px 5vw',
      textAlign: 'center',
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      margin: '20px 0',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      

      {/* Motivational message */}
      <h4 style={{
        color: '#2c3e50',
        fontSize: '18px',
        fontWeight: '600',
        margin: '15px 0',
        fontFamily: 'Arial, sans-serif'
      }}>
        {motivationalMessage}
      </h4>

      

      {/* Progress bar container */}
      <div style={{
        width: '100%',
        height: '12px',
        background: 'linear-gradient(90deg, #e9ecef 0%, #dee2e6 100%)',
        borderRadius: '6px',
        overflow: 'hidden',
        margin: '20px 0',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)'
      }}>
        {/* Progress fill with gradient and animation */}
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: progress < 50 
            ? 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
            : progress < 80
            ? 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
            : 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
          transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          borderRadius: '6px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Shimmer effect */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
            animation: progress > 0 ? 'shimmer 2s infinite' : 'none'
          }}></div>
        </div>
      </div>

      {/* Progress percentage */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '12px',
        color: '#6c757d',
        fontWeight: '500'
      }}>
        <span>0%</span>
        <span style={{
          backgroundColor: progress >= 100 ? '#28a745' : '#007bff',
          color: 'white',
          padding: '2px 8px',
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: '600'
        }}>
          {Math.round(progress)}% Complete
        </span>
        <span>100%</span>
      </div>

      {/* Encouragement for completion */}
      {progress < 100 && (
        <p style={{
          color: '#495057',
          fontSize: '13px',
          margin: '15px 0 5px 0',
          fontStyle: 'italic'
        }}>
          💡 Complete the entire quiz to unlock your detailed results and insights!
        </p>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
};




export default ProgressBar;