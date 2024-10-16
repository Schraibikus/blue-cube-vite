import { LIMIT_ITEMS_ON_PAGE } from "../../../utils/constants";
import { api } from "../../axios";

export const fetchItems = async (page: number) => {
  const { data } = await api.get(
    `products?page=${page}&limit=${LIMIT_ITEMS_ON_PAGE}`,
    {
      withCredentials: true,
    }
  );
  return data;
};

export const fetchOneItem = async (productId: string) => {
  const { data } = await api.get(`products/${productId}`, {
    withCredentials: true,
  });
  return data;
};

export const fetchSearchItems = async (search: string) => {
  const { data } = await api.get(
    `products?search=${search}&page=1&limit=15&sort=title:asc`,
    { withCredentials: true }
  );
  return data;
};
