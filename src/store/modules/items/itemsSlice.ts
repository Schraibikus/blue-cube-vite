import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getItem, getItems } from "./";
import { Item } from "./types";

type ItemsState = {
  item: Item;
  itemsList: Item[];
  isLoading: boolean;
  error: string | null;
};

const initialState: ItemsState = {
  item: {
    id: "",
    category: "",
    title: "",
    description: "",
    picture: "",
    rating: 0,
    price: 0,
  },
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
      })
      .addCase(getItem.fulfilled, (state, action: PayloadAction<Item>) => {
        state.item = action.payload;
      });
  },
});

export default itemsSlice.reducer;
