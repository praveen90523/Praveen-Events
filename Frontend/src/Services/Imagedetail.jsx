import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Imagedetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-flex p-6 rounded-full bg-luxury-orange/10 mb-4">
            <svg className="w-12 h-12 text-luxury-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-400 text-lg font-medium">No data found</p>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-white via-gray-50 to-white min-h-screen px-4 sm:px-6 py-20">
      <div className="max-w-7xl mx-auto">
        
      
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-600 hover:text-luxury-orange transition-colors duration-300 group"
          >
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Back to Gallery</span>
          </button>
        </div>

   
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

         
          <div className="flex justify-center lg:justify-start">
            <div className="w-full max-w-2xl group">
              <div className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
                <img
                  src={state.image}
                  alt={state.hallName}
                  className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-20" />
              </div>
            </div>
          </div>

          
          <div className="space-y-8">
            
           
            <div className="inline-block bg-luxury-cream border border-luxury-orange/20 rounded-full px-6 py-2">
              <span className="text-luxury-orange font-montserrat font-bold text-xs uppercase tracking-wider">
                Event Details
              </span>
            </div>

         
            <h1 className="text-4xl md:text-5xl font-montserrat font-black text-luxury-charcoal leading-tight">
              {state.hallName}
            </h1>

          
            <p className="text-lg text-gray-600 font-poppins leading-relaxed">
              Experience a perfectly curated event at{" "}
              <span className="font-semibold text-gray-800">
                {state.hallName}
              </span>
              . Praveen Events ensures seamless planning, elegant décor, and flawless
              execution tailored to your unique vision.
            </p>

                        <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-luxury-cream hover:shadow-luxury-shadow hover:border-luxury-orange/25 transition-all duration-300">
                <div className="flex items-center mb-2">
                  <div className="bg-luxury-orange/10 p-2 rounded-xl mr-3">
                    <svg className="w-5 h-5 text-luxury-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <p className="text-xs font-montserrat font-bold uppercase text-gray-400 tracking-wider">Category</p>
                </div>
                <p className="font-montserrat font-black text-luxury-charcoal text-base sm:text-lg">
                  {state.category}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-luxury-cream hover:shadow-luxury-shadow hover:border-luxury-orange/25 transition-all duration-300">
                <div className="flex items-center mb-2">
                  <div className="bg-luxury-orange/10 p-2 rounded-xl mr-3">
                    <svg className="w-5 h-5 text-luxury-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <p className="text-xs font-montserrat font-bold uppercase text-gray-400 tracking-wider">Guests</p>
                </div>
                <p className="font-montserrat font-black text-luxury-charcoal text-base sm:text-lg">
                  {state.guests || "Flexible"}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-luxury-cream hover:shadow-luxury-shadow hover:border-luxury-orange/25 transition-all duration-300">
                <div className="flex items-center mb-2">
                  <div className="bg-luxury-orange/10 p-2 rounded-xl mr-3">
                    <svg className="w-5 h-5 text-luxury-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-xs font-montserrat font-bold uppercase text-gray-400 tracking-wider">Budget</p>
                </div>
                <p className="font-montserrat font-black text-luxury-charcoal text-base sm:text-lg">
                  {state.budget || "Custom"}
                </p>
              </div>

              <div className="bg-white rounded-2xl p-5 shadow-sm border border-luxury-cream hover:shadow-luxury-shadow hover:border-luxury-orange/25 transition-all duration-300">
                <div className="flex items-center mb-2">
                  <div className="bg-luxury-orange/10 p-2 rounded-xl mr-3">
                    <svg className="w-5 h-5 text-luxury-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-xs font-montserrat font-bold uppercase text-gray-400 tracking-wider">Location</p>
                </div>
                <p className="font-montserrat font-black text-luxury-charcoal text-base sm:text-lg">
                  {state.location || "Multiple Locations"}
                </p>
              </div>
            </div>

          
            <div className="flex flex-wrap gap-4 pt-6">
              <button
                onClick={() => navigate("/form", { state })}
                className="group relative bg-gradient-to-r from-luxury-orange to-luxury-orange-bright text-white px-8 py-4.5 rounded-2xl font-poppins font-bold hover:scale-105 shadow-luxury-shadow hover:shadow-orange-500/40 transform transition-all duration-300 overflow-hidden inline-flex items-center"
              >
                <span className="relative z-10 mr-2">Book This Event</span>
                <svg className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              <button
                onClick={() => navigate(-1)}
                className="bg-white text-luxury-charcoal px-8 py-4.5 rounded-2xl font-poppins font-bold border-2 border-luxury-gold/30 hover:border-luxury-orange hover:text-luxury-orange transition-all duration-300 inline-flex items-center hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Gallery
              </button>
            </div>

           
            <div className="bg-luxury-cream/40 border border-luxury-gold/25 rounded-3xl p-6 mt-8">
              <div className="flex items-start">
                <div className="bg-luxury-orange/10 p-3 rounded-2xl mr-4 flex-shrink-0">
                  <svg className="w-6 h-6 text-luxury-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-montserrat font-bold text-luxury-charcoal mb-1">Need Assistance?</h4>
                  <p className="text-sm text-gray-500 font-poppins">Our event planning team is available 24/7 to help you create the perfect celebration.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Imagedetail;