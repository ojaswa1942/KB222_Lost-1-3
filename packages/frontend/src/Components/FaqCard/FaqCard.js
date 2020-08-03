/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import classNames from "classnames";
import styles from "./FaqCard.module.css";
import { ReactComponent as Down } from "../../assets/icons/icons8_expand_arrow_3.svg";

const FaqCard = ({ id, question, answer, openId, setOpenId }) => {
  return (
    <div className={styles.faqCard}>
      <div
        className={styles.quesDiv}
        onClick={() => {
          setOpenId(id);
          // eslint-disable-next-line no-console
          console.log(openId);
        }}
      >
        <div className={styles.question}>{question}</div>
        <Down />
      </div>
      <div className={classNames(styles.noAns, { [styles.ansDiv]: openId === id })}>{answer}</div>
    </div>
  );
};

export default FaqCard;
