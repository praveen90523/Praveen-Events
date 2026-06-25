import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ServiceGallery = ({ title, description, category }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://api.jsonbin.io/v3/b/6800f20c8a456b79668b6788")
      .then((res) => setData(res.data.record))
      .catch((err) => console.log(err));
  }, []);

  const handleClick = (item) => {
    navigate(`/details/${item.id}`, { state: item });
  };

  return (
    <section className="bg-gradient-to-b from-white via-luxury-cream/10 to-white px-4 sm:px-6 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto">

     
        <div className="text-center py-10 sm:py-4 mb-8 sm:mb-16 ">
          <div className="inline-block bg-luxury-cream border border-luxury-orange/20 rounded-full px-5 py-2 mb-4 sm:mb-6">
            <span className="text-luxury-orange font-montserrat font-bold text-xs uppercase tracking-wider">
              Our Collection
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-black text-luxury-charcoal mb-2 sm:mb-4 px-2">
            {title}
          </h2>
          <p className="text-sm sm:text-lg text-gray-500 font-poppins max-w-3xl mx-auto leading-relaxed px-4">
            {description}
          </p>
        </div>

     
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {data
            .filter((item) => item.category === category)
            .map((item, index) => (
              <div
                key={index}
                onClick={() => handleClick(item)}
                className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-luxury-shadow transition-all duration-500 transform hover:-translate-y-2 border border-luxury-cream hover:border-luxury-orange/20 flex flex-col h-full justify-between"
              >
                <div className="relative h-48 sm:h-72 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.hallName}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/80 via-luxury-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
               
                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/95 backdrop-blur-sm rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-luxury-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>

                
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
                    <p className="text-lg sm:text-xl font-montserrat font-bold transform transition-transform duration-300 group-hover:translate-x-2">
                      {item.hallName}
                    </p>
                  </div>
                </div>

              
                <div className="p-4 sm:p-6 flex-grow flex items-center justify-center bg-white border-t border-luxury-cream/50">
                  <p className="text-center font-montserrat font-bold text-luxury-charcoal text-xs sm:text-base group-hover:text-luxury-orange transition-colors duration-300 line-clamp-2">
                    {item.hallName}
                  </p>
                </div>
              </div>
            ))}
        </div>

      </div>
    </section>
  );
};

export default ServiceGallery;