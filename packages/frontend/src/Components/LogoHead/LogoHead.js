import React from "react";
import { Link } from "react-router-dom";
import APLogo from "../../assets/APLogo.png";
import styles from "./LogoHead.module.css";

const LogoHead = ({ isWhite }) => {
  return (
    <div className={styles.logoHead}>
      <Link to="/">
        <img src={APLogo} alt="AP Logo" className={styles.apLogo} />
      </Link>
      <div className={`${styles.logoBody} ${isWhite && styles.whiteText}`}>
        <span className={styles.logoHeading}>
          Andhra Pradesh
          <br />
          Central Fund's Portal
        </span>
        <span className={styles.logoSubHead}>Official State Portal</span>
      </div>
    </div>
  );
};

export default LogoHead;
