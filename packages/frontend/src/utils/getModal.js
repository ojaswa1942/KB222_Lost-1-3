import Swal from "sweetalert2/src/sweetalert2";
import "@sweetalert2/theme-default/default.css";

const getModal = () => {
  const mql = window.matchMedia("(max-width: 500px)");
  const isMobile = mql.matches;

  const Modal = Swal.mixin({
    grow: isMobile ? "fullscreen" : false,
    showConfirmButton: true,
    showCloseButton: true,
    background: "#fff",
    customClass: {
      popup: "toast-custom-popup",
      title: "toast-custom-title",
      icon: "toast-custom-icon",
    },
    onOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  return Modal;
};

export default getModal;
