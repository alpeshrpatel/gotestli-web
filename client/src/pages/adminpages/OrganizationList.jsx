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
import emailTemplates from '../../../../email_templates/emailtemplates'
import { renderTemplate } from '@/utils/renderTemplate'


const APP_ID = 1;
const API_TOKEN = '7b9e6c5f-8a1d-4d3e-b5f2-c9a8e7d6b5c4';

// const pageMetadata = {
//   title: "Organizations Management - GoTestli Admin Panel | Manage Partner Institutions & Schools",
//   description: "Admin dashboard for managing onboarded organizations on GoTestli platform. View, monitor, and administer educational institutions, schools, and partner organizations using our comprehensive quiz platform.",
//   keywords: "gotestli organizations admin, platform administration, manage institutions, school administration, educational organizations management, partner institutions, admin panel organizations, platform governance, institutional management, organization dashboard, admin control panel, educational partners management",
//   canonical: "https://gotestli.com/admin/organizations",
//   category: "Admin Management",
//   subject: "Organizations Administration, Institutional Management, Platform Governance, Admin Control",
//   audience: "Platform Administrators, System Admins, GoTestli Management Team, Support Staff"
// };
const pageMetadata = {
  title: "Organizations Management | Best Quiz App for Learning & Trivia Admin Panel – GoTestli",
  description:
    "Access the admin dashboard of GoTestli, the best quiz app for learning and trivia, to manage educational institutions, schools, and partner organizations. Monitor and administer your organization’s quizzes and learning analytics seamlessly.",
  keywords:
    "best quiz app for learning, best quiz maker app, quiz app for trivia, GoTestli organizations admin, platform administration, manage institutions, school management, educational organizations, partner institutions management, admin panel organizations, institutional dashboard, platform governance, admin control panel, educational partners",
  canonical: "https://gotestli.com/admin/organizations",
  category: "Admin Management, Platform Governance, Institutional Administration",
  subject: "Organizations Management, Admin Dashboard, Educational Institutions, Platform Administration",
  audience: "Platform Administrators, System Admins, GoTestli Management, Educational Organization Managers, Support Staff"
};


const OrganizationList = () => {
    const location = useLocation()
    // const { organizationList } = location.state
    const user = JSON.parse(localStorage.getItem("user")) || "";
    const userId = user.id;
    const userRole = user.role;
    const [organizationList, setOrganizationList] = useState([])

    const headers = {
        "X-API-Token": API_TOKEN,
        "app-id": APP_ID
      };

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
                // const response = await API.post('/api/sendemail/org/onboarding/approval', { orgName: org.org_name, email: org.email, password: password, subdomain: org.subdomain })
                const adminOrgAccessEmail = emailTemplates.adminOrgAccessEmail;
                const dynamicData = {
                  org_name: org.org_name,
                  email: org.email,
                  password: password,
                  subdomain: org.subdomain,
                }
                const renderedContent = {
                  subject: renderTemplate(adminOrgAccessEmail.subject, dynamicData),
                  body_text: renderTemplate(adminOrgAccessEmail.body_text, dynamicData),
                  body_html: renderTemplate(adminOrgAccessEmail.body_html, dynamicData),
                };
                 const res = await API.post(
                              `https://api.communication.gotestli.com/api/send/email`,
                              {
                                app_id: APP_ID,
                                sender: "gotestli07@gmail.com",
                                sender_name: "Gotestli",
                                recipients: [
                                  {
                                    email: org.email,
                                    name: '',
                                  }
                                ],
//                                 content: {
//                                     subject: `🎉 Welcome Aboard GoTestli! Your Organization is Now Approved ✅`,
//                                     body_text: `
//                                 Dear Partner,
//                                 Fantastic news! 🚀 Your organization ${org.org_name} has been officially approved for onboarding to the GoTestli platform. We're thrilled to welcome you to our community of innovative educators and learners!
//                                 Your dedicated admin portal is now active and ready for you to explore. Here are your credentials to get started:
//                                 🔐 ADMIN LOGIN DETAILS:
//                                 URL: https://${org.subdomain}.gotestli.com
//                                 Username: ${org.email}
//                                 Temporary Password: ${password} (Please change upon first login)
//                                 With GoTestli, you now have access to:
                                
//                                 📊 Comprehensive assessment creation tools
//                                 📈 Real-time analytics and performance tracking
//                                 🔄 Seamless content integration capabilities
//                                 👥 User management and permission controls
//                                 🎓 Extensive quiz and learning resources library
                                
//                                 We've scheduled a personalized onboarding session for your team on Wednesday, March 12th at 10:00 AM EST. Our implementation specialist will guide you through platform setup and answer any questions you may have.
//                                 In the meantime, feel free to explore our Getting Started Guide (https://help.gotestli.com/getting-started) and Resource Center (https://help.gotestli.com/resources).
//                                 We're excited to see the engaging learning experiences you'll create with GoTestli!
//                                 Welcome aboard,
//                                 The GoTestli Team
//                                 Need assistance? Contact our support team at support@gotestli.com or call (800) 555-TEST.
//                                 Wishing you success,
// The GoTestLI Team

// ---------------------
// GoTestli
// Test Your Limits, Expand Your Knowledge
// https://gotestli.com
//                                   `,
//                                     body_html: `
//                                 <p>Dear Partner,</p>
//                                 <p>Fantastic news! 🚀 Your organization <b>${org.org_name}</b> has been <b>officially approved</b> for onboarding to the GoTestli platform. We're thrilled to welcome you to our community of innovative educators and learners!</p>
//                                 <p>Your dedicated admin portal is now <b>active and ready</b> for you to explore. Here are your credentials to get started:</p>
//                                 <div style="background-color: #f8f9fa; border-left: 4px solid #4CAF50; padding: 15px; margin: 20px 0;">
//                                   <p><b>🔐 Admin Login Details:</b></p>
//                                   <p>URL: <a href="https://${org.subdomain}.gotestli.com">https://${org.subdomain}.gotestli.com</a><br>
//                                   Username: <b>${org.email}</b><br>
//                                   Temporary Password: <b>${password}</b> (Please change upon first login)</p>
//                                 </div>
//                                 <p>With GoTestli, you now have access to:</p>
//                                 <ul>
//                                   <li>📊 Comprehensive assessment creation tools</li>
//                                   <li>📈 Real-time analytics and performance tracking</li>
//                                   <li>🔄 Seamless content integration capabilities</li>
//                                   <li>👥 User management and permission controls</li>
//                                   <li>🎓 Extensive quiz and learning resources library</li>
//                                 </ul>
                                
//                                 <p>We're excited to see the engaging learning experiences you'll create with GoTestli!</p>
//                                 <p>Welcome aboard,<br>
//                                 <b>The GoTestli Team</b></p>
//                                 <p style="font-size: 12px; color: #666;">
//                                 Need assistance? Contact our support team at <a href="mailto:gotestli07@gmail.com">gotestli07@gmail.com</a> or call (800) 555-TEST.
//                                 </p>
//                                  <p>Wishing you success,<br/>  
// <p>GoTestli Team</p>
// <hr style="margin: 30px 0;" />

// <div style="font-size: 13px; color: #888; text-align: center;">
//   <img src="https://gotestli.com/assets/img/header-logo3.png" alt="GoTestLI Logo" width="120" style="margin-bottom: 10px;" />
//   <p><b>GoTestli</b><br/>
//   Test Your Limits, Expand Your Knowledge<br/>
//   <a href="https://gotestli.com" style="color: #ff6600; text-decoration: none;">www.gotestli.com</a></p>
//   <p style="margin-top: 10px; font-size: 12px;">
   
//     <a href="mailto:gotestli07@gmail.com" style="color: #666; text-decoration: none; margin: 0 5px;">✉️ gotestli07@gmail.com</a>
//   </p>
  
// </div>
//                                   `,
//                                 },
                                content: renderedContent,
                              },
                              {
                               headers
                              }
                            )

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
