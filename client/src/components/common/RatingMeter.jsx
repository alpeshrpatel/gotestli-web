import React from "react";

const RatingMeter = ({ ratings,totalRatings,ratingNumber }) => {
  return (
    <div style={{ width: "250px", fontFamily: "Arial, sans-serif" }}>
      <h2 className="mb-2 text-white">{parseFloat(ratingNumber)?.toFixed(1)} out of 5</h2>
      <p className="mb-3 ">{totalRatings} global ratings</p>
      {ratings.map((rating, index) => (
        <div
          key={index}
          className="d-flex align-items-center mb-2"
          style={{ fontSize: "0.9rem" }}
        >
          {/* Star label */}
          <span style={{ width: "50px" }}>{rating.stars} star</span>

          {/* Progress bar container */}
          <div
            className="flex-grow-1 bg-light rounded mx-2"
            style={{ height: "10px", position: "relative", overflow: "hidden" }}
          >
            {/* Progress bar fill */}
            <div
              style={{
                width: `${rating.percentage}%`,
                backgroundColor: "#f90",
                height: "100%",
              }}
            ></div>
          </div>

          {/* Percentage */}
          <span className="">{rating.percentage}%</span>
        </div>
      ))}
    </div>
  );
};

export default RatingMeter;
