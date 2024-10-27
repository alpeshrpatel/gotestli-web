import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MobileFooter from "./MobileFooter";
import { auth, db } from "@/firebase/Firebase";
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { menuList } from "@/data--backup/menu";
import { useLocation } from "react-router-dom";

export default function Menu({ allClasses, headerPosition }) {
  const [menuItem, setMenuItem] = useState("");
  const [submenu, setSubmenu] = useState("");
  //const [userRole, setUserRole] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    menuList.forEach((elm) => {
      elm?.links?.forEach((elm2) => {
        if (elm2.href?.split("/")[1] == pathname.split("/")[1]) {
          setMenuItem(elm.title);
        } else {
          elm2?.links?.map((elm3) => {
            if (elm3.href?.split("/")[1] == pathname.split("/")[1]) {
              setMenuItem(elm.title);
              setSubmenu(elm2.title);
            }
          });
        }
      });
    });
  //   async function checkUserRole() {
  //     if (auth.currentUser) {
  //       const userId = auth.currentUser.uid;
  //       const docRef = doc(db, "roles", userId);
  //       const docSnap = await getDoc(docRef);

  //       if (docSnap.exists()) {
  //         setUserRole(docSnap.data().role);
  //         console.log(docSnap.data().role);
  //       } else {
  //         console.log("No role found for this user");
  //       }
  //     } else {
  //       console.log("No user is logged in");
  //     }
  //   }
  //   checkUserRole();
   }, []);
  const user = JSON.parse( localStorage.getItem('user')) || '';
  const userRole = user.role;

  return (
    <div
      className={`header-menu js-mobile-menu-toggle  ${
        headerPosition ? headerPosition : ""
      }`}
      style={{
        marginTop: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <div className="header-menu__content">
        <div className="mobile-bg js-mobile-bg"></div>

        <div className="d-none xl:d-flex items-center px-20 py-20 border-bottom-light">
          <Link to="/login" className="text-dark-1">
            Log in
          </Link>
          <Link to="/signup" className="text-dark-1 ml-30">
            Sign Up
          </Link>
        </div>

        <div className="menu js-navList">
          <ul
            className={`${allClasses ? allClasses : ""}`}
            style={{ paddingLeft: 0, display: "flex", gap: "15px" }}
          >
            <li className="menu-item-has-children">
              <Link
                data-barba
                to={`${userRole == 'admin' ? `/admin/dashboard` :( (userRole == 'instructor') ? `/instructor/home` : `/`) }`}
                className={menuItem == "Home" ? "activeMenu" : ""}
                style={{ fontSize: "18px" }}
              >
                Home <i className="icon-chevron-right text-13 ml-10"></i>
              </Link>

              {/* <ul className="subnav" style={{ fontSize: "18px" }}>
                <li className="menu__backButton js-nav-list-back text-black">
                  <Link to="#" className="text-reset">
                    <i className="icon-chevron-left text-13 mr-10"></i> Home
                  </Link>
                </li>

                {menuList[0].links.map((elm, i) => (
                  <li
                    key={i}
                    className={
                      pathname.split("/")[1] == elm.href.split("/")[1]
                        ? "activeMenu"
                        : "inActiveMenu"
                    }
                  >
                    <Link to={elm.href}>{elm.label}</Link>
                  </li>
                ))}
              </ul> */}
            </li>

            {/* {userRole == "student" && (
              <li className="menu-item-has-children -has-mega-menu">
                <Link
                  data-barba
                  to="#"
                  className={menuItem == "Quizzes" ? "activeMenu" : ""}
                  style={{ fontSize: "18px" }}
                >
                  Quizzes <i className="icon-chevron-right text-13 ml-10"></i>
                </Link>

                <div
                  className="mega xl:d-none"
                  style={{ fontSize: "18px", width: "80vw" }}
                >
                  <div className="mega__menu">
                    <div className="row x-gap-40">
                      <div className="col">
                        <h4 className="text-17 fw-500 mb-20 text-black">
                          Quiz List Layouts
                        </h4>

                        <ul className="mega__list">
                          {menuList[1].links[0].links.map((elm, i) => (
                            <li
                              key={i}
                              className={
                                pathname.split("/")[1] == elm.href.split("/")[1]
                                  ? "activeMenu"
                                  : "inActiveMegaMenu"
                              }
                            >
                              <Link data-barba to={elm.href}>
                                {elm.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="col">
                        <h4 className="text-17 fw-500 mb-20 text-black">
                          Quiz Single Layouts
                        </h4>

                        <ul className="mega__list">
                          {menuList[1].links[1].links.map((elm, i) => (
                            <li
                              key={i}
                              className={
                                pathname.split("/")[1] == elm.href.split("/")[1]
                                  ? "activeMenu"
                                  : "inActiveMegaMenu"
                              }
                            >
                              <Link data-barba to={elm.href}>
                                {elm.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="col">
                        <h4 className="text-17 fw-500 mb-20 text-black">
                          About Quizzes
                        </h4>

                        <ul className="mega__list">
                          {menuList[1].links[2].links.map((elm, i) => (
                            <li
                              key={i}
                              className={
                                pathname.split("/")[1] == elm.href.split("/")[1]
                                  ? "activeMenu"
                                  : "inActiveMegaMenu"
                              }
                            >
                              <Link data-barba to={elm.href}>
                                {elm.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="col">
                        <h4 className="text-17 fw-500 mb-20 text-black">
                          Popular Quizzes
                        </h4>

                        <ul className="mega__list">
                          {menuList[1].links[3].links.map((elm, i) => (
                            <li
                              key={i}
                              className={
                                pathname.split("/")[1] == elm.href.split("/")[1]
                                  ? "activeMenu"
                                  : "inActiveMegaMenu"
                              }
                            >
                              <Link data-barba to={elm.href}>
                                {elm.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* <div className="mega-banner bg-purple-1 ml-40">
                    <div className="text-24 lh-15 text-white fw-700">
                      Join more than
                      <br />
                      <span className="text-green-1">8 million learners</span>
                      worldwide
                    </div>
                    <Link
                      to="#"
                      className="button -md -green-1 text-dark-1 fw-500 col-12"
                    >
                      Start Learning For Free
                    </Link>
                  </div> 
                  </div>
                </div>
              </li>
            )} */}
            {userRole == "instructor" && (
              <>
              <li className="menu-item-has-children">
                <Link
                  data-barba
                  to="/create/questionset"
                  className={
                    menuItem == "Create QuestionSet" ? "activeMenu" : ""
                  }
                  style={{ fontSize: "18px" }}
                >
                  Create QuestionSet{" "}
                  <i className="icon-chevron-right text-13 ml-10"></i>
                </Link>
                {/* <ul className="subnav">
                <li className="menu__backButton js-nav-list-back">
                  <Link to="#">
                    <i className="icon-chevron-left text-13 mr-10"></i> Events
                  </Link>
                </li>

                {menuList[2].links.map((elm, i) => (
                  <li
                    key={i}
                    className={
                      pathname.split("/")[1] == elm.href.split("/")[1]
                        ? "activeMenu"
                        : "inActiveMenu"
                    }
                  >
                    <Link data-barba to={elm.href}>
                      {elm.label}
                    </Link>
                  </li>
                ))}
              </ul> */}
              </li>
              <li className="menu-item-has-children">
              <Link
                data-barba
                to="/upload/questionset"
                className={
                  menuItem == "Create QuestionSet" ? "activeMenu" : ""
                }
                style={{ fontSize: "18px" }}
              >
                Upload QuestionSet{" "}
                <i className="icon-chevron-right text-13 ml-10"></i>
              </Link>
              
            </li>
              </>
            )}

            {/* <li className="menu-item-has-children">
              <Link
                data-barba
                to="#"
                className={menuItem == "Blogs" ? "activeMenu" : ""}
                style={{fontSize:'18px'}}
              >
                Blog <i className="icon-chevron-right text-13 ml-10"></i>
              </Link>
              <ul className="subnav">
                <li className="menu__backButton js-nav-list-back">
                  <Link to="#">
                    <i className="icon-chevron-left text-13 mr-10"></i> Blog
                  </Link>
                </li>

                {menuList[4].links.map((elm, i) => (
                  <li
                    key={i}
                    className={
                      pathname.split("/")[1] == elm.href.split("/")[1]
                        ? "activeMenu"
                        : "inActiveMenu"
                    }
                  >
                    <Link data-barba to={elm.href}>
                      {elm.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            <li className="menu-item-has-children">
              <Link
                data-barba
                to="#"
                className={menuItem == "Pages" ? "activeMenu" : ""}
                style={{fontSize:'18px'}}
              >
                Pages <i className="icon-chevron-right text-13 ml-10"></i>
              </Link>

              <ul className="subnav">
                <li className="menu__backButton js-nav-list-back">
                  <Link to="#">
                    <i className="icon-chevron-left text-13 mr-10"></i> Pages
                  </Link>
                </li>
                <li className="menu-item-has-children">
                  <Link
                    to="#"
                    className={
                      submenu == "About Us" ? "activeMenu" : "inActiveMenu"
                    }
                  >
                    About Us<div className="icon-chevron-right text-11"></div>
                  </Link>

                  <ul className="subnav">
                    <li className="menu__backButton js-nav-list-back">
                      <Link to="#">
                        <i className="icon-chevron-left text-13 mr-10"></i>
                        About Us
                      </Link>
                    </li>

                    {menuList[5].links[0].links.map((elm, i) => (
                      <li
                        key={i}
                        className={
                          pathname.split("/")[1] == elm.href.split("/")[1]
                            ? "activeMenu"
                            : "inActiveMenu"
                        }
                      >
                        <Link key={i} data-barba to={elm.href}>
                          {elm.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="menu-item-has-children">
                  <Link
                    to="#"
                    className={
                      submenu == "Contact" ? "activeMenu" : "inActiveMenu"
                    }
                    
                  >
                    Contact<div className="icon-chevron-right text-11"></div>
                  </Link>
                  <ul className="subnav">
                    <li className="menu__backButton js-nav-list-back">
                      <Link to="#" style={{fontSize:'18px'}}>
                        <i className="icon-chevron-left text-13 mr-10"></i>
                        Contact
                      </Link>
                    </li>

                    {menuList[5].links[1].links.map((elm, i) => (
                      <li
                        key={i}
                        className={
                          pathname.split("/")[1] == elm.href.split("/")[1]
                            ? "activeMenu"
                            : "inActiveMenu"
                        }
                      >
                        <Link key={i} data-barba to={elm.href}>
                          {elm.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="menu-item-has-children">
                  <Link
                    to="#"
                    className={
                      submenu == "Shop" ? "activeMenu" : "inActiveMenu"
                    }
                  >
                    Shop<div className="icon-chevron-right text-11"></div>
                  </Link>
                  <ul className="subnav">
                    <li className="menu__backButton js-nav-list-back">
                      <Link to="#">
                        <i className="icon-chevron-left text-13 mr-10"></i> Shop
                      </Link>
                    </li>

                    {menuList[5].links[2].links.map((elm, i) => (
                      <li
                        key={i}
                        className={
                          pathname.split("/")[1] == elm.href.split("/")[1]
                            ? "activeMenu"
                            : "inActiveMenu"
                        }
                      >
                        <Link key={i} data-barba to={elm.href}>
                          {elm.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>

                {menuList[5].links
                  .filter((el) => el.href)
                  .map((elm, i) => (
                    <li
                      key={i}
                      className={
                        pathname.split("/")[1] == elm.href.split("/")[1]
                          ? "activeMenu"
                          : "inActiveMenu"
                      }
                    >
                      <Link key={i} data-barba to={elm.href}>
                        {elm.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </li> */}

            {/* <li>
              <Link
                data-barba
                to="/contact-1"
                className={
                  pathname == "/contact-1" ? "activeMenu" : "inActiveMenuTwo"
                }
                style={{ fontSize: "18px" }}
              >
                Contact
              </Link>
            </li> */}
          </ul>
        </div>

        {/* mobile footer start */}
        <MobileFooter />
        {/* mobile footer end */}
      </div>

      <div
        className="header-menu-close"
        data-el-toggle=".js-mobile-menu-toggle"
      >
        <div className="size-40 d-flex items-center justify-center rounded-full bg-white">
          <div className="icon-close text-dark-1 text-16"></div>
        </div>
      </div>

      <div className="header-menu-bg"></div>
    </div>
  );
}
