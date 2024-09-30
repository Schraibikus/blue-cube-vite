import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styles from "./Pagination.module.scss";
import { LIMIT_PAGES } from "../../utils/constants";
import {
  currentPage,
  nextPage,
} from "../../store/modules/pagination/paginationSlice";

export const Pagination = () => {
  const dispatch = useAppDispatch();
  const paginationPage = useAppSelector((state) => state.pagination.pagination);
  const nextPages = () => {
    dispatch(nextPage(1));
  };

  const undoPages = () => {
    dispatch(nextPage(-1));
  };

  function createButtons() {
    const buttons = [];
    for (let i = 0; i < LIMIT_PAGES; i++) {
      buttons.push(
        <button
          key={i}
          className={`${styles.pagination__button}${
            i + 1 === paginationPage
              ? ` ${styles.pagination__button_active}`
              : ""
          }`}
          onClick={() => handleButton(i)}
        >
          {i + 1}
        </button>
      );
    }
    return buttons;
  }

  function handleButton(page: number) {
    dispatch(currentPage(page));
  }

  return (
    <section className={styles.pagination}>
      <button
        className={styles.pagination__button}
        type="button"
        disabled={paginationPage === 1}
        onClick={() => undoPages()}
      >
        <img
          src="/svg/arrow-left.svg"
          width={20}
          height={20}
          alt="arrow left"
        />
      </button>
      {createButtons()}
      <button
        className={styles.pagination__button}
        type="button"
        disabled={paginationPage === LIMIT_PAGES}
        onClick={() => nextPages()}
      >
        <img
          src="/svg/arrow-right.svg"
          width={20}
          height={20}
          alt="arrow right"
        />
      </button>
    </section>
  );
};
