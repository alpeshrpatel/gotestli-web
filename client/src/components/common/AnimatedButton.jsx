import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

export default function AnimatedButton() {
  const [isHovered, setIsHovered] = useState(false);
  const [isSmallScreen] = useState(window.innerWidth < 576);

  const normalStyle = {
    position: 'relative',
    padding: isSmallScreen ? '10px 20px' : '14px 32px',
    fontSize: isSmallScreen ? '14px' : '16px',
    fontWeight: '600',
    color: '#2f8dee',
    background: 'transparent',
    border: '2px solid transparent',
    borderRadius: '8px',
    cursor: 'pointer',
    overflow: 'hidden',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'all 0.3s ease',
    paddingLeft: isSmallScreen ? '16px' : '40px',
    paddingRight: isSmallScreen ? '16px' : '40px',
    paddingTop: isSmallScreen ? '14px' : '20px',
    paddingBottom: isSmallScreen ? '10px' : '18px',
    background: '#140342',
    zIndex: 1
  };

  const hoverStyle = {
    ...normalStyle,
    color: '#fff',
    background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
    transform: 'translateY(-3px) scale(1.05)',
    boxShadow: '0 15px 35px rgba(139, 92, 246, 0.5), 0 0 20px rgba(47, 141, 238, 0.3)',
  };

  const rotatingBorderStyle = {
    position: 'absolute',
    top: '-3px',
    left: '-3px',
    right: '-3px',
    bottom: '-3px',
    borderRadius: '10px',
    background: 'linear-gradient(45deg, #2f8dee, #06b6d4, #8b5cf6, #ec4899, #f59e0b, #10b981, #2f8dee)',
    backgroundSize: '400% 400%',
    animation: 'rotate-gradient 4s linear infinite',
    zIndex: 0,
  };

  const innerBorderStyle = {
    position: 'absolute',
    top: '2px',
    left: '2px',
    right: '2px',
    bottom: '2px',
    borderRadius: '8px',
    background: isHovered ? 'linear-gradient(135deg, #06b6d4, #8b5cf6)' : '#140342',
    zIndex: 0,
  };

  const sparkleStyle = {
    position: 'absolute',
    width: '6px',
    height: '6px',
    background: '#fff',
    borderRadius: '50%',
    animation: 'sparkle 1.5s ease-in-out infinite',
    opacity: isHovered ? 1 : 0,
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
  };

  const glowStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100%',
    height: '100%',
    transform: 'translate(-50%, -50%)',
    background: 'radial-gradient(circle, rgba(47, 141, 238, 0.3) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'glow-pulse 2s ease-in-out infinite',
    opacity: isHovered ? 1 : 0,
    pointerEvents: 'none',
  };

  return (
    <div style={{  display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
      
      <style>
        {`
          @keyframes rotate-gradient {
            0% { background-position: 0% 50%; transform: rotate(0deg); }
            100% { background-position: 400% 50%; transform: rotate(360deg); }
          }
          
          @keyframes sparkle {
            0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
            50% { opacity: 1; transform: scale(1) rotate(180deg); }
          }

          @keyframes pulse {
            0%, 100% { transform: scale(1) rotate(0deg); }
            50% { transform: scale(1.2) rotate(15deg); }
          }

          @keyframes glow-pulse {
            0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 0.6; transform: translate(-50%, -50%) scale(1.2); }
          }
        `}
      </style>

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <a
          href="/play"
          style={isHovered ? hoverStyle : normalStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`${isSmallScreen ? `-sm` : `-md`}  text-white}`}
        >
          <div style={rotatingBorderStyle}></div>
          <div style={innerBorderStyle}></div>
           <div style={glowStyle}></div>
          {isHovered && (
            <>
             
              
              {/* Sparkle effects */}
              <span style={{ ...sparkleStyle, top: '15%', left: '10%', animationDelay: '0s' }}></span>
              <span style={{ ...sparkleStyle, top: '70%', right: '12%', animationDelay: '0.3s' }}></span>
              <span style={{ ...sparkleStyle, bottom: '20%', left: '25%', animationDelay: '0.6s' }}></span>
              <span style={{ ...sparkleStyle, top: '35%', right: '20%', animationDelay: '0.9s' }}></span>
              <span style={{ ...sparkleStyle, top: '50%', left: '50%', animationDelay: '0.45s' }}></span>
            </>
          )}
          
          <span style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '8px', color: isHovered ? '#fff' : '#2f8dee' }}>
           
          <FontAwesomeIcon icon={faBolt}  style={{ 
                fontSize: '18px',
                animation: isHovered ? 'pulse 0.6s ease-in-out infinite' : 'none',
                filter: isHovered ? 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.8))' : 'none'
              }} />
            Play Quizzes
          </span>
        </a>
      </div>
    </div>
  );
}