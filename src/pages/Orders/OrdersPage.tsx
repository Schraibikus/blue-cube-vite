import { Layout } from "../../components/Layout";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect } from "react";
import { getOrders } from "../../store/modules/orders";
import { SingleOrderPage } from "./SingleOrder";
import styles from "./OrdersPage.module.scss";
import { CartItem } from "../../store/modules/cart/cartSlice";
import { toast } from "react-toastify";
import { Pagination } from "../../components/Pagination";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const [parent] = useAutoAnimate();
  const orders = useAppSelector((state) => state.orders.orders);
  console.log("orders", orders);
  const currentPage = useAppSelector((state) => state.pagination.pagination);
  console.log("currentPage", currentPage);
  const maxItemToPage = 8;

  const startItem = (currentPage - 1) * maxItemToPage;
  console.log("startItem", startItem);
  const endItem = startItem + maxItemToPage;
  console.log("endItem", endItem);

  const currentPageOrders = orders.slice(startItem, endItem);
  console.log("currentPageOrders", currentPageOrders);

  useEffect(() => {
    toast.promise(dispatch(getOrders()), {
      pending: "Загрузка заказов...",
      success: "Заказы загружены успешно!",
      error: "Ошибка при загрузке заказов!",
    });
  }, [dispatch]);

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
        <p>Заказы не найдены</p>
      )}
    </Layout>
  );
};
