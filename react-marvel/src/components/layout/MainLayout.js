// MainLayout.js
import React from "react";
import {Outlet} from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import "./MainLayout.css";

const MainLayout = () => {
  return (
      <div className="App">
        <Header/>
        <Outlet/>
        <Footer/>
      </div>
  );
};

export default MainLayout;
