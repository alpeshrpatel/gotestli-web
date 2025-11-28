import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const HeaderExplore = ({ allClasses }) => {
  const [exploreActive, setExploreActive] = useState(false);
  const { pathname } = useLocation();
  const linkRef = React.useRef(null);

  useEffect(() => {
          const handleClick = (event) => {
              if (linkRef.current && linkRef.current.contains(event.target)) {
                  return;
              }
              setExploreActive((prev) => {
                  if (prev) {
                      return false;
                  }
                  // return prev;
              });
          };
          window.addEventListener('click', handleClick);
          return () => {
              window.removeEventListener('click', handleClick);
          };
      }, []);
  
  return (
    <>
      <div className={`${allClasses ? allClasses : ""}`} style={{fontSize: "14px"}}>
        <Link
        ref={linkRef}
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
                style={{ whiteSpace: "nowrap" }}
              >
                Question{" "}
                {/* <i className="icon-chevron-right text-13 ml-10"></i> */}
              </Link>
              <Link
                data-barba
                to="/create/questionset"
                className={pathname == "/create/questionset" ? "activeMenu" : ""}
                style={{ whiteSpace: "nowrap" }}
              >
                QuestionSet{" "}
                {/* <i className="icon-chevron-right text-13 ml-10"></i> */}
              </Link>
              <Link
                data-barba
                to="/create/gamequiz"
                className={pathname == "/create/gamequiz" ? "activeMenu" : ""}
                style={{ whiteSpace: "nowrap" }}
              >
                Game Quiz{" "}
                {/* <i className="icon-chevron-right text-13 ml-10"></i> */}
              </Link>
            </div>
          </div>

          <div className="explore__item" style={{fontSize: "14px"}}>
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
                style={{  whiteSpace: "nowrap" }}
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
