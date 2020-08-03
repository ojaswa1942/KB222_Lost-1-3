import React from "react";
import { ReactComponent as LoaderSVG } from "../../assets/three-dots.svg";
import styles from "./Loader.module.css";

const Loader = ({ height }) => {
  return (
    <div className={styles.div}>
      <LoaderSVG height={height} className={styles.loader} />
    </div>
  );
};

export default Loader;
