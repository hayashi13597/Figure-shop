import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import * as Toastify from '../../../utils/toastify';

interface IUser {
  email: string;
  password: string;
  token: string;
}

interface IInitialState {
  error: string | null;
  loading: boolean;
  user: IUser | null;
  isAuthenticated: boolean;
}

const initialState: IInitialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
}

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem('token');
      state.isAuthenticated = false;
      Toastify.successNotify("Logout successfully");
    }
  },
  extraReducers: builder => builder.addCase(loginAsync.pending, (state, action) => {
    state.loading = true;
  }).addCase(loginAsync.fulfilled, (state, { payload }) => {
    state.loading = false;
    state.isAuthenticated = true;
    Toastify.successNotify("login successfully")
  }).addCase(loginAsync.rejected, (state, { payload }: any) => {
    state.loading = false;
    state.error = payload.message as string;
    Toastify.errorNotify(payload.message);
  })
});

interface LoginCredentials {
  email: string;
  password: string;
}

export const loginAsync: any = createAsyncThunk('auth/login', async (user: LoginCredentials, thunkAPI) => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', user);
    if (res.data.success) {
      localStorage.setItem('token', res.data.accessToken)
    }
    return res.data as IUser;
  } catch (error: any) {
    if (error.response.data) return thunkAPI.rejectWithValue(error.response.data);
    else return ({ success: false, message: error.message });
  }
})

export const logoutAsync: any = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('http://localhost:5000/api/auth/logout');
    localStorage.removeItem('token')
    return null;
  } catch (error: any) {
    if (error.response.data) return thunkAPI.rejectWithValue(error.response.data);
    else return ({ success: false, message: error.message });
  }
})

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
