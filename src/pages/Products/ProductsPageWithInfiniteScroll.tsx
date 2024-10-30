import { useEffect, useMemo } from "react";
import { Layout } from "../../components/Layout";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import styles from "./ProductsPage.module.scss";
import { getItems } from "../../store/modules/items";
import { getMoreItems } from "../../store/modules/items";
import { setPaginationPage } from "../../store/modules/pagination/paginationSlice";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { SearchInput } from "../../components/Search";
import { RenderSearchItems } from "../../components/Search/RenderSearchItems";
import { Spinner } from "../../components/Spinner";
import { SingleProduct } from "./SingleProduct";
import { toggleSetDrawer } from "../../store/modules/modal/modalSlice";

export const ProductsPageWithInfiniteScroll = (): JSX.Element => {
  const [parent] = useAutoAnimate();
  const dispatch = useAppDispatch();
  const paginationPage = useAppSelector((state) => state.pagination.pagination);
  const items = useAppSelector((state) => state.items.itemsList);
  const isLoading = useAppSelector((state) => state.items.isLoading);
  const error = useAppSelector((state) => state.items.error);
  const searchValue = useAppSelector((state) => state.items.searchValue);
  const page = useAppSelector((state) => state.pagination.itemsPerPage);
  const itemsPerPage = useMemo(() => page, [page]);
  const totalItems = useAppSelector((state) => state.items.totalItems);

  //страница товаров с реализацией бесконечного скролла
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      if (items.length >= totalItems) {
        return;
      }
      if (scrollPosition + clientHeight >= scrollHeight * 0.8) {
        // Загрузить следующую порцию данных
        dispatch(setPaginationPage(paginationPage + 1));
        dispatch(
          getMoreItems({ page: paginationPage + 1, limit: itemsPerPage })
        );
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [paginationPage, itemsPerPage, dispatch]);

  useEffect(() => {
    dispatch(getItems({ page: paginationPage, limit: itemsPerPage }));
  }, []);

  const products = useMemo(() => {
    if (searchValue) {
      return <RenderSearchItems />;
    }
    return (
      <>
        <div className={styles.products} ref={parent}>
          {items.map((item) => (
            <SingleProduct key={item.id} {...item} />
          ))}
        </div>
        {error && <div>{error}</div>}
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
      <div className={styles.products__header}>
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
