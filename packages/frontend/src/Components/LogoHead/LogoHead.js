import React from "react";
import "./LogoHead.css";
import APLogo from "../../Assets/APLogo.png";

const LogoHead = ({ isWhite }) => {
  return (
    <div className="logoHead">
      <img src={APLogo} alt="AP Logo" className="apLogo" />
      <div className={`logoBody ${isWhite && "whiteText"}`}>
        <span className="logoHeading">Andhra Pradesh</span>
        <span className="logoHeading">Central Fund's Portal</span>
        <span className="logoSubHead">Official State Portal</span>
      </div>
    </div>
  );
};

export default LogoHead;
