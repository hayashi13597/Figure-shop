import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  users: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload;
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload;
      })
  },
});

export const fetchUsers = createAsyncThunk(
  "users/getAllusers",
  async () => {
    const res = await axios.get("http://localhost:5000/api/auth/users");
    return res.data;
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteOrder",
  async (id) => {
    const res = await axios.delete(`http://localhost:5000/api/auth/users/${id}`);
    return res.data;
  }
);

export default userSlice.reducer;
