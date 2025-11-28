import gsap from "gsap";
import { Link } from "react-router-dom";
import { ShapeRendering } from "../../../svg/index";
import React, { useEffect, useState } from "react";
import {
  faChevronRight,    // ChevronRight
  faBook,           // BookOpen (or faBookOpen if available)
  faAward,          // Award
  faUsers,          // Users
  faChartLine,      // TrendingUp
  faPlay,           // Play
  faCheckCircle,    // CheckCircle
  faArrowRight      // ArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AnimatedButton from "@/components/common/AnimatedButton";




const masthead_info = [
  {
    id: 1,
    icon: "/assets/img/masthead/icons/1.svg",
    text: "Over 12 million students",
  },
  {
    id: 2,
    icon: "/assets/img/masthead/icons/2.svg",
    text: "More than 60,000 courses",
  },
  {
    id: 3,
    icon: "/assets/img/masthead/icons/3.svg",
    text: "Learn anything online",
  },
];

const hero_content = {
  title: "Attend New Quizzes Created by Top ",
  text_underline: "Instructors",
  // info_hero: (
  //   <>
  //     Build skills with courses, certificates, and degrees online from
  //     <br /> world-class universities and companies.
  //   </>
  // ),
  starts: [
    "icon-star text-yellow-1 text-11",
    "icon-star text-yellow-1 text-11",
    "icon-star text-yellow-1 text-11",
    "icon-star text-yellow-1 text-11",
    "icon-star text-yellow-1 text-11",
  ],
};
const { title, text_underline, info_hero, starts } = hero_content;

const ChevronRight = ({ size = 20, className = "" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const BookOpen = ({ size = 24, className = "" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const Award = ({ size = 24, className = "" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="8" r="6" />
    <path d="m15.45 10.5 3.55 3v4.5l-3.55-1L12 19.5l-3.45-2.5L5 18.5V14l3.55-3.5" />
  </svg>
);

const Users = ({ size = 24, className = "" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="m22 21-1.5-1.5a4 4 0 0 0-2.5-1" />
    <circle cx="17" cy="7" r="4" />
  </svg>
);

const TrendingUp = ({ size = 24, className = "" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <polyline points="22,7 13.5,15.5 8.5,10.5 2,17" fill="none" stroke="currentColor" strokeWidth="2" />
    <polyline points="16,7 22,7 22,13" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const Play = ({ size = 24, className = "" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="5,3 19,12 5,21" />
  </svg>
);

const CheckCircle = ({ size = 24, className = "" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" fill="none" stroke="currentColor" strokeWidth="2" />
    <polyline points="22,4 12,14.01 9,11.01" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const ArrowRight = ({ size = 20, className = "" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 12h14" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="m12 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);



const learningSteps = [
  {
    title: "Sign Up & Profile Setup",
    description: "Create your personalized learning profile",
    icon: Users,
    color: "linear-gradient(135deg, #3b82f6, #06b6d4)"
  },
  {
    title: "Choose Your Path",
    description: "Select subjects and difficulty levels",
    icon: BookOpen,
    color: "linear-gradient(135deg, #8b5cf6, #ec4899)"
  },
  {
    title: "Take Practice Tests",
    description: "Interactive quizzes and mock exams",
    icon: Play,
    color: "linear-gradient(135deg, #10b981, #14b8a6)"
  },
  {
    title: "Track Progress",
    description: "Monitor your improvement over time",
    icon: TrendingUp,
    color: "linear-gradient(135deg, #f59e0b, #ef4444)"
  },
  {
    title: "Achieve Goals",
    description: "Earn certificates and badges",
    icon: Award,
    color: "linear-gradient(135deg, #eab308, #f59e0b)"
  }
];


const HomeHero = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1000);
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // Animate stats
    const timer = setTimeout(() => {
      setStats({ students: 10000, tests: 500, subjects: 12 });
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const parallaxIt = () => {
      const target = document.querySelectorAll(".js-mouse-move-container");

      target.forEach((container) => {
        const targets = container.querySelectorAll(".js-mouse-move");

        targets.forEach((el) => {
          const movement = el.getAttribute("data-move");

          document.addEventListener("mousemove", (e) => {
            const relX = e.pageX - container.offsetLeft;
            const relY = e.pageY - container.offsetTop;

            gsap.to(el, {
              x:
                ((relX - container.offsetWidth / 2) / container.offsetWidth) *
                Number(movement),
              y:
                ((relY - container.offsetHeight / 2) / container.offsetHeight) *
                Number(movement),
              duration: 0.2,
            });
          });
        });
      });
    };

    parallaxIt();

  }, []);

  return (
    <>
      <section className="masthead -type-1 js-mouse-move-container" style={{ height: '100%', paddingTop: '110px', paddingBottom: '50px' }}>
        <div className="masthead__bg " style={{ height: '100%', }}>
          <img src={"/assets/img/home-1/hero/bg-Photoroom.png"} alt="image" style={{ objectPosition: 'center right' }} />
        </div>

        <div className="container bg-transparent border-0 ">
          <div className="row y-gap-20  items-end  ">
            <div className="col-xl-12 col-lg-12 col-sm-10">
              <div
                className="masthead__content"
                data-aos="fade-up"
                data-aos-delay="500"
              >
                <h1 className="masthead__title  d-flex flex-wrap gap-4 justify-content-center align-items-center " style={{ color: 'white', whiteSpace: 'nowrap', fontSize: (isSmallScreen ? '1.4rem' : '45px') }}>

                  <span className="" style={{ display: 'inline' }}>
                    {title}{" "}
                  </span>
                  <span className="text-green-1 underline" style={{ display: 'inline' }}>
                    {text_underline}
                  </span>
                </h1>
                {/* <p
                  data-aos="fade-up"
                  data-aos-duration="100"
                  className="masthead__text"
                >
                  {info_hero}
                </p> */}
                <div
                  data-aos="fade-up"
                  data-aos-duration="200"
                  className="masthead__buttons  d-flex gap-4 justify-content-center "
                >
                  <div className="col-4 col-sm-auto ">
                    <Link
                      data-barba
                      to="/signup"
                      className={`button ${isSmallScreen ? `-sm` : `-md`} -purple-1 text-white`}
                    >
                      Join For Free
                    </Link>
                  </div>
                  <div className="col-4 col-sm-auto">
                    <Link
                      data-barba
                      to="/signup"
                      className={`button ${isSmallScreen ? `-sm` : `-md`} -outline-green-1 text-green-1`}
                    >
                      Find Quizzes
                    </Link>
                  </div>
                  <div className="col-4 col-sm-auto">
                    {/* <Link
                      data-barba
                      to="/play"
                      className={`button ${isSmallScreen ? `-sm` : `-md`} -outline-green-1 text-green-1`}
                    >
                      Play Quizzes
                    </Link> */}
                      <AnimatedButton />
                  </div>
                
                </div>
                {/* <div
                  data-aos="fade-up"
                  data-aos-duration="300"
                  className="masthead-info row y-gap-15 sm:d-none"
                >
                  {masthead_info.map((item, i) => (
                    <div
                      key={i}
                      className="masthead-info__item d-flex items-center text-white"
                    >
                      <div className="masthead-info__icon mr-10">
                        <img src={item.icon} alt="icon" />
                      </div>
                      <div className="masthead-info__title lh-1">
                        {item.text}
                      </div>
                    </div>
                  ))}
                </div> */}
              </div>
            </div>

            {/* <div
              className="col-xl-6 col-lg-6"
              data-aos="fade-up"
              data-aos-delay="700"
            >
              <div className="masthead-image">
                <div className="masthead-image__el1">
                  <img
                    className="js-mouse-move"
                    data-move="40"
                    style={{ objectFit: "cover" }}
                    src={"/assets/img/masthead/1.png"}
                    alt="image"
                  />
                  <div
                    data-move="30"
                    className="lg:d-none img-el -w-250 px-20 py-20 d-flex items-center bg-white rounded-8 js-mouse-move"
                  >
                    <div className="size-50 d-flex justify-center items-center bg-red-2 rounded-full">
                      <img src={"/assets/img/masthead/1.svg"} alt="icon" />
                    </div>
                    <div className="ml-20">
                      <div className="text-orange-1 text-16 fw-500 lh-1">
                        3.000 +
                      </div>
                      <div className="mt-3">Free Courses</div>
                    </div>
                  </div>
                </div>

                <div className="masthead-image__el2">
                  <img
                    className="js-mouse-move"
                    data-move="70"
                    src={"/assets/img/masthead/2.png"}
                    style={{ objectFit: "cover" }}
                    alt="image"
                  />
                  <div
                    data-move="60"
                    className="lg:d-none img-el -w-260 px-20 py-20 d-flex items-center bg-white rounded-8 js-mouse-move"
                  >
                    <img src={"/assets/img/masthead/4.png"} alt="icon" />
                    <div className="ml-20">
                      <div className="text-dark-1 text-16 fw-500 lh-1">
                        Ali Tufan
                      </div>
                      <div className="mt-3">UX/UI Designer</div>
                      <div className="d-flex x-gap-5 mt-3">
                        {starts.map((start, index) => (
                          <div key={index}>
                            <div className={start}></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="masthead-image__el3">
                  <img
                    className="js-mouse-move"
                    data-move="40"
                    src={"/assets/img/masthead/3.png"}
                    style={{ objectFit: "cover" }}
                    alt="image"
                  />
                  <div
                    data-move="30"
                    className="shadow-4 img-el -w-260 px-30 py-20 d-flex items-center bg-white rounded-8 js-mouse-move"
                  >
                    <div className="img-el__side">
                      <div className="size-50 d-flex justify-center items-center bg-purple-1 rounded-full">
                        <img
                          style={{ objectFit: "cover" }}
                          src={"/assets/img/masthead/2.svg"}
                          alt="icon"
                        />
                      </div>
                    </div>
                    <div className="">
                      <div className="text-purple-1 text-16 fw-500 lh-1">
                        Congrats!
                      </div>
                      <div className="mt-3">Your Admission Completed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="container-fluid py-5 my-5">
            <div className="row justify-content-center text-center mb-5">
              <div className="col-12">
                <h2 className="display-3 fw-bold text-white mb-4">
                  Your Learning <span
                    style={{
                      background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >Journey</span>
                </h2>
                <p className="fs-4 mx-auto" style={{ color: '#cbd5e1', maxWidth: '600px' }}>
                  Follow our interactive 5-step process to achieve your educational goals
                </p>
              </div>
            </div>

            <div className="position-relative">
              {/* Progress Line */}
              <div
                className="position-absolute d-none d-md-block"
                style={{
                  top: '50px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80%',
                  height: '4px',
                  background: '#374151',
                  borderRadius: '2px',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                    borderRadius: '2px',
                    width: `${(activeStep / (learningSteps.length - 1)) * 100}%`,
                    transition: 'width 1s ease-out'
                  }}
                />
              </div>

              {/* Steps */}
              <div className="row g-4">
                {learningSteps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = index === activeStep;
                  const isCompleted = index < activeStep;

                  return (
                    <div key={index} className="col-12 col-md text-center">
                      <div
                        style={{
                          cursor: 'pointer',
                          transition: 'all 0.5s ease',
                          transform: isActive ? 'scale(1.1)' : 'scale(1)'
                        }}
                        onMouseEnter={() => setActiveStep(index)}
                        onClick={() => setActiveStep(index)}
                      >
                        <div
                          className="mx-auto mb-3 rounded-circle d-flex align-items-center justify-content-center position-relative"
                          style={{
                            width: '64px',
                            height: '64px',
                            background: isActive
                              ? step.color
                              : isCompleted
                                ? 'linear-gradient(135deg, #10b981, #14b8a6)'
                                : '#374151',
                            transition: 'all 0.5s ease',
                            boxShadow: isActive ? '0 10px 25px rgba(139, 92, 246, 0.5)' : 'none'
                          }}
                        >
                          {isCompleted && index !== activeStep ? (
                            <CheckCircle className="text-white" size={24} />
                          ) : (
                            <Icon className="text-white" size={24} />
                          )}

                          {isActive && (
                            <div
                              className="position-absolute rounded-circle"
                              style={{
                                inset: '-4px',
                                background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                                opacity: 0.75,
                                animation: 'pulseGlow 2s infinite',
                                zIndex: -1
                              }}
                            />
                          )}
                        </div>

                        <h5
                          className="fw-semibold mb-2"
                          style={{
                            color: isActive ? '#ffffff' : '#cbd5e1',
                            transition: 'color 0.3s ease'
                          }}
                        >
                          {step.title}
                        </h5>

                        <p
                          className="small"
                          style={{
                            color: isActive ? '#cbd5e1' : '#94a3b8',
                            opacity: isActive ? 1 : 0.7,
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <style jsx>{`
        @keyframes pulseGlow {
          0%, 100% { 
            opacity: 0.75; 
            transform: scale(1);
          }
          50% { 
            opacity: 0.25; 
            transform: scale(1.15);
          }
        }
          `}
          </style>
        </div>

        {/* animated shape start */}
        {/* <ShapeRendering /> */}
        {/* animated shape end */}
      </section>
    </>
  );
};

export default HomeHero;
