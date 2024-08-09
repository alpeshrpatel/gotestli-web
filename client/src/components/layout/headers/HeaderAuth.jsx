import React, { useState } from "react";
import Menu from "../component/Menu";
import MobileMenu from "../component/MobileMenu";
import { Link } from "react-router-dom";

export default function HeaderAuth() {
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  return (
    <header className="header -base js-header">
      <div className="header__container py-10 " style={{backgroundColor:'#1a064f', borderBottom:'0.5px solid white'}}>
        <div className="row justify-between items-center">
          <div className="col-auto">
            <div className="header-left">
              <div className="header__logo ">
                <Link data-barba to="/">
                  <img src="/assets/img/general/logo.svg" alt="logo" />
                </Link>
              </div>
            </div>
          </div>

          <div className="col-auto">
            <div className="header-right d-flex items-center">
              {/* <Menu allClasses={"menu__nav text-white -is-active"} />
              <MobileMenu
                activeMobileMenu={activeMobileMenu}
                setActiveMobileMenu={setActiveMobileMenu}
              /> */}

              <div className="mr-30">
                <div className="d-none xl:d-block ml-20">
                  <button
                    className="text-dark-1 items-center"
                    data-el-toggle=".js-mobile-menu-toggle"
                    onClick={() => setActiveMobileMenu(true)}
                  >
                    <i className="text-11 icon icon-mobile-menu"></i>
                  </button>
                </div>
              </div>

              <div className="header-right__buttons md:d-none" >
                <a
                  href="signup"
                  className="button signUpButton -sm -rounded -dark-1 text-white "
                  style={{backgroundColor:'#6440fb'}}
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
