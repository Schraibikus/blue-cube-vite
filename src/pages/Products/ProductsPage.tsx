import { useEffect } from "react";
import { Layout } from "../../components/Layout";
import { Pagination } from "../../components/Pagination/Pagination";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styles from "./ProductsPage.module.scss";
import truncateText from "../../utils/truncateText";
import replaceImage from "../../utils/replaceImage";
import { getItems } from "../../store/modules/items";
import { getItem } from "../../store/modules/items";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const paginationPage = useAppSelector((state) => state.pagination.pagination);
  const items = useAppSelector((state) => state.items.itemsList);
  const isLoading = useAppSelector((state) => state.items.isLoading);
  const error = useAppSelector((state) => state.items.error);

  const getTargetItem = (id: string) => {
    toast.promise(dispatch(getItem(id)), {
      pending: "Загрузка страницы товара...",
      success: "Страница товара загружена успешно!",
      error: "Ошибка при загрузке страницы товара!",
    });
    navigate(`/products/${id}`);
  };

  useEffect(() => {
    toast.promise(dispatch(getItems(paginationPage)), {
      pending: "Загрузка товаров...",
      success: "Товары загружены успешно!",
      error: "Ошибка при загрузке товаров!",
    });
  }, [dispatch, paginationPage]);

  if (isLoading) {
    return (
      <Layout>
        <div className={styles.loading}>... loading ...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.products}>
        {items.length ? (
          items.map((elem) => (
            <div
              key={elem.id}
              className={styles.card}
              onClick={() => {
                getTargetItem(elem.id);
              }}
            >
              <img
                src={elem.picture}
                alt={truncateText(elem.title, 2)}
                width={250}
                height={250}
                onError={(e) => replaceImage(e)}
              />

              <div className={styles.card__title}>{elem.title}</div>
              <div className={styles.card__rating}>
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < elem.rating
                        ? `${styles.card__rating_starFilled}`
                        : `${styles.card__rating_starEmpty}`
                    }
                  >
                    &#9733;
                  </span>
                ))}
              </div>
              <div className={styles.card__price}>{elem.price} &#8381;</div>
            </div>
          ))
        ) : (
          <div>{error}</div>
        )}
      </div>
      <Pagination />
    </Layout>
  );
};
