import React from "react";
import styles from "./SchemeCard.module.css";
import { ReactComponent as Delete } from "../../assets/icons/delete_bin.svg";
import { ReactComponent as ChatLogo } from "../../assets/icons/icons8_messaging.svg";

const SchemeCard = ({ name, description, entity, sanctionedAmount }) => {
  return (
    <div className={styles.schemeCard}>
      <div className={styles.titleDiv}>
        <h2>Scheme Name : {name}</h2>
        <button type="button" className={styles.deleteBtn}>
          <Delete className={styles.deleteLogo} />
        </button>
      </div>
      <p>{description}</p>
      <div className={styles.lowerDiv}>
        <div className={styles.textDiv}>
          <h4>Entity : {entity}</h4>
          <h4>Sanctioned Amount : Rs.{sanctionedAmount}</h4>
        </div>
        <div className={styles.btnsDiv}>
          <button type="button" className={styles.cardBtns}>
            Know More
          </button>
          <button type="button" className={styles.cardBtns}>
            <ChatLogo className={styles.chatLogo} />
            Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default SchemeCard;
