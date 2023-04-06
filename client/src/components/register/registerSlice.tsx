import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as Toastify from '../../utils/toastify'

const initialState = {
  loading: false,
  user: null,
  error: null,
}

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: builder => builder.addCase(registerAsync.pending, (state, action) => {
    state.loading = true;
    state.error = null;
  }).addCase(registerAsync.fulfilled, (state, { payload }) => {
    state.loading = false;
    state.user = payload.email;
    Toastify.successNotify(payload.message);
  }).addCase(registerAsync.rejected, (state, { payload }) => {
    state.loading = false;
    state.error = payload.message;
    Toastify.errorNotify(payload.message);
  })
})

export const registerAsync: any = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/register', user);
    if (res.data.success) {
      localStorage.setItem('token', res.data.accessToken)
    }
    return res.data;
  } catch (error:any) {
    if (error.response.data) return thunkAPI.rejectWithValue(error.response.data);
    else return ({ success: false, message: error.message });
  }
})

export default registerSlice.reducer;