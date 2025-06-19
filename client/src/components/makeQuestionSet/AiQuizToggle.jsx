import React, { useState } from 'react';
import { Switch, FormControlLabel } from '@mui/material';

export default function AiQuizToggle({ aiMode, setAiMode }) {


  const handleToggle = (event) => {
    setAiMode(event.target.checked);
  };

  const gradientBg = 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)';

  return (
    <div style={{
      minHeight: '30vh',
      background: gradientBg,
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      marginBottom: '20px',
    }}>
      {/* Header Image */}
      <div style={{
        textAlign: 'center',
        marginBottom: '30px',
        display:'flex',
        alignItems:'center'
      }}>
        <div style={{
          width: '120px',
          height: '120px',
          background: 'linear-gradient(135deg, #581c87 0%, #a855f7 50%, #581c87 100%)',
          borderRadius: '20px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(88, 28, 135, 0.3)',
          border: '2px solid rgba(168, 85, 247, 0.2)'
        }}>
          <div style={{
            fontSize: '48px',
            color: '#ffffff'
          }}>
            🧠
          </div>
        </div>


        {/* Main Content */}
        <div style={{
          // maxWidth: '600px',
          margin: '0 auto',
          background: 'rgba(15, 23, 42, 0.6)',
          borderRadius: '16px',
          padding: '40px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(88, 28, 135, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          <h1 style={{
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '15px',
            fontSize: '28px',
            fontWeight: '600',
            background: 'linear-gradient(135deg, #a855f7, #e879f9)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Advanced Quiz Creator
          </h1>

          <div style={{
            textAlign: 'center',
            marginBottom: '10px'
          }}>
            <p style={{
              color: '#cbd5e1',
              fontSize: '16px',
              lineHeight: '1.6',
              marginBottom: '15px'
            }}>
              Create intelligent, adaptive quizzes with AI assistance. Toggle the switch below to enable advanced features.
            </p>
            <div className='d-flex justify-content-center align-items-center gap-4'>
              {/* <img
              src="/assets/img/AItogglearrow.png"
              alt="AI Quiz Creation Preview"
              style={{
                width: '100%',
                borderRadius: '12px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                marginBottom: '20px'
              }}
              /> */}
              {/* Toggle Switch */}
              <div style={{
                background: 'rgba(88, 28, 135, 0.2)',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                display: 'inline-block'
              }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={aiMode}
                      onChange={handleToggle}
                      sx={{
                        '& .MuiSwitch-switchBase.Mui-checked': {
                          color: '#a855f7',
                          '&:hover': {
                            backgroundColor: 'rgba(168, 85, 247, 0.08)',
                          },
                        },
                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                          backgroundColor: '#581c87',
                        },
                        '& .MuiSwitch-track': {
                          backgroundColor: '#475569',
                        },
                        '& .MuiSwitch-switchBase': {
                          color: '#94a3b8',
                          '&:hover': {
                            backgroundColor: 'rgba(148, 163, 184, 0.08)',
                          },
                        }
                      }}
                    />
                  }
                  label={
                    <span style={{
                      color: '#ffffff',
                      fontSize: '18px',
                      fontWeight: '500',
                      marginLeft: '8px'
                    }}>
                      {aiMode ? 'Advance Adaptive Mode: Active' : 'Advance Adaptive Mode: Inactive'}
                    </span>
                  }
                  style={{
                    margin: 0
                  }}
                />
              </div>
            </div>


          </div>



        </div>
      </div>
      <div style={{
        textAlign: 'center',
        padding: '20px',
        borderRadius: '8px',
        background: aiMode
          ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(22, 163, 74, 0.1))'
          : 'linear-gradient(135deg, rgba(148, 163, 184, 0.1), rgba(100, 116, 139, 0.1))',
        border: aiMode
          ? '1px solid rgba(34, 197, 94, 0.3)'
          : '1px solid rgba(148, 163, 184, 0.3)'
      }}>
        <div style={{
          fontSize: '14px',
          color: aiMode ? '#22c55e' : '#94a3b8',
          fontWeight: '500'
        }}>
          Status: {aiMode ? '✨ AI-Powered Quiz Creation Enabled' : '⚪ Standard Quiz Mode'}
        </div>
        {aiMode && (
          <div style={{
            fontSize: '12px',
            color: '#a3e635',
            marginTop: '5px'
          }}>
            Advanced adaptive features are now available
          </div>
        )}
      </div>
    </div>
  );
}