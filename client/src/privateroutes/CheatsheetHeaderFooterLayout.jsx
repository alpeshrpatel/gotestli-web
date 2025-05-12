import FooterOne from "@/components/layout/footers/FooterOne";
import Header from "@/components/layout/headers/Header";
import { Outlet } from "react-router-dom";

const CheatSheetHeaderFooterLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container-fluid mx-auto py-8 px-6 flex-grow " style={{ marginTop: "12vh" }}>
        <Outlet />
      </main>
      <FooterOne />
    </div>
  );
};

export default CheatSheetHeaderFooterLayout;