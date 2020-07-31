import React from "react";
import styles from "./GenericButton.module.css";

const GenericButton = ({ children, background, onClick, width }) => {
  return (
    <button
      type="button"
      className={styles.button}
      styles={{ background: background || "#fff", width: width || "max-content" }}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 13) onClick(e);
      }}
    >
      {children}
    </button>
  );
};

export default GenericButton;
