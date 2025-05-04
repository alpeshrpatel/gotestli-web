const emailTemplates = {
  welcomeEmail: {
    subject: "Welcome to Gotestli! 🎉 Stay Tuned for Updates!",
    body_text: `
      Hi there,
      
      Thank you for joining the Gotestli community! 🎉
      
      We're excited to have you on board. By signing up, you'll be the first to know about new releases, exciting features, and exclusive bonuses we have in store just for you. 🚀
      
      Here’s what you can look forward to:
      - 🆕 Early access to new features
      - 🎁 Special giveaways and bonuses
      - 📊 Updates on the latest quizzes and question sets
      
      Stay tuned, and keep an eye on your inbox for some great surprises!
      
      Wishing you success,
The GoTestLI Team

---------------------
GoTestli
Test Your Limits, Expand Your Knowledge
https://gotestli.com
      `,
    body_html: `
      <p>Hi <b>there</b>,</p>
      
      <p>Thank you for joining the Gotestli community! 🎉</p>
      
      <p>We’re excited to have you with us. By signing up, you'll be the first to know about:</p>
      <ul>
        <li>🆕 Early access to new features</li>
        <li>🎁 Special giveaways and bonuses</li>
        <li>📊 Updates on the latest quizzes and question sets</li>
      </ul>
      
      <p>Stay tuned and keep an eye on your inbox for some amazing updates!</p>
      
     <p>Wishing you success,<br/>  
<p>GoTestli Team</p>
<hr style="margin: 30px 0;" />

<div style="font-size: 13px; color: #888; text-align: center;">
<img src="https://gotestli.com/assets/img/header-logo3.png" alt="GoTestLI Logo" width="120" style="margin-bottom: 10px;" />
<p><b>GoTestli</b><br/>
Test Your Limits, Expand Your Knowledge<br/>
<a href="https://gotestli.com" style="color: #ff6600; text-decoration: none;">www.gotestli.com</a></p>
<p style="margin-top: 10px; font-size: 12px;">

<a href="mailto:gotestli07@gmail.com" style="color: #666; text-decoration: none; margin: 0 5px;">✉️ gotestli07@gmail.com</a>
</p>

</div>
      `,
  },
  contactMessageEmail: {

    subject: `New Contact Message from {{name}}`,
    body_text: `
    Hi Admin,
    
    You've received a new message from the Contact Us page on your website.
    
    Details:
    - Name: {{name}}
    - Email: {{email}}
    - Subject: {{subject}}
    
    Message:
    {{message}}
    
    Please respond to the user at your earliest convenience.
    
    Wishing you success,
The GoTestLI Team

---------------------
GoTestli
Test Your Limits, Expand Your Knowledge
https://gotestli.com
    `,
    body_html: `
    <p>Hi <b>Admin</b>,</p>
    
    <p>You've received a new message from the <b>Contact Us</b> page on your website.</p>
    
    <p><b>Details:</b></p>
    <ul>
    <li><b>Name:</b> {{name}}</li>
    <li><b>Email:</b> {{email}}</li>
    <li><b>Subject:</b> {{subject}}</li>
    </ul>
    
    <p><b>Message:</b></p>
    <blockquote style="border-left: 4px solid #4CAF50; padding-left: 10px; color: #333;">
      {{message}}
    </blockquote>
    
    <p>Please respond to the user at your earliest convenience.</p>
    
    <p>Wishing you success,<br/>  
<p>GoTestli Team</p>
<hr style="margin: 30px 0;" />

<div style="font-size: 13px; color: #888; text-align: center;">
<img src="https://gotestli.com/assets/img/header-logo3.png" alt="GoTestLI Logo" width="120" style="margin-bottom: 10px;" />
<p><b>GoTestli</b><br/>
Test Your Limits, Expand Your Knowledge<br/>
<a href="https://gotestli.com" style="color: #ff6600; text-decoration: none;">www.gotestli.com</a></p>
<p style="margin-top: 10px; font-size: 12px;">
 
  <a href="mailto:gotestli07@gmail.com" style="color: #666; text-decoration: none; margin: 0 5px;">✉️ gotestli07@gmail.com</a>
</p>

</div>
    `
  },
//   questionUploadReportEmail: {
//     subject: "📊 Question Upload Report: Excel File Processed Successfully!",
//     body_text: `
// Hi ${notificationDetails.first_name},

// We’ve completed processing your uploaded Excel file for question insertion. Below is a summary of the results:

// ✔️ **Successful Insertions:**
// - ${(notificationDetails.correct_rows &&
//         notificationDetails.correct_rows?.split(",").length) ||
//       0
//       } questions were successfully inserted into the database.

// ❌ **Errors During Insertion:**
// - ${(notificationDetails.error_rows &&
//         notificationDetails.error_rows?.split(",").length) ||
//       0
//       } rows encountered errors. 
// - Row indexes: ${notificationDetails.error_rows}

// Please review the error details and correct the file if necessary. If you need any assistance, feel free to reach out!

// Wishing you success,
// The GoTestLI Team

// ---------------------
// GoTestli
// Test Your Limits, Expand Your Knowledge
// https://gotestli.com
// `,
//     body_html: `
// <p>Hi <b>${notificationDetails.first_name}</b>,</p>

// <p>We’ve completed processing your uploaded Excel file for question insertion. Below is a summary of the results:</p>

// <h3>✔️ <b>Successful Insertions:</b></h3>
// <ul>
// <li><b>${(notificationDetails.correct_rows &&
//         notificationDetails.correct_rows?.split(",").length) ||
//       0
//       }</b> questions were successfully inserted into the database.</li>
// </ul>

// <h3>❌ <b>Errors During Insertion:</b></h3>
// <ul>
// <li><b>${(notificationDetails.error_rows &&
//         notificationDetails.error_rows?.split(",").length) ||
//       0
//       }</b> rows encountered errors.</li>
// <li>Row indexes: <b>${notificationDetails.error_rows}</b></li>
// </ul>

// <p>Please review the error details and correct the file if necessary. If you need any assistance, feel free to reach out!</p>

// <p>Wishing you success,<br/>  
// <p>GoTestli Team</p>
// <hr style="margin: 30px 0;" />

// <div style="font-size: 13px; color: #888; text-align: center;">
// <img src="https://gotestli.com/assets/img/header-logo3.png" alt="GoTestLI Logo" width="120" style="margin-bottom: 10px;" />
// <p><b>GoTestli</b><br/>
// Test Your Limits, Expand Your Knowledge<br/>
// <a href="https://gotestli.com" style="color: #ff6600; text-decoration: none;">www.gotestli.com</a></p>
// <p style="margin-top: 10px; font-size: 12px;">

// <a href="mailto:gotestli07@gmail.com" style="color: #666; text-decoration: none; margin: 0 5px;">✉️ gotestli07@gmail.com</a>
// </p>

// </div>
// `,
//   },
  quizAlertEmail: {
    subject: `📢 New Quiz Alert from {{author}}! 🚀 Check it Out Now!`,
    body_text: `
              Hi {{first_name}},
              
              Great news! {{author}} just released a brand new quiz: "{{title}}" on Gotestli, and you're invited to be one of the first to check it out. 🎉
              
              By staying updated, you get:
              - 🌟 Exclusive access to fresh quizzes
              - 📈 A chance to improve your knowledge and skills
              - 🎯 Opportunities to engage and learn with other members of the Gotestli community
              
              Don't miss out on the fun and the learning. Dive into the latest quiz now and see how well you can do!
              
              Wishing you success,
The GoTestLI Team

---------------------
GoTestli
Test Your Limits, Expand Your Knowledge
https://gotestli.com
                `,
    body_html: `
              <p>Hi <b>{{first_name}}</b>,</p>
              
              <p>Great news! <b>{{author}}</b> just released a brand new quiz: "<b>{{title}}</b>" on Gotestli, and you're invited to be one of the first to check it out. 🎉</p>
              
              <p>By staying updated, you get:</p>
              <ul>
                <li>🌟 Exclusive access to fresh quizzes</li>
                <li>📈 A chance to improve your knowledge and skills</li>
                <li>🎯 Opportunities to engage and learn with other members of the Gotestli community</li>
              </ul>
              
              <p>Don't miss out on the fun and the learning. Dive into the latest quiz now and see how well you can do!</p>
              
              <p>Happy learning,<br/>
               <p>Wishing you success,<br/>  
<p>GoTestli Team</p>
<hr style="margin: 30px 0;" />

<div style="font-size: 13px; color: #888; text-align: center;">
<img src="https://gotestli.com/assets/img/header-logo3.png" alt="GoTestLI Logo" width="120" style="margin-bottom: 10px;" />
<p><b>GoTestli</b><br/>
Test Your Limits, Expand Your Knowledge<br/>
<a href="https://gotestli.com" style="color: #ff6600; text-decoration: none;">www.gotestli.com</a></p>
<p style="margin-top: 10px; font-size: 12px;">

<a href="mailto:gotestli07@gmail.com" style="color: #666; text-decoration: none; margin: 0 5px;">✉️ gotestli07@gmail.com</a>
</p>

</div>
                `,
  },
  refundRequestAdminEmail: {
    to: 'gotestli07@gmail.com', // recipient email
    subject: `⚠️ New Refund Request Notification - Action Required`,
    body_text:
      `Dear Admin,
                                
                                This is to notify you that a new refund request has been submitted in the Gotestli platform.
                                
                                🔍 Request Details:
                                - User Email: {{email}}
                                - Amount Requested: {{amount}}
                                - Payment ID: {{payment_intent_id}}
                                - Question Set Title: {{title}}
                                
                                
                                
                                Please review this request at your earliest convenience through the admin dashboard. The request can be accessed directly at:
                                https://gotestli.com/refunds/requests
                                
                                As per our policy, refund requests need to be processed within 2 business days of submission.
                                
                                Wishing you success,
The GoTestLI Team

---------------------
GoTestli
Test Your Limits, Expand Your Knowledge
https://gotestli.com
                                
                                Note: This is an automated notification. Please do not reply to this email.
                                `,
    body_html: `
                                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                                  <p>Dear <strong>Admin</strong>,</p>
                                
                                  <p>This is to notify you that a new refund request has been submitted in the Gotestli platform.</p>
                                
                                  <div style="background-color: #f8f9fa; border-left: 5px solid #ff9800; padding: 15px; margin: 20px 0;">
                                    <p><strong>🔍 Request Details:</strong></p>
                                    <p>👤 <strong>User Email:</strong> {{email}}</p>
                                    <p>💲 <strong>Amount Requested:</strong> {{amount}}</p>
                                    <p>📅 <strong>Request ID:</strong> {{payment_intent_id}}</p>
                                    <p>🆔 <strong>QuestionSet Title:</strong> {{title}}</p>
                                  </div>
                                
                                  
                                
                                  <p>Please review this request at your earliest convenience through the admin dashboard. The request can be accessed directly at:</p>
                                  <p><a href="https://gotestli.com/refunds/requests" style="color: #007BFF;">https://gotestli.com/refunds/requests</a></p>
                                
                                  <p>As per our policy, refund requests need to be processed within 2 business days of submission.</p>
                                
                                   <p>Wishing you success,<br/>  
<p>GoTestli Team</p>
<hr style="margin: 30px 0;" />

<div style="font-size: 13px; color: #888; text-align: center;">
<img src="https://gotestli.com/assets/img/header-logo3.png" alt="GoTestLI Logo" width="120" style="margin-bottom: 10px;" />
<p><b>GoTestli</b><br/>
Test Your Limits, Expand Your Knowledge<br/>
<a href="https://gotestli.com" style="color: #ff6600; text-decoration: none;">www.gotestli.com</a></p>
<p style="margin-top: 10px; font-size: 12px;">

<a href="mailto:gotestli07@gmail.com" style="color: #666; text-decoration: none; margin: 0 5px;">✉️ gotestli07@gmail.com</a>
</p>

</div>
                                
                                  <p style="font-size: 12px; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;">
                                    Note: This is an automated notification. Please do not reply to this email.
                                  </p>
                                </div>
                                  `,
  },
  refundRequestStudentEmail: {
    to: 'gotestli07@gmail.com', // recipient email
    subject: `📝 Your Refund Request Has Been Received - GoTestli`,
    body_text:
      `Dear Student,
      
      Thank you for submitting your refund request with GoTestli. We have received your request and it is now being processed.
      
      🔍 Your Request Details:
      - User Email: {{email}}
      - Amount Requested: {{amount}}
      - Payment ID: {{payment_intent_id}}
      - Question Set Title: {{title}}
                                
      
      🕒 What happens next?
      Our administrative team will review your request within 2 business days. You will receive an email notification once your request has been processed.
      
      If you have any questions regarding your refund request, please contact our support team at gotestli07@gmail.com or call (800) 555-TEST with your Request ID ready for reference.
      
      
      We appreciate your patience during this process.
      
      Wishing you success,
      The GoTestLI Team
      
      ---------------------
      GoTestli
      Test Your Limits, Expand Your Knowledge
      https://gotestli.com
      
      Note: This is an automated confirmation. If you did not submit a refund request, please contact our support team immediately.
      `,
    body_html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <p>Dear <strong>Student</strong>,</p>
      
        <p>Thank you for submitting your refund request with GoTestli. We have received your request and it is now being processed.</p>
      
        <div style="background-color: #f8f9fa; border-left: 5px solid #3f51b5; padding: 15px; margin: 20px 0;">
          <p><strong>🔍 Your Request Details:</strong></p>
       
                                    <p>👤 <strong>User Email:</strong> {{email}}</p>
                                    <p>💲 <strong>Amount Requested:</strong> {{amount}}</p>
                                    <p>📅 <strong>Request ID:</strong> {{payment_intent_id}}</p>
                                    <p>🆔 <strong>QuestionSet Title:</strong> {{title}}</p>
        </div>
      
        <div style="background-color: #f8f9fa; border-left: 5px solid #4CAF50; padding: 15px; margin: 20px 0;">
          <p><strong>🕒 What happens next?</strong></p>
          <p>Our administrative team will review your request within 2 business days. You will receive an email notification once your request has been processed.</p>
        </div>
      
        <p>If you have any questions regarding your refund request, please contact our support team at <a href="mailto:gotestli07@gmail.com" style="color: #007BFF;">gotestli07@gmail.com</a> or call (800) 555-TEST with your Request ID ready for reference.</p>
      
       
      
        <p>We appreciate your patience during this process.</p>
      
        <p>Wishing you success,<br/>  
      <p>GoTestli Team</p>
      <hr style="margin: 30px 0;" />
      
      <div style="font-size: 13px; color: #888; text-align: center;">
        <img src="https://gotestli.com/assets/img/header-logo3.png" alt="GoTestLI Logo" width="120" style="margin-bottom: 10px;" />
        <p><b>GoTestli</b><br/>
        Test Your Limits, Expand Your Knowledge<br/>
        <a href="https://gotestli.com" style="color: #ff6600; text-decoration: none;">www.gotestli.com</a></p>
        <p style="margin-top: 10px; font-size: 12px;">
         
          <a href="mailto:gotestli07@gmail.com" style="color: #666; text-decoration: none; margin: 0 5px;">✉️ gotestli07@gmail.com</a>
        </p>
        
      </div>
      
        <p style="font-size: 12px; color: #666; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;">
          Note: This is an automated confirmation. If you did not submit a refund request, please contact our support team immediately.
        </p>
      </div>
        `,
  },
  userOrgAcessEmail: {
    subject: `🎊 Welcome to GoTestli! Your Organization Access is Ready 🚀`,
    body_text:
      `Dear {{selectedRole === 'instructor' ? 'Instructor' : 'Student'}},

We’re excited to welcome you to GoTestli! Your organization, {{org_name}}, is now onboarded, and your access has been set up. You’re just a step away from unlocking powerful tools designed to enhance learning and assessments.

Here are your login details:

🔑 Login Credentials  
🔗 Platform URL: https://{{subdomain}}.gotestli.com  
📧 Username: {{email}}  
🔒 Temporary Password: {{password}} (Please change upon first login)  

As a {{selectedRole}}, you will have access to:

{{selectedRole === 'instructor'
        ? "- 📚 Create and manage interactive assessments  
- 📊 Track student progress with real-time analytics  
- 🔄 Integrate learning content effortlessly  
- 🏫 Oversee student participation and performance"
        : "- 📝 Access engaging quizzes and assessments  
- 📈 Monitor your progress and performance  
- 🎯 Enhance learning with personalized content  
- 🎓 Stay on top of your academic journey"}}  

💡 **Next Steps:**  
📅 Join us for a live onboarding session on **Wednesday, March 12th at 10:00 AM EST**, where our specialists will guide you through the platform.  

In the meantime, check out our **Getting Started Guide** (https://help.gotestli.com/getting-started) and **Resource Center** (https://help.gotestli.com/resources) to familiarize yourself with GoTestli.  

We’re thrilled to have you on board and can’t wait to see you excel!  

Wishing you success,
The GoTestLI Team

---------------------
GoTestli
Test Your Limits, Expand Your Knowledge
https://gotestli.com

📩 Need help? Reach out to us at **gotestli07@gmail.com** or call **(800) 555-TEST**.  
`,
    body_html: `
<p>Dear <strong>{{selectedRole === 'instructor' ? 'Instructor' : 'Student'}}</strong>,</p>

<p>We’re excited to welcome you to <strong>GoTestli</strong>! Your organization, <strong>{{org_name}}</strong>, is now onboarded, and your access has been set up. You’re just a step away from unlocking powerful tools designed to enhance learning and assessments.</p>

<div style="background-color: #f8f9fa; border-left: 5px solid #4CAF50; padding: 15px; margin: 20px 0;">
<p><strong>🔑 Login Credentials</strong></p>
<p>🔗 <strong>Platform URL:</strong> <a href="https://{{subdomain}}.gotestli.com" style="color: #007BFF;">https://{{subdomain}}.gotestli.com</a></p>
<p>📧 <strong>Username:</strong> {{email}}</p>
<p>🔒 <strong>Temporary Password:</strong> <strong>{{password}}</strong> (Please change upon first login)</p>
</div>

<p>As a <strong>{{selectedRole}}</strong>, you will have access to:</p>

{{selectedRole === 'instructor'
        ? "<ul>
<li>📚 Create and manage interactive assessments</li>
<li>📊 Track student progress with real-time analytics</li>
<li>🔄 Integrate learning content effortlessly</li>
<li>🏫 Oversee student participation and performance</li>
</ul>"
        : "<ul>
<li>📝 Access engaging quizzes and assessments</li>
<li>📈 Monitor your progress and performance</li>
<li>🎯 Enhance learning with personalized content</li>
<li>🎓 Stay on top of your academic journey</li>
</ul>"}}


<p>We’re thrilled to have you on board and can’t wait to see you excel!</p>

<p>Wishing you success,<br/>  
<p>GoTestli Team</p>
<hr style="margin: 30px 0;" />

<div style="font-size: 13px; color: #888; text-align: center;">
<img src="https://gotestli.com/assets/img/header-logo3.png" alt="GoTestLI Logo" width="120" style="margin-bottom: 10px;" />
<p><b>GoTestli</b><br/>
Test Your Limits, Expand Your Knowledge<br/>
<a href="https://gotestli.com" style="color: #ff6600; text-decoration: none;">www.gotestli.com</a></p>
<p style="margin-top: 10px; font-size: 12px;">

<a href="mailto:gotestli07@gmail.com" style="color: #666; text-decoration: none; margin: 0 5px;">✉️ gotestli07@gmail.com</a>
</p>

</div>

<p style="font-size: 12px; color: #666;">
📩 Need help? Reach out to us at <a href="mailto:gotestli07@gmail.com" style="color: #007BFF;">gotestli07@gmail.com</a> or call (800) 555-TEST.
</p>

`,
  },
  adminOrgAccessEmail : {
    subject: `🎉 Welcome Aboard GoTestli! Your Organization is Now Approved ✅`,
    body_text: `
Dear Partner,
Fantastic news! 🚀 Your organization {{org_name}} has been officially approved for onboarding to the GoTestli platform. We're thrilled to welcome you to our community of innovative educators and learners!
Your dedicated admin portal is now active and ready for you to explore. Here are your credentials to get started:
🔐 ADMIN LOGIN DETAILS:
URL: https://{{subdomain}}.gotestli.com
Username: {{email}}
Temporary Password: {{password}} (Please change upon first login)
With GoTestli, you now have access to:

📊 Comprehensive assessment creation tools
📈 Real-time analytics and performance tracking
🔄 Seamless content integration capabilities
👥 User management and permission controls
🎓 Extensive quiz and learning resources library

We've scheduled a personalized onboarding session for your team on Wednesday, March 12th at 10:00 AM EST. Our implementation specialist will guide you through platform setup and answer any questions you may have.
In the meantime, feel free to explore our Getting Started Guide (https://help.gotestli.com/getting-started) and Resource Center (https://help.gotestli.com/resources).
We're excited to see the engaging learning experiences you'll create with GoTestli!
Welcome aboard,
The GoTestli Team
Need assistance? Contact our support team at support@gotestli.com or call (800) 555-TEST.
Wishing you success,
The GoTestLI Team

---------------------
GoTestli
Test Your Limits, Expand Your Knowledge
https://gotestli.com
  `,
    body_html: `
<p>Dear Partner,</p>
<p>Fantastic news! 🚀 Your organization <b>{{org_name}}</b> has been <b>officially approved</b> for onboarding to the GoTestli platform. We're thrilled to welcome you to our community of innovative educators and learners!</p>
<p>Your dedicated admin portal is now <b>active and ready</b> for you to explore. Here are your credentials to get started:</p>
<div style="background-color: #f8f9fa; border-left: 4px solid #4CAF50; padding: 15px; margin: 20px 0;">
  <p><b>🔐 Admin Login Details:</b></p>
  <p>URL: <a href="https://{{subdomain}}.gotestli.com">https://{{subdomain}}.gotestli.com</a><br>
  Username: <b>{{email}}</b><br>
  Temporary Password: <b>{{password}}</b> (Please change upon first login)</p>
</div>
<p>With GoTestli, you now have access to:</p>
<ul>
  <li>📊 Comprehensive assessment creation tools</li>
  <li>📈 Real-time analytics and performance tracking</li>
  <li>🔄 Seamless content integration capabilities</li>
  <li>👥 User management and permission controls</li>
  <li>🎓 Extensive quiz and learning resources library</li>
</ul>

<p>We're excited to see the engaging learning experiences you'll create with GoTestli!</p>
<p>Welcome aboard,<br>
<b>The GoTestli Team</b></p>
<p style="font-size: 12px; color: #666;">
Need assistance? Contact our support team at <a href="mailto:gotestli07@gmail.com">gotestli07@gmail.com</a> or call (800) 555-TEST.
</p>
 <p>Wishing you success,<br/>  
<p>GoTestli Team</p>
<hr style="margin: 30px 0;" />

<div style="font-size: 13px; color: #888; text-align: center;">
<img src="https://gotestli.com/assets/img/header-logo3.png" alt="GoTestLI Logo" width="120" style="margin-bottom: 10px;" />
<p><b>GoTestli</b><br/>
Test Your Limits, Expand Your Knowledge<br/>
<a href="https://gotestli.com" style="color: #ff6600; text-decoration: none;">www.gotestli.com</a></p>
<p style="margin-top: 10px; font-size: 12px;">

<a href="mailto:gotestli07@gmail.com" style="color: #666; text-decoration: none; margin: 0 5px;">✉️ gotestli07@gmail.com</a>
</p>

</div>
  `,
},
quizReminderEmail: {
  subject: "🚀 Reminder: Your Quiz Awaits! Don't Miss It! 🎯",
  body_text: `
  Hi {{first_name}},
  
  I hope you're doing great! 🌟 This is a friendly reminder to complete your quiz on **{{title}}**. ⏰ The quiz is an important step in reinforcing what you've learned, and I know you'll do amazing! 💪
  
  Quiz Details:
  - Topic: {{title}}
  - Questions: {{no_of_question}}
  - Duration: {{time_duration}} Minutes
  
  Make sure you're prepared, and don't forget to review your notes before starting! 📚 If you have any questions or need help, feel free to reach out! 📨
  
  Good luck! 🍀 I'm rooting for you, and I can't wait to see your results! 🎉
  
  Best regards,
  {{instructor}}
  Instructor ✨

  Wishing you success,
The GoTestLI Team

---------------------
GoTestli
Test Your Limits, Expand Your Knowledge
https://gotestli.com
    `,
  body_html: `
    <p>Hi <b>{{first_name}}</b>,</p>
    
    <p>I hope you're doing great! 🌟 This is a friendly reminder to complete your quiz on <b>{{title}}</b>. ⏰ The quiz is an important step in reinforcing what you've learned, and I know you'll do amazing! 💪</p>
    
    <h3>📝 <b>Quiz Details:</b></h3>
    <ul>
      <li><b>Topic:</b> {{title}}</li>
      <li><b>Questions:</b> {{no_of_question}}</li>
      <li><b>Duration:</b> {{time_duration}}</li>
    </ul>
    
    <p>Make sure you're prepared, and don't forget to review your notes before starting! 📚 If you have any questions or need help, feel free to reach out! 📨</p>
    
    <p>Good luck! 🍀 I'm rooting for you, and I can't wait to see your results! 🎉</p>
    
    <p>Best regards,<br/>
    {{instructor}}<br/>
    <b>Instructor</b> ✨</p>
    <br/>
     <p>Wishing you success,<br/>  
<p>GoTestli Team</p>
<hr style="margin: 30px 0;" />

<div style="font-size: 13px; color: #888; text-align: center;">
<img src="https://gotestli.com/assets/img/header-logo3.png" alt="GoTestLI Logo" width="120" style="margin-bottom: 10px;" />
<p><b>GoTestli</b><br/>
Test Your Limits, Expand Your Knowledge<br/>
<a href="https://gotestli.com" style="color: #ff6600; text-decoration: none;">www.gotestli.com</a></p>
<p style="margin-top: 10px; font-size: 12px;">

<a href="mailto:gotestli07@gmail.com" style="color: #666; text-decoration: none; margin: 0 5px;">✉️ gotestli07@gmail.com</a>
</p>

</div>
    `,
},
}

export default emailTemplates