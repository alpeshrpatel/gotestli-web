// import { API } from '@/utils/AxiosInstance';
// import React, { useState, useRef } from 'react';

// const ExcelPreviewValidator = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [validationResult, setValidationResult] = useState(null);
//   const [isDragOver, setIsDragOver] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const fileInputRef = useRef(null);

//    const token = localStorage.getItem("token");
//   const user = JSON.parse(localStorage.getItem("user")) || "";
//   const userId = user.id;

//   // File size formatter
//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   // Handle file selection
//   const handleFileSelection = (file) => {
//     // Validate file type
//     const validTypes = [
//       'application/vnd.ms-excel',
//       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//     ];

//     if (!validTypes.includes(file.type) && !file.name.match(/\.(xlsx|xls)$/i)) {
//       alert('Please select a valid Excel file (.xlsx or .xls)');
//       return;
//     }

//     // Validate file size (max 10MB)
//     if (file.size > 10 * 1024 * 1024) {
//       alert('File size must be less than 10MB');
//       return;
//     }

//     setSelectedFile(file);
//     setValidationResult(null);
//   };

//   // Handle file input change
//   const handleFileInputChange = (e) => {
//     const files = e.target.files;
//     if (files.length > 0) {
//       handleFileSelection(files[0]);
//     }
//   };

//   // Handle drag events
//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setIsDragOver(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     setIsDragOver(false);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setIsDragOver(false);
//     const files = e.dataTransfer.files;
//     if (files.length > 0) {
//       handleFileSelection(files[0]);
//     }
//   };

//   // Handle file preview and validation
//   const handleFilePreview = async () => {
//     if (!selectedFile) {
//       alert('Please select a file first');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', selectedFile);

//     console.log(selectedFile)

//     try {
//       setIsLoading(true);
//       setProgress(0);

//       // Simulate progress
//       const progressInterval = setInterval(() => {
//         setProgress(prev => prev < 90 ? prev + 10 : prev);
//       }, 200);

//       const response = await API.post('/api/question/files/preview/excelfile', 
//        formData,
//        {
//         headers: {
//           Authorization: `Bearer ${token}`,
//            'Content-Type': 'multipart/form-data',
//         },
//       }
//       );

//       clearInterval(progressInterval);
//       setProgress(100);

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       setValidationResult(result);

//     } catch (error) {
//       console.error('Error:', error);
//       alert('Failed to validate file. Please try again.');
//     } finally {
//       setIsLoading(false);
//       setProgress(0);
//     }
//   };

//   // Reset form
//   const resetForm = () => {
//     setSelectedFile(null);
//     setValidationResult(null);
//     setIsLoading(false);
//     setProgress(0);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   // Render validation errors
//   const renderValidationErrors = (result) => (
//     <div className="error-container">
//       <div className="error-summary">
//         <h3>🚫 Validation Errors Found</h3>
//         <div className="error-stats">
//           <p><strong>Total Rows:</strong> {result.totalRows}</p>
//           <p><strong>Valid Rows:</strong> {result.validRows}</p>
//           <p><strong>Error Rows:</strong> {result.errorRows.length}</p>
//         </div>
//         {result.pdfReportPath && (
//           <a 
//             href={`/reports/${result.pdfReportPath}`} 
//             target="_blank" 
//             rel="noopener noreferrer"
//             className="download-btn"
//           >
//             📥 Download Detailed Report
//           </a>
//         )}
//       </div>

//       {result.aiAnalysis && (
//         <div className="ai-analysis">
//           <h4>🤖 AI Analysis & Recommendations:</h4>
//           <pre>{result.aiAnalysis}</pre>
//         </div>
//       )}

//       <div className="error-details">
//         <h4>📋 Error Details:</h4>
//         {result.errors.map((error, index) => (
//           <div key={index} className="error-row">
//             <strong>Row {error.row}:</strong>
//             <ul>
//               {error.errors.map((err, errIndex) => (
//                 <li key={errIndex}>{err}</li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   // Render preview table
//   const renderPreview = (preview) => (
//     <div className="preview-section">
//       <h3>📊 Data Preview (First 10 rows)</h3>
//       <div className="table-container">
//         <table className="preview-table">
//           <thead>
//             <tr>
//               <th>Row</th>
//               <th>Question</th>
//               <th>Description</th>
//               <th>Options</th>
//               <th>Answer</th>
//               <th>Difficulty</th>
//               <th>Marks</th>
//               <th>Is Negative</th>
//               <th>Negative Marks</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {preview.map((row, index) => (
//               <tr key={index} className={row.hasError ? 'error-row' : 'valid-row'}>
//                 <td>{row.row}</td>
//                 {row.data.map((cell, cellIndex) => (
//                   <td key={cellIndex} title={String(cell)}>
//                     {String(cell).length > 50 ? `${String(cell).substring(0, 50)}...` : String(cell)}
//                   </td>
//                 ))}
//                 <td>
//                   {row.hasError ? (
//                     <span className="status-error">❌ Error</span>
//                   ) : (
//                     <span className="status-valid">✅ Valid</span>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   return (
//     <div className="excel-validator">
//       <style jsx>{`
//         .excel-validator {
//           max-width: 1200px;
//           margin: 0 auto;
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//         }

//         .header {
//           background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
//           padding: 30px;
//           text-align: center;
//           color: white;
//           border-radius: 15px 15px 0 0;
//         }

//         .header h1 {
//           font-size: 2.5rem;
//           margin-bottom: 10px;
//         }

//         .header p {
//           font-size: 1.1rem;
//           opacity: 0.9;
//         }

//         .upload-section {
//           padding: 40px;
//           background: white;
//         }

//         .file-upload-container {
//           border: 3px dashed #4facfe;
//           border-radius: 15px;
//           padding: 60px 20px;
//           background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
//           text-align: center;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           margin-bottom: 30px;
//         }

//         .file-upload-container:hover,
//         .file-upload-container.dragover {
//           border-color: #667eea;
//           transform: translateY(-2px);
//           box-shadow: 0 8px 25px rgba(0,0,0,0.1);
//           background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
//         }

//         .upload-icon {
//           font-size: 4rem;
//           margin-bottom: 20px;
//         }

//         .upload-text {
//           font-size: 1.3rem;
//           margin-bottom: 15px;
//           color: #333;
//           font-weight: 600;
//         }

//         .upload-subtext {
//           color: #666;
//           font-size: 1rem;
//         }

//         .file-input {
//           display: none;
//         }

//         .file-info {
//           background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
//           padding: 20px;
//           border-radius: 10px;
//           margin-bottom: 20px;
//           text-align: left;
//           border-left: 4px solid #4facfe;
//         }

//         .file-info strong {
//           color: #1976d2;
//         }

//         .btn {
//           padding: 12px 30px;
//           border: none;
//           border-radius: 25px;
//           font-size: 1rem;
//           font-weight: 600;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           margin: 0 10px 10px 0;
//         }

//         .btn-primary {
//           background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
//           color: white;
//         }

//         .btn-primary:hover:not(:disabled) {
//           transform: translateY(-2px);
//           box-shadow: 0 8px 25px rgba(79, 172, 254, 0.4);
//         }

//         .btn-secondary {
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//         }

//         .btn-secondary:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
//         }

//         .btn:disabled {
//           opacity: 0.6;
//           cursor: not-allowed;
//         }

//         .loading-section {
//           padding: 40px;
//           text-align: center;
//           background: white;
//         }

//         .spinner {
//           border: 4px solid #f3f3f3;
//           border-top: 4px solid #4facfe;
//           border-radius: 50%;
//           width: 50px;
//           height: 50px;
//           animation: spin 1s linear infinite;
//           margin: 0 auto 20px;
//         }

//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }

//         .progress-bar {
//           width: 100%;
//           height: 6px;
//           background: #e0e0e0;
//           border-radius: 3px;
//           overflow: hidden;
//           margin: 20px 0;
//         }

//         .progress-fill {
//           height: 100%;
//           background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
//           transition: width 0.3s ease;
//         }

//         .results-section {
//           padding: 30px;
//           background: white;
//           border-radius: 0 0 15px 15px;
//         }

//         .success-message {
//           background: linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%);
//           color: white;
//           padding: 20px;
//           border-radius: 10px;
//           margin-bottom: 20px;
//           text-align: center;
//           font-weight: 600;
//         }

//         .error-container {
//           background: #f8f9fa;
//           border-radius: 10px;
//           padding: 25px;
//           margin-bottom: 30px;
//         }

//         .error-summary {
//           background: linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%);
//           color: white;
//           padding: 20px;
//           border-radius: 10px;
//           margin-bottom: 20px;
//         }

//         .error-summary h3 {
//           margin-bottom: 15px;
//           font-size: 1.3rem;
//         }

//         .error-stats p {
//           margin-bottom: 8px;
//         }

//         .ai-analysis {
//           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//           color: white;
//           padding: 20px;
//           border-radius: 10px;
//           margin-bottom: 20px;
//         }

//         .ai-analysis h4 {
//           margin-bottom: 15px;
//           color: #fff;
//         }

//         .ai-analysis pre {
//           white-space: pre-wrap;
//           font-family: inherit;
//           color: #f0f0f0;
//           line-height: 1.6;
//           font-size: 0.95rem;
//         }

//         .error-details {
//           background: white;
//           border: 2px solid #ff6b6b;
//           border-radius: 10px;
//           padding: 20px;
//         }

//         .error-details h4 {
//           color: #d32f2f;
//           margin-bottom: 15px;
//         }

//         .error-row {
//           margin-bottom: 15px;
//           padding: 15px;
//           background: #fff5f5;
//           border-left: 4px solid #ff6b6b;
//           border-radius: 5px;
//         }

//         .error-row strong {
//           color: #d32f2f;
//         }

//         .error-row ul {
//           margin-top: 10px;
//           padding-left: 20px;
//         }

//         .error-row li {
//           color: #666;
//           margin-bottom: 5px;
//         }

//         .preview-section {
//           margin-top: 30px;
//         }

//         .preview-section h3 {
//           color: #333;
//           margin-bottom: 20px;
//         }

//         .table-container {
//           overflow-x: auto;
//           border-radius: 10px;
//           box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//         }

//         .preview-table {
//           width: 100%;
//           border-collapse: collapse;
//           font-size: 0.9rem;
//           min-width: 800px;
//         }

//         .preview-table th,
//         .preview-table td {
//           border: 1px solid #ddd;
//           padding: 12px 8px;
//           text-align: left;
//           max-width: 150px;
//           overflow: hidden;
//           text-overflow: ellipsis;
//         }

//         .preview-table th {
//           background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
//           color: white;
//           font-weight: 600;
//           position: sticky;
//           top: 0;
//           z-index: 10;
//         }

//         .preview-table .error-row {
//           background-color: #ffebee;
//         }

//         .preview-table .valid-row {
//           background-color: #f1f8e9;
//         }

//         .status-error {
//           color: #d32f2f;
//           font-weight: 600;
//         }

//         .status-valid {
//           color: #2e7d32;
//           font-weight: 600;
//         }

//         .download-btn {
//           background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
//           color: white;
//           padding: 10px 20px;
//           border-radius: 20px;
//           text-decoration: none;
//           display: inline-block;
//           margin-top: 15px;
//           transition: all 0.3s ease;
//           font-weight: 600;
//         }

//         .download-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 5px 15px rgba(40, 167, 69, 0.4);
//           color: white;
//           text-decoration: none;
//         }

//         @media (max-width: 768px) {
//           .excel-validator {
//             margin: 10px;
//           }

//           .header {
//             padding: 20px;
//             border-radius: 10px 10px 0 0;
//           }

//           .header h1 {
//             font-size: 2rem;
//           }

//           .upload-section {
//             padding: 20px;
//           }

//           .file-upload-container {
//             padding: 40px 15px;
//           }

//           .btn {
//             width: 100%;
//             margin: 5px 0;
//           }

//           .preview-table {
//             font-size: 0.8rem;
//           }
//         }
//       `}</style>

//       <div className="header">
//         <h1>📊 Excel File Validator</h1>
//         <p>Upload your Excel file and get instant validation with AI-powered error analysis</p>
//       </div>

//       <div className="upload-section">
//         <div 
//           className={`file-upload-container ${isDragOver ? 'dragover' : ''}`}
//           onClick={() => fileInputRef.current?.click()}
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           onDrop={handleDrop}
//         >
//           <div className="upload-icon">📁</div>
//           <div className="upload-text">Drag & Drop your Excel file here</div>
//           <div className="upload-subtext">or click to browse (Supported: .xlsx, .xls)</div>
//           <input 
//             ref={fileInputRef}
//             type="file" 
//             className="file-input" 
//             accept=".xlsx,.xls"
//             onChange={handleFileInputChange}
//           />
//         </div>

//         {selectedFile && (
//           <div className="file-info">
//             <p><strong>📄 Selected File:</strong> {selectedFile.name}</p>
//             <p><strong>📦 File Size:</strong> {formatFileSize(selectedFile.size)}</p>
//           </div>
//         )}

//         <div>
//           <button 
//             className="btn btn-primary" 
//             onClick={handleFilePreview}
//             disabled={!selectedFile || isLoading}
//           >
//             {isLoading ? '🔄 Analyzing...' : '🔍 Preview & Validate'}
//           </button>
//           <button 
//             className="btn btn-secondary" 
//             onClick={resetForm}
//             disabled={isLoading}
//           >
//             🗑️ Reset
//           </button>
//         </div>
//       </div>

//       {isLoading && (
//         <div className="loading-section">
//           <div className="spinner"></div>
//           <p>Analyzing your Excel file with AI...</p>
//           <div className="progress-bar">
//             <div 
//               className="progress-fill" 
//               style={{ width: `${progress}%` }}
//             ></div>
//           </div>
//         </div>
//       )}

//       {validationResult && (
//         <div className="results-section">
//           {validationResult.isValid ? (
//             <div className="success-message">
//               ✅ File is valid! {validationResult.validRows} rows ready for import.
//             </div>
//           ) : (
//             renderValidationErrors(validationResult)
//           )}

//           {validationResult.preview && validationResult.preview.length > 0 && 
//             renderPreview(validationResult.preview)
//           }
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExcelPreviewValidator;


import { API } from '@/utils/AxiosInstance';
import { showToast } from '@/utils/toastService';
import React, { useState, useRef } from 'react';

const ExcelPreviewValidator = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validationResult, setValidationResult] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const fileInputRef = useRef(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userId = user.id;
  const org = JSON.parse(localStorage.getItem("org")) || "";
  let orgId = org?.id || 0;

  // File size formatter
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Handle PDF download
  const handleDownloadPDF = async (pdfPath) => {
    if (!pdfPath) {
      alert('No PDF report available for download');
      return;
    }

    try {
      setIsDownloading(true);

      // Make API call to download the PDF
      const response = await API.get(`/api/question/files/download/report/${pdfPath}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob', // Important: Set response type to blob for binary data
      });

      // Create blob URL and trigger download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);

      // Create temporary anchor element for download
      const link = document.createElement('a');
      link.href = url;
      link.download = `excel-validation-report-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error downloading PDF:', error);

      // Handle different error scenarios
      if (error.response?.status === 404) {
        alert('PDF report not found. It may have been deleted or moved.');
      } else if (error.response?.status === 403) {
        alert('You do not have permission to download this report.');
      } else {
        alert('Failed to download PDF report. Please try again.');
      }
    } finally {
      setIsDownloading(false);
    }
  };

  // Alternative method using direct URL (if your backend serves static files)
  const handleDirectDownload = (pdfPath) => {
    if (!pdfPath) {
      alert('No PDF report available for download');
      return;
    }

    try {
      // Construct the full URL for the PDF
      const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';
      const pdfUrl = `${baseURL}/reports/${pdfPath}?token=${token}`;

      // Open in new tab or trigger download
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = `excel-validation-report-${new Date().toISOString().split('T')[0]}.pdf`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download PDF report. Please try again.');
    }
  };

  // Handle file selection
  const handleFileSelection = (file) => {
    // Validate file type
    const validTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];

    if (!validTypes.includes(file.type) && !file.name.match(/\.(xlsx|xls)$/i)) {
      alert('Please select a valid Excel file (.xlsx or .xls)');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setSelectedFile(file);
    setValidationResult(null);
  };

  // Handle file input change
  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  // Handle drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  // Handle file preview and validation
  const handleFilePreview = async () => {
    if (!selectedFile) {
      alert('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      setIsLoading(true);
      setProgress(0);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => prev < 90 ? prev + 10 : prev);
      }, 200);

      const response = await API.post('/api/question/files/preview/excelfile?userId=' + userId + '&orgId=' + orgId,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      clearInterval(progressInterval);
      setProgress(100);


      const result = response.data;
      setValidationResult(result);

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to validate file. Please try again.');
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  // Reset form
  const resetForm = () => {
    setSelectedFile(null);
    setValidationResult(null);
    setIsLoading(false);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.warn("Please select a file first!");
      return;
    }
    // console.log(selectedFile);
    const formData = new FormData();
    formData.append("file", selectedFile);
    try {
      if (token) {
        const res = await API.get(
          `/api/question/files?filename=${selectedFile.name}&orgid=${orgid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        );
        if (res.data?.length > 0) {
          showToast("error", "Duplicate file upload not allowed!");
          return;
        }
      }
    } catch (error) {
      if (error.status == 403) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // showToast("error","Invaild token!");
        navigate("/login");
        return;
      }
    }

    try {
      if (token) {
        setIsLoading(true);
        setProgress(0);

        // Simulate progress
        const progressInterval = setInterval(() => {
          setProgress(prev => prev < 90 ? prev + 10 : prev);
        }, 200);
        const response = await API.post("/api/file/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          },
          // onUploadProgress: (progressEvent) => {
          //   const progress = Math.round(
          //     (progressEvent.loaded * 100) / progressEvent.total
          //   );
          //   // setUploadProgress(progress); // Update progress
          // },
        });
        // console.log(response.data.data);
        let fileName = response.data.data.fileName;
        let filePath = response.data.data.filePath;

        const data = await API.post("/api/question/files", {
          file_name: fileName,
          file_path: filePath,
          user_id: userId,
          status: 0,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // if(response.status == 500){
        //     showToast("error",response.message)
        // }
        clearInterval(progressInterval);
        setProgress(100);
        setIsLoading(false);

        // if (response.status == 200 && data.status == 200) {
          showToast("success", "File uploaded successfully!!");

          navigate("/dshb/uploaded/files");
        // }
      }
    } catch (error) {
      setIsLoading(false);
      if (error.status == 403) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // showToast("error","Invaild token!");
        navigate("/login");
        return;
      }
      if (error.status == 400) {
        showToast("error", "Invalid data format in Excel sheet!");
      } else {
        // showToast("error", "File upload failed!");
      }
    }
    resetForm();
  };


  const renderValidationErrors = (result) => (
    <div className="error-container">
      <div className="error-summary">
        <h3>🚫 Validation Errors Found</h3>
        <div className="error-stats">
          <p><strong>Total Rows:</strong> {result.totalRows}</p>
          <p><strong>Valid Rows:</strong> {result.validRows}</p>
          <p><strong>Error Rows:</strong> {result.errorRows.length}</p>
        </div>
        {result.pdfReportPath && (
          <div className="download-buttons">
            <button
              onClick={() => handleDownloadPDF(result.pdfReportPath)}
              disabled={isDownloading}
              className="download-btn"
            >
              {isDownloading ? (
                <>
                  <span className="download-spinner"></span>
                  Downloading...
                </>
              ) : (
                <>📥 Download Detailed Report</>
              )}
            </button>

            {/* Alternative download method button */}
            <button
              onClick={() => handleDirectDownload(result.pdfReportPath)}
              className="download-btn download-btn-alt"
              style={{ marginLeft: '10px' }}
            >
              🔗 Open Report
            </button>
          </div>
        )}
      </div>

      {result.aiAnalysis && (
        <div className="ai-analysis">
          <h4>🤖 AI Analysis & Recommendations:</h4>
          <pre>{result.aiAnalysis}</pre>
        </div>
      )}

      <div className="error-details">
        <h4>📋 Error Details:</h4>
        {result.errors.map((error, index) => (
          <div key={index} className="error-row">
            <strong>Row {error.row}:</strong>
            <ul>
              {error.errors.map((err, errIndex) => (
                <li key={errIndex}>{err}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  // Render preview table
  const renderPreview = (preview) => (
    <div className="preview-section">
      <h3>📊 Data Preview</h3>
      <div className="table-container">
        <table className="preview-table">
          <thead>
            <tr>
              <th>Row</th>
              <th>Question</th>
              <th>Description</th>
              <th>Explanation</th>
              <th>Options</th>
              <th>Answer</th>
              <th>Difficulty</th>
              <th>Marks</th>
              <th>Is Negative</th>
              <th>Negative Marks</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {preview.map((row, index) => (
              <tr key={index} className={row.hasError ? 'error-row' : 'valid-row'}>
                <td>{row.row}</td>
                {row.data.map((cell, cellIndex) => (
                  <td key={cellIndex} title={String(cell)}>
                    {String(cell).length > 50 ? `${String(cell).substring(0, 50)}...` : String(cell)}
                  </td>
                ))}
                <td>
                  {row.hasError ? (
                    <span className="status-error">❌ Error</span>
                  ) : (
                    <span className="status-valid">✅ Valid</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="excel-validator">
      <style jsx>{`
        .excel-validator {
          max-width: 1200px;
          margin: 0 auto;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .header-uploadfile {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          padding: 30px;
          text-align: center;
          color: white;
          border-radius: 1px 1px 0 0;
        }

        .header-uploadfile h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
        }

        .header-uploadfile p {
          font-size: 1.1rem;
          opacity: 0.9;
        }

        .upload-section {
          padding: 40px;
          background: white;
        }

        .file-upload-container {
          border: 3px dashed #4facfe;
          border-radius: 15px;
          padding: 60px 20px;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 30px;
        }

        .file-upload-container:hover,
        .file-upload-container.dragover {
          border-color: #667eea;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.1);
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
        }

        .upload-icon {
          font-size: 4rem;
          margin-bottom: 20px;
        }

        .upload-text {
          font-size: 1.3rem;
          margin-bottom: 15px;
          color: #333;
          font-weight: 600;
        }

        .upload-subtext {
          color: #666;
          font-size: 1rem;
        }

        .file-input {
          display: none;
        }

        .file-info {
          background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 20px;
          text-align: left;
          border-left: 4px solid #4facfe;
        }

        .file-info strong {
          color: #1976d2;
        }

        .btn {
          padding: 12px 30px;
          border: none;
          border-radius: 25px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin: 0 10px 10px 0;
        }

        .btn-primary {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          color: white;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(79, 172, 254, 0.4);
        }

        .btn-secondary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .btn-secondary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .loading-section {
          padding: 40px;
          text-align: center;
          background: white;
        }

        .spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #4facfe;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .progress-bar {
          width: 100%;
          height: 6px;
          background: #e0e0e0;
          border-radius: 3px;
          overflow: hidden;
          margin: 20px 0;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          transition: width 0.3s ease;
        }

        .results-section {
          padding: 30px;
          background: white;
          border-radius: 0 0 15px 15px;
        }

        .success-message {
          background: linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%);
          color: white;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 20px;
          text-align: center;
          font-weight: 600;
        }

        .error-container {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 25px;
          margin-bottom: 30px;
        }

        .error-summary {
          background: linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%);
          color: white;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 20px;
        }

        .error-summary h3 {
          margin-bottom: 15px;
          font-size: 1.3rem;
        }

        .error-stats p {
          margin-bottom: 8px;
        }

        .download-buttons {
          margin-top: 20px;
        }

        .ai-analysis {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 20px;
          border-radius: 10px;
          margin-bottom: 20px;
        }

        .ai-analysis h4 {
          margin-bottom: 15px;
          color: #fff;
        }

        .ai-analysis pre {
          white-space: pre-wrap;
          font-family: inherit;
          color: #f0f0f0;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .error-details {
          background: white;
          border: 2px solid #ff6b6b;
          border-radius: 10px;
          padding: 20px;
        }

        .error-details h4 {
          color: #d32f2f;
          margin-bottom: 15px;
        }

        .error-row {
          margin-bottom: 15px;
          padding: 15px;
          background: #fff5f5;
          border-left: 4px solid #ff6b6b;
          border-radius: 5px;
        }

        .error-row strong {
          color: #d32f2f;
        }

        .error-row ul {
          margin-top: 10px;
          padding-left: 20px;
        }

        .error-row li {
          color: #666;
          margin-bottom: 5px;
        }

        .preview-section {
          margin-top: 30px;
        }

        .preview-section h3 {
          color: #333;
          margin-bottom: 20px;
        }

        .table-container {
          overflow-x: auto;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .preview-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
          min-width: 800px;
        }

        .preview-table th,
        .preview-table td {
          border: 1px solid #ddd;
          padding: 12px 8px;
          text-align: left;
          max-width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .preview-table th {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          color: white;
          font-weight: 600;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .preview-table .error-row {
          background-color: #ffebee;
        }

        .preview-table .valid-row {
          background-color: #f1f8e9;
        }

        .status-error {
          color: #d32f2f;
          font-weight: 600;
        }

        .status-valid {
          color: #2e7d32;
          font-weight: 600;
        }

        .download-btn {
          background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 25px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          font-weight: 600;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .download-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(40, 167, 69, 0.4);
          color: white;
          text-decoration: none;
        }

        .download-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .download-btn-alt {
          background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
        }

        .download-btn-alt:hover:not(:disabled) {
          box-shadow: 0 5px 15px rgba(108, 117, 125, 0.4);
        }

        .download-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid #ffffff40;
          border-top: 2px solid #ffffff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @media (max-width: 768px) {
          .excel-validator {
            margin: 10px;
          }
          
          .header {
            padding: 20px;
            border-radius: 10px 10px 0 0;
          }
          
          .header h1 {
            font-size: 2rem;
          }
          
          .upload-section {
            padding: 20px;
          }
          
          .file-upload-container {
            padding: 40px 15px;
          }
          
          .btn {
            width: 100%;
            margin: 5px 0;
          }
          
          .download-btn {
            width: 100%;
            margin: 5px 0;
            justify-content: center;
          }
          
          .preview-table {
            font-size: 0.8rem;
          }
        }
      `}</style>

      <div className="header-uploadfile">
        <h1>📊 Excel File Validator</h1>
        <p>Upload your Excel file and get instant validation with AI-powered error analysis</p>
      </div>

      <div className="upload-section">
        <div
          className={`file-upload-container ${isDragOver ? 'dragover' : ''}`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="upload-icon">📁</div>
          <div className="upload-text">Drag & Drop your Excel file here</div>
          <div className="upload-subtext">or click to browse (Supported: .xlsx, .xls)</div>
          <input
            ref={fileInputRef}
            type="file"
            className="file-input"
            accept=".xlsx,.xls"
            onChange={handleFileInputChange}
          />
        </div>

        {selectedFile && (
          <div className="file-info">
            <p><strong>📄 Selected File:</strong> {selectedFile.name}</p>
            <p><strong>📦 File Size:</strong> {formatFileSize(selectedFile.size)}</p>
          </div>
        )}

        <div>
          <button
            className="btn btn-primary"
            onClick={handleFilePreview}
            disabled={!selectedFile || isLoading}
          >
            {isLoading ? '🔄 Analyzing...' : '🔍 Preview & Validate'}
          </button>
          <button
            className="btn btn-secondary"
            onClick={resetForm}
            disabled={isLoading}
          >
            🗑️ Reset
          </button>
          {
            validationResult && validationResult.errorRows && validationResult.errorRows.length == 0 && (
              <button
                className="btn btn-secondary download-btn"
                onClick={handleUpload}
                disabled={isLoading}
              >
                ⬇️ Upload
              </button>
            )
          }

        </div>
      </div>

      {isLoading && (
        <div className="loading-section">
          <div className="spinner"></div>
          <p>Analyzing your Excel file with AI...</p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {validationResult && (
        <div className="results-section">
          {validationResult.isValid ? (
            <div className="success-message">
              ✅ File is valid! {validationResult.validRows} rows ready for import.
            </div>
          ) : (
            renderValidationErrors(validationResult)
          )}

          {validationResult.preview && validationResult.preview.length > 0 &&
            renderPreview(validationResult.preview)
          }
        </div>
      )}
    </div>
  );
};

export default ExcelPreviewValidator;