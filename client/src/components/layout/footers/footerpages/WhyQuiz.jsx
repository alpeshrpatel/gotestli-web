import React from "react";
import { steps } from "../../../../data--backup/steps";
export default function WhyQuiz() {
  return (
    // style={{backgroundColor:'#6440FB'}}
    <section className="layout-pt-lg layout-pb-lg bg-dark-2" style={{marginBottom:'100px'}}>
      <div className="container-fluid" style={{ padding: "0px 5vw" }}>
        <div className="row justify-center text-center">
          <div className="col-auto">
            <div className="sectionTitle ">
              <h2
                className="sectionTitle__title text-white"
                data-aos="fade-up"
                data-aos-duration={800}
              >
                Why take quizzes on our platform?
              </h2>

              <p
                className="sectionTitle__text text-white"
                data-aos="fade-up"
                data-aos-duration={800}
              >
                Access a wide range of quizzes designed by top instructors,
                track your progress, and get instant feedback to enhance your
                knowledge and skills!
              </p>
            </div>
          </div>
        </div>

        <div className="row y-gap-30 pt-50" >
          {steps.map((elm, i) => (
            <div
              key={i}
              className="col-lg-4 col-md-6"
              data-aos="fade-up"
              data-aos-duration={(i + 1) * 400}
            >
              <div className="stepCard -type-1 -stepCard-hover">
                <div className="stepCard__content" style={{ height: "400px" }}>
                  <div className="stepCard__icon">
                    <i className={elm.icon}></i>
                  </div>
                  <h4 className="stepCard__title">{elm.title}</h4>
                  <p className="stepCard__text text-16 xl:text-18"> {elm.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
