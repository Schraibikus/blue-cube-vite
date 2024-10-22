import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleSetDrawer } from "../../store/modules/modal/modalSlice";
import { useMemo } from "react";
import { setItemsOnPage } from "../../store/modules/pagination/paginationSlice";
import styles from "./Drawer.module.scss";
import { DebounceInput } from "react-debounce-input";
import { setLimitTotalPrice } from "../../store/modules/items/itemsSlice";

export const TemporaryDrawer = () => {
  const dispatch = useAppDispatch();
  const isOpenDrawer = useAppSelector((state) => state.modal.isOpenDrawer);

  const page = useAppSelector((state) => state.pagination.itemsPerPage);
  const itemsPerPage = useMemo(() => page, [page]);

  const limitTotalPrice = useAppSelector(
    (state) => state.items.limitTotalPrice
  );
  const handlePageChange = (pageNumber: number) => {
    dispatch(setItemsOnPage(pageNumber));
  };

  const handleCloseDrawer = () => {
    dispatch(toggleSetDrawer({ isOpenDrawer: false }));
  };

  const handleInputChange = (event: { target: { value: string } }) => {
    dispatch(setLimitTotalPrice(parseInt(event.target.value)));
  };

  return (
    <div
      className={`${styles.overlay} ${
        isOpenDrawer ? styles.overlayVisible : ""
      }`}
    >
      <div className={styles.container}>
        <button className={styles.container__close} onClick={handleCloseDrawer}>
          <img src="/svg/EmptyStar.svg" alt="Clear" width={30} height={30} />
        </button>
        <div className={styles.container__header}>
          <h2 className={styles.container__title}>
            Количество товаров на странице
          </h2>
          <div className={styles.container__buttons}>
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
        </div>
        <div className={styles.container__limit}>
          <h4 className={styles.container__title}>Лимит на покупки</h4>
          <DebounceInput
            className={styles.container__limit_input}
            minLength={3} // минимальная длина ввода перед тем, как будет вызвана функция handleInputChange
            debounceTimeout={1000} // задержка перед тем, как будет вызвана функция handleInputChange
            onChange={handleInputChange}
            value={limitTotalPrice}
            placeholder="Поиск..."
          />
        </div>
      </div>
    </div>
  );
};
