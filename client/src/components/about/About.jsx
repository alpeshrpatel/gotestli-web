import React from "react";

import { Link } from "react-router-dom";
export default function About() {
  return (
    <>
      <section className="page-header -type-1 mt-20">
        <div className="container-fluid">
          <div className="page-header__content">
            <div className="row justify-center text-center">
              <div className="col-auto">
                <div>
                  <h1 className="page-header__title">About Us</h1>
                  <div
                    className="mb-5 rounded mx-auto"
                    style={{
                      height: "1px",
                      width: "40px",
                      border: "3px solid #5856d6",
                    }}
                  ></div>
                </div>

                <div>
                  <p className="page-header__text">
                    We’re dedicated to providing engaging and expertly crafted
                    quizzes that make learning accessible and enjoyable for
                    everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="layout-pt-md layout-pb-lg">
        <div className="container-fluid" style={{ padding: "0px 5vw" }}>
          <div className="row y-gap-50 justify-between items-center">
            <div className="col-lg-6 pr-50 sm:pr-15">
              <div className="composition -type-8">
                <div className="-el-1">
                  <img src="/assets/img/about-1/1.png" alt="image" />
                </div>
                <div className="-el-2">
                  <img src="/assets/img/about-1/2.png" alt="image" />
                </div>
                <div className="-el-3">
                  <img src="/assets/img/about-1/3.png" alt="image" />
                </div>
              </div>
            </div>

            <div className="col-lg-5">
              <h2 className="text-30 lh-16">Welcome to GoTestli!</h2>
              <p className="text-dark-1 mt-30">
                Boost your knowledge with expertly designed quizzes across
                various subjects. Whether you're preparing for exams or simply
                looking to challenge yourself, our platform offers question sets
                created by top instructors to help you grow.
              </p>
              <p className="pr-50 lg:pr-0 mt-25">
                Start your quiz today, track your progress, and get instant
                feedback—all for free! Explore our collection of quizzes and
                test your skills at your own pace.
              </p>
              <div className="d-inline-block">
                <Link
                  to="/signup"
                  className="button -md -purple-1 text-white mt-30"
                >
                  Start Learning For Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
