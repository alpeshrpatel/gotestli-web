import React from "react";

const ReadOnlyOption = ({ option }) => {
  return (
    <div
      style={{
        display: "inline-block",
        margin: "5px",
      }}
    >
      <input
        type="text"
        value={option}
        readOnly
        style={{
          padding: "10px 15px",
          backgroundColor: "#1565C0",
          color: "white",
          border: "none",
          borderRadius: "5px",
          textAlign: "center",
          cursor: "default",
          fontSize: "14px",
          fontWeight: "bold",
        }}
      />
    </div>
  );
};
export default ReadOnlyOption