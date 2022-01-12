import { proxy } from "valtio";

const handleOpen = () => {
  modalState.isOpen = true;
};

const handleClose = () => {
  modalState.isOpen = false;
};

export const modalState = proxy({
  isOpen: false,
  handleOpen,
  handleClose,
});
