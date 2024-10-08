import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PaginationState = {
  pagination: number;
};

const initialState: PaginationState = {
  pagination: 1,
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
  },
});

export const { nextPage, currentPage, setPaginationPage } =
  paginationSlice.actions;
export default paginationSlice.reducer;
