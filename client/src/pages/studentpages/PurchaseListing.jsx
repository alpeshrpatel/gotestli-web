import Preloader from "@/components/common/Preloader";
import CourceCard from "@/components/homes/courseCards/CourseCard";
import Header from "@/components/layout/headers/Header";
import { API } from "@/utils/AxiosInstance";
import React, { useEffect, useState } from "react";

const PurchaseListing = () => {
  const [purchases, setPurchases] = useState([]);
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userRole = user.role;
  const userId = user.id;
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function getPurchases() {
      try {
        if (token) {
          const { data } = await API.get(
            `/api/whitelisted/questionset/purchases/user/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(data);
          setPurchases(data);
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
    }
    getPurchases();
  }, []);
  return (
    <div>
      <Header userRole={userRole} />
      <div
        className="content-wrapper js-content-wrapper overflow-hidden"
        style={{ marginTop: "14vh" }}
      >
        <h2 className=" mt-50 text-center">Your Purchases</h2>
        <div className="pt-40 m-auto row y-gap-30 w-75 pl-0 pr-0">
          {Array.isArray(purchases) ? (
            Array.isArray(purchases) &&
            purchases?.map((item, index) => (
              <CourceCard
                view={"card"}
                role={userRole}
                key={index}
                data={item}
                index={index}
                data-aos="fade-right"
                data-aos-duration={(index + 1) * 300}
              />
            ))
          ) : (
            <h4 className="no-content text-center mt-8">
              No Purchases Found. Buyout Amazing Quizzes!
            </h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseListing;
