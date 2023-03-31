import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface IProduct {
  _id?: string;
  category: string;
  image: string;
  name: string;
  price: string;
  amount: string;
}

interface ProductState {
  status: String;
  message: String;
  products: IProduct[];
}

const initialState: ProductState = {
  status: "idle",
  message: "",
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProductToDB.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addProductToDB.fulfilled, (state, action) => {
        state.status = "idle";
        state.message = action.payload?.message;
        state.products = action.payload;
      })
      .addCase(addProductToDB.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "idle";
        state.message = action.payload?.message;
        state.products = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        console.log(action);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        action.status = "idle";
        state.message = action.payload?.message;
        state.products = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        console.log(action);
      });
  },
});

export const fetchProducts: any = createAsyncThunk(
  "products/getAllProducts",
  async () => {
    const res = await axios.get("http://localhost:5000/api/products/");
    return res.data.products;
  }
);

export const addProductToDB: any = createAsyncThunk(
  "products/addNewProduct",
  async (product) => {
    const res = await axios.post("http://localhost:5000/api/products", product);
    return res.data.product;
  }
);

export const updateProduct: any = createAsyncThunk(
  "products/updateProduct",
  async (product: IProduct) => {
    const res = await axios.put(
      `http://localhost:5000/api/products/${product._id}`,
      product
    );
    return res.data.updatedProduct;
  }
);

export const deleteProduct: any = createAsyncThunk(
  "products/deleteProduct",
  async (id: string) => {
    const res = await axios.delete(`http://localhost:5000/api/products/${id}`);
    return res.data.deletedProduct;
  }
);

export default productSlice.reducer;
