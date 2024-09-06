import React from "react";
import { ProgressBar } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="d-flex justify-content-center items-center" style={{height:'100vh'}}>
      <ProgressBar
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
