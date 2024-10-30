import { useEffect, useMemo, useState } from "react";
import { Layout } from "../../components/Layout";
import { Pagination } from "../../components/Pagination/Pagination";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styles from "./ProductsPage.module.scss";
import { getItems } from "../../store/modules/items";

import { useLocation, useNavigate } from "react-router-dom";
import { setPaginationPage } from "../../store/modules/pagination/paginationSlice";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { SearchInput } from "../../components/Search";
import { RenderSearchItems } from "../../components/Search/RenderSearchItems";
import { Spinner } from "../../components/Spinner";
import { SingleProduct } from "./SingleProduct";
import { toggleSetDrawer } from "../../store/modules/modal/modalSlice";

//страница товаров с реализованной пагинацией
export const ProductsPageWithPagination = (): JSX.Element => {
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
  const totalItems = useAppSelector((state) => state.items.totalItems);

  const [sortValue, setSortValue] = useState("");

  const currentPage = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("page");
  }, [location.search]);

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

  // const products = useMemo(() => {
  //   if (searchValue) {
  //     return <RenderSearchItems />;
  //   }
  //   return (
  //     <>
  //       <div className={styles.products} ref={parent}>
  //         {items.map((item) => (
  //           <SingleProduct key={item.id} {...item} />
  //         ))}
  //       </div>
  //       {error && <div>{error}</div>}
  //       <Pagination maxItems={totalItems} maxItemToPage={itemsPerPage} />
  //     </>
  //   );
  // }, [searchValue, items, error]);
  const products = useMemo(() => {
    if (searchValue) {
      return <RenderSearchItems />;
    }
    const sortedItems = [...items].sort((a, b) => {
      if (sortValue === "price") {
        return a.price - b.price;
      } else if (sortValue === "rating") {
        return b.rating - a.rating;
      } else if (sortValue === "-price") {
        return b.price - a.price;
      } else if (sortValue === "-rating") {
        return a.rating - b.rating;
      } else {
        return 0;
      }
    });
    return (
      <>
        <div className={styles.products} ref={parent}>
          {sortedItems.map((item) => (
            <SingleProduct key={item.id} {...item} />
          ))}
        </div>
        {error && <div>{error}</div>}
        <Pagination maxItems={totalItems} maxItemToPage={itemsPerPage} />
      </>
    );
  }, [searchValue, items, error, sortValue]);

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
      <div className={styles.products__header}>
        <div className={styles.products__header_sort}>
          <h4>Критерий сортировки</h4>
          <select
            className={styles.products__header_sort_select}
            onChange={(e) => setSortValue(e.target.value)}
          >
            <option value="price">Сначала дешевле</option>
            <option value="-price">Сначала дороже</option>
            <option value="rating">Рейтинг выше</option>
            <option value="-rating">Рейтинг ниже</option>
          </select>
        </div>
        <SearchInput />
        <button
          className={styles.drawer__open}
          onClick={() => dispatch(toggleSetDrawer({ isOpenDrawer: true }))}
        >
          <img src="/svg/dots.svg" alt="drawer" width={30} />
        </button>
      </div>
      {products}
    </Layout>
  );
};
