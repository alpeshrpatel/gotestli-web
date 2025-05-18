import React, { useEffect, useState } from "react";
import Preloader from "@/components/common/Preloader";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import { API } from "@/utils/AxiosInstance";
import { auth } from "@/firebase/Firebase";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Downloading } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import HandleDownload from "@/components/common/HandleDownload.js";
import { TableCell } from "@mui/material";
import CommonTable from "@/components/common/CommonTable";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Typography from "@mui/material/Typography";
// import Link from "@mui/material/Link";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const columns = [
  { id: "index", label: "#", sortable: false },
  { id: "file_name", label: "File Name", sortable: true, align: "center" },
  { id: "created_date", label: "Date", sortable: true, align: "center" },
  { id: "status", label: "Status", sortable: true, align: "center" },
  {
    id: "correct_rows",
    label: "Correct Rows",
    sortable: true,
    align: "center",
  },
  { id: "error_rows", label: "Error Rows", sortable: true, align: "center" },
  { id: "actions", label: "Action", sortable: false, align: "center" },
];

const UploadedFiles = () => {
  const [uploadedData, setUploadedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
   // console.log(location);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userRole = user.role;
  const userId = user.id;
  const org = JSON.parse(localStorage.getItem("org")) || "";
  let orgid = org?.id || 0;

  async function getUploads(page = 1, rowsPerPage = 10) {
    const start = (page - 1) * rowsPerPage + 1;
    const end = page * rowsPerPage;
    try {
      if (token) {
        let url = ''
        if(searchQuery){
          url = `/api/question/files/${userId}?start=${start}&end=${end}&search=${encodeURIComponent(searchQuery)}&orgid=${orgid}`;
        }else{
          url = `/api/question/files/${userId}?start=${start}&end=${end}&orgid=${orgid}`;
        }
        const { data } = await API.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
         // console.log(data);
        setUploadedData(data.res);
        const theNewObj = {
          data: data.res,
          totalRecords: data.totalRecords
        };
    
        console.log('Final theNewObj:', theNewObj);
        return theNewObj;
      }
    } catch (error) {
      if (error.status == 403) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // showToast("error","Invaild token!");
        navigate("/login");
        return;
      }
      console.error("Failed to fetch uploaded files data:", error);
    }
  }
  useEffect(() => {
    // const author = auth.currentUser.displayName;
   
    getUploads();
  }, [userId,searchQuery]);

  async function handleDownload(fileName) {
    await HandleDownload("uploadedfile", fileName);
    // <HandleDownload type="uploadedfile" fileName={fileName} />;
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredData = uploadedData?.filter((quiz) =>
    // Object.values(quiz).some((value) =>
    //   value ? value.toString().toLowerCase().includes(searchQuery) : false
    // )
    quiz.file_name.toLowerCase().includes(searchQuery) ||
    quiz?.file_path.toLowerCase().includes(searchQuery)
      ? true
      : false
  );
  const getRowId = (row) => row.id;

  const renderRowCells = (file, index) => (
    <>
      <TableCell>{index + 1}</TableCell>
      <TableCell align="center">{file.file_name}</TableCell>
      <TableCell align="center">
        {file.created_date.slice(0, 19).replace("T", " ")}
      </TableCell>
      <TableCell align="center">
        {file.status == 0
          ? "Not Started"
          : file.status == 1
          ? ( (file.error_rows && file.error_rows?.split(",")?.length) ? (<span style={{color:'red',fontWeight:500}}>Failed</span>) : 'Completed') 
          : "In Progress"}
      </TableCell>
      <TableCell align="center">
        {(file.correct_rows && file.correct_rows?.split(",")?.length) || 0}
      </TableCell>
      <TableCell align="center">
        {(file.error_rows && file.error_rows?.split(",")?.length) || 0}
      </TableCell>
      <TableCell align="center">
        <FontAwesomeIcon
          icon={faFileArrowDown}
          style={{ fontSize: "30px", color: "#4CAF50" }}
          onClick={() => handleDownload(file.file_name)}
        />
      </TableCell>
    </>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Preloader />
      <Header userRole={userRole} />
      <div className="content-wrapper js-content-wrapper overflow-hidden w-100" style={{ flex: 1 }}>
        {/* <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs> */}
        {uploadedData?.length > 0 ? (
          <div className="table-responsive" style={{}}>
            {/* <table className="custom-table file-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th style={{ textAlign: "center" }}>File Name</th>
                  <th style={{ textAlign: "center" }}>Date</th>
                  <th style={{ textAlign: "center" }}>Status</th>
                  <th style={{ textAlign: "center" }}>Correct Rows</th>
                  <th style={{ textAlign: "center" }}>Error Rows</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {uploadedData.map((file, i) => (
                  <tr key={file.id}>
                    <td>{i + 1}</td>
                    <td style={{ textAlign: "center" }}>{file.file_name}</td>
                    <td style={{ textAlign: "center" }}>
                      {file.created_date.slice(0, 19).replace("T", " ")}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {file.status == 0
                        ? "Not Started"
                        : file.status == 1
                        ? "Completed"
                        : "In Progress"}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {(file.correct_rows &&
                        file.correct_rows?.split(",")?.length) ||
                        0}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {(file.error_rows &&
                        file.error_rows?.split(",")?.length) ||
                        0}
                    </td>
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
            </table> */}
            {/* <CommonTable
              columns={columns}
              data={uploadedData}
              getRowId={getRowId}
              renderRowCells={renderRowCells}
            /> */}
            <div
              className="header-search__field position-relative d-flex align-items-center rounded-5 mt-10"
              style={{ height: "40px", width: "300px" }}
            >
              <SearchIcon
                className="position-absolute ms-3 text-muted"
                style={{ fontSize: "20px" }}
              />
              <input
                required
                type="text"
                className="form-control ps-5 pe-5 text-18 lh-12 text-dark-1 fw-500 w-100"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchQuery && (
                <CancelIcon
                  className="position-absolute end-0 me-3 text-muted"
                  fontSize="medium"
                  onClick={() => setSearchQuery("")}
                  style={{ cursor: "pointer" }}
                />
              )}
            </div>
            {searchQuery && filteredData.length <= 0 ? (
              <h4 className="no-content text-center">
                It looks a bit empty here! 🌟 No fields matched!
              </h4>
            ) : (
              <CommonTable
                columns={columns}
                // data={filteredData.length > 0 ? filteredData : uploadedData}
                getRowId={getRowId}
                renderRowCells={renderRowCells}
                fetchData={getUploads}
                searchQuery={searchQuery}
                // tableData={filteredData.length > 0 ? filteredData : uploadedData}
              />
            )}
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
