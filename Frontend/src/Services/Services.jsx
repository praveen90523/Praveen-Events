import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getServices } from "../services/api";

const Services = () => {
  const navigate = useNavigate();
  const [serviceList, setServiceList] = useState([]);

  const defaultServices = [
    {
      title: "Grand Wedding",
      img: "https://framerusercontent.com/images/ifOncw8817LMptpgHZZy4G8e6Q.jpg?scale-down-to=1024",
      path: "/grand-wedding",
      desc: "Unforgettable wedding setups curating majestic aesthetics."
    },
    {
      title: "Corporate Conferences",
      img: "https://framerusercontent.com/images/N4IZZG1Q5IyYUUpE3vmlgLOqsk.jpg",
      path: "/corporate-conferences",
      desc: "High-grade executive forums, business seminars and product launches."
    },
    {
      title: "Birthday Functions",
      img: "https://framerusercontent.com/images/BybjBGz9yw8T69RSwtLKpE.jpg",
      path: "/birthday-functions",
      desc: "Intimate and themed celebrations tailored for joy."
    },
    {
      title: "Private Parties",
      img: "https://static.vecteezy.com/system/resources/previews/024/057/245/non_2x/teenagers-friends-in-costumes-celebrating-and-having-fun-at-halloween-party-young-people-at-costumes-party-halloween-celebration-concept-by-ai-generated-free-photo.jpg",
      path: "/private-parties",
      desc: "Social cocktails, theme parties, and exclusive gatherings."
    },
    {
      title: "Destinations",
      img: "https://weddingplanningconference.com/blog/wp-content/uploads/2022/09/image-27.png",
      path: "/destinations",
      desc: "Curated coordinates from beach retreats to mountain fortresses."
    },
    {
      title: "Festivals",
      img: "https://www.financialexpress.com/wp-content/uploads/2024/08/Janmashtami-celebration-2024.jpg",
      path: "/festivals",
      desc: "Public cultural celebrations and seasonal events."
    },
  ];

  const getImageUrl = (img) => {
    if (!img) return "";
    if (img.startsWith("http://") || img.startsWith("https://")) {
      return img;
    }
    const baseURL = import.meta.env.VITE_API_URL
      ? import.meta.env.VITE_API_URL.replace("/api", "")
      : "http://localhost:5000";
    return `${baseURL}${img}`;
  };

  useEffect(() => {
    getServices()
      .then((res) => {
        if (res.services && res.services.length > 0) {
          setServiceList(res.services);
        } else {
          setServiceList(defaultServices);
        }
      })
      .catch((err) => {
        console.error(err);
        setServiceList(defaultServices);
      });
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const offerings = [
    {
      title: "Decor Planning",
      desc: "We craft enchanting decor that reflects your unique style and vision, transforming spaces into magical environments.",
      img: "https://static.vecteezy.com/system/resources/previews/003/623/365/non_2x/planning-schedule-or-time-management-with-calendar-business-meeting-activities-and-events-organizing-process-office-working-background-illustration-vector.jpg",
      icon: "🎨"
    },
    {
      title: "Venue Booking",
      desc: "Helping you find the perfect venue for any celebration, from intimate gatherings to grand affairs.",
      img: "https://event-management-ashy-iota.vercel.app/assets/img%203-DIxVPZXF.png",
      icon: "🏛️"
    },
    {
      title: "Entertainment",
      desc: "Exciting entertainment experiences that captivate guests and create lasting memories.",
      img: "https://i.pinimg.com/736x/2d/6c/95/2d6c9544648f98c9be69e1b104a72a52.jpg",
      icon: "🎭"
    },
    {
      title: "Photography",
      desc: "Professional photography to capture unforgettable moments with artistic precision and creativity.",
      img: "https://t3.ftcdn.net/jpg/01/84/88/32/360_F_184883269_raopl6K12HiS4bxzKcD86KDj7wKpfcTN.jpg",
      icon: "📸"
    },
    {
      title: "Catering & Food",
      desc: "Delicious meals with professional catering services tailored to your taste and dietary needs.",
      img: "https://event-management-ashy-iota.vercel.app/assets/img2-Do-VXA49.png",
      icon: "🍽️"
    },
    {
      title: "Logistics",
      desc: "Seamless execution from transportation to setup, ensuring every detail runs smoothly.",
      img: "https://event-management-ashy-iota.vercel.app/assets/img%205-CcGWTsC_.png",
      icon: "🚚"
    },
  ];

  return (
    <div className="bg-white font-sans selection:bg-luxury-orange selection:text-white">
      {/* Hero Section */}
      <section className="relative bg-luxury-charcoal py-28 overflow-hidden border-b border-luxury-gold/10">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-luxury-orange rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-luxury-gold rounded-full blur-3xl animate-float-fast" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center text-white">
          <div className="inline-block bg-white/5 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-luxury-gold/20">
            <span className="text-luxury-gold font-montserrat font-bold text-xs uppercase tracking-wider">
              What We Do
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-montserrat font-black text-white mb-6 tracking-tight">
            Our Services
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 font-poppins max-w-3xl mx-auto leading-relaxed font-light">
            Bespoke event planning and execution tailored to perfect luxury.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        
        {/* Service Categories */}
        <div className="mb-28">
          <div className="text-center pb-16">
            <div className="text-xs font-montserrat font-bold uppercase tracking-[0.2em] text-luxury-orange mb-3">
              Event Portfolios
            </div>
            <h2 className="text-4xl md:text-5xl font-montserrat font-black text-luxury-charcoal mb-4">
              Event Categories
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-luxury-orange to-luxury-gold mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceList.map((service, index) => (
              <div
                key={index}
                onClick={() => handleNavigate(service.path || `/details/${service._id}`)}
                className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-luxury-shadow hover:-translate-y-2 border border-luxury-cream hover:border-luxury-orange/20 transition-all duration-500"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={getImageUrl(service.img)}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/90 via-luxury-charcoal/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h4 className="text-2xl font-montserrat font-bold mb-2 transform transition-transform duration-300 group-hover:translate-x-1">
                      {service.title}
                    </h4>
                    <p className="text-xs text-gray-300 font-poppins line-clamp-2">
                      {service.desc}
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
          </div>
        </div>

        {/* Divider */}
        <div className="relative mb-28">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-luxury-cream" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-8 text-luxury-gold text-xs font-montserrat font-bold uppercase tracking-[0.25em]">
              Signature Offerings
            </span>
          </div>
        </div>

        {/* What We Offer Section */}
        <div className="mb-20">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-montserrat font-black text-luxury-charcoal mb-4">
              What We Offer
            </h2>
            <p className="text-base text-gray-500 font-poppins max-w-3xl mx-auto leading-relaxed">
              We offer comprehensive management modules covering structural decor planning, premium venue selection, high-fidelity sound, artistic media, and luxury coordination.
            </p>
          </div>

          {/* Offerings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offerings.map((item, idx) => (
              <div
                key={idx}
                className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-luxury-shadow hover:-translate-y-2 border border-luxury-cream hover:border-luxury-orange/20 transition-all duration-500"
              >
                <div className="relative mb-6 overflow-hidden rounded-2xl h-56">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl w-14 h-14 flex items-center justify-center shadow-md">
                    <span className="text-3xl">{item.icon}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-montserrat font-bold text-luxury-charcoal mb-3 group-hover:text-luxury-orange transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-600 font-poppins text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-28 bg-gradient-to-r from-luxury-orange to-luxury-orange-bright rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-luxury-shadow text-white">
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-0 left-0 w-80 h-80 bg-white rounded-full blur-2xl animate-float-slow" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full blur-2xl animate-float-fast" />
          </div>
          <div className="relative">
            <h3 className="text-3xl md:text-5xl font-montserrat font-black text-white mb-6">
              Ready to Create Something Amazing?
            </h3>
            <p className="text-white/95 font-poppins font-light text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Let's curate your event vision with our elite coordinators and decorators.
            </p>
            <button
              onClick={() => navigate("/form")}
              className="bg-white text-luxury-orange px-10 py-5 rounded-full font-poppins font-bold text-base sm:text-lg hover:bg-luxury-cream hover:scale-105 transform transition duration-300 shadow-2xl inline-flex items-center gap-2"
            >
              <span className="whitespace-nowrap">Start Curation Journey</span>
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

export default Services;