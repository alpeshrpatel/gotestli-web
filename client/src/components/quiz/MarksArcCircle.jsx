import React from "react";

const MarksArcCircle = ({ achievedMarks, totalMarks }) => {
  const radius = 70;
  const stroke = 12;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const percentage = (achievedMarks / totalMarks) * 100;
  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  return (
    <div
      style={{
        width: "180px",
        height: "180px",
        margin: "auto",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <svg height={radius * 2} width={radius * 2}>
        {/* Background Circle */}
        <circle
          stroke="#e6e6e6"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Arc Circle */}
        <circle
          stroke="#4caf50"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference + " " + circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          transform={`rotate(-90 ${radius} ${radius})`}
        />
      </svg>
      {/* Centered Text */}
      <div
        style={{
          position: "absolute",
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        {achievedMarks}/{totalMarks}
      </div>
    </div>
  );
};

export default MarksArcCircle;
