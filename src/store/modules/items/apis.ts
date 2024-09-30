import axios from "axios";
import { API_URL } from "../../../utils/constants";

export const fetchGetItems = async (page: number) => {
  const itemsResponse = await axios.get(
    `${API_URL}/products?page=${page}&limit=15`
  );
  const data = itemsResponse.data.data;
  console.log(data);
  return data;
};
