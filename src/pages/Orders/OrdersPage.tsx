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
  const currentPage = useAppSelector((state) => state.pagination.pagination);
  const maxItemToPage = 8;

  const startItem = (currentPage - 1) * maxItemToPage;
  const endItem = startItem + maxItemToPage;

  const currentPageOrders = orders.slice(startItem, endItem);

  useEffect(() => {
    toast.promise(dispatch(getOrders()), {
      pending: "Загрузка заказов...",
      success: "Заказы загружены успешно!",
      error: "Ошибка при загрузке заказов!",
    });
  }, [dispatch]);

  return (
    <Layout>
      {currentPageOrders.length ? (
        <section className={styles.container} ref={parent}>
          {currentPageOrders.map((order: CartItem, idx: number) => (
            <SingleOrderPage key={idx} order={order} idx={startItem + idx} />
          ))}
        </section>
      ) : (
        <div>Заказов нет</div>
      )}
      {orders.length > 8 && (
        <Pagination maxItems={orders.length} maxItemToPage={maxItemToPage} />
      )}
    </Layout>
  );
};
