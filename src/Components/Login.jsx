import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../Supabase/SupabaseClient";
import logo from "../assets/logo.png";
import "../css/App.css";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setMessage(error.message);
      setEmail("");
      setPassword("");
      return;
    }

    if (data) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-container">
          <img src={logo} alt="Logo" width={45} height={45} />
        </div>
        <h1 className="app-title">GoalPlan</h1>

        <h2 className="login-heading">Sign in to your account</h2>

        <form onSubmit={handleSubmit}>
          {message && <div className="error-message">{message}</div>}

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              name="email"
              id="email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              name="password"
              id="password"
            />
          </div>

          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>

          <div className="signup-link">
            New user? <Link to="/signup">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
