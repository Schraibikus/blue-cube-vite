import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalState = {
  isOpen: boolean;
};

const initialState: ModalState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleSetModal(state, action: PayloadAction<{ isOpen: boolean }>) {
      state.isOpen = action.payload.isOpen;
    },
  },
});

export const { toggleSetModal } = modalSlice.actions;

export default modalSlice.reducer;
