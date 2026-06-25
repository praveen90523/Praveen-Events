import React, { useState } from "react";
import { FaHome, FaCalendarAlt, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const go = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      {/* Mobile Top Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-luxury-charcoal text-white border-b border-luxury-gold/10 shadow-luxury-shadow">
        <div className="flex items-center justify-between px-4 py-3">
          <h2 className="font-montserrat font-bold text-luxury-orange">Praveen Events</h2>
          <button onClick={() => setOpen(true)} className="p-2 text-white hover:text-luxury-orange transition-colors">
            <FaBars size={22} />
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-luxury-charcoal/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`
          fixed top-0 left-0 z-50 w-64
          min-h-[100dvh] h-full
          bg-luxury-charcoal text-white flex flex-col border-r border-luxury-gold/10
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static
        `}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-luxury-gold/10">
          <div className="flex flex-col">
            <h2 className="text-xl font-montserrat font-black text-luxury-orange leading-tight">
              Praveen Events
            </h2>
            <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-luxury-gold mt-1">
              Management Portal
            </span>
          </div>
          <button className="md:hidden text-gray-400 hover:text-luxury-orange transition-colors" onClick={() => setOpen(false)}>
            <FaTimes size={22} />
          </button>
        </div>

        <nav className="flex-1 px-4 mt-6">
          <ul className="space-y-2 font-poppins text-sm font-semibold">
            <li
              onClick={() => go("/home")}
              className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer hover:bg-white/5 hover:text-luxury-orange border border-transparent hover:border-luxury-gold/10 transition duration-300"
            >
              <FaHome className="text-luxury-orange" />
              <span>Back to Home</span>
            </li>

            <li
              onClick={() => go("/dashboard")}
              className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer bg-white/5 text-luxury-orange border border-luxury-gold/20 transition duration-300 shadow-sm"
            >
              <FaCalendarAlt />
              <span>Console Dashboard</span>
            </li>
          </ul>
        </nav>

        <div className="px-6 py-4 text-xs font-montserrat font-semibold text-gray-400 border-t border-luxury-gold/10">
          © 2026 Praveen Events
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
