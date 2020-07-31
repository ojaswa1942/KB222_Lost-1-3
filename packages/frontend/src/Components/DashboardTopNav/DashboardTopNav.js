import React from "react";
import BellNotification from "../BellNotification/BellNotification";
import LogoHead from "../LogoHead/LogoHead";
import NavUser from "../NavUser/NavUser";
import styles from "./DashboardTopNav.module.css";

const DashboardTopNav = () => {
  return (
    <div className={styles.topNav}>
      <div className={styles.logoHead}>
        <LogoHead />
      </div>
      <div className={styles.rightSide}>
        <BellNotification />
        <span className={styles.itemGap} />
        <NavUser />
      </div>
    </div>
  );
};

export default DashboardTopNav;
