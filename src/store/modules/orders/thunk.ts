import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { fetchOrders } from "./apis";

export const getOrders = createAsyncThunk("orders/getOrders", async () => {
  try {
    const { data } = await fetchOrders();
    // console.log("getOrders", data);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) return error.message;
  }
});
