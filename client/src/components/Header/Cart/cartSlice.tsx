import { createSlice } from "@reduxjs/toolkit";
import * as Toastify from '../../../utils/toastify';

interface ICart {
  _id: number;
  categoryId: {
    name: string;
    _id: string;
  };
  image: string;
  name: string;
  price: number;
  createdAt: string;
  amount: number;
  quantity: number;
}

interface CartState {
  status: String;
  cart: ICart[];
}

const initialState: CartState = {
  status: "idle",
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: { payload: { cart: ICart, quantity: number } }) => {
      const { _id } = action.payload.cart;
      const quantity = action.payload.quantity;
      const existingItem = state.cart.find((item) => item._id === _id);
      if (existingItem) {
        existingItem.quantity += quantity;
        return Toastify.successNotify('Cập nhật giỏ hàng thành công');
      } else {
        action.payload.cart.quantity = quantity;
        state.cart.push(action.payload.cart);
        return Toastify.successNotify('Thêm vào giỏ hàng thành công');
      }
    },
    removeItem: (state, action: { payload: ICart }) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload._id);
    },
    incrementQuantity: (state, action: { payload: ICart }) => {
      const { _id } = action.payload;
      const existingItem = state.cart.find((item) => item._id === _id);
      if (existingItem) {
        existingItem.quantity += 1;
        return Toastify.successNotify('Cập nhật giỏ hàng thành công');
      }
    },
    decrementQuantity: (state, action: { payload: ICart }) => {
      const { _id } = action.payload;
      const existingItem = state.cart.find((item) => item._id === _id);
      if (existingItem) {
        existingItem.quantity -= 1;
        return Toastify.successNotify('Cập nhật giỏ hàng thành công');
      }
    }
  },
});

export const selectCartItems = (state: any) => state.cart.cart;

export const { addToCart, removeItem, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
