import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  IconButton,
  Divider,
  CircularProgress
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply, faTimes, faPaperPlane, faAngleDown, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { API } from '@/utils/AxiosInstance';
import { showToast } from '@/utils/toastService';
import { useNavigate } from 'react-router-dom';


const CommentModal = ({ isOpen, onClose, cheatsheetId, title }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [openReplies, setOpenReplies] = useState(0);
  const [edit, setEdit] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || "";

  const userId = user.id;

  // Fetch comments when modal opens
  useEffect(() => {
    if (isOpen && title) {
      fetchComments();
    }
  }, [isOpen, title]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await API.get(`/api/cheatsheet/comment/${cheatsheetId}`);
      console.log(response)
      setComments(response?.data?.res);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      if (token) {
        const commentData = {
          cheatsheet_id: cheatsheetId,
          title: title,
          comment: newComment.trim(),
          created_by: userId,
          modified_by: userId,
          reply_to: null
        };

        await API.post(`/api/cheatsheet/comment/`, commentData, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setNewComment('');
        fetchComments();
      } else {
        navigate('/login');
        showToast('error', 'Please login to submit a comment.');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      showToast('error', 'Failed to submit comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitEditedComment = async (id, comment) => {
    if (!comment.trim()) return;
    setSubmitting(true);
    try {

      const commentData = {

        comment: comment.trim(),
        modified_by: userId

      };
      if (token) {


        await API.put(`/api/cheatsheet/comment/${id}`, commentData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
        setNewComment('');
        fetchComments();
      } else {
        navigate('/login');
        showToast('error', 'Please login to edit a comment.');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      showToast('error', 'Failed to submit comment. Please try again.');
    } finally {
      setSubmitting(false);
    }

  }

  const handleSubmitReply = async (parentCommentId) => {
    if (!replyText.trim()) return;

    setSubmitting(true);
    try {
      if (token) {


        const replyData = {
          cheatsheet_id: cheatsheetId,
          title: title,
          comment: replyText.trim(),
          reply_to: parentCommentId,
          created_by: userId,
          modified_by: userId
        };

        await API.post(`/api/cheatsheet/comment/`, replyData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReplyText('');
        setReplyTo(null);
        fetchComments();
      }
      else {
        navigate('/login');
        showToast('error', 'Please login to submit a reply.');
      }
    } catch (error) {
      console.error('Error submitting reply:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (commentId) => {
    setEdit(commentId);
    const comment = comments.find(c => c.id === commentId);

  }
  
  const handleEditReply = (replyId) => {
    console.log('Editing reply:', replyId);
    setEdit(replyId);

  }

  const handleDelete = async (commentId) => {
    // if (!window.confirm("Are you sure you want to delete this comment?")) return;

    setSubmitting(true);
    try {
      if (token) {
        await API.delete(`/api/cheatsheet/comment/${commentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchComments();
      } else {
        navigate('/login');
        showToast('error', 'Please login to delete a comment.');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      showToast('error', 'Failed to delete comment. Please try again.');
    } finally {
      setSubmitting(false);
    }

  }

  const handleDeleteReply = async (commentId) => {
    // if (!window.confirm("Are you sure you want to delete this comment?")) return;

    setSubmitting(true);
    try {
      if (token) {
        await API.delete(`/api/cheatsheet/comment/reply/${commentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchComments();
      } else {
        navigate('/login');
        showToast('error', 'Please login to delete a comment.');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      showToast('error', 'Failed to delete comment. Please try again.');
    } finally {
      setSubmitting(false);
    }

  }

  const renderComment = (comment) => {
    const replies = comments.filter(c => c.reply_to === comment.id);


    return (
      <div key={comment.id} style={{ marginBottom: '16px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '12px',
          padding: '12px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <Avatar
            src={comment.user_avatar}
            alt={comment.username}
            sx={{ width: 32, height: 32 }}
          >
            {comment.username?.charAt(0).toUpperCase()}
          </Avatar>

          <div style={{ flex: 1 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '4px'
            }}>
              <Typography variant="subtitle2" fontWeight="600">
                {comment.username}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(comment.created_date).toLocaleDateString()}
              </Typography>
            </div>
            {
              edit === comment.id ? (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <TextField
                    size="small"
                    value={comment.comment}
                    onChange={(e) => setComments(prev => prev.map(c => c.id === comment.id ? { ...c, comment: e.target.value } : c))}
                    fullWidth
                    multiline
                    rows={2}
                  />
                  <Button
                    size="small"
                    variant="contained"
                    onClick={() => {
                      handleSubmitEditedComment(comment.id, comment.comment);
                      setEdit(null);
                    }}
                    disabled={submitting || !comment.comment.trim()}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <Typography variant="body2" style={{ marginBottom: '8px' }}>
                  {comment.comment}
                </Typography>
              )
            }

            <div>


              <IconButton
                size="small"
                onClick={() => setReplyTo(comment.id)}
                sx={{ color: '#0066cc' }}
              >
                <FontAwesomeIcon icon={faReply} size="sm" />
                <Typography variant="caption" sx={{ ml: 1 }}>
                  Reply
                </Typography>

              </IconButton>
              {
                userId === comment.created_by && (
                  <>
                    <IconButton size="small"
                      onClick={() => handleEdit(comment.id)}
                      sx={{ color: '#0066cc' }}>
                      <FontAwesomeIcon icon={faEdit} size="sm" />
                    </IconButton>
                    <IconButton size="small"
                      onClick={() => handleDelete(comment.id)}
                      sx={{ color: '#EA5B6F' }}>
                      <FontAwesomeIcon icon={faTrash} size="sm" />
                    </IconButton>
                  </>
                )
              }

            </div>

          </div>
        </div>

        {/* Reply Form */}
        {replyTo === comment.id && (
          <div style={{
            marginTop: '8px',
            marginLeft: '44px',
            display: 'flex',
            gap: '8px'
          }}>
            <TextField
              size="small"
              placeholder="Write a reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              fullWidth
              multiline
              rows={2}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <Button
                size="small"
                variant="contained"
                onClick={() => handleSubmitReply(comment.id)}
                disabled={submitting || !replyText.trim()}
                sx={{ minWidth: '60px' }}
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </Button>
              <Button
                size="small"
                onClick={() => {
                  setReplyTo(null);
                  setReplyText('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div>
          <Button
            size="small"
            onClick={() => {

              setOpenReplies(prev => prev === comment.id ? 0 : comment.id);
            }}
          >
            <FontAwesomeIcon icon={faAngleDown} />
          </Button>

          <Typography variant="caption" color="text.secondary" style={{ marginLeft: '4px' }}>
            {replies.length} {replies.length === 1 ? 'Reply' : 'Replies'}
          </Typography>
        </div>

        {(replies.length > 0) && (openReplies == comment.id) && (
          <div style={{ marginLeft: '44px', marginTop: '12px' }}>
            {replies.map(reply => (
              <div key={reply.id} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '8px',
                backgroundColor: '#e9ecef',
                borderRadius: '6px',
                marginBottom: '8px'
              }}>
                <Avatar
                  src={reply.user_avatar}
                  alt={reply.username}
                  sx={{ width: 24, height: 24 }}
                >
                  {reply.username?.charAt(0).toUpperCase()}
                </Avatar>

                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '4px'
                  }}>
                    <Typography variant="caption" fontWeight="600">
                      {reply.username}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(reply.created_date).toLocaleDateString()}
                    </Typography>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    {
                      edit === reply.id ? (
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <TextField
                            size="small"
                            value={reply.comment}
                            onChange={(e) => setComments(prev => prev.map(c => c.id === reply.id ? { ...c, comment: e.target.value } : c))}
                            fullWidth
                            singleLine
                            rows={2}
                          />
                          <Button
                            size="small"
                            variant="contained"
                            onClick={() => {
                              handleSubmitEditedComment(reply.id, reply.comment);
                              setEdit(null);
                            }}
                            disabled={submitting || !reply.comment.trim()}
                          >
                            Save
                          </Button>
                        </div>
                      ) : (
                        <Typography variant="body2">
                          {reply.comment}
                        </Typography>
                      )
                    }
                    {
                      userId === reply.created_by && (
                        <div>
                          <IconButton size="small"
                             onClick={() => handleEditReply(reply.id)}
                            sx={{ color: '#0066cc' }}>
                            <FontAwesomeIcon icon={faEdit} size="sm" />
                          </IconButton>
                          <IconButton size="small"
                            onClick={() => handleDeleteReply(reply.id)}
                            sx={{ color: '#EA5B6F' }}>
                            <FontAwesomeIcon icon={faTrash} size="sm" />
                          </IconButton>
                        </div>
                      )
                    }


                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: '20px'
      }}
    >
      <Box sx={{
        width: '400px',
        height: '80vh',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#f8f9fa'
        }}>
          <Typography variant="h6" fontWeight="600">
            Comments
          </Typography>
          <IconButton onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
        </div>

        {/* Comments List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px'
        }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
              <CircularProgress />
            </div>
          ) : comments.filter(c => !c.reply_to).length === 0 ? (
            <Typography variant="body2" color="text.secondary" textAlign="center">
              No comments yet. Be the first to comment!
            </Typography>
          ) : (
            comments
              .filter(comment => !comment.reply_to)
              .map(comment => renderComment(comment))
          )}
        </div>

        {/* New Comment Form */}
        <div style={{
          padding: '16px',
          borderTop: '1px solid #e0e0e0',
          backgroundColor: '#f8f9fa'
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <TextField
              size="small"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              fullWidth
              multiline
              rows={2}
            />
            <Button
              variant="contained"
              onClick={handleSubmitComment}
              disabled={submitting || !newComment.trim()}
              sx={{
                minWidth: '60px',
                backgroundColor: '#0066cc',
                '&:hover': {
                  backgroundColor: '#0052a3'
                }
              }}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default CommentModal;