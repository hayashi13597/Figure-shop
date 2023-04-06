import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateLogin: (state) => {
      return state;
    }
  },
  extraReducers: builder => builder.addCase(loadUser.pending, (state, action) => {
    state.loading = true;
    state.error = null;
  }).addCase(loadUser.fulfilled, (state, { payload }) => {
    state.loading = false;
    if (localStorage.getItem('token')) {
      state.isAuthenticated = true;
      state.user = payload.user;
    } else {
      state.isAuthenticated = false;
    }
  }).addCase(loadUser.rejected, (state, { payload }) => {
    state.loading = false;
    state.isAuthenticated = false;
    console.log(payload);
  })
})

export const loadUser: any = createAsyncThunk('auth/loadUser', async () => {
  if (localStorage.getItem('token')) {
    setAuthToken(localStorage.getItem('token'))
  }

  try {
    const res = await axios.get("http://localhost:5000/api/auth");
    if (res.data.success) {
      return res.data;
    }
  } catch (error: any) {
    localStorage.removeItem('token');
    setAuthToken(null);
    return { success: false, error: error.message }
  }
})

export const { updateLogin } = authSlice.actions;

export default authSlice.reducer;