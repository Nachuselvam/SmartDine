// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css";
import Logo from "../assests/smartdine-logo.png";

export default function SignupPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setMessage("❌ Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/api/users/signup", {
        name,
        email,
        password,
      });

      if (res.data.success) {
        setMessage("✅ Signup successful! Redirecting...");
        setTimeout(() => navigate("/login"), 1500); // ⬅ Redirect to login
      }
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Signup failed"));
    }
  };

  return (
    <div
      className="auth-bg"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1095550/pexels-photo-1095550.jpeg?auto=compress&cs=tinysrgb&w=1600')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.55)",
          zIndex: 1,
        }}
      />

      {/* Signup Form */}
      <div
        className="auth-overlay"
        style={{
          position: "relative",
          zIndex: 2,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          padding: "40px 30px",
          borderRadius: "12px",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
        }}
      >
        <img src={Logo} alt="Logo" style={{ marginBottom: "20px", width: "120px" }} />

        <h2>Create Account</h2>

        <form
          onSubmit={handleSignup}
          style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}
        >
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: "12px", borderRadius: "6px", border: "1px solid #ccc" }}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "12px", borderRadius: "6px", border: "1px solid #ccc" }}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: "12px", borderRadius: "6px", border: "1px solid #ccc" }}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ padding: "12px", borderRadius: "6px", border: "1px solid #ccc" }}
            required
          />

          <button
            type="submit"
            style={{
              padding: "12px",
              borderRadius: "6px",
              background: "linear-gradient(90deg,#ff6b6b,#f59e0b)",
              color: "#111",
              fontWeight: "700",
              border: "none",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Sign Up
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "15px",
              color: message.includes("successful") ? "green" : "red",
              fontWeight: "500",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
