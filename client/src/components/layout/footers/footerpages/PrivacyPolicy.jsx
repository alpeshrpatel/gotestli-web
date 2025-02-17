import MetaComponent from '@/components/common/MetaComponent';
import Preloader from '@/components/common/Preloader';
import React from 'react';
import Header from '../../headers/Header';
import FooterOne from '../FooterOne';

const metadata = {
    title: " Privacy Policy || GoTestli - Ultimate School & General Purpose Quiz Platform",
    description:
        "Empower learning with GoTestli, the ultimate quiz app designed for schools and beyond. Engage, educate, and excel with our versatile platform, perfect for classrooms and general knowledge challenges.",
};

const PrivacyPolicy = () => {
    const user = JSON.parse(localStorage.getItem("user")) || "";
    const userRole = user.role;
    return (
        <div className="main-content">
            <MetaComponent meta={metadata} />
            <Preloader />

            <Header userRole={userRole} />
            <div className="content-wrapper js-content-wrapper overflow-hidden w-100 " style={{ marginTop: '6%' }}>
                {/* <PageLinks /> */}
                <div className="container-fluid my-5">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <h1 className="text-center mb-4">Privacy Policy of GoTestli</h1>
                            <div
                    className="mb-5 rounded mx-auto"
                    style={{
                      height: "1px",
                      width: "60px",
                      border: "3px solid #5856d6",
                    }}
                  ></div>

                            <p>At GoTestli, accessible from our platform, we are committed to protecting your personal information and your right to privacy. This Privacy Policy document contains types of information that is collected and recorded by GoTestli and how we use it. This policy aligns with the data protection regulations in the United States and India.</p>

                            <h2>1. Information We Collect</h2>
                            <p>We collect different types of information, including but not limited to:</p>
                            <ul>
                                <li>**Personal Information**: Name, email address, and phone number when creating an account.</li>
                                {/* <li>**Usage Data**: Information related to how users interact with our platform, including device information, browser type, and IP address.</li> */}
                                <li>**Question Data**: Instructors can create and upload question sets. These sets are stored securely in our servers.</li>
                            </ul>

                            <h2>2. Use of Collected Information</h2>
                            <p>We use the collected information for the following purposes:</p>
                            <ul>
                                <li>To provide and improve our services.</li>
                                <li>To maintain the security and integrity of the platform.</li>
                                <li>To ensure questions or question sets created by instructors are securely stored and not exposed to any unauthorized individual.</li>
                            </ul>

                            <h2>3. Data Security</h2>
                            <p>We take data privacy and security seriously. Here’s how we ensure the safety of the data:</p>
                            <ul>
                                <li>We implement encryption standards for transmitting and storing data.</li>
                                <li>Questions created by instructors are stored on secure servers, and only the intended recipients (students or authorized personnel) have access to this data.</li>
                                <li>We regularly update our security protocols to comply with industry standards and government regulations in the United States and India.</li>
                            </ul>

                            <h2>4. Sharing of Information</h2>
                            <p>We do not sell, trade, or rent users’ personal information to third parties. Information may be shared under the following circumstances:</p>
                            <ul>
                                <li>**Legal Requirements**: We may disclose your personal information if required by law, such as to comply with a subpoena or similar legal process.</li>
                                <li>**Service Providers**: We may share information with trusted third-party service providers who assist us in operating our platform.</li>
                            </ul>

                            <h2>5. Instructors’ Question Privacy</h2>
                            <p>We understand the privacy concerns of instructors regarding the question sets they create. All question sets are:</p>
                            <ul>
                                <li>Stored securely in encrypted format.</li>
                                <li>Accessible only to authorized users (students or other authorized roles).</li>
                                <li>Not exposed or shared with any third-party entity without the explicit consent of the instructor.</li>
                            </ul>

                            <h2>6. Data Retention</h2>
                            <p>We retain user data for as long as necessary to fulfill the purposes outlined in this Privacy Policy. After the retention period, data will be securely deleted.</p>

                            <h2>7. Your Rights</h2>
                            <p>Depending on your location, you may have the right to:</p>
                            <ul>
                                <li>Request access to your data.</li>
                                <li>Request correction of inaccurate or incomplete data.</li>
                                <li>Request deletion of your personal data.</li>
                                <li>Opt-out of data processing.</li>
                            </ul>

                            <h2>8. Compliance with Laws</h2>
                            <p>We comply with all applicable data protection laws, including:</p>
                            <ul>
                                <li>**United States**: The Federal privacy regulations.</li>
                                <li>**India**: The Information Technology (IT) Act, 2000, and the Personal Data Protection Bill (when applicable).</li>
                            </ul>

                            <h2>9. Changes to this Privacy Policy</h2>
                            <p>We reserve the right to update or change our Privacy Policy at any time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

                            <h2>10. Contact Us</h2>
                            <p>If you have any questions or concerns regarding this Privacy Policy or our practices, feel free to contact us at <span style={{
                                    textDecoration: "underline",
                                    color: "blue",
                                    textAlign: "center",
                                    fontSize:'16px'
                                }}>
                                <a href="mailto:gotestli07@gmail.com" >gotestli07@gmail.com</a>  </span> .</p>

                        </div>
                    </div>
                </div>

                {/* <TestimonialsOne />
            <Instructors />
            <Brands /> */}

                <FooterOne />
            </div>
        </div>

    );
};

export default PrivacyPolicy;
