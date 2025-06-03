import React, { useEffect } from "react";
import { useState } from "react";
import SearchToggle from "../component/SearchToggle";
import CartToggle from "../component/CartToggle";
import Menu from "../component/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MobileMenu from "../component/MobileMenu";
import { auth } from "@/firebase/Firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { menuList } from "@/data--backup/menu";
import { Button, IconButton, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CancelIcon from "@mui/icons-material/Cancel";
import CartButton from "@/components/common/CartButton";
import SearchHeader from "./SearchHeader";
import { HeaderExplore } from "../component/header-explore";
import BusinessIcon from '@mui/icons-material/Business';
import StudyMaterialMegamenu from "../component/StudyMaterialMegamenu";

export default function Header({ userRole }) {
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const [user, setUser] = useState(null);
  const [menuItem, setMenuItem] = useState("");
  const [submenu, setSubmenu] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [wishlistCount, setWishlistCount] = useState(
    localStorage.getItem("wishlist") || 0
  );
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  // Function to toggle theme and persist to localStorage
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };
  const { pathname } = useLocation();
  const navigate = useNavigate();

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
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    // Listen for changes to localStorage (e.g., wishlist updates)
    const handleStorageChange = (event) => {
      if (event.key === "wishlist") {
        setWishlistCount(parseInt(localStorage.getItem("wishlist")) || 0);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);


  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);
  // Update wishlist count in real-time from other components or actions
  useEffect(() => {
    const handleStorageChange = () => {
      setWishlistCount(parseInt(localStorage.getItem("wishlist")) || 0);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("wishlist");
      localStorage.removeItem("org");
      // console.log("Logout Successfully");
      window.location.reload();
    } catch (error) {
      // console.log(error);
    }
  };

  const handleSearch = () => { };

  const handleKeyDown = (e) => {
    // console.log(e.target.value);
    if (e.key === "Enter") {
      // console.log("enter clicked");
      setSearchTerm(e.target.value);
      navigate("/search/result", { state: { keyword: e.target.value } });
    }
  };

  return (
    <>
      <header className="header -type-1 ">
        <div
          className={`header__container`}
          style={{
            paddingX: isSmallScreen ? "0px" : "20px",
            margin: isSmallScreen ? " 0 0px" : "0 20px",
          }}
        >
          {/* <div className="row justify-between items-center"> */}
          {/* <div className="d-flex align-items-center w-50 ">
            <div className="header-left">
              <div className="header__logo" style={{}}>
                <Link to="/">
                  <img
                    src="/assets/img/header-logo3.png"
                    alt="logo"
                    style={{ height: "55px", width: "185px" }}
                  />
                </Link>
              </div>
            </div>
            <div>
              <Menu allClasses={"menu__nav text-white -is-active "} />
            </div> */}
          {/* <div className="header-left d-flex align-items-center">
          <div className="header__logo">
            <Link to="/">
              <img
                src="/assets/img/header-logo3.png"
                alt="logo"
                style={{ height: "55px", width: "185px" }}
              />
            </Link>
          </div>
          <div className="ms-20">
            <Menu allClasses={"menu__nav text-white -is-active"} />
          </div>
        </div>
            </div> */}
          <div
            className={` ${isSmallScreen
              ? `d-flex gap-4 `
              : `row justify-content-between align-items-center`
              } `}
          >
            <div className="col-auto d-flex align-items-center ">
              <div className="header__logo">
                <Link to="/">
                  <img
                    src="/assets/img/header-logo3.png"
                    alt="logo"
                    style={{
                      height: "auto",
                      width: "80%",
                      maxWidth: isSmallScreen ? `100px` : `120px`,
                    }}
                  />
                </Link>
              </div>
            </div>
            {/* <div className="d-flex   ">
            <HeaderExplore/>
            </div> */}

            <div className="col-auto d-flex align-items-center  ">
              {
                userRole == 'instructor' ? (
                  <div style={{ position: "absolute", left: '200px', display: isSmallScreen ? 'none' : 'flex', gap: '20px', alignItems: 'center' }}>
                    <HeaderExplore />
                    <div className="d-flex align-items-center">
                      <StudyMaterialMegamenu />
                    </div>
                  </div>

                ) : (
                  <Menu allClasses={"menu__nav text-white -is-active "} />
                )
              }
              {/* <Menu allClasses={"menu__nav text-white -is-active "} /> */}
            </div>
            {userRole !== "instructor" && userRole !== 'admin' && (
              // isSmallScreen ? (
              //   <div className="relative "> <SearchHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleKeyDown={handleKeyDown}/></div>
              // ) : (
              <SearchHeader
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleKeyDown={handleKeyDown}
              />
              // )

              // <div className="w-25 d-flex align-items-center justify-content-center">
              //   <div
              //     className="header-search__field d-flex items-center align-items-center rounded-5 "
              //     style={{ height: "10px" }}
              //   >
              //     <div className="icon icon-search text-dark-1 ml-8 d-flex items-center"></div>
              //     <input
              //       required
              //       type="text"
              //       value={searchTerm}
              //       className="px-5 py-2 text-18 lh-12 text-dark-1 fw-500 "
              //       placeholder="What do you want ?"
              //       onChange={(e) => setSearchTerm(e.target.value)}
              //       onKeyDown={handleKeyDown}
              //     />
              //     {/* <TextField id="outlined-search" label="Search Questions" type="search" className="searchInput mb-2" /> */}

              //     <button
              //       // onClick={() => setActiveSearch(false)}
              //       className="d-flex items-center align-items-center justify-center size-20 rounded-full bg-purple-3 mr-8"
              //       data-el-toggle=".js-search-toggle"
              //     >
              //       <CancelIcon
              //         fontSize="medium"
              //         onClick={() => setSearchTerm("")}
              //       />
              //     </button>
              //   </div>
              // </div>
            )}

            <MobileMenu
              setActiveMobileMenu={setActiveMobileMenu}
              activeMobileMenu={activeMobileMenu}
              userRole={userRole}
              handleSignOut={handleSignOut}
              isSmallScreen={isSmallScreen}
            />

            <div className="col-auto">
              <div className="header-right d-flex items-center">
                <div className="header-right__icons text-white d-flex items-center mt-2 gap-4">
                  {/* search toggle start */}
                  {/* <button onClick={()=> setExpand(true)}>Search</button>
                  {
                    expand && (
                      <>
                      <TextField id="outlined-search" label="Search Questions" type="search" className="searchInput mb-2" onChange={handleSearch}/>
                      </>
                    )
                  } */}
                  {/* <SearchToggle /> */}
                  {/* search toggle end */}

                  {/* cart toggle start */}
                  {/* organization onboarding form */}
                  {
                    userRole !== 'instructor' || userRole !== 'student' ? (
                      <div className="d-flex items-center gap-2">
                        <BusinessIcon style={{ color: 'white', fontSize: '30px' }} />

                        <Link
                          data-barba
                          to='/org-onboarding'
                          // className={menuItem == "Home" ? "activeMenu" : ""}
                          style={{ fontSize: "14px", whiteSpace: "nowrap" }}
                        >
                          {isSmallScreen ? null : 'Join as an Organization'}
                        </Link>
                      </div>
                    ) : null
                  }
                  {userRole == "instructor" || userRole == 'admin' ? null : (
                    <CartToggle
                      parentClassess={""} //ml-30 mr-30 xl:ml-20
                      allClasses={"d-flex items-center text-white"}
                    // wishlistCount={wishlistCount}
                    // setWishlistCount={setWishlistCount}
                    />
                  )}

                  {/* <CartButton/> */}

                  {/* <FontAwesomeIcon icon={faCardHeart} /> */}
                  {/* cart toggle end */}
                  {/* <Button variant="contained" color="primary" onClick={toggleTheme}>
          Toggle to {isDarkMode ? 'Light' : 'Dark'} Mode
        </Button> */}

                  <div
                    className="d-block d-xl-none ml-5"
                    style={{
                      margin: "4px",
                      right: "0vw",
                      color: "white !important",
                    }}
                  >
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
                    <div
                      className=" d-flex justify-space-between items-center mt-2"
                      style={{ margin: "0 10vw" }}
                    >
                      {/* <h5 className="text-white ml-30   ">
                        {user.displayName}
                      </h5> */}
                      {userRole !== "admin" && (
                        <div className="mt-3">
                          <div
                            className={`header-menu js-mobile-menu-toggle left-alignment`}
                            style={{ fontSize: "18px" }}
                          >
                            <div className="header-menu__content">
                              <div className="menu js-navList">
                                <ul
                                  className={"menu__nav text-white -is-active"}
                                >
                                  <li className="menu-item-has-children -has-mega-menu">
                                    <Link
                                      data-barba
                                      to="#"
                                      className={
                                        menuItem == "User Profile"
                                          ? "activeMenu"
                                          : ""
                                      }
                                    // style={{ position:'relative', top:'3px',marginRight:'1px'}}
                                    >
                                      {user.displayName?.split(" ")[0]}
                                      <i className="icon-chevron-right text-13 ml-10"></i>
                                    </Link>
                                    <div
                                      className="mega "
                                      style={{
                                        fontSize: "18px",
                                        width: "20vw",
                                        overflow: "auto",
                                      }}
                                    >
                                      <div className="mega__menu">
                                        <div className="row x-gap-40">
                                          <div className="col">
                                            {/* <h4
                                              className="text-17 fw-500 mb-20"
                                              style={{ color: "black" }}
                                            >
                                              Dashboard Pages
                                            </h4> */}

                                            <ul className="mega__list ">
                                              {userRole == "student" &&
                                                menuList[2].links[0].links.map(
                                                  (elm, i) => (
                                                    <li
                                                      key={i}
                                                      className={
                                                        pathname == elm.href
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
                                              {userRole == "instructor" &&
                                                menuList[6].links[0].links.map(
                                                  (elm, i) => (
                                                    <li
                                                      key={i}
                                                      className={
                                                        pathname == elm.href
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
                                              <button
                                                className="button -sm -purple-1 text-white fw-500 w-10 text-dark-1 mt-8"
                                                onClick={handleSignOut}
                                              >
                                                Logout
                                              </button>
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
                      )}

                      <div
                        className="d-none d-xl-flex "
                        style={{ position: "absolute", right: 0 }}
                      >
                        <button
                          className="button -sm -white text-dark-1 "
                          onClick={handleSignOut}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="header-right__buttons d-flex items-center ml-30 md:d-none align-items-center" style={{ fontSize: "14px" }}>
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
