import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";

import API from "../services/api";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Signup
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const response = await API.post("/auth/signup", {
        ...formData,
        role: "member",
      });

      console.log(response.data);

      toast.success(
        response.data.message || "Signup Successful"
      );

      // Clear form
      setFormData({
        name: "",
        email: "",
        password: "",
      });

      // Redirect
      navigate("/login");

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Server Error"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl"
      >
        {/* Heading */}
        <h1 className="text-4xl font-bold text-white text-center mb-2">
          Create Account 🚀
        </h1>

        <p className="text-slate-400 text-center mb-8">
          Signup to start managing your tasks
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-all rounded-xl py-3 text-white font-semibold"
          >
            {loading ? "Creating Account..." : "Signup"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-slate-400 text-center mt-6">
          Already have an account?
          <Link
            to="/login"
            className="text-indigo-500 ml-2"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

export default Signup;