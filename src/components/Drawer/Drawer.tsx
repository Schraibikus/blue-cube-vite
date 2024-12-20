import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { toggleSetDrawer } from "../../store/modules/modal/modalSlice";
import { useMemo } from "react";
import {
  setItemsOnPage,
  toggleInfiniteScroll,
} from "../../store/modules/pagination/paginationSlice";
import styles from "./Drawer.module.scss";
import { DebounceInput } from "react-debounce-input";
import { setLimitTotalPrice } from "../../store/modules/items/itemsSlice";

//компонент для открытия бокового меню
export const Drawer = () => {
  const dispatch = useAppDispatch();
  const isOpenDrawer = useAppSelector((state) => state.modal.isOpenDrawer);
  const page = useAppSelector((state) => state.pagination.itemsPerPage);
  const itemsPerPage = useMemo(() => page, [page]);
  const isInfinite = useAppSelector(
    (state) => state.pagination.isInfiniteScroll
  );

  const handleInfiniteScroll = () => {
    dispatch(toggleInfiniteScroll({ isInfiniteScroll: !isInfinite }));
  };

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

  //количество товаров на странице
  enum PageItems {
    TEN = 10,
    FIFTEEN = 15,
    TWENTY = 20,
    THIRTY = 30,
  }

  return (
    <div
      className={`${styles.overlay} ${
        isOpenDrawer ? styles.overlayVisible : ""
      }`}
    >
      <div className={styles.container}>
        <button className={styles.container__close} onClick={handleCloseDrawer}>
          <img
            src="/svg/arrow-left.svg"
            width={20}
            height={20}
            alt="arrow left"
          />
          Назад
        </button>
        {!isInfinite && (
          <div className={styles.container__header}>
            <h2 className={styles.container__title}>
              Количество товаров на странице
            </h2>
            <div className={styles.container__buttons}>
              {Object.values(PageItems)
                .filter((item) => typeof item === "number")
                .map((item) => (
                  <button
                    key={item}
                    className={`${styles.container__button} ${
                      itemsPerPage === item
                        ? styles.container__button_active
                        : ""
                    }`}
                    onClick={() => handlePageChange(Number(item))}
                  >
                    {item}
                  </button>
                ))}
            </div>
          </div>
        )}
        <div className={styles.container__limit}>
          <h4 className={styles.container__title}>Лимит на покупки</h4>
          <DebounceInput
            className={styles.container__limit_input}
            minLength={4} // минимальная длина ввода перед тем, как будет вызвана функция handleInputChange
            debounceTimeout={1000} // задержка перед тем, как будет вызвана функция handleInputChange
            onChange={handleInputChange}
            value={limitTotalPrice}
            placeholder="Поиск..."
          />
        </div>
        <div className={styles.container__limit}>
          <h4 className={styles.container__title}>Бесконечный скролл</h4>
          <button
            style={{ fontSize: "40px" }}
            className={`${styles.container__button} ${
              isInfinite ? styles.container__button_active : ""
            }`}
            onClick={handleInfiniteScroll}
          >
            &#8734;
          </button>
        </div>
      </div>
    </div>
  );
};
