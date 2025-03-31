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
    <div className=" flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-center text-blue-600 text-2xl font-bold mb-6">

        </h1>
        <h2 className="text-center text-gray-700 text-lg font-semibold mb-6">
          Sign in to your account
        </h2>

        <form onSubmit={handleSubmit}>
          {message && (
            <div className="bg-red-500 text-white p-2 rounded-lg w-full text-center mb-4">
              {message}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full p-2 rounded border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              name="email"
              id="email"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full p-2 rounded border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              name="password"
              id="password"
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <a className="text-blue-500 hover:underline" href="#">
              Forgot Password?
            </a>
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded mb-4 hover:bg-blue-500 transition duration-300">
            Sign In
          </button>

          <div className="text-center text-gray-700">
            New user?{" "}
            <Link className="text-blue-500 hover:underline" to="/signup">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
