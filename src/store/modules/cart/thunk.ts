import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { fetchGetItemsCart, fetchAddItemCart, submitAddItemCart } from "./apis";
import { Item } from "../items/types";

export const getItemsCart = createAsyncThunk("cart/getItemsCart", async () => {
  try {
    const data = await fetchGetItemsCart();
    // console.log("cartItems", data);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) throw error;
  }
});

export const addItemCart = createAsyncThunk(
  "cart/addItemCart",
  async (itemsToCart: { id: Item["id"]; quantity: number }[]) => {
    try {
      const data = await fetchAddItemCart(itemsToCart);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) return error.message;
    }
  }
);

export const clearCart = createAsyncThunk("cart/clearCart", async () => {
  try {
    const data = await fetchAddItemCart([]);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) return error.message;
  }
});

export const submitCart = createAsyncThunk("cart/submitCart", async () => {
  try {
    const data = await submitAddItemCart();
    return data;
  } catch (error) {
    if (error instanceof AxiosError) return error.message;
  }
});
