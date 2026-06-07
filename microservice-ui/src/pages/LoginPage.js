import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const s = {
  page: {
    minHeight: "100vh", display: "flex", alignItems: "center",
    justifyContent: "center", background: "var(--bg)",
  },
  card: {
    background: "var(--surface)", border: "1px solid var(--border)",
    borderRadius: 16, padding: "2.5rem", width: "100%", maxWidth: 400,
    borderTop: "3px solid var(--accent)",
  },
  logo: {
    fontFamily: "'Space Mono', monospace", fontSize: "1.3rem",
    fontWeight: 700, color: "var(--accent)", marginBottom: "0.3rem",
  },
  sub: { color: "var(--text2)", fontSize: "0.85rem", marginBottom: "2rem" },
  tabs: { display: "flex", gap: "0.5rem", marginBottom: "1.8rem" },
  tab: (active) => ({
    flex: 1, padding: "0.6rem", textAlign: "center", borderRadius: 8,
    cursor: "pointer", fontWeight: 600, fontSize: "0.9rem",
    background: active ? "var(--accent)" : "var(--surface2)",
    color: active ? "#fff" : "var(--text2)",
    border: "none", fontFamily: "'DM Sans', sans-serif",
  }),
  field: { marginBottom: "1.2rem" },
  label: { fontSize: "0.78rem", color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.8px", display: "block", marginBottom: "0.4rem" },
  input: {
    width: "100%", background: "var(--surface2)", border: "1px solid var(--border)",
    borderRadius: 8, padding: "0.7rem 1rem", color: "var(--text)",
    fontSize: "0.9rem", outline: "none", fontFamily: "'DM Sans', sans-serif",
    boxSizing: "border-box",
  },
  btn: {
    width: "100%", padding: "0.8rem", background: "var(--accent)",
    color: "#fff", border: "none", borderRadius: 8, cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "1rem",
    marginTop: "0.5rem",
  },
  error: {
    background: "var(--accent2)22", border: "1px solid var(--accent2)",
    color: "var(--accent2)", borderRadius: 8, padding: "0.7rem 1rem",
    fontSize: "0.85rem", marginBottom: "1rem",
  },
};

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, status, error } = useSelector((s) => s.auth);
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ username: "", password: "" });

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (tab === "login") dispatch(loginUser(form));
    else dispatch(registerUser(form));
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.logo}>⚡ MicroServices</div>
        <div style={s.sub}>Spring Boot · Kafka · Eureka · JWT</div>

        <div style={s.tabs}>
          <button style={s.tab(tab === "login")} onClick={() => setTab("login")}>Login</button>
          <button style={s.tab(tab === "register")} onClick={() => setTab("register")}>Register</button>
        </div>

        {error && <div style={s.error}>⚠ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={s.field}>
            <label style={s.label}>Username</label>
            <input style={s.input} placeholder="Enter username" value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })} />
          </div>
          <div style={s.field}>
            <label style={s.label}>Password</label>
            <input style={s.input} type="password" placeholder="Enter password" value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          <button style={s.btn} type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Please wait..." : tab === "login" ? "Login →" : "Register →"}
          </button>
        </form>
      </div>
    </div>
  );
}