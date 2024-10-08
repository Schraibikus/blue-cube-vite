import { api } from "../../axios";

export const fetchOrders = async () => {
  const { data } = await api.get(`/orders?page=1&limit=50`, {
    withCredentials: true,
  });
  return data;
};
