import MetaComponent from "@/components/common/MetaComponent";
import PaymentComponent from "@/components/common/PaymentComponent";
import Paypal from "@/components/common/PayPal";
import Preloader from "@/components/common/Preloader";
import Header from "@/components/layout/headers/Header";
import { API } from "@/utils/AxiosInstance";
import { showToast } from "@/utils/toastService";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// const pageMetadata = {
//   title: "My Purchased Quizzes - GoTestli Student Portal | Access Your Bought Quiz Collection",
//   description: "Access your purchased quiz collection on GoTestli. View all quizzes you've bought, track your progress, retake assessments, and manage your paid educational content. Get the most out of your quiz investments.",
//   keywords: "purchased quizzes gotestli, bought quizzes, my quiz purchases, paid quizzes, quiz collection, student purchases, owned quizzes, quiz library, purchased assessments, quiz transactions, student quiz inventory, bought educational content",
//   canonical: "https://gotestli.com/student/purchased-quizzes",
//   category: "Student Purchases",
//   subject: "Purchased Quizzes, Quiz Collection, Student Purchases, Paid Content",
//   audience: "Students, Quiz Purchasers, Learners, Educational Content Buyers"
// };
const pageMetadata = {
  title: "My Purchased Quizzes – GoTestli: Access Your Bought Learning & Trivia Quizzes",
  description:
    "Explore your purchased quizzes on GoTestli, the best quiz app for learning and trivia. Access your bought quizzes, track progress, retake engaging assessments, and manage your paid educational content with our powerful quiz platform.",
  keywords:
    "best quiz app for learning, quiz app for trivia, purchased quizzes gotestli, bought quizzes, my quiz purchases, paid quizzes, quiz collection, student purchases, owned quizzes, quiz library, purchased assessments, quiz transactions, student quiz inventory, bought educational content, best quiz maker app",
  canonical: "https://gotestli.com/student/purchased-quizzes",
  category: "Student Purchases, Quiz Collection, E-Learning Platform",
  subject: "Purchased Quizzes, Quiz Library, Learning Content, Student Paid Assessments",
  audience: "Students, Quiz Purchasers, Learners, Educational Content Buyers, Trivia Enthusiasts"
};

const PurchasePage = () => {
  const [checkOut, setCheckOut] = useState(false);
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userId = user.id;
  const userRole = user.role;
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const { qset } = location.state;
  const handlePurchase = async () => {
    // setCheckOut(true)
    try {
      if (token) {
        const response = await API.post(
          "/api/users/purchases",
          { questionSetId: qset.id, userId: userId, insId: qset.created_by },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status == 200) {
          showToast("success","Purchase Made Successfully!");
        }
      }
    } catch (error) {
      if (error.status == 403) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // showToast("error","Invaild token!");
        navigate("/login");
        return;
      }
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="barba-container" data-barba="container">
      <MetaComponent meta={pageMetadata} />
      <main className="main-content">
        <Preloader />
        <Header userRole={userRole} />
        <div
          className="content-wrapper js-content-wrapper overflow-hidden"
          style={{ marginTop: "20vh",display:'flex', justifyContent:'center',gap:'100px' }}
        >
           (
            <>
            <div style={{display:'flex', flexDirection:'column', gap:'20px',width:'50%'}}>
            <PaymentComponent qset={qset}/>
              {/* <button
                className="button -sm px-24 py-25 -outline-red-3 text-red-3 text-16 fw-bolder lh-sm mb-4"
                onClick={handlePurchase}
              >
                Purchase
              </button> */}
              <button
                className="button -sm px-24 py-25 -outline-red-3 text-red-3 text-16 fw-bolder lh-sm"
                onClick={() => navigate("/")}
              >
                Back
              </button>
            </div>
              
            </>
          )
        </div>
      </main>
    </div>
  );
};

export default PurchasePage;
