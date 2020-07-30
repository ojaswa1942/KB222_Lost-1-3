import React from "react";
import styles from "./HomeNav.module.css";

const HomeNav = () => {
  return (
    <div>
      <nav className={styles.homeNav}>
        <a href="/#" className={styles.homeNavLink}>
          About Us
        </a>
        <a href="/#" className={styles.homeNavLink}>
          Contact Us
        </a>
      </nav>
    </div>
  );
};

export default HomeNav;
