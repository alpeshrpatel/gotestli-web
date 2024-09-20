import React, { useState } from "react";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import axios from "axios";
import { API } from "@/utils/AxiosInstance";
import Header from "../layout/headers/Header";
import { toast } from "react-toastify";

const UploadQuestionSet = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userId = user.id;
  const userRole = user.role;

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadProgress(0); // Reset progress on file selection
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setIsUploading(true);
      const response = await API.post("/api/file/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress); // Update progress
        },
      });
      // if(response.status == 500){
      //     toast.error(response.message)
      // }
      setIsUploading(false);
      if (response.status == 200) {
        toast.success("File uploaded successfully!!");
      }
    } catch (error) {
      setIsUploading(false);

      if (error.status == 400) {
        toast.error("Invalid data format in Excel sheet!");
      } else {
        toast.error("File upload failed!");
      }
    }
  };

  return (
    <>
      <Header userRole={userRole} />
      <div
        className="mx-auto"
        style={{
          marginTop: "100px",
          width: "60vw",
          padding: "30px",
          backgroundColor: "#bfdeee",
          borderRadius: "10px",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);",
        }}
      >
        <Box sx={{ width: "50%", margin: "auto", textAlign: "center" }}>
          <Typography variant="h4">Upload Question Set</Typography>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".xlsx, .xls"
            style={{ margin: "20px auto", display: "block" }}
          />

          <Button
            variant="contained"
            color="primary"
            startIcon={<UploadFileIcon />}
            onClick={handleUpload}
            disabled={isUploading}
            sx={{ mb: 2 }}
          >
            Upload
          </Button>

          {isUploading && (
            <Box sx={{ width: "100%", mt: 2 }}>
              <LinearProgress variant="determinate" value={uploadProgress} />
              <Typography variant="body2" color="textSecondary">
                {uploadProgress}% uploaded
              </Typography>
            </Box>
          )}
        </Box>
      </div>
    </>
  );
};

export default UploadQuestionSet;
