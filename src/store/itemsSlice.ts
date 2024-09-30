import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../utils/constants";

export type Item = {
  id: string;
  category: string;
  title: string;
  description: string;
  picture: string;
  rating: number;
  price: number;
};

type ItemsState = {
  itemsList: Item[];
  isLoading: boolean;
  error: string | null;
};

const initialState: ItemsState = {
  itemsList: [],
  isLoading: false,
  error: null,
};

export const fetchItems = createAsyncThunk<
  Item[],
  number,
  { rejectValue: string }
>("items/fetchItems", async function (page, { rejectWithValue }) {
  const itemsResponse = await axios.get(
    `${API_URL}/products?page=${page}&limit=15`,
    {
      withCredentials: true,
    }
  );
  if (!itemsResponse) {
    return rejectWithValue("Network response was not ok");
  }
  const data = await itemsResponse.data.data;
  return data;
});

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action: PayloadAction<Item[]>) => {
        state.isLoading = false;
        state.itemsList = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch items";
      });
  },
});

export default itemsSlice.reducer;
