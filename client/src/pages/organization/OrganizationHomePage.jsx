import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const OrganizationHomePage = ({orgName}) => {
  // Sample data - replace with your actual data or API calls
  const [organization, setOrganization] = useState({
    name: orgName,
    logoUrl: 'https://www.axisgroup.com/hubfs/Axis_LogoEPS.svg',
    tagline: 'Empowering businesses through innovative technology',
    description: 'We provide cutting-edge software solutions to help businesses streamline their operations and maximize efficiency.',
    partnerLogos: [
      { id: 1, name: 'Partner 1', logoUrl: 'https://via.placeholder.com/100' },
      { id: 2, name: 'Partner 2', logoUrl: 'https://via.placeholder.com/100' },
      { id: 3, name: 'Partner 3', logoUrl: 'https://via.placeholder.com/100' },
      { id: 4, name: 'Partner 4', logoUrl: 'https://via.placeholder.com/100' },
    ],
    features: [
      { id: 1, title: 'Multi-Tenant Architecture', description: 'Secure isolation with shared resources', icon: 'bi-layers' },
      { id: 2, title: 'Custom Branding', description: 'Personalized experience for each client', icon: 'bi-palette' },
      { id: 3, title: 'Advanced Analytics', description: 'Actionable insights from your data', icon: 'bi-graph-up' },
      { id: 4, title: 'Enterprise Security', description: 'Industry-leading data protection', icon: 'bi-shield-check' },
    ],
    testimonials: [
      { id: 1, text: 'This platform transformed how we manage our resources.', author: 'Jane Smith, CEO at XYZ Corp' },
      { id: 2, text: 'Implementation was smooth and the results exceeded our expectations.', author: 'John Davis, CTO at ABC Inc' },
    ]
  });

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      {/* Navigation Bar */}
      <header className="header -base js-header">
            <div className="header__container py-2 " style={{backgroundColor:'#1a064f', borderBottom:'0.5px solid white'}}>
              <div className="row justify-between items-center">
                <div className="col-auto">
                  <div className="header-left">
                    <div className="header__logo ">
                      <Link data-barba to="/">
                      <img src="/assets/img/header-logo3.png" alt="logo" style={{height:'auto', width:'140px'}}/>
                      </Link>
                    </div>
                  </div>
                </div>
      
                <div className="col-auto">
                  <div className="header-right d-flex items-center">
                    {/* <Menu allClasses={"menu__nav text-white -is-active"} />
                    <MobileMenu
                      activeMobileMenu={activeMobileMenu}
                      setActiveMobileMenu={setActiveMobileMenu}
                    /> */}
      
                    <div className="mr-30">
                      <div className="d-none xl:d-block ml-20">
                        <button
                          className="text-dark-1 items-center"
                          data-el-toggle=".js-mobile-menu-toggle"
                          onClick={() => setActiveMobileMenu(true)}
                        >
                          <i className="text-11 icon icon-mobile-menu"></i>
                        </button>
                      </div>
                    </div>
      
                    <div className="header-right__buttons md:d-none" >
                      <a
                        href="signup"
                        className="button signUpButton -sm -rounded -dark-1 text-white "
                        style={{backgroundColor:'#6440fb'}}
                      >
                        Sign Up
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

      {/* Hero Section */}
      <header className="py-5 text-white" style={{ background: "linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)" , marginTop:'15vh'}}>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold">{organization.name}</h1>
              <p className="lead">{organization.tagline}</p>
              <p>{organization.description}</p>
              <div className="mt-4">
                <button className="btn btn-light btn-lg me-2">Get Started</button>
                <button className="btn btn-outline-light btn-lg">Learn More</button>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <img src="https://www.axisgroup.com/hubfs/Axis_LogoEPS.svg" alt="Platform Preview" className="img-fluid rounded shadow" />
            </div>
          </div>
        </div>
      </header>

      {/* Partners Section */}
      <section className="py-5 bg-light">
        <div className="container-fluid">
          <h2 className="text-center mb-4">Trusted By Leading Organizations</h2>
          <div className="row justify-content-center">
            {organization.partnerLogos.map((partner, index) => (
              <div key={partner.id} className="col-6 col-md-3 text-center mb-4">
                <div style={{ position: "relative", display: "inline-block" }}>
                  <img 
                    src={partner.logoUrl} 
                    alt={partner.name} 
                    className="img-fluid" 
                    style={{ 
                      maxHeight: "60px", 
                      transition: "transform 0.3s ease" 
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                    onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                  />
                  {index < organization.partnerLogos.length - 1 && (
                    <span style={{ 
                      position: "absolute", 
                      top: "50%", 
                      right: "-15px", 
                      transform: "translateY(-50%)", 
                      fontWeight: "bold", 
                      color: "#6c757d" 
                    }}>✕</span>
                  )}
                </div>
                <p className="mt-2">{partner.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      {/* <section className="py-5">
        <div className="container-fluid">
          <h2 className="text-center mb-5">Why Choose Our Platform</h2>
          <div className="row">
            {organization.features.map(feature => (
              <div key={feature.id} className="col-md-6 col-lg-3 mb-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <div className="mb-3 mx-auto d-flex align-items-center justify-content-center" 
                         style={{ 
                           height: "80px", 
                           width: "80px", 
                           borderRadius: "50%", 
                           backgroundColor: "rgba(13, 110, 253, 0.1)",
                           transition: "transform 0.3s ease"
                         }}
                         onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                         onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                    >
                      <i className={`bi ${feature.icon} fs-1 text-primary`}></i>
                    </div>
                    <h5 className="card-title">{feature.title}</h5>
                    <p className="card-text">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

     
      {/* <section className="py-5 bg-light">
        <div className="container-fluid">
          <h2 className="text-center mb-5">What Our Clients Say</h2>
          <div className="row justify-content-center">
            {organization.testimonials.map(testimonial => (
              <div key={testimonial.id} className="col-lg-5 mb-4">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body">
                    <blockquote className="blockquote mb-0">
                      <p><i className="bi bi-quote text-primary fs-1 me-2"></i> {testimonial.text}</p>
                      <footer className="blockquote-footer mt-2">{testimonial.author}</footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

     
      {/* <section className="py-5 text-white" style={{ background: "linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)" }}>
        <div className="container-fluid text-center">
          <h2 className="mb-3">Ready to transform your business?</h2>
          <p className="lead mb-4">Join thousands of organizations already using our platform</p>
          <button className="btn btn-light btn-lg px-4 me-2">Request Demo</button>
          <button className="btn btn-outline-light btn-lg px-4">Contact Sales</button>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="py-4 bg-dark text-white">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 mb-3">
              <h5>{organization.name}</h5>
              <p className="small">{organization.tagline}</p>
              <p className="small">© 2025 {organization.name}. All rights reserved.</p>
            </div>
            <div className="col-lg-2 mb-3">
              <h5>Product</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-decoration-none text-white-50">Features</a></li>
                <li><a href="#" className="text-decoration-none text-white-50">Pricing</a></li>
                <li><a href="#" className="text-decoration-none text-white-50">Documentation</a></li>
                <li><a href="#" className="text-decoration-none text-white-50">Releases</a></li>
              </ul>
            </div>
            <div className="col-lg-2 mb-3">
              <h5>Company</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-decoration-none text-white-50">About</a></li>
                <li><a href="#" className="text-decoration-none text-white-50">Careers</a></li>
                <li><a href="#" className="text-decoration-none text-white-50">Contact</a></li>
                <li><a href="#" className="text-decoration-none text-white-50">Partners</a></li>
              </ul>
            </div>
            <div className="col-lg-4 mb-3">
              <h5>Stay Connected</h5>
              <p className="small">Subscribe to our newsletter for updates</p>
              <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="Email address" />
                <button className="btn btn-primary" type="button">Subscribe</button>
              </div>
              <div>
                <a href="#" className="text-white-50 me-2" style={{ fontSize: "1.2rem", transition: "color 0.3s ease" }} 
                   onMouseOver={(e) => e.currentTarget.style.color = "#ffffff"}
                   onMouseOut={(e) => e.currentTarget.style.color = ""}
                ><i className="bi bi-twitter"></i></a>
                <a href="#" className="text-white-50 me-2" style={{ fontSize: "1.2rem", transition: "color 0.3s ease" }}
                   onMouseOver={(e) => e.currentTarget.style.color = "#ffffff"}
                   onMouseOut={(e) => e.currentTarget.style.color = ""}
                ><i className="bi bi-linkedin"></i></a>
                <a href="#" className="text-white-50 me-2" style={{ fontSize: "1.2rem", transition: "color 0.3s ease" }}
                   onMouseOver={(e) => e.currentTarget.style.color = "#ffffff"}
                   onMouseOut={(e) => e.currentTarget.style.color = ""}
                ><i className="bi bi-facebook"></i></a>
                <a href="#" className="text-white-50" style={{ fontSize: "1.2rem", transition: "color 0.3s ease" }}
                   onMouseOver={(e) => e.currentTarget.style.color = "#ffffff"}
                   onMouseOut={(e) => e.currentTarget.style.color = ""}
                ><i className="bi bi-instagram"></i></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OrganizationHomePage;