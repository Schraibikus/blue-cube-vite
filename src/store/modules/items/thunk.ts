import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { fetchGetItems, fetchGetOneItem } from "./apis";

export const getItems = createAsyncThunk(
  "items/getItems",
  async (page: number) => {
    try {
      const { data } = await fetchGetItems(page);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) return error.message;
    }
  }
);

export const getItem = createAsyncThunk(
  "items/getItem",
  async (productId: string) => {
    try {
      const data = await fetchGetOneItem(productId);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) return error.message;
    }
  }
);
