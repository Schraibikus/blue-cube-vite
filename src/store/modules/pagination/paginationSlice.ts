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
      // переход на следующую страницу
      state.pagination += action.payload;
    },
    currentPage(state, action: PayloadAction<number>) {
      // переход на текущую страницу
      state.pagination = action.payload + 1;
    },
    setPaginationPage(state, action: PayloadAction<number>) {
      // переход на определенную страницу
      state.pagination = action.payload;
    },
    setItemsOnPage(state, action: PayloadAction<number>) {
      // установка количества товаров на странице
      state.itemsPerPage = action.payload;
    },
    toggleInfiniteScroll(
      // включение/выключение бесконечного скролла
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
