import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getItem, getItems, getMoreItems, getSearchItems } from "./";
import { Item } from "./types";

type ItemsState = {
  item: Item;
  itemsList: Item[];
  isLoading: boolean;
  error: string | null;
  searchValue: string;
  foundItems: Item[];
  totalItems: number;
  limitTotalPrice: number;
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
  searchValue: "",
  foundItems: [],
  totalItems: 200,
  limitTotalPrice: 10000,
};

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setLimitTotalPrice(state, action: PayloadAction<number>) {
      state.limitTotalPrice = action.payload;
    },
  },
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
          // state.itemsList = [...state.itemsList, ...action.payload];
        }
      })
      .addCase(getItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch items";
      })
      .addCase(getMoreItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getMoreItems.fulfilled,
        (state, action: PayloadAction<Item[]>) => {
          state.isLoading = false;
          if (Array.isArray(action.payload)) {
            state.itemsList = [...state.itemsList, ...action.payload];
          }
        }
      )
      .addCase(getMoreItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch items";
      })
      .addCase(getItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getItem.fulfilled, (state, action: PayloadAction<Item>) => {
        state.isLoading = false;
        state.item = action.payload;
      })
      .addCase(getItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch item";
      })
      .addCase(getSearchItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getSearchItems.fulfilled,
        (state, action: PayloadAction<Item[]>) => {
          state.isLoading = false;
          if (Array.isArray(action.payload)) {
            state.foundItems = action.payload;
          }
        }
      )
      .addCase(getSearchItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch items";
      });
  },
});

export const { setSearchValue, setLimitTotalPrice } = itemsSlice.actions;
export default itemsSlice.reducer;
