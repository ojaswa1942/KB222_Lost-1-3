import React from "react";
import classNames from "classnames";
import styles from "./MessengerNameList.module.css";
import { calculateDateTime } from "../../utils/utils";

const NameCard = ({ id, name, lastMessage, lastTime, isSelected, updateSelected }) => {
  return(
    <div 
      className={classNames(styles.nameCard, {[styles.cardSelected]: isSelected})}
      onClick={() => updateSelected(id)}
    >
      <div className={styles.cardHeader}>
        <div className={styles.name}>{(name.length > 15)? `${name.slice(0, 15)}...` : name}</div>
        <div className={styles.time}>{calculateDateTime(new Date(), new Date(lastMessage.createdAt))}</div>
      </div>
      <div className={styles.message}>{(lastMessage.body.length > 64)? `${lastMessage.body.slice(0, 64)}...` : lastMessage.body}</div>
    </div>
  );
}

const MessengerNameList = ({ rooms, currentSelected, updateSelected }) => {
  return (
    <div className={styles.MessengerNameList}>
      {rooms.map((room, i) => {
        return <NameCard key={i} {...room} isSelected={currentSelected === room.id} updateSelected={updateSelected} />;
      })}
    </div>
  );
};

export default MessengerNameList;
