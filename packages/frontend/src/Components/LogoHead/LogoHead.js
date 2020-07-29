import React from "react";
import { Link } from "react-router-dom";
import APLogo from "../../assets/APLogo.png";
import "./LogoHead.css";

const LogoHead = ({ isWhite }) => {
  return (
    <div className="logoHead">
      <Link to='/'>
        <img src={APLogo} alt="AP Logo" className="apLogo" />
      </Link>
      <div className={`logoBody ${isWhite && "whiteText"}`}>
        <span className="logoHeading">Andhra Pradesh<br />Central Fund's Portal</span>
        <span className="logoSubHead">Official State Portal</span>
      </div>
    </div>
  );
};

export default LogoHead;
