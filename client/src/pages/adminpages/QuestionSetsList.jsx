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
    title: "Questionsets | Best Quiz Maker App Admin Panel – GoTestli",
    description:
        "List of questionsets on Gotestli, the best quiz app for learning and trivia. Process payments, track refund statuses, approve or deny requests, and maintain complete financial records for subscriptions and quiz purchases.",
    keywords:
        "best quiz app for learning, best quiz maker app, quiz app for trivia, gotestli questionsets, quiz management admin, questionsets list, list of questionsets, quiz management system, quiz platform questionsets, student tracking, student administration, quiz app users",
    canonical: "https://gotestli.com/admin/questionsets",
    category: "Financial Administration, student Management, Quiz Platform",
    subject: "QUestionsets Management, Quiz App Users, Quiz tracking, Student Tracking, Questionset Management",
    audience: "Platform Administrators, Customer Service Teams, Accountants,questionsets, Quiz App Users, Educators, Trainers, instructors"
};

const QuestionSetsList = () => {
    const location = useLocation()
    // const { RefundRequestsList } = location.state
    const user = JSON.parse(localStorage.getItem("user")) || "";
    const userId = user.id;
    const userRole = user.role;
    const token = localStorage.getItem("token");
    const org = JSON.parse(localStorage?.getItem("org")) || "";
    let orgid = org?.id || 0;
    const [RefundRequestsList, setRefundRequestsList] = useState([]);
    const [questionsets, setQuestionSets] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [refetch, setRefetch] = useState(false);

    async function getPayments(page = 1, rowsPerPage = 10) {
        const start = (page - 1) * rowsPerPage + 1;
        const end = page * rowsPerPage;
        try {
            if (token) {
                let url = ''
                if (searchQuery) {
                    url = `/api/questionset/active/allqset/?start=${start}&end=${end}&search=${encodeURIComponent(searchQuery)}&orgid=${orgid}`;
                } else {
                    url = `/api/questionset/active/allqset/?start=${start}&end=${end}&orgid=${orgid}`
                }
                const { data } = await API.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // console.log(data);
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
            console.error("Failed to fetch questionsets data:", error);
        }
    }
    useEffect(() => {
        getPayments();
    }, [refetch]);

  

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    const columns = [
        { id: "index", label: "#", sortable: false },
        // { id: "payment_intent_id", label: "Transaction ID", sortable: true },

        { id: "title", label: "Title", sortable: true },
        { id: "short_desc", label: "Short Description", sortable: true },
        { id: "description", label: "Description", sortable: true },
         { id: "author", label: "Creator", sortable: true },
        // { id: "amount", label: "Amount", sortable: true },
        { id: "created_date", label: "Account Created Date", sortable: true },
        { id: "start_date", label: "Quiz Start Date", sortable: true },
        { id: "end_date", label: "Quiz End Date", sortable: true },

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
                <TableCell >{payment.title}</TableCell>
                <TableCell >{payment.short_desc}</TableCell>
                <TableCell >{payment.description}</TableCell>
                <TableCell >{payment.author}</TableCell>
                {/* <TableCell >{payment.amount}</TableCell> */}
                <TableCell >{formattedDate}</TableCell>
                <TableCell >{payment.start_date?.split('T')[0] || '-'}</TableCell>
                <TableCell >{payment.end_date?.split('T')[0] || '-'} </TableCell>
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
                        {questionsets.length > 0 ? (
                            <div className="table-responsive mt-1" style={{ paddingTop: "20px" }}>
                                <CommonTable
                                    columns={columns}
                                    getRowId={getRowId}
                                    renderRowCells={renderRowCells}
                                    fetchData={getPayments}
                                    // initialData={questionsets}
                                    searchQuery={searchQuery}
                                //  tableData={filteredData.length > 0 ? filteredData : questionsets}
                                />
                            </div>
                        ) : (
                            <h4 className="no-content text-center">
                                Not any Questionset found! 🌟
                            </h4>
                        )}

                    </div>
                </div>
            </main>
            <FooterNine />
        </div>
    )
}

export default QuestionSetsList
