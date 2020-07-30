import React from "react";
import APLogo from "../../assets/APLogo.png";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footerNav}>
        <div className={styles.footerHead}>
          <img src={APLogo} alt="AP Logo" className={styles.footerLogo} />
          <h3>
            ANDHRA PRADESH
            <br />
            GOVERNMENT
          </h3>
        </div>
        <div className={styles.footerSection}>
          <h4 className={styles.footerNavHeads}>SITEMAP</h4>
          <a href="/#" className={styles.footerLink}>
            Home
          </a>
          <a href="/#" className={styles.footerLink}>
            About
          </a>
          <a href="/#" className={styles.footerLink}>
            Contact Us
          </a>
        </div>
        <div className={styles.footerSection}>
          <h4 className={styles.footerNavHeads}>PRIVACY</h4>
          <a href="/#" className={styles.footerLink}>
            Disclaimer
          </a>
          <a href="/#" className={styles.footerLink}>
            Privacy Policy
          </a>
          <a href="/#" className={styles.footerLink}>
            Rules and Regulations
          </a>
        </div>
      </div>
      <div className={styles.footerCopyright}>
        <span>All Rights Reserved. &copy; AP Government, SIH 2020</span>
      </div>
    </div>
  );
};

export default Footer;
