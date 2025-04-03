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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import ReceiptDownloader from "@/components/common/ReceiptDownloader";
import { showToast } from "@/utils/toastService";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const columns = [
  { id: "index", label: "#", sortable: false },
  { id: "payment_intent_id", label: "Transaction ID", sortable: true },
  { id: "title", label: "Title", sortable: true },
  { id: "amount", label: "Amount", sortable: true },
  { id: "created_date", label: "Date", sortable: true },
  { id: "action", label: "Action", sortable: false },
];

const StudentTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [transactionReceipt, setTransactionReceipt] = useState([]);
  const [clickedRefundBtn, setClickedRefundBtn] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userRole = user.role;
  const userId = user.id;
  const org = JSON.parse(localStorage?.getItem("org")) || "";
  let orgid = org?.id || 0;

  async function getPayments(page = 1, rowsPerPage = 10) {
    const start = (page - 1) * rowsPerPage + 1;
    const end = page * rowsPerPage;
    try {
      if (token) {
        let url = ''
        if (searchQuery) {
          url = `/api/transactions/payments/${userId}?start=${start}&end=${end}&search=${encodeURIComponent(searchQuery)}`;
        } else {
          url = `/api/transactions/payments/${userId}?start=${start}&end=${end}`
        }
        const { data } = await API.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(data);
        setTransactions(data.res);
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
      console.error("Failed to fetch transactions data:", error);
    }
  }
  useEffect(() => {
    // const author = auth.currentUser.displayName;

    getPayments();
  }, [searchQuery]);
  // console.log(isHovered);



  const handleDownload = async (paymentId) => {
    try {
      if (token) {
        const { data } = await API.get(`/api/transactions/receipt/${paymentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(data);
        setTransactionReceipt(data.res);
        if (data.status === 'success' && data.receipt && data.receipt.receiptUrl) {
          window.open(data.receipt.receiptUrl, '_blank');

        } else {
          showToast('error', 'Receipt URL not found in the response!');
        }
      }
    } catch (error) {
      console.error('Failed to download receipt:', error);
      showToast('error', 'Failed to download receipt. Please try again.');
      if (error.status == 403) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // showToast("error","Invaild token!");
        navigate("/login");
        return;
      }

    }
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  //   const filteredData = transactions?.filter((quiz) =>
  //     // Object.values(quiz).some((value) =>
  //     //   value ? value.toString().toLowerCase().includes(searchQuery) : false
  //     // )
  //     quiz.title.toLowerCase().includes(searchQuery) ||
  //     quiz?.short_desc.toLowerCase().includes(searchQuery) ||
  //     quiz?.tags.toLowerCase().includes(searchQuery) ||
  //     quiz.author.toLowerCase().includes(searchQuery)
  //       ? true
  //       : false
  //   );

  const handleRowClick = (title) => {
    navigate("/search/result", { state: { keyword: title } });
  }

  const handleRefund = async (payment) => {
    try {
      setClickedRefundBtn(payment.id)
      if (token) {
        
        const response = await API.put(`/api/transactions/refund/${payment.payment_intent_id}`, {
          is_delete: 1
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const res = await API.post("/api/transactions", {
          questionSetId: payment.questionset_id, userId: payment.user_id, orgId: orgid, amount: payment.amount, paymentIntentId: payment.payment_intent_id, isDelete: 0, status: 'Refund Requested'
        },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        console.log(response)
        if (response.status == 200) {
          const res = await API.post('/api/sendemail/refund/request/admin', {
            email: payment.email,
            paymentId: payment.payment_intent_id,
            title: payment.title,
            amount: payment.amount,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          const resp = await API.post('/api/sendemail/refund/request/student', {
            email: payment.email,
            paymentId: payment.payment_intent_id,
            title: payment.title,
            amount: payment.amount,
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        } else {
          showToast('error', 'Refund Request Failed!');
        }


        showToast('success', 'Refund Request Received!');
        getPayments();
        // } else {
        //   showToast('error', 'Refund Request Failed!');
        // }
      }
    } catch (error) {
      console.error('Failed to process refund:', error);
      showToast('error', 'Failed to process refund request. Please try again.');
      if (error.status == 403) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // showToast("error","Invaild token!");
        navigate("/login");
        return;
      }

    }
  }
  console.log('tttttttttt',transactions)
  const getRowId = (row) => row.id;

  const renderRowCells = (payment, index) => {
    const date = new Date(payment.created_date);
    const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    return (
      <>
        <TableCell >{index + 1}</TableCell>
        <TableCell >{payment.payment_intent_id}</TableCell>
        <TableCell >{payment.title}</TableCell>
        <TableCell >{payment.amount}</TableCell>

        <TableCell >{formattedDate}</TableCell>
        <TableCell align="center" onClick={() => handleDownload(payment.payment_intent_id)} style={{
          textDecoration: "underline",
          color: "blue",
          textAlign: "center",
        }}>
          Invoice Receipt
          {/* <ReceiptDownloader transaction={payment} /> */}
        </TableCell>
        <TableCell>
          <button className="button -sm px-24 py-10 -green-5 mt-2 text-white fw-500  text-14 mx-auto" onClick={() => handleRefund(payment)} disabled={payment?.status || clickedRefundBtn == payment.id}
            // disabled={payment?.status !== null}
            style={{
              cursor: payment.status || clickedRefundBtn == payment.id
                ? "not-allowed"
                : "pointer",
              color: payment.status || clickedRefundBtn == payment.id
                ? "red"
                : "inherit",
              opacity: payment.status || clickedRefundBtn == payment.id
                ? 0.5
                : 1,
            }}
          >{payment.status ? payment.status : (clickedRefundBtn == payment.id ? 'Refund Requested' : 'Refund')}</button>
        </TableCell>
      </>

    )
  }

  return (
    <div>
      <Preloader />
      <Header userRole={userRole} />
      <div className="content-wrapper js-content-wrapper overflow-hidden w-100">
        {transactions?.length > 0 ? (
          <>
            <div className="table-responsive">
              {/* <div
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
           </div> */}
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
              {/* && filteredData.length <= 0 */}
              {searchQuery ? (
                <h4 className="no-content text-center">
                  It looks a bit empty here! 🌟 No fields matched!
                </h4>
              ) : (
                <CommonTable
                  columns={columns}
                  getRowId={getRowId}
                  renderRowCells={renderRowCells}
                  fetchData={getPayments}
                  searchQuery={searchQuery}
                //  tableData={filteredData.length > 0 ? filteredData : transactions}
                />
              )}
            </div>
          </>
        ) : (
          <h4 className="no-content text-center">
            No Any Transactions! 🌟
          </h4>
        )}
      </div>
      <FooterOne />
    </div>
  );
};

export default StudentTransactions;
