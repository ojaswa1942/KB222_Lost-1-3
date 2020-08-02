import React, { useState, useEffect } from "react";
import styles from "./MessengerView.module.css";
import MessengerNameList from "../MessengerNameList/MessengerNameList";
import MessengerChats from "../MessengerChats/MessengerChats";
import { randomTime } from "../../utils/utils";

const MessengerView = ({ activeScheme }) => {
  const [currentSelected, updateSelected] = useState(null);
  const [rooms] = useState([
    { id: 0, name: "First room", lastMessage: {body: "Yes, I have received the black money officially", createdAt: randomTime()} },
    { id: 1, name: "Yay room", lastMessage: {body: "Yes, I have received the black money officially and I will not tell everyone hopefully.", createdAt: randomTime()} },
    { id: 2, name: "Nay room", lastMessage: {body: "Yes, I have received the black money officially", createdAt: randomTime()} },
    { id: 3, name: "room", lastMessage: {body: "Yes, I have received the black money officially", createdAt: randomTime()} },
    { id: 4, name: "Bad room", lastMessage: {body: "Yes, I have received the black money officially", createdAt: randomTime()} },
    { id: 5, name: "Not wanna talk room", lastMessage: {body: "Yes, I have received the black money officially", createdAt: randomTime()} },
    { id: 6, name: "Only file room", lastMessage: {body: "Yes, I have received the black money officially", createdAt: randomTime()} },
    { id: 7, name: "Groom", lastMessage: {body: "Yes, I have received the black money officially", createdAt: randomTime()} },
  ]);

  useEffect(() => {
    if(!currentSelected && rooms.length){
      updateSelected(rooms[0].id);
    }
  // eslint-disable-next-line
  }, [rooms])

  return (
    <div className={styles.messengerView}>
      <MessengerNameList rooms={rooms} currentSelected={currentSelected} updateSelected={updateSelected} />
      <MessengerChats selectedRoomId={currentSelected} />
    </div>
  );
};

export default MessengerView;
