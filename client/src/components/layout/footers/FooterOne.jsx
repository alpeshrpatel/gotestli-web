import React, { useState } from "react";
import { Link } from "react-router-dom";
import Socials from "@/components/common/Socials";
import FooterLinks from "../component/FooterLinks";
import Links from "../component/Links";
import { API } from "@/utils/AxiosInstance";
import { toast } from "react-toastify";
export default function FooterOne() {
  const [email, setEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmitClick = async () => {
    try {
      setIsDisabled(true);
      const data = await API.post("/api/waitinglist", { email: email });
      if (data.status == 200) {
        const res = await API.post("/api/sendemail/getintouch/subscribed", {
          email: email,
        });
        if (res.status == 200) {
          toast.success("Subscribed!");
        }
      }
      setIsDisabled(false);
    } catch (error) {
      if (error.status == 500) {
        toast.error("Already Subscribed!");
      }
      console.error(error);
      setIsDisabled(false);
    }
  };
  return (
    <footer className="footer -type-1 bg-dark-1 -green-links">
      <div className="container-fluid w-75">
        <div className="footer-header">
          <div className="row y-gap-20 justify-between items-center">
            <div className="col-auto">
              <div className="footer-header__logo">
                <img
                  src="/assets/img/header-logo3.png"
                  alt="logo"
                  style={{ height: "55px", width: "185px" }}
                />
              </div>
            </div>
            <div className="col-auto">
              <div className="footer-header-socials">
                <div className="footer-header-socials__title text-white">
                  Follow us on social media
                </div>
                <div className="footer-header-socials__list">
                  <Socials />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-columns">
          <div className="row y-gap-30 d-flex justify-content-evenly">
            <FooterLinks
              allClasses={"text-17 fw-500 text-white uppercase mb-25"}
            />

            <div className="col-xl-4 col-lg-4 col-md-6">
              <div className="text-17 fw-500 text-white uppercase mb-25">
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
        </div>

        <div className="py-30 border-top-light-15">
          <div className="row justify-between items-center y-gap-20">
            <div className="col-auto">
              <div className="d-flex items-center h-100 text-white">
                © {new Date().getFullYear()} GoTestli. All Right Reserved.
              </div>
            </div>

            <div className="col-auto">
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
        </div>
      </div>
    </footer>
  );
}
