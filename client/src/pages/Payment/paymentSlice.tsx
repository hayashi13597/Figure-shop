import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const ORDERS_URL = "http://localhost:5000/api/orders/"

const initialState = {
  status: 'idle',
  success: false,
  payments: null
}

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: builder => builder.addCase(addOrder.pending, (state, action) => {
    state.status = 'pending';
  }).addCase(addOrder.fulfilled, (state, action) => {
    state.status = 'idle';
    state.success = true;
    state.payments = action.payload;
  })
});

export const addOrder: any = createAsyncThunk("payment/addOrder", async (payment) => {
  const res = await axios.post(ORDERS_URL, payment);
  localStorage.removeItem("persist:root");
  return res.data;
});

export default paymentSlice.reducer;