import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../Supabase/SupabaseClient";

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
      <h1>Login </h1>
      <form class="form" onSubmit={handleSubmit}>
        {message && <div className="message">{message}</div>}
        <span class="input-span">
          <label for="email" class="label">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            name="email"
            id="email"
          />
        </span>
        <span class="input-span">
          <label for="password" class="label">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            name="password"
            id="password"
          />
        </span>
        <input class="submit" type="submit" value="Log in" />
        <span class="span">
          <a href="#">Forgot password?</a>
        </span>
        <Link to="/signup" className="register-link">
          <span class="span">
            Don't have an account? <a href="#">Sign up</a>
          </span>
        </Link>
      </form>
    </div>
  );
}
