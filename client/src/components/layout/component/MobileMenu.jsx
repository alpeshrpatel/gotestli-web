// import MobileFooter from "./MobileFooter";

// import { menuList } from "../../../data--backup/menu";

// import { Link } from "react-router-dom";

// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import BusinessIcon from '@mui/icons-material/Business';
// import StudyMaterialMegamenu from "./StudyMaterialMegamenu";

// export default function MobileMenu({
//   setActiveMobileMenu,
//   activeMobileMenu,
//   userRole,
//   handleSignOut, isSmallScreen
// }) {
//   const [showMenu, setShowMenu] = useState(false);
//   const [menuNesting, setMenuNesting] = useState([]);
//   const [menuItem, setMenuItem] = useState("");
//   const [submenu, setSubmenu] = useState("");

//   useEffect(() => {
//     menuList.forEach((elm) => {
//       elm?.links?.forEach((elm2) => {
//         if (elm2.href?.split("/")[1] == pathname?.split("/")[1]) {
//           setMenuItem(elm.title);
//         } else {
//           elm2?.links?.map((elm3) => {
//             if (elm3.href?.split("/")[1] == pathname?.split("/")[1]) {
//               setMenuItem(elm.title);
//               setSubmenu(elm2.title);
//             }
//           });
//         }
//       });
//     });
//   }, []);
//   useEffect(() => {
//     setShowMenu(true);
//   }, []);
//   const { pathname } = useLocation();

//   return (
//     <div
//       className={`header-menu js-mobile-menu-toggle ${activeMobileMenu ? "-is-el-visible" : ""
//         }`}
//     >
//       <div className="header-menu__content">
//         <div className="mobile-bg js-mobile-bg"></div>

//         {userRole ? (
//           <div
//             className="d-flex d-xl-none mt-10 ml-10"

//           >
//             <button
//               className="button -sm -purple-1 text-white fw-500 w-10 text-dark-1 "
//               onClick={handleSignOut}
//             >
//               Logout
//             </button>
//           </div>
//         ) : (
//           <div className="d-flex d-xl-none items-center px-20 py-20 border-bottom-light">
//             <Link
//               to="/login"
//               className={`button -sm -purple-1 text-white fw-500 w-10 text-dark-1 ${pathname == "/login" ? "activeMenu" : "inActiveMenu"
//                 } `}
//             >
//               Log in
//             </Link>
//             <Link
//               to="/signup"
//               className={`button -sm -green-1 text-white fw-500 w-10 text-dark-1 ml-30 ${pathname == "/signup" ? "activeMenu" : "inActiveMenu"
//                 } `}
//             >
//               Sign Up
//             </Link>
//           </div>
//         )}

//          {/* <li className="menu-item-has-children d-flex align-items-center text-black"> */}

//                 {/* <StudyMaterialMegamenu /> */}

//               {/* </li> */}

//         {showMenu && activeMobileMenu && (
//           <div className="mobileMenu text-dark-1">
//             {/* {menuList.map((elm, i) => {
//               if (elm.title) {
//                 return (
//                   <div key={i} className="submenuOne">
//                     <div
//                       className="title"
//                       onClick={() =>
//                         setMenuNesting((pre) =>
//                           pre[0] == elm.title ? [] : [elm.title]
//                         )
//                       }
//                     >
//                       <span
//                         className={
//                           elm.title == menuItem ? "activeMenu" : "inActiveMenu"
//                         }
//                       >
//                         {elm.title}
//                       </span>
//                       <i
//                         className={
//                           menuNesting[0] == elm.title
//                             ? "icon-chevron-right text-13 ml-10 active"
//                             : "icon-chevron-right text-13 ml-10"
//                         }
//                       ></i>
//                     </div>

//                     {elm.links &&
//                       elm.links.map((itm, index) => (
//                         <div
//                           key={index}
//                           className={
//                             menuNesting[0] == elm.title
//                               ? "toggle active"
//                               : "toggle"
//                           }
//                         >
//                           {itm.href && (
//                             <Link
//                               key={i}
//                               className={
//                                 pathname?.split("/")[1] ==
//                                 itm.href?.split("/")[1]
//                                   ? "activeMenu link"
//                                   : "link inActiveMenu"
//                               }
//                               to={itm.href}
//                             >
//                               {itm.label}
//                             </Link>
//                           )}

//                           {itm.links && (
//                             <div className="submenuTwo">
//                               <div
//                                 className="title"
//                                 onClick={() =>
//                                   setMenuNesting((pre) =>
//                                     pre[1] == itm.title
//                                       ? [pre[0]]
//                                       : [pre[0], itm.title]
//                                   )
//                                 }
//                               >
//                                 <span
//                                   className={
//                                     itm.title == submenu
//                                       ? "activeMenu"
//                                       : "inActiveMenu"
//                                   }
//                                 >
//                                   {itm.title && itm.title}
//                                 </span>
//                                 <i
//                                   className={
//                                     menuNesting[1] == itm.title
//                                       ? "icon-chevron-right text-13 ml-10 active"
//                                       : "icon-chevron-right text-13 ml-10"
//                                   }
//                                 ></i>
//                               </div>
//                               <div
//                                 className={
//                                   menuNesting[1] == itm.title
//                                     ? "toggle active"
//                                     : "toggle"
//                                 }
//                               >
//                                 {itm.links &&
//                                   itm.links.map((itm2, index3) => (
//                                     <Link
//                                       key={index3}
//                                       className={
//                                         pathname?.split("/")[1] ==
//                                         itm2.href?.split("/")[1]
//                                           ? "activeMenu link"
//                                           : "link inActiveMenu"
//                                       }
//                                       to={itm2.href}
//                                     >
//                                       {itm2.label}
//                                     </Link>
//                                   ))}
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       ))}
//                   </div>
//                 );
//               }
//             })} */}
//             <ul
//               className='submenuOne'
//               style={{ paddingLeft: 0, display: "flex", gap: "15px" }}
//             >

//               {
//                 userRole == 'student' && (
//                   <>

//                     <li className="menu-item-has-children " style={{ display: 'flex', flexDirection: 'column', gap: '4vh' }}>
//                       <Link
//                         data-barba
//                         to={`${userRole == 'admin' ? `/admin/dashboard` : ((userRole == 'instructor') ? `/instructor/home` : `/`)}`}
//                         className={menuItem == "Home" ? "activeMenu" : ""}
//                         style={{ fontSize: "18px", whiteSpace: "nowrap" }}
//                       >
//                         Home
//                       </Link>
//                       <Link
//                         data-barba
//                         to={`/dshb/profilepage`}
//                         className={pathname == "/dshb/profilepage" ? "activeMenu" : ""}
//                         style={{ fontSize: "18px", whiteSpace: "nowrap" }}
//                       >
//                         Profile Page
//                       </Link>
//                       <Link
//                         data-barba
//                         to={`/student/dashboard`}
//                         className={pathname == "/student/dashboard" ? "activeMenu" : ""}
//                         style={{ fontSize: "18px", whiteSpace: "nowrap" }}
//                       >
//                         Dashboard
//                       </Link>
//                       <Link
//                         data-barba
//                         to={`/dshb/quizzes`}
//                         className={pathname == "/dshb/quizzes" ? "activeMenu" : ""}
//                         style={{ fontSize: "18px", whiteSpace: "nowrap" }}
//                       >
//                         My quizzes
//                       </Link>
//                       <Link
//                         data-barba
//                         to={`/user/purchases`}
//                         className={pathname == "/user/purchases" ? "activeMenu" : ""}
//                         style={{ fontSize: "18px", whiteSpace: "nowrap" }}
//                       >
//                         My Purchases
//                       </Link>
//                       <Link
//                         data-barba
//                         to={`/dshb/wishlist`}
//                         className={pathname == "/dshb/wishlist" ? "activeMenu" : ""}
//                         style={{ fontSize: "18px", whiteSpace: "nowrap" }}
//                       >
//                         WishList
//                       </Link>
//                       {/* <Link
//                 data-barba
//                 to={`/dshb/quizzes`}
//                 className={pathname == "/dshb/quizzes" ? "activeMenu" : ""}
//                 style={{ fontSize: "18px",whiteSpace: "nowrap" }}
//               >
//                Reviews
//               </Link> */}


//                       {/* <ul className="subnav" style={{ fontSize: "18px" }}>
//                 <li className="menu__backButton js-nav-list-back text-black">
//                   <Link to="#" className="text-reset">
//                     <i className="icon-chevron-left text-13 mr-10"></i> Home
//                   </Link>
//                 </li>

//                 {menuList[0].links.map((elm, i) => (
//                   <li
//                     key={i}
//                     className={
//                       pathname.split("/")[1] == elm.href.split("/")[1]
//                         ? "activeMenu"
//                         : "inActiveMenu"
//                     }
//                   >
//                     <Link to={elm.href}>{elm.label}</Link>
//                   </li>
//                 ))}
//               </ul> */}
//                     </li>
//                   </>
//                 )
//               }

//               {
//                 userRole !== 'instructor' || userRole !== 'student' ? (
//                   <div className="d-flex items-center gap-2">
//                     <BusinessIcon style={{ color: 'white', fontSize: '30px' }} />

//                     <Link
//                       data-barba
//                       to='/org-onboarding'
//                       // className={menuItem == "Home" ? "activeMenu" : ""}
//                       style={{ fontSize: "14px", whiteSpace: "nowrap" }}
//                     >
//                       {isSmallScreen ? null : 'Join as an Organization'}
//                     </Link>
//                   </div>
//                 ) : null
//               }



//               {/* {userRole == "student" && (
//               <li className="menu-item-has-children -has-mega-menu">
//                 <Link
//                   data-barba
//                   to="#"
//                   className={menuItem == "Quizzes" ? "activeMenu" : ""}
//                   style={{ fontSize: "18px" }}
//                 >
//                   Quizzes <i className="icon-chevron-right text-13 ml-10"></i>
//                 </Link>

//                 <div
//                   className="mega xl:d-none"
//                   style={{ fontSize: "18px", width: "80vw" }}
//                 >
//                   <div className="mega__menu">
//                     <div className="row x-gap-40">
//                       <div className="col">
//                         <h4 className="text-17 fw-500 mb-20 text-black">
//                           Quiz List Layouts
//                         </h4>

//                         <ul className="mega__list">
//                           {menuList[1].links[0].links.map((elm, i) => (
//                             <li
//                               key={i}
//                               className={
//                                 pathname.split("/")[1] == elm.href.split("/")[1]
//                                   ? "activeMenu"
//                                   : "inActiveMegaMenu"
//                               }
//                             >
//                               <Link data-barba to={elm.href}>
//                                 {elm.label}
//                               </Link>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>

//                       <div className="col">
//                         <h4 className="text-17 fw-500 mb-20 text-black">
//                           Quiz Single Layouts
//                         </h4>

//                         <ul className="mega__list">
//                           {menuList[1].links[1].links.map((elm, i) => (
//                             <li
//                               key={i}
//                               className={
//                                 pathname.split("/")[1] == elm.href.split("/")[1]
//                                   ? "activeMenu"
//                                   : "inActiveMegaMenu"
//                               }
//                             >
//                               <Link data-barba to={elm.href}>
//                                 {elm.label}
//                               </Link>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>

//                       <div className="col">
//                         <h4 className="text-17 fw-500 mb-20 text-black">
//                           About Quizzes
//                         </h4>

//                         <ul className="mega__list">
//                           {menuList[1].links[2].links.map((elm, i) => (
//                             <li
//                               key={i}
//                               className={
//                                 pathname.split("/")[1] == elm.href.split("/")[1]
//                                   ? "activeMenu"
//                                   : "inActiveMegaMenu"
//                               }
//                             >
//                               <Link data-barba to={elm.href}>
//                                 {elm.label}
//                               </Link>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>

//                       <div className="col">
//                         <h4 className="text-17 fw-500 mb-20 text-black">
//                           Popular Quizzes
//                         </h4>

//                         <ul className="mega__list">
//                           {menuList[1].links[3].links.map((elm, i) => (
//                             <li
//                               key={i}
//                               className={
//                                 pathname.split("/")[1] == elm.href.split("/")[1]
//                                   ? "activeMenu"
//                                   : "inActiveMegaMenu"
//                               }
//                             >
//                               <Link data-barba to={elm.href}>
//                                 {elm.label}
//                               </Link>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>

//                     {/* <div className="mega-banner bg-purple-1 ml-40">
//                     <div className="text-24 lh-15 text-white fw-700">
//                       Join more than
//                       <br />
//                       <span className="text-green-1">8 million learners</span>
//                       worldwide
//                     </div>
//                     <Link
//                       to="#"
//                       className="button -md -green-1 text-dark-1 fw-500 col-12"
//                     >
//                       Start Learning For Free
//                     </Link>
//                   </div> 
//                   </div>
//                 </div>
//               </li>
//             )} */}
//               {userRole == "instructor" && (
//                 <>
//                   <li className="menu-item-has-children">
//                     <Link
//                       data-barba
//                       to="/create/question"
//                       className={
//                         pathname == "/create/question" ? "activeMenu" : ""
//                       }
//                       style={{ fontSize: "18px", whiteSpace: "nowrap" }}
//                     >
//                       Create Question{" "}
//                       {/* <i className="icon-chevron-right text-13 ml-10"></i> */}
//                     </Link>

//                   </li>
//                   <li className="menu-item-has-children">
//                     <Link
//                       data-barba
//                       to="/create/questionset"
//                       className={
//                         menuItem == "Create QuestionSet" ? "activeMenu" : ""
//                       }
//                       style={{ fontSize: "18px", whiteSpace: "nowrap" }}
//                     >
//                       Create QuestionSet{" "}
//                       {/* <i className="icon-chevron-right text-13 ml-10"></i> */}
//                     </Link>
//                     {/* <ul className="subnav">
//                 <li className="menu__backButton js-nav-list-back">
//                   <Link to="#">
//                     <i className="icon-chevron-left text-13 mr-10"></i> Events
//                   </Link>
//                 </li>

//                 {menuList[2].links.map((elm, i) => (
//                   <li
//                     key={i}
//                     className={
//                       pathname.split("/")[1] == elm.href.split("/")[1]
//                         ? "activeMenu"
//                         : "inActiveMenu"
//                     }
//                   >
//                     <Link data-barba to={elm.href}>
//                       {elm.label}
//                     </Link>
//                   </li>
//                 ))}
//               </ul> */}
//                   </li>
//                   <li className="menu-item-has-children">
//                     <Link
//                       data-barba
//                       to="/upload/questionset"
//                       className={
//                         pathname == "/upload/questionset" ? "activeMenu" : ""
//                       }
//                       style={{ fontSize: "18px", whiteSpace: "nowrap" }}
//                     >
//                       Upload QuestionSet{" "}
//                       {/* <i className="icon-chevron-right text-13 ml-10"></i> */}
//                     </Link>

//                   </li>
//                   <li className="menu-item-has-children">
//                     <Link
//                       data-barba
//                       to="/instructor/dashboard"
//                       className={
//                         pathname == "/instructor/dashboard" ? "activeMenu" : ""
//                       }
//                       style={{ fontSize: "18px", whiteSpace: "nowrap" }}
//                     >
//                       Dashboard{" "}
//                       {/* <i className="icon-chevron-right text-13 ml-10"></i> */}
//                     </Link>

//                   </li>
//                   <li className="menu-item-has-children">
//                     <Link
//                       data-barba
//                       to="/instructor/home"
//                       className={
//                         pathname == "/instructor/home" ? "activeMenu" : ""
//                       }
//                       style={{ fontSize: "18px", whiteSpace: "nowrap" }}
//                     >
//                       My Questionsets{" "}
//                       {/* <i className="icon-chevron-right text-13 ml-10"></i> */}
//                     </Link>

//                   </li>
//                   <li className="menu-item-has-children">
//                     <Link
//                       data-barba
//                       to="/dshb/uploaded/files"
//                       className={
//                         pathname == "/dshb/uploaded/files" ? "activeMenu" : ""
//                       }
//                       style={{ fontSize: "18px", whiteSpace: "nowrap" }}
//                     >
//                       My Uploads{" "}
//                       {/* <i className="icon-chevron-right text-13 ml-10"></i> */}
//                     </Link>

//                   </li>
//                   <li className="menu-item-has-children">
//                     <Link
//                       data-barba
//                       to="/dshb/profilepage"
//                       className={
//                         pathname == "/dshb/profilepage" ? "activeMenu" : ""
//                       }
//                       style={{ fontSize: "18px", whiteSpace: "nowrap" }}
//                     >
//                       Profile Page{" "}
//                       {/* <i className="icon-chevron-right text-13 ml-10"></i> */}
//                     </Link>

//                   </li>

//                 </>
//               )}



//               {/* <li className="menu-item-has-children">
//               <Link
//                 data-barba
//                 to="#"
//                 className={menuItem == "Blogs" ? "activeMenu" : ""}
//                 style={{fontSize:'18px'}}
//               >
//                 Blog <i className="icon-chevron-right text-13 ml-10"></i>
//               </Link>
//               <ul className="subnav">
//                 <li className="menu__backButton js-nav-list-back">
//                   <Link to="#">
//                     <i className="icon-chevron-left text-13 mr-10"></i> Blog
//                   </Link>
//                 </li>

//                 {menuList[4].links.map((elm, i) => (
//                   <li
//                     key={i}
//                     className={
//                       pathname.split("/")[1] == elm.href.split("/")[1]
//                         ? "activeMenu"
//                         : "inActiveMenu"
//                     }
//                   >
//                     <Link data-barba to={elm.href}>
//                       {elm.label}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </li>

//             <li className="menu-item-has-children">
//               <Link
//                 data-barba
//                 to="#"
//                 className={menuItem == "Pages" ? "activeMenu" : ""}
//                 style={{fontSize:'18px'}}
//               >
//                 Pages <i className="icon-chevron-right text-13 ml-10"></i>
//               </Link>

//               <ul className="subnav">
//                 <li className="menu__backButton js-nav-list-back">
//                   <Link to="#">
//                     <i className="icon-chevron-left text-13 mr-10"></i> Pages
//                   </Link>
//                 </li>
//                 <li className="menu-item-has-children">
//                   <Link
//                     to="#"
//                     className={
//                       submenu == "About Us" ? "activeMenu" : "inActiveMenu"
//                     }
//                   >
//                     About Us<div className="icon-chevron-right text-11"></div>
//                   </Link>

//                   <ul className="subnav">
//                     <li className="menu__backButton js-nav-list-back">
//                       <Link to="#">
//                         <i className="icon-chevron-left text-13 mr-10"></i>
//                         About Us
//                       </Link>
//                     </li>

//                     {menuList[5].links[0].links.map((elm, i) => (
//                       <li
//                         key={i}
//                         className={
//                           pathname.split("/")[1] == elm.href.split("/")[1]
//                             ? "activeMenu"
//                             : "inActiveMenu"
//                         }
//                       >
//                         <Link key={i} data-barba to={elm.href}>
//                           {elm.label}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </li>

//                 <li className="menu-item-has-children">
//                   <Link
//                     to="#"
//                     className={
//                       submenu == "Contact" ? "activeMenu" : "inActiveMenu"
//                     }

//                   >
//                     Contact<div className="icon-chevron-right text-11"></div>
//                   </Link>
//                   <ul className="subnav">
//                     <li className="menu__backButton js-nav-list-back">
//                       <Link to="#" style={{fontSize:'18px'}}>
//                         <i className="icon-chevron-left text-13 mr-10"></i>
//                         Contact
//                       </Link>
//                     </li>

//                     {menuList[5].links[1].links.map((elm, i) => (
//                       <li
//                         key={i}
//                         className={
//                           pathname.split("/")[1] == elm.href.split("/")[1]
//                             ? "activeMenu"
//                             : "inActiveMenu"
//                         }
//                       >
//                         <Link key={i} data-barba to={elm.href}>
//                           {elm.label}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </li>

//                 <li className="menu-item-has-children">
//                   <Link
//                     to="#"
//                     className={
//                       submenu == "Shop" ? "activeMenu" : "inActiveMenu"
//                     }
//                   >
//                     Shop<div className="icon-chevron-right text-11"></div>
//                   </Link>
//                   <ul className="subnav">
//                     <li className="menu__backButton js-nav-list-back">
//                       <Link to="#">
//                         <i className="icon-chevron-left text-13 mr-10"></i> Shop
//                       </Link>
//                     </li>

//                     {menuList[5].links[2].links.map((elm, i) => (
//                       <li
//                         key={i}
//                         className={
//                           pathname.split("/")[1] == elm.href.split("/")[1]
//                             ? "activeMenu"
//                             : "inActiveMenu"
//                         }
//                       >
//                         <Link key={i} data-barba to={elm.href}>
//                           {elm.label}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </li>

//                 {menuList[5].links
//                   .filter((el) => el.href)
//                   .map((elm, i) => (
//                     <li
//                       key={i}
//                       className={
//                         pathname.split("/")[1] == elm.href.split("/")[1]
//                           ? "activeMenu"
//                           : "inActiveMenu"
//                       }
//                     >
//                       <Link key={i} data-barba to={elm.href}>
//                         {elm.label}
//                       </Link>
//                     </li>
//                   ))}
//               </ul>
//             </li> */}

//               {/* <li>
//               <Link
//                 data-barba
//                 to="/contact-1"
//                 className={
//                   pathname == "/contact-1" ? "activeMenu" : "inActiveMenuTwo"
//                 }
//                 style={{ fontSize: "18px" }}
//               >
//                 Contact
//               </Link>
//             </li> */}
//             </ul>
//           </div>
//         )}

//         {/* mobile footer start */}
//         <MobileFooter />
//         {/* mobile footer end */}
//       </div>

//       <div
//         className="header-menu-close"
//         onClick={() => {
//           setActiveMobileMenu(false);
//         }}
//         data-el-toggle=".js-mobile-menu-toggle"
//       >
//         <div className="size-40 d-flex items-center justify-center rounded-full bg-white">
//           <div className="icon-close text-dark-1 text-16"></div>
//         </div>
//       </div>

//       <div
//         className="header-menu-bg"
//         onClick={() => setActiveMobileMenu(false)}
//       ></div>
//     </div>
//   );
// }



import MobileFooter from "./MobileFooter";
import { menuList } from "../../../data--backup/menu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import BusinessIcon from '@mui/icons-material/Business';
import StudyMaterialMegamenu from "./StudyMaterialMegamenu";

export default function MobileMenu({
  setActiveMobileMenu,
  activeMobileMenu,
  userRole,
  handleSignOut,
  isSmallScreen
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [menuNesting, setMenuNesting] = useState([]);
  const [menuItem, setMenuItem] = useState("");
  const [submenu, setSubmenu] = useState("");

  useEffect(() => {
    menuList.forEach((elm) => {
      elm?.links?.forEach((elm2) => {
        if (elm2.href?.split("/")[1] == pathname?.split("/")[1]) {
          setMenuItem(elm.title);
        } else {
          elm2?.links?.map((elm3) => {
            if (elm3.href?.split("/")[1] == pathname?.split("/")[1]) {
              setMenuItem(elm.title);
              setSubmenu(elm2.title);
            }
          });
        }
      });
    });
  }, []);

  useEffect(() => {
    setShowMenu(true);
  }, []);

  const { pathname } = useLocation();

  return (
    <div
      className={`header-menu js-mobile-menu-toggle ${activeMobileMenu ? "-is-el-visible" : ""}`}
    >
      <div className="header-menu__content">
        <div className="mobile-bg js-mobile-bg"></div>

        {userRole ? (
          <div className="d-flex d-xl-none mt-10 ml-10">
            <button
              className="button -sm -purple-1 text-white fw-500 w-10 text-dark-1"
              onClick={handleSignOut}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="d-flex d-xl-none items-center px-20 py-20 border-bottom-light">
            <Link
              to="/login"
              className={`button -sm -purple-1 text-white fw-500 w-10 text-dark-1 ${pathname == "/login" ? "activeMenu" : "inActiveMenu"
                }`}
            >
              Log in
            </Link>
            <Link
              to="/signup"
              className={`button -sm -green-1 text-white fw-500 w-10 text-dark-1 ml-30 ${pathname == "/signup" ? "activeMenu" : "inActiveMenu"
                }`}
            >
              Sign Up
            </Link>
          </div>
        )}

        {showMenu && activeMobileMenu && (
          <div className="mobileMenu text-dark-1">
            <ul
              className='submenuOne'
              style={{ paddingLeft: 0, display: "flex", flexDirection: "column", gap: "15px" }}
            >
              {/* Study Material Megamenu - Make it visible for all users or specific roles */}
              <li className="menu-item-has-children d-flex align-items-center text-black" style={{ padding: "10px 0" }}>
                <StudyMaterialMegamenu allClasses="mobile-megamenu" />
              </li>

              {userRole == 'student' && (
                <>
                  <li className="menu-item-has-children" style={{ display: 'flex', flexDirection: 'column', gap: '4vh' }}>
                    <Link
                      data-barba
                      to={`${userRole == 'admin' ? `/admin/dashboard` : ((userRole == 'instructor') ? `/instructor/home` : `/`)}`}
                      className={menuItem == "Home" ? "activeMenu" : ""}
                      style={{ fontSize: "18px", whiteSpace: "nowrap" }}
                    >
                      Home
                    </Link>
                    <Link
                      data-barba
                      to={`/dshb/profilepage`}
                      className={pathname == "/dshb/profilepage" ? "activeMenu" : ""}
                      style={{ fontSize: "18px", whiteSpace: "nowrap" }}
                    >
                      Profile Page
                    </Link>
                    <Link
                      data-barba
                      to={`/student/dashboard`}
                      className={pathname == "/student/dashboard" ? "activeMenu" : ""}
                      style={{ fontSize: "18px", whiteSpace: "nowrap" }}
                    >
                      Dashboard
                    </Link>
                    <Link
                      data-barba
                      to={`/dshb/quizzes`}
                      className={pathname == "/dshb/quizzes" ? "activeMenu" : ""}
                      style={{ fontSize: "18px", whiteSpace: "nowrap" }}
                    >
                      My quizzes
                    </Link>
                    <Link
                      data-barba
                      to={`/user/purchases`}
                      className={pathname == "/user/purchases" ? "activeMenu" : ""}
                      style={{ fontSize: "18px", whiteSpace: "nowrap" }}
                    >
                      My Purchases
                    </Link>
                    <Link
                      data-barba
                      to={`/dshb/wishlist`}
                      className={pathname == "/dshb/wishlist" ? "activeMenu" : ""}
                      style={{ fontSize: "18px", whiteSpace: "nowrap" }}
                    >
                      WishList
                    </Link>
                  </li>
                </>
              )}

              {userRole !== 'instructor' && userRole !== 'student' && (
                <div className="d-flex items-center gap-2">
                  <BusinessIcon style={{ color: 'white', fontSize: '30px' }} />
                  <Link
                    data-barba
                    to='/org-onboarding'
                    style={{ fontSize: "18px", whiteSpace: "nowrap" }}
                  >
                    {isSmallScreen ? null : 'Join as an Organization'}
                  </Link>
                </div>
              )}

              {userRole == "instructor" && (
                <>
                  <li className="menu-item-has-children">
                    <Link
                      data-barba
                      to="/create/question"
                      className={pathname == "/create/question" ? "activeMenu" : ""}
                      style={{ fontSize: "18px", whiteSpace: "nowrap" }}
                    >
                      Create Question
                    </Link>
                  </li>
                  <li className="menu-item-has-children">
                    <Link
                      data-barba
                      to="/create/questionset"
                      className={menuItem == "Create QuestionSet" ? "activeMenu" : ""}
                      style={{ fontSize: "18px", whiteSpace: "nowrap" }}
                    >
                      Create QuestionSet
                    </Link>
                  </li>
                  <li className="menu-item-has-children">
                    <Link
                      data-barba
                      to="/create/gamequiz"
                      className={pathname == "/create/gamequiz" ? "activeMenu" : ""}
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Game Quiz{" "}
                      {/* <i className="icon-chevron-right text-13 ml-10"></i> */}
                    </Link>
                  </li>
                  <li className="menu-item-has-children">
                    <Link
                      data-barba
                      to="/upload/questionset"
                      className={pathname == "/upload/questionset" ? "activeMenu" : ""}
                      style={{ fontSize: "18px", whiteSpace: "nowrap" }}
                    >
                      Upload QuestionSet
                    </Link>
                  </li>
                  <li className="menu-item-has-children">
                    <Link
                      data-barba
                      to="/instructor/dashboard"
                      className={pathname == "/instructor/dashboard" ? "activeMenu" : ""}
                      style={{ fontSize: "18px", whiteSpace: "nowrap" }}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="menu-item-has-children">
                    <Link
                      data-barba
                      to="/instructor/home"
                      className={pathname == "/instructor/home" ? "activeMenu" : ""}
                      style={{ fontSize: "18px", whiteSpace: "nowrap" }}
                    >
                      My Questionsets
                    </Link>
                  </li>
                  <li className="menu-item-has-children">
                    <Link
                      data-barba
                      to="/dshb/uploaded/files"
                      className={pathname == "/dshb/uploaded/files" ? "activeMenu" : ""}
                      style={{ fontSize: "18px", whiteSpace: "nowrap" }}
                    >
                      My Uploads
                    </Link>
                  </li>
                  <li className="menu-item-has-children">
                    <Link
                      data-barba
                      to="/dshb/profilepage"
                      className={pathname == "/dshb/profilepage" ? "activeMenu" : ""}
                      style={{ fontSize: "18px", whiteSpace: "nowrap" }}
                    >
                      Profile Page
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}

        {/* mobile footer start */}
        <MobileFooter />
        {/* mobile footer end */}
      </div>

      <div
        className="header-menu-close"
        onClick={() => {
          setActiveMobileMenu(false);
        }}
        data-el-toggle=".js-mobile-menu-toggle"
      >
        <div className="size-40 d-flex items-center justify-center rounded-full bg-white">
          <div className="icon-close text-dark-1 text-16"></div>
        </div>
      </div>

      <div
        className="header-menu-bg"
        onClick={() => setActiveMobileMenu(false)}
      ></div>
    </div>
  );
}