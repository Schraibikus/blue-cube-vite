import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styles from "./Pagination.module.scss";
import {
  currentPage,
  nextPage,
} from "../../store/modules/pagination/paginationSlice";

export const Pagination = ({
  maxItems,
  maxItemToPage,
}: {
  maxItems: number;
  maxItemToPage: number;
}): JSX.Element => {
  const totalPages = Math.ceil(maxItems / maxItemToPage);
  const dispatch = useAppDispatch();
  const currentPageNumber = useAppSelector(
    (state) => state.pagination.pagination
  );

  const nextPages = () => {
    dispatch(nextPage(1));
  };

  const undoPages = () => {
    dispatch(nextPage(-1));
  };

  function createButtons() {
    const buttons = [];
    // Добавляем первую страницу
    buttons.push(
      <button
        key={1}
        className={`${styles.pagination__button}${
          1 === currentPageNumber ? ` ${styles.pagination__button_active}` : ""
        }`}
        onClick={() => handleButton(1)}
      >
        1
      </button>
    );
    // Добавляем эллипс, если текущая страница не первая
    if (currentPageNumber > 3) {
      buttons.push(
        <span key="ellipsisStart" className={styles.pagination__ellipsis}>
          <img src="/svg/dots.svg" alt="dots" width={20} height={20} />
        </span>
      );
    }
    // Добавляем диапазон страниц
    const startPage = Math.max(2, currentPageNumber - 1);
    const endPage = Math.min(currentPageNumber + 1, totalPages);
    for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
      buttons.push(
        <button
          key={pageNumber}
          className={`${styles.pagination__button}${
            pageNumber === currentPageNumber
              ? ` ${styles.pagination__button_active}`
              : ""
          }`}
          onClick={() => handleButton(pageNumber)}
        >
          {pageNumber}
        </button>
      );
    }
    // Добавляем эллипс, если текущая страница не последняя
    if (currentPageNumber < totalPages - 2) {
      buttons.push(
        <span key="ellipsis" className={styles.pagination__ellipsis}>
          <img src="/svg/dots.svg" alt="dots" width={20} height={20} />
        </span>
      );
    }
    // Добавляем последнюю страницу
    if (endPage < totalPages) {
      buttons.push(
        <button
          key={`${totalPages}_last`}
          className={`${styles.pagination__button}${
            totalPages === currentPageNumber
              ? ` ${styles.pagination__button_active}`
              : ""
          }`}
          onClick={() => handleButton(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  }

  function handleButton(page: number) {
    dispatch(currentPage(page - 1));
  }

  return (
    <section className={styles.pagination}>
      <button
        className={styles.pagination__button}
        type="button"
        disabled={currentPageNumber === 1}
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
        disabled={currentPageNumber === totalPages}
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
