import React, { useEffect } from "react";
import { useState } from "react";
import { HeaderExplore } from "../component/header-explore";
import SearchToggle from "../component/SearchToggle";
import CartToggle from "../component/CartToggle";
import Menu from "../component/Menu";
import { Link, useLocation } from "react-router-dom";
import MobileMenu from "../component/MobileMenu";
import { auth } from "@/firebase/Firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { menuList } from "@/data/menu";

export default function Header() {
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [menuItem, setMenuItem] = useState("");
  const [submenu, setSubmenu] = useState("");
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
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Logout Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
      <header className="header -type-1 ">
        <div className="header__container">
          <div className="row justify-between items-center">
            <div className="col-auto">
              <div className="header-left">
                <div className="header__logo ">
                  <Link to="/">
                    <img src="/assets/img/general/logo.svg" alt="logo" />
                  </Link>
                </div>

                {/* header explore start */}
                {/* <HeaderExplore
                  allClasses={
                    "header__explore text-green-1 ml-60 xl:ml-30 xl:d-none"
                  }
                /> */}
                {/* header explore end */}
              </div>
            </div>

            <Menu allClasses={"menu__nav text-white -is-active"} />
            <MobileMenu
              setActiveMobileMenu={setActiveMobileMenu}
              activeMobileMenu={activeMobileMenu}
              user={user}
              handleSignOut= {handleSignOut}
            />

            <div className="col-auto">
              <div className="header-right d-flex items-center">
                <div className="header-right__icons text-white d-flex items-center mt-2">
                  {/* search toggle start */}
                  <SearchToggle />
                  {/* search toggle end */}

                  {/* cart toggle start */}
                  <CartToggle
                    parentClassess={"relative ml-30 mr-30 xl:ml-20"}
                    allClasses={"d-flex items-center text-white"}
                  />
                  {/* cart toggle end */}

                  <div className="d-block d-xl-none ml-20" style={{margin:'4px', right:'0vw',color:'white !important'}}>
                    <button
                      onClick={() => setActiveMobileMenu(true)}
                      className="text-white items-center"
                      data-el-toggle=".js-mobile-menu-toggle"   
                    >
                      <i className="text-11 icon icon-mobile-menu"></i>
                    </button>
                  </div>
                </div>

                <div className="d-none d-xl-block">
                  {user ? (
                    <div className=" d-flex justify-space-between items-center mt-2" style={{margin:'0 8vw'}}>
                      {/* <h5 className="text-white ml-30   ">
                        {user.displayName}
                      </h5> */}
                      <div className="mt-3">
                        <div
                          className={`header-menu js-mobile-menu-toggle left-alignment`}
                          style={{ fontSize:'18px' }}
                        >
                          <div className="header-menu__content" >
                            <div className="menu js-navList" >
                              <ul className={"menu__nav text-white -is-active"} >
                                <li className="menu-item-has-children -has-mega-menu" >
                                  <Link
                                    data-barba
                                    to="#"
                                    className={
                                      menuItem == "User Profile"
                                        ? "activeMenu"
                                        : ""
                                    }
                                  >
                                    {user.displayName?.split(' ')[0]}
                                    <i className="icon-chevron-right text-13 ml-10"></i>
                                  </Link>
                                  <div className="mega " style={{fontSize:'18px',width:'30vw',overflow:'auto'}} >
                                    <div className="mega__menu"  >
                                      <div className="row x-gap-40">
                                        <div className="col" >
                                          <h4
                                            className="text-17 fw-500 mb-20"
                                            style={{ color: "black" }}
                                          >
                                            Dashboard Pages
                                          </h4>

                                          <ul className="mega__list" >
                                            {menuList[2].links[0].links.map(
                                              (elm, i) => (
                                                <li
                                                  key={i}
                                                  className={
                                                    pathname?.split("/")[1] ==
                                                    elm.href?.split("/")[1]
                                                      ? "activeMenu"
                                                      : "inActiveMegaMenu"
                                                  }
                                                >
                                                  <Link
                                                    data-barba
                                                    to={elm.href}
                                                  >
                                                    {elm.label}
                                                  </Link>
                                                </li>
                                              )
                                            )}
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="d-none d-xl-flex " style={{position:"absolute", right:0}} >
                        <button
                          className="button -sm -white text-dark-1 "
                          onClick={handleSignOut}
                        >
                          Logout
                        </button>

                        
                      </div>
                    </div>
                  ) : (
                    <div className="header-right__buttons d-flex items-center ml-30 md:d-none">
                      <Link
                        to="/login"
                        className="button -underline text-white"
                      >
                        Log in
                      </Link>
                      <Link
                        to="/signup"
                        className="button -sm -white text-dark-1 ml-30"
                      >
                        Sign up
                      </Link>{" "}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
