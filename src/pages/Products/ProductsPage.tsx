import { useEffect, useMemo } from "react";
import { Layout } from "../../components/Layout";
import { Pagination } from "../../components/Pagination/Pagination";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styles from "./ProductsPage.module.scss";
import { getItems } from "../../store/modules/items";
import { useLocation, useNavigate } from "react-router-dom";
import {
  setItemsOnPage,
  setPaginationPage,
} from "../../store/modules/pagination/paginationSlice";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { SearchInput } from "../../components/Search";
import { RenderSearchItems } from "../../components/Search/RenderSearchItems";
import { Spinner } from "../../components/Spinner";
import { SingleProduct } from "./SingleProduct";
import { DebounceInput } from "react-debounce-input";

export const ProductsPage = (): JSX.Element => {
  const [parent] = useAutoAnimate();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const paginationPage = useAppSelector((state) => state.pagination.pagination);
  const items = useAppSelector((state) => state.items.itemsList);
  const isLoading = useAppSelector((state) => state.items.isLoading);
  const error = useAppSelector((state) => state.items.error);
  const searchValue = useAppSelector((state) => state.items.searchValue);
  const page = useAppSelector((state) => state.pagination.itemsPerPage);

  const itemsPerPage = useMemo(() => page, [page]);

  const currentPage = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("page");
  }, [location.search]);

  // при нажатии на кнопку меняем количество элементов на странице
  const handlePageChange = (pageNumber: number) => {
    dispatch(setItemsOnPage(pageNumber));
  };

  useEffect(() => {
    if (currentPage) {
      dispatch(setPaginationPage(parseInt(currentPage)));
    }
  }, [dispatch, currentPage]);

  useEffect(() => {
    dispatch(getItems({ page: paginationPage, limit: itemsPerPage }));
  }, [dispatch, paginationPage, itemsPerPage]);

  // при обновлении страницы сохраняем текущую страницу пагинации
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("page", paginationPage.toString());
    navigate({ search: params.toString() }, { replace: true });
  }, [paginationPage, navigate, location.search]);

  const products = useMemo(() => {
    if (searchValue) {
      return <RenderSearchItems />;
    }
    return (
      <>
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
          <DebounceInput
            className={styles.container__input}
            minLength={1} // минимальная длина ввода перед тем, как будет вызвана функция handlePageChange
            debounceTimeout={500} // задержка перед тем, как будет вызвана функция handlePageChange
            onChange={(e) => handlePageChange(parseInt(e.target.value))}
            placeholder="Количество элементов на странице"
          />
          {/* <input
            className={styles.container__input}
            type="number"
            placeholder="Количество элементов на странице"
            onChange={(e) => handlePageChange(parseInt(e.target.value))}
          /> */}
        </div>
        <div className={styles.products} ref={parent}>
          {items.map((item) => (
            <SingleProduct key={item.id} {...item} />
          ))}
        </div>
        {error && <div>{error}</div>}
        <Pagination maxItems={200} maxItemToPage={itemsPerPage} />
      </>
    );
  }, [searchValue, items, error]);

  if (isLoading) {
    return (
      <Layout>
        <div className={styles.load__container} ref={parent}>
          <Spinner />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SearchInput />

      {products}
    </Layout>
  );
};
