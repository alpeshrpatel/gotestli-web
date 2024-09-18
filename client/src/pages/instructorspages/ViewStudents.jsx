import React, { useEffect, useState } from "react";
import Preloader from "@/components/common/Preloader";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import { API } from "@/utils/AxiosInstance";
import { auth } from "@/firebase/Firebase";
import { useLocation, useParams } from "react-router-dom";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Typography from "@mui/material/Typography";
// import Link from "@mui/material/Link";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const ViewStudents = () => {
  const [studentsData, setStudentsData] = useState([]);

  const location = useLocation();
  console.log(location);
  const { set } = location.state;
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userRole = user.role;
  useEffect(() => {
    // const author = auth.currentUser.displayName;
    async function getstudents() {
      try {
        const { data } = await API.get(
          `/api/userresult/students/list/${set.id}`
        );
        console.log(data);
        setStudentsData(data);
      } catch (error) {
        console.error("Failed to fetch student data:", error);
      }
    }
    getstudents();
  }, []);

  // const breadcrumbs = [
  //   <Link
  //     underline="hover"
  //     key="1"
  //     color="inherit"
  //     href="/"
  //     onClick={handleClick}
  //   >
  //     MUI
  //   </Link>,
  //   <Link
  //     underline="hover"
  //     key="2"
  //     color="inherit"
  //     href="/material-ui/getting-started/installation/"
  //     onClick={handleClick}
  //   >
  //     Core
  //   </Link>,
  //   <Typography key="3" sx={{ color: "text.primary" }}>
  //     Breadcrumb
  //   </Typography>,
  // ];

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
        {studentsData.length > 0 ? (
          <div className="table-responsive">
            <table className="custom-table student-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student ID</th>
                  <th>Date</th>

                  <th>Score</th>
                  <th>%</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {studentsData.map((student, i) => (
                  <tr key={student.id}>
                    <td>{i + 1}</td>
                    <td>{student.user_id}</td>
                    <td>
                      {student.modified_date.slice(0, 19).replace("T", " ")}
                    </td>

                    <td>{student.marks_obtained}</td>
                    <td>{student.percentage}</td>
                    <td>
                      {student.status === 2 ? "In Progress" : "Completed"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default ViewStudents;
