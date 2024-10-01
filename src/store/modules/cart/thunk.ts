import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { fetchGetItemsCart, fetchAddItemCart, submitItemsCart } from "./apis";
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
      // console.log("itemsToCart addItemCart: ", data);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) return error.message;
    }
  }
);

export const submitAllItemsCart = createAsyncThunk(
  "cart/submitAllItemsCart",
  async () => {
    try {
      const data = await submitItemsCart();
      console.log("submitItemsCart addItemCart: ", data);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) return error.message;
    }
  }
);
