import React from "react";
import styles from "./MessengerView.module.css";
import { ReactComponent as Delete } from "../../assets/icons/delete_bin.svg";
import { ReactComponent as ChatLogo } from "../../assets/icons/icons8_messaging.svg";

const MessengerView = ({ id, name, description, entity, sanctionedAmount, handleDeleteFn }) => {
  const callDelete = (event) => {
    if (event.type === `keydown` && event.key !== 13) return;
    handleDeleteFn(id);
  };

  return (
    <div className={styles.schemeCard}>
      <div className={styles.titleDiv}>
        <h2>Scheme Name : {name}</h2>
        <button
          type="button"
          className={styles.deleteBtn}
          onClick={callDelete}
          onKeyDown={callDelete}
        >
          <Delete className={styles.deleteLogo} />
        </button>
      </div>
      <p>{description}</p>
      <div className={styles.lowerDiv}>
        <div className={styles.textDiv}>
          <div>Entity : {entity}</div>
          <div>Sanctioned Amount : Rs.{sanctionedAmount}</div>
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

export default MessengerView;
