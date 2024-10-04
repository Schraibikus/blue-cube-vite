import { Layout } from "../../components/Layout";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect } from "react";
import { getOrders } from "../../store/modules/orders";
import { SingleOrderPage } from "./SingleOrder";
import styles from "./OrdersPage.module.scss";
import { CartItem } from "../../store/modules/cart/cartSlice";
import { toast } from "react-toastify";

export const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orders.orders);

  useEffect(() => {
    toast.promise(dispatch(getOrders()), {
      pending: "Загрузка заказов...",
      success: "Заказы загружены успешно!",
      error: "Ошибка при загрузке заказов!",
    });
  }, [dispatch]);

  return (
    <Layout>
      {orders.length ? (
        <section className={styles.container}>
          {/* <div>заказов {orders.length}</div> */}
          {orders.map((order: CartItem, idx: number) => (
            <SingleOrderPage key={idx} order={order} idx={idx} />
          ))}
        </section>
      ) : (
        <div>Заказов нет</div>
      )}
    </Layout>
  );
};
