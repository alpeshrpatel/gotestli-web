import { resentCourses } from "@/data--backup/courses";
import { states } from "@/data--backup/dashboard";
import { teamMembers } from "@/data--backup/instractors";
import { notifications } from "@/data--backup/notifications";
import React, { useEffect, useState } from "react";
import FooterNine from "@/components/layout/footers/FooterNine";
import Charts from "@/components/dashboard/Charts";
import PieChartComponent from "@/components/dashboard/PieCharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { API } from "@/utils/AxiosInstance";
import { getMonthWiseQuizCount } from "@/utils/GetDatesOfMonth";

const completedAssignmentData = [
  { name: "21", assignmentsCompleted: 1 },
  { name: "22", assignmentsCompleted: 1.5 },
  { name: "23", assignmentsCompleted: 0.5 },
  { name: "24", assignmentsCompleted: 2 },
];

// const passingPercentage = [
//   // { name: "On Time", value: 45 },
//   // { name: "Late", value: 55 },
// ];

const COLORS = ["#0088FE", "#00C49F"];

export default function StudentDashboardOne() {
  const [dshbData, setDshbData] = useState({});
  const [results, setResults] = useState([]);
  const [passingData,setPassingData] = useState([])
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userRole = user.role;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let passingPercentageCnt = 0 ;
  const org = JSON.parse(localStorage.getItem("org")) || "";
  let orgid = org?.id || 0;

  useEffect(() => {
    const userId = user.id;
    async function getDataAnalysis() {
      try {
        if (token) {
          const { data } = await API.get(
            `/api/userresult/student/dashboard/analysis/${userId}?orgid=${orgid}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const res = await API.get(`/api/userresult/user/${userId}?orgid=${orgid}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
           // console.log(res.data);
          setResults(res.data);
          setDshbData(data);
          res && res.data.forEach((quiz) => {
            if (parseFloat(quiz?.percentage) >= quiz?.pass_percentage) {
              passingPercentageCnt += 1;
            }
          })

          const passingPercentage= [{ name: "Passed", value: passingPercentageCnt },
           { name: "Failed", value: (res.data.length - passingPercentageCnt) }]
            setPassingData(passingPercentage)
           // console.log(data);
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
    getDataAnalysis();
  }, []);

  const monthWiseCounts = getMonthWiseQuizCount(results);
  
  console.log(monthWiseCounts);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const passingPercentage =[{ name: "Passed", value: passingPercentageCnt },
  //   { name: "Failed", value: (results && results.length - passingPercentageCnt) }]

  const pieDataAssignmentCompletion = [
    {
      name: "Completed",
      value: Math.round(dshbData.quiz_completion_percentage),
    },
    {
      name: "Remaining",
      value: 100 - Math.round(dshbData.quiz_completion_percentage),
    },
  ];

 console.log(results);

  return (
    <div className=" w-100" style={{ marginTop: "90px" }}>
      <div className="dashboard__content bg-light-4">
        <div className="row pb-50 mb-10">
          <div className="col-auto">
            <h1 className="text-30 lh-12 fw-700">Dashboard</h1>
            <div className="mt-10">Welcome to Student Dashboard.</div>
          </div>
        </div>
        <Grid container spacing={1}>
          <Grid className="row" item xs={12} md={6}>
            <Grid item xs={12} md={6} sx={{ marginBottom: "10px" }}>
              <Card sx={{ height: "220px" }}>
                <CardContent>
                  <Typography variant="h6">Completed Quiz (#)</Typography>
                  <Typography
                    variant="h3"
                    sx={{ textAlign: "center", marginTop: "50px" }}
                  >
                    {dshbData.completed_quiz_count}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ height: "220px" }}>
                <CardContent>
                  <Typography variant="h6">Grade Average (%)</Typography>
                  <Typography
                    variant="h3"
                    sx={{ textAlign: "center", marginTop: "50px" }}
                  >
                    {Math.round(dshbData.average_percentage * 10) / 10}%
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ height: "220px" }}>
                <CardContent>
                  <Typography variant="h6">Quiz Completion (%)</Typography>
                  <div style={{ width: "100%", height: 150 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={pieDataAssignmentCompletion}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieDataAssignmentCompletion.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div
                      style={{
                        textAlign: "center",
                        marginTop: "-95px",
                        fontSize: "24px",
                      }}
                    >
                      {Math.round(dshbData.quiz_completion_percentage)}%
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card sx={{ height: "220px" }}>
                <CardContent>
                  <Typography variant="h6">PassPercentage Count (#)</Typography>
                  <div style={{ width: "100%", height: 150 }}>
                  <ResponsiveContainer>
                  <PieChart >
                    <Pie
                      data={passingData}
                      cx="50%"
                      cy="50%"
                      outerRadius={50}
                      fill="#82ca9d"
                      dataKey="value"
                    >
                      {passingData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                  </ResponsiveContainer>
                  </div>
                 
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ height: "450px", overflow: "scroll" }}>
              <CardContent>
                <Typography variant="h5">Completed Quiz Trends</Typography>
                <BarChart
                  width={635}
                  height={350}
                  data={monthWiseCounts}
                  className="mt-2"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis dataKey="Completed_Quiz"/>
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Completed_Quiz" fill="#8884d8" />
                </BarChart>
              </CardContent>
            </Card>
          </Grid>

          <Grid className="row" item xs={12}>
            <Grid item xs={12} sx={{ marginBottom: "10px" }}>
              <Card sx={{ height: "480px", overflow: "scroll" }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      position: "sticky",
                      top: "5px",
                      backgroundColor: "white",
                    }}
                  >
                    Quiz Results
                  </Typography>
                  <Paper>
                    <Table sx={{ padding: "5px" }}>
                      <TableHead
                        sx={{
                          position: "sticky",
                          top: "30px",
                          backgroundColor: "white",
                        }}
                      >
                        <TableRow>
                          <TableCell>Quiz Title</TableCell>
                          <TableCell>Started Date</TableCell>
                          <TableCell>Complete Date</TableCell>
                          <TableCell>Passing %</TableCell>
                          <TableCell>Percentage</TableCell>
                          <TableCell>Result</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {results
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row, index) => (
                            <TableRow key={index}>
                              <TableCell>{row.title}</TableCell>
                              <TableCell>
                                {row.created_date
                                  .slice(0, 19)
                                  .replace("T", " ")}
                              </TableCell>
                              <TableCell>
                                {row.modified_date
                                  .slice(0, 19)
                                  .replace("T", " ")}
                              </TableCell>
                              <TableCell>{row.pass_percentage}</TableCell>
                              <TableCell>{row.percentage}</TableCell>
                              <TableCell>
                                {parseFloat(row.percentage) >= row?.pass_percentage
                                  ? "Pass"
                                  : "Fail"}
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </Paper>
                </CardContent>
              </Card>
              <TablePagination
                component="div"
                count={results.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
                sx={{
                  marginTop: "6px",
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>

      <FooterNine />
    </div>
  );
}
