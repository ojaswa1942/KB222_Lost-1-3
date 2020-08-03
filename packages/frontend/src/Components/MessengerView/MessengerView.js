 /* eslint-disable */
 import React, { useState, useEffect, useRef } from "react";
import styles from "./MessengerView.module.css";
import MessengerNameList from "../MessengerNameList/MessengerNameList";
import MessengerChats from "../MessengerChats/MessengerChats";
import { randomTime } from "../../utils/utils";
import { useQuery } from "@apollo/client";
import getToast from "../../utils/getToast";
import MESSAGE from "../../graphql/queries/messages";

// const SmallLayoutView = ()
const MessengerView = ({ activeScheme, rooms }) => {
  const [currentSelected, updateSelected] = useState(null);
  const [currentMessages, updateMessages] = useState([]);

  const chatReference = useRef();
  const listReference = useRef();

  useEffect(() => {
    if(currentSelected !== null && chatReference.current){
      chatReference.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "end"
      });
    }
  });
  useEffect(() => {
    if(currentSelected === null && rooms.length){
      updateSelected(rooms[0].id);
    }
  // eslint-disable-next-line
  }, [rooms]);

  const { data, loading } = useQuery(MESSAGE, {
    variables: { input: { roomID: currentSelected } },
    onCompleted: () => {
      updateMessages(data.messages);
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

  return (
    <div className={styles.messengerView}>
      <MessengerNameList 
        listReference={listReference} 
        rooms={rooms} 
        currentSelected={currentSelected} 
        updateSelected={updateSelected} 
      />
      
      <MessengerChats 
        chatReference={chatReference} 
        listReference={listReference} 
        selectedRoomId={currentSelected} 
        messages={currentMessages}
      />
    </div>
  );
};

export default MessengerView;
