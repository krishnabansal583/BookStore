import React from "react";
import { Link } from "react-router-dom";
import "../index.css"; 

const SignIn = () => {
  return (
    <div className="h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url('/popartstyledimageofapackedbookstore-ezgif.com-webp-to-png-converter.png')` }}>
      <div className="glass-effect rounded-3xl px-6 py-4 w-full md:w-2/5 lg:w-1/3">
        <p className="text-black text-2xl font-bold text-center">Sign In</p>

        <div className="mt-4">
          <div>
            <label htmlFor="username" className="text-black font-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full mt-2 bg-gray-100 text-zinc-800 p-2 outline-none rounded-xl"
              placeholder="Enter your username"
              name="username"
              required
            />
          </div>

          <div className="mt-4">
            <label htmlFor="password" className="text-black font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full mt-2 bg-gray-100 text-zinc-800 p-2 outline-none rounded-xl"
              placeholder="Enter your password"
              name="password"
              required
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
            >
              SignIn
            </button>
          </div>
        </div>

        <p className="mt-4 flex items-center justify-center text-white font-semibold">
          Or
        </p>

        <p className="mt-4 flex items-center justify-center text-white font-semibold">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-700 ml-2 hover:underline">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
