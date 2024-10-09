import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../items/types";
import { addItemCart, clearCart, getItemsCart, submitCart } from "./thunk";
import dayjs from "dayjs";
import { toast } from "react-toastify";

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
          if (quantity > 0) {
            existingCartItem.quantity += quantity;
          } else if (existingCartItem.quantity + quantity <= 0) {
            state.itemsToCart = state.itemsToCart.filter(
              (item) => item.id !== id
            );
          } else {
            existingCartItem.quantity += quantity;
          }
        } else if (quantity > 0) {
          state.itemsToCart.push({ id, quantity });
        }
      }
      toast.success("Товар добавлен в корзину!");
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      const existingItemsToCart = state.itemsToCart.find(
        (item) => item.id === id
      );
      if (existingItemsToCart) {
        existingItemsToCart.quantity = quantity;
      }
      const existingCartItems = state.cartItems.find(
        (item) => item.product.id === id
      );
      if (existingCartItems) {
        existingCartItems.quantity = quantity;
      }
    },
    removeItem(state, action: PayloadAction<{ id: string }>) {
      const { id } = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.product.id !== id
      );
      state.itemsToCart = state.itemsToCart.filter(
        (item) => item.id !== action.payload.id
      );
      toast.error("Товар удален из корзины!");
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
          if (Array.isArray(action.payload)) {
            state.cartItems = action.payload;
          }
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
      .addCase(clearCart.fulfilled, (state) => {
        state.cartItems = [];
        state.itemsToCart = [];
      })
      .addCase(submitCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        submitCart.fulfilled,
        (state, action: PayloadAction<CartItem[]>) => {
          state.cartItems.filter((item) => item.quantity > 0);
          state.isLoading = false;
          state.cartItems = action.payload;
        }
      )
      .addCase(submitCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch cartItems";
      });
  },
});
export const { addToCartItems, updateQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
