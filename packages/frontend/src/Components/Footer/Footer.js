import React from "react";
import APLogo from "../../assets/APLogo.png";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footerContainer">
      <div className="footerNav">
        <div className="footerHead">
          <img src={APLogo} alt="AP Logo" className="footerLogo" />
          <h3>ANDHRA PRADESH<br/>GOVERNMENT</h3>
        </div>
        <div className="footerSection">
          <h4 className="footerNavHeads">SITEMAP</h4>
          <a href="/#" className="footerLink">
            Home
          </a>
          <a href="/#" className="footerLink">
            About
          </a>
          <a href="/#" className="footerLink">
            Contact Us
          </a>
        </div>
        <div className="footerSection">
          <h4 className="footerNavHeads">PRIVACY</h4>
          <a href="/#" className="footerLink">
            Disclaimer
          </a>
          <a href="/#" className="footerLink">
            Privacy Policy
          </a>
          <a href="/#" className="footerLink">
            Rules and Regulations
          </a>
        </div>
      </div>
      <div className="footerCopyright">
        <span>All Rights Reserved. &copy; AP Government, SIH 2020</span>
      </div>
    </div>
  );
};

export default Footer;
