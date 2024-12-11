import React from "react";
import "./leadership.css";

export default function LeadershipContent() {
  return (
    <div>
      <section className="leadership-section text-center">
        <div className="container-fluid" style={{ padding: "0px 5vw" }}>
          <h1 className=" mt-50">Our Leadership</h1>
          <div
            className="mb-5 rounded mx-auto"
            style={{
              height: "1px",
              width: "40px",
              border: "3px solid #5856d6",
            }}
          ></div>

          <div className="row">
            {/* <!-- Leader 1 --> */}
            <div className="col-lg-4 col-md-6 mb-4" >
              <div className="card leadership-card p-4 text-center bg-white border-0" style={{height:'60vh'}}>
                <img
                  src="/assets/img/leaders/leader1.png"
                  alt="Leader 1"
                  className="leadership-image mx-auto"
                />
                <div className="card-body">
                  <h5 className="leader-title">Hiral Patel</h5>
                  <p className="leader-position">Chief Executive Officer</p>
                  <p className="card-text">
                    An Engineer by Profession and an Entrepreneur by Choice.
                    Started her career with a Software Development background
                    and after moving to the United States started her own Real
                    Estate business and carved out a niche for the company.
                    Currently she is leading the technological development of a
                    product which will help the users and owners / service
                    providers alike. With her vast industry experience and
                    knowledge Cognitic LLC is definitely going places. To know
                    more reach out to her at CEO@Cogniticllc.com
                  </p>
                </div>
              </div>
            </div>

            {/* <!-- Leader 2 --> */}
            <div className="col-lg-4 col-md-6 mb-4" >
              <div className="card leadership-card p-4 text-center bg-white border-0" style={{height:'60vh'}}>
                <img
                  src="/assets/img/leaders/leader2.png"
                  alt="Leader 2"
                  className="leadership-image mx-auto"
                />
                <div className="card-body">
                  <h5 className="leader-title">Shikha Sharma</h5>
                  <p className="leader-position">Managing Director</p>
                  <p className="card-text">
                    A Commerce Graduate with Post Graduate Degree in Human
                    Resource Management from one of the premier institutes of
                    India. Started her career with Human Resource functions in
                    various US based consulting companies operating out of
                    India. After making a foray in Fitness Industry with
                    certification from companies like Gold's Gym etc partnered
                    with Hiral on a new Enterprising future. Her vast experience
                    in HR Management and Team handling is our strength. To know
                    more reach out to her at Sales@Cogniticllc.com
                  </p>
                </div>
              </div>
            </div>

            {/* <!-- Leader 3 --> */}
            <div className="col-lg-4 col-md-6 mb-4" >
              <div className="card leadership-card p-4 text-center bg-white border-0" style={{height:'60vh'}}>
                <img
                  src="/assets/img/leaders/leader3.png"
                  alt="Leader 3"
                  className="leadership-image mx-auto"
                />
                <div className="card-body">
                  <h5 className="leader-title">Shefali Joshi</h5>
                  <p className="leader-position">Associate Director HR</p>
                  <p className="card-text">
                    Masters of Computer Engineering by profession and Human
                    Resource professional by choice. Her initial jobs in Tech
                    Sales made her travel across India but she broke the chain
                    by taking a plunge to start our Indian operations to hire
                    and train Tech Talent for our Global customer needs. To know
                    more about the young blood in our team you can reach out to
                    her at Recruit@Cogniticllc.com
                  </p>
                </div>
              </div>
            </div>
             {/* <!-- Leader 4 --> */}
             <div className="col-lg-4 col-md-6 mb-4" >
              <div className="card leadership-card p-4 text-center bg-white border-0" style={{height:'60vh'}}>
                <img
                  src="/assets/img/leaders/leader4.jpeg"
                  alt="Leader 4"
                  className="leadership-image mx-auto"
                />
                <div className="card-body" >
                  <h5 className="leader-title">Dipak Karmur</h5>
                  <p className="leader-position">Head of Product Development</p>
                  <p className="card-text">
                  Computer Engineering graduate and an accomplished full-stack developer known for a passion for innovation and excellence. With extensive expertise in web development and modern technologies, he has a remarkable ability to transform complex ideas into intuitive, user-centric digital solutions. Driven by a relentless enthusiasm for development, he constantly explores new possibilities, staying ahead of industry trends. To discover more about the vibrant energy driving our team, feel free to connect with us at gotesli07@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
