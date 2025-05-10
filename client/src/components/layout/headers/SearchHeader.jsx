import React, { useState, useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";

const SearchHeader = ({ searchTerm, setSearchTerm, handleKeyDown }) => {
  //   const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowSearch(true);
      } else if (window.innerWidth < 768) {
        setShowSearch(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearchToggle = () => {
    if (isSmallScreen) {
      setShowSearch((prev) => !prev);
    }
  };

  return (
    <div
      className={`${isSmallScreen && showSearch ? `w-100` : `w-25`} d-flex align-items-center justify-content-center`}
      style={{ position: "relative" }}
    >
      <div
        className="header-search__field d-flex items-center align-items-center rounded-5"
        style={{
          height: "10px",
          transition: "all 0.3s ease-in-out",
          width: isSmallScreen ? (showSearch ? "200px" : "40px") : "100%",
          marginRight: '15px',
          position: isSmallScreen ? (showSearch ? "absolute" : "") : "",
          zIndex: '1'
        }}
      >
        <div
          className="icon icon-search text-dark-1 ml-8 d-flex items-center"
          onClick={handleSearchToggle}
          style={{
            cursor: "pointer",
            fontSize: "20px",
            padding: "10px",
          }}
        >
          {isSmallScreen && !showSearch ? '🔍' : null}
        </div>
        {showSearch && (
          <>
            <input
              autoFocus
              type="text"
              value={searchTerm}
              className="px-5 py-2 text-12 lh-12 text-dark-1 fw-500"
              placeholder="What do you want?"
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                display: showSearch ? "block" : "none",
                width: "90%",
                padding: "10px",
                fontSize: "14px",
              }}
            />
            {
              searchTerm.length > 0 && (
                <CancelIcon className="d-flex items-center align-items-center justify-center  rounded-full mr-8 "
                  fontSize="inherit"
                  sx={{
                    position: "absolute",
                    right: "5px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    // backgroundColor: "#8e44ad",
                    border: "none",
                    padding: "5px",
                    borderRadius: "50%",
                    fontSize: "32px",
                    cursor: "pointer",

                  }}
                  onClick={() => setSearchTerm("")}
                />
              )
            }

            {/* <button
              className="d-flex items-center align-items-center justify-center size-20 rounded-full bg-purple-3 mr-8"
              onClick={() => setSearchTerm("")}
              style={{
                position: "absolute",
                right: "6px",
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "#8e44ad",
                border: "none",
                padding: "5px",
                borderRadius: "50%",
                fontSize:'14px'
              }}
            >
              ❌
            </button> */}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchHeader;
