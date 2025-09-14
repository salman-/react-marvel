import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
      <footer className="footer">
        <p className="footer-text">
          Data provided by Marvel. © 2014 Marvel
        </p>
        <p className="footer-text">
          App developed by <span className="highlight">Salman Lashkarara</span>
        </p>
      </footer>
  );
};

export default Footer;
