import React from "react";
import {Link} from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
      <header className="app-header">
        <nav className="nav-links">
          <Link to="/">Home |</Link>
          <Link to="/about">About |</Link>
        </nav>
      </header>
  );
};

export default Header;
