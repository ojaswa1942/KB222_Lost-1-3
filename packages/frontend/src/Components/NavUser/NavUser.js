import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as UserIcon } from "../../assets/icons/icons8-male-user.svg";
import { ReactComponent as ExpandIcon } from "../../assets/icons/icons8_expand_arrow_4.svg";
import useOuterClick from "../../utils/hooks/useOuterClick";
import styles from "./NavUser.module.css";

const UserDropdown = ({ toggleOpen }) => {
  const innerRef = useOuterClick(() => {
    toggleOpen();
  });
  return (
    <div className={styles.dropdown} ref={innerRef}>
      <Link to="/dashboard/account" className={styles.dropdownCard}>
        Account Settings
      </Link>
      <Link to="/login" className={styles.dropdownCard}>
        Logout
      </Link>
    </div>
  );
};

const NavUser = () => {
  const [isOpen, toggleOpen] = useState(false);
  const [userName] = useState(`Ojaswa`);
  const [userPost] = useState(`Team Leader`);
  const handleClick = () => {
    toggleOpen((current) => !current);
  };

  return (
    <div
      role="menu"
      tabIndex={0}
      className={styles.userContainer}
      onKeyDown={(e) => {
        if (e.key === 13) handleClick();
      }}
      onClick={handleClick}
    >
      <UserIcon />
      <div className={styles.personInfo}>
        <div className={styles.personName}>Hi, {userName}</div>
        <div className={styles.personPost}>{userPost}</div>
      </div>
      <ExpandIcon />
      {isOpen && <UserDropdown toggleOpen={handleClick} />}
    </div>
  );
};

export default NavUser;
