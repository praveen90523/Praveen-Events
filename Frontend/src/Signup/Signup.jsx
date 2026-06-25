import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { register } from "../services/api";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [signUpDetails, setSignUpDetails] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleDetails = (e) => {
    setSignUpDetails({ ...signUpDetails, [e.target.name]: e.target.value });
  };

  const handleSubmitSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, role } = signUpDetails;

    try {
      await register(name, email, password, role);
      toast.success("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Signup failed. Please try again.";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-luxury-charcoal relative overflow-hidden font-sans py-12 px-4 sm:px-6 lg:px-8">
      {/* Floating Abstract Luxury Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-luxury-orange/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-luxury-gold/10 rounded-full blur-3xl animate-float-fast"></div>
      </div>

      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-luxury-shadow border border-luxury-cream p-8 sm:p-10 relative z-10 animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-block bg-luxury-cream border border-luxury-orange/20 rounded-full px-5 py-1.5 mb-4">
            <span className="text-luxury-orange font-montserrat font-bold text-[10px] uppercase tracking-wider">
              Registration
            </span>
          </div>
          <h2 className="text-3xl font-montserrat font-black text-luxury-charcoal">
            Create Account
          </h2>
          <p className="text-gray-500 font-poppins text-xs mt-2">
            Join Praveen Events elite planning platform
          </p>
        </div>

        <form onSubmit={handleSubmitSignup} className="space-y-5">
          <div>
            <label className="block text-xs font-montserrat font-bold uppercase text-gray-500 mb-2 ml-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={signUpDetails.name}
              onChange={handleDetails}
              required
              className="w-full p-4 border border-gray-200 rounded-2xl focus:border-luxury-orange focus:outline-none focus:ring-4 focus:ring-orange-100/50 transition duration-350 text-sm font-poppins bg-luxury-cream/20 placeholder:text-gray-400 text-luxury-charcoal"
            />
          </div>

          <div>
            <label className="block text-xs font-montserrat font-bold uppercase text-gray-500 mb-2 ml-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={signUpDetails.email}
              onChange={handleDetails}
              required
              className="w-full p-4 border border-gray-200 rounded-2xl focus:border-luxury-orange focus:outline-none focus:ring-4 focus:ring-orange-100/50 transition duration-350 text-sm font-poppins bg-luxury-cream/20 placeholder:text-gray-400 text-luxury-charcoal"
            />
          </div>

          <div>
            <label className="block text-xs font-montserrat font-bold uppercase text-gray-500 mb-2 ml-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create password"
                value={signUpDetails.password}
                onChange={handleDetails}
                required
                className="w-full p-4 pr-12 border border-gray-200 rounded-2xl focus:border-luxury-orange focus:outline-none focus:ring-4 focus:ring-orange-100/50 transition duration-350 text-sm font-poppins bg-luxury-cream/20 placeholder:text-gray-400 text-luxury-charcoal"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-luxury-orange transition-colors"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-montserrat font-bold uppercase text-gray-500 mb-2 ml-1">
              Select Role
            </label>
            <select
              name="role"
              value={signUpDetails.role}
              onChange={handleDetails}
              className="w-full p-4 border border-gray-200 rounded-2xl focus:border-luxury-orange focus:outline-none focus:ring-4 focus:ring-orange-100/50 transition duration-350 text-sm font-poppins bg-luxury-cream/20 text-gray-700 cursor-pointer appearance-none"
            >
              <option value="user">User / Client</option>
              <option value="admin">Admin / Event Planner</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-luxury-orange to-luxury-orange-bright text-white py-4.5 rounded-2xl font-poppins font-bold text-base hover:shadow-luxury-shadow transform hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group mt-6"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm font-poppins text-gray-500 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-luxury-orange font-bold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
