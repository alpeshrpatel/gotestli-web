import React, { useEffect, useState } from "react";
import Preloader from "@/components/common/Preloader";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import { API } from "@/utils/AxiosInstance";
import { auth } from "@/firebase/Firebase";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Breadcrumbs, Button, TableCell } from "@mui/material";
import Typography from "@mui/material/Typography";
import CommonTable from "@/components/common/CommonTable";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";

// import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const columns = [
  { id: "index", label: "#", sortable: false },
  { id: "title", label: "QuestionSet Title", sortable: true },
  { id: "short_desc", label: "Description", sortable: true },
  { id: "totalmarks", label: "Total Marks", sortable: true },
  { id: "pass_percentage", label: "passing %", sortable: true },
  { id: "action", label: "Action", sortable: false },
];

const StudentWishlist = () => {
  const [questionSets, setQuestionSets] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userRole = user.role;
  const userId = user.id;
  useEffect(() => {
    // const author = auth.currentUser.displayName;
    async function getQuestions() {
      try {
        if (token) {
          const { data } = await API.get(`/api/wishlist/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(data);
          setQuestionSets(data);
        }
      } catch (error) {
        if (error.status == 403) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          // toast.error("Invaild token!");
          navigate("/login");
          return;
        }
        console.error("Failed to fetch Questionsets data:", error);
      }
    }
    getQuestions();
  }, []);
  console.log(isHovered);

  const handleDeleteFromWishlist = async (qSetId) => {
    try {
      if (token) {
        const { data } = await API.delete(`/api/wishlist/qset/${qSetId}/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(data);
        setQuestionSets(prevQuestionSets => 
          prevQuestionSets.filter(question => question.id !== qSetId) 
        );
      }
    } catch (error) {
      if (error.status == 403) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // toast.error("Invaild token!");
        navigate("/login");
        return;
      }
      console.error("Failed to delete Questionset :", error);
    }
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredData = questionSets.filter((quiz) =>
    // Object.values(quiz).some((value) =>
    //   value ? value.toString().toLowerCase().includes(searchQuery) : false
    // )
    quiz.title.toLowerCase().includes(searchQuery) ||
    quiz?.short_desc.toLowerCase().includes(searchQuery) ||
    quiz?.tags.toLowerCase().includes(searchQuery) ||
    quiz.author.toLowerCase().includes(searchQuery)
      ? true
      : false
  );

  const getRowId = (row) => row.id;

  const renderRowCells = (question, index) => (
    <>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{question.title}</TableCell>
      <TableCell>{question.short_desc}</TableCell>
      <TableCell>{question.totalmarks}</TableCell>
      <TableCell>{question.pass_percentage}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleDeleteFromWishlist(question.id)}
        >
          Remove
        </Button>
      </TableCell>
    </>
  );

  return (
    <div>
      <Preloader />
      <Header userRole={userRole} />
      <div className="content-wrapper js-content-wrapper overflow-hidden w-100">
        {questionSets.length > 0 ? (
         <>
         <div className="table-responsive">
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
           {/* <div className="filter-bar">
             <TextField
               label="Search Title"
               value={searchQuery}
               onChange={handleSearchChange}
             />
             <TextField
               label="Author"
               value={authorFilter}
               onChange={(e) => handleFilterChange("author", e.target.value)}
             />
             <Select
               value={statusFilter}
               onChange={(e) => handleFilterChange("status", e.target.value)}
             >
               <MenuItem value="">All Statuses</MenuItem>
               <MenuItem value={1}>Completed</MenuItem>
               <MenuItem value={0}>In Progress</MenuItem>
             </Select>
             <TextField
               type="number"
               label="Minimum Percentage"
               value={percentageFilter}
               onChange={(e) =>
                 handleFilterChange("percentage", e.target.value)
               }
             />
             <TextField
               type="date"
               label="Start Date"
               value={dateRange.start}
               onChange={(e) =>
                 setDateRange({ ...dateRange, start: e.target.value })
               }
             />
             <TextField
               type="date"
               label="End Date"
               value={dateRange.end}
               onChange={(e) =>
                 setDateRange({ ...dateRange, end: e.target.value })
               }
             />
           </div> */}
           {searchQuery && filteredData.length <= 0 ? (
             <h4 className="no-content text-center">
               It looks a bit empty here! 🌟 No fields matched!
             </h4>
           ) : (
             <CommonTable
               columns={columns}
               data={filteredData.length > 0 ? filteredData : questionSets}
               getRowId={getRowId}
               renderRowCells={renderRowCells}
             />
           )}
         </div>
       </>
        ) : (
          <h4 className="no-content text-center">
            No Any Question Set in WishList! 🌟
          </h4>
        )}
      </div>
      <FooterOne />
    </div>
  );
};

export default StudentWishlist;
