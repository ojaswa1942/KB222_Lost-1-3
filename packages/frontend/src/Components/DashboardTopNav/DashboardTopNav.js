import React from "react";
import BellNotification from "../BellNotification/BellNotification";
import NavUser from "../NavUser/NavUser";
import styles from "./DashboardTopNav.module.css";

const DashboardTopNav = () => {
  return (
    <div className={styles.topNav}>
      <BellNotification />
      <span className={styles.itemGap} />
      <NavUser />
    </div>
  );
};

export default DashboardTopNav;
