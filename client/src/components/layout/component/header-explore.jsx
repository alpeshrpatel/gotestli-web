import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const HeaderExplore = ({ allClasses }) => {
  const [exploreActive, setExploreActive] = useState(false);
  const { pathname } = useLocation();
  return (
    <>
      <div className={`${allClasses ? allClasses : ""}`}>
        <Link
          to="#"
          onClick={() => setExploreActive((pre) => !pre)}
          className="d-flex items-center text-white"
          data-el-toggle=".js-explore-toggle"
          style={{ fontSize: "14px", color: "black" }}
        >
          <i className="icon icon-explore mr-10"></i>
          Explore
        </Link>

        <div
          className={`explore-content py-25 rounded-8 bg-white toggle-element js-explore-toggle ${
            exploreActive ? "-is-el-visible" : ""
          }`}
        >
          <div className="explore__item">
            <Link
              to="/instructor/home"
              className="d-flex items-center justify-between text-dark-1"
            >
              Home
            </Link>
           
          </div>
          <div className="explore__item">
            <Link
              to="#"
              className="d-flex items-center justify-between text-dark-1"
            >
              Create<div className="icon-chevron-right text-11"></div>
            </Link>
            <div className="explore__subnav rounded-8">
              <Link
                data-barba
                to="/create/question"
                className={pathname == "/create/question" ? "activeMenu" : ""}
                style={{ fontSize: "18px", whiteSpace: "nowrap" }}
              >
                Question{" "}
                {/* <i className="icon-chevron-right text-13 ml-10"></i> */}
              </Link>
              <Link
                data-barba
                to="/create/questionset"
                className={pathname == "/create/questionset" ? "activeMenu" : ""}
                style={{ fontSize: "18px", whiteSpace: "nowrap" }}
              >
                QuestionSet{" "}
                {/* <i className="icon-chevron-right text-13 ml-10"></i> */}
              </Link>
            </div>
          </div>

          <div className="explore__item">
            <Link
              to="#"
              className="d-flex items-center justify-between text-dark-1"
            >
              Upload<div className="icon-chevron-right text-11"></div>
            </Link>
            <div className="explore__subnav rounded-8">
              <Link
                data-barba
                to="/upload/questionset"
                className={pathname == "/upload/questionset" ? "activeMenu" : ""}
                style={{ fontSize: "18px", whiteSpace: "nowrap" }}
              >
                Upload QuestionSet{" "}
                {/* <i className="icon-chevron-right text-13 ml-10"></i> */}
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};
