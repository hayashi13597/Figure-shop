import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../components/Header/Cart/cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import productSlice from "../pages/Dashboard/Product/productSlice";
import CategorySlice from "../pages/Dashboard/Category/CategorySlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    cart: persistedReducer,
    product: productSlice,
    category: CategorySlice,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);
