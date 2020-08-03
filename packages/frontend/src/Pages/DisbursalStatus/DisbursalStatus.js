import React, { useState, useEffect } from "react";
import Select from "react-dropdown-select";
import { useQuery } from "@apollo/client";
import { Link, useParams, useHistory } from "react-router-dom";
import styles from "./DisbursalStatus.module.css";
import getToast from "../../utils/getToast";
import USER from "../../graphql/queries/user";
import TransactionPath from "../../Components/TransactionPath/TransactionPath";
import Loader from "../../Components/Loader/Loader";
import { ReactComponent as AddSign } from "../../assets/icons/add.svg";
import { ReactComponent as ChatSign } from "../../assets/icons/icons8_messaging.svg";

const DisbursalStatus = () => {
  const { data, loading } = useQuery(USER, {
    onError: (error) => {
      const toast = getToast();
      if (error.graphQLErrors.length > 0) {
        toast.fire({
          title: error.graphQLErrors[0].message,
          icon: "error",
        });
      } else {
        toast.fire({
          title: "Some error occurred",
          icon: "error",
        });
      }
    },
  });

  const [channels, setChannels] = useState([]);
  const [activeChannel, updateActiveChannel] = useState();
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    if (params.entityId) {
      const currentChannel = channels.find((x) => x.id.toString() === params.entityId);
      if (currentChannel) {
        updateActiveChannel([currentChannel]);
        return;
      }
    }

    if (channels.length) {
      updateActiveChannel([channels[0]]);
      history.push(`/dashboard/disbursal/${channels[0].id}`);
    }
    // eslint-disable-next-line
  }, [params, channels]);

  const updateChannelChange = (values) => {
    history.push(`/dashboard/disbursal/${values[0].id}`);
  };

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
    if (activeChannel?.transactions?.length) updateExpanded(activeChannel.transactions[0].id);
  }, [activeChannel]);

  useEffect(() => {
    if (data) {
      const entities = data.user.type === "STATE" ? data.user.departments : data.user.schemes;

      setChannels(
        entities.reduce((p, c) => {
          if (data.user.type === "STATE") return [...p, ...c.department.channels];
          return [...p, ...c.scheme.channels];
        }, [])
      );
    }
  }, [data]);

  if (loading) return <Loader height="2em" />;

  return (
    <>
      <div className={styles.disbursalPage}>
        <div className={styles.header}>
          <h1 className={styles.head}>Disbursal Status</h1>
          <div className={styles.selectschemeDiv}>
            <label htmlFor="scheme-select" className={styles.selectScheme}>
              <span className={styles.selectLabel}>Choose Scheme</span>
              <Select
                name="scheme-select"
                options={channels}
                color="#4C7260"
                values={activeChannel}
                clearable={false}
                onChange={updateChannelChange}
                style={{
                  width: "var(--dashboard-conversation-left-width)",
                  borderRadius: "5px",
                  borderColor: "#e4e4e4",
                }}
                className={styles.select}
                dropdownPosition="auto"
                dropdownGap={0}
                searchable
                searchBy="scheme.name"
                labelField="scheme.name"
                valueField="id"
                placeholder="Select Scheme"
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
                {activeChannel?.transactions?.map((txn, i) => {
                  return (
                    <>
                      <tr className={styles.transactionCard} onClick={() => updateExpanded(txn.id)}>
                        <td>{i + 1}</td>
                        <td>{txn.txnId}</td>
                        <td>&#8377; {toIndSys(txn.amount)}</td>
                        <td>{txn.createdDate}</td>
                      </tr>
                      {expandedCard === txn.id && (
                        <tr className={styles.collapseRow}>
                          <td colSpan="4">
                            <TransactionPath txn={txn} />
                          </td>
                        </tr>
                      )}
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

      {activeChannel && (
        <Link
          to={`/dashboard/conversations/${activeChannel.id}`}
          className={styles.chatBtn}
          type="button"
        >
          <ChatSign />
        </Link>
      )}
    </>
  );
};

export default DisbursalStatus;
