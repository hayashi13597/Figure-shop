import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  message: "",
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload;
      })
      .addCase(deleteOrder.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload;
      })
  },
});

export const fetchOrders = createAsyncThunk(
  "orders/getAllOrders",
  async () => {
    const res = await axios.get("http://localhost:5000/api/orders/");
    return res.data;
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (id) => {
    const res = await axios.delete(`http://localhost:5000/api/orders/${id}`);
    return res.data;
  }
);

export default orderSlice.reducer;
