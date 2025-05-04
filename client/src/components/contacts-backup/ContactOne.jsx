import React, { useState, useEffect } from "react";

import { contactData } from "@/data--backup/contactLinks";

import MapComponent from "./Map";
import { useNavigate } from "react-router-dom";
import { API } from "@/utils/AxiosInstance";
import { toast } from "react-toastify";
import { showToast } from "@/utils/toastService";
import emailTemplates from "../../../../email_templates/emailtemplates";
import { renderTemplate } from "@/utils/renderTemplate";

const APP_ID = 1;
const API_TOKEN = '7b9e6c5f-8a1d-4d3e-b5f2-c9a8e7d6b5c4';
const ADMIN_EMAIL = 'dipakkarmur45@gmail.com'

const headers = {
  "X-API-Token": API_TOKEN,
  "app-id": APP_ID
};

export default function ContactOne() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [subject, setSubject] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleFormChange = (e) => {
    const target = e.target;
    setFormData((prev) => ({ ...prev, [target.name]: target.value }));
  };
  console.log(formData)
  const handleMessageClick = async () => {
    try {
      const contactMessageEmail = emailTemplates.contactMessageEmail;
      const dynamicData = {
        
          name: formData.name,
          email: formData.email,
          message: formData.message,
        
        subject: subject,
      }
    const renderedContent = {
      subject: renderTemplate(contactMessageEmail.subject, dynamicData),
      body_text: renderTemplate(contactMessageEmail.body_text, dynamicData),
      body_html: renderTemplate(contactMessageEmail.body_html, dynamicData),
    };
      const data = await API.post("/api/contact/messages", formData);
      const resp = await API.post("https://communication.gotestli.com/api/send/email",
        {
          app_id: APP_ID,
          sender: ADMIN_EMAIL,
          sender_name: "Gotestli",
          recipients: [
            {
              email: ADMIN_EMAIL,
              name: 'Gotestli',
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

      if (data.status == 200) {
        showToast("success", 'Message Sent!')
      }
    } catch (error) {
      console.error(error)
    }
  };
  return (
    <>
      <section className="">
        <MapComponent />
      </section>
      <section className="layout-pt-md layout-pb-lg">
        <div className="container-fluid" style={{ padding: "0px 5vw" }}>
          <div className="row y-gap-50 justify-between">
            <div className="col-lg-4">
              <h3 className="text-24 fw-500">Keep In Touch With Us.</h3>
              <p className="mt-25">
                If you have any further queries, don’t hesitate to get in touch. We’re here to help!
              </p>

              <div className="y-gap-30 pt-60 lg:pt-40">
                {contactData.map((elm, i) => (
                  <div key={i} className="d-flex items-center">
                    <div className="d-flex justify-center items-center size-60 rounded-full bg-light-7">
                      <img src={elm.icon} alt="icon" />
                    </div>
                    <div className="ml-20">
                      {elm.address
                        ? `${elm.address
                          .split(" ")
                          .slice(0, 4)
                          .join(" ")} \n ${elm.address
                            .split(" ")
                            .slice(4, -1)
                            .join(" ")}`
                        : elm.email || elm.phoneNumber}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-7">
              <h3 className="text-24 fw-500">Send us a Message.</h3>
              <p className="mt-25">
                We’re always happy to assist. Drop us a message, and we’ll respond as soon as possible.

              </p>

              <div className="contact-form row y-gap-30 pt-60 lg:pt-40">
                <div className="col-md-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    placeholder="Name..."
                    value={formData.name}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Email Address
                  </label>
                  <input
                    required
                    type="text"
                    name="email"
                    placeholder="Email..."
                    value={formData.email}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="col-md-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Subject
                  </label>
                  <input
                    required
                    type="text"
                    name="subject"
                    placeholder="Subject..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                    Message...
                  </label>
                  <textarea
                    required
                    name="message"
                    placeholder="Message"
                    rows="8"
                    value={formData.message}
                    onChange={handleFormChange}
                  ></textarea>
                </div>
                <div className="col-12">
                  <button
                    type="submit"
                    name="submit"
                    id="submit"
                    className="button -md -purple-1 text-white"
                    onClick={handleMessageClick}
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


{/* <a href="tel:+15165551234" style="color: #666; text-decoration: none; margin: 0 5px;">📞 (516) 555-1234</a> |  */ }