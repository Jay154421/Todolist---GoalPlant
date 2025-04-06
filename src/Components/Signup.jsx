import React, { useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../Supabase/SupabaseClient";
import logo from "../assets/logo.png";
import "../css/App.css";

export function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    console.log(error);
    console.log(data);

    if (error) {
      setMessage(error.message);
      return;
    }

    if (data) {
      setMessage("User Successfully Created");
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="logo-container">
          <img src={logo} alt="Logo" width={45} height={45} />
        </div>
        <h1 className="app-title">GoalPlan</h1>
        <h2 className="signup-heading">Create an account</h2>

        {message && <div className="success-message">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
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
              placeholder="Password"
              required
              name="password"
              id="password"
            />
          </div>

          <button type="submit" className="signup-button">
            Sign Up
          </button>

          <div className="login-link">
            Already have an account? <Link to="/">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
