import React from "react";
import { renderToString } from "react-dom/server";
import styles from "./CreateRoom.module.css";
import { ReactComponent as CancelIcon } from "../../../assets/icons/icons8_cancel.svg";
import { ReactComponent as CheckLogo } from "../../../assets/icons/icons8-checked.svg";

const Title = () => <div className={styles.title}>Create Channel</div>;
const Text = () => (
  <div className={styles.text}>
    Confirming the action will delete the selected scheme and all its related information.
  </div>
);
const ConfirmButtomContent = () => (
  <span className={styles.button}>
    Confirm &nbsp; <CheckLogo />
  </span>
);
const CancelButtomContent = () => (
  <span className={styles.button}>
    <CancelIcon /> &nbsp; Cancel
  </span>
);

const CreateRoom = {
  title: renderToString(<Title />),
  html: renderToString(<Text />),
  // showLoaderOnConfirm: true,
  closeButtonHtml: renderToString(<CancelIcon className={styles.cancelIcon} />),
  reverseButtons: true,
  confirmButtonText: renderToString(<ConfirmButtomContent />),
  confirmButtonColor: "#2AA41C",
  showCancelButton: true,
  cancelButtonColor: "#8D8D8D",
  cancelButtonText: renderToString(<CancelButtomContent />),
  customClass: {
    confirmButton: styles.confirmButton,
    cancelButton: styles.cancelButton,
    popup: styles.popup,
  },
};

export default CreateRoom;
