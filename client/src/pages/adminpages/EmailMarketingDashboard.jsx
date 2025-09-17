import { API } from '@/utils/AxiosInstance';
import React, { useState, useRef } from 'react';

// const EmailMarketingDashboard = () => {
//     const [emailList, setEmailList] = useState([]);
//     const [subject, setSubject] = useState('');
//     const [emailBody, setEmailBody] = useState('');
//     const [senderEmail, setSenderEmail] = useState('');
//     const [senderName, setSenderName] = useState('');
//     const [isSending, setIsSending] = useState(false);
//     const [sendingProgress, setSendingProgress] = useState(0);
//     const [logs, setLogs] = useState([]);
//     const [activeTab, setActiveTab] = useState('compose');
//     const fileInputRef = useRef(null);

//     const APP_ID = 1;
//     const API_TOKEN = '7b9e6c5f-8a1d-4d3e-b5f2-c9a8e7d6b5c4';
//     const ADMIN_EMAIL = 'gotestli07@gmail.com'

//     const headers = {
//         "X-API-Token": API_TOKEN,
//         "app-id": APP_ID
//     };

//     // AWS SES Configuration (you'll need to replace with your actual config)
//     // const [awsConfig, setAwsConfig] = useState({
//     //     region: 'us-east-1',
//     //     accessKeyId: '',
//     //     secretAccessKey: ''
//     // });

//     const addLog = (message, type = 'info') => {
//         const timestamp = new Date().toLocaleTimeString();
//         setLogs(prev => [...prev, { message, type, timestamp }]);
//     };

//     const handleEmailInput = (value) => {
//         const emails = value.split(/[,\n\s]+/)
//             .map(email => email.trim())
//             .filter(email => email && validateEmail(email));
//         setEmailList([...new Set(emails)]); // Remove duplicates
//     };

//     const validateEmail = (email) => {
//         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//     };

//     const handleFileUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = (e) => {
//                 const content = e.target.result;
//                 const emails = content.split(/[,\n\r]+/)
//                     .map(email => email.trim())
//                     .filter(email => email && validateEmail(email));
//                 setEmailList(prev => [...new Set([...prev, ...emails])]);
//                 addLog(`Imported ${emails.length} valid emails from ${file.name}`, 'success');
//             };
//             reader.readAsText(file);
//         }
//     };

//     const removeEmail = (index) => {
//         setEmailList(prev => prev.filter((_, i) => i !== index));
//     };

//     const sendBulkEmails = async () => {
//         if (!subject || !emailBody || emailList.length === 0) {
//             addLog('Please fill all required fields and add recipient emails', 'error');
//             return;
//         }

//         // if (!awsConfig.accessKeyId || !awsConfig.secretAccessKey) {
//         //     addLog('Please configure AWS SES credentials', 'error');
//         //     return;
//         // }

//         setIsSending(true);
//         setSendingProgress(0);
//         addLog(`Starting bulk email send to ${emailList.length} recipients`, 'info');

//         try {
//             // Note: In a real application, you would make API calls to your backend
//             // which would then use AWS SES SDK to send emails
//             for (let i = 0; i < emailList.length; i++) {
//                 const email = emailList[i];

//                 // Simulate API call delay
//                 await new Promise(resolve => setTimeout(resolve, 500));

//                 try {
//                     // This is where you would make an actual API call to your backend
//                     // Example: await sendEmailAPI(email, subject, emailBody, senderEmail, senderName);
//                     const renderedContent = {
//                         subject: subject,
//                         body_text: emailBody,
//                         body_html: emailBody.replace(/\n/g, '<br/>'),
//                     };
//                     const resp = await API.post("https://api.communication.gotestli.com/api/send/email",
//                         {
//                             app_id: APP_ID,
//                             sender: ADMIN_EMAIL,
//                             sender_name: "Gotestli",
//                             recipients: [
//                                 {
//                                     email: email,
//                                     name: email.split('@')[0],
//                                 }
//                             ],
//                             //           content: {
//                             //             subject: `New Contact Message from ${formData.name}`,
//                             //             body_text: `
//                             //       Hi Admin,

//                             //       You've received a new message from the Contact Us page on your website.

//                             //       Details:
//                             //       - Name: ${formData.name}
//                             //       - Email: ${formData.email}
//                             //       - Subject: ${subject}

//                             //       Message:
//                             //       ${formData.message}

//                             //       Please respond to the user at your earliest convenience.

//                             //       Wishing you success,
//                             // The GoTestLI Team

//                             // ---------------------
//                             // GoTestli
//                             // Test Your Limits, Expand Your Knowledge
//                             // https://gotestli.com
//                             //       `,
//                             //             body_html: `
//                             //       <p>Hi <b>Admin</b>,</p>

//                             //       <p>You've received a new message from the <b>Contact Us</b> page on your website.</p>

//                             //       <p><b>Details:</b></p>
//                             //       <ul>
//                             //       <li><b>Name:</b> ${formData.name}</li>
//                             //       <li><b>Email:</b> ${formData.email}</li>
//                             //       <li><b>Subject:</b> ${subject}</li>
//                             //       </ul>

//                             //       <p><b>Message:</b></p>
//                             //       <blockquote style="border-left: 4px solid #4CAF50; padding-left: 10px; color: #333;">
//                             //       ${formData.message}
//                             //       </blockquote>

//                             //       <p>Please respond to the user at your earliest convenience.</p>

//                             //       <p>Wishing you success,<br/>  
//                             // <p>GoTestli Team</p>
//                             // <hr style="margin: 30px 0;" />

//                             // <div style="font-size: 13px; color: #888; text-align: center;">
//                             //   <img src="https://gotestli.com/assets/img/header-logo3.png" alt="GoTestLI Logo" width="120" style="margin-bottom: 10px;" />
//                             //   <p><b>GoTestli</b><br/>
//                             //   Test Your Limits, Expand Your Knowledge<br/>
//                             //   <a href="https://gotestli.com" style="color: #ff6600; text-decoration: none;">www.gotestli.com</a></p>
//                             //   <p style="margin-top: 10px; font-size: 12px;">

//                             //     <a href="mailto:gotestli07@gmail.com" style="color: #666; text-decoration: none; margin: 0 5px;">✉️ gotestli07@gmail.com</a>
//                             //   </p>

//                             // </div>
//                             //       `
//                             //           }
//                             content: renderedContent,

//                         },
//                         { headers }
//                     );

//                     addLog(`Email sent successfully to ${email}`, 'success');
//                     setSendingProgress(((i + 1) / emailList.length) * 100);
//                 } catch (error) {
//                     addLog(`Failed to send email to ${email}: ${error.message}`, 'error');
//                 }
//             }

//             addLog('Bulk email send completed', 'success');
//         } catch (error) {
//             addLog(`Bulk send failed: ${error.message}`, 'error');
//         } finally {
//             setIsSending(false);
//         }
//     };

//     const clearLogs = () => {
//         setLogs([]);
//     };

//     const customStyles = {
//         gradientBg: {
//             background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//             minHeight: '100vh',
//             marginTop: '110px'
//         },
//         cardShadow: {
//             boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
//             borderRadius: '15px',
//             border: 'none'
//         },
//         primaryBtn: {
//             background: 'linear-gradient(45deg, #667eea, #764ba2)',
//             border: 'none',
//             borderRadius: '25px',
//             padding: '12px 30px',
//             fontWeight: 'bold',
//             transition: 'all 0.3s ease',
//             boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
//         },
//         progressBar: {
//             height: '20px',
//             borderRadius: '10px',
//             overflow: 'hidden',
//             background: 'rgba(255,255,255,0.2)'
//         },
//         logContainer: {
//             maxHeight: '300px',
//             overflowY: 'auto',
//             background: 'rgba(0,0,0,0.05)',
//             borderRadius: '10px',
//             padding: '15px'
//         }
//     };

//     return (
//         <div style={customStyles.gradientBg} className="py-5" >
//             <div className="container-fluid">
//                 {/* Header */}
//                 <div className="row mb-4">
//                     <div className="col-12 text-center">
//                         <h1 className="display-4 text-white fw-semibold mb-3">
//                             📚 Education Email Marketing
//                         </h1>
//                         <p className="lead text-white-50">
//                             Powerful bulk email marketing for your education platform
//                         </p>
//                     </div>
//                 </div>

//                 {/* Main Dashboard */}
//                 <div className="row">
//                     <div className="col-12">
//                         <div className="card" style={customStyles.cardShadow}>
//                             <div className="card-body p-4">

//                                 {/* Navigation Tabs */}
//                                 <ul className="nav nav-pills mb-4" role="tablist">
//                                     <li className="nav-item">
//                                         <button
//                                             className={`nav-link ${activeTab === 'compose' ? 'active' : ''}`}
//                                             onClick={() => setActiveTab('compose')}
//                                             style={activeTab === 'compose' ? customStyles.primaryBtn : {}}
//                                         >
//                                             📝 Compose Email
//                                         </button>
//                                     </li>
//                                     <li className="nav-item ms-2">
//                                         <button
//                                             className={`nav-link ${activeTab === 'recipients' ? 'active' : ''}`}
//                                             onClick={() => setActiveTab('recipients')}
//                                             style={activeTab === 'recipients' ? customStyles.primaryBtn : {}}
//                                         >
//                                             👥 Recipients ({emailList.length})
//                                         </button>
//                                     </li>
//                                     {/* <li className="nav-item ms-2">
//                                         <button
//                                             className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`}
//                                             onClick={() => setActiveTab('settings')}
//                                             style={activeTab === 'settings' ? customStyles.primaryBtn : {}}
//                                         >
//                                             ⚙️ AWS Settings
//                                         </button>
//                                     </li> */}
//                                 </ul>

//                                 {/* Compose Email Tab */}
//                                 {activeTab === 'compose' && (
//                                     <div className="row">
//                                         <div className="col-md-8">
//                                             <div className="mb-3">
//                                                 <label className="form-label fw-bold">From Name</label>
//                                                 <input
//                                                     type="text"
//                                                     className="form-control"
//                                                     value={senderName}
//                                                     onChange={(e) => setSenderName(e.target.value)}
//                                                     placeholder="Gotestli"
//                                                     style={{ borderRadius: '10px' }}
//                                                 />
//                                             </div>

//                                             <div className="mb-3">
//                                                 <label className="form-label fw-bold">From Email *</label>
//                                                 <input
//                                                     type="email"
//                                                     readOnly
//                                                     className="form-control"
//                                                     value={'gotestli07@gmail.com'}
//                                                     // onChange={(e) => setSenderEmail(e.target.value)}
//                                                     // placeholder="noreply@yourdomain.com"
//                                                     style={{ borderRadius: '10px' }}
//                                                 />
//                                             </div>

//                                             <div className="mb-3">
//                                                 <label className="form-label fw-bold">Subject *</label>
//                                                 <input
//                                                     type="text"
//                                                     className="form-control"
//                                                     value={subject}
//                                                     onChange={(e) => setSubject(e.target.value)}
//                                                     placeholder="🧠 Test Your Knowledge, Track Your Progress"
//                                                     style={{ borderRadius: '10px' }}
//                                                 />
//                                             </div>

//                                             <div className="mb-4">
//                                                 <label className="form-label fw-bold">Email Content *</label>
//                                                 <textarea
//                                                     className="form-control"
//                                                     rows="12"
//                                                     value={emailBody}
//                                                     onChange={(e) => setEmailBody(e.target.value)}
//                                                     placeholder="Ready to turn studying into an engaging experience?
// GoTestLi is the ultimate quiz marketplace where learning meets fun. Take quizzes created by expert instructors and watch your knowledge grow.

// Happy Learning,
// The GoTestLi Team"
//                                                     style={{ borderRadius: '10px', resize: 'vertical' }}
//                                                 />
//                                             </div>

//                                             <div className="d-flex gap-3">
//                                                 <button
//                                                     className="btn btn-success btn-lg"
//                                                     onClick={sendBulkEmails}
//                                                     disabled={isSending || emailList.length === 0}
//                                                     style={customStyles.primaryBtn}
//                                                 >
//                                                     {isSending ? (
//                                                         <>
//                                                             <span className="spinner-border spinner-border-sm me-2"></span>
//                                                             Sending... ({Math.round(sendingProgress)}%)
//                                                         </>
//                                                     ) : (
//                                                         <>🚀 Send to {emailList.length} Recipients</>
//                                                     )}
//                                                 </button>

//                                                 <button
//                                                     className="btn btn-outline-secondary"
//                                                     onClick={() => {
//                                                         setSubject('');
//                                                         setEmailBody('');
//                                                         setSenderEmail('');
//                                                         setSenderName('');
//                                                     }}
//                                                 >
//                                                     Clear Form
//                                                 </button>
//                                             </div>
//                                         </div>

//                                         {/* Preview Panel */}
//                                         <div className="col-md-4">
//                                             <div className="card h-100" style={{ background: 'rgba(102, 126, 234, 0.1)' }}>
//                                                 <div className="card-header">
//                                                     <h6 className="mb-0">📧 Email Preview</h6>
//                                                 </div>
//                                                 <div className="card-body">
//                                                     <div className="mb-2">
//                                                         <small className="text-muted">From:</small><br />
//                                                         <strong>{senderName || 'Your Name'} &lt;{senderEmail || 'your@email.com'}&gt;</strong>
//                                                     </div>
//                                                     <div className="mb-2">
//                                                         <small className="text-muted">Subject:</small><br />
//                                                         <strong>{subject || 'Your subject line'}</strong>
//                                                     </div>
//                                                     <hr />
//                                                     <div style={{ fontSize: '0.9em', lineHeight: '1.4' }}>
//                                                         {emailBody ? (
//                                                             <div style={{ whiteSpace: 'pre-wrap' }}>{emailBody}</div>
//                                                         ) : (
//                                                             <em className="text-muted">Email content will appear here...</em>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}

//                                 {/* Recipients Tab */}
//                                 {activeTab === 'recipients' && (
//                                     <div>
//                                         <div className="row mb-4">
//                                             <div className="col-md-6">
//                                                 <label className="form-label fw-bold">Add Email Addresses</label>
//                                                 <textarea
//                                                     className="form-control"
//                                                     rows="4"
//                                                     placeholder="Enter emails separated by commas or new lines:
// student1@example.com, student2@example.com
// teacher@example.com"
//                                                     onChange={(e) => handleEmailInput(e.target.value)}
//                                                     style={{ borderRadius: '10px' }}
//                                                 />
//                                                 <small className="text-muted">Separate emails with commas, spaces, or new lines</small>
//                                             </div>

//                                             <div className="col-md-6">
//                                                 <label className="form-label fw-bold">Or Upload CSV File</label>
//                                                 <div className="d-flex gap-2">
//                                                     <input
//                                                         type="file"
//                                                         ref={fileInputRef}
//                                                         onChange={handleFileUpload}
//                                                         accept=".csv,.txt"
//                                                         className="form-control"
//                                                         style={{ borderRadius: '10px' }}
//                                                     />
//                                                     <button
//                                                         className="btn btn-outline-primary"
//                                                         onClick={() => fileInputRef.current?.click()}
//                                                         style={{ borderRadius: '10px' }}
//                                                     >
//                                                         Browse
//                                                     </button>
//                                                 </div>
//                                                 <small className="text-muted">Upload a CSV or TXT file with email addresses</small>
//                                             </div>
//                                         </div>

//                                         {/* Email List Display */}
//                                         <div className="mb-4">
//                                             <div className="d-flex justify-content-between align-items-center mb-3">
//                                                 <h5 className="mb-0">📋 Email List ({emailList.length})</h5>
//                                                 {emailList.length > 0 && (
//                                                     <button
//                                                         className="btn btn-outline-danger btn-sm"
//                                                         onClick={() => setEmailList([])}
//                                                     >
//                                                         Clear All
//                                                     </button>
//                                                 )}
//                                             </div>

//                                             {emailList.length > 0 ? (
//                                                 <div style={{ ...customStyles.logContainer, maxHeight: '400px' }}>
//                                                     <div className="row">
//                                                         {emailList.map((email, index) => (
//                                                             <div key={index} className="col-md-6 col-lg-4 mb-2">
//                                                                 <div className="d-flex align-items-center justify-content-between bg-light p-2 rounded">
//                                                                     <span className="text-truncate" style={{ fontSize: '0.9em' }}>
//                                                                         {email}
//                                                                     </span>
//                                                                     <button
//                                                                         className="btn btn-sm btn-outline-danger ms-2"
//                                                                         onClick={() => removeEmail(index)}
//                                                                         style={{ fontSize: '0.7em' }}
//                                                                     >
//                                                                         ✕
//                                                                     </button>
//                                                                 </div>
//                                                             </div>
//                                                         ))}
//                                                     </div>
//                                                 </div>
//                                             ) : (
//                                                 <div className="text-center py-5 text-muted">
//                                                     <h4>📭 No email addresses added yet</h4>
//                                                     <p>Add email addresses above to get started</p>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 )}




//                                 {/* Progress Bar (shown during sending) */}
//                                 {isSending && (
//                                     <div className="mb-4">
//                                         <div className="d-flex justify-content-between mb-2">
//                                             <span className="fw-bold">Sending Progress</span>
//                                             <span>{Math.round(sendingProgress)}%</span>
//                                         </div>
//                                         <div style={customStyles.progressBar}>
//                                             <div
//                                                 className="progress-bar bg-success"
//                                                 style={{ width: `${sendingProgress}%`, transition: 'width 0.3s ease' }}
//                                             ></div>
//                                         </div>
//                                     </div>
//                                 )}

//                                 {/* Logs Section */}
//                                 {logs.length > 0 && (
//                                     <div className="mt-4">
//                                         <div className="d-flex justify-content-between align-items-center mb-3">
//                                             <h5 className="mb-0">📊 Activity Logs</h5>
//                                             <button
//                                                 className="btn btn-outline-secondary btn-sm"
//                                                 onClick={clearLogs}
//                                             >
//                                                 Clear Logs
//                                             </button>
//                                         </div>

//                                         <div style={customStyles.logContainer}>
//                                             {logs.map((log, index) => (
//                                                 <div
//                                                     key={index}
//                                                     className={`mb-2 p-2 rounded ${log.type === 'success' ? 'bg-success text-white' :
//                                                         log.type === 'error' ? 'bg-danger text-white' :
//                                                             'bg-info text-white'
//                                                         }`}
//                                                     style={{ fontSize: '0.9em' }}
//                                                 >
//                                                     <span className="badge bg-dark me-2">{log.timestamp}</span>
//                                                     {log.message}
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 )}

//                                 {/* Quick Actions Footer */}
//                                 <div className="mt-4 p-3 bg-light rounded">
//                                     <div className="row text-center">
//                                         <div className="col-md-3">
//                                             <div className="h4 text-primary mb-1">{emailList.length}</div>
//                                             <small className="text-muted">Recipients</small>
//                                         </div>
//                                         <div className="col-md-3">
//                                             <div className="h4 text-success mb-1">{logs.filter(l => l.type === 'success').length}</div>
//                                             <small className="text-muted">Sent</small>
//                                         </div>
//                                         <div className="col-md-3">
//                                             <div className="h4 text-danger mb-1">{logs.filter(l => l.type === 'error').length}</div>
//                                             <small className="text-muted">Failed</small>
//                                         </div>
//                                         <div className="col-md-3">
//                                             <div className="h4 text-info mb-1">{Math.round(sendingProgress)}%</div>
//                                             <small className="text-muted">Progress</small>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Bootstrap CSS CDN */}
//             <link
//                 href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css"
//                 rel="stylesheet"
//             />
//         </div>
//     );
// };

// export default EmailMarketingDashboard;

const EmailMarketingDashboard = () => {
    const [emailList, setEmailList] = useState([]);
    const [subject, setSubject] = useState('');
    const [emailBody, setEmailBody] = useState('');
    const [emailHtmlBody, setEmailHtmlBody] = useState('');
    const [senderEmail, setSenderEmail] = useState('');
    const [senderName, setSenderName] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [sendingProgress, setSendingProgress] = useState(0);
    const [logs, setLogs] = useState([]);
    const [activeTab, setActiveTab] = useState('compose');
    const fileInputRef = useRef(null);

    const APP_ID = 1;
    const API_TOKEN = '7b9e6c5f-8a1d-4d3e-b5f2-c9a8e7d6b5c4';
    const ADMIN_EMAIL = 'hello@gotestli.com'

    const headers = {
        "X-API-Token": API_TOKEN,
        "app-id": APP_ID
    };

    // AWS SES Configuration (you'll need to replace with your actual config)
    // const [awsConfig, setAwsConfig] = useState({
    //     region: 'us-east-1',
    //     accessKeyId: '',
    //     secretAccessKey: ''
    // });

    const addLog = (message, type = 'info') => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs(prev => [...prev, { message, type, timestamp }]);
    };

    const handleEmailInput = (value) => {
        const emails = value.split(/[,\n\s]+/)
            .map(email => email.trim())
            .filter(email => email && validateEmail(email));
        setEmailList([...new Set(emails)]); // Remove duplicates
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                const emails = content.split(/[,\n\r]+/)
                    .map(email => email.trim())
                    .filter(email => email && validateEmail(email));
                setEmailList(prev => [...new Set([...prev, ...emails])]);
                addLog(`Imported ${emails.length} valid emails from ${file.name}`, 'success');
            };
            reader.readAsText(file);
        }
    };

    const removeEmail = (index) => {
        setEmailList(prev => prev.filter((_, i) => i !== index));
    };

    const sendBulkEmails = async () => {
        if (!subject || !emailBody || emailList.length === 0) {
            addLog('Please fill all required fields and add recipient emails', 'error');
            return;
        }

        // if (!awsConfig.accessKeyId || !awsConfig.secretAccessKey) {
        //     addLog('Please configure AWS SES credentials', 'error');
        //     return;
        // }

        setIsSending(true);
        setSendingProgress(0);
        addLog(`Starting bulk email send to ${emailList.length} recipients`, 'info');

        try {
            // Note: In a real application, you would make API calls to your backend
            // which would then use AWS SES SDK to send emails
            for (let i = 0; i < emailList.length; i++) {
                const email = emailList[i];

                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 500));

                try {
                    // This is where you would make an actual API call to your backend
                    // Example: await sendEmailAPI(email, subject, emailBody, senderEmail, senderName);
                    const renderedContent = {
                        subject: subject,
                        body_text: emailBody,
                        body_html:emailHtmlBody || emailBody.replace(/\n/g, '<br/>'),
                    };
                    const resp = await API.post("https://api.communication.gotestli.com/api/send/email",
                        {
                            app_id: APP_ID,
                            sender: ADMIN_EMAIL,
                            sender_name: "Gotestli",
                            recipients: [
                                {
                                    email: email,
                                    name: email.split('@')[0],
                                }
                            ],
                            //           content: {
                            //             subject: `New Contact Message from ${formData.name}`,
                            //             body_text: `
                            //       Hi Admin,

                            //       You've received a new message from the Contact Us page on your website.

                            //       Details:
                            //       - Name: ${formData.name}
                            //       - Email: ${formData.email}
                            //       - Subject: ${subject}

                            //       Message:
                            //       ${formData.message}

                            //       Please respond to the user at your earliest convenience.

                            //       Wishing you success,
                            // The GoTestLI Team

                            // ---------------------
                            // GoTestli
                            // Test Your Limits, Expand Your Knowledge
                            // https://gotestli.com
                            //       `,
                            //             body_html: `
                            //       <p>Hi <b>Admin</b>,</p>

                            //       <p>You've received a new message from the <b>Contact Us</b> page on your website.</p>

                            //       <p><b>Details:</b></p>
                            //       <ul>
                            //       <li><b>Name:</b> ${formData.name}</li>
                            //       <li><b>Email:</b> ${formData.email}</li>
                            //       <li><b>Subject:</b> ${subject}</li>
                            //       </ul>

                            //       <p><b>Message:</b></p>
                            //       <blockquote style="border-left: 4px solid #4CAF50; padding-left: 10px; color: #333;">
                            //       ${formData.message}
                            //       </blockquote>

                            //       <p>Please respond to the user at your earliest convenience.</p>

                            //       <p>Wishing you success,<br/>  
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
                            //       `
                            //           }
                            content: renderedContent,

                        },
                        { headers }
                    );

                    addLog(`Email sent successfully to ${email}`, 'success');
                    setSendingProgress(((i + 1) / emailList.length) * 100);
                } catch (error) {
                    addLog(`Failed to send email to ${email}: ${error.message}`, 'error');
                }
            }

            addLog('Bulk email send completed', 'success');
        } catch (error) {
            addLog(`Bulk send failed: ${error.message}`, 'error');
        } finally {
            setIsSending(false);
        }
    };

    // const clearLogs = () => {
    //     setLogs([]);
    // };

     const clearLogs = () => {
        setLogs([]);
    };

    const clearForm = () => {
        setSubject('');
        setEmailBody('');
        setSenderName('');
        setSenderEmail('');
    };

    const clearAllEmails = () => {
        setEmailList([]);
        addLog('All email addresses cleared', 'info');
    };
    
    const customStyles = {
        gradientBg: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            minHeight: '100vh',
            marginTop: '110px'
        },
        cardShadow: {
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            borderRadius: '15px',
            border: 'none'
        },
        primaryBtn: {
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            border: 'none',
            borderRadius: '25px',
            padding: '12px 30px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
        },
        progressBar: {
            height: '20px',
            borderRadius: '10px',
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.2)'
        },
        logContainer: {
            maxHeight: '300px',
            overflowY: 'auto',
            background: 'rgba(0,0,0,0.05)',
            borderRadius: '10px',
            padding: '15px'
        }
    };

    

 return (
        <>
            {/* Custom CSS */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                
                @keyframes pulse {
                    0%, 100% { opacity: 0.8; }
                    50% { opacity: 1; }
                }
                
                .float-animation {
                    animation: float 6s ease-in-out infinite;
                }
                
                .float-animation-reverse {
                    animation: float 8s ease-in-out infinite reverse;
                }
                
                .transition-all {
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }
                
                .form-control:focus {
                    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25) !important;
                    border-color: #667eea !important;
                }
                
                .btn:hover:not(:disabled) {
                    transform: translateY(-1px);
                }
                
                .card {
                    transition: all 0.3s ease;
                }
                
                .nav-link:hover:not(.active) {
                    background: rgba(102, 126, 234, 0.1) !important;
                    color: #667eea !important;
                }
                
                .progress-bar {
                    position: relative;
                    overflow: hidden;
                }
                
                .progress-bar::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    background: linear-gradient(
                        45deg,
                        rgba(255, 255, 255, 0.2) 25%,
                        transparent 25%,
                        transparent 50%,
                        rgba(255, 255, 255, 0.2) 50%,
                        rgba(255, 255, 255, 0.2) 75%,
                        transparent 75%,
                        transparent
                    );
                    background-size: 20px 20px;
                    animation: progress-bar-stripes 1s linear infinite;
                }
                
                @keyframes progress-bar-stripes {
                    0% { background-position: 0 0; }
                    100% { background-position: 20px 0; }
                }
                
                .spinner-border {
                    --bs-spinner-width: 1rem;
                    --bs-spinner-height: 1rem;
                    --bs-spinner-border-width: 0.15em;
                }
                
                .email-item {
                    transition: all 0.3s ease;
                    transform: scale(1);
                }
                
                .email-item:hover {
                    transform: scale(1.02);
                    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2) !important;
                }
                
                .log-item {
                    transition: all 0.3s ease;
                    transform: translateX(0);
                }
                
                .log-item:hover {
                    transform: translateX(5px);
                }
                
                @media (max-width: 768px) {
                    .display-4 {
                        font-size: 2rem !important;
                    }
                    
                    .container-fluid {
                        padding-left: 1rem !important;
                        padding-right: 1rem !important;
                    }
                    
                    .card-body {
                        padding: 1.5rem !important;
                    }
                    
                    .nav-pills .nav-item {
                        margin-bottom: 0.5rem;
                    }
                    
                    .btn-lg {
                        padding: 0.75rem 1.5rem !important;
                        font-size: 0.9rem !important;
                    }
                }
                
                @media (max-width: 576px) {
                    .stats-card {
                        margin-bottom: 1rem;
                    }
                    
                    .h2 {
                        font-size: 1.5rem !important;
                    }
                }
                
                /* Custom scrollbar */
                ::-webkit-scrollbar {
                    width: 6px;
                }
                
                ::-webkit-scrollbar-track {
                    background: rgba(0,0,0,0.1);
                    border-radius: 10px;
                }
                
                ::-webkit-scrollbar-thumb {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    border-radius: 10px;
                }
                
                ::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(135deg, #764ba2, #667eea);
                }
                
                /* Loading animation */
                .loading-dots::after {
                    content: '';
                    animation: loading-dots 1.5s steps(4, end) infinite;
                }
                
                @keyframes loading-dots {
                    0%, 20% { content: ''; }
                    40% { content: '.'; }
                    60% { content: '..'; }
                    80%, 100% { content: '...'; }
                }
            `}</style>

            <div 
                className="min-vh-100 position-relative overflow-hidden" 
                style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                    paddingTop: '2rem',
                    paddingBottom: '2rem'
                }}
            >
                {/* Animated background elements */}
                <div className="position-absolute w-100 h-100" style={{ zIndex: 0, opacity: 0.1 }}>
                    <div 
                        className="position-absolute rounded-circle float-animation"
                        style={{
                            width: '300px',
                            height: '300px',
                            background: 'rgba(255,255,255,0.1)',
                            top: '10%',
                            right: '10%'
                        }}
                    ></div>
                    <div 
                        className="position-absolute rounded-circle float-animation-reverse"
                        style={{
                            width: '200px',
                            height: '200px',
                            background: 'rgba(255,255,255,0.05)',
                            bottom: '20%',
                            left: '5%'
                        }}
                    ></div>
                    <div 
                        className="position-absolute rounded-circle float-animation"
                        style={{
                            width: '150px',
                            height: '150px',
                            background: 'rgba(255,255,255,0.08)',
                            top: '60%',
                            right: '60%'
                        }}
                    ></div>
                </div>

                <div className="container-fluid px-3 px-lg-5 position-relative" style={{ zIndex: 1 }}>
                    {/* Header */}
                    <div className="text-center mb-5">
                        <div 
                            className="d-inline-block p-3 rounded-circle mb-3" 
                            style={{
                                background: 'rgba(255,255,255,0.2)',
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            <div style={{ fontSize: '3rem' }}>📚</div>
                        </div>
                        <h1 
                            className="display-4 fw-bold text-white mb-3" 
                            style={{
                                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                                letterSpacing: '-1px'
                            }}
                        >
                            Education Email Marketing
                        </h1>
                        <p 
                            className="lead text-white opacity-75 mb-0" 
                            style={{ maxWidth: '600px', margin: '0 auto' }}
                        >
                            Powerful bulk email marketing platform designed for educational excellence
                        </p>
                    </div>

                    {/* Main Dashboard Card */}
                    <div className="row justify-content-center">
                        <div className="col-12 col-xl-11">
                            <div 
                                className="card border-0 shadow-lg" 
                                style={{
                                    borderRadius: '20px',
                                    background: 'rgba(255,255,255,0.98)',
                                    backdropFilter: 'blur(20px)',
                                    boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
                                }}
                            >
                                <div className="card-body p-4 p-lg-5">
                                    {/* Navigation Tabs */}
                                    <div className="mb-4">
                                        <ul 
                                            className="nav nav-pills justify-content-center justify-content-md-start" 
                                            role="tablist" 
                                            style={{
                                                background: 'rgba(102, 126, 234, 0.1)',
                                                borderRadius: '15px',
                                                padding: '8px'
                                            }}
                                        >
                                            {[
                                                { id: 'compose', icon: '✏️', label: 'Compose Email' },
                                                { id: 'recipients', icon: '👥', label: `Recipients (${emailList.length})` }
                                            ].map(tab => (
                                                <li key={tab.id} className="nav-item flex-fill">
                                                    <button
                                                        className={`nav-link w-100 fw-semibold border-0 transition-all ${activeTab === tab.id ? 'active' : ''}`}
                                                        onClick={() => setActiveTab(tab.id)}
                                                        style={{
                                                            borderRadius: '10px',
                                                            padding: '12px 20px',
                                                            background: activeTab === tab.id ? 
                                                                'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
                                                            color: activeTab === tab.id ? 'white' : '#6c757d',
                                                            transform: activeTab === tab.id ? 'translateY(-2px)' : 'none',
                                                            boxShadow: activeTab === tab.id ? 
                                                                '0 8px 25px rgba(102, 126, 234, 0.3)' : 'none',
                                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                                        }}
                                                    >
                                                        <span className="me-2">{tab.icon}</span>
                                                        <span className="d-none d-sm-inline">{tab.label}</span>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Compose Email Tab */}
                                    {activeTab === 'compose' && (
                                        <div className="row g-4">
                                            <div className="col-lg-8">
                                                <div className="row g-3">
                                                    <div className="col-md-6">
                                                        <label className="form-label fw-semibold text-dark mb-2">
                                                            <span className="me-2">👤</span>From Name
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg border-0 shadow-sm transition-all"
                                                            value={senderName}
                                                            onChange={(e) => setSenderName(e.target.value)}
                                                            placeholder="Gotestli"
                                                            style={{
                                                                borderRadius: '12px',
                                                                background: 'rgba(102, 126, 234, 0.05)',
                                                                border: '2px solid transparent'
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label className="form-label fw-semibold text-dark mb-2">
                                                            <span className="me-2">📧</span>From Email
                                                        </label>
                                                        <input
                                                            type="email"
                                                            readOnly
                                                            className="form-control form-control-lg border-0 shadow-sm"
                                                            value={ADMIN_EMAIL}
                                                            style={{
                                                                borderRadius: '12px',
                                                                background: 'rgba(108, 117, 125, 0.1)',
                                                                color: '#6c757d'
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="col-12">
                                                        <label className="form-label fw-semibold text-dark mb-2">
                                                            <span className="me-2">✨</span>Subject Line *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control-lg border-0 shadow-sm transition-all"
                                                            value={subject}
                                                            onChange={(e) => setSubject(e.target.value)}
                                                            placeholder="🧠 Test Your Knowledge, Track Your Progress"
                                                            style={{
                                                                borderRadius: '12px',
                                                                background: 'rgba(102, 126, 234, 0.05)',
                                                                border: '2px solid transparent'
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="col-12">
                                                        <label className="form-label fw-semibold text-dark mb-2">
                                                            <span className="me-2">💬</span>Email Content(HTML) *
                                                        </label>
                                                        <textarea
                                                            className="form-control border-0 shadow-sm transition-all"
                                                            rows="10"
                                                            value={emailHtmlBody}
                                                            onChange={(e) => setEmailHtmlBody(e.target.value)}
                                                            placeholder=""
                                                            style={{
                                                                borderRadius: '12px',
                                                                background: 'rgba(102, 126, 234, 0.05)',
                                                                border: '2px solid transparent',
                                                                resize: 'vertical',
                                                                minHeight: '200px'
                                                            }}
                                                        />
                                                    </div>
                                                

                                                    <div className="col-12">
                                                        <label className="form-label fw-semibold text-dark mb-2">
                                                            <span className="me-2">💬</span>Email Content *
                                                        </label>
                                                        <textarea
                                                            className="form-control border-0 shadow-sm transition-all"
                                                            rows="10"
                                                            value={emailBody}
                                                            onChange={(e) => setEmailBody(e.target.value)}
                                                            placeholder="Ready to turn studying into an engaging experience?

                                                                GoTestLi is the ultimate quiz marketplace where learning meets fun. Take quizzes created by expert instructors and watch your knowledge grow.

                                                                🌟 Key Features:
                                                                • Expert-created quizzes
                                                                • Progress tracking
                                                                • Interactive learning
                                                                • Community-driven content

                                                                Happy Learning,
                                                                The GoTestLi Team"
                                                            style={{
                                                                borderRadius: '12px',
                                                                background: 'rgba(102, 126, 234, 0.05)',
                                                                border: '2px solid transparent',
                                                                resize: 'vertical',
                                                                minHeight: '200px'
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-wrap gap-3 mt-4">
                                                    <button
                                                        className="btn btn-lg px-4 fw-semibold border-0 transition-all"
                                                        onClick={sendBulkEmails}
                                                        disabled={isSending || emailList.length === 0}
                                                        style={{
                                                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                                            color: 'white',
                                                            borderRadius: '50px',
                                                            boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)'
                                                        }}
                                                    >
                                                        {isSending ? (
                                                            <>
                                                                <div className="spinner-border spinner-border-sm me-2" role="status"></div>
                                                                <span className="loading-dots">Sending</span> ({Math.round(sendingProgress)}%)
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span className="me-2">🚀</span>
                                                                Send to {emailList.length} Recipients
                                                            </>
                                                        )}
                                                    </button>

                                                    <button
                                                        className="btn btn-outline-secondary btn-lg px-4 fw-semibold transition-all"
                                                        onClick={clearForm}
                                                        style={{
                                                            borderRadius: '50px',
                                                            borderWidth: '2px'
                                                        }}
                                                    >
                                                        <span className="me-2">🗑️</span>Clear Form
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Preview Panel */}
                                            <div className="col-lg-4">
                                                <div 
                                                    className="card h-100 border-0 shadow-sm" 
                                                    style={{
                                                        borderRadius: '15px',
                                                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))'
                                                    }}
                                                >
                                                    <div className="card-header border-0 bg-transparent">
                                                        <h6 className="mb-0 fw-semibold">
                                                            <span className="me-2">👁️</span>Email Preview
                                                        </h6>
                                                    </div>
                                                    <div className="card-body">
                                                        <div className="mb-3 p-3 rounded-3" style={{ background: 'rgba(255,255,255,0.7)' }}>
                                                            <small className="text-muted fw-medium">From:</small><br />
                                                            <div className="fw-semibold text-dark">
                                                                {senderName || 'Your Name'} &lt;{ADMIN_EMAIL}&gt;
                                                            </div>
                                                        </div>
                                                        <div className="mb-3 p-3 rounded-3" style={{ background: 'rgba(255,255,255,0.7)' }}>
                                                            <small className="text-muted fw-medium">Subject:</small><br />
                                                            <div className="fw-semibold text-dark">{subject || 'Your subject line'}</div>
                                                        </div>
                                                        <div 
                                                            className="p-3 rounded-3" 
                                                            style={{ 
                                                                background: 'rgba(255,255,255,0.7)',
                                                                minHeight: '200px'
                                                            }}
                                                        >
                                                            <small className="text-muted fw-medium">Content:</small><br />
                                                            <div className="mt-2" style={{ 
                                                                fontSize: '0.9em', 
                                                                lineHeight: '1.6',
                                                                color: '#495057'
                                                            }}>
                                                                {
                                                                    emailHtmlBody ? (
                                                                        <div dangerouslySetInnerHTML={{ __html: emailHtmlBody }} />
                                                                    ) :
                                                                emailBody ? (
                                                                    <div style={{ whiteSpace: 'pre-wrap' }}>{emailBody}</div>
                                                                ) : (
                                                                    <em className="text-muted">Email content will appear here...</em>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Recipients Tab */}
                                    {activeTab === 'recipients' && (
                                        <div>
                                            <div className="row g-4 mb-5">
                                                <div className="col-lg-6">
                                                    <div 
                                                        className="card border-0 h-100" 
                                                        style={{
                                                            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
                                                            borderRadius: '15px'
                                                        }}
                                                    >
                                                        <div className="card-body p-4">
                                                            <h5 className="card-title fw-semibold mb-3">
                                                                <span className="me-2">✍️</span>Add Email Addresses
                                                            </h5>
                                                            <textarea
                                                                className="form-control border-0 shadow-sm transition-all"
                                                                rows="6"
                                                                placeholder="Enter emails separated by commas or new lines:

student1@example.com, student2@example.com
teacher@example.com
admin@school.edu"
                                                                onChange={(e) => handleEmailInput(e.target.value)}
                                                                style={{
                                                                    borderRadius: '12px',
                                                                    background: 'rgba(255,255,255,0.8)',
                                                                    border: '2px solid transparent'
                                                                }}
                                                            />
                                                            <small className="text-muted mt-2 d-block">
                                                                <span className="me-2">💡</span>
                                                                Separate emails with commas, spaces, or new lines
                                                            </small>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-6">
                                                    <div 
                                                        className="card border-0 h-100" 
                                                        style={{
                                                            background: 'linear-gradient(135deg, rgba(240, 147, 251, 0.05), rgba(102, 126, 234, 0.05))',
                                                            borderRadius: '15px'
                                                        }}
                                                    >
                                                        <div className="card-body p-4">
                                                            <h5 className="card-title fw-semibold mb-3">
                                                                <span className="me-2">📁</span>Upload CSV File
                                                            </h5>
                                                            <div className="d-grid gap-3">
                                                                <input
                                                                    type="file"
                                                                    ref={fileInputRef}
                                                                    onChange={handleFileUpload}
                                                                    accept=".csv,.txt"
                                                                    className="form-control form-control-lg border-0 shadow-sm"
                                                                    style={{
                                                                        borderRadius: '12px',
                                                                        background: 'rgba(255,255,255,0.8)'
                                                                    }}
                                                                />
                                                                <button
                                                                    className="btn btn-outline-primary btn-lg fw-semibold transition-all"
                                                                    onClick={() => fileInputRef.current?.click()}
                                                                    style={{
                                                                        borderRadius: '12px',
                                                                        borderWidth: '2px'
                                                                    }}
                                                                >
                                                                    <span className="me-2">📂</span>Browse Files
                                                                </button>
                                                            </div>
                                                            <small className="text-muted mt-3 d-block">
                                                                <span className="me-2">📄</span>
                                                                Upload a CSV or TXT file with email addresses
                                                            </small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Email List Display */}
                                            <div 
                                                className="card border-0 shadow-sm" 
                                                style={{
                                                    borderRadius: '15px',
                                                    background: 'rgba(255,255,255,0.8)'
                                                }}
                                            >
                                                <div className="card-header border-0 bg-transparent d-flex justify-content-between align-items-center">
                                                    <h5 className="mb-0 fw-semibold">
                                                        <span className="me-2">📋</span>
                                                        Email List 
                                                        <span 
                                                            className="badge ms-2 px-3 py-2" 
                                                            style={{
                                                                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                                                borderRadius: '20px',
                                                                fontSize: '0.8em'
                                                            }}
                                                        >
                                                            {emailList.length}
                                                        </span>
                                                    </h5>
                                                    {emailList.length > 0 && (
                                                        <button
                                                            className="btn btn-outline-danger btn-sm fw-semibold transition-all"
                                                            onClick={clearAllEmails}
                                                            style={{
                                                                borderRadius: '20px',
                                                                borderWidth: '2px'
                                                            }}
                                                        >
                                                            <span className="me-1">🗑️</span>Clear All
                                                        </button>
                                                    )}
                                                </div>

                                                <div className="card-body">
                                                    {emailList.length > 0 ? (
                                                        <div className="row g-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                                                            {emailList.map((email, index) => (
                                                                <div key={index} className="col-md-6 col-xl-4">
                                                                    <div 
                                                                        className="email-item d-flex align-items-center justify-content-between p-3 rounded-3 shadow-sm" 
                                                                        style={{
                                                                            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                                                                            border: '1px solid rgba(102, 126, 234, 0.2)'
                                                                        }}
                                                                    >
                                                                        <span className="text-truncate fw-medium" style={{ 
                                                                            fontSize: '0.9em',
                                                                            color: '#495057'
                                                                        }}>
                                                                            <span className="me-2">📧</span>
                                                                            {email}
                                                                        </span>
                                                                        <button
                                                                            className="btn btn-sm btn-outline-danger ms-2 border-0 transition-all"
                                                                            onClick={() => removeEmail(index)}
                                                                            style={{
                                                                                width: '30px',
                                                                                height: '30px',
                                                                                borderRadius: '50%',
                                                                                display: 'flex',
                                                                                alignItems: 'center',
                                                                                justifyContent: 'center',
                                                                                fontSize: '0.8em'
                                                                            }}
                                                                            title="Remove email"
                                                                        >
                                                                            ×
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="text-center py-5">
                                                            <div className="mb-3" style={{ fontSize: '4rem', opacity: 0.3 }}>📭</div>
                                                            <h4 className="text-muted mb-2">No email addresses added yet</h4>
                                                            <p className="text-muted">Add email addresses above to get started with your campaign</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Progress Bar (shown during sending) */}
                                    {isSending && (
                                        <div className="mt-4">
                                            <div 
                                                className="card border-0 shadow-sm" 
                                                style={{
                                                    borderRadius: '15px',
                                                    background: 'linear-gradient(135deg, rgba(40, 167, 69, 0.1), rgba(102, 126, 234, 0.1))'
                                                }}
                                            >
                                                <div className="card-body p-4">
                                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                                        <h5 className="mb-0 fw-semibold">
                                                            <span className="me-2">📊</span>Sending Progress
                                                        </h5>
                                                        <span 
                                                            className="badge px-3 py-2" 
                                                            style={{
                                                                background: 'linear-gradient(135deg, #28a745, #20c997)',
                                                                borderRadius: '20px',
                                                                fontSize: '1em'
                                                            }}
                                                        >
                                                            {Math.round(sendingProgress)}%
                                                        </span>
                                                    </div>
                                                    <div 
                                                        className="progress shadow-sm" 
                                                        style={{
                                                            height: '12px',
                                                            borderRadius: '10px',
                                                            background: 'rgba(255,255,255,0.3)'
                                                        }}
                                                    >
                                                        <div
                                                            className="progress-bar"
                                                            style={{
                                                                width: `${sendingProgress}%`,
                                                                background: 'linear-gradient(90deg, #28a745, #20c997)',
                                                                borderRadius: '10px',
                                                                transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <div className="mt-3 text-center">
                                                        <small className="text-muted">
                                                            Sending email {Math.ceil((sendingProgress / 100) * emailList.length)} of {emailList.length}
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Logs Section */}
                                    {logs.length > 0 && (
                                        <div className="mt-4">
                                            <div 
                                                className="card border-0 shadow-sm" 
                                                style={{
                                                    borderRadius: '15px',
                                                    background: 'rgba(255,255,255,0.9)'
                                                }}
                                            >
                                                <div className="card-header border-0 bg-transparent d-flex justify-content-between align-items-center">
                                                    <h5 className="mb-0 fw-semibold">
                                                        <span className="me-2">📈</span>Activity Logs
                                                    </h5>
                                                    <button
                                                        className="btn btn-outline-secondary btn-sm fw-semibold transition-all"
                                                        onClick={clearLogs}
                                                        style={{
                                                            borderRadius: '20px',
                                                            borderWidth: '2px'
                                                        }}
                                                    >
                                                        <span className="me-1">🗑️</span>Clear Logs
                                                    </button>
                                                </div>

                                                <div className="card-body p-0">
                                                    <div style={{ 
                                                        maxHeight: '300px', 
                                                        overflowY: 'auto',
                                                        padding: '1rem'
                                                    }}>
                                                        {logs.map((log, index) => (
                                                            <div
                                                                key={index}
                                                                className={`log-item mb-2 p-3 rounded-3 shadow-sm ${
                                                                    log.type === 'success' ? 'border-start border-success border-4' :
                                                                    log.type === 'error' ? 'border-start border-danger border-4' :
                                                                    'border-start border-info border-4'
                                                                }`}
                                                                style={{
                                                                    background: log.type === 'success' ? 'rgba(40, 167, 69, 0.1)' :
                                                                               log.type === 'error' ? 'rgba(220, 53, 69, 0.1)' :
                                                                               'rgba(13, 202, 240, 0.1)',
                                                                    fontSize: '0.9em'
                                                                }}
                                                            >
                                                                <div className="d-flex align-items-start">
                                                                    <span className={`badge me-3 ${
                                                                        log.type === 'success' ? 'bg-success' :
                                                                        log.type === 'error' ? 'bg-danger' : 'bg-info'
                                                                    }`} style={{ 
                                                                        borderRadius: '8px',
                                                                        fontSize: '0.7em',
                                                                        padding: '4px 8px'
                                                                    }}>
                                                                        {log.timestamp}
                                                                    </span>
                                                                    <span className="flex-grow-1" style={{ lineHeight: '1.5' }}>
                                                                        {log.message}
                                                                    </span>
                                                                    <span className="me-2">
                                                                        {log.type === 'success' ? '✅' :
                                                                         log.type === 'error' ? '❌' : 'ℹ️'}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Statistics Footer */}
                                    <div className="mt-4">
                                        <div 
                                            className="card border-0 shadow-sm" 
                                            style={{
                                                borderRadius: '15px',
                                                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(240, 147, 251, 0.05))'
                                            }}
                                        >
                                            <div className="card-body p-4">
                                                <div className="row text-center g-4">
                                                    <div className="col-6 col-md-3">
                                                        <div className="stats-card p-3 rounded-3 transition-all" style={{ background: 'rgba(255,255,255,0.7)' }}>
                                                            <div className="h2 fw-bold mb-1" style={{ color: '#667eea' }}>
                                                                {emailList.length}
                                                            </div>
                                                            <small className="text-muted fw-medium">
                                                                <span className="me-1">👥</span>Recipients
                                                            </small>
                                                        </div>
                                                    </div>
                                                    <div className="col-6 col-md-3">
                                                        <div className="stats-card p-3 rounded-3 transition-all" style={{ background: 'rgba(255,255,255,0.7)' }}>
                                                            <div className="h2 fw-bold mb-1" style={{ color: '#28a745' }}>
                                                                {logs.filter(l => l.type === 'success').length}
                                                            </div>
                                                            <small className="text-muted fw-medium">
                                                                <span className="me-1">✅</span>Sent
                                                            </small>
                                                        </div>
                                                    </div>
                                                    <div className="col-6 col-md-3">
                                                        <div className="stats-card p-3 rounded-3 transition-all" style={{ background: 'rgba(255,255,255,0.7)' }}>
                                                            <div className="h2 fw-bold mb-1" style={{ color: '#dc3545' }}>
                                                                {logs.filter(l => l.type === 'error').length}
                                                            </div>
                                                            <small className="text-muted fw-medium">
                                                                <span className="me-1">❌</span>Failed
                                                            </small>
                                                        </div>
                                                    </div>
                                                    <div className="col-6 col-md-3">
                                                        <div className="stats-card p-3 rounded-3 transition-all" style={{ background: 'rgba(255,255,255,0.7)' }}>
                                                            <div className="h2 fw-bold mb-1" style={{ color: '#17a2b8' }}>
                                                                {Math.round(sendingProgress)}%
                                                            </div>
                                                            <small className="text-muted fw-medium">
                                                                <span className="me-1">📊</span>Progress
                                                            </small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quick Actions Panel */}
                                    {!isSending && (
                                        <div className="mt-4">
                                            <div 
                                                className="card border-0 shadow-sm" 
                                                style={{
                                                    borderRadius: '15px',
                                                    background: 'linear-gradient(135deg, rgba(118, 75, 162, 0.05), rgba(240, 147, 251, 0.05))'
                                                }}
                                            >
                                                <div className="card-body p-4">
                                                    <h5 className="card-title fw-semibold mb-3">
                                                        <span className="me-2">⚡</span>Quick Actions
                                                    </h5>
                                                    <div className="row g-3">
                                                        <div className="col-md-6 col-lg-3">
                                                            <button 
                                                                className="btn btn-outline-primary w-100 fw-semibold transition-all"
                                                                onClick={() => setActiveTab('compose')}
                                                                style={{ borderRadius: '12px', borderWidth: '2px' }}
                                                            >
                                                                <span className="me-2">✏️</span>
                                                                <div className="d-block">
                                                                    <div>Compose</div>
                                                                    <small>New Email</small>
                                                                </div>
                                                            </button>
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <button 
                                                                className="btn btn-outline-success w-100 fw-semibold transition-all"
                                                                onClick={() => setActiveTab('recipients')}
                                                                style={{ borderRadius: '12px', borderWidth: '2px' }}
                                                            >
                                                                <span className="me-2">👥</span>
                                                                <div className="d-block">
                                                                    <div>Manage</div>
                                                                    <small>Recipients</small>
                                                                </div>
                                                            </button>
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <button 
                                                                className="btn btn-outline-warning w-100 fw-semibold transition-all"
                                                                onClick={clearLogs}
                                                                disabled={logs.length === 0}
                                                                style={{ borderRadius: '12px', borderWidth: '2px' }}
                                                            >
                                                                <span className="me-2">🗑️</span>
                                                                <div className="d-block">
                                                                    <div>Clear</div>
                                                                    <small>Logs</small>
                                                                </div>
                                                            </button>
                                                        </div>
                                                        <div className="col-md-6 col-lg-3">
                                                            <button 
                                                                className="btn btn-outline-info w-100 fw-semibold transition-all"
                                                                onClick={() => {
                                                                    const stats = {
                                                                        recipients: emailList.length,
                                                                        sent: logs.filter(l => l.type === 'success').length,
                                                                        failed: logs.filter(l => l.type === 'error').length,
                                                                        progress: sendingProgress
                                                                    };
                                                                    addLog(`Campaign Stats: ${JSON.stringify(stats)}`, 'info');
                                                                }}
                                                                style={{ borderRadius: '12px', borderWidth: '2px' }}
                                                            >
                                                                <span className="me-2">📊</span>
                                                                <div className="d-block">
                                                                    <div>Export</div>
                                                                    <small>Stats</small>
                                                                </div>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Footer Info */}
                                    <div className="mt-4 text-center">
                                        <small className="text-muted">
                                            <span className="me-2">🛡️</span>
                                            Powered by GoTestLi Email Marketing Platform
                                            <span className="mx-2">•</span>
                                            <span className="me-2">📧</span>
                                            Professional bulk email solution
                                            <span className="mx-2">•</span>
                                            <span className="me-2">🔒</span>
                                            Secure & Reliable
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bootstrap CSS CDN */}
            {/* <link
                href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css"
                rel="stylesheet"
            /> */}
        </>
    );
};

export default EmailMarketingDashboard;



