import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getOrders } from "./thunk";
import { CartItem } from "../cart/cartSlice";

type OrderState = {
  orders: CartItem[];
  isLoading: boolean;
  error: string | null;
};

const initialState: OrderState = {
  orders: [],
  isLoading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        // получение заказов
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getOrders.fulfilled,
        (state, action: PayloadAction<CartItem[]>) => {
          state.isLoading = false;
          state.orders = action.payload;
        }
      )
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch cartItems";
      });
  },
});
export default ordersSlice.reducer;
