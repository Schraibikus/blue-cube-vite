import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { fetchOrders } from "./apis";
import { toast } from "react-toastify";

export const getOrders = createAsyncThunk("orders/getOrders", async () => {
  try {
    const { data } = await fetchOrders();
    return data;
  } catch (error) {
    if (error instanceof AxiosError) return toast.error(error.message);
  }
});
