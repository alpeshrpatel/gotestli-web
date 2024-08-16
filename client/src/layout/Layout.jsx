import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const metadata = {
    title:
      "Home-1 || Educrat - Professional LMS Online Education Course ReactJS Template",
    description:
      "Elevate your e-learning content with Educrat, the most impressive LMS template for online courses, education and LMS platforms.",
  };

  return (
    <>
      {/* <Wrapper> */}
        <Preloader />
        <MetaComponent meta={metadata} />
        <Header />
        <div className="content-wrapper  js-content-wrapper overflow-hidden w-100">
            <Outlet/>
          {/* <HomeHero />
          <Brands />
          <Categories />
          <Courses /> */}
          {/* <TestimonialsOne />
        <FeaturesOne />
        <WhyCourse />
        <Instructors />
        <GetApp />
        <Blog />
        <Join /> */}
          <FooterOne />
        </div>
      {/* </Wrapper> */}
    </>
  );
};

export default Layout;
