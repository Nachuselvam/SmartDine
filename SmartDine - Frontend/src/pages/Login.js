// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import axios from "axios";
import "../index.css";
import Logo from "../assests/smartdine-logo.png";
import { AuthContext } from "../App";
import { Typography, Link } from "@mui/material";

export default function LoginPage() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!email || !password) {
      setMessage("❌ Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8080/api/users/login", { email, password });
      const data = res.data;

      if (data?.success) {
        const userObj = data.user;

        localStorage.setItem("user", JSON.stringify(userObj));
        setUser(userObj);

        setMessage("✅ Login successful! Redirecting...");
        setTimeout(() => navigate("/home"), 800);
      } else {
        setMessage(data?.message ? `❌ ${data.message}` : "❌ Login failed");
      }
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Server error"));
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="auth-bg"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/1095550/pexels-photo-1095550.jpeg?auto=compress&cs=tinysrgb&w=1600')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* Overlay */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.55)",
        zIndex: 1
      }} />

      {/* Login Form */}
      <div style={{
        position: "relative",
        zIndex: 2,
        backgroundColor: "rgba(255,255,255,0.95)",
        padding: "40px 30px",
        borderRadius: "12px",
        maxWidth: "420px",
        width: "100%",
        textAlign: "center",
        boxShadow: "0 12px 30px rgba(0,0,0,0.2)"
      }}>
        <img src={Logo} alt="Logo" style={{ marginBottom: "20px", width: "120px" }} />
        <h2 style={{ color: "#0A2533", fontWeight: 700 }}>User Login</h2>
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "18px" }}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} required style={{ padding: "12px", borderRadius: "6px", border: "1px solid #ccc" }} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} required style={{ padding: "12px", borderRadius: "6px", border: "1px solid #ccc" }} />
          <button type="submit" disabled={loading} style={{
            padding: "12px",
            borderRadius: "6px",
            background: loading ? "linear-gradient(90deg,#f0a0a0,#f5c77a)" : "linear-gradient(90deg,#ff6b6b,#f59e0b)",
            color: "#111",
            fontWeight: "700",
            border: "none",
            cursor: loading ? "default" : "pointer",
            marginTop: "6px",
          }}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && (
          <p style={{ marginTop: "15px", color: message.includes("successful") ? "green" : "red", fontWeight: 500 }}>
            {message}
          </p>
        )}

        {/* Signup link */}
        <Typography variant="body2" sx={{ mt: 2, color: "#0A2533" }}>
          Don't have an account?{" "}
          <Link component={RouterLink} to="/signup" sx={{ fontWeight: 700, color: "#ff6b6b" }}>
            Sign up
          </Link>
        </Typography>
      </div>
    </div>
  );
}
