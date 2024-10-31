import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleSetModal } from "../../store/modules/modal/modalSlice";
import { CartPage } from "../../pages/Cart";
import { useEffect } from "react";

//молальное окно для реализации корзины
export const ModalWindow = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.modal.isOpen);

  useEffect(() => {
    dispatch(toggleSetModal({ isOpen: false }));
  }, [dispatch]);

  const handleCloseModal = () => {
    dispatch(toggleSetModal({ isOpen: false }));
  };

  return (
    <Modal
      open={isOpen}
      // onClose={handleCloseModal} //нужно включить если есть затемнение фона, т.е. hideBackdrop={false}
      hideBackdrop //для отключения затемнения фона
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          handleCloseModal();
        }
      }} //если затемнение фона включено, то onClick() не нужен, работает onClose()
    >
      <Box>
        <CartPage />
      </Box>
    </Modal>
  );
};
