import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../items/types";
import { addItemCart, getItemsCart, submitAllItemsCart } from "./thunk";
import dayjs from "dayjs";

export type CartItem = {
  product: Item;
  quantity: number;
  createdAt: Date | string;
};

type ItemToCart = {
  id: Item["id"];
  quantity: number;
};

type CartItemState = {
  cartItems: CartItem[];
  itemsToCart: ItemToCart[];
  createdAt: Date | string;
  isLoading: boolean;
  error: string | null;
};

const initialState: CartItemState = {
  cartItems: [],
  itemsToCart: [],
  createdAt: dayjs().format(),
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartItems(
      state,
      action: PayloadAction<{ id: Item["id"]; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      if (state.cartItems) {
        const existingCartItem = state.itemsToCart.find(
          (item) => item.id === id
        );
        if (existingCartItem) {
          existingCartItem.quantity += quantity;
        } else {
          state.itemsToCart.push({ id, quantity });
        }
      }
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      const existingCartItem = state.cartItems.find(
        (item) => item.product.id === id
      );
      if (existingCartItem) {
        existingCartItem.quantity = quantity;
      }
    },
    removeItem(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.product.id !== id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItemsCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getItemsCart.fulfilled,
        (state, action: PayloadAction<CartItem[]>) => {
          state.isLoading = false;
          state.cartItems = action.payload;
        }
      )
      .addCase(getItemsCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch cartItems";
      })
      .addCase(
        addItemCart.fulfilled,
        (state, action: PayloadAction<CartItem[]>) => {
          state.cartItems = action.payload;
        }
      )
      .addCase(submitAllItemsCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      });
  },
});
export const { addToCartItems, updateQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
