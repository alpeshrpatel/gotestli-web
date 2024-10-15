import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const metadata = {
    title:
      "Home-1 || GoTestli - Ultimate School & General Purpose Quiz Platform",
    description:
      "Elevate your e-learning content with GoTestli, the most impressive LMS template for online courses, education and LMS platforms.",
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
