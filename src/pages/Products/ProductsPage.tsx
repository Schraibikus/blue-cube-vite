import { useEffect } from "react";
import { Layout } from "../../components/Layout";
import { Pagination } from "../../components/Pagination/Pagination";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styles from "./ProductsPage.module.scss";
import truncateText from "../../utils/truncateText";
import replaceImage from "../../utils/replaceImage";
import { getItems } from "../../store/modules/items";
import { useLocation, useNavigate } from "react-router-dom";
import { setPaginationPage } from "../../store/modules/pagination/paginationSlice";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { SearchInput } from "../../components/Search";
import { RenderSearchItems } from "../../components/Search/RenderSearchItems";

export const ProductsPage = () => {
  const [parent] = useAutoAnimate();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const paginationPage = useAppSelector((state) => state.pagination.pagination);
  const items = useAppSelector((state) => state.items.itemsList);
  const isLoading = useAppSelector((state) => state.items.isLoading);
  const error = useAppSelector((state) => state.items.error);
  const searchValue = useAppSelector((state) => state.items.searchValue);

  useEffect(() => {
    const currentPage = new URLSearchParams(location.search).get("page");
    if (currentPage) {
      dispatch(setPaginationPage(parseInt(currentPage)));
    }
  }, [dispatch, location.search]);

  useEffect(() => {
    dispatch(getItems(paginationPage));
  }, [dispatch, paginationPage]);

  // при обновлении страницы сохраняем текущую страницу пагинации
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("page", paginationPage.toString());
    navigate({ search: params.toString() }, { replace: true });
  }, [paginationPage, navigate, location.search]);

  if (isLoading) {
    return (
      <Layout>
        <div className={styles.loading}>... loading ...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SearchInput />
      {searchValue ? (
        <RenderSearchItems />
      ) : (
        <>
          <div className={styles.products} ref={parent}>
            {items.length ? (
              items.map((elem) => (
                <div
                  key={elem.id}
                  className={styles.card}
                  onClick={() => {
                    navigate(`/products/${elem.id}`);
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
                      <span key={i} className={styles.card__rating_star}>
                        <img
                          src={
                            i < Math.floor(elem.rating)
                              ? `${"/svg/FullStar.svg"}`
                              : i < elem.rating
                              ? `${"/svg/HalfStar.svg"}`
                              : `${"/svg/EmptyStar.svg"}`
                          }
                          alt="star"
                          width={12}
                          height={12}
                        />
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
          <Pagination maxItems={200} maxItemToPage={15} />
        </>
      )}
      {/* <RenderSearchItems /> */}
      {/* <div className={styles.products} ref={parent}>
        {items.length ? (
          items.map((elem) => (
            <div
              key={elem.id}
              className={styles.card}
              onClick={() => {
                navigate(`/products/${elem.id}`);
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
                  <span key={i} className={styles.card__rating_star}>
                    <img
                      src={
                        i < Math.floor(elem.rating)
                          ? `${"/svg/FullStar.svg"}`
                          : i < elem.rating
                          ? `${"/svg/HalfStar.svg"}`
                          : `${"/svg/EmptyStar.svg"}`
                      }
                      alt="star"
                      width={12}
                      height={12}
                    />
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
      <Pagination maxItems={200} maxItemToPage={15} /> */}
    </Layout>
  );
};
