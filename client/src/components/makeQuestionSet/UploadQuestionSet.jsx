import React, { useState } from "react";
import ExcelJS from "exceljs";
import { Box, Button, LinearProgress, Modal, Typography } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import axios from "axios";
import { API } from "@/utils/AxiosInstance";
import Header from "../layout/headers/Header";
import { toast } from "react-toastify";

const UploadQuestionSet = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [fileData, setFileData] = useState([]); // For holding Excel file data
  const [open, setOpen] = useState(false); // Modal open state
  const [fileName, setFileName] = useState(""); // File name for display

  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userId = user.id;
  const userRole = user.role;

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadProgress(0);
    const file = event.target.files[0]; // Get the selected file
    if (!file) return;

    setFileName(file.name); // Set file name

    // Create a new instance of ExcelJS workbook
    const workbook = new ExcelJS.Workbook();
    const reader = new FileReader();

    // FileReader to read the Excel file
    reader.onload = async (e) => {
      const buffer = e.target.result;

      // Load Excel data into the workbook
      await workbook.xlsx.load(buffer);

      // Get the first sheet
      const worksheet = workbook.worksheets[0];

      // Extract the data from the sheet
      const sheetData = [];
      worksheet.eachRow((row) => {
        const rowData = [];
        row.eachCell((cell) => {
          rowData.push(cell.value);
        });
        sheetData.push(rowData);
      });

      setFileData(sheetData);
    };

    reader.readAsArrayBuffer(file); // Read the file as an array buffer
  };
  console.log(fileData)
  const handlePreview = () => {
    if (fileData.length > 0) {
      setOpen(true);
    } else {
      alert("Please upload a valid Excel file.");
    }
  };

  const handleClose = () => {
    setOpen(false);
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
      console.log(response.data.data);
      let fileName = response.data.data.fileName;
      let filePath = response.data.data.filePath;
      const data = await API.post("/api/question/files",{file_name:fileName, file_path:filePath,user_id:userId,status:0})
      // if(response.status == 500){
      //     toast.error(response.message)
      // }
      setIsUploading(false);
      if (response.status == 200 && data.status == 200) {

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
          <div className="d-flex items-center justify-content-center gap-2">
          <Button
            variant="contained"
            color="primary"
            startIcon={<UploadFileIcon />}
            onClick={handleUpload}
            disabled={isUploading}
            // sx={{ mb: 2 }}
          >
            Upload
          </Button>
          <Button variant="contained" onClick={handlePreview}>
            Preview
          </Button>
          </div>
         

          {/* Modal to display the Excel content */}
          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 600,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                maxHeight: "90vh",
                overflow: "auto",
              }}
            >
              <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                Excel Preview: {fileName}
              </Typography>

              {/* Render the Excel data as a table */}
              <table border="1" width="100%">
                <thead>
                  <tr>
                    {fileData[2] &&
                      fileData[2].map((header, index) => (
                        <th key={index} style={{padding:'5px', border:'1px solid black', backgroundColor:'#bfdeee'}}>{header}</th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {fileData.slice(3).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} style={{padding:'5px', border:'1px solid black'}}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Close button */}
              <Button onClick={handleClose} sx={{ mt: 2 }}>
                Close
              </Button>
            </Box>
          </Modal>
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
