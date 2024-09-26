import React, { useState } from "react";
import ExcelJS from "exceljs";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Link,
  Modal,
  Typography,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import axios from "axios";
import { API } from "@/utils/AxiosInstance";
import Header from "../layout/headers/Header";
import { toast } from "react-toastify";
import HandleDownload from "../common/HandleDownload";
import { useNavigate } from "react-router-dom";

const UploadQuestionSet = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [fileData, setFileData] = useState([]);
  const [open, setOpen] = useState(false); 
  const [fileName, setFileName] = useState(""); 

  const navigate = useNavigate();

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
  console.log(fileData);
  const handlePreview = () => {
    if (fileData.length > 0) {
      setOpen(true);
    } else {
      toast.warn("Please upload a valid Excel file.");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.warn("Please select a file first!");
      return;
    }
 console.log(selectedFile)
    const formData = new FormData();
    formData.append("file", selectedFile);

    const res = await API.get(`/api/question/files?filename=${selectedFile.name}`);
    if(res.data?.length > 0){
       toast.error("Duplicate file upload not allowed!");
       return;
    }
    console.log("file searcch:",res.data);
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

      const data = await API.post("/api/question/files", {
        file_name: fileName,
        file_path: filePath,
        user_id: userId,
        status: 0,
      });
      // if(response.status == 500){
      //     toast.error(response.message)
      // }
      setIsUploading(false);
      if (response.status == 200 && data.status == 200) {
        toast.success("File uploaded successfully!!");
        navigate("/dshb/uploaded/files")
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
  async function handleDownload(){
    await HandleDownload('samplefile','SampleExcelFile.xlsx')
  }
    
  // async function handleDownload() {
  //   try {
  //     const response = await API.get(
  //       "/api/question/files/download/samplefile",
  //       {
  //         responseType: "blob",
  //       }
  //     );

  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "SampleExcelFile.xlsx");
  //     document.body.appendChild(link);
  //     link.click();
  //     link.remove();
  //   } catch (error) {
  //     console.error("Error downloading the sample file:", error);
  //     toast.error("Failed to download sample file.");
  //   }
  // }

  return (
    <>
      <Header userRole={userRole} />
      <div
        className="mx-auto"
        style={{
          marginTop: "100px",
          width: "70vw",
          padding: "30px",
          backgroundColor: "#bfdeee",
          borderRadius: "10px",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);",
        }}
      >
        <Box sx={{ width: "100%", margin: "auto", textAlign: "center" }}>
          <Typography variant="h4" sx={{ marginBottom: "10px" }}>
            Upload Question Set
          </Typography>
          <Box
            sx={{
              width: "80%",
              margin: "auto",
              textAlign: "left",
              maxHeight: "50vh",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "6px", // Width of the scrollbar
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#ccc", // Color of the scrollbar thumb
                borderRadius: "10px", // Round edges of the scrollbar thumb
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#f5f5f5", // Background of the scrollbar track
              },
            }}
          >
            <Typography variant="h5" gutterBottom>
              Instructions for Uploading Questions Data
            </Typography>

            <Grid>
              <Typography variant="body1" gutterBottom>
                <strong>
                  To ensure a smooth and successful upload of your questions,
                  please follow these instructions carefully:
                </strong>
              </Typography>

              <Typography variant="h6" gutterBottom>
                Download the Sample Excel File:
              </Typography>
              <Typography variant="body1" gutterBottom>
                You must use the provided sample file as a template for
                uploading your questions.
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                sx={{ color: "#2196f3", textDecoration: "underline" }}
              >
                <a onClick={handleDownload} style={{ cursor: "pointer" }}>
                  Click here to download the sample file
                </a>
              </Typography>
              <Typography variant="h6" gutterBottom>
                Fill Your Data into the Sample File:
              </Typography>
              <Typography variant="body1" gutterBottom>
                - Open the downloaded Excel file.
              </Typography>
              <Typography variant="body1" gutterBottom>
                - Fill in the necessary information in the respective columns.
              </Typography>
              <Typography variant="body1" gutterBottom>
                - Ensure that you{" "}
                <strong style={{ color: "red" }}>
                  don't change or modify{" "}
                </strong>
                the column titles or headers in the file. These headers are
                critical for correctly uploading your data to the database.
              </Typography>
            </Grid>
            <Grid>
              <Typography variant="h6" gutterBottom>
                Column Headers You Must Not Change:
              </Typography>
              <ul>
                <li>
                  <Typography variant="body2">
                    <strong>Question</strong>: The main question text.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    <strong>Description</strong>: Additional details about the
                    question (optional).
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    <strong>Question_Option</strong>: Provide multiple options
                    separated by colons (:).
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    <strong>Correct_Answer</strong>: Indicate the correct option
                    number.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    <strong>Complexity</strong>: Specify the question difficulty
                    level (easy, medium, hard).
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    <strong>Marks</strong>: Assign marks for the question.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    <strong>Is_Negative</strong>: Specify 1 for negative
                    marking, 0 otherwise.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body2">
                    <strong>Negative_Marks</strong>: Set the negative marks for
                    the question (if applicable).
                  </Typography>
                </li>
              </ul>

              <Typography variant="h6" gutterBottom>
                Do Not Add or Remove Columns:
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>
                  Any alteration to the structure of the file, including adding
                  or removing columns, will cause the upload to fail.
                </strong>
              </Typography>

              <Typography variant="h6" gutterBottom>
                Once Complete:
              </Typography>
              <Typography variant="body1" gutterBottom>
                After entering your data, save the file in the same format
                (Excel .xlsx), and then you can proceed to upload it.
              </Typography>
            </Grid>
          </Box>
          {/* <Typography variant="body1">Note.</Typography>
          <Typography variant="subtitle1">Note.</Typography> */}
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
                width: "60vw",
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
                        <th
                          key={index}
                          style={{
                            padding: "5px",
                            border: "1px solid black",
                            backgroundColor: "#bfdeee",
                          }}
                        >
                          {header}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {fileData.slice(3).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Array.from({ length: 9 }).map(
                        (_, cellIndex) => (
                          <td
                            key={cellIndex}
                            style={{
                              padding: "5px",
                              border: "1px solid black",
                            }}
                          >
                            {row[cellIndex] !== undefined ? row[cellIndex] : ""}
                          </td>
                        )
                      )}
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
