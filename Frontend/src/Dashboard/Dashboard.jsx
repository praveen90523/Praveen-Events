import React, { useEffect, useState, useRef } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { toast } from "react-toastify";
import CountUp from "react-countup";
import Adminsidebar from "../Adminsidebar/Adminsidebar";
import {
  getStats,
  getBookings,
  updateBookingStatus,
  deleteBooking,
  getContacts,
  getServices,
  createService,
  deleteService,
  getBlogs,
  createBlog,
  deleteBlog,
  getGallery,
  uploadGalleryImage,
  deleteGalleryImage,
} from "../services/api";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  // Tabs: 'bookings' | 'contacts' | 'services' | 'blogs' | 'gallery'
  const [activeTab, setActiveTab] = useState("bookings");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalContacts: 0,
    totalBlogs: 0,
    totalServices: 0,
    statusCounts: { accepted: 0, rejected: 0, pending: 0 },
    eventMap: {},
  });

  // Data lists
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [gallery, setGallery] = useState([]);

  // Modals / Form inputs
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [serviceForm, setServiceForm] = useState({
    title: "",
    desc: "",
    img: "",
  });

  const [showBlogModal, setShowBlogModal] = useState(false);
  const [blogForm, setBlogForm] = useState({
    title: "",
    image: "",
    excerpt: "",
    content: "",
    category: "Planning Tips",
    readTime: "5 min read",
  });

  const [galleryFile, setGalleryFile] = useState(null);
  const [galleryUrl, setGalleryUrl] = useState("");
  const [uploadingGallery, setUploadingGallery] = useState(false);

  const [processingItems, setProcessingItems] = useState(new Set());

  // Image path resolver helper
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

  // Fetch Dashboard Stats & Bookings on mount
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, bookingsRes, contactsRes, servicesRes, blogsRes, galleryRes] = await Promise.all([
        getStats(),
        getBookings(),
        getContacts(),
        getServices(),
        getBlogs(),
        getGallery(),
      ]);

      setStats(statsRes.stats);
      setBookings(bookingsRes.bookings || []);
      setContacts(contactsRes.contacts || []);
      setServices(servicesRes.services || []);
      setBlogs(blogsRes.blogs || []);
      setGallery(galleryRes.gallery || []);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard metrics");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Update Booking Status
  const handleUpdateBookingStatus = async (id, status) => {
    if (processingItems.has(id)) return;
    setProcessingItems((prev) => new Set(prev).add(id));

    try {
      await updateBookingStatus(id, status);
      toast.success(`Booking ${status} successfully`);
      fetchDashboardData();
    } catch (error) {
      console.error(error);
      toast.error(`Failed to update booking to ${status}`);
    } finally {
      setProcessingItems((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  // Delete Booking
  const handleDeleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await deleteBooking(id);
      toast.success("Booking deleted successfully");
      fetchDashboardData();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete booking");
    }
  };

  // Create Service
  const handleCreateService = async (e) => {
    e.preventDefault();
    try {
      await createService(serviceForm);
      toast.success("Service added successfully");
      setShowServiceModal(false);
      setServiceForm({ title: "", desc: "", img: "" });
      fetchDashboardData();
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Failed to add service";
      toast.error(msg);
    }
  };

  // Delete Service
  const handleDeleteService = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await deleteService(id);
      toast.success("Service deleted");
      fetchDashboardData();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete service");
    }
  };

  // Create Blog
  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      await createBlog(blogForm);
      toast.success("Blog post published!");
      setShowBlogModal(false);
      setBlogForm({
        title: "",
        image: "",
        excerpt: "",
        content: "",
        category: "Planning Tips",
        readTime: "5 min read",
      });
      fetchDashboardData();
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Failed to publish blog";
      toast.error(msg);
    }
  };

  // Delete Blog
  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Delete this blog post?")) return;
    try {
      await deleteBlog(id);
      toast.success("Blog post deleted");
      fetchDashboardData();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete blog post");
    }
  };

  // Upload/Add Gallery Image
  const handleGallerySubmit = async (e) => {
    e.preventDefault();
    if (!galleryFile && !galleryUrl) {
      toast.warning("Please select a file or enter an image URL");
      return;
    }

    setUploadingGallery(true);
    try {
      if (galleryFile) {
        const formData = new FormData();
        formData.append("image", galleryFile);
        await uploadGalleryImage(formData);
      } else {
        await uploadGalleryImage({ image: galleryUrl });
      }

      toast.success("Image added to gallery!");
      setGalleryFile(null);
      setGalleryUrl("");
      // Reset file input
      const fileInput = document.getElementById("gallery-file-input");
      if (fileInput) fileInput.value = "";
      fetchDashboardData();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add image to gallery");
    } finally {
      setUploadingGallery(false);
    }
  };

  // Delete Gallery Image
  const handleDeleteGalleryImage = async (id) => {
    if (!window.confirm("Delete this photo from gallery?")) return;
    try {
      await deleteGalleryImage(id);
      toast.success("Photo deleted");
      fetchDashboardData();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete photo");
    }
  };

  // Chart setup
  const chartColors = [
    "#FF6B35",
    "#F7931E",
    "#EF4444",
    "#EC4899",
    "#8B5CF6",
    "#3B82F6",
    "#10B981",
    "#F59E0B",
  ];

  const chartData = {
    labels: Object.keys(stats.eventMap || {}),
    datasets: [
      {
        data: Object.values(stats.eventMap || {}),
        backgroundColor: chartColors.slice(0, Object.keys(stats.eventMap || {}).length),
        borderColor: "#fff",
        borderWidth: 3,
        hoverOffset: 15,
        hoverBorderWidth: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          font: { size: 13, weight: "600" },
          color: "#374151",
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
  };

  const getStatusBadge = (status) => {
    if (!status || status === "pending") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-yellow-100 text-yellow-700">
          Pending
        </span>
      );
    }
    if (status === "accepted") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-green-100 text-green-700">
          Accepted
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-red-100 text-red-700">
        Rejected
      </span>
    );
  };

  return (
    <div className="grid md:grid-cols-[260px_1fr] min-h-screen bg-luxury-cream/20 font-sans selection:bg-luxury-orange selection:text-white">
      <Adminsidebar />

      <main className="p-4 sm:p-6 lg:p-8 mt-14 md:mt-0 overflow-x-hidden">
        {/* Header banner */}
        <section className="relative bg-luxury-charcoal border border-luxury-gold/20 rounded-3xl py-12 mb-8 overflow-hidden shadow-luxury-shadow text-center text-white px-4">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-luxury-orange rounded-full blur-3xl animate-float-slow" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-luxury-gold rounded-full blur-3xl animate-float-fast" />
          </div>
          <div className="relative z-10">
            <div className="inline-block bg-white/5 backdrop-blur-md rounded-full px-5 py-1.5 mb-4 border border-luxury-gold/20">
              <span className="text-luxury-gold font-montserrat font-bold text-xs uppercase tracking-wider">
                👑 Elite Management Center
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-montserrat font-black mb-2 tracking-tight">
              MERN Admin Console
            </h2>
            <p className="text-base sm:text-lg text-gray-300 font-poppins font-light">
              Event Bookings, Contacts, and Content Management
            </p>
          </div>
        </section>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-16 h-16 border-4 border-luxury-cream border-t-luxury-orange rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Stats Summary Panel */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Bookings", val: stats.totalBookings, color: "text-luxury-orange", bg: "bg-white" },
                { label: "Contact Inquiries", val: stats.totalContacts, color: "text-luxury-charcoal", bg: "bg-white" },
                { label: "Services", val: stats.totalServices, color: "text-luxury-gold", bg: "bg-white" },
                { label: "Blog Articles", val: stats.totalBlogs, color: "text-luxury-orange-bright", bg: "bg-white" },
              ].map((s, idx) => (
                <div key={idx} className="p-6 rounded-2xl shadow-luxury-shadow border border-luxury-cream bg-white hover:scale-105 hover:border-luxury-orange/30 transition-all duration-300 cursor-pointer">
                  <p className="text-[10px] text-gray-400 font-montserrat font-bold uppercase tracking-wider">{s.label}</p>
                  <h3 className={`text-3xl font-montserrat font-black mt-2 ${s.color}`}>
                    <CountUp end={s.val} duration={1} />
                  </h3>
                </div>
              ))}
            </div>

            {/* Event distribution chart */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-luxury-shadow border border-luxury-cream">
                <h4 className="text-lg font-montserrat font-bold text-luxury-charcoal mb-4">Event Types Distribution</h4>
                <div className="h-[280px] flex items-center justify-center">
                  {Object.keys(stats.eventMap || {}).length > 0 ? (
                    <Doughnut data={chartData} options={chartOptions} />
                  ) : (
                    <p className="text-gray-400 text-sm font-poppins">No bookings data yet</p>
                  )}
                </div>
              </div>

              {/* Status breakdown card */}
              <div className="bg-white p-6 rounded-3xl shadow-luxury-shadow border border-luxury-cream flex flex-col justify-between">
                <h4 className="text-lg font-montserrat font-bold text-luxury-charcoal mb-4">Booking Status Breakdown</h4>
                <div className="space-y-4">
                  {[
                    { label: "Pending", count: stats.statusCounts.pending, color: "bg-yellow-500", text: "text-yellow-700 bg-yellow-50 border-yellow-100" },
                    { label: "Accepted", count: stats.statusCounts.accepted, color: "bg-green-500", text: "text-green-700 bg-green-50 border-green-100" },
                    { label: "Rejected", count: stats.statusCounts.rejected, color: "bg-red-500", text: "text-red-700 bg-red-50 border-red-100" },
                  ].map((st, i) => (
                    <div key={i} className={`flex justify-between items-center p-3 rounded-xl border ${st.text}`}>
                      <div className="flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${st.color}`} />
                        <span className="font-semibold font-poppins text-sm">{st.label}</span>
                      </div>
                      <span className="font-montserrat font-black text-sm">{st.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* TAB PANELS NAVIGATION */}
            <div className="flex flex-wrap gap-2 border-b border-luxury-cream pb-4 mb-6">
              {[
                { id: "bookings", label: "📅 Bookings" },
                { id: "contacts", label: "📬 Contacts" },
                { id: "services", label: "🎨 Services" },
                { id: "blogs", label: "✍️ Blogs" },
                { id: "gallery", label: "📸 Gallery" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-3 rounded-xl font-poppins font-bold text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-luxury-orange to-luxury-orange-bright text-white shadow-luxury-shadow"
                      : "bg-white text-gray-700 hover:bg-luxury-cream border border-luxury-cream"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB CONTENT */}

            {/* 1. BOOKINGS */}
            {activeTab === "bookings" && (
              <div className="bg-white rounded-3xl shadow-luxury-shadow border border-luxury-cream overflow-hidden p-6 animate-fade-in">
                <h4 className="text-xl font-montserrat font-black text-luxury-charcoal mb-6">Manage Bookings</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-luxury-cream text-left text-xs font-montserrat font-bold text-gray-400 uppercase tracking-wider">
                        <th className="py-3 px-4">Client</th>
                        <th className="py-3 px-4">Event & Theme</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Budget & Guests</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-luxury-cream/50">
                      {bookings.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="text-center py-10 text-gray-400 font-poppins">
                            No bookings found
                          </td>
                        </tr>
                      ) : (
                        bookings.map((b) => (
                          <tr key={b._id} className="hover:bg-luxury-cream/20 transition-colors">
                            <td className="py-4 px-4 font-poppins text-gray-800">
                              <div className="font-bold">{b.name}</div>
                              <div className="text-xs text-gray-500">{b.email}</div>
                              <div className="text-xs text-gray-500">{b.phone}</div>
                            </td>
                            <td className="py-4 px-4">
                              <span className="inline-block px-2.5 py-1 text-xs font-montserrat font-bold bg-luxury-cream text-luxury-orange border border-luxury-orange/20 rounded-full">
                                {b.eventType}
                              </span>
                              <div className="text-xs font-poppins text-gray-600 mt-1">{b.hallname || "No Theme"}</div>
                            </td>
                            <td className="py-4 px-4 font-poppins text-gray-600">
                              {new Date(b.date).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-4 font-poppins text-gray-600">
                              <div>Guests: {b.guests || "N/A"}</div>
                              <div className="text-xs font-bold text-luxury-orange">₹{b.budget || "N/A"}</div>
                            </td>
                            <td className="py-4 px-4">{getStatusBadge(b.status)}</td>
                            <td className="py-4 px-4">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleUpdateBookingStatus(b._id, "accepted")}
                                  disabled={b.status === "accepted"}
                                  className="px-3 py-1.5 rounded-lg text-xs font-montserrat font-bold bg-green-50 hover:bg-green-100 text-green-700 disabled:opacity-50 border border-green-200 transition-colors"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() => handleUpdateBookingStatus(b._id, "rejected")}
                                  disabled={b.status === "rejected"}
                                  className="px-3 py-1.5 rounded-lg text-xs font-montserrat font-bold bg-red-50 hover:bg-red-100 text-red-700 disabled:opacity-50 border border-red-200 transition-colors"
                                >
                                  Reject
                                </button>
                                <button
                                  onClick={() => handleDeleteBooking(b._id)}
                                  className="px-3 py-1.5 rounded-lg text-xs font-montserrat font-bold bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 transition-colors"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 2. CONTACTS */}
            {activeTab === "contacts" && (
              <div className="bg-white rounded-3xl shadow-luxury-shadow border border-luxury-cream overflow-hidden p-6 animate-fade-in">
                <h4 className="text-xl font-montserrat font-black text-luxury-charcoal mb-6">Contact Form Submissions</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-luxury-cream text-left text-xs font-montserrat font-bold text-gray-400 uppercase tracking-wider">
                        <th className="py-3 px-4">Sender</th>
                        <th className="py-3 px-4">Message</th>
                        <th className="py-3 px-4">Date Submitted</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-luxury-cream/50">
                      {contacts.length === 0 ? (
                        <tr>
                          <td colSpan="3" className="text-center py-10 text-gray-400 font-poppins">
                            No contact submissions found
                          </td>
                        </tr>
                      ) : (
                        contacts.map((c) => (
                          <tr key={c._id} className="hover:bg-luxury-cream/20 transition-colors">
                            <td className="py-4 px-4 font-poppins text-gray-800">
                              <div className="font-bold">{c.name}</div>
                              <div className="text-xs text-gray-500">{c.email}</div>
                              <div className="text-xs text-gray-500">{c.phone || "No Phone"}</div>
                            </td>
                            <td className="py-4 px-4 text-gray-600 font-poppins max-w-md break-words">
                              {c.message}
                            </td>
                            <td className="py-4 px-4 text-gray-500 font-poppins">
                              {new Date(c.createdAt).toLocaleString()}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. SERVICES */}
            {activeTab === "services" && (
              <div className="bg-white rounded-3xl shadow-luxury-shadow border border-luxury-cream p-6 animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-xl font-montserrat font-black text-luxury-charcoal">Manage Service Packages</h4>
                  <button
                    onClick={() => setShowServiceModal(true)}
                    className="bg-gradient-to-r from-luxury-orange to-luxury-orange-bright text-white font-montserrat font-bold px-5 py-2.5 rounded-xl text-sm shadow-luxury-shadow hover:scale-[1.02] transition-transform duration-300"
                  >
                    + Add Service
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.length === 0 ? (
                    <div className="col-span-3 text-center py-10 text-gray-400 font-poppins">
                      No services found. Add some above!
                    </div>
                  ) : (
                    services.map((s) => (
                      <div key={s._id} className="border border-luxury-cream bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-luxury-shadow hover:border-luxury-orange/20 transition-all duration-300">
                        <div className="zoom-container h-44 w-full">
                          <img
                            src={getImageUrl(s.img)}
                            alt={s.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h5 className="font-montserrat font-bold text-luxury-charcoal text-lg mb-2">{s.title}</h5>
                            <p className="text-sm text-gray-500 font-poppins line-clamp-3 mb-4">{s.desc}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteService(s._id)}
                            className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-montserrat font-bold py-2.5 rounded-xl text-xs border border-red-100 transition-colors"
                          >
                            Delete Service
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Service Modal */}
                {showServiceModal && (
                  <div className="fixed inset-0 bg-luxury-charcoal/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-luxury-shadow border border-luxury-cream animate-scale-up">
                      <h3 className="text-xl font-montserrat font-black text-luxury-charcoal mb-6">Add Event Category</h3>
                      <form onSubmit={handleCreateService} className="space-y-4">
                        <div>
                          <label className="block text-xs font-montserrat font-bold uppercase text-gray-500 mb-1 ml-1">Title</label>
                          <input
                            type="text"
                            required
                            placeholder="Grand Wedding"
                            value={serviceForm.title}
                            onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                            className="w-full border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-poppins bg-luxury-cream/20 focus:border-luxury-orange focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-montserrat font-bold uppercase text-gray-500 mb-1 ml-1">Description</label>
                          <textarea
                            required
                            placeholder="Brief details about the service"
                            value={serviceForm.desc}
                            onChange={(e) => setServiceForm({ ...serviceForm, desc: e.target.value })}
                            className="w-full border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-poppins bg-luxury-cream/20 focus:border-luxury-orange focus:outline-none"
                            rows="3"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-montserrat font-bold uppercase text-gray-500 mb-1 ml-1">Image URL</label>
                          <input
                            type="text"
                            placeholder="https://example.com/image.jpg"
                            value={serviceForm.img}
                            onChange={(e) => setServiceForm({ ...serviceForm, img: e.target.value })}
                            className="w-full border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-poppins bg-luxury-cream/20 focus:border-luxury-orange focus:outline-none"
                          />
                        </div>
                        <div className="flex gap-2 pt-4">
                          <button
                            type="button"
                            onClick={() => setShowServiceModal(false)}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-montserrat font-bold py-3 rounded-xl text-sm transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-luxury-orange to-luxury-orange-bright text-white font-montserrat font-bold py-3 rounded-xl text-sm transition-transform shadow-luxury-shadow"
                          >
                            Save
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 4. BLOGS */}
            {activeTab === "blogs" && (
              <div className="bg-white rounded-3xl shadow-luxury-shadow border border-luxury-cream p-6 animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-xl font-montserrat font-black text-luxury-charcoal">Manage Blog Articles</h4>
                  <button
                    onClick={() => setShowBlogModal(true)}
                    className="bg-gradient-to-r from-luxury-orange to-luxury-orange-bright text-white font-montserrat font-bold px-5 py-2.5 rounded-xl text-sm shadow-luxury-shadow hover:scale-[1.02] transition-transform duration-300"
                  >
                    + Add Blog
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {blogs.length === 0 ? (
                    <div className="col-span-2 text-center py-10 text-gray-400 font-poppins">
                      No blog posts found. Publish one above!
                    </div>
                  ) : (
                    blogs.map((b) => (
                      <div key={b._id} className="border border-luxury-cream bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-luxury-shadow hover:border-luxury-orange/20 transition-all duration-300">
                        <div className="zoom-container h-52 w-full">
                          <img
                            src={getImageUrl(b.image)}
                            alt={b.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="text-xs text-luxury-orange font-montserrat font-bold mb-1 uppercase tracking-wider">
                              {b.category} • {b.readTime}
                            </div>
                            <h5 className="font-montserrat font-bold text-luxury-charcoal text-lg mb-2">{b.title}</h5>
                            <p className="text-sm text-gray-500 font-poppins line-clamp-2 mb-4">{b.excerpt}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteBlog(b._id)}
                            className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-montserrat font-bold py-2.5 rounded-xl text-xs border border-red-100 transition-colors"
                          >
                            Delete Article
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Blog Modal */}
                {showBlogModal && (
                  <div className="fixed inset-0 bg-luxury-charcoal/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-luxury-shadow border border-luxury-cream overflow-y-auto max-h-[90vh] animate-scale-up">
                      <h3 className="text-xl font-montserrat font-black text-luxury-charcoal mb-6">Create New Blog Article</h3>
                      <form onSubmit={handleCreateBlog} className="space-y-4">
                        <div>
                          <label className="block text-xs font-montserrat font-bold uppercase text-gray-500 mb-1 ml-1">Title</label>
                          <input
                            type="text"
                            required
                            placeholder="Secrets to a Perfect Wedding"
                            value={blogForm.title}
                            onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                            className="w-full border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-poppins bg-luxury-cream/20 focus:border-luxury-orange focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-montserrat font-bold uppercase text-gray-500 mb-1 ml-1">Category</label>
                          <select
                            value={blogForm.category}
                            onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                            className="w-full border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-poppins bg-white cursor-pointer"
                          >
                            <option value="Planning Tips">Planning Tips</option>
                            <option value="Industry Insights">Industry Insights</option>
                            <option value="Trends">Trends</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-montserrat font-bold uppercase text-gray-500 mb-1 ml-1">Read Time</label>
                          <input
                            type="text"
                            placeholder="5 min read"
                            value={blogForm.readTime}
                            onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                            className="w-full border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-poppins bg-luxury-cream/20 focus:border-luxury-orange focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-montserrat font-bold uppercase text-gray-500 mb-1 ml-1">Image URL</label>
                          <input
                            type="text"
                            placeholder="https://example.com/banner.jpg"
                            value={blogForm.image}
                            onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                            className="w-full border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-poppins bg-luxury-cream/20 focus:border-luxury-orange focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-montserrat font-bold uppercase text-gray-500 mb-1 ml-1">Excerpt (Summary)</label>
                          <input
                            type="text"
                            required
                            placeholder="Brief description showing on listings page..."
                            value={blogForm.excerpt}
                            onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                            className="w-full border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-poppins bg-luxury-cream/20 focus:border-luxury-orange focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-montserrat font-bold uppercase text-gray-500 mb-1 ml-1">Article Content</label>
                          <textarea
                            required
                            placeholder="Write the full content of the blog post here..."
                            value={blogForm.content}
                            onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                            className="w-full border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-poppins bg-luxury-cream/20 focus:border-luxury-orange focus:outline-none"
                            rows="5"
                          />
                        </div>
                        <div className="flex gap-2 pt-4">
                          <button
                            type="button"
                            onClick={() => setShowBlogModal(false)}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-montserrat font-bold py-3 rounded-xl text-sm transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-luxury-orange to-luxury-orange-bright text-white font-montserrat font-bold py-3 rounded-xl text-sm transition-transform shadow-luxury-shadow"
                          >
                            Publish
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 5. GALLERY */}
            {activeTab === "gallery" && (
              <div className="bg-white rounded-3xl shadow-luxury-shadow border border-luxury-cream p-6 animate-fade-in">
                <h4 className="text-xl font-montserrat font-black text-luxury-charcoal mb-6">Manage Event Gallery</h4>

                {/* Add image form */}
                <form onSubmit={handleGallerySubmit} className="bg-luxury-cream/20 p-6 rounded-2xl border border-luxury-cream mb-8 max-w-xl">
                  <h5 className="font-montserrat font-bold text-luxury-charcoal mb-4 text-sm">Add New Photo</h5>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs text-gray-500 font-montserrat font-bold mb-2 ml-1">Option A: Upload File (Recommended)</label>
                      <input
                        id="gallery-file-input"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          setGalleryFile(e.target.files[0]);
                          setGalleryUrl("");
                        }}
                        className="w-full border border-gray-200 bg-white px-3 py-2 rounded-xl text-sm font-poppins focus:border-luxury-orange focus:outline-none"
                      />
                    </div>
                    <div className="text-center text-xs font-montserrat font-bold text-gray-400 my-2">--- OR ---</div>
                    <div>
                      <label className="block text-xs text-gray-500 font-montserrat font-bold mb-2 ml-1">Option B: Image Web URL</label>
                      <input
                        type="text"
                        placeholder="https://example.com/photo.jpg"
                        value={galleryUrl}
                        onChange={(e) => {
                          setGalleryUrl(e.target.value);
                          setGalleryFile(null);
                          // reset file input
                          const fileInput = document.getElementById("gallery-file-input");
                          if (fileInput) fileInput.value = "";
                        }}
                        className="w-full border border-gray-200 bg-white px-3 py-2.5 rounded-xl text-sm font-poppins focus:border-luxury-orange focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={uploadingGallery}
                      className="bg-gradient-to-r from-luxury-orange to-luxury-orange-bright text-white font-montserrat font-bold px-6 py-3 rounded-xl text-sm disabled:opacity-50 shadow-luxury-shadow hover:scale-[1.02] transition-transform duration-300"
                    >
                      {uploadingGallery ? "Adding Image..." : "Upload / Add Image"}
                    </button>
                  </div>
                </form>

                {/* Image grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {gallery.length === 0 ? (
                    <div className="col-span-4 text-center py-10 text-gray-400 font-poppins">
                      No gallery photos found.
                    </div>
                  ) : (
                    gallery.map((g) => (
                      <div key={g._id} className="relative group rounded-2xl overflow-hidden h-40 shadow-sm border border-luxury-cream">
                        <img
                          src={getImageUrl(g.image)}
                          alt="Gallery"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-luxury-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            onClick={() => handleDeleteGalleryImage(g._id)}
                            className="bg-red-600 hover:bg-red-700 text-white font-montserrat font-bold px-4 py-2 rounded-xl text-xs shadow-lg transition-colors border border-red-500"
                          >
                            Delete Photo
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;