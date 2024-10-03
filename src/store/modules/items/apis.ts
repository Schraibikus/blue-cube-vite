import { LIMIT_PAGES } from "../../../utils/constants";
import { api } from "../../axios";

export const fetchGetItems = async (page: number) => {
  const { data } = await api.get(`products?page=${page}&limit=${LIMIT_PAGES}`, {
    withCredentials: true,
  });
  return data;
};

export const fetchGetOneItem = async (productId: string) => {
  const { data } = await api.get(`products/${productId}`, {
    withCredentials: true,
  });
  return data;
};
