import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalState = {
  isOpen: boolean;
  isOpenDrawer: boolean;
};

const initialState: ModalState = {
  isOpen: false,
  isOpenDrawer: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleSetModal(state, action: PayloadAction<{ isOpen: boolean }>) {
      //открытие модалки
      state.isOpen = action.payload.isOpen;
    },
    toggleSetDrawer(state, action: PayloadAction<{ isOpenDrawer: boolean }>) {
      //открытие дропдауна
      state.isOpenDrawer = action.payload.isOpenDrawer;
    },
  },
});

export const { toggleSetModal, toggleSetDrawer } = modalSlice.actions;

export default modalSlice.reducer;
