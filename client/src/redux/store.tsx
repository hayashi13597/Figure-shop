import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../components/Header/Cart/cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import productSlice from "../pages/Dashboard/Product/productSlice";
import CategorySlice from "../pages/Dashboard/Category/CategorySlice";
import loginSlice from "../components/Header/Login/loginSlice";
import registerSlice from "../components/register/registerSlice";
import authSlice from "../slice/authSlice";
import paymentSlice from "../pages/Payment/paymentSlice";
import orderSlice from "../pages/Dashboard/Order/orderSlice";
import userSlice from "../pages/Dashboard/Users/userSlice";

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
    auth: loginSlice,
    register: registerSlice,
    authLogin: authSlice,
    payment: paymentSlice,
    order: orderSlice,
    user: userSlice,
  },
  middleware: [thunk],
});

export const persistor = persistStore(store);