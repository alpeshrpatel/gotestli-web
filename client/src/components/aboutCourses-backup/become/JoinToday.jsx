import { Link } from "react-router-dom";
import React from "react";
import Lottie from "lottie-react";
import jointoday from './jointoday.json'

export default function JoinToday() {
  return (
    <section className=" layout-pb-md bg-light-4">
      <div className="container-fluid" style={{padding:'0 5vw'}}>
        <div className="row y-gap-10 justify-between items-center">
          <div className="col-lg-7 pr-60">
          <Lottie animationData={jointoday} loop={true} />
          </div>

          <div className="col-lg-5">
            <h2 className="text-45 lh-15">
              Become an Instructor <span className="text-purple-1">Today</span>
            </h2>
            {/* <p className="text-dark-1 mt-25">
              Use the list below to bring attention to your product’s key
              <br /> differentiator.
            </p> */}
            <div className="d-inline-block mt-30">
              <Link
                to="/signup"
                className="button -md -dark-1 text-white"
              >
                Join Our Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
