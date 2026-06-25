import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { submitContact } from "../Services/api";

const Contact = () => {
  const navigate = useNavigate();
  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleDetails = (e) => {
    setContactDetails({ ...contactDetails, [e.target.name]: e.target.value });
  };

  const handleSubmitContact = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await submitContact(contactDetails);

      toast.success("📬 Message sent successfully! We will contact you soon.", {
        position: "top-right",
        autoClose: 3000,
      });

      setContactDetails({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      setTimeout(() => navigate("/home"), 2000);
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Failed to send message. Please try again.";
      toast.error("❌ " + msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-luxury-orange selection:text-white">
      <ToastContainer />

      {/* Hero Section */}
      <section className="relative bg-luxury-charcoal py-28 overflow-hidden border-b border-luxury-gold/10 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-luxury-orange rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-luxury-gold rounded-full blur-3xl animate-float-fast" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block bg-white/5 backdrop-blur-md rounded-full px-6 py-2 mb-6 border border-luxury-gold/20">
            <span className="text-luxury-gold font-montserrat font-bold text-xs uppercase tracking-wider">
              Get in Touch
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-montserrat font-black text-white mb-6 tracking-tight">
            Contact Us
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 font-poppins max-w-3xl mx-auto leading-relaxed font-light">
            Have questions or want to discuss your next big event? Drop us a line!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Decorative Card */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-luxury-orange to-luxury-gold rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition duration-500" />
            <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-luxury-cream">
              <img
                src="https://img.freepik.com/free-vector/contact-us-concept-illustration_114360-3147.jpg"
                alt="Contact Us"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Form */}
          <div className="relative">
            <div className="relative bg-white rounded-3xl shadow-luxury-shadow border border-luxury-cream p-6 sm:p-10">
              <div className="text-center mb-10">
                <div className="inline-block bg-luxury-cream border border-luxury-orange/20 rounded-full px-6 py-2 mb-4">
                  <span className="text-luxury-orange font-montserrat font-bold text-xxs uppercase tracking-wider">
                    Concierge Desk
                  </span>
                </div>
                <h2 className="text-3xl font-montserrat font-black text-luxury-charcoal mb-2">
                  Send a Message
                </h2>
                <p className="text-gray-500 font-poppins text-sm">
                  We reply within 24 hours
                </p>
              </div>

              <form onSubmit={handleSubmitContact} className="space-y-5">
                <div>
                  <label className="block text-xs font-montserrat font-bold uppercase text-gray-500 mb-2 ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={contactDetails.name}
                    onChange={handleDetails}
                    required
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:border-luxury-orange focus:outline-none focus:ring-4 focus:ring-orange-100/50 transition duration-350 text-sm font-poppins bg-luxury-cream/20 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-montserrat font-bold uppercase text-gray-500 mb-2 ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={contactDetails.email}
                    onChange={handleDetails}
                    required
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:border-luxury-orange focus:outline-none focus:ring-4 focus:ring-orange-100/50 transition duration-350 text-sm font-poppins bg-luxury-cream/20 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-montserrat font-bold uppercase text-gray-500 mb-2 ml-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={contactDetails.phone}
                    onChange={handleDetails}
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:border-luxury-orange focus:outline-none focus:ring-4 focus:ring-orange-100/50 transition duration-350 text-sm font-poppins bg-luxury-cream/20 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-montserrat font-bold uppercase text-gray-500 mb-2 ml-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Enter your message"
                    value={contactDetails.message}
                    onChange={handleDetails}
                    required
                    rows="4"
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:border-luxury-orange focus:outline-none focus:ring-4 focus:ring-orange-100/50 transition duration-350 text-sm font-poppins bg-luxury-cream/20 placeholder:text-gray-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-luxury-orange to-luxury-orange-bright text-white py-4.5 rounded-full font-poppins font-bold text-base hover:shadow-luxury-shadow transform hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 inline-flex items-center justify-center gap-2">
                    <span>{submitting ? "Sending..." : "Send Message"}</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
