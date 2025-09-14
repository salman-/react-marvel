import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./../footer/Footer";

const MainLayout = () => {
  return (
      <div className="App">
        <Outlet /> {/* This is where routed pages will render */}
        <Footer />
      </div>
  );
};

export default MainLayout;
