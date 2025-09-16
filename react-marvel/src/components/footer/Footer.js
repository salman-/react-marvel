import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
      <footer className="footer">
        <p className="footer-text">
          Data provided by Marvel. © 2014 Marvel
        </p>
        <span className="separator">|</span>
        <p className="footer-text">
          Developed by <span className="highlight">Salman Lashkarara</span>
        </p>
      </footer>
  );
};

export default Footer;
