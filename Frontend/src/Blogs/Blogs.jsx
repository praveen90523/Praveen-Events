import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { getBlogs } from "../Services/api";

const Blogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultBlogPosts = [
    {
      id: 1,
      _id: "default-1",
      title: "How Praveen Events Can Simplify Your Event Planning Process",
      image: "https://framerusercontent.com/images/ZN6C9I3xkufl91QnGjKphMlSrI.jpg?scale-down-to=1024",
      excerpt: "Discover proven strategies to streamline your event planning and create unforgettable experiences with ease.",
      date: "December 10, 2024",
      readTime: "5 min read",
      category: "Planning Tips",
      path: "/Blogs1"
    },
    {
      id: 2,
      _id: "default-2",
      title: "The Benefits of Hiring a Professional Event Planner",
      image: "https://framerusercontent.com/images/X7DZ3crjPZlTeCQsL2mSnAAOF74.jpg?scale-down-to=1024",
      excerpt: "Learn why partnering with expert planners can transform your event from ordinary to extraordinary.",
      date: "December 8, 2024",
      readTime: "4 min read",
      category: "Industry Insights",
      path: "/Blogs2"
    }
  ];

  const getImageUrl = (img) => {
    if (!img) return "";
    if (img.startsWith("http://") || img.startsWith("https://")) {
      return img;
    }
    const defaultBaseURL = import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "https://praveenevents.onrender.com";
    const baseURL = import.meta.env.VITE_API_URL
      ? import.meta.env.VITE_API_URL.replace("/api", "")
      : defaultBaseURL;
    return `${baseURL}${img}`;
  };

  useEffect(() => {
    getBlogs()
      .then((res) => {
        if (res.blogs && res.blogs.length > 0) {
          setBlogs(res.blogs);
        } else {
          setBlogs(defaultBlogPosts);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setBlogs(defaultBlogPosts);
        setLoading(false);
      });
  }, []);

  const handleNavigation = (post) => {
    if (post.path) {
      navigate(post.path);
    } else {
      // If a custom blog was created, go to the generic first blog view
      navigate("/Blogs1", { state: { blog: post } });
    }
  };

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
              Insights & Stories
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-montserrat font-black text-white mb-6 tracking-tight">
            Our Blog
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 font-poppins max-w-3xl mx-auto leading-relaxed font-light">
            Creative guidelines, aesthetic suggestions, and planning secrets.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        {/* Featured blog article */}
        <div className="mb-24">
          <div className="relative rounded-3xl overflow-hidden shadow-md hover:shadow-luxury-shadow border border-luxury-cream hover:border-luxury-orange/15 transition-all duration-500 group">
            <div className="relative h-96 md:h-[500px] lg:h-[550px]">
              <img
                src="https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_1280.jpg"
                alt="Featured blog"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/90 via-luxury-charcoal/40 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                <div className="max-w-4xl">
                  <div className="inline-block bg-gradient-to-r from-luxury-orange to-luxury-orange-bright rounded-full px-4 py-1.5 mb-4 shadow-md">
                    <span className="text-xs font-montserrat font-bold uppercase tracking-wider">Featured</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-montserrat font-black mb-4 leading-tight">
                    Creating Memorable Events: A Complete Guide
                  </h2>
                  <p className="text-sm md:text-base text-gray-200 mb-6 max-w-2xl font-poppins font-light leading-relaxed">
                    From preliminary color palette curation to technical sound check details, learn the signatures behind planning grand celebrations.
                  </p>
                  <div className="flex items-center space-x-6 text-xs sm:text-sm font-poppins text-gray-300">
                    <span className="flex items-center space-x-2">
                      <span>December 15, 2024</span>
                    </span>
                    <span className="flex items-center space-x-2">
                      <span>8 min read</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Articles list */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-16 border-b border-luxury-cream pb-6">
            <div>
              <h2 className="text-3xl font-montserrat font-black text-luxury-charcoal">Latest Articles</h2>
              <p className="text-gray-500 font-poppins text-sm mt-1">Explore our recent publications and designer guides.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {loading ? (
              <div className="col-span-2 text-center py-20">
                <div className="w-10 h-10 border-4 border-luxury-orange border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-gray-500 font-poppins text-sm">Loading articles...</p>
              </div>
            ) : (
              blogs.map((post) => (
                <div
                  key={post._id || post.id}
                  onClick={() => handleNavigation(post)}
                  className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-luxury-shadow border border-luxury-cream hover:border-luxury-orange/25 transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="relative h-64 sm:h-72 overflow-hidden">
                    <img
                      src={getImageUrl(post.image)}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-luxury-orange to-luxury-orange-bright text-white text-xxs font-montserrat font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-montserrat font-bold text-luxury-charcoal mb-4 group-hover:text-luxury-orange transition-colors duration-300 leading-tight">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 font-poppins text-sm leading-relaxed mb-6 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4 text-xs font-poppins text-gray-400">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-luxury-orange font-poppins font-bold text-sm group-hover:translate-x-1.5 transition-transform duration-300">
                        <span>Read Article</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Newsletter Subscription Banner */}
        <div className="mt-28 bg-gradient-to-r from-luxury-orange to-luxury-orange-bright rounded-3xl p-12 md:p-20 text-center relative overflow-hidden shadow-luxury-shadow text-white">
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-0 left-0 w-80 h-80 bg-white rounded-full blur-2xl animate-float-slow" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full blur-2xl animate-float-fast" />
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="inline-block bg-white/5 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-luxury-gold/20">
              <span className="text-luxury-gold font-montserrat font-bold text-xs uppercase tracking-wider">
                Stay Updated
              </span>
            </div>
            <h3 className="text-3xl md:text-5xl font-montserrat font-black text-white mb-4">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-white/95 font-poppins font-light text-lg mb-10 leading-relaxed">
              Get the latest planning guidelines, visual themes, and designer insights sent directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4.5 rounded-full text-luxury-charcoal placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-white/30 text-sm font-poppins"
              />
              <button
                onClick={() => navigate("/form")}
                className="bg-white text-luxury-orange px-8 py-4.5 rounded-full font-poppins font-bold hover:bg-luxury-cream hover:scale-105 transform transition duration-300 shadow-xl whitespace-nowrap text-sm"
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;