import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import axios from "axios";
import { User, Lock, Eye, EyeOff, ArrowRight, BookOpen } from "lucide-react";

const SignIn = () => {
  const [Values, setValues] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const submit = async () => {
    try {
      if (Values.username === "" || Values.password === "") {
        alert("All fields are required");
        return;
      }

      setLoading(true);
      const response = await axios.post(
        "http://localhost:1000/api/v1/sign-in",
        Values
      );

      if (response?.data) {
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate("/profile");
      } else {
        alert("Unexpected response format");
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: `linear-gradient(to bottom, #ffffff 0%, #FDCFFA 100%)`,
      }}
    >
      {/* Subtle decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Centered Form Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          
          {/* Header */}
          <div className="p-8 text-white text-center" style={{ backgroundColor: "#4E56C0" }}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold">Welcome Back</h2>
            </div>
            <p className="text-white/90 text-sm">Sign in to continue your journey</p>
          </div>

          {/* Form Body */}
          <div className="p-8">
            <form onSubmit={(e) => { e.preventDefault(); submit(); }} className="space-y-6">
              {/* Username Field */}
              <div>
                <label
                  htmlFor="username"
                  className="flex items-center gap-2 text-gray-700 font-medium mb-2 text-sm"
                >
                  <User className="w-4 h-4 text-[#4E56C0]" />
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={Values.username}
                    onChange={change}
                    className="w-full px-4 py-3 pl-11 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-[#4E56C0] focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400 text-sm"
                    placeholder="Enter your username"
                    required
                  />
                  <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="flex items-center gap-2 text-gray-700 font-medium mb-2 text-sm"
                >
                  <Lock className="w-4 h-4 text-[#4E56C0]" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={Values.password}
                    onChange={change}
                    className="w-full px-4 py-3 pl-11 pr-12 bg-gray-50 border-2 border-gray-200 rounded-xl outline-none focus:border-[#4E56C0] focus:bg-white transition-all duration-300 text-gray-800 placeholder-gray-400 text-sm"
                    placeholder="Enter your password"
                    required
                  />
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-[#4E56C0] hover:bg-gray-100 rounded-full transition-all"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full text-white font-bold py-3.5 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 mt-8"
                style={{ backgroundColor: "#4E56C0" }}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-xs text-gray-500 font-medium">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-gray-600">
              New here?{" "}
              <Link
                to="/signup"
                className="font-semibold text-[#4E56C0] hover:text-[#3a4199] transition-colors"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Mobile Tagline */}
        <p className="text-center text-sm text-gray-600 mt-6 max-w-xs mx-auto">
          Access your personal library anytime, anywhere
        </p>
      </div>
    </div>
  );
};

export default SignIn;