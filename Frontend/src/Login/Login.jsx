import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleDetails = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginDetails;

    try {
      const res = await login(email, password);

      toast.success(res.user.role === "admin" ? "Successfully logged in as Admin" : "Successfully logged in");
      localStorage.setItem("authToken", res.token);
      localStorage.setItem("loggedInPerson", res.user.name);
      localStorage.setItem("loggedInPersonRole", res.user.role);

      if (res.user.role === "admin") {
        navigate("/dashboard", {
          state: { personData: res.user, role: "admin" },
        });
      } else {
        navigate("/home", {
          state: { personData: res.user, role: "user" },
        });
      }
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || "Failed to login. Please try again.";
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
              Secure Access
            </span>
          </div>
          <h2 className="text-3xl font-montserrat font-black text-luxury-charcoal">
            Welcome Back
          </h2>
          <p className="text-gray-500 font-poppins text-xs mt-2">
            Please log in to manage your premium events
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-montserrat font-bold uppercase text-gray-500 mb-2 ml-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={loginDetails.email}
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
                placeholder="Enter password"
                value={loginDetails.password}
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

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-luxury-orange to-luxury-orange-bright text-white py-4.5 rounded-2xl font-poppins font-bold text-base hover:shadow-luxury-shadow transform hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group mt-6"
          >
            Log In Account
          </button>

          <button
            type="button"
            onClick={() => {
              localStorage.setItem("loggedInPerson", "Guest");
              localStorage.setItem("loggedInPersonRole", "guest");
              toast.info("Continuing as Guest");
              navigate("/home", {
                state: { personData: { name: "Guest" }, role: "guest" },
              });
            }}
            className="w-full border-2 border-luxury-gold/50 text-luxury-charcoal hover:bg-luxury-cream/40 font-poppins font-bold py-4 rounded-2xl transition duration-300 text-sm mt-3"
          >
            Continue as Guest
          </button>
        </form>

        <p className="text-center text-sm font-poppins text-gray-500 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-luxury-orange font-bold cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
