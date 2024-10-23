import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PaginationState = {
  pagination: number;
  itemsPerPage: number;
  isInfiniteScroll: boolean;
};

const initialState: PaginationState = {
  pagination: 1,
  itemsPerPage: 15,
  isInfiniteScroll: false,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    nextPage(state, action: PayloadAction<number>) {
      state.pagination += action.payload;
    },
    currentPage(state, action: PayloadAction<number>) {
      state.pagination = action.payload + 1;
    },
    setPaginationPage(state, action: PayloadAction<number>) {
      state.pagination = action.payload;
    },
    setItemsOnPage(state, action: PayloadAction<number>) {
      state.itemsPerPage = action.payload;
    },
    toggleInfiniteScroll(
      state,
      action: PayloadAction<{ isInfiniteScroll: boolean }>
    ) {
      state.isInfiniteScroll = action.payload.isInfiniteScroll;
    },
  },
});

export const {
  nextPage,
  currentPage,
  setPaginationPage,
  setItemsOnPage,
  toggleInfiniteScroll,
} = paginationSlice.actions;
export default paginationSlice.reducer;
