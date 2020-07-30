import React from "react";
import BellNotification from "../BellNotification/BellNotification";
import styles from "./DashboardTopNav.module.css";

const DashboardTopNav = () => {
  return (
    <div className={styles.topNav}>
      <span> TopNav hun mai ! </span>
      <BellNotification />
    </div>
  );
};

export default DashboardTopNav;
