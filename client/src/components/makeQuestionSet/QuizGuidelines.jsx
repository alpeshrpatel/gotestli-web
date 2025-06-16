import React from 'react';

const QuizGuidelines = () => {
  const guidelines = [
    {
      text: "Include 40% easy, 40% medium, 20% hard questions",
      icon: "✅",
      color: "linear-gradient(135deg, #10b981, #059669)"
    },
    {
      text: "Minimum 10 questions per quiz",
      icon: "✅", 
      color: "linear-gradient(135deg, #3b82f6, #1d4ed8)"
    },
    {
      text: "Cover at least 3 different topics",
      icon: "✅",
      color: "linear-gradient(135deg, #a855f7, #ec4899)"
    }
  ];

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    borderRadius: '10px',
    marginBottom: '2rem',
  };

  const mainContentStyle = {
    maxWidth: '800px',
    width: '100%'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '3rem'
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '1rem',
    letterSpacing: '-0.025em',
    background: 'linear-gradient(135deg, #a855f7, #ec4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const dividerStyle = {
    width: '96px',
    height: '4px',
    background: 'linear-gradient(90deg, #a855f7, #ec4899)',
    margin: '0 auto',
    borderRadius: '2px'
  };

  const guidelinesContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  };

  const cardBaseStyle = {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '1.5rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer'
  };

  const cardContentStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    position: 'relative',
    zIndex: 2
  };

  const iconContainerBaseStyle = {
    flexShrink: 0,
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.3s ease'
  };

  const textStyle = {
    color: 'white',
    fontSize: '1.125rem',
    fontWeight: '500',
    lineHeight: '1.6',
    flexGrow: 1
  };

  const emojiStyle = {
    fontSize: '1.5rem',
    flexShrink: 0,
    transition: 'transform 0.3s ease'
  };

  const footerStyle = {
    textAlign: 'center',
    marginTop: '3rem'
  };

  const footerContentStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '0.875rem'
  };

  const pulseStyle = {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    animation: 'pulse 2s infinite'
  };

  return (
    <div style={containerStyle}>
      <div style={mainContentStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <h1 style={{fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem'}}>
            Quiz Creation <span style={titleStyle}>Guidelines</span> 
          </h1>
          <div style={dividerStyle}></div>
        </div>

        {/* Guidelines Cards */}
        <div style={guidelinesContainerStyle}>
          {guidelines.map((guideline, index) => (
            <div
              key={index}
              style={{
                ...cardBaseStyle,
                animationDelay: `${index * 0.2}s`,
                animation: 'slideInUp 0.6s ease-out both'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4)';
                
                const iconContainer = e.currentTarget.querySelector('.icon-container');
                const emoji = e.currentTarget.querySelector('.emoji');
                if (iconContainer) iconContainer.style.transform = 'scale(1.1)';
                if (emoji) emoji.style.transform = 'scale(1.25)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
                
                const iconContainer = e.currentTarget.querySelector('.icon-container');
                const emoji = e.currentTarget.querySelector('.emoji');
                if (iconContainer) iconContainer.style.transform = 'scale(1)';
                if (emoji) emoji.style.transform = 'scale(1)';
              }}
            >
              {/* Background Effect */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: guideline.color,
                opacity: 0,
                transition: 'opacity 0.3s ease',
                zIndex: 1
              }}></div>
              
              {/* Content */}
              <div style={cardContentStyle}>
                {/* Icon Container */}
                <div 
                  className="icon-container"
                  style={{
                    ...iconContainerBaseStyle,
                    background: guideline.color
                  }}
                >
                  <span style={{ color: 'white', fontSize: '1.25rem' }}>✓</span>
                </div>
                
                {/* Text */}
                <div style={textStyle}>
                  {guideline.text}
                </div>
                
                {/* Emoji */}
                <div className="emoji" style={emojiStyle}>
                  {guideline.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={footerStyle}>
          <div style={footerContentStyle}>
            <div style={{
              ...pulseStyle,
              background: '#a855f7'
            }}></div>
            <span>Follow these guidelines for optimal quiz quality</span>
            <div style={{
              ...pulseStyle,
              background: '#ec4899',
              animationDelay: '0.5s'
            }}></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @media (max-width: 768px) {
          .main-title {
            font-size: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default QuizGuidelines;