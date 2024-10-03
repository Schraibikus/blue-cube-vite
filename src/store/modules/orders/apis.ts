import { api } from "../../axios";

export const fetchOrders = async () => {
  const { data } = await api.get(`/orders?page=1&limit=10`, {
    withCredentials: true,
  });
  // console.log("fetchOrders orders: ", data);
  return data;
};
