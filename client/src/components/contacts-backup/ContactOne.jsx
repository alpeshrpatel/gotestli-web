import React, { useState, useEffect } from "react";

import { contactData } from "@/data--backup/contactLinks";

import MapComponent from "./Map";
import { useNavigate } from "react-router-dom";
import { API } from "@/utils/AxiosInstance";
import { toast } from "react-toastify";
import { showToast } from "@/utils/toastService";

export default function ContactOne() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleFormChange = (e) => {
    const target = e.target;
    setFormData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleMessageClick = async () => {
    try {
      const  data  = await API.post("/api/contact/messages", formData );
      
      if(data.status == 200){
        showToast("success",'Message Sent!')
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
                    onClick={ handleMessageClick}
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
