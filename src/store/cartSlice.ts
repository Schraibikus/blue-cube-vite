import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "./itemsSlice";
import axios from "axios";
import { API_URL } from "../utils/constants";

export type CartItem = {
  product: Item;
  quantity: number;
};

type CartItemState = {
  cartItems: CartItem[];
  cartTotal: number;
  isLoading: boolean;
  error: string | null;
};

const initialState: CartItemState = {
  cartItems: [],
  cartTotal: 0,
  isLoading: false,
  error: null,
};

export const fetchCartItems = createAsyncThunk<
  CartItem[],
  undefined,
  { rejectValue: string }
>("cart/fetchCartItems", async function (_, { rejectWithValue }) {
  const cartResponse = await axios.get(`${API_URL}/cart`, {
    withCredentials: true,
  });
  if (!cartResponse) {
    return rejectWithValue("Network response was not ok");
  }
  const data = await cartResponse.data;
  console.log(data);
  return data;
});

export const addCartItem = createAsyncThunk<
  CartItem,
  { id: Item["id"]; quantity: number },
  { rejectValue: string }
>("cart/addCartItem", async function ({ id, quantity }, { rejectWithValue }) {
  const cartItem = {
    data: [
      {
        id: id,
        quantity: quantity,
      },
    ],
  };
  const cartResponse = await axios.post(`${API_URL}/cart/update`, cartItem, {
    withCredentials: true,
  });
  if (!cartResponse) {
    return rejectWithValue("Network response was not ok");
  }
  const data = await cartResponse.data;
  return data;
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchCartItems.fulfilled,
        (state, action: PayloadAction<CartItem[]>) => {
          state.cartItems = action.payload;
        }
      )
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch cartItems";
      });
    builder.addCase(
      addCartItem.fulfilled,
      (state, action: PayloadAction<CartItem>) => {
        state.cartItems.push(action.payload);
      }
    );
  },
});

export default cartSlice.reducer;
