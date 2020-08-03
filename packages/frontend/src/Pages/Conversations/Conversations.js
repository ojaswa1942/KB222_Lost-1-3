import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import styles from "./Conversations.module.css";
import MessengerView from "../../Components/MessengerView/MessengerView";
import CreateRoom from "../../Components/SweetAlertModals/CreateRoom/CreateRoom";
import Select from "react-dropdown-select";
import { ReactComponent as Add } from "../../assets/icons/add.svg";
import getModal from "../../utils/getModal";

const Conversations = () => {
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
      history.push(`/dashboard/conversations/${schemes[0].id}`);
    }
    // eslint-disable-next-line
  }, [params, schemes]);

  const updateSchemeChange = (values) => {
    history.push(`/dashboard/conversations/${values[0].id}`);
  }

  const handleCreateChannelFn = (event) => {
    if(event.type === `keydown` && event.key !== 13)
      return;

    const modal = getModal();
    modal.fire({
      ...CreateRoom,
      preConfirm: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            // eslint-disable-next-line
            alert(`YeeHaaww: Adding `);
            resolve(true);
          }, 1000);
        });
      },
    });
  };

  return (
    <div className={styles.conversationsPage}>
      <div className={styles.header}>
        <h1 className={styles.head}>Conversations</h1>
        <div className={styles.inputContainer} >
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
          <button className={styles.addChannelBtn} type="button" onClick={handleCreateChannelFn} onKeyDown={handleCreateChannelFn} >
            <Add className={styles.addChannel} />
            Create Room
          </button>
        </div>
      </div>
      {schemes.length && activeScheme.length && <MessengerView activeScheme={activeScheme} />}
    </div>
  );
};

export default Conversations;
