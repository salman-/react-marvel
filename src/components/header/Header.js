import React from "react";
import {Link} from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
      <header className="app-header">
        <div className="header-content">
          {/* Left: Logo / Title */}
          <div className="logo">
            <Link to="/">Legend Land</Link>
          </div>
        </div>
      </header>
  );
};

export default Header;
