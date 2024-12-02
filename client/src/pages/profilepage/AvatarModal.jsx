import { Typography } from "@mui/material";
import React, { useState } from "react";

const avatars = [
  "/assets/img/avatars/small/1.png",
  "/assets/img/avatars/small/2.png",
  "/assets/img/avatars/small/3.png",
  "/assets/img/avatars/small/4.png",
  "/assets/img/avatars/small/5.png",
  "/assets/img/avatars/small/6.png",
  "/assets/img/avatars/small/7.png",
  "/assets/img/avatars/small/8.png",
];

const AvatarModal = ({ onAvatarSelect }) => {
  return (
    <div>
      <Typography
        variant="h5"
        sx={{
          mb: 1,
          textAlign: "center",
          fontStyle: "italic",
          color: "primary.main",
        }}
      >
        Select Your Perfect Avatar!
      </Typography>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "10px",
          padding: "20px",
        }}
      >
        {avatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt={`Avatar ${index + 1}`}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              cursor: "pointer",
              border: "2px solid transparent",
            }}
            onClick={() => onAvatarSelect(avatar)}
          />
        ))}
      </div>
    </div>
  );
};

export default AvatarModal;
