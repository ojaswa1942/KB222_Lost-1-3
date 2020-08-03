import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import styles from "./DisbursalStatus.module.css";
import TransactionPath from "../../Components/TransactionPath/TransactionPath";
import { ReactComponent as AddSign } from "../../assets/icons/add.svg";
import { ReactComponent as ChatSign } from "../../assets/icons/icons8_messaging.svg";
import Select from "react-dropdown-select";

const DisbursalStatus = () => {
  const [schemes] = useState([
    {
      id: 1,
      name: "MNREGA",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
      entity: "Central Government",
      sanctionedAmount: "45,000 Crores",
    },
    {
      id: 2,
      name: "Jan Dhan Yojana",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
      entity: "Central Government",
      sanctionedAmount: "45,000 Crores",
    },
    {
      id: 3,
      name: "Man Se Bnao Yojana",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
      entity: "Central Government",
      sanctionedAmount: "45,000 Crores",
    },
    {
      id: 4,
      name: "Kuch Bhi Yojana",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
      entity: "Central Government",
      sanctionedAmount: "45,000 Crores",
    },
    {
      id: 5,
      name: "Yayyyyy Yojana",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
      entity: "Central Government",
      sanctionedAmount: "45,000 Crores",
    },
  ]);

  const [schemeTxns] = useState({
    scheme: "MNREGA",
    txns: [
      {
        txnID: "N48FGHYSN489F4N684MXZ5HJKF",
        txnAmount: 1543500,
        recievedDate: "20/02/2020",
        status: "initiated",
        initiateDate: "07/03/2020",
      },
      {
        txnID: "N48FGHYSN489F32684MXZ5HJKF",
        txnAmount: 1543500,
        recievedDate: "20/02/2020",
        status: "initiated",
        initiateDate: "07/03/2020",
      },
      {
        txnID: "N423GHYSN489F4N684MXZ5HJKF",
        txnAmount: 1543500,
        recievedDate: "20/02/2020",
        status: "initiated",
        initiateDate: "07/03/2020",
      },
      {
        txnID: "N48FG12YSN489F4N684MXZ5HJKF",
        txnAmount: 1543500,
        recievedDate: "20/02/2020",
        status: "initiated",
        initiateDate: "07/03/2020",
      },
      {
        txnID: "N38FGHYSN489F4N684MXZ5HJKF",
        txnAmount: 1543500,
        recievedDate: "20/02/2020",
        status: "initiated",
        initiateDate: "07/03/2020",
      },
    ],
  });

  const [activeScheme, updateActiveScheme] = useState([]);
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    if(params.entityId){
      let currentScheme = schemes.find(x => x.id.toString() === params.entityId);
      if(currentScheme){
        updateActiveScheme([currentScheme]);
        return;
      }
    }

    if(schemes.length) {
      updateActiveScheme([schemes[0]]);
      history.push(`/dashboard/disbursal/${schemes[0].id}`);
    }
    // eslint-disable-next-line
  }, [params, schemes]);

  const updateSchemeChange = (values) => {
    history.push(`/dashboard/disbursal/${values[0].id}`);
  }

  // const handleSubmit = () => {
    // updateScheme(e.target.value);
  // };

  const toIndSys = (x) => {
    const num = x.toString();
    let lastThree = num.substring(num.length - 3);
    const otherNumbers = num.substring(0, num.length - 3);
    if (otherNumbers !== "") lastThree = `,  ${lastThree}`;
    const res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  };

  const [expandedCard, updateExpanded] = useState(null);
  useEffect(() => {
    if(schemeTxns && schemeTxns.txns && schemeTxns.txns.length)
      updateExpanded(schemeTxns.txns[0].txnID);
  }, [schemeTxns])

  return (
    <>
      <div className={styles.disbursalPage}>
        <div className={styles.header}>
          <h1 className={styles.head}>Disbursal Status</h1>
          <div className={styles.selectschemeDiv}>
            <label htmlFor="scheme-select" className={styles.selectScheme}>
              <span className={styles.selectLabel} >Choose Scheme</span>
                <Select
                  name="scheme-select"
                  options={schemes}
                  color="#4C7260"
                  values={activeScheme}
                  clearable={false}
                  onChange={updateSchemeChange}
                  style={{ 
                    width: "var(--dashboard-conversation-left-width)", 
                    borderRadius: "5px", 
                    borderColor: "#e4e4e4",
                  }}
                  className={styles.select}
                  dropdownPosition="auto"
                  dropdownGap={0}
                  searchable={true}
                  searchBy="name"
                  labelField="name" 
                  valueField="id"
                  placeholder={`Select Scheme`}
                />
            </label>
          </div>
        </div>
        <div className={styles.txnTableDiv}>
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
                {schemeTxns.txns.map((txn, i) => {
                  return (
                    <>
                      <tr className={styles.transactionCard} onClick={() => updateExpanded(txn.txnID)} >
                        <td>{i + 1}</td>
                        <td>{txn.txnID}</td>
                        <td>&#8377; {toIndSys(txn.txnAmount)}</td>
                        <td>{txn.recievedDate}</td>
                      </tr>
                      {expandedCard === txn.txnID && <tr className={styles.collapseRow} >
                        <td colSpan="4">
                          <TransactionPath txn={txn} />
                        </td>
                      </tr>}
                    </>
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
      <button className={styles.chatBtn} type="button">
        <ChatSign />
      </button>
    </>
  );
};

export default DisbursalStatus;
