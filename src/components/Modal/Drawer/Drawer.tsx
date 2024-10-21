import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { toggleSetDrawer } from "../../../store/modules/modal/modalSlice";
import { useMemo } from "react";
import { setItemsOnPage } from "../../../store/modules/pagination/paginationSlice";
import styles from "./Drawer.module.scss";

export const TemporaryDrawer = () => {
  const dispatch = useAppDispatch();
  const isOpenDrawer = useAppSelector((state) => state.modal.isOpenDrawer);

  const page = useAppSelector((state) => state.pagination.itemsPerPage);
  const itemsPerPage = useMemo(() => page, [page]);
  const handlePageChange = (pageNumber: number) => {
    dispatch(setItemsOnPage(pageNumber));
  };

  const handleCloseDrawer = () => {
    dispatch(toggleSetDrawer({ isOpenDrawer: false }));
  };

  const DrawerList = (
    <Box
      sx={{ width: 350 }}
      role="presentation"
      onClick={() => dispatch(toggleSetDrawer({ isOpenDrawer: false }))}
    >
      <>
        <h4 className={styles.container__title}>
          Количество элементов на странице
        </h4>
        <div className={styles.container}>
          <button
            className={`${styles.container__button} ${
              itemsPerPage === 10 ? styles.container__button_active : ""
            }`}
            onClick={() => handlePageChange(10)}
          >
            10
          </button>
          <button
            className={`${styles.container__button} ${
              itemsPerPage === 15 ? styles.container__button_active : ""
            }`}
            onClick={() => handlePageChange(15)}
          >
            15
          </button>
          <button
            className={`${styles.container__button} ${
              itemsPerPage === 20 ? styles.container__button_active : ""
            }`}
            onClick={() => handlePageChange(20)}
          >
            20
          </button>
          <button
            className={`${styles.container__button} ${
              itemsPerPage === 30 ? styles.container__button_active : ""
            }`}
            onClick={() => handlePageChange(30)}
          >
            30
          </button>
        </div>
      </>
    </Box>
  );

  return (
    <div>
      <Drawer
        open={isOpenDrawer}
        onClose={handleCloseDrawer}
        PaperProps={{ style: { backgroundColor: "var(--brand-light-3)" } }}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
};
