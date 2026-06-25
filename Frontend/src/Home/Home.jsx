import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [loggedInPerson, setLoggedInPerson] = useState(
    localStorage.getItem("loggedInPerson") || "Guest"
  );

  useEffect(() => {
    if (location.state?.personData?.name) {
      localStorage.setItem("loggedInPerson", location.state.personData.name);
      localStorage.setItem("loggedInPersonRole", location.state.role);
      setLoggedInPerson(location.state.personData.name);
    }
  }, [location.state]);

  const videoSources = [
    "https://videos.pexels.com/video-files/9474518/9474518-uhd_2732_1440_30fps.mp4",
    "https://videos.pexels.com/video-files/31575321/13456306_2560_1440_25fps.mp4",
    "https://videos.pexels.com/video-files/31501470/13430911_1920_1080_60fps.mp4",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % videoSources.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-x-hidden bg-white font-sans selection:bg-luxury-orange selection:text-white">
      {/* Immersive Video Slider Hero */}
      <div className="relative h-[95vh] min-h-[650px] overflow-hidden">
        <video
          key={activeIndex}
          src={videoSources[activeIndex]}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Premium Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-charcoal/80 via-luxury-charcoal/50 to-luxury-charcoal/90">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12">

              <div className="inline-block bg-white/10 backdrop-blur-md rounded-full px-6 py-2.5 mb-6 border border-luxury-gold/30 shadow-premium-glow">
                <span className="text-luxury-gold font-montserrat font-bold text-xs uppercase tracking-[0.25em]">
                  👑 Premium Event Management
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-montserrat font-black leading-tight tracking-tight text-white mb-6">
                Premier Planning for<br />
                <span className="text-gold-gradient font-playfair font-normal italic">Life's Masterpiece Moments</span>
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl text-gray-200 font-poppins font-light max-w-4xl mx-auto mb-10 leading-relaxed">
                Grand Weddings • Corporate Galas • Cultural Festivals • Elite Soirées
              </p>

              <button
                onClick={() => navigate("/form")}
                className="group relative bg-gradient-to-r from-luxury-orange via-luxury-orange-bright to-luxury-orange-soft text-white px-10 py-5 rounded-full font-poppins font-bold text-base sm:text-lg shadow-luxury-shadow hover:scale-105 hover:shadow-orange-500/40 transition duration-300 inline-flex items-center justify-center gap-3"
              >
                <span>Plan Your Event Today</span>
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>

              {/* Slider Dots */}
              <div className="flex justify-center gap-2.5 mt-16">
                {videoSources.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-500 ${activeIndex === idx ? "w-12 bg-luxury-orange" : "w-6 bg-white/40 hover:bg-white/60"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="text-center mb-20">
          <div className="inline-block bg-luxury-cream border border-luxury-orange/20 rounded-full px-6 py-2 mb-4">
            <span className="text-luxury-orange font-montserrat font-bold text-xs uppercase tracking-wider">
              Why Choose Praveen Events
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-montserrat font-black mb-6 text-luxury-charcoal">
            Your Trusted Partner for<br />Exceptional Occasions
          </h2>
          <p className="text-lg text-gray-500 font-poppins max-w-4xl mx-auto leading-relaxed">
            From seamless planning systems to breathtaking decor curation, we bring your vision to life with elite design, unmatched quality, and absolute precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: (
                <svg className="w-8 h-8 text-luxury-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "Bespoke Excellence",
              desc: "Over 500+ hallmark celebrations delivered with trademark design accuracy, custom aesthetics, and client satisfaction."
            },
            {
              icon: (
                <svg className="w-8 h-8 text-luxury-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ),
              title: "Artisanal Execution",
              desc: "Every logistics timeline and production detail is handled precisely, prioritizing security, quality, and event flow."
            },
            {
              icon: (
                <svg className="w-8 h-8 text-luxury-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ),
              title: "Bespoke Planners",
              desc: "Dedicated luxury planners managing every texture, color hue, floral arrangement, and acoustic element."
            }
          ].map((feature, i) => (
            <div
              key={i}
              className="group bg-white rounded-3xl p-10 shadow-sm hover:shadow-luxury-shadow transition-all duration-500 transform hover:-translate-y-3 border border-luxury-cream hover:border-luxury-orange/20 flex flex-col h-full"
            >
              <div className="bg-luxury-cream p-4 rounded-2xl inline-flex mb-6 transition-colors group-hover:bg-luxury-orange/10 mr-auto">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-montserrat font-bold text-luxury-charcoal mb-4 group-hover:text-luxury-orange transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 font-poppins text-sm leading-relaxed flex-grow">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision Statement */}
      <section className="relative bg-luxury-charcoal py-28 overflow-hidden border-y border-luxury-gold/10">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-luxury-orange rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-luxury-gold rounded-full blur-3xl animate-float-fast" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="inline-block bg-white/5 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-luxury-gold/20">
            <span className="text-luxury-gold font-montserrat font-bold text-xs uppercase tracking-wider">
              Our Vision
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-montserrat font-black mb-8 text-white">
            Creating Masterpiece Occasions
          </h2>
          <p className="text-xl text-gray-300 font-poppins font-light leading-relaxed max-w-4xl mx-auto">
            We believe that every event is an art canvas. Our creative artisans specialize in converting layouts into bespoke environments, handling details with elegant aesthetics and professional accuracy.
          </p>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="bg-white py-20 border-b border-luxury-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { number: "500+", label: "Events Curated", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
              { number: "98%", label: "Client Satisfaction", icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
              { number: "12+", label: "Years Experience", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
              { number: "50+", label: "City Coverage", icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" }
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-luxury-cream border border-luxury-orange/20 mb-5 group-hover:bg-luxury-orange/10 transition-colors duration-300">
                  <svg className="w-6 h-6 text-luxury-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                  </svg>
                </div>
                <div className="text-4xl md:text-5xl font-montserrat font-black bg-gradient-to-r from-luxury-orange to-luxury-orange-bright bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <p className="text-sm font-poppins font-semibold text-gray-500 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="text-center mb-20">
          <div className="inline-block bg-luxury-cream border border-luxury-orange/20 rounded-full px-6 py-2 mb-4">
            <span className="text-luxury-orange font-montserrat font-bold text-xs uppercase tracking-wider">
              Client Chronicles
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-montserrat font-black text-luxury-charcoal mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-500 font-poppins max-w-3xl mx-auto leading-relaxed">
            Real words from families and businesses who trusted us with their most cherished celebrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: "Praveen Events transformed our wedding into an absolute dream. Every detail was flawless — from the floral arrangements to the lighting. Our guests were completely mesmerized.",
              name: "Ananya & Rohit Sharma",
              role: "Wedding Clients",
              initial: "A"
            },
            {
              quote: "Our annual corporate conference was executed with absolute precision. The production quality, AV setup, and catering exceeded every expectation. A true luxury experience.",
              name: "Kiran Mehta",
              role: "Director, TechVista Corp",
              initial: "K"
            },
            {
              quote: "My daughter's birthday party was everything she dreamed of and more. The themed decor, entertainment, and coordination were extraordinary. Highly recommend!",
              name: "Priya Nambiar",
              role: "Private Party Client",
              initial: "P"
            }
          ].map((t, i) => (
            <div key={i} className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-luxury-shadow border border-luxury-cream hover:border-luxury-orange/20 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, s) => (
                  <svg key={s} className="w-4 h-4 text-luxury-gold fill-luxury-gold" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              {/* Quote */}
              <p className="text-gray-600 font-poppins text-sm leading-relaxed mb-8 italic flex-grow">
                &ldquo;{t.quote}&rdquo;
              </p>
              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-luxury-cream">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-luxury-orange to-luxury-gold flex items-center justify-center text-white font-montserrat font-black text-lg flex-shrink-0">
                  {t.initial}
                </div>
                <div>
                  <p className="font-montserrat font-bold text-luxury-charcoal text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400 font-poppins">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="text-center mb-20">
          <div className="inline-block bg-luxury-cream border border-luxury-orange/20 rounded-full px-6 py-2 mb-4">
            <span className="text-luxury-orange font-montserrat font-bold text-xs uppercase tracking-wider">
              Our Execution Path
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-montserrat font-black text-luxury-charcoal mb-6">
            Let's Plan Your Big Day
          </h2>
          <p className="text-lg text-gray-500 font-poppins max-w-3xl mx-auto">
            From your preliminary consultation through the day of execution, our path ensures a peaceful planning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { title: "Consultation", text: "Share your custom vision and requirements with our event artists.", img: "Call-icon.png" },
            { title: "Curation", text: "Browse our bespoke design themes and layouts.", img: "Search.png" },
            { title: "Mockup", text: "Experience high-fidelity rendering of your event environment.", img: "Images.png" },
            { title: "Reserve", text: "Secure your date with fully transparent luxury billing.", img: "Calender.png" },
            { title: "Experience", text: "Step into your masterpiece celebration, fully managed by us.", img: "Women-with-tea.png" },
          ].map((step, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-3xl p-6 text-center border border-luxury-cream hover:border-luxury-orange/30 hover:shadow-luxury-shadow hover:-translate-y-2 transition-all duration-500 flex flex-col items-center justify-between h-full pt-10"
            >
              <div className="absolute -top-3.5 -left-3.5 bg-gradient-to-br from-luxury-orange to-luxury-gold text-white w-10 h-10 rounded-full flex items-center justify-center font-montserrat font-bold text-base shadow-md">
                {i + 1}
              </div>

              <div className="flex flex-col items-center flex-grow justify-center">
                <div className="bg-luxury-cream rounded-2xl p-5 mb-5 group-hover:bg-luxury-orange/5 transition-colors">
                  <img
                    src={`https://goldentrumpetevents.com/wp-content/uploads/2023/10/${step.img}`}
                    alt={step.title}
                    className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <h4 className="font-montserrat font-bold text-lg text-luxury-charcoal mb-2 group-hover:text-luxury-orange transition-colors">
                  {step.title}
                </h4>
                <p className="text-xs text-gray-500 font-poppins leading-relaxed">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action banner */}
      <section className="relative bg-gradient-to-r from-luxury-orange to-luxury-orange-bright py-28 overflow-hidden shadow-luxury-shadow">
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-0 w-80 h-80 bg-white rounded-full blur-2xl animate-float-slow" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full blur-2xl animate-float-fast" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl md:text-7xl font-montserrat font-black mb-6">
            Ready to Create Magic?
          </h2>
          <p className="text-lg sm:text-xl text-white/95 font-poppins font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            Collaborate with Praveen Events to orchestrate your next masterpiece celebration. Contact us today.
          </p>
          <button
            onClick={() => navigate("/form")}
            className="bg-white text-luxury-orange px-10 py-5 rounded-full font-poppins font-bold text-base sm:text-lg hover:bg-luxury-cream hover:scale-105 transform transition duration-300 shadow-2xl inline-flex items-center gap-2"
          >
            <span>Start Curation Journey</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;