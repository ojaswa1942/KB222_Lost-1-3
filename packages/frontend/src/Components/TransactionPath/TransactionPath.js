import React from "react";
import styles from "./TransactionPath.module.css";
import { ReactComponent as CheckSign } from "../../assets/icons/icons8_checked_1.svg";
import { ReactComponent as IssueSign } from "../../assets/icons/icons8-high-importance.svg";

const TransactionPath = ({ txn }) => {
  return (
    <div className={`${styles.ongoingTxnDiv}`}>
      <div className={styles.statusDiv}>
        <div className={styles.checkpointDiv}>
          <div className={`${styles.statusPoint} ${styles.donePoint} `}>
            <div className={`${styles.innerPoint} ${styles.innerActivePoint} `} />
          </div>
          <span className={`${styles.statusTextPoint} ${styles.doneTextPoint} `}>Initiated</span>
        </div>
        <span className={`${styles.statusConnector} ${styles.doneConnector} `} />
        <div className={styles.checkpointDiv}>
          <div className={`${styles.statusPoint} ${styles.donePoint} `}>
            <div className={`${styles.innerPoint} ${styles.innerActivePoint} `} />
          </div>
          <span className={`${styles.statusTextPoint} ${styles.doneTextPoint} `}>
            Processing Request
          </span>
        </div>
        <span className={`${styles.statusConnector} ${styles.doneConnector} `} />
        <div className={styles.checkpointDiv}>
          <div
            className={`${styles.statusPoint} ${txn.status === "COMPLETED" && styles.donePoint} `}
          >
            <div
              className={`${styles.innerPoint} ${
                txn.status === "COMPLETED" && styles.innerActivePoint
              } `}
            />
          </div>
          <span
            className={`${styles.statusTextPoint} ${
              txn.status === "COMPLETED" && styles.doneTextPoint
            } `}
          >
            Awaiting Confirmation
          </span>
        </div>
        <span
          className={`${styles.statusConnector} ${
            txn.status === "COMPLETED" && styles.doneConnector
          } `}
        />
        <div className={styles.checkpointDiv}>
          <div
            className={`${styles.statusPoint} ${txn.status === "COMPLETED" && styles.donePoint} `}
          >
            <div
              className={`${styles.innerPoint} ${
                txn.status === "COMPLETED" && styles.innerActivePoint
              } `}
            />
          </div>
          <span
            className={`${styles.statusTextPoint} ${
              txn.status === "COMPLETED" && styles.doneTextPoint
            } `}
          >
            Completed
          </span>
        </div>
      </div>
      <div className={styles.lowerDiv}>
        <div className={styles.datesDiv}>
          <span>Initiated On: {txn.initiateDate}</span>
        </div>
        <div className={styles.buttons}>
          <button
            value="recieved"
            type="button"
            className={`${styles.recievedBtn} ${txn.status === "COMPLETED" && styles.noOngoing}`}
          >
            Recieved
            <CheckSign className={styles.buttonLogo} />
          </button>
          <button type="button" className={styles.issueBtn}>
            Raise Issue
            <IssueSign className={styles.buttonLogo} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionPath;
