import React from 'react';
import {
  Warning,           
  CheckCircle,       
  Cancel,            
  MenuBook,          
  TrendingUp,        
  Group              
} from '@mui/icons-material';

const QuizAnalysisDisplay = ({analysisData}) => {
 
  // const sampleData = {
  //   data: {
  //     success: true,
  //     data: {
  //       topics: [
  //         {
  //           name: "Cloud Computing and AWS",
  //           questions: [1, 2, 3, 4, 5, 6],
  //           description: "Cloud computing concepts, AWS services, and their applications"
  //         }
  //       ],
  //       totalTopics: 1,
  //       hasThreeOrMoreTopics: false,
  //       topicDistribution: {
  //         balanced: false,
  //         dominantTopic: "Cloud Computing and AWS"
  //       },
  //       recommendations: [
  //         "AWS documentation",
  //         "Cloud computing tutorials"
  //       ],
  //       isValid: false,
  //       summary: {
  //         message: "❌ Quiz only covers 1 topics. Need at least 3 different topics.",
  //         topicBreakdown: [
  //           {
  //             topic: "Cloud Computing and AWS",
  //             questionCount: 6,
  //             percentage: 100
  //           }
  //         ]
  //       }
  //     },
  //     metadata: {
  //       totalQuestions: 6,
  //       analysisType: "single",
  //       timestamp: "2025-06-12T14:21:24.254Z"
  //     }
  //   }
  // };

  const { data: response } = analysisData || sampleData;
  const { data, metadata } = response;

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

   const headerStyle = {
    textAlign: 'center',
    marginBottom: '3rem'
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '24px',
      background: 'linear-gradient(135deg, #0f172a 0%, #581c87 50%, #0f172a 100%)',
      marginTop: '20px',
      borderRadius: '10px',
    }}>
      <div style={{
        maxWidth: '1024px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}>
        
        {/* Header */}
        <div style={headerStyle}>
          <h1 style={{fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '0.5rem'}}>
            Quiz Analysis <span style={titleStyle}>Results</span> 
          </h1>
          <div style={dividerStyle}></div>
        </div>
          <p style={{
            color: '#c4b5fd',
            margin: 0,
            textAlign: 'center',
          }}>AI-powered topic analysis and recommendations</p>

        {/* Status Card */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              {data.isValid ? (
                <CheckCircle sx={{ fontSize: 32, color: '#4ade80' }} />
              ) : (
                <Cancel sx={{ fontSize: 32, color: '#f87171' }} />
              )}
              <div>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: 'white',
                  margin: 0
                }}>
                  {data.isValid ? 'Valid Quiz' : 'Invalid Quiz'}
                </h2>
                <p style={{
                  color: '#c4b5fd',
                  margin: 0
                }}>Analysis Status</p>
              </div>
            </div>
            <div style={{
              textAlign: 'right'
            }}>
              <p style={{
                fontSize: '30px',
                fontWeight: 'bold',
                color: 'white',
                margin: 0
              }}>{metadata.totalQuestions}</p>
              <p style={{
                color: '#c4b5fd',
                margin: 0
              }}>Questions</p>
            </div>
          </div>
          
          {/* Error Message */}
          {!data.isValid && (
            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid rgba(248, 113, 113, 0.3)',
              borderRadius: '12px',
              padding: '16px',
              marginTop: '16px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <Warning sx={{ fontSize: 24, color: '#f87171', flexShrink: 0 }} />
                <p style={{
                  color: '#fecaca',
                  fontWeight: '500',
                  margin: 0
                }}>{data.summary.message}</p>
              </div>
            </div>
          )}
        </div>

        {/* Topics Analysis */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px'
          }}>
            <MenuBook sx={{ fontSize: 28, color: '#c4b5fd' }} />
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              margin: 0
            }}>Topic Analysis</h3>
          </div>
          
          <div style={{
            display: 'grid',
            gap: '16px',
            marginBottom: '24px'
          }}>
            {data.topics.map((topic, index) => (
              <div key={index} style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '12px'
                }}>
                  <h4 style={{
                    fontSize: '20px',
                    fontWeight: '600',
                    color: 'white',
                    margin: 0
                  }}>{topic.name}</h4>
                  <span style={{
                    backgroundColor: 'rgba(168, 85, 247, 0.3)',
                    color: '#c4b5fd',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    {topic.questions.length} questions
                  </span>
                </div>
                <p style={{
                  color: '#c4b5fd',
                  marginBottom: '12px',
                  margin: 0,
                  marginBottom: '12px'
                }}>{topic.description}</p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  {topic.questions.map((qNum) => (
                    <span key={qNum} style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '14px'
                    }}>
                      Q{qNum}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Topic Distribution */}
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            padding: '16px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h4 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: 'white',
              marginBottom: '12px',
              margin: 0,
              marginBottom: '12px'
            }}>Distribution Analysis</h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {data.summary.topicBreakdown.map((breakdown, index) => (
                <div key={index} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      color: '#c4b5fd'
                    }}>{breakdown.topic}</span>
                    <span style={{
                      color: 'white',
                      fontWeight: '500'
                    }}>{breakdown.percentage}%</span>
                  </div>
                  <div style={{
                    width: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '9999px',
                    height: '8px'
                  }}>
                    <div style={{
                      background: 'linear-gradient(to right, #a855f7, #9333ea)',
                      height: '8px',
                      borderRadius: '9999px',
                      transition: 'all 0.5s',
                      width: `${breakdown.percentage}%`
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px'
          }}>
            <TrendingUp sx={{ fontSize: 28, color: '#c4b5fd' }} />
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              margin: 0
            }}>Recommendations</h3>
          </div>
          
          <div style={{
            display: 'grid',
            gap: '12px'
          }}>
            {data.recommendations.map((recommendation, index) => (
              <div key={index} style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                padding: '16px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  backgroundColor: 'rgba(168, 85, 247, 0.3)',
                  borderRadius: '50%',
                  padding: '12px'
                }}>
                  <Group sx={{ fontSize: 20, color: '#c4b5fd' }} />
                </div>
                <p style={{
                  color: 'white',
                  fontWeight: '500',
                  margin: 0
                }}>{recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Metadata */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          borderRadius: '16px',
          padding: '24px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '16px',
            margin: 0,
            marginBottom: '16px'
          }}>Analysis Details</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            textAlign: 'center'
          }}>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              padding: '16px'
            }}>
              <p style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: 'white',
                margin: 0
              }}>{data.totalTopics}</p>
              <p style={{
                color: '#c4b5fd',
                margin: 0
              }}>Total Topics</p>
            </div>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              padding: '16px'
            }}>
              <p style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: 'white',
                margin: 0
              }}>{metadata.analysisType}</p>
              <p style={{
                color: '#c4b5fd',
                margin: 0
              }}>Analysis Type</p>
            </div>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              padding: '16px'
            }}>
              <p style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: 'white',
                margin: 0
              }}>
                {data.topicDistribution.balanced ? 'Yes' : 'No'}
              </p>
              <p style={{
                color: '#c4b5fd',
                margin: 0
              }}>Balanced</p>
            </div>
          </div>
          
          {data.topicDistribution.dominantTopic && (
            <div style={{
              marginTop: '16px',
              backgroundColor: 'rgba(234, 179, 8, 0.2)',
              border: '1px solid rgba(250, 204, 21, 0.3)',
              borderRadius: '12px',
              padding: '16px'
            }}>
              <p style={{
                color: '#fef3c7',
                margin: 0
              }}>
                <strong>Dominant Topic:</strong> {data.topicDistribution.dominantTopic}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizAnalysisDisplay;