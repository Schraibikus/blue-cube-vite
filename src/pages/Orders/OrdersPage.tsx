import { Layout } from "../../components/Layout";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useEffect } from "react";
import { getOrders } from "../../store/modules/orders";
import { SingleOrderPage } from "./SingleOrder";
import styles from "./OrdersPage.module.scss";
import { CartItem } from "../../store/modules/cart/cartSlice";

export const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orders.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <Layout>
      {orders.length ? (
        <section className={styles.container}>
          <div>заказов {orders.length}</div>
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
