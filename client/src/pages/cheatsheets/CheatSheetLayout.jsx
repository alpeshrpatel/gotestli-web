import { faCode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import CodeEditorCheatSheet from './cheatsheetpages/CodeEditorCheatSheet';
import { faComment, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { IconButton } from '@mui/material';
import CommentModal from './CommentModal';
import { API } from '@/utils/AxiosInstance';

// const CheatSheetLayout = ({ title, description, sections }) => {
//   return (
//     <div className="container-fluid w-75 my-4">
//       <h1 className="text-center mb-3" style={{ fontWeight: 'bold' }}>{title}</h1>
//       <p className="text-muted text-center mb-5">{description}</p>

//       {sections.map((section, idx) => (
//         <div key={idx} className="mb-5">
//           <h3 className="mb-3" style={{ color: '#007bff' }}>{section.heading}</h3>
//           <p style={{ lineHeight: '1.6' }}>{section.content}</p>
//           {section.code && (
//             <pre className="bg-light p-3 border rounded mt-3" style={{ whiteSpace: 'pre-wrap' }}>
//               {section.code}
//             </pre>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };
 const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || "";

  const userId = user.id;

const CheatSheetLayout = ({ language = 'python', title, description, sections, cheatsheetId }) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const response = await API.get(`/api/cheatsheet/social/${cheatsheetId}`);
        console.log('Like count response:', response.data);
        setLikesCount(response.data);
      } catch (error) {
        console.error('Error fetching like count:', error);
      }
    };

    fetchLikeCount();
  })

  const handleCommentClick = () => {
    setIsCommentModalOpen(true);
  };

  const handleCloseCommentModal = () => {
    setIsCommentModalOpen(false);
  };

  const handleLike = async () => {
    try {
      const likeData = {
        cheatsheet_id: cheatsheetId,
        title: title,
        likes_count: likesCount + 1,
        created_by: userId,
        modified_by: userId
      };

      await API.post(`/api/cheatsheet/social/`, likeData);
      setLiked(true)
      // fetchLikeCount(); 
    } catch (error) {
      console.error('Error submitting like:', error);
    }
  }
  return (
    <div style={{
      backgroundColor: '#f7f9fc',
      minHeight: '100vh',
      padding: '24px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
      }}>
        <header style={{
          marginBottom: '32px',
          textAlign: 'center'
        }}>
          <h1 style={{
            fontSize: '30px',
            fontWeight: 'bold',
            color: '#0066cc',
            marginBottom: '12px'
          }}>{title}</h1>
          <p style={{
            color: '#666666',
            fontSize: '16px'
          }}>{description}</p>
        </header>

        <div className="flex items-center justify-between">

          <div className="flex items-center space-x-2">
            <h5>{liked}</h5>
            <IconButton
              onClick={handleLike}
              sx={{ color: liked ? 'red[500]' : "gray" }}
            >
              <FontAwesomeIcon icon={faThumbsUp} />
            </IconButton>
            
            <IconButton
              onClick={handleCommentClick}
              sx={{ color: 1 ? 'red[500]' : "gray" }}
            >
              <FontAwesomeIcon icon={faComment} />
            </IconButton>
          </div>
        </div>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          border: '1px solid #e0e0e0'
        }}>
          {sections.map((section, index) => (
            <div
              key={index}
              style={{
                padding: '24px',
                borderBottom: index !== sections.length - 1 ? '1px solid #e0e0e0' : 'none'
              }}
            >
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#004080',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center'
              }}>
                {section.heading.includes("Code") &&
                  <span style={{ marginRight: '8px' }}>
                    <FontAwesomeIcon icon={faCode} size="lg" color="#0066cc" />
                    {/* <Code size={20} color="#0066cc" /> */}
                  </span>
                }
                {section.heading}
              </h2>

              {section.content && (
                <div style={{
                  color: '#333333',
                  lineHeight: '1.6',
                  fontSize: '15px'
                }}
                  dangerouslySetInnerHTML={{
                    __html: section.content
                      .replace(/\n/g, '<br/>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 600; color: #1a1a1a">$1</strong>')
                    // .replace(/• /g, '<span style="display: block; margin-bottom: 6px; position: relative; paddingLeft: 20px">• </span>')
                  }} />
              )}

              {section.code && (
                <div style={{
                  marginTop: '16px',
                  backgroundColor: '#1e293b',
                  borderRadius: '6px',
                  overflow: 'hidden'
                }}>
                  <pre style={{
                    padding: '16px',
                    color: '#e2e8f0',
                    fontSize: '14px',
                    overflowX: 'auto',
                    margin: 0
                  }}>
                    <CodeEditorCheatSheet language={language} code={section.code} />
                    {/* <code>{section.code}</code> */}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>

        <footer style={{
          marginTop: '24px',
          textAlign: 'center',
          color: '#888888',
          fontSize: '14px'
        }}>
          <p>Last updated: May 23, 2025</p>
        </footer>
        <CommentModal
          isOpen={isCommentModalOpen}
          onClose={handleCloseCommentModal}
          cheatsheetId={cheatsheetId}
          title={title}
        />
      </div>
    </div>
  );
};

export default CheatSheetLayout;
