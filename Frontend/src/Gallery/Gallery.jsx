import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGallery } from "../Services/api";

import img1 from "../Images/img1.png";
import img2 from "../Images/img2.png";
import img3 from "../Images/img3.png";
import img4 from "../Images/img4.png";
import img5 from "../Images/img5.png";
import img6 from "../Images/img6.png";
import img7 from "../Images/img7.png";
import img8 from "../Images/img8.png";
import img9 from "../Images/img9.png";
import img10 from "../Images/img10.png";
import img11 from "../Images/img11.png";
import img12 from "../Images/img12.png";
import img13 from "../Images/img13.png";
import img14 from "../Images/img14.png";
import img15 from "../Images/img15.png";
import img16 from "../Images/img16.png";
import img17 from "../Images/img17.png";
import img18 from "../Images/img18.png";
import img19 from "../Images/img19.png";
import img20 from "../Images/img20.png";
import img21 from "../Images/img21.png";
import img22 from "../Images/img22.png";
import img23 from "../Images/img23.png";
import img24 from "../Images/img24.png";
import img25 from "../Images/img25.png";
import img26 from "../Images/img26.png";
import img27 from "../Images/img27.png";
import img28 from "../Images/img28.png";
import img29 from "../Images/img29.png";
import img30 from "../Images/img30.png";
import img31 from "../Images/img31.png";
import img32 from "../Images/img32.png";

const defaultImages = [
  { _id: "default-1", image: img1 },
  { _id: "default-2", image: img2 },
  { _id: "default-3", image: img3 },
  { _id: "default-4", image: img4 },
  { _id: "default-5", image: img5 },
  { _id: "default-6", image: img6 },
  { _id: "default-7", image: img7 },
  { _id: "default-8", image: img8 },
  { _id: "default-9", image: img9 },
  { _id: "default-10", image: img10 },
  { _id: "default-11", image: img11 },
  { _id: "default-12", image: img12 },
  { _id: "default-13", image: img13 },
  { _id: "default-14", image: img14 },
  { _id: "default-15", image: img15 },
  { _id: "default-16", image: img16 },
  { _id: "default-17", image: img17 },
  { _id: "default-18", image: img18 },
  { _id: "default-19", image: img19 },
  { _id: "default-20", image: img20 },
  { _id: "default-21", image: img21 },
  { _id: "default-22", image: img22 },
  { _id: "default-23", image: img23 },
  { _id: "default-24", image: img24 },
  { _id: "default-25", image: img25 },
  { _id: "default-26", image: img26 },
  { _id: "default-27", image: img27 },
  { _id: "default-28", image: img28 },
  { _id: "default-29", image: img29 },
  { _id: "default-30", image: img30 },
  { _id: "default-31", image: img31 },
  { _id: "default-32", image: img32 },
];

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const getImageUrl = (img) => {
    if (!img) return "";
    if (img.startsWith("http://") || img.startsWith("https://")) {
      return img;
    }
    if (img.startsWith("/uploads/")) {
      const defaultBaseURL = import.meta.env.MODE === "development"
        ? "http://localhost:5000"
        : "https://praveen-events.onrender.com";
      const baseURL = import.meta.env.VITE_API_URL
        ? import.meta.env.VITE_API_URL.replace("/api", "")
        : defaultBaseURL;
      return `${baseURL}${img}`;
    }
    return img;
  };

  useEffect(() => {
    getGallery()
      .then((res) => {
        if (res.gallery && res.gallery.length > 0) {
          setImages(res.gallery);
        } else {
          setImages(defaultImages);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setImages(defaultImages);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white font-sans selection:bg-luxury-orange selection:text-white">
      {/* Header banner */}
      <section className="relative bg-luxury-charcoal py-28 overflow-hidden border-b border-luxury-gold/10">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-luxury-orange rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-luxury-gold rounded-full blur-3xl animate-float-fast" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center text-white">
          <div className="inline-block bg-white/5 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-luxury-gold/20">
            <span className="text-luxury-gold font-montserrat font-bold text-xs uppercase tracking-wider">
              Our Gallery
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-montserrat font-black text-white mb-6 tracking-tight">
            Event Gallery
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 font-poppins max-w-3xl mx-auto leading-relaxed font-light">
            A curated archive of majestic and celebratory details captured in real time.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-luxury-orange border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-poppins font-medium">
              Loading curated moments...
            </p>
          </div>
        ) : (
          <>
            {/* Masonry / Grid */}
            {images.length === 0 ? (
              <div className="text-center py-28">
                <div className="inline-flex p-6 rounded-full bg-luxury-cream border border-luxury-orange/20 mb-6">
                  <svg className="w-12 h-12 text-luxury-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-montserrat font-bold text-luxury-charcoal mb-3">Gallery Coming Soon</h3>
                <p className="text-gray-500 font-poppins max-w-md mx-auto text-sm leading-relaxed">
                  Our curated collection of masterpiece events is being prepared. Check back soon to explore our portfolio.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                {images.map((x, index) => (
                  <div
                    key={x._id || index}
                    onClick={() => setSelectedImage(getImageUrl(x.image))}
                    className="group cursor-pointer bg-white rounded-[2rem] overflow-hidden shadow-md hover:shadow-luxury-shadow transition-all duration-500 transform hover:-translate-y-2 border border-luxury-cream hover:border-luxury-orange/20"
                  >
                    <div className="relative overflow-hidden aspect-square">
                      <img
                        src={getImageUrl(x.image)}
                        alt={`Gallery ${index + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Hover Overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <p className="text-white text-xs font-montserrat font-bold uppercase tracking-wider">
                          View Frame
                        </p>
                      </div>
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md">
                        <svg className="w-5 h-5 text-luxury-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Banner */}
            <div className="mt-28 bg-gradient-to-r from-luxury-orange to-luxury-orange-bright rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-luxury-shadow text-white">
              <div className="absolute inset-0 opacity-15">
                <div className="absolute top-0 left-0 w-80 h-80 bg-white rounded-full blur-2xl animate-float-slow" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full blur-2xl animate-float-fast" />
              </div>
              <div className="relative">
                <h3 className="text-3xl md:text-5xl font-montserrat font-black text-white mb-6">
                  Want to Capture Your Memories?
                </h3>
                <p className="text-white/95 font-poppins font-light text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                  Let us capture your masterpiece events with high-fidelity production value.
                </p>
                <button
                  onClick={() => navigate("/form")}
                  className="bg-white text-luxury-orange px-10 py-5 rounded-full font-poppins font-bold text-base sm:text-lg hover:bg-luxury-cream hover:scale-105 transform transition duration-300 shadow-2xl inline-flex items-center gap-2"
                >
                  <span>Start Planning Journey</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-luxury-charcoal/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-14 right-0 text-white hover:text-luxury-orange transition-colors p-2"
            >
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedImage}
              alt="Full size preview"
              className="w-full h-auto rounded-3xl shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;