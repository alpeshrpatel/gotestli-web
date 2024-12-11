import React, { useState } from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Emoji from "./Emoji";
import { API } from "@/utils/AxiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const visitOptions = [
  { id: 1, title: "To test my knowledge on a topic" },
  { id: 2, title: "To learn something new" },
  { id: 3, title: "For practice and self-improvement" },
  { id: 4, title: "Just for fun and entertainment" },
];
const maxCharacters = 500;

const FeedbackButton = () => {
  const [open, setOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("");
  const [visitReason, setVisitReason] = useState("");
  const [review, setReview] = useState("");
  const [onceSubmitted, setOnceSubmitted] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userId = user.id;
  const navigate = useNavigate();

  const onOpenModal = () => {
    setOpen(true);
  };

  const onCloseModal = () => setOpen(false);

  const buttonStyleLarge = {
    zIndex: 1050,
    position: "fixed",
    top: "50%",
    right: "0",
    transform: "rotate(270deg) translate(-10%, 50%)",
    transformOrigin: "center",
    transition: "box-shadow 0.3s ease-out, transform 0.4s ease-out",
    cursor: "pointer",
  };

  const buttonStyleSmall = {
    zIndex: 1050,
    position: "fixed",
    bottom: "20px",
    right: "20px",
    borderRadius: "50%",
    padding: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.15)",
    cursor: "pointer",
  };

  const handleMouseOver = (e) => {
    e.target.style.boxShadow = "0px 10px 15px rgba(0, 0, 0, 0.25)";
  };

  const handleMouseOut = (e) => {
    e.target.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.15)";
  };

  const handleEmojiClick = (emoji) => {
    setSelectedEmoji(emoji);
  };

  const handleSubmit = async () => {
    try {
      const { data } = await API.post(
        `/api/app/feedback`,
        {
          emoji_rating: selectedEmoji,
          visit_purpose: visitReason,
          feedback: review,
          userId: userId || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      toast.success("Thanks For Giving Feedback!");
      onCloseModal();
      setOnceSubmitted(true);
    } catch (error) {
      if (error.status == 403) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // toast.error("Invaild token!");
        navigate("/login");
        return;
      }
      console.error("Error posting feedback:", error);
    }
  };
  const handleVisitAnswer = (event) => {
    const selectedFilter = event.target.value;
    setVisitReason(selectedFilter);
  };
  const handleReviewChange = (e) => {
    if (e.target.value.length <= maxCharacters) {
      setReview(e.target.value);
    }
  };

  const getModalWidth = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth > 1024) return "450px"; // Large screens
    if (screenWidth > 768) return "350px";  // Medium screens
    return "80%"; // Small screens
  };

  return (
    <>
      {/* <div
        style={buttonStyle}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      > */}
        <div
          className="d-none d-md-block"
          style={buttonStyleLarge}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <button
            className="btn rounded-3 px-4 py-3"
            style={{
              backgroundColor: "#ff6f61",
              color: "#fff",
              border: "none",
              fontWeight: "bold",
              fontSize: "15px",
              boxShadow: "4px 4px 6px rgba(0, 0, 0, 0.15)",
            }}
            onClick={onOpenModal}
          >
            Feedback
          </button>
        </div>
        <div
          className="d-block d-md-none"
          style={buttonStyleSmall}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <button
            className="btn rounded-circle"
            onClick={onOpenModal}
            style={{ width: "50px", height: "50px",backgroundColor: "#ff6f61", color: "#fff", display:'flex',justifyContent:'center',alignItems:'center'}}
          >
            <i className="icon-comment fs-3"></i>
          </button>
        </div>
        <button
          className="btn rounded-3 px-4 py-3"
          style={{
            backgroundColor: "#ff6f61", // Vibrant coral color
            color: "#fff",
            border: "none",
            fontWeight: "bold",
            fontSize: "15px",
            boxShadow: "4px 4px 6px rgba(0, 0, 0, 0.15)", // Initial box shadow
            transition: "box-shadow 0.3s ease-out, transform 0.4s ease-out",
          }}
          onClick={onOpenModal}
        >
          Feedback
        </button>
      {/* </div> */}
      <Modal
        open={open}
        onClose={onCloseModal}
        center={false}
        styles={{
          modal: {
            position: "fixed",
            top: "20%",
            right: "50px",
            transform: "translateY(-50%)",
            width: getModalWidth(),
          },
          overlay: {
            background: "transparent",
          },
        }}
      >
        <div className="col-12 rounded px-3 pt-4 border-1 text-center">
          <h5 className="mb-2">
            Overall,how satisfied are you with the website?
          </h5>

          <div className="d-flex justify-content-center mb-2">
            <Emoji
              emoji="😄"
              onClick={() => handleEmojiClick("Very Happy")}
              selected={selectedEmoji === "Very Happy"}
            />
            <Emoji
              emoji="🙂"
              onClick={() => handleEmojiClick("Happy")}
              selected={selectedEmoji === "Happy"}
            />
            <Emoji
              emoji="😐"
              onClick={() => handleEmojiClick("Normal")}
              selected={selectedEmoji === "Normal"}
            />
            <Emoji
              emoji="🙁"
              onClick={() => handleEmojiClick("Sad")}
              selected={selectedEmoji === "Sad"}
            />
            <Emoji
              emoji="😡"
              onClick={() => handleEmojiClick("Awful")}
              selected={selectedEmoji === "Awful"}
            />
          </div>
          <div className="d-flex justify-content-between mb-4">
            <h6>Extremely satisfied</h6>
            <h6>Not at all satisfied</h6>
          </div>

          <div>
            <div>
              <h5 className="mb-2">
                What was the main purpose for your visit today?
              </h5>
              <select
                value={visitReason}
                onChange={handleVisitAnswer}
                className="filterDropdown mb-2"
                required
              >
                <option value="">Select</option>
                {visitOptions.map((option, index) => (
                  <option key={index} value={option?.title?.toLowerCase()}>
                    {option.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 mb-4">
              <h5 className="mb-2">
                Please share any additional feedback: (Optional)
              </h5>
              <textarea
                className="form-control"
                rows="5"
                placeholder="Share your feedback here..."
                value={review}
                onChange={handleReviewChange}
              ></textarea>
              <div className="text-muted ">
                {maxCharacters - review.length} characters remaining
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className={`btn ${
                selectedEmoji ? "btn-outline-success" : "btn-outline-secondary"
              } px-4 py-2 fw-bold text-uppercase`}
              style={{
                backgroundColor: selectedEmoji ? "#28a745" : "#ccc",
                transition: "background-color 0.3s ease",
                cursor: selectedEmoji ? "pointer" : "not-allowed",
                color: selectedEmoji ? "#fff" : "",
              }}
              disabled={!selectedEmoji || onceSubmitted}
            >
              {onceSubmitted ? "Submitted" : "Submit"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FeedbackButton;

// import React, { useState } from "react";
// import Modal from "react-responsive-modal";
// import "react-responsive-modal/styles.css";
// import Emoji from "./Emoji";
// import { API } from "@/utils/AxiosInstance";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const FeedbackButton = () => {
//   const [open, setOpen] = useState(false);
//   const [selectedEmoji, setSelectedEmoji] = useState("");
//   const [visitReason, setVisitReason] = useState("");
//   const [review, setReview] = useState("");
//   const [onceSubmitted, setOnceSubmitted] = useState(false);

//   const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user")) || "";
//   const userId = user.id;
//   const navigate = useNavigate();

//   const onOpenModal = () => {
//     setOpen(true);
//   };

//   const onCloseModal = () => setOpen(false);

//   const buttonStyleLarge = {
//     zIndex: 1050,
//     position: "fixed",
//     top: "50%",
//     right: "0",
//     transform: "rotate(270deg) translate(-10%, 50%)",
//     transformOrigin: "center",
//   };

//   const buttonStyleSmall = {
//     zIndex: 1050,
//     position: "fixed",
//     bottom: "20px",
//     right: "20px",
//     borderRadius: "50%",
//     padding: "10px",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.15)",
//   };

//   const handleEmojiClick = (emoji) => {
//     setSelectedEmoji(emoji);
//   };

//   const handleSubmit = async () => {
//     try {
//       const { data } = await API.post(
//         `/api/app/feedback`,
//         {
//           emoji_rating: selectedEmoji,
//           visit_purpose: visitReason,
//           feedback: review,
//           userId: userId || null,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       toast.success("Thanks For Giving Feedback!");
//       onCloseModal();
//       setOnceSubmitted(true);
//     } catch (error) {
//       if (error.status === 403) {
//         localStorage.removeItem("user");
//         localStorage.removeItem("token");
//         navigate("/login");
//         return;
//       }
//       console.error("Error posting feedback:", error);
//     }
//   };

//   const handleVisitAnswer = (event) => {
//     setVisitReason(event.target.value);
//   };

//   const handleReviewChange = (e) => {
//     if (e.target.value.length <= 500) {
//       setReview(e.target.value);
//     }
//   };

//   return (
//     <>
//       <div
//         className="d-none d-md-block"
//         style={buttonStyleLarge}
//       >
//         <button
//           className="btn rounded-3 px-4 py-3"
//           style={{
//             backgroundColor: "#ff6f61",
//             color: "#fff",
//             border: "none",
//             fontWeight: "bold",
//             fontSize: "15px",
//             boxShadow: "4px 4px 6px rgba(0, 0, 0, 0.15)",
//           }}
//           onClick={onOpenModal}
//         >
//           Feedback
//         </button>
//       </div>
//       <div
//         className="d-block d-md-none"
//         style={buttonStyleSmall}
//       >
//         <button
//           className="btn btn-danger rounded-circle"
//           onClick={onOpenModal}
//           style={{ width: "50px", height: "50px" }}
//         >
//           <i className="bi bi-chat-dots"></i>
//         </button>
//       </div>
//       <Modal
//         open={open}
//         onClose={onCloseModal}
//         center={false}
//         styles={{
//           modal: {
//             position: "fixed",
//             top: "20%",
//             right: "50px",
//             transform: "translateY(-50%)",
//             width: "450px",
//           },
//         }}
//       >
//         {/* Modal content */}
//       </Modal>
//     </>
//   );
// };

// export default FeedbackButton;
