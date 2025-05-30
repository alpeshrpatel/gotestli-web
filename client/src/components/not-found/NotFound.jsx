import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <section className="no-page layout-pt-lg layout-pb-lg bg-beige-1">
      <div className="container-fluid w-75">
        <div className="row y-gap-50 justify-between items-center">
          <div className="col-lg-6">
            <div className="no-page__img">
              <img src="/assets/img/404/1.svg" alt="image" />
            </div>
          </div>

          <div className="col-xl-5 col-lg-6">
            <div className="no-page__content">
              <h1 className="no-page__main text-dark-1">
                40<span className="text-purple-1">4</span>
              </h1>
              <h2 className="text-35 lh-12 mt-5">
                Oops! It looks like you're lost.
              </h2>
              <div className="mt-10">
                The page you're looking for isn't available. Try to search again
                <br /> or use the go to.
              </div>
              <button className="button -md -purple-1 text-white mt-20" onClick={()=> navigate('/')}>
                Go Back To Homepage
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
