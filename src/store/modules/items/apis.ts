import { LIMIT_PAGES } from "../../../utils/constants";
import { api } from "../../axios";

export const fetchGetItems = async (page: number) => {
  const { data } = await api.get(`products?page=${page}&limit=${LIMIT_PAGES}`, {
    withCredentials: true,
  });
  return data;
};
