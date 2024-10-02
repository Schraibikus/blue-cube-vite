import { configureStore, combineReducers } from "@reduxjs/toolkit";
import paginationReducer from "./modules/pagination/paginationSlice";
import itemsReducer from "./modules/items/itemsSlice";
// import cartReducer from "./cartSlice";
import cartReducer from "./modules/cart/cartSlice";

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
