import { api } from "../../axios";
import { Item } from "../items/types";

export const fetchItemsCart = async () => {
  const { data } = await api.get(`cart`);
  return data;
};

export const fetchAddItemCart = async (
  itemsToCart: { id: Item["id"]; quantity: number }[]
) => {
  const { data } = await api.post(
    `cart/update`,
    { data: itemsToCart },
    {
      withCredentials: true,
    }
  );
  return data;
};

export const submitAddItemCart = async () => {
  const { data } = await api.post(`cart/submit`, {}, { withCredentials: true });
  return data;
};
