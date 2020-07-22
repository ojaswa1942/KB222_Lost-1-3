import React from "react";
import "./LogoHead.css";
import APLogo from "../../Assets/APLogo.png";

const LogoHead = () => {
  return (
    <div className="logoHead">
      <img src={APLogo} alt="AP Logo" className="apLogo"/>
      <div className="logoBody">
        <span className="logoHeading">Andhra Pradesh</span>
        <span className="logoHeading">Central Fund's Portal</span>
        <span className="logoSubHead">Official State Portal</span>
      </div>
    </div>
  );
};

export default LogoHead;
