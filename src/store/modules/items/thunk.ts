import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { fetchItems, fetchOneItem, fetchSearchItems } from "./apis";
import { toast } from "react-toastify";

export const getItems = createAsyncThunk(
  "items/getItems",
  async ({ page, limit }: { page: number; limit: number }) => {
    try {
      const { data } = await fetchItems(page, limit);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) return toast.error(error.message);
    }
  }
);

export const getMoreItems = createAsyncThunk(
  "items/getMoreItems",
  async ({ page, limit }: { page: number; limit: number }) => {
    try {
      const { data } = await fetchItems(page, limit);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) return toast.error(error.message);
    }
  }
);

export const getItem = createAsyncThunk(
  "items/getItem",
  async (productId: string) => {
    try {
      const data = await fetchOneItem(productId);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) return toast.error(error.message);
    }
  }
);

export const getSearchItems = createAsyncThunk(
  "items/getSearchItems",
  async (search: string) => {
    try {
      const { data } = await fetchSearchItems(search);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) return toast.error(error.message);
    }
  }
);
