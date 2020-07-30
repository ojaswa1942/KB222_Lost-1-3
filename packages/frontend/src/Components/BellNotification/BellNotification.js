/* eslint-disable */

import React, { useState, useEffect } from "react";
import { ReactComponent as BellIcon } from "../../assets/icons/icons8-notification.svg";
import { calculateDateTime, randomTime } from "../../utils/utils";
import useOuterClick from "../../utils/hooks/useOuterClick";
import styles from './BellNotification.module.css'

const NewNotificationCount = ({ count = 0 }) => {
  if(count)
    return(
      <span className={styles.notifCount}>
        {count}
      </span>
    );
  return <React.Fragment />;
};

const NotificationDropdown = ({ notifications, toggleOpen }) => {
  const innerRef = useOuterClick(() => {
    // toggleOpen(current => !current);
    toggleOpen();
  })

  if(notifications.length)
    return (
      <div className={styles.dropdownNotification} onClick={(e) => e.stopPropagation()} ref={innerRef} >
        {notifications.map(({timestamp, notification}, i) => {
          return(
            <div key={i} className={styles.notificationCard}>
              <span className={styles.notificationInCard}>{notification}</span>
               <br />
              <span className={styles.cardTimestamp}>{calculateDateTime(new Date(), new Date(timestamp))}</span>
            </div>
          );
        })}
      </div>
    );

  return (
    <div className={styles.dropdownNotification} onClick={(e) => e.stopPropagation()} ref={innerRef} >
      <div className={styles.notificationCard}>
        <span className={styles.notificationInCard}>No new notifications at the moment</span>
      </div>
    </div>
  );
}

const BellNotification = () => {
  const [isOpen, toggleOpen] = useState(false);
  const [newCount, updateCount] = useState(0);
  const [notifications, updateNotifications] = useState([
    { timestamp: randomTime(), notification: "The payment for Scheme Yayyy is processed" }, 
    { timestamp: randomTime(), notification: "Money is coming: The payment for Scheme Yayyy is initiated!" }, 
    { timestamp: randomTime(), notification: "The payment for Scheme Yayyy is processed" }, 
    { timestamp: randomTime(), notification: "The payment for Scheme Yayyy is processed" }, 
    { timestamp: randomTime(), notification: "Money is coming: The payment for Scheme Yayyy is initiated!" }, 
    { timestamp: randomTime(), notification: "The payment for Scheme Yayyy is processed" }, 
    { timestamp: randomTime(), notification: "Money is coming: The payment for Scheme Yayyy is initiated!" }, 
    { timestamp: randomTime(), notification: "The payment for Scheme Yayyy is processed" }, 
    { timestamp: randomTime(), notification: "Money is coming: The payment for Scheme Yayyy is initiated!" }, 
    { timestamp: randomTime(), notification: "The payment for Scheme Yayyy is processed" }, 
    { timestamp: randomTime(), notification: "The payment for Scheme Yayyy is processed" }, 
  ]);

  useEffect(() => {
    if(notifications){
      updateCount(notifications.length);
    }
  }, [notifications]);

  const handleClick = () => {
    if(!isOpen && newCount){
      updateCount(0);
    }
    if(isOpen){
      updateNotifications([]);
    }
    toggleOpen(current => !current);
  }

  return (
    <div className={styles.bellContainer} onClick={handleClick} >
      <NewNotificationCount count={newCount} />
      <BellIcon />
      {isOpen && <NotificationDropdown notifications={notifications} toggleOpen={handleClick} /> }
    </div>
  );
};

export default BellNotification;
