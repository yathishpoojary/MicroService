import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:8080/api/users';

export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
  const res = await axios.get(API);
  return res.data;
});

export const createUser = createAsyncThunk('users/create', async (userData) => {
  const res = await axios.post(API, userData);
  return res.data;
});

export const deleteUser = createAsyncThunk('users/delete', async (id) => {
  await axios.delete(`${API}/${id}`);
  return id;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: { list: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchUsers.fulfilled, (state, action) => { state.status = 'succeeded'; state.list = action.payload; })
      .addCase(fetchUsers.rejected, (state, action) => { state.status = 'failed'; state.error = action.error.message; })
      .addCase(createUser.fulfilled, (state, action) => { state.list.push(action.payload); })
      .addCase(deleteUser.fulfilled, (state, action) => { state.list = state.list.filter(u => u.id !== action.payload); });
  },
});

export default usersSlice.reducer;
