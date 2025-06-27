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
  title: "Refund Requests Management | Best Quiz Maker App Admin Panel – GoTestli",
  description:
    "Manage refund requests on GoTestli, the best quiz app for learning and trivia. Process payments, track refund statuses, approve or deny requests, and maintain complete financial records for subscriptions and quiz purchases.",
  keywords:
    "best quiz app for learning, best quiz maker app, quiz app for trivia, gotestli refund requests, refund management admin, payment refunds, subscription refund processing, financial administration, refund approval system, transaction management, billing control panel, payment disputes, quiz platform refunds",
  canonical: "https://gotestli.com/admin/refund-requests",
  category: "Financial Administration, Refund Management, Transaction Control",
  subject: "Refund Processing, Payment Management, Financial Administration, Quiz Platform Billing",
  audience: "Platform Administrators, Finance Managers, Billing Support, Customer Service Teams, Accountants"
};

const RefundRequestsList = () => {
    const location = useLocation()
    // const { RefundRequestsList } = location.state
    const user = JSON.parse(localStorage.getItem("user")) || "";
    const userId = user.id;
    const userRole = user.role;
    const token = localStorage.getItem("token");
    const org = JSON.parse(localStorage?.getItem("org")) || "";
    let orgid = org?.id || 0;
    const [RefundRequestsList, setRefundRequestsList] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [refetch, setRefetch] = useState(false);

    async function getPayments(page = 1, rowsPerPage = 10) {
        const start = (page - 1) * rowsPerPage + 1;
        const end = page * rowsPerPage;
        try {
            if (token) {
                let url = ''
                if (searchQuery) {
                    url = `/api/transactions/getall/payments/0?start=${start}&end=${end}&search=${encodeURIComponent(searchQuery)}`;
                } else {
                    url = `/api/transactions/getall/payments/0?start=${start}&end=${end}`
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
        getPayments();
    }, [refetch]);

    const handleApprove = async (payment, status) => {
        try {
            if (token) {
                
                const response = await API.put(`/api/transactions/refund/${payment.payment_intent_id}`, {
                    is_delete: 1
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const res = await API.post("/api/transactions", {
                    questionSetId: payment.questionset_id, userId: payment.user_id, orgId: orgid, amount: payment.amount, paymentIntentId: payment.payment_intent_id, isDelete: 0, status: status
                },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                console.log(response)
                if (response.status == 200) {
                    const updatedTransactions = transactions.map(item => {
                        if (item.payment_intent_id === payment.payment_intent_id) {
                            return { ...item, status: status };
                        }
                        return item;
                    });
                    setTransactions(updatedTransactions)
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

    const columns = [
        { id: "index", label: "#", sortable: false },
        { id: "payment_intent_id", label: "Transaction ID", sortable: true },
        { id: "title", label: "Title", sortable: true },
        { id: "first_name", label: "User Name", sortable: true },
        { id: "email", label: "Email", sortable: true },
        { id: "amount", label: "Amount", sortable: true },
        { id: "created_date", label: "Date", sortable: true },
        { id: "action", label: "Action", sortable: false },
    ];
   

    const getRowId = (row) => row.id;

    const renderRowCells = (payment, index) => {
        const date = new Date(payment.created_date);
        const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        return (
            <>
                <TableCell >{index + 1}</TableCell>
                <TableCell >{payment.payment_intent_id}</TableCell>
                <TableCell >{payment.title}</TableCell>
                <TableCell >{payment.first_name}</TableCell>
                <TableCell >{payment.email}</TableCell>
                <TableCell >{payment.amount}</TableCell>
                <TableCell >{formattedDate}</TableCell>
                <TableCell>
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

                </TableCell>
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
                        {transactions.length > 0 ? (
                            <div className="table-responsive mt-1" style={{ paddingTop: "20px" }}>
                                <CommonTable
                                    columns={columns}
                                    getRowId={getRowId}
                                    renderRowCells={renderRowCells}
                                    fetchData={getPayments}
                                    // initialData={transactions}
                                // searchQuery={searchQuery}
                                //  tableData={filteredData.length > 0 ? filteredData : transactions}
                                />
                            </div>
                        ) : (
                            <h4 className="no-content text-center">
                                Not any Refund Requests found! 🌟
                            </h4>
                        )}

                    </div>
                </div>
            </main>
            <FooterNine />
        </div>
    )
}

export default RefundRequestsList
