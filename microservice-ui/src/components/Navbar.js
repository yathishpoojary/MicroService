import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

const s = {
  nav: {
    background: "var(--surface)", borderBottom: "1px solid var(--border)",
    padding: "0 2rem", display: "flex", alignItems: "center",
    justifyContent: "space-between", height: "64px",
    position: "sticky", top: 0, zIndex: 100,
  },
  logo: {
    fontFamily: "'Space Mono', monospace", fontSize: "1.1rem",
    fontWeight: 700, color: "var(--accent)", textDecoration: "none",
  },
  links: { display: "flex", gap: "0.5rem", alignItems: "center" },
  link: (active) => ({
    padding: "0.5rem 1.2rem", borderRadius: "8px", textDecoration: "none",
    fontSize: "0.9rem", fontWeight: 500,
    background: active ? "var(--accent)" : "transparent",
    color: active ? "#fff" : "var(--text2)",
  }),
  user: { color: "var(--text2)", fontSize: "0.85rem", marginRight: "0.5rem" },
  logoutBtn: {
    padding: "0.5rem 1rem", background: "transparent",
    border: "1px solid var(--accent2)", color: "var(--accent2)",
    borderRadius: 8, cursor: "pointer", fontSize: "0.85rem",
    fontFamily: "'DM Sans', sans-serif",
  },
  dot: { width: 8, height: 8, borderRadius: "50%", background: "var(--accent3)", display: "inline-block", marginRight: "0.5rem", boxShadow: "0 0 6px var(--accent3)" },
};

export default function Navbar() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { username } = useSelector((s) => s.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav style={s.nav}>
      <Link to="/" style={s.logo}><span style={s.dot}></span>MicroServices</Link>
      <div style={s.links}>
        <Link to="/" style={s.link(pathname === "/")}>Dashboard</Link>
        <Link to="/users" style={s.link(pathname === "/users")}>Users</Link>
        <Link to="/products" style={s.link(pathname === "/products")}>Products</Link>
        <span style={s.user}>👤 {username}</span>
        <button style={s.logoutBtn} onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}