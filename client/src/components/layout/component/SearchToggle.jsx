import { TextField } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const SearchToggle = ({ allClasses, color }) => {
  const [activeSearch, setActiveSearch] = useState(false);
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
     // console.log(e.target.value);
    if (e.key === 'Enter') {
         // console.log('enter clicked')
        navigate("/search/result",{state:{keyword:e.target.value}});
    }
}
  return (
    <>
      <div className={allClasses ? allClasses : ""}>
        <button
          onClick={() => setActiveSearch((pre) => !pre)}
          className={`d-flex items-center ${color ? color : "text-white"} `}
          data-el-toggle=".js-search-toggle"
        >
          <i className="text-20 icon icon-search"></i>
        </button>

        <div
          className={`toggle-element js-search-toggle ${
            activeSearch ? "-is-el-visible" : ""
          }`}
        >
          <div
            className="header-search pt-90  shadow-4 "
            style={{ height: "650px" }}
          >
            <div className="container">
              <div className="header-search__field d-flex items-center align-items-center">
                <div className="icon icon-search text-dark-1 ml-8"></div>
                <input
                  required
                  type="text"
                  className="col-12 text-18 lh-12 text-dark-1 fw-500 "
                  placeholder="What do you want ?"
                  onKeyDown={handleKeyDown}
                />
                 {/* <TextField id="outlined-search" label="Search Questions" type="search" className="searchInput mb-2" /> */}

                <button
                  onClick={() => setActiveSearch(false)}
                  className="d-flex items-center align-items-center justify-center size-40 rounded-full bg-purple-3 mr-8"
                  data-el-toggle=".js-search-toggle"
                >
                  <CancelIcon fontSize='large'/>
                </button>
              </div>

              {/* <div className="header-search__content mt-30"> */}
                {/* <div className="text-17 text-dark-1 fw-500">
                  Popular Right Now
                </div> */}

                {/* <div className="d-flex y-gap-5 flex-column mt-20 text-18">
                  <Link to={`/courses/${5}`} className="text-dark-1">
                    The Ultimate Drawing Course - Beginner to Advanced
                  </Link>
                  <Link to="/courses-single-2/3" className="text-dark-1">
                    Character Art School: Complete Character Drawing Course
                  </Link>
                  <Link to="/courses-single-3/3" className="text-dark-1">
                    Complete Blender Creator: Learn 3D Modelling for Beginners
                  </Link>
                  <Link to="/courses-single-4/3" className="text-dark-1">
                    User Experience Design Essentials - Adobe XD UI UX Design
                  </Link>
                  <Link to="/courses-single-5/3" className="text-dark-1">
                    Graphic Design Masterclass - Learn GREAT Design
                  </Link>
                  <Link to="/courses-single-6/3" className="text-dark-1">
                    Adobe Photoshop CC – Essentials Training Course
                  </Link>
                </div> */}

                {/* <div className="mt-30"> */}
                  {/* <button className="uppercase underline">
                    PRESS ENTER TO SEE ALL SEARCH RESULTS
                  </button> */}
                {/* </div> */}
              {/* </div> */}
            </div>
          </div>
          <div
            className="header-search__bg"
            data-el-toggle=".js-search-toggle"
          ></div>
        </div>
      </div>
    </>
  );
};

export default SearchToggle;
