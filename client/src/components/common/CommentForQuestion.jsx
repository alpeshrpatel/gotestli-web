import React, { useState } from "react";
import { BootstrapTooltip } from "./Tooltip";
import { useNavigate } from "react-router-dom";
import { API } from "@/utils/AxiosInstance";
import { toast } from "react-toastify";

const CommentForQuestion = ({ questionId }) => {
  const [comments, setComments] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userId = user.id;

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleCommentToggle = () => {
    setShowCommentBox((prev) => !prev);
  };

  const handleCommentChange = (id, value) => {
    setComments(value);
  };

  const handleSaveComment = async (id) => {
    try {
      if (token) {
        const { data } = await API.post(
          "/api/comments/",
          {
            entity_type: 'question',
            entity_id: id,
            user_id: userId,
            comment: comments,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
            toast.success('Comment Saved!')
            setComments('');
            setShowCommentBox(false)
        
      }
    } catch (error) {
      if (error.status == 403) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // toast.error("Invaild token!");
        navigate("/login");
        return;
      }
    }
  };
  
  return (
    <div>
      <BootstrapTooltip title={"Add your thoughts about this Question"}>
        <i
          className="icon-comment fs-2 pointer"
          onClick={() => handleCommentToggle()}
        ></i>
      </BootstrapTooltip>

      {/* {showCommentBox[questionId] ? "Hide Comment" : "Add Comment"}
      </button> */}
      {showCommentBox && (
        <div className="mt-3">
          <textarea
            className="form-control"
            rows={3}
            placeholder="Write your comment here..."
            value={comments || ""}
            onChange={(e) => handleCommentChange(questionId, e.target.value)}
          ></textarea>
          <button
            className="btn btn-outline-primary btn-sm mt-2 fw-500"
            onClick={() => handleSaveComment(questionId)}
          >
            Comment
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentForQuestion;
