import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const AUTH_API = "http://localhost:8080/auth";

export const loginUser = createAsyncThunk("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${AUTH_API}/login`, credentials);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("username", res.data.username);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || "Login failed");
  }
});

export const registerUser = createAsyncThunk("auth/register", async (credentials, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${AUTH_API}/register`, credentials);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("username", res.data.username);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.error || "Register failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token") || null,
    username: localStorage.getItem("username") || null,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.username = null;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.status = "loading"; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => { state.status = "succeeded"; state.token = action.payload.token; state.username = action.payload.username; })
      .addCase(loginUser.rejected, (state, action) => { state.status = "failed"; state.error = action.payload; })
      .addCase(registerUser.pending, (state) => { state.status = "loading"; state.error = null; })
      .addCase(registerUser.fulfilled, (state, action) => { state.status = "succeeded"; state.token = action.payload.token; state.username = action.payload.username; })
      .addCase(registerUser.rejected, (state, action) => { state.status = "failed"; state.error = action.payload; });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;