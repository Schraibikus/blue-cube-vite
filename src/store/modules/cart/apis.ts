import { api } from "../../axios";
import { Item } from "../items/types";

export const fetchGetItemsCart = async () => {
  const { data } = await api.get(`cart`);
  return data;
};

export const fetchAddItemCart = async (
  itemsToCart: { id: Item["id"]; quantity: number }[]
) => {
  const { data } = await api.post(`cart/update`, { data: itemsToCart });
  return data;
};

export const submitItemsCart = async () => {
  const { data } = await api.post(`cart/submit`);
  console.log("submitAddItemCart apis", data);
  return data;
};
