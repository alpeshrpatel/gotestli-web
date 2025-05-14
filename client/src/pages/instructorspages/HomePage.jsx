import MetaComponent from "@/components/common/MetaComponent";
import Preloader from "@/components/common/Preloader";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import React, { useEffect, useState } from "react";
import "./homepage.css";
import { API } from "@/utils/AxiosInstance";
import { auth } from "@/firebase/Firebase";
import { Button, IconButton, Switch, TableCell } from "@mui/material";
import { Delete, Edit, SaveAsRounded } from "@mui/icons-material";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import CommonTable from "@/components/common/CommonTable";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import { showToast } from "@/utils/toastService";

const metadata = {
  title:
    " Instructor Home || GoTestli - Ultimate School & General Purpose Quiz Platform",
  description:
    "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges.",
};

const columns = [
  { id: "index", label: "#", sortable: false },
  { id: "title", label: "Question Set Title", sortable: true },
  { id: "short_desc", label: "Description", sortable: true },
  { id: "no_of_question", label: "Total Questions", sortable: true },
  { id: "time_duration", label: "Duration", sortable: true },
  { id: "totalmarks", label: "Total Marks", sortable: true },
  { id: "is_demo", label: "Visible", sortable: true },
  { id: "questions", label: "Questions", sortable: false },
  { id: "attempted", label: "Total Attempted", sortable: false },
  { id: "actions", label: "Actions", sortable: false },
  { id: "active", label: "Active", sortable: false }
];

const HomePage = () => {
  const [questionSets, setQuestionSets] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [editOn, setEditOn] = useState(false);
  const [changedQSet, setChangedQSet] = useState({
    title: "",
    short_desc: "",
    time_duration: 0,
    is_demo: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userRole = user.role;
  const userId = user.id;
  const token = localStorage.getItem("token");
  const org = JSON.parse(localStorage.getItem("org")) || "";
  let orgid = org?.id || 0;

  async function getQuestionSets(page = 1, rowsPerPage = 10) {
    const start = (page - 1) * rowsPerPage + 1;
    const end = page * rowsPerPage;
    try {
      if (token) {
        let url = ''
        if (searchQuery) {
          url = `/api/questionset/instructor/${userId}?start=${start}&end=${end}&search=${encodeURIComponent(searchQuery)}&orgid=${orgid}`;
        } else {
          url = `/api/questionset/instructor/${userId}?start=${start}&end=${end}&orgid=${orgid}`;
        }
        const { data } = await API.get(
          url,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        setQuestionSets(data.res);
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
    }
  }

  useEffect(() => {
    // const author = auth.currentUser.displayName;

    getQuestionSets();
  }, [searchQuery]);
  console.log('qs', questionSets)
  // async function handleRowClick(id, index) {
  //   setExpandedRow(index === expandedRow ? null : index);
  //   if (index !== expandedRow) {
  //     try {
  //       const { data } = await API.get(`/api/userresult/students/list/${id}`);
  //        // console.log(data);
  //       setStudentsData(data);
  //     } catch (error) {
  //       console.error("Failed to fetch student data:", error);
  //     }
  //   }
  // }

  async function handleQSetChange(name, value) {
    setChangedQSet((prev) => ({
      ...prev,
      [name]: value !== undefined ? value : "",
    }));
  }

  function handleEdit(set) {
    setEditOn(set.id);
    setChangedQSet({
      title: set.title || "",
      short_desc: set.short_desc || "",
      time_duration: set.time_duration || "",
      is_demo: set.is_demo || false,
    });
  }
  async function handleDelete(set) {
    try {
      if (token) {
        // setEditOn(set.id);
        const res = await API.delete(`/api/questionset/${set.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        await API.delete(`/api/questionset/question/${set.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        await API.delete(`/api/questionset/category/${set.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // setEditOn(null);
        if (res.status == 200) {
          setQuestionSets((prev) => prev.filter((qSet) => qSet.id !== set.id));
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
  }

  async function handleSave(set) {
    try {
      if (token) {
        const res = await API.put(
          `/api/questionset/${set.id}?orgid=${orgid}`,
          {
            changedQSet,
            userId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEditOn(null);
        if (res.status == 200) {
          setQuestionSets((prev) =>
            prev.map((qSet) =>
              qSet.id == set.id ? { ...qSet, ...changedQSet } : qSet
            )
          );
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
      console.error("Failed to save changes:", error);
    }
  }

  // console.log(changedQSet);
  const handleNavigate = (set) => {
    navigate(`/quiz/students`, { state: { set: set } });
  };
  const handleViewQuestionsClick = (set) => {
    navigate(`/quiz/questions/${set.id}`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  // const filteredData = questionSets?.filter((quiz) =>
  //   // Object.values(quiz).some((value) =>
  //   //   value ? value.toString().toLowerCase().includes(searchQuery) : false
  //   // )
  //   quiz?.title?.toLowerCase().includes(searchQuery) ||
  //   quiz?.short_desc?.toLowerCase().includes(searchQuery) ||
  //   quiz?.tags?.toLowerCase().includes(searchQuery) ||
  //   quiz?.author?.toLowerCase().includes(searchQuery)
  //     ? true
  //     : false
  // );

  const filteredData = Array.isArray(questionSets)
    ? questionSets.filter((quiz) =>
      quiz?.title?.toLowerCase().includes(searchQuery) ||
      quiz?.short_desc?.toLowerCase().includes(searchQuery) ||
      quiz?.tags?.toLowerCase().includes(searchQuery) ||
      quiz?.author?.toLowerCase().includes(searchQuery)
    )
    : [];

  const handleStatusChange = async (qSetId, checked) => {
    try {
      if (token) {
        const res = await API.put(
          `/api/questionset/update/status?orgid=${orgid}`,
          {
            status_id: checked, id: qSetId
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEditOn(null);
        if (res.status == 200) {
          setQuestionSets((prev) =>
            prev.map((qSet) =>
              qSet.id == qSetId ? { ...qSet, status_id: checked } : qSet
            )
          );
          showToast("success", 'Status Saved Successfully!')
        }
      }
      // Refresh question sets or update the current state
    } catch (error) {
      if (error.status == 403) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // showToast("error","Invaild token!");
        navigate("/login");
        return;
      }
      console.error("Failed to save changes:", error);
    }
  }

  const getRowId = (row) => row.id;

  const renderRowCells = (set, index) => (
    <>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        {editOn === set.id ? (
          <input
            type="text"
            value={changedQSet.title || set.title}
            onChange={(e) => handleQSetChange("title", e.target.value)}
          />
        ) : (
          set.title
        )}
      </TableCell>
      <TableCell>
        {editOn === set.id ? (
          <input
            type="text"
            value={changedQSet.short_desc || set.short_desc}
            onChange={(e) => handleQSetChange("short_desc", e.target.value)}
          />
        ) : (
          set.short_desc
        )}
      </TableCell>
      <TableCell>{set.no_of_question}</TableCell>
      <TableCell>
        {editOn === set.id ? (
          <input
            type="text"
            value={changedQSet.time_duration || set.time_duration}
            onChange={(e) => handleQSetChange("time_duration", e.target.value)}
          />
        ) : (
          set.time_duration
        )}
      </TableCell>
      <TableCell>{set.totalmarks}</TableCell>
      <TableCell>
        {editOn === set.id ? (
          <>
            {changedQSet.is_demo ? "Public" : "Private"}
            <Switch
              checked={changedQSet.is_demo}
              onChange={(e) => handleQSetChange("is_demo", e.target.checked)}
              inputProps={{ "aria-label": "controlled" }}
            />
          </>
        ) : set.is_demo ? (
          "Public"
        ) : (
          "Private"
        )}
      </TableCell>
      <TableCell
        onClick={() => handleViewQuestionsClick(set)}
        style={{
          textDecoration: "underline",
          color: "blue",
          textAlign: "center",
        }}
      >
        View
      </TableCell>
      <TableCell
        onClick={() => handleNavigate(set)}
        style={{
          textDecoration: "underline",
          color: "blue",
          textAlign: "center",
        }}
      >
        View
      </TableCell>
      <TableCell>
        <div className=" d-flex ms-1 " style={{ alignItems: "center" }}>
          {editOn == set.id ? (
            <Button
              onClick={() => handleSave(set)}
              variant="contained"
              color="primary"
              size="small"
            >
              Save
            </Button>
          ) : (
            <>
              <IconButton onClick={() => handleEdit(set)}>
                <Edit sx={{ color: "#3f51b5" }} />
              </IconButton>
              <IconButton onClick={() => handleDelete(set)}>
                <Delete sx={{ color: "#f50057" }} />
              </IconButton>
            </>
          )}
        </div>
      </TableCell>
      <TableCell>
        <Switch
          checked={set.status_id}
          onChange={(e) => handleStatusChange(set.id, e.target.checked)}
          inputProps={{ "aria-label": "controlled" }}
        />
      </TableCell>
    </>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Preloader />
      <MetaComponent meta={metadata} />
      <Header userRole={userRole} />

      <div className="content-wrapper js-content-wrapper overflow-hidden w-100" style={{ flex: 1 }}>
        {questionSets.length > 0 ? (
          // <div className="table-responsive">
          //    <table className="custom-table">
          //     <thead>
          //       <tr>
          //         <th></th>
          //         <th>Question Set Title</th>
          //         <th>Description</th>
          //         <th>Total Questions</th>
          //         <th>Duration</th>
          //         <th>Total Marks</th>
          //         <th>Visible</th>
          //         <th>Questions</th>
          //         <th>Total Attempted</th>
          //         <th>Actions</th>
          //       </tr>
          //     </thead>
          //     <tbody>
          //       {questionSets.map((set, index) => (
          //         <React.Fragment key={set.id}>
          //           <tr
          //           // onClick={
          //           //   !(editOn == set.id)
          //           //     ? () => handleRowClick(set.id, index)
          //           //     : null
          //           // }
          //           // className={expandedRow === index ? "expanded" : ""}
          //           >
          //             <td>{index + 1}</td>
          //             <td>
          //               {editOn === set.id ? (
          //                 <input
          //                   type="text"
          //                   value={changedQSet.title || set.title}
          //                   onChange={(e) =>
          //                     handleQSetChange("title", e.target.value)
          //                   }
          //                 />
          //               ) : (
          //                 set.title
          //               )}
          //             </td>
          //             <td>
          //               {editOn === set.id ? (
          //                 <input
          //                   type="text"
          //                   value={changedQSet.short_desc || set.short_desc}
          //                   onChange={(e) =>
          //                     handleQSetChange("short_desc", e.target.value)
          //                   }
          //                 />
          //               ) : (
          //                 set.short_desc
          //               )}
          //             </td>
          //             <td>{set.no_of_question}</td>
          //             <td>
          //               {editOn === set.id ? (
          //                 <input
          //                   type="text"
          //                   value={
          //                     changedQSet.time_duration || set.time_duration
          //                   }
          //                   onChange={(e) =>
          //                     handleQSetChange("time_duration", e.target.value)
          //                   }
          //                 />
          //               ) : (
          //                 set.time_duration
          //               )}
          //             </td>
          //             <td>{set.totalmarks}</td>
          //             <td>
          //               {editOn === set.id ? (
          //                 <>
          //                   {changedQSet.is_demo ? "Public" : "Private"}
          //                   <Switch
          //                     checked={changedQSet.is_demo}
          //                     onChange={(e) =>
          //                       handleQSetChange("is_demo", e.target.checked)
          //                     }
          //                     inputProps={{ "aria-label": "controlled" }}
          //                   />
          //                 </>
          //               ) : set.is_demo ? (
          //                 "Public"
          //               ) : (
          //                 "Private"
          //               )}
          //             </td>
          //             <td
          //               onClick={() => handleViewQuestionsClick(set)}
          //               style={{
          //                 textDecoration: "underline",
          //                 color: "blue",
          //                 textAlign: "center",
          //               }}
          //             >
          //               View
          //             </td>
          //             <td
          //               onClick={() => handleNavigate(set)}
          //               style={{
          //                 textDecoration: "underline",
          //                 color: "blue",
          //                 textAlign: "center",
          //               }}
          //             >
          //               View
          //             </td>
          //             <td>
          //               <div
          //                 className=" d-flex ms-1 "
          //                 style={{ alignItems: "center" }}
          //               >
          //                 {editOn == set.id ? (
          //                   <Button
          //                     onClick={() => handleSave(set)}
          //                     variant="contained"
          //                     color="primary"
          //                     size="small"
          //                   >
          //                     Save
          //                   </Button>
          //                 ) : (
          //                   <>
          //                     <IconButton onClick={() => handleEdit(set)}>
          //                       <Edit sx={{ color: "#3f51b5" }} />
          //                     </IconButton>
          //                     <IconButton onClick={() => handleDelete(set)}>
          //                       <Delete sx={{ color: "#f50057" }} />
          //                     </IconButton>
          //                   </>
          //                 )}
          //               </div>
          //             </td>
          //           </tr>

          //         </React.Fragment>
          //       ))}
          //     </tbody>
          //   </table>
          // </div>
          <div className="table-responsive">
            {/* <CommonTable
              columns={columns}
              data={questionSets}
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
                  onClick={() => setSearchQuery('')}
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
                getRowId={getRowId}
                renderRowCells={renderRowCells}
                fetchData={getQuestionSets}
                searchQuery={searchQuery}
              // tableData={filteredData.length > 0 ? filteredData : questionSets}
              />
            )}
          </div>
        ) : (
          <h4 className="no-content text-center">
            It looks a bit empty here! 🌟 Unleash your creativity by crafting
            your very own Question Set. Let's make learning exciting—your
            students are waiting!
          </h4>
        )}


      </div>
      <FooterOne />
    </div>
  );
};

export default HomePage;
