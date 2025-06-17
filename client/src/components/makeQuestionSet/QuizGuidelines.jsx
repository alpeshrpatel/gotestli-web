// import React from 'react';

// const QuizGuidelines = () => {
//   const guidelines = [
//     {
//       text: "Include 40% easy, 40% medium, 20% hard questions",
//       icon: "✅",
//       color: "linear-gradient(135deg, #10b981, #059669)"
//     },
//     {
//       text: "Minimum 10 questions per quiz",
//       icon: "✅", 
//       color: "linear-gradient(135deg, #3b82f6, #1d4ed8)"
//     },
//     {
//       text: "Cover at least 3 different topics",
//       icon: "✅",
//       color: "linear-gradient(135deg, #a855f7, #ec4899)"
//     }
//   ];

//   const containerStyle = {
//     minHeight: '100vh',
//     background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: '2rem',
//     fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
//     borderRadius: '10px',
//     marginBottom: '2rem',
//   };

//   const mainContentStyle = {
//     maxWidth: '800px',
//     width: '100%'
//   };

//   const headerStyle = {
//     textAlign: 'center',
//     marginBottom: '3rem'
//   };

//   const titleStyle = {
//     fontSize: '1.5rem',
//     fontWeight: 'bold',
//     color: 'white',
//     marginBottom: '1rem',
//     letterSpacing: '-0.025em',
//     background: 'linear-gradient(135deg, #a855f7, #ec4899)',
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//     backgroundClip: 'text'
//   };

//   const dividerStyle = {
//     width: '96px',
//     height: '4px',
//     background: 'linear-gradient(90deg, #a855f7, #ec4899)',
//     margin: '0 auto',
//     borderRadius: '2px'
//   };

//   const guidelinesContainerStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '1.5rem'
//   };

//   const cardBaseStyle = {
//     position: 'relative',
//     overflow: 'hidden',
//     borderRadius: '16px',
//     background: 'rgba(255, 255, 255, 0.05)',
//     backdropFilter: 'blur(10px)',
//     border: '1px solid rgba(255, 255, 255, 0.1)',
//     padding: '1.5rem',
//     transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//     cursor: 'pointer'
//   };

//   const cardContentStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '1rem',
//     position: 'relative',
//     zIndex: 2
//   };

//   const iconContainerBaseStyle = {
//     flexShrink: 0,
//     width: '48px',
//     height: '48px',
//     borderRadius: '50%',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
//     transition: 'transform 0.3s ease'
//   };

//   const textStyle = {
//     color: 'white',
//     fontSize: '1.125rem',
//     fontWeight: '500',
//     lineHeight: '1.6',
//     flexGrow: 1
//   };

//   const emojiStyle = {
//     fontSize: '1.5rem',
//     flexShrink: 0,
//     transition: 'transform 0.3s ease'
//   };

//   const footerStyle = {
//     textAlign: 'center',
//     marginTop: '3rem'
//   };

//   const footerContentStyle = {
//     display: 'inline-flex',
//     alignItems: 'center',
//     gap: '0.5rem',
//     color: 'rgba(255, 255, 255, 0.6)',
//     fontSize: '0.875rem'
//   };

//   const pulseStyle = {
//     width: '8px',
//     height: '8px',
//     borderRadius: '50%',
//     animation: 'pulse 2s infinite'
//   };

//   return (
//     <div style={containerStyle}>
//       <div style={mainContentStyle}>
//         {/* Header */}
//         <div style={headerStyle}>
//           <h1 style={{fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem'}}>
//             Quiz Creation <span style={titleStyle}>Guidelines</span> 
//           </h1>
//           <div style={dividerStyle}></div>
//         </div>

//         {/* Guidelines Cards */}
//         <div style={guidelinesContainerStyle}>
//           {guidelines.map((guideline, index) => (
//             <div
//               key={index}
//               style={{
//                 ...cardBaseStyle,
//                 animationDelay: `${index * 0.2}s`,
//                 animation: 'slideInUp 0.6s ease-out both'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = 'scale(1.02)';
//                 e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
//                 e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
//                 e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.4)';
                
//                 const iconContainer = e.currentTarget.querySelector('.icon-container');
//                 const emoji = e.currentTarget.querySelector('.emoji');
//                 if (iconContainer) iconContainer.style.transform = 'scale(1.1)';
//                 if (emoji) emoji.style.transform = 'scale(1.25)';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = 'scale(1)';
//                 e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
//                 e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
//                 e.currentTarget.style.boxShadow = 'none';
                
//                 const iconContainer = e.currentTarget.querySelector('.icon-container');
//                 const emoji = e.currentTarget.querySelector('.emoji');
//                 if (iconContainer) iconContainer.style.transform = 'scale(1)';
//                 if (emoji) emoji.style.transform = 'scale(1)';
//               }}
//             >
//               {/* Background Effect */}
//               <div style={{
//                 position: 'absolute',
//                 inset: 0,
//                 background: guideline.color,
//                 opacity: 0,
//                 transition: 'opacity 0.3s ease',
//                 zIndex: 1
//               }}></div>
              
//               {/* Content */}
//               <div style={cardContentStyle}>
//                 {/* Icon Container */}
//                 <div 
//                   className="icon-container"
//                   style={{
//                     ...iconContainerBaseStyle,
//                     background: guideline.color
//                   }}
//                 >
//                   <span style={{ color: 'white', fontSize: '1.25rem' }}>✓</span>
//                 </div>
                
//                 {/* Text */}
//                 <div style={textStyle}>
//                   {guideline.text}
//                 </div>
                
//                 {/* Emoji */}
//                 <div className="emoji" style={emojiStyle}>
//                   {guideline.icon}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Footer */}
//         <div style={footerStyle}>
//           <div style={footerContentStyle}>
//             <div style={{
//               ...pulseStyle,
//               background: '#a855f7'
//             }}></div>
//             <span>Follow these guidelines for optimal quiz quality</span>
//             <div style={{
//               ...pulseStyle,
//               background: '#ec4899',
//               animationDelay: '0.5s'
//             }}></div>
//           </div>
//         </div>
//         <div>
//           <span>
//             Want to customize this guidelines?
//           </span>
//         </div>
//       </div>

//       <style>{`
//         @keyframes slideInUp {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes pulse {
//           0%, 100% {
//             opacity: 1;
//           }
//           50% {
//             opacity: 0.5;
//           }
//         }

//         @media (max-width: 768px) {
//           .main-title {
//             font-size: 2rem !important;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default QuizGuidelines;


import React, { useState } from 'react';

const QuizGuidelines = ({customSettings, setCustomSettings}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [customSettings, setCustomSettings] = useState({
  //   easyPercentage: 40,
  //   mediumPercentage: 40,
  //   hardPercentage: 20,
  //   minQuestions: 10,
  //   minTopics: 3
  // });

  const guidelines = [
    {
      text: `Include ${customSettings.easyPercentage}% easy, ${customSettings.mediumPercentage}% medium, ${customSettings.hardPercentage}% hard questions`,
      icon: "✅",
      color: "linear-gradient(135deg, #10b981, #059669)"
    },
    {
      text: `Minimum ${customSettings.minQuestions} questions per quiz`,
      icon: "✅", 
      color: "linear-gradient(135deg, #3b82f6, #1d4ed8)"
    },
    {
      text: `Cover at least ${customSettings.minTopics} different topics`,
      icon: "✅",
      color: "linear-gradient(135deg, #a855f7, #ec4899)"
    }
  ];

  const handleSettingsChange = (field, value) => {
    setCustomSettings(prev => ({
      ...prev,
      [field]: parseInt(value) || 0
    }));
  };

  const handleSave = () => {
    // Ensure percentages add up to 100
    const total = customSettings.easyPercentage + customSettings.mediumPercentage + customSettings.hardPercentage;
    if (total !== 100) {
      alert('Percentages must add up to 100%');
      return;
    }
    setIsModalOpen(false);
  };

  const resetToDefaults = () => {
    setCustomSettings({
      easyPercentage: 40,
      mediumPercentage: 40,
      hardPercentage: 20,
      minQuestions: 10,
      minTopics: 3
    });
  };

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

  const customizeLinkStyle = {
    color: '#a855f7',
    textDecoration: 'underline',
    cursor: 'pointer',
    transition: 'color 0.3s ease',
    fontSize: '0.875rem',
    marginTop: '1rem'
  };

  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(5px)',
    animation: 'fadeIn 0.3s ease-out'
  };

  const modalStyle = {
    background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    borderRadius: '20px',
    padding: '2rem',
    width: '90%',
    maxWidth: '500px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
    animation: 'slideInUp 0.3s ease-out'
  };

  const modalHeaderStyle = {
    textAlign: 'center',
    marginBottom: '2rem'
  };

  const modalTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '0.5rem',
    background: 'linear-gradient(135deg, #a855f7, #ec4899)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  const formGroupStyle = {
    marginBottom: '1.5rem'
  };

  const labelStyle = {
    display: 'block',
    color: 'white',
    fontSize: '0.875rem',
    fontWeight: '500',
    marginBottom: '0.5rem'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    background: 'rgba(255, 255, 255, 0.05)',
    color: 'white',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    outline: 'none'
  };

  const percentageGroupStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '1rem',
    marginBottom: '1.5rem'
  };

  const buttonGroupStyle = {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem'
  };

  const buttonBaseStyle = {
    flex: 1,
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    border: 'none',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    outline: 'none'
  };

  const primaryButtonStyle = {
    ...buttonBaseStyle,
    background: 'linear-gradient(135deg, #a855f7, #ec4899)',
    color: 'white'
  };

  const secondaryButtonStyle = {
    ...buttonBaseStyle,
    background: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  };

  const resetButtonStyle = {
    ...buttonBaseStyle,
    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
    color: 'white'
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
          <div 
            style={customizeLinkStyle}
            onClick={() => setIsModalOpen(true)}
            onMouseEnter={(e) => e.target.style.color = '#ec4899'}
            onMouseLeave={(e) => e.target.style.color = '#a855f7'}
          >
            Want to customize these guidelines? Click here
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={modalOverlayStyle} onClick={() => setIsModalOpen(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeaderStyle}>
              <h2 style={modalTitleStyle}>Customize Guidelines</h2>
              <div style={{
                width: '60px',
                height: '3px',
                background: 'linear-gradient(90deg, #a855f7, #ec4899)',
                margin: '0 auto',
                borderRadius: '2px'
              }}></div>
            </div>

            <div>
              {/* Difficulty Percentages */}
              <div style={formGroupStyle}>
                <div style={labelStyle}>Question Difficulty Distribution (%)</div>
                <div style={percentageGroupStyle}>
                  <div>
                    <div style={{...labelStyle, fontSize: '0.75rem', marginBottom: '0.25rem'}}>Easy</div>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={customSettings.easyPercentage}
                      onChange={(e) => handleSettingsChange('easyPercentage', e.target.value)}
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#a855f7';
                        e.target.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <div style={{...labelStyle, fontSize: '0.75rem', marginBottom: '0.25rem'}}>Medium</div>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={customSettings.mediumPercentage}
                      onChange={(e) => handleSettingsChange('mediumPercentage', e.target.value)}
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#a855f7';
                        e.target.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <div style={{...labelStyle, fontSize: '0.75rem', marginBottom: '0.25rem'}}>Hard</div>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={customSettings.hardPercentage}
                      onChange={(e) => handleSettingsChange('hardPercentage', e.target.value)}
                      style={inputStyle}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#a855f7';
                        e.target.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>
                <div style={{fontSize: '0.75rem', color: customSettings.easyPercentage + customSettings.mediumPercentage + customSettings.hardPercentage === 100 ? '#10b981' : '#ef4444', marginTop: '0.5rem'}}>
                  Total: {customSettings.easyPercentage + customSettings.mediumPercentage + customSettings.hardPercentage}% 
                  {customSettings.easyPercentage + customSettings.mediumPercentage + customSettings.hardPercentage !== 100 && ' (Must equal 100%)'}
                </div>
              </div>

              {/* Minimum Questions */}
              <div style={formGroupStyle}>
                <div style={labelStyle}>Minimum Questions per Quiz</div>
                <input
                  type="number"
                  min="1"
                  value={customSettings.minQuestions}
                  onChange={(e) => handleSettingsChange('minQuestions', e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#a855f7';
                    e.target.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Minimum Topics */}
              <div style={formGroupStyle}>
                <div style={labelStyle}>Minimum Number of Topics</div>
                <input
                  type="number"
                  min="1"
                  value={customSettings.minTopics}
                  onChange={(e) => handleSettingsChange('minTopics', e.target.value)}
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#a855f7';
                    e.target.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Buttons */}
              <div style={buttonGroupStyle}>
                <button
                  type="button"
                  style={resetButtonStyle}
                  onClick={resetToDefaults}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  Reset to Defaults
                </button>
                <button
                  type="button"
                  style={secondaryButtonStyle}
                  onClick={() => setIsModalOpen(false)}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  style={primaryButtonStyle}
                  onClick={handleSave}
                  onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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