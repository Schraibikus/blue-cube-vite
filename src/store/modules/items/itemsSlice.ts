import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getItems } from "./";

export type Item = {
  id: string;
  category: string;
  title: string;
  description: string;
  picture: string;
  rating: number;
  price: number;
};

type ItemsState = {
  itemsList: Item[];
  isLoading: boolean;
  error: string | null;
};

const initialState: ItemsState = {
  itemsList: [],
  isLoading: false,
  error: null,
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getItems.fulfilled, (state, action: PayloadAction<Item[]>) => {
        state.isLoading = false;
        if (Array.isArray(action.payload)) {
          state.itemsList = action.payload;
        }
      })
      .addCase(getItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch items";
      });
  },
});

export default itemsSlice.reducer;
