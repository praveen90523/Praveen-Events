import React from "react";
import { useNavigate } from "react-router-dom";

const Authentication = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-hidden font-sans">
      {/* Immersive Hero Header */}
      <div className="relative overflow-hidden bg-luxury-charcoal py-28 md:py-36 text-white border-b border-luxury-gold/10">
        {/* Floating Abstract Luxury Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-luxury-orange/20 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-luxury-gold/10 rounded-full blur-3xl animate-float-fast"></div>
          <div className="absolute top-1/2 left-2/3 w-40 h-40 bg-luxury-orange-bright/15 rounded-full blur-2xl animate-pulse"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center px-4">
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 bg-white/5 backdrop-blur-md rounded-full text-xs font-montserrat font-bold uppercase tracking-[0.25em] text-luxury-gold border border-luxury-gold/20 shadow-premium-glow">
            ✨ Elite Event Curation
          </div>

          <h1 className="text-5xl md:text-8xl font-montserrat font-black mb-8 leading-tight tracking-tight">
            Welcome to{" "}
            <span className="text-gold-gradient block mt-2 text-6xl md:text-9xl drop-shadow-md">
              Praveen Events
            </span>
          </h1>

          <p className="text-lg md:text-2xl mb-12 text-gray-300 font-poppins max-w-3xl mx-auto font-light leading-relaxed">
            Curating breathtaking weddings, dynamic corporate venues, and luxury celebrations that leave a lasting signature.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
            <button
              onClick={() => navigate("/signup")}
              className="w-full sm:w-auto group relative bg-gradient-to-r from-luxury-orange via-luxury-orange-bright to-luxury-orange-soft text-white px-10 py-5 rounded-full font-poppins font-bold text-base sm:text-lg hover:scale-105 transition-all duration-300 shadow-luxury-shadow hover:shadow-orange-500/40 inline-flex items-center justify-center gap-2"
            >
              <span className="relative z-10">Start Planning Journey</span>
            </button>

            <button
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto border-2 border-luxury-gold/50 backdrop-blur-sm bg-white/5 text-white hover:text-luxury-charcoal px-10 py-5 rounded-full font-poppins font-bold text-base sm:text-lg hover:bg-white transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2"
            >
              Log In Account
            </button>
          </div>
        </div>
      </div>

      {/* Feature list */}
      <div className="py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-20">
            <div className="text-xs font-montserrat font-bold uppercase tracking-[0.2em] text-luxury-orange mb-3">
              Elite Planning Tools
            </div>
            <h2 className="text-4xl md:text-5xl font-montserrat font-black text-luxury-charcoal mb-4">
              Everything You Need to Succeed
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-luxury-orange to-luxury-gold mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Card 1 */}
            <div className="group bg-luxury-cream/35 p-10 rounded-3xl border border-luxury-orange/10 hover:border-luxury-orange/40 text-center hover:shadow-luxury-shadow hover:-translate-y-2 transition-all duration-500 cursor-pointer">
              <div className="text-5xl mb-6 bg-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                📅
              </div>
              <h3 className="text-2xl font-montserrat font-bold mb-4 text-luxury-charcoal">
                Smart Planning
              </h3>
              <p className="text-gray-600 font-poppins text-sm leading-relaxed">
                Create detailed event schedules with our intuitive drag-and-drop interface, coordinating suppliers seamlessly.
              </p>
              <div className="mt-6 text-xs font-bold text-luxury-orange opacity-0 group-hover:opacity-100 transition-opacity">
                Configure Schedule →
              </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-luxury-cream/35 p-10 rounded-3xl border border-luxury-orange/10 hover:border-luxury-orange/40 text-center hover:shadow-luxury-shadow hover:-translate-y-2 transition-all duration-500 cursor-pointer">
              <div className="text-5xl mb-6 bg-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                📝
              </div>
              <h3 className="text-2xl font-montserrat font-bold mb-4 text-luxury-charcoal">
                Organized Checklists
              </h3>
              <p className="text-gray-600 font-poppins text-sm leading-relaxed">
                Never miss a milestone with our custom priority lists, checklists, and automated notification alerts.
              </p>
              <div className="mt-6 text-xs font-bold text-luxury-orange opacity-0 group-hover:opacity-100 transition-opacity">
                Manage Checklists →
              </div>
            </div>

            {/* Card 3 */}
            <div className="group bg-luxury-cream/35 p-10 rounded-3xl border border-luxury-orange/10 hover:border-luxury-orange/40 text-center hover:shadow-luxury-shadow hover:-translate-y-2 transition-all duration-500 cursor-pointer">
              <div className="text-5xl mb-6 bg-white w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                🤝
              </div>
              <h3 className="text-2xl font-montserrat font-bold mb-4 text-luxury-charcoal">
                Team Collaboration
              </h3>
              <p className="text-gray-600 font-poppins text-sm leading-relaxed">
                Work together seamlessly with decorators, caterers, and clients using centralized dashboard communication.
              </p>
              <div className="mt-6 text-xs font-bold text-luxury-orange opacity-0 group-hover:opacity-100 transition-opacity">
                Start Curation →
              </div>
            </div>
          </div>

          {/* Luxury statistics counters */}
          <div className="mt-28 border-t border-luxury-orange/10 pt-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-4xl mx-auto text-center">
              <div className="p-6">
                <div className="text-5xl font-montserrat font-black bg-gradient-to-r from-luxury-orange to-luxury-orange-bright bg-clip-text text-transparent mb-2">
                  10K+
                </div>
                <div className="text-sm uppercase tracking-wider font-bold text-gray-500">Events Planned</div>
              </div>
              <div className="p-6">
                <div className="text-5xl font-montserrat font-black bg-gradient-to-r from-luxury-orange to-luxury-orange-bright bg-clip-text text-transparent mb-2">
                  50K+
                </div>
                <div className="text-sm uppercase tracking-wider font-bold text-gray-500">Happy Clients</div>
              </div>
              <div className="p-6">
                <div className="text-5xl font-montserrat font-black bg-gradient-to-r from-luxury-orange to-luxury-orange-bright bg-clip-text text-transparent mb-2">
                  99%
                </div>
                <div className="text-sm uppercase tracking-wider font-bold text-gray-500">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-luxury-charcoal text-white text-center py-8 border-t border-luxury-gold/10 mt-auto">
        <div className="flex items-center justify-center gap-2 font-poppins text-sm text-gray-400">
          <span>Made with</span>
          <span className="text-luxury-orange animate-pulse text-xl">❤️</span>
          <span>by</span>
          <span className="font-bold text-white tracking-wide">
            Praveen Events Team
          </span>
        </div>
      </div>
    </div>
  );
};

export default Authentication;