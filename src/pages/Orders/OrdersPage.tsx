import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { Layout } from "../../components/Layout";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getOrders } from "../../store/modules/orders";
import { SingleOrderPage } from "./SingleOrder";
import styles from "./OrdersPage.module.scss";
import { CartItem } from "../../store/modules/cart/cartSlice";
import { Pagination } from "../../components/Pagination";
import { Spinner } from "../../components/Spinner";
import { setPaginationPage } from "../../store/modules/pagination/paginationSlice";

//страница закозов
export const OrdersPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [parent] = useAutoAnimate();
  const orders = useAppSelector((state) => state.orders.orders);
  const isLoading = useAppSelector((state) => state.orders.isLoading);
  const error = useAppSelector((state) => state.orders.error);
  const currentPage = useAppSelector((state) => state.pagination.pagination);
  const maxItemToPage = 8;

  const startItem = (currentPage - 1) * maxItemToPage;
  const endItem = startItem + maxItemToPage;

  const currentPageOrders = orders.slice(startItem, endItem);

  useEffect(() => {
    dispatch(setPaginationPage(1));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className={styles.load__container} ref={parent}>
        <Spinner />
      </div>
    );
  }

  return (
    <Layout>
      {orders.length && orders.length <= 8 ? (
        <section className={styles.container} ref={parent}>
          {orders.map((order: CartItem, idx: number) => (
            <SingleOrderPage key={idx} order={order} idx={idx} />
          ))}
        </section>
      ) : orders.length > 8 ? (
        <>
          <section className={styles.container} ref={parent}>
            {currentPageOrders.map((order: CartItem, idx: number) => (
              <SingleOrderPage key={idx} order={order} idx={startItem + idx} />
            ))}
          </section>
          <Pagination maxItems={orders.length} maxItemToPage={maxItemToPage} />
        </>
      ) : (
        <div className={styles.order__empty}>
          <Link to="/" className={styles.order__empty_link}>
            главная
          </Link>
          <p className={styles.order__empty_title}>заказы</p>
          <div className={styles.order__empty_info}>
            <img
              src="/package-icon.png"
              alt="empty orders"
              width={240}
              height={240}
            />
            {error ? (
              error
            ) : (
              <p className={styles.order__empty_info_text}>Заказов пока нет</p>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
};
