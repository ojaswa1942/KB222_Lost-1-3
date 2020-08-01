import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import styles from "./DisbursalStatus.module.css";
import { ReactComponent as CheckSign } from "../../assets/icons/icons8-checked.svg";
import { ReactComponent as IssueSign } from "../../assets/icons/icons8-high-importance.svg";
import { ReactComponent as AddSign } from "../../assets/icons/add.svg";
// import { ReactComponent as ChatSign } from "../../assets/icons/icons8_messaging.svg";

const DisbursalStatus = () => {
  const [selectedScheme, updateScheme] = useState("");
  const [schemeTxns] = useState({
    scheme: "MNREGA",
    previousTxns: [
      {
        txnID: "N48FGHYSN489F4N684MXZ5HJKF",
        txnAmount: 1543500,
        recievedDate: "20/02/2020",
      },
      {
        txnID: "N48FGHYSN489F4N684MXZ5HJKF",
        txnAmount: 1543500,
        recievedDate: "20/02/2020",
      },
      {
        txnID: "N48FGHYSN489F4N684MXZ5HJKF",
        txnAmount: 1543500,
        recievedDate: "20/02/2020",
      },
      {
        txnID: "N48FGHYSN489F4N684MXZ5HJKF",
        txnAmount: 1543500,
        recievedDate: "20/02/2020",
      },
      {
        txnID: "N48FGHYSN489F4N684MXZ5HJKF",
        txnAmount: 1543500,
        recievedDate: "20/02/2020",
      },
    ],
    ongoingTxn: {
      txnID: "N48FGHYSN489F4N684MXZ5HJKF",
      txnAmount: 1543500,
      initiateDate: "07/03/2020",
      status: "FundsAlloted",
      expectedDate: "20/03/2020",
      raiseIssueDate: "25/03/2020",
    },
  });

  const handleSubmit = (e) => {
    updateScheme(e.target.value);
  };

  const toIndSys = (x) => {
    const num = x.toString();
    let lastThree = num.substring(num.length - 3);
    const otherNumbers = num.substring(0, num.length - 3);
    if (otherNumbers !== "") lastThree = `,  ${lastThree}`;
    const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  };

  return (
    <>
      <div className={styles.disbursalPage}>
        <div className={styles.header}>
          <h1 className={styles.head}>Disbursal Status</h1>
          <div className={styles.selectschemeDiv}>
            <label htmlFor="schemes" className={styles.selectScheme}>
              <h4>Choose Scheme</h4>
              <select name="schemes" onChange={handleSubmit}>
                <option value="">Select Scheme</option>
                <option value="MNREGA">MNREGA</option>
                <option value="Jan Dhan Yojana">Jan Dhan Yojana</option>
                <option value="Kuch bhi Yojana">Kuch bhi Yojana</option>
                <option value="Yayy Yojana">Yayy Yojana</option>
              </select>
            </label>
          </div>
        </div>
        <div
          className={`${styles.ongoingTxnDiv} ${
            Object.keys(schemeTxns.ongoingTxn).length === 0 &&
            schemeTxns.ongoingTxn.constructor === Object &&
            styles.noOngoing
          }`}
        >
          <div className={styles.datesDiv}>
            <span>Initiated On: {schemeTxns.ongoingTxn.initiateDate}</span>
            <span>Expected On: {schemeTxns.ongoingTxn.expectedDate}</span>
          </div>
          <div className={styles.statusDiv}>
            <span className={styles.statusPoint} />
            <span className={styles.statusConnector} />
            <span className={styles.statusPoint} />
            <span className={styles.statusConnector} />
            <span className={styles.statusPoint} />
            <span className={styles.statusConnector} />
            <span className={styles.statusPoint} />
            <span className={styles.statusConnector} />
            <span className={styles.statusPoint} />
          </div>
          <div className={styles.buttons}>
            <button value="recieved" type="button" className={styles.recievedBtn}>
              Recieved
              <CheckSign className={styles.buttonLogo} />
            </button>
            <div className={styles.issueDiv}>
              <button type="button" className={styles.issueBtn} disabled>
                Raise Issue
                <IssueSign className={styles.buttonLogo} />
              </button>
              <span>*Will open on {schemeTxns.ongoingTxn.raiseIssueDate}</span>
            </div>
          </div>
        </div>
        <div className={styles.txnTableDiv}>
          <div className={styles.txnHeader}>
            <h1 className={styles.txnHead}>PREVIOUS FUNDS</h1>
          </div>
          <div className={styles.tableDiv}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Transaction ID</th>
                  <th>Transaction Amount (in Crores)</th>
                  <th>Recieved On</th>
                </tr>
              </thead>
              <tbody>
                {schemeTxns.previousTxns.map((txn, i) => {
                  return (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{txn.txnID}</td>
                      <td>&#8377; {toIndSys(txn.txnAmount)}</td>
                      <td>{txn.recievedDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <button type="button" className={styles.loadMoreBtn}>
            Load more
            <AddSign className={styles.addLogo} />
          </button>
        </div>
      </div>
      {/* <button className={styles.chatBtn} type="button">
        <ChatSign />
      </button> */}
    </>
  );
};

export default DisbursalStatus;
