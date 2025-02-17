import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ReadOnlyOption = ({ option, onRemove }) => {
  return (
    // <div
    //   style={{
    //     display: "inline-block",
    //     margin: "5px",
    //   }}
    // >
    //   <input
    //     type="text"
    //     value={option}
    //     readOnly
    //     style={{
    //       padding: "10px 15px",
    //       backgroundColor: "#1565C0",
    //       color: "white",
    //       border: "none",
    //       borderRadius: "5px",
    //       textAlign: "center",
    //       cursor: "default",
    //       fontSize: "14px",
    //       fontWeight: "bold",
    //     }}
    //   />
    // </div>
    <div 
    onClick={() => onRemove(option)}
    style={{ 
      padding: '5px 10px',
      backgroundColor: "#1565C0",
      color: "white",
      borderRadius: '15px',
      margin: '5px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '5px'
    }}
  >
    <span>{option}</span>
    <FontAwesomeIcon icon={faCircleXmark} />
  </div>
  );
};
export default ReadOnlyOption