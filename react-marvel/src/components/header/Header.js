import React from "react";
import {Link} from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
      <header className="app-header">
        <div className="header-content">
          {/* Left: Logo / Title */}
          <div className="logo">
            <Link to="/">Marvel Land</Link>
          </div>

          {/* Middle: Nav Links */}
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </nav>

          {/* Right: Search */}
          <div className="search-container">
            <input
                type="text"
                placeholder="Search Marvels..."
                className="search-box"
            />
            <button className="search-btn">Search</button>
          </div>
        </div>
      </header>
  );
};

export default Header;
