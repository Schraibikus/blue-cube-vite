import { configureStore, combineReducers } from "@reduxjs/toolkit";
import paginationReducer from "./modules/pagination/paginationSlice";
import itemsReducer from "./itemsSlice";
import cartReducer from "./cartSlice";

const rootReducer = combineReducers({
  pagination: paginationReducer,
  items: itemsReducer,
  cart: cartReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
