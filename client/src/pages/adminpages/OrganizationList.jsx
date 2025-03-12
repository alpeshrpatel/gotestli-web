import CommonTable from '@/components/common/CommonTable'
import MetaComponent from '@/components/common/MetaComponent'
import Preloader from '@/components/common/Preloader'
import FooterNine from '@/components/layout/footers/FooterNine'
import Header from '@/components/layout/headers/Header'
import { auth, db } from '@/firebase/Firebase'
import { API } from '@/utils/AxiosInstance'
import { generateStrongTempPassword } from '@/utils/TemporaryPasswordGenerator'
import { showToast } from '@/utils/toastService'
import { CheckCircle } from '@mui/icons-material'
import { Button, TableCell } from '@mui/material'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const OrganizationList = () => {
    const location = useLocation()
    // const { organizationList } = location.state
    const user = JSON.parse(localStorage.getItem("user")) || "";
    const userId = user.id;
    const userRole = user.role;
    const [organizationList, setOrganizationList] = useState([])

    useEffect(() => {
        async function getAllOrg() {
            try {
                const organizationResponse = await API.get(
                    `/api/org/getall/organizations`,
                );
                setOrganizationList(organizationResponse?.data)
            } catch (error) {
                showToast('error', error.message)
            }
        }
        getAllOrg()
    }, [])

    const handleApprove = async (org, approval) => {
        console.log("Approved organization:", org.id);
        try {

            if (approval) {
                const password = generateStrongTempPassword()
                const response = await API.post('/api/sendemail/org/onboarding/approval', { orgName: org.org_name, email: org.email, password: password, subdomain: org.subdomain })
                const data = await createUserWithEmailAndPassword(
                    auth,
                    org.email,
                    password
                );
                try {
                    const res = await API.post("/api/users", {
                        username: auth.currentUser.email,
                        email: auth.currentUser.email,
                        created_on: auth.currentUser.metadata?.createdAt,
                        last_login: auth.currentUser.metadata?.lastLoginAt,
                        first_name: org.org_name,
                        last_name: 'admin',
                        uid: auth.currentUser.uid,
                        role: 'admin',
                        provider: "manual",
                        profile_pic: org.org_logo,
                        org_id:org.id,
                        company:org.subdomain,
                    });
                    // console.log(res);
                } catch (error) {
                    showToast('error',error.message)
                }
                try {
                    const docRef = await setDoc(doc(db, "roles", auth.currentUser.uid), {
                        uid: auth.currentUser.uid,
                        role: 'admin',
                        email: org.email,
                    });

                     console.log("Document written ");
                } catch (e) {
                    console.error("Error adding document: ", e);
                }
            }

            const { data } = await API.put(`/api/org/approval/status`, { orgId: org.id, approval: approval });
            console.log(data)
            if (data) {
                const updatedOrganizationList = organizationList.map(item => {
                    if (item.id === org.id) {
                        return { ...item, status: approval };
                    }
                    return item;
                });

                setOrganizationList(updatedOrganizationList);
                showToast("success", approval === 1 ? "Organization onboarded!" : "Organization rejected!");
            } else {
                showToast("error", "Error in Onboarding Process!");
            }

        } catch (error) {
            showToast("error", error.message);
        }
    };

    const columns = [
        { id: "index", label: "#", sortable: false },
        { id: "org_logo", label: "Logo", sortable: false },
        { id: "org_name", label: "Org Name", sortable: true },
        { id: "email", label: "Email", sortable: true },
        { id: "phone_no", label: "Phone", sortable: true },
        { id: "created_date", label: "Date", sortable: true },
        { id: "actions", label: "", sortable: false },
    ];
    console.log(organizationList)

    const getRowId = (row) => row.id;

    const renderRowCells = (org, index) => (
        <>
            <TableCell>{index + 1}</TableCell>
            <TableCell><img src={org.org_logo} alt={org.org_name} height={'200px'} width={'150px'}/></TableCell>
            <TableCell>{org.org_name}</TableCell>
            <TableCell>{org.email}</TableCell>
            <TableCell>{org.phone_no}</TableCell>
            <TableCell>{org.created_date}</TableCell>
            <TableCell>
                {
                    org.status == 2 ? (
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => handleApprove(org, 1)}
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
                                onClick={() => handleApprove(org, 0)}
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
                        org.status == 1 && (
                            <div style={{ display: 'flex', alignItems: 'center', color: '#4CAF50' }}>
                                <CheckCircle style={{ marginRight: '5px' }} />
                                <span>Onboarded</span>
                            </div>
                        )
                    )
                }

            </TableCell>
        </>
    );
    return (
        <div className="barba-container" data-barba="container">
            {/* <MetaComponent meta={metadata} /> */}
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
                        {organizationList.length > 0 ? (
                            <div className="table-responsive mt-1" style={{ paddingTop: "20px" }}>
                                <CommonTable
                                    columns={columns}
                                    data={organizationList}
                                    getRowId={getRowId}
                                    renderRowCells={renderRowCells}
                                    // fetchData={getComments}
                                    initialData={organizationList}
                                // tableData={comments}
                                />
                            </div>
                        ) : (
                            <h4 className="no-content text-center">
                                Not any Organizations found! 🌟
                            </h4>
                        )}

                    </div>
                </div>
            </main>
            <FooterNine />
        </div>
    )
}

export default OrganizationList
