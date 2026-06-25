import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../services/api";

const Navbar1 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const role = localStorage.getItem("loggedInPersonRole");
  const isAdmin = role === "admin";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [menuOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("authToken");
      localStorage.removeItem("loggedInPerson");
      localStorage.removeItem("loggedInPersonRole");
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      console.error(err);
      localStorage.removeItem("authToken");
      localStorage.removeItem("loggedInPerson");
      localStorage.removeItem("loggedInPersonRole");
      toast.success("Logged out successfully");
      navigate("/login");
    }
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: "/home", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/services", label: "Services" },
    { path: "/gallery", label: "Gallery" },
    { path: "/blogs", label: "Blogs" },
    { path: "/form", label: "Book Event" },
    { path: "/contact", label: "Contact Us" },
  ];

  const adminLink = { path: "/dashboard", label: "Dashboard" };

  const finalLinks = isAdmin ? [adminLink, ...navLinks] : navLinks;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/80 backdrop-blur-md border-b border-luxury-cream shadow-luxury-shadow py-3"
            : "bg-white/95 border-b border-gray-100 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <Link to="/home" className="flex items-center gap-3 group">
              <div className="relative p-0.5 bg-gradient-to-tr from-luxury-orange to-luxury-gold rounded-full shadow-md overflow-hidden">
                <img
                  src="/PraveenEventslogo.png"
                  alt="PraveenEvents Logo"
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center font-montserrat tracking-tight leading-none">
                  <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-luxury-orange via-luxury-orange-bright to-luxury-orange-soft bg-clip-text text-transparent">
                    Praveen
                  </span>
                  <span className="ml-1 text-xl sm:text-2xl font-black text-luxury-charcoal">
                    Events
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-luxury-gold mt-1">
                  Luxury Experiences
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1.5">
              {finalLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2.5 font-poppins font-semibold text-xs sm:text-sm rounded-xl transition duration-300 group ${
                    isActive(link.path)
                      ? "text-luxury-orange"
                      : "text-gray-700 hover:text-luxury-orange"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-luxury-orange to-luxury-gold transition-all duration-300 ${
                      isActive(link.path) ? "w-4/5" : "w-0 group-hover:w-4/5"
                    }`}
                  />
                </Link>
              ))}

              <button
                onClick={handleLogout}
                className="ml-4 bg-gradient-to-r from-luxury-orange to-luxury-orange-bright text-white px-7 py-3 rounded-full font-poppins font-bold text-xs sm:text-sm shadow-luxury-shadow hover:scale-105 hover:shadow-orange-400/30 transition duration-300"
              >
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-luxury-cream transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-luxury-charcoal rounded-full transition-all duration-300 ${
                    menuOpen ? "transform rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-luxury-charcoal rounded-full transition-all duration-300 ${
                    menuOpen ? "opacity-0 scale-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-luxury-charcoal rounded-full transition-all duration-300 ${
                    menuOpen ? "transform -rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`fixed inset-0 bg-luxury-charcoal/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-500 ${
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-16 sm:top-20 left-0 h-[calc(100vh-4rem)] sm:h-[calc(100vh-5rem)] w-full bg-white z-50 lg:hidden transition-all duration-500 ease-out overflow-y-auto ${
          menuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}
      >
        <div className="p-6 space-y-4">
          <div className="pb-3 border-b border-gray-100">
            <p className="text-xxs text-luxury-gold font-bold uppercase tracking-[0.2em]">
              Luxury Portfolio
            </p>
          </div>

          {finalLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-3 rounded-2xl font-poppins font-bold text-sm transition-all ${
                isActive(link.path)
                  ? "bg-gradient-to-r from-luxury-cream to-white text-luxury-orange shadow-sm border-l-4 border-luxury-orange"
                  : "text-gray-700 hover:bg-luxury-cream"
              }`}
              style={{
                animation: menuOpen
                  ? `slideInRight 0.4s ease forwards ${index * 50}ms`
                  : "none",
              }}
            >
              <div className="flex items-center justify-between">
                <span>{link.label}</span>
                {isActive(link.path) && (
                  <svg
                    className="w-4 h-4 text-luxury-orange"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </Link>
          ))}

          <div className="pt-4 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-luxury-orange to-luxury-orange-bright text-white py-3.5 rounded-full font-poppins font-bold text-sm shadow-luxury-shadow hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Logout</span>
            </button>
          </div>

          {isAdmin && (
            <div className="p-4 bg-gradient-to-r from-luxury-cream to-white rounded-2xl border border-luxury-gold/20">
              <p className="text-xs text-luxury-gold font-bold flex items-center gap-2">
                👑 Elite Admin Portal
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-15px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar1;