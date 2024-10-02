import { Layout } from "../../components/Layout";
import { useAppSelector } from "../../hooks/redux";
import { api } from "../../store/axios";
import { SingleOrderPage } from "./SingleOrder";

export const OrdersPage = () => {
  // const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.cart.cartItems);
  console.log("orders", orders);

  const getOrders = async () => {
    const { data } = await api.get(`orders?limit=10&page=1`);
    console.log("getOrders", data);
    return data;
  };

  return (
    <Layout>
      <button onClick={() => getOrders()}>getOrders</button>
      {orders.length ? (
        orders.map((elem) => (
          <div key={elem.product.id}>
            <SingleOrderPage />
          </div>
        ))
      ) : (
        <div>Заказов нет</div>
      )}
    </Layout>
  );
};
