/* eslint-disable */
 
import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { useParams, useHistory } from "react-router-dom";
import getToast from "../../utils/getToast";
import styles from "./Conversations.module.css";
import USER from "../../graphql/queries/user";
import SchemeCard from "../../Components/SchemeCard/SchemeCard";
import MessengerView from "../../Components/MessengerView/MessengerView";
import CreateRoom from "../../Components/SweetAlertModals/CreateRoom/CreateRoom";
import Select from "react-dropdown-select";
import { ReactComponent as Add } from "../../assets/icons/add.svg";
import getModal from "../../utils/getModal";

const Conversations = () => {
 
  const [schemes, setSchemes] = useState([]);

  const [userType, setUserType] = useState(`MEMBER`);
  const { data, loading } = useQuery(USER, {
    onCompleted: () => {
      // if(data.user.type === `CENTRE`)
        // setSchemes(data.user.departments.map(x => x.department));
      // else
        setSchemes(data.user.schemes.map(x => x.scheme));
    },
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
  let filteredRooms = [];
  if(!loading && activeScheme.length) {
    filteredRooms = data.user.rooms.filter(room => {
      // if(data.user.type === `CENTRE`){
        // return ( room.channel.department.id === activeScheme[0].id );
      // }
      // else {
        return ( room.channel.scheme.id === activeScheme[0].id );
      // }
    });
  }

  console.log(activeScheme, filteredRooms);
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
      {schemes.length > 0 && activeScheme.length && <MessengerView activeScheme={activeScheme[0].id} userType={data.user.type} rooms={filteredRooms} />}
    </div>
  );
};

export default Conversations;
