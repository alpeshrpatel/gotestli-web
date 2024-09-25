import React, { useEffect, useState } from "react";
import Preloader from "@/components/common/Preloader";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import { API } from "@/utils/AxiosInstance";
import { auth } from "@/firebase/Firebase";
import { useLocation, useParams } from "react-router-dom";
import { Downloading } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import HandleDownload from "@/components/common/HandleDownload.js";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Typography from "@mui/material/Typography";
// import Link from "@mui/material/Link";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const UploadedFiles = () => {
  const [uploadedData, setUploadedData] = useState([]);

  const location = useLocation();
  console.log(location);

  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userRole = user.role;
  const userId = user.id;
  useEffect(() => {
    // const author = auth.currentUser.displayName;
    async function getUploads() {
      try {
        const { data } = await API.get(`/api/question/files/${userId}`);
        console.log(data);
        setUploadedData(data);
      } catch (error) {
        console.error("Failed to fetch uploaded files data:", error);
      }
    }
    getUploads();
  }, []);

  async function handleDownload(fileName) {
    await HandleDownload("uploadedfile", fileName);
    // <HandleDownload type="uploadedfile" fileName={fileName} />;
  }

  return (
    <div>
      <Preloader />
      <Header userRole={userRole} />
      <div className="content-wrapper js-content-wrapper overflow-hidden w-100">
        {/* <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs> */}
        {uploadedData.length > 0 ? (
          <div className="table-responsive">
            <table className="custom-table file-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>File Name</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Correct Rows</th>
                  <th>Error Rows</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {uploadedData.map((file, i) => (
                  <tr key={file.id}>
                    <td>{i + 1}</td>
                    <td>{file.file_name}</td>
                    <td>{file.created_date.slice(0, 19).replace("T", " ")}</td>
                    <td>
                      {file.status == 0
                        ? "Not Started"
                        : file.status == 1
                        ? "Completed"
                        : "In Progress"}
                    </td>
                    <td>{file.correct_rows}</td>
                    <td>{file.error_rows}</td>
                    <td style={{ textAlign: "center" }}>
                      <FontAwesomeIcon
                        icon={faFileArrowDown}
                        style={{ fontSize: "30px", color: "#4CAF50" }}
                        onClick={() => handleDownload(file.file_name)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <h4 className="no-content text-center">
            It looks a bit empty here! 🌟 No files uploaded !
          </h4>
        )}
      </div>
      <FooterOne />
    </div>
  );
};

export default UploadedFiles;
