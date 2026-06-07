import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:8080/api/products';

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  const res = await axios.get(API);
  return res.data;
});

export const createProduct = createAsyncThunk('products/create', async (productData) => {
  const res = await axios.post(API, productData);
  return res.data;
});

export const deleteProduct = createAsyncThunk('products/delete', async (id) => {
  await axios.delete(`${API}/${id}`);
  return id;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: { list: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.status = 'succeeded'; state.list = action.payload; })
      .addCase(fetchProducts.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message; })
      .addCase(createProduct.fulfilled, (state, action) => { state.list.push(action.payload); })
      .addCase(deleteProduct.fulfilled, (state, action) => { state.list = state.list.filter(p => p.id !== action.payload); });
  },
});

export default productsSlice.reducer;
