import { api } from "../../axios";

export const fetchGetItems = async (page: number) => {
  const { data } = await api.get(`products?page=${page}&limit=15`);
  return data;
};
