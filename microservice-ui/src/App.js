import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import UsersPage from "./pages/UsersPage";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "./pages/LoginPage";
import { fetchUsers } from "./features/users/usersSlice";
import { fetchProducts } from "./features/products/productsSlice";
import "./app/axiosConfig";

function PrivateRoute({ children }) {
  const { token } = useSelector((s) => s.auth);
  return token ? children : <Navigate to="/login" />;
}

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((s) => s.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchUsers());
      dispatch(fetchProducts());
    }
  }, [dispatch, token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute><Layout><UsersPage /></Layout></PrivateRoute>} />
        <Route path="/products" element={<PrivateRoute><Layout><ProductsPage /></Layout></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}