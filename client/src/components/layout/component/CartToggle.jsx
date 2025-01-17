import { menuList } from "@/data--backup/menu";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { useContextElement } from "@/context/Context";
import { useState, useEffect } from "react";
import ShopCart from "./ShopCart";
import CourseCart from "./CourseCart";
import EventCart from "./EventCart";
import { useLocalStorage } from "@/utils/UseLocalStorage";

const CartToggle = ({ allClasses, parentClassess }) => {
  const { cartProducts, cartCourses, cartEvents } = useContextElement();
  const [wishlistCount, setWishlistCount] = useLocalStorage('wishlist', 0);
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
  }, [setWishlistCount]);

  // useEffect(() => {
  //   console.log('hello')
  //   const initialWishlistCount = parseInt(localStorage.getItem("wishlist")) || 0;
  //   setWishlistCount(initialWishlistCount);
  //     // Listen for changes to localStorage (e.g., wishlist updates)
  //     const handleStorageChange = (event) => {
  //       if (event.key === "wishlist") {
  //         console.log(event.newValue)
  //         setWishlistCount(event.newValue || 0);
  //       }
  //     };
  
  //     window.addEventListener("storage", handleStorageChange);
  
  //     return () => {
  //       window.removeEventListener("storage", handleStorageChange);
  //     };
  //   },[setWishlistCount,wishlistCount]);
  // useEffect(() => {
  //   // Initialize wishlist count
  //   const updateWishlistCount = () => {
  //     const count = parseInt(localStorage.getItem("wishlist")) || 0;
  //     setWishlistCount(count);
  //   };

  //   // Initial count
  //   updateWishlistCount();

  //   // Create a custom event handler for localStorage changes
  //   const handleStorageChange = (e) => {
  //     if (e.key === "wishlist") {
  //       updateWishlistCount();
  //     }
  //   };

  //   // Listen for storage changes from other tabs/windows
  //   window.addEventListener("storage", handleStorageChange);

  //   // Create a custom event listener for same-tab updates
  //   window.addEventListener("wishlistUpdate", updateWishlistCount);

  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //     window.removeEventListener("wishlistUpdate", updateWishlistCount);
  //   };
  // }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      const currentValue = parseInt(localStorage.getItem('wishlist')) || 0;
      if (currentValue !== wishlistCount) {
        setWishlistCount(currentValue);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [wishlistCount, setWishlistCount]);
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
