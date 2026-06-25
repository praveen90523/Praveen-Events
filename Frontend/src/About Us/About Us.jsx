import React from "react";
import { useNavigate } from "react-router-dom";

const Showcase = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };
  const showcaseItems = [
    {
      img: "https://wallpapers.com/images/hd/corporate-event-1920-x-960-wallpaper-kxfymzln0ikz8pp7.jpg",
      title: "Corporate Events",
      desc: "Bespoke brand conferences and corporate retreats curating executive class."
    },
    {
      img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=500",
      title: "Weddings",
      desc: "Royal wedding arrangements, grand decor themes, and unforgettable memories."
    },
    {
      img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500",
      title: "Private Parties",
      desc: "Bespoke social gatherings, cocktail parties, and anniversary functions."
    },
    {
      img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500",
      title: "Festivals",
      desc: "Grand cultural and religious functions engineered on massive scales."
    },
    {
      img: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=500",
      title: "Product Launches",
      desc: "High-impact setups displaying product releases to press and consumers."
    },
    {
      img: "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=500",
      title: "Conferences",
      desc: "Professional forums configured with high-grade sound systems and visuals."
    }
  ];

  return (
    <>
      {showcaseItems.map((item, i) => (
        <div
          key={i}
          className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-luxury-shadow transition-all duration-500 transform hover:-translate-y-2 border border-luxury-cream hover:border-luxury-orange/20"
        >
          <div className="relative h-80 overflow-hidden cursor-pointer" onClick={() => handleNavigate("/services")}>
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/90 via-luxury-charcoal/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h4 className="text-xl font-montserrat font-bold mb-2 transition-transform duration-300 group-hover:translate-x-1">
                {item.title}
              </h4>
              <p className="text-xs text-gray-300 font-poppins opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                {item.desc}
              </p>
            </div>
            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
              <svg className="w-5 h-5 text-luxury-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

const AboutUs = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const services = [
    { icon: "🏛️", text: "Venue Booking" },
    { icon: "🍽️", text: "Food & Catering" },
    { icon: "📸", text: "Photography" },
    { icon: "⛺", text: "Tent House Arrangement" },
    { icon: "🎭", text: "Entertainment" },
    { icon: "⭐", text: "Celebrity Management" }
  ];

  return (
    <div className="bg-white font-sans selection:bg-luxury-orange selection:text-white">
      {/* Luxury Hero Banner */}
      <section className="relative bg-luxury-charcoal py-28 overflow-hidden border-b border-luxury-gold/10">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-luxury-orange rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-luxury-gold rounded-full blur-3xl animate-float-fast" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center text-white">
          <div className="inline-block bg-white/5 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-luxury-gold/20">
            <span className="text-luxury-gold font-montserrat font-bold text-xs uppercase tracking-wider">
              Who We Are
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-montserrat font-black text-white mb-6 tracking-tight">
            About Us
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 font-poppins max-w-3xl mx-auto leading-relaxed font-light">
            Crafting premium visual memories and seamless corporate logistics since 2025.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        {/* Our Mission */}
        <div className="text-center mb-28 max-w-4xl mx-auto">
          <div className="inline-block bg-luxury-cream border border-luxury-orange/20 rounded-full px-8 py-2.5 mb-6">
            <span className="text-luxury-orange font-montserrat font-bold text-xs uppercase tracking-wider">
              Our Mission
            </span>
          </div>
          <p className="text-xl md:text-2xl text-luxury-charcoal font-poppins leading-relaxed font-light">
            At <span className="font-bold text-luxury-orange">Praveen Events</span>, we orchestrate masterpiece environments that bring your highest aspirations to life. Our creative artisans manage the entire trajectory from initial design concept to final physical production, ensuring flawless logistics, sensory elegance, and absolute peace of mind.
          </p>
        </div>

        {/* Brand Representation Section */}
        <div className="flex flex-col items-center py-10 mb-28">
          <div className="relative group mb-10">
            <div className="absolute -inset-4 bg-gradient-to-tr from-luxury-orange to-luxury-gold rounded-full blur-xl opacity-40 group-hover:opacity-70 transition duration-500 animate-pulse" />
            <div className="relative p-1 bg-gradient-to-tr from-luxury-orange to-luxury-gold rounded-full">
              <img
                src="https://img.freepik.com/premium-photo/anime-style-businessman-holding-clipboard_1282444-262169.jpg"
                alt="Event planner"
                className="w-64 h-64 rounded-full object-cover shadow-2xl ring-4 ring-white"
              />
            </div>
          </div>
          <h3 className="text-3xl font-montserrat font-black text-luxury-charcoal mb-4">
            Professional Event Management
          </h3>
          <p className="text-gray-600 font-poppins text-center max-w-2xl text-base leading-relaxed">
            Converting every venue layout into an immersive luxury experience, guided by a passion for design aesthetics, technical accuracy, and hallmark signature moments.
          </p>
        </div>

        {/* Our Services Summary */}
        <div className="mb-28">
          <div className="text-center mb-16">
            <div className="text-xs font-montserrat font-bold uppercase tracking-[0.2em] text-luxury-orange mb-3">
              Comprehensive Offerings
            </div>
            <h2 className="text-4xl font-montserrat font-black text-luxury-charcoal mb-4">
              Our Core Services
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-luxury-orange to-luxury-gold mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div
                key={i}
                className="group bg-luxury-cream/25 rounded-3xl p-8 shadow-sm hover:shadow-luxury-shadow hover:-translate-y-2 border border-luxury-cream hover:border-luxury-orange/20 transition-all duration-500"
              >
                <div className="flex items-center space-x-5">
                  <div className="text-4xl bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <p className="text-luxury-charcoal font-montserrat font-bold text-base group-hover:text-luxury-orange transition-colors duration-300">
                    {service.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="relative mb-28">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-luxury-cream" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-8 text-luxury-gold text-xs font-montserrat font-bold uppercase tracking-[0.25em]">
              Our Creative Portfolios
            </span>
          </div>
        </div>

        {/* Event Showcase */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <div className="text-xs font-montserrat font-bold uppercase tracking-[0.2em] text-luxury-orange mb-3">
              Visual Chronicles
            </div>
            <h2 className="text-4xl font-montserrat font-black text-luxury-charcoal mb-4">
              Selected Showcase
            </h2>
            <p className="text-gray-500 font-poppins text-base max-w-2xl mx-auto mt-2">
              A glimpse into some of our best work – where luxury styling meets structural perfection.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Showcase />
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-28 bg-gradient-to-r from-luxury-orange to-luxury-orange-bright rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-luxury-shadow text-white">
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-0 left-0 w-80 h-80 bg-white rounded-full blur-2xl animate-float-slow" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full blur-2xl animate-float-fast" />
          </div>
          <div className="relative">
            <h3 className="text-3xl md:text-5xl font-montserrat font-black text-white mb-6">
              Ready to Design Your Event?
            </h3>
            <p className="text-white/95 font-poppins font-light text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Partner with our planners to engineer an extraordinary celebration.
            </p>
            <button
              onClick={() => handleNavigate("/form")}
              className="bg-white text-luxury-orange px-10 py-5 rounded-full font-poppins font-bold text-base sm:text-lg hover:bg-luxury-cream hover:scale-105 transform transition duration-300 shadow-2xl inline-flex items-center gap-2"
            >
              <span>Speak to an Artisan</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;