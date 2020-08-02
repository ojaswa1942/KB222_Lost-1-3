import React from "react";
import styles from "./MessengerChats.module.css";
import { ReactComponent as Delete } from "../../assets/icons/delete_bin.svg";
import { ReactComponent as ChatLogo } from "../../assets/icons/icons8_messaging.svg";

const MessengerChats = ({ id, name, description, entity, sanctionedAmount, handleDeleteFn }) => {
  return (
    <div className={styles.messengerChats}>
      Hi, show chats here;
    </div>
  );
};

export default MessengerChats;
