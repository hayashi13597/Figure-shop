import { createSlice } from "@reduxjs/toolkit";

interface ICart {
  id: number;
  category: string;
  image: string[];
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
    addToCart: (state, action: { payload: ICart }) => {
      const { id } = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
    },
    removeItem: (state, action: { payload: ICart }) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const selectCartItems = (state: any) => state.cart.cart;

export const { addToCart, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
