import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../Supabase/SupabaseClient";
import "../css/login.css";

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
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        {message && <div className="message">{message}</div>}

        <div className="group">
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            name="email"
            id="email"
          />
          <span className="highlight" />
          <span className="bar" />
          <label>Email</label>
        </div>

        <div className="group">
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            name="password"
            id="password"
          />
          <span className="highlight" />
          <span className="bar" />
          <label>Password</label>
        </div>

        <input className="submit" type="submit" value="Log in" />
        <span className="span">
          <p>Forgot password?</p>
        </span>
        <Link to="/signup" className="register-link">
          <span className="span">Don't have an account? Sign up</span>
        </Link>
      </form>
    </div>
  );
}
