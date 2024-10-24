import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { fetchItemsCart, fetchAddItemCart, submitAddItemCart } from "./apis";
import { Item } from "../items/types";
import { toast } from "react-toastify";

export const getItemsCart = createAsyncThunk("cart/getItemsCart", async () => {
  try {
    const data = await fetchItemsCart();
    return data;
  } catch (error) {
    if (error instanceof AxiosError) throw toast.error(error.message);
  }
});

export const addItemCart = createAsyncThunk(
  "cart/addItemCart",
  async (itemsToCart: { id: Item["id"]; quantity: number }[]) => {
    try {
      const data = await fetchAddItemCart(itemsToCart);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) return toast.error(error.message);
    }
  }
);

export const clearCart = createAsyncThunk("cart/clearCart", async () => {
  try {
    const data = await fetchAddItemCart([]);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) return toast.error(error.message);
  }
});

export const submitCart = createAsyncThunk("cart/submitCart", async () => {
  try {
    const data = await submitAddItemCart();
    return data;
  } catch (error) {
    if (error instanceof AxiosError) return toast.error(error.message);
  }
});
