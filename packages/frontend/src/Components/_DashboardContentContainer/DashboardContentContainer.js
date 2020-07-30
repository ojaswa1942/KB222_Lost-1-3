import React from "react";
import styles from './DashboardContentContainer.module.css'

const DashboardContentContainer = ({ children }) => {
  return (
    <div className={styles.dashboardContentContainer} >
      {children}
    </div>
  );
};

export default DashboardContentContainer;
