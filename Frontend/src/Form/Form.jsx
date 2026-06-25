import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBooking } from "../services/api";

const Form1 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [availableHalls, setAvailableHalls] = useState([]);
  const [availableLocations, setAvailableLocations] = useState([]);

  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    location: "",
    hallname: "",
    guests: "",
    budget: "",
    date: "",
    message: "",
  });

  const eventOptions = {
    wedding: [
      "Krishna Garden Function Hall",
      "Rajwada Palace Banquet Hall",
      "Sangeetha Gardens",
      "Green Valley Garden",
      "Haldi Set",
      "Subhamastu Function Hall",
      "Performance Show",
      "Sree Lakshmi Convention Hall",
      "Anmol Celebration Hall",
      "Sai Krishna Kalyana Mandapam",
      "Kusumas Halls",
    ],
    "corporate party": [
      "Orion Business Convention Center",
      "Crystal Tower Corporate Hall",
      "Zenith Hall – TechPark Events",
      "Grand Sapphire Boardroom",
      "Emerald Elite Corporate Suites",
      "Phoenix Vista Business Hub",
      "The Hive Seminar Hall",
      "Nexus Pro Convention Venue",
      "MetroPoint Corporate Hall",
      "Infinity Edge Business Bay",
      "CoreSpace Executive Arena",
    ],
    birthday: [
      "Butterfly Theme",
      "Barbie Dream Theme",
      "Animal Theme",
      "Forest Theme",
      "Aqua Theme",
      "Horses Theme",
      "Drunk in Love Theme",
      "Avengers Theme",
      "Princess Theme",
      "Goa Beach Theme",
      "Jurassic Theme",
    ],
    "private party": [
      "Olive Bistro",
      "Candle Light Dinner",
      "Private Cabin Resto",
      "Pool Resto",
      "Bachelors Mania",
      "Jungle Theme",
      "Theatre Theme",
      "Halloween Theme",
      "Retro Theme",
    ],
    destinations: [
      "Waves & Whistles",
      "Whispering Pines Wedding",
      "Royal / Rajputana Theme",
      "Pearls of Paradise",
      "Moonlight Manhattan",
      "Love on the Grapevines",
      "Moonlit Mirage",
      "Manali Mania",
      "Andamans Elegance",
      "Fort Resorts",
    ],
    festival: [
      "Ganpati Utsav",
      "Krishna Leela – Dahi Handi",
      "Yuletide Gala",
      "Rajesh Parade",
      "Dandiya Dhamaka",
      "Holi Dhamaka",
      "Ravana Samharam",
      "Bathukamma Celebrations",
    ],
  };

  const locationOptions = {
    wedding: ["Vizag", "Vijayawada", "Hyderabad", "Guntur", "Rajahmundry"],
    birthday: ["Vizag", "Kakinada", "Hyderabad", "Warangal"],
    "private party": ["Beach Road", "Hilltop Resort", "Farmhouse", "City Club"],
    "corporate party": ["Business Bay", "Tech Park", "City Center", "Corporate Hub"],
    destinations: ["Manali", "Goa", "Jaipur", "Udaipur", "Kerala"],
    festival: ["Local Grounds", "Community Halls", "Open Stadium", "Temple Venues"],
  };

  useEffect(() => {
    if (location.state) {
      setBookingDetails(prev => ({
        ...prev,
        eventType: location.state.category || "",
        hallname: location.state.hallName || "",
        guests: location.state.guests || "",
        budget: location.state.budget || "",
      }));
    }
  }, [location.state]);

  const handleDetails = (e) => {
    const { name, value } = e.target;

    if (name === "eventType") {
      setBookingDetails({
        ...bookingDetails,
        eventType: value,
        hallname: "",
        location: "",
      });
      setAvailableHalls(eventOptions[value] || []);
      setAvailableLocations(locationOptions[value] || []);
    } else {
      setBookingDetails({ ...bookingDetails, [name]: value });
    }
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();

    try {
      await createBooking(bookingDetails);

      toast.success("🎉 Booking submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setBookingDetails({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        location: "",
        hallname: "",
        guests: "",
        budget: "",
        date: "",
        message: "",
      });

      setAvailableHalls([]);
      setAvailableLocations([]);

      setTimeout(() => navigate("/form"), 1500);

    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Failed to submit booking. Try again!";
      toast.error("❌ " + msg);
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
              Reserve Your Occasion
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-montserrat font-black text-white mb-6 tracking-tight">
            Event Booking
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 font-poppins max-w-3xl mx-auto leading-relaxed font-light">
            Fill out the details below to initialize your bespoke planning process.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Decorative Card */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-luxury-orange to-luxury-gold rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition duration-500" />
            <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-luxury-cream">
              <img
                src="https://img.freepik.com/free-vector/wedding-planner-concept-illustration_114360-2720.jpg"
                alt="Event Curation"
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
                    Concierge Survey
                  </span>
                </div>
                <h2 className="text-3xl font-montserrat font-black text-luxury-charcoal mb-2">
                  Plan Your Event
                </h2>
                <p className="text-gray-500 font-poppins text-sm">
                  Let's make your event unforgettable
                </p>
              </div>

              <form onSubmit={handleSubmitBooking} className="space-y-5">
                <div>
                  <label className="block text-xs font-montserrat font-bold uppercase text-gray-500 mb-2 ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={bookingDetails.name}
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
                    value={bookingDetails.email}
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
                    value={bookingDetails.phone}
                    onChange={handleDetails}
                    required
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:border-luxury-orange focus:outline-none focus:ring-4 focus:ring-orange-100/50 transition duration-350 text-sm font-poppins bg-luxury-cream/20 placeholder:text-gray-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-montserrat font-bold uppercase text-gray-500 mb-2 ml-1">
                    Event Type
                  </label>
                  <select
                    name="eventType"
                    value={bookingDetails.eventType}
                    onChange={handleDetails}
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:border-luxury-orange focus:outline-none focus:ring-4 focus:ring-orange-100/50 transition duration-350 text-sm font-poppins bg-luxury-cream/20 text-gray-700 cursor-pointer appearance-none"
                    required
                  >
                    <option value="">Select Event Type</option>
                    <option value="wedding">💍 Wedding</option>
                    <option value="birthday">🎂 Birthday</option>
                    <option value="private party">🎉 Private Party</option>
                    <option value="corporate party">💼 Corporate Party</option>
                    <option value="destinations">✈️ Destinations</option>
                    <option value="festival">🎊 Festival</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-montserrat font-bold uppercase text-gray-500 mb-2 ml-1">
                    Location
                  </label>
                  <select
                    name="location"
                    value={bookingDetails.location}
                    onChange={handleDetails}
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:border-luxury-orange focus:outline-none focus:ring-4 focus:ring-orange-100/50 transition duration-350 text-sm font-poppins bg-luxury-cream/20 text-gray-700 cursor-pointer appearance-none"
                    required
                  >
                    <option value="">Select Location</option>
                    {availableLocations.map((loc, i) => (
                      <option key={i} value={loc}>📍 {loc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-montserrat font-bold uppercase text-gray-500 mb-2 ml-1">
                    Hall / Theme
                  </label>
                  <select
                    name="hallname"
                    value={bookingDetails.hallname}
                    onChange={handleDetails}
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:border-luxury-orange focus:outline-none focus:ring-4 focus:ring-orange-100/50 transition duration-350 text-sm font-poppins bg-luxury-cream/20 text-gray-700 cursor-pointer appearance-none"
                    required
                  >
                    <option value="">Select Hall / Theme</option>
                    {availableHalls.map((hall, i) => (
                      <option key={i} value={hall}>🏛️ {hall}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-montserrat font-bold uppercase text-gray-500 mb-2 ml-1">
                    Number of Guests
                  </label>
                  <select
                    name="guests"
                    value={bookingDetails.guests}
                    onChange={handleDetails}
                    required
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:border-luxury-orange focus:outline-none focus:ring-4 focus:ring-orange-100/50 transition duration-350 text-sm font-poppins bg-luxury-cream/20 text-gray-700 cursor-pointer appearance-none"
                  >
                    <option value="">Select guest range</option>
                    <option value="Couple"> Couple</option>
                    <option value="1-10">1 - 10</option>
                    <option value="11-25"> 11 - 25</option>
                    <option value="26-50"> 26 - 50</option>
                    <option value="51-100"> 51 - 100</option>
                    <option value="Above 100"> Above 100</option>
                    <option value="Above 300"> Above 300</option>
                    <option value="Above 500"> Above 500</option>
                    <option value="Above 800"> Above 800</option>
                    <option value="1000+"> 1000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-montserrat font-bold uppercase text-gray-500 mb-2 ml-1">
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    value={bookingDetails.budget}
                    onChange={handleDetails}
                    required
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:border-luxury-orange focus:outline-none focus:ring-4 focus:ring-orange-100/50 transition duration-350 text-sm font-poppins bg-luxury-cream/20 text-gray-700 cursor-pointer appearance-none"
                  >
                    <option value="">Select your budget range</option>
                    <option value="5000"> ₹5,000</option>
                    <option value="5000-10000"> ₹5,000 - ₹10,000</option>
                    <option value="10001-25000"> ₹10,001 - ₹25,000</option>
                    <option value="25001-50000"> ₹25,001 - ₹50,000</option>
                    <option value="50001-100000"> ₹50,001 - ₹1,00,000</option>
                    <option value="100001-250000"> ₹1,00,001 - ₹2,50,000</option>
                    <option value="250001-500000"> ₹2,50,001 - ₹5,00,000</option>
                    <option value="500001-1000000"> ₹5,00,001 - ₹10,00,000</option>
                    <option value="1000001-1500000"> ₹10,00,001 - ₹15,00,000</option>
                    <option value="1500000+"> ₹15,00,000+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-montserrat font-bold uppercase text-gray-500 mb-2 ml-1">
                    Event Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={bookingDetails.date}
                    onChange={handleDetails}
                    required
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:border-luxury-orange focus:outline-none focus:ring-4 focus:ring-orange-100/50 transition duration-350 text-sm font-poppins bg-luxury-cream/20 text-gray-700 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs font-montserrat font-bold uppercase text-gray-500 mb-2 ml-1">
                    Message / Special Requests
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell us about your event expectations or requests"
                    value={bookingDetails.message}
                    onChange={handleDetails}
                    rows="4"
                    className="w-full p-4 border border-gray-200 rounded-2xl focus:border-luxury-orange focus:outline-none focus:ring-4 focus:ring-orange-100/50 transition duration-350 text-sm font-poppins bg-luxury-cream/20 placeholder:text-gray-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-luxury-orange to-luxury-orange-bright text-white py-4.5 rounded-full font-poppins font-bold text-base hover:shadow-luxury-shadow transform hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group mt-8"
                >
                  <span className="relative z-10 inline-flex items-center justify-center gap-2">
                    <span>Submit Booking Reservation</span>
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

export default Form1;