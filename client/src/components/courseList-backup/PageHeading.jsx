import React from "react";

export default function PageHeading() {
  return (
    <section className="page-header -type-1">
      <div className="container-fluid">
        <div className="page-header__content">
          <div className="row">
            <div className="col-12" style={{textAlign:'center'}}>
              <div>
                <h1 className="page-header__title mt-30">Become an Instructor</h1>
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
                We’re on a mission to deliver engaging, curated courses at a
                reasonable price.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
