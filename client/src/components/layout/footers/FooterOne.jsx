import React, { useState } from "react";
import { Link } from "react-router-dom";
import Socials from "@/components/common/Socials";
import FooterLinks from "../component/FooterLinks";
import Links from "../component/Links";
import { API } from "@/utils/AxiosInstance";
import { toast } from "react-toastify";
import { showToast } from "@/utils/toastService";
import emailTemplates from "../../../../../email_templates/emailtemplates";



const APP_ID = 1;
const API_TOKEN = '7b9e6c5f-8a1d-4d3e-b5f2-c9a8e7d6b5c4';
const ADMIN_EMAIL = 'gotestli07@gmail.com'

export default function FooterOne() {
  const [email, setEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  

  const headers = {
    "X-API-Token": API_TOKEN,
    "app-id": APP_ID
  };

  const handleSubmitClick = async () => {
    try {
      setIsDisabled(true);
      const data = await API.post("/api/waitinglist", { email: email });
      if (data.status == 200) {
        const res = await API.post("https://communication.gotestli.com/api/send/email", {
          app_id: APP_ID,
          sender: ADMIN_EMAIL,
          sender_name: "Gotestli",
          recipients: [
            {
              "email": email,
              "name": ""
            }
          ],
          "content": {...emailTemplates.welcomeEmail},
//           "content": {
//             subject: "Welcome to Gotestli! 🎉 Stay Tuned for Updates!",
//             body_text: `
//           Hi there,
          
//           Thank you for joining the Gotestli community! 🎉
          
//           We're excited to have you on board. By signing up, you'll be the first to know about new releases, exciting features, and exclusive bonuses we have in store just for you. 🚀
          
//           Here’s what you can look forward to:
//           - 🆕 Early access to new features
//           - 🎁 Special giveaways and bonuses
//           - 📊 Updates on the latest quizzes and question sets
          
//           Stay tuned, and keep an eye on your inbox for some great surprises!
          
//           Wishing you success,
// The GoTestLI Team

// ---------------------
// GoTestli
// Test Your Limits, Expand Your Knowledge
// https://gotestli.com
//           `,
//             body_html: `
//           <p>Hi <b>there</b>,</p>
          
//           <p>Thank you for joining the Gotestli community! 🎉</p>
          
//           <p>We’re excited to have you with us. By signing up, you'll be the first to know about:</p>
//           <ul>
//             <li>🆕 Early access to new features</li>
//             <li>🎁 Special giveaways and bonuses</li>
//             <li>📊 Updates on the latest quizzes and question sets</li>
//           </ul>
          
//           <p>Stay tuned and keep an eye on your inbox for some amazing updates!</p>
          
//          <p>Wishing you success,<br/>  
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
//           `,
//           },
          reply_to: [
            "gotestli07@gmail.com"
          ]
        },
        { headers } 
      );
      
        if (res.status == 200) {
          showToast("success", "Subscribed!");
        }
      }
      setIsDisabled(false);
    } catch (error) {
      if (error.status == 500) {
        // showToast("error", "Already Subscribed!");
      }
      console.error(error);
      showToast("error", "Something went wrong ");
      setIsDisabled(false);
    }
  };
  return (
    <footer className="footer -type-1 bg-dark-1 -green-links " style={{ position: 'sticky', width: '100%', bottom: 0 }}>
      <div className="container-fluid w-100">
        <div className="footer-header py-4">
          <div className="row y-gap-2 justify-between items-center mx-2">
            <div className="col-xl-4 d-flex flex-column">
              <div className="footer-header__logo">
                <img
                  src="/assets/img/header-logo3.png"
                  alt="logo"
                  style={{ height: "auto", width: "140px" }}
                />
              </div>
              <div className='d-flex gap-4 mt-4 align-items-center'>
                <div className="footer-header-socials__title text-white ">
                  Follow us on social media
                </div>
                <div className="footer-header-socials__list">
                  <Socials />
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="row y-gap-30 d-flex justify-content-evenly">
                <FooterLinks
                  allClasses={"text-17 fw-500 text-white uppercase mb-2"}
                />

                <div className="col-xl-6 col-lg-4 col-md-6 ms-2">
                  <div className="text-17 fw-500 text-white uppercase mb-2">
                    GET IN TOUCH
                  </div>
                  <div className="footer-columns-form ">
                    <div className="mb-2">
                      We don’t send spam so don’t worry.
                    </div>
                    <div>
                      <div className="form-group d-flex align-items-center gap-2 flex-lg-row flex-column">
                        <input
                          required
                          type="text"
                          placeholder="Email..."
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-75"
                        />
                        <button
                          type="submit"
                          onClick={handleSubmitClick}
                          disabled={isDisabled}
                          style={{
                            cursor: isDisabled ? "not-allowed" : "pointer",
                          }}
                          className="button -sm px-12 py-10 -green-5 text-white fw-500 text-18 mx-auto"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-xl-4">
              <div className="footer-header-socials">
                <div className="footer-header-socials__title text-white mt-0">
                  Follow us on social media
                </div>
                <div className="footer-header-socials__list">
                  <Socials />
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* <div className="footer-columns py-4">
          {/* <div className="row y-gap-30 d-flex justify-content-evenly">
            <FooterLinks
              allClasses={"text-17 fw-500 text-white uppercase mb-2"}
            />

            <div className="col-xl-4 col-lg-4 col-md-6">
              <div className="text-17 fw-500 text-white uppercase mb-2">
                GET IN TOUCH
              </div>
              <div className="footer-columns-form">
                <div>We don’t send spam so don’t worry.</div>
                <div>
                  <div className="form-group">
                    <input
                      required
                      type="text"
                      placeholder="Email..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                      type="submit"
                      onClick={handleSubmitClick}
                      disabled={isDisabled}
                      style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </div> */}
        <div className="py-3 border-top-light-15">
          <div className="d-flex items-center h-100 text-white justify-content-center mr-4">
            © {new Date().getFullYear()} GoTestli. All Right Reserved.
          </div>
        </div>

        {/* <div className="py-3 border-top-light-15">
          <div className="row justify-between items-center y-gap-20">
            <div className="col-auto">
              <div className="d-flex items-center h-100 text-white justify-content-center mr-4">
                © {new Date().getFullYear()} GoTestli. All Right Reserved.
              </div>
            </div>

            {/* <div className="col-auto">
              <div className="d-flex x-gap-20 y-gap-20 items-center flex-wrap">
                <div>
                  <div className="d-flex x-gap-15 text-white">
                    <Links />
                  </div>
                </div>

                <div>
                  <Link
                    to="#"
                    className="button px-30 h-50 -dark-6 rounded-200 text-white"
                  >
                    <i className="icon-worldwide text-20 mr-15"></i>
                    <span className="text-15">English</span>
                  </Link>
                </div>
              </div>
            </div> 
          </div>
        </div> */}
      </div>
    </footer>
  );
}
