import { menuList } from "@/data--backup/menu";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { useContextElement } from "@/context/Context";
import { useState, useEffect } from "react";
import ShopCart from "./ShopCart";
import CourseCart from "./CourseCart";
import EventCart from "./EventCart";

const CartToggle = ({ allClasses, parentClassess, wishlistCount }) => {
  const { cartProducts, cartCourses, cartEvents } = useContextElement();
  const [activeCart, setActiveCart] = useState(false);
  const [menuItem, setMenuItem] = useState("");
  const [submenu, setSubmenu] = useState("");

  const { pathname } = useLocation();
  const navigate = useNavigate();

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
  }, [wishlistCount]);

  return (
    <>
      <div className={parentClassess ? parentClassess : ""} style={{marginRight:'0px'}} onClick={() => navigate('/dshb/wishlist')}>
        <button
          style={{ position: "relative" }}
          // onClick={() => setActiveCart((pre) => !pre)}
          className={`${allClasses ? allClasses : ""}`}
          data-el-toggle=".js-cart-toggle"
        >
          <button>
            <img
              src="/assets/img/shopping-bag.png"
              style={{ height: "25px", width: "25px" }}
            />
          </button>
          <div className="cartProductCount">
            {wishlistCount}
          </div>
        </button>

        <div
          className={`toggle-element js-cart-toggle ${
            activeCart ? "-is-el-visible" : ""
          }`}
        >
          {submenu == "Shop" && <ShopCart />}
          {menuItem == "Events" && <EventCart />}
          {!(submenu == "Shop" || menuItem == "Events") && <CourseCart />}
        </div>
      </div>
    </>
  );
};

export default CartToggle;
