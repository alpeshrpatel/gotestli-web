import Preloader from "@/components/common/Preloader";
import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import { API } from "@/utils/AxiosInstance";
import { showToast } from "@/utils/toastService";
import React, { useState } from "react";

const OrgOnboardingForm = () => {
    const [formData, setFormData] = useState({
        organizationName: "",
        email: "",
        phoneNumber: "",
        address: "",
        logoUrl: "",
        websiteUrl: "",
    });

    const user = JSON.parse(localStorage.getItem("user")) || "";
    const userRole = user.role;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const { data } = await API.post(`/api/org/`, formData);

            if (data) {
                showToast("success", "Onboarding Request Received!");
            } else {
                showToast("error", "Error in Onboarding Process!");
            }

        } catch (error) {
            showToast("error", error.message);
        }
        setFormData({
            organizationName: "",
            email: "",
            phoneNumber: "",
            address: "",
            logoUrl: "",
            websiteUrl: ""
        })
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Preloader />
            <Header userRole={userRole} />
            <div className="content-wrapper js-content-wrapper overflow-hidden w-100 " style={{ marginTop: '150px',flex: 1 }}>
                <div className="row align-items-center mx-5">
                    {/* Left Section - Description */}
                    <div className="col-md-6 text-center text-md-start">
                        <h2>Welcome to GoTestli Business Onboarding</h2>
                        <p className="text-muted">
                            Join GoTestli to streamline your organization's learning and assessment process.
                            Our platform empowers businesses with:
                        </p>
                        <ul className="list-unstyled">
                            <li>✅ Customized quizzes</li>
                            <li>✅ Progress tracking</li>
                            <li>✅ Detailed analytics</li>
                            <li>✅ Seamless integrations</li>
                        </ul>
                        <p className="text-muted">Trusted by leading organizations worldwide.</p>
                        {/* <div className="d-flex justify-content-center justify-content-md-start">
                           
                            <img src="trusted-logo-1.png" alt="Trusted 1" className="me-2" width="80" />
                            <img src="trusted-logo-2.png" alt="Trusted 2" className="me-2" width="80" />
                        </div> */}
                    </div>


                    <div className="col-md-6">
                        <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm" style={{ background: "#fff" }}>
                            <div className="mb-3">
                                <label className="form-label" style={{
                                    marginBottom: "5px",
                                    fontWeight: "600",
                                    color: "#333",
                                    fontSize: "14px",
                                }}>Organization Name</label>
                                <input type="text" className="form-control" style={{
                                    padding: "10px",
                                    border: "1px solid #ced4da",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    outline: "none",
                                    backgroundColor: "#f8f9fa",
                                    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                                }} name="organizationName" value={formData.organizationName} onChange={handleChange} required />
                                {/* <label
                      htmlFor="email"
                      style={{
                        marginBottom: "5px",
                        fontWeight: "600",
                        color: "#333",
                        fontSize: "14px",
                      }}
                    >
                      Email
                    </label>
                    <input
                      required
                      type="text"
                      name="email"
                      id="email"
                      style={{
                        padding: "10px",
                        border: "1px solid #ced4da",
                        borderRadius: "8px",
                        fontSize: "14px",
                        outline: "none",
                        backgroundColor: "#f8f9fa",
                        boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                      }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}

                    /> */}
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{
                                    marginBottom: "5px",
                                    fontWeight: "600",
                                    color: "#333",
                                    fontSize: "14px",
                                }}>Email</label>
                                <input type="email" className="form-control" style={{
                                    padding: "10px",
                                    border: "1px solid #ced4da",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    outline: "none",
                                    backgroundColor: "#f8f9fa",
                                    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                                }} name="email" value={formData.email} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{
                                    marginBottom: "5px",
                                    fontWeight: "600",
                                    color: "#333",
                                    fontSize: "14px",
                                }}>Phone Number</label>
                                <input type="tel" className="form-control" style={{
                                    padding: "10px",
                                    border: "1px solid #ced4da",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    outline: "none",
                                    backgroundColor: "#f8f9fa",
                                    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                                }} name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{
                                    marginBottom: "5px",
                                    fontWeight: "600",
                                    color: "#333",
                                    fontSize: "14px",
                                }}>Address</label>
                                <input type="text" className="form-control" style={{
                                    padding: "10px",
                                    border: "1px solid #ced4da",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    outline: "none",
                                    backgroundColor: "#f8f9fa",
                                    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                                }} name="address" value={formData.address} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{
                                    marginBottom: "5px",
                                    fontWeight: "600",
                                    color: "#333",
                                    fontSize: "14px",
                                }}>Organization Logo URL</label>
                                <input type="url" className="form-control" style={{
                                    padding: "10px",
                                    border: "1px solid #ced4da",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    outline: "none",
                                    backgroundColor: "#f8f9fa",
                                    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                                }} name="logoUrl" value={formData.logoUrl} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" style={{
                                    marginBottom: "5px",
                                    fontWeight: "600",
                                    color: "#333",
                                    fontSize: "14px",
                                }}>Organization Website URL</label>
                                <input type="text" className="form-control" style={{
                                    padding: "10px",
                                    border: "1px solid #ced4da",
                                    borderRadius: "8px",
                                    fontSize: "14px",
                                    outline: "none",
                                    backgroundColor: "#f8f9fa",
                                    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                                }} name="websiteUrl" value={formData.websiteUrl} onChange={handleChange} required />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Get Started</button>
                        </form>
                    </div>
                </div>
              
            </div>
              <FooterOne />                    
        </div>

    );
};

export default OrgOnboardingForm;
