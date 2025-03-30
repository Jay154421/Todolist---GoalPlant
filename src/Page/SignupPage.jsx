import React, { useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../Supabase/SupabaseClient";

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
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-center text-blue-600 text-2xl font-bold mb-6">
          GoalPlan
        </h1>
        <h2 className="text-center text-gray-700 text-lg font-semibold mb-6">
          Create an account
        </h2>

        {message && (
          <div className="bg-green-500 text-white p-2 rounded-lg w-full text-center mb-4">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full p-2 rounded border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
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
              placeholder="Password"
              required
              name="password"
              id="password"
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded mb-4 hover:bg-blue-500 transition duration-300">
            Sign Up
          </button>

          <div className="text-center text-gray-700">
            Already have an account?{" "}
            <Link className="text-blue-500 hover:underline" to="/">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
