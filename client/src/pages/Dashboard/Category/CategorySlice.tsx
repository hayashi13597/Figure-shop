import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ICategory {
  _id: number;
  name: string;
}

interface CateState {
  status: String;
  message: String;
  categories: ICategory[];
}

const initialState: CateState = {
  status: "idle",
  message: "",
  categories: [],
};

const productSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCategory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.status = "idle";
        state.message = action.payload?.message;
        state.categories = action.payload;
      })
      .addCase(updateCategory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.status = "idle";
        // state.message = action.payload?.message;
        state.categories = action.payload;
      })
      .addCase(deleteCategory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.status = "idle";
        state.message = action.payload?.message;
        state.categories = action.payload;
      });
  },
});

export const fetchCategories: any = createAsyncThunk(
  "products/getAllCategories",
  async () => {
    const res = await axios.get("http://localhost:5000/api/categories/");
    return res.data.categories;
  }
);

export const addCategory: any = createAsyncThunk(
  "products/addCategory",
  async (category: ICategory) => {
    const res = await axios.post(
      "http://localhost:5000/api/categories",
      category
    );
    return res.data.category;
  }
);

export const updateCategory: any = createAsyncThunk(
  "products/updateCategory",
  async (category: ICategory) => {
    const res = await axios.put(
      `http://localhost:5000/api/categories/${category._id}`,
      category
    );
    return res.data.updatedCategory;
  }
);

export const deleteCategory: any = createAsyncThunk(
  "products/deleteCategory",
  async (id: string) => {
    const res = await axios.delete(
      `http://localhost:5000/api/categories/${id}`
    );
    return res.data.deletedCategory;
  }
);

export default productSlice.reducer;
