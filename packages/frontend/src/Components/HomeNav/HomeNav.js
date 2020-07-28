import React from "react";
import './HomeNav.css'

const HomeNav = () => {
  return (
    <div>
      <nav className="homeNav">
        <a href="/#" className="homeNavLink">
          About Us
        </a>
        <a href="/#" className="homeNavLink">
          Contact Us
        </a>
      </nav>
    </div>
  );
};

export default HomeNav;
