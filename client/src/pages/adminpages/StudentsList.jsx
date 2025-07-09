import CommonTable from '@/components/common/CommonTable'
import MetaComponent from '@/components/common/MetaComponent'
import Preloader from '@/components/common/Preloader'
import FooterNine from '@/components/layout/footers/FooterNine'
import Header from '@/components/layout/headers/Header'
import { auth, db } from '@/firebase/Firebase'
import { API } from '@/utils/AxiosInstance'
import { generateStrongTempPassword } from '@/utils/TemporaryPasswordGenerator'
import { showToast } from '@/utils/toastService'
import { CancelRounded, CheckCircle } from '@mui/icons-material'
import { Button, TableCell } from '@mui/material'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";


// const pageMetadata = {
//   title: "Refund Requests Management - GoTestli Admin Panel | Process & Track Payment Refunds",
//   description: "Manage and process refund requests on GoTestli platform. View pending refunds, track refund status, approve or deny requests, and maintain financial transaction records for quiz platform subscriptions and purchases.",
//   keywords: "gotestli refund requests, refund management admin, payment refunds, subscription refunds, refund processing, financial administration, refund status tracking, payment disputes, refund approval system, billing administration, transaction management, refund queue",
//   canonical: "https://gotestli.com/admin/refund-requests",
//   category: "Financial Administration",
//   subject: "Refund Management, Payment Processing, Financial Administration, Transaction Control",
//   audience: "Platform Administrators, Financial Managers, Billing Support Staff, Customer Service Team"
// };

const pageMetadata = {
    title: "Students | Best Quiz Maker App Admin Panel – GoTestli",
    description:
        "List of students on GoTestli, the best quiz app for learning and trivia. Process payments, track refund statuses, approve or deny requests, and maintain complete financial records for subscriptions and quiz purchases.",
    keywords:
        "best quiz app for learning, best quiz maker app, quiz app for trivia, gotestli students, student management admin, students list, list of students, student management system, quiz platform students, student tracking, student administration, quiz app users",
    canonical: "https://gotestli.com/admin/students",
    category: "Financial Administration, student Management, Quiz Platform",
    subject: "Students Management, Quiz App Users, Student Tracking, Financial Administration",
    audience: "Platform Administrators, Customer Service Teams, Accountants,students, Quiz App Users, Educators, Trainers, instructors"
};

const StudentsList = () => {
    const location = useLocation()
    // const { RefundRequestsList } = location.state
    const user = JSON.parse(localStorage.getItem("user")) || "";
    const userId = user.id;
    const userRole = user.role;
    const token = localStorage.getItem("token");
    const org = JSON.parse(localStorage?.getItem("org")) || "";
    let orgid = org?.id || 0;
    const [RefundRequestsList, setRefundRequestsList] = useState([]);
    const [students, setStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [refetch, setRefetch] = useState(false);

    async function getPayments(page = 1, rowsPerPage = 10) {
        const start = (page - 1) * rowsPerPage + 1;
        const end = page * rowsPerPage;
        try {
            if (token) {
                let url = ''
                if (searchQuery) {
                    url = `/api/users/admin/students/list/?start=${start}&end=${end}&search=${encodeURIComponent(searchQuery)}&orgid=${orgid}`;
                } else {
                    url = `/api/users/admin/students/list/?start=${start}&end=${end}&orgid=${orgid}`
                }
                const { data } = await API.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // console.log(data);
                setStudents(data.res);
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
            console.error("Failed to fetch students data:", error);
        }
    }
    useEffect(() => {
        getPayments();
    }, [refetch]);

    const handleApprove = async (payment, status) => {
        try {
            if (token) {

                const response = await API.put(`/api/students/refund/${payment.payment_intent_id}`, {
                    is_delete: 1
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const res = await API.post("/api/students", {
                    questionSetId: payment.questionset_id, userId: payment.user_id, orgId: orgid, amount: payment.amount, paymentIntentId: payment.payment_intent_id, isDelete: 0, status: status
                },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                console.log(response)
                if (response.status == 200) {
                    const updatedstudents = students.map(item => {
                        if (item.payment_intent_id === payment.payment_intent_id) {
                            return { ...item, status: status };
                        }
                        return item;
                    });
                    setStudents(updatedstudents)
                    //   const res = await API.post('/api/sendemail/refund/request/admin', {
                    //     email: payment.email,
                    //     paymentId: payment.payment_intent_id,
                    //     title: payment.title,
                    //     amount: payment.amount,
                    //   }, {
                    //     headers: {
                    //       Authorization: `Bearer ${token}`,
                    //     },
                    //   })
                    //   const resp = await API.post('/api/sendemail/refund/request/student', {
                    //     email: payment.email,
                    //     paymentId: payment.payment_intent_id,
                    //     title: payment.title,
                    //     amount: payment.amount,
                    //   }, {
                    //     headers: {
                    //       Authorization: `Bearer ${token}`,
                    //     },
                    //   })
                    // }  else {
                    //   showToast('error', 'Refund Request Failed!');
                }

                showToast('success', status);
                // getPayments();
                setTimeout(() => {
                    setRefetch(prev => !prev);
                }, 500);
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
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const columns = [
        { id: "index", label: "#", sortable: false },
        // { id: "payment_intent_id", label: "Transaction ID", sortable: true },

        { id: "first_name", label: "First Name", sortable: true },
        { id: "last_name", label: "Last Name", sortable: true },
        { id: "email", label: "Email", sortable: true },
        // { id: "amount", label: "Amount", sortable: true },
        { id: "created_date", label: "Account Created Date", sortable: true },
        { id: "company", label: "Company", sortable: true },
        { id: "phone", label: "Contact", sortable: true },

        // { id: "action", label: "Action", sortable: false },
    ];


    const getRowId = (row) => row.id;

    const renderRowCells = (payment, index) => {
        const date = new Date(payment.created_date);
        const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        return (
            <>
                <TableCell >{index + 1}</TableCell>
                {/* <TableCell >{payment.payment_intent_id}</TableCell> */}
                {/* <TableCell >{payment.title}</TableCell> */}
                <TableCell >{payment.first_name}</TableCell>
                <TableCell >{payment.last_name}</TableCell>
                <TableCell >{payment.email}</TableCell>
                {/* <TableCell >{payment.amount}</TableCell> */}
                <TableCell >{formattedDate}</TableCell>
                <TableCell >{payment.company || '-'}</TableCell>
                <TableCell >{payment.phone || '-'} </TableCell>
                {/* <TableCell>
                    {
                        payment.status == 'Refund Requested' ? (
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => handleApprove(payment, 'Refund Approved')}
                                    style={{
                                        backgroundColor: '#4CAF50', // Green color
                                        color: 'white',
                                        textTransform: 'none'
                                    }}
                                >
                                    Approve
                                </Button>
                                <Button
                                    variant="contained"
                                    size="small"
                                    onClick={() => handleApprove(payment, 'Refund Rejected')}
                                    style={{
                                        backgroundColor: '#F44336', // Red color
                                        color: 'white',
                                        textTransform: 'none'
                                    }}
                                >
                                    Reject
                                </Button>
                            </div>
                        ) : (
                            payment.status !== 'Refund Rejected' ? (
                                <div style={{ display: 'flex', alignItems: 'center', color: '#4CAF50' }}>
                                    <CheckCircle style={{ marginRight: '5px' }} />
                                    <span>{payment.status ? payment.status : 'Payment Completed'}</span>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', color: '#F44336' }}>
                                    <CancelRounded style={{ marginRight: '5px' }} />
                                    <span>{payment.status ? payment.status : 'Payment Completed'}</span>
                                </div>
                            )


                        )
                    }

                </TableCell> */}
            </>

        )
    }

    return (
        <div className="barba-container" data-barba="container">
            <MetaComponent meta={pageMetadata} />
            <main className="main-content">
                <Preloader />
                <Header userRole={userRole} />
                <div className="content-wrapper js-content-wrapper overflow-hidden">
                    <div
                        id="dashboardOpenClose"
                        className="dashboard -home-9 js-dashboard-home-9 " style={{ marginTop: '150px', display: 'flex', justifyContent: 'center' }}
                    >
                        {/* <div className="dashboard__sidebar scroll-bar-1">
                 <Sidebar />
               </div> */}
                        <div
                            className="header-search__field position-relative d-flex align-items-center rounded-5 mt-10 mx-auto"
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
                        {students.length > 0 ? (
                            <div className="table-responsive mt-1" style={{ paddingTop: "20px" }}>
                                <CommonTable
                                    columns={columns}
                                    getRowId={getRowId}
                                    renderRowCells={renderRowCells}
                                    fetchData={getPayments}
                                    // initialData={students}
                                    searchQuery={searchQuery}
                                //  tableData={filteredData.length > 0 ? filteredData : students}
                                />
                            </div>
                        ) : (
                            <h4 className="no-content text-center">
                                Not any student found! 🌟
                            </h4>
                        )}

                    </div>
                </div>
            </main>
            <FooterNine />
        </div>
    )
}

export default StudentsList
