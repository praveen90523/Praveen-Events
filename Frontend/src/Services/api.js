import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

// Request Interceptor to add Authorization header
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth APIs
export const login = async (email, password) => {
  const response = await API.post("/auth/login", { email, password });
  return response.data;
};

export const register = async (name, email, password, role) => {
  const response = await API.post("/auth/register", {
    name,
    email,
    password,
    role,
  });
  return response.data;
};

export const logout = async () => {
  const response = await API.post("/auth/logout");
  return response.data;
};

// Booking APIs
export const createBooking = async (bookingData) => {
  const response = await API.post("/bookings", bookingData);
  return response.data;
};

export const getBookings = async () => {
  const response = await API.get("/bookings");
  return response.data;
};

export const getBookingById = async (id) => {
  const response = await API.get(`/bookings/${id}`);
  return response.data;
};

export const updateBookingStatus = async (id, status) => {
  const response = await API.put(`/bookings/${id}/status`, { status });
  return response.data;
};

export const deleteBooking = async (id) => {
  const response = await API.delete(`/bookings/${id}`);
  return response.data;
};

// Contact APIs
export const submitContact = async (contactData) => {
  const response = await API.post("/contact", contactData);
  return response.data;
};

export const getContacts = async () => {
  const response = await API.get("/contact");
  return response.data;
};

// Services APIs
export const getServices = async () => {
  const response = await API.get("/services");
  return response.data;
};

export const createService = async (serviceData) => {
  const response = await API.post("/services", serviceData);
  return response.data;
};

export const updateService = async (id, serviceData) => {
  const response = await API.put(`/services/${id}`, serviceData);
  return response.data;
};

export const deleteService = async (id) => {
  const response = await API.delete(`/services/${id}`);
  return response.data;
};

// Blog APIs
export const getBlogs = async () => {
  const response = await API.get("/blogs");
  return response.data;
};

export const createBlog = async (blogData) => {
  const response = await API.post("/blogs", blogData);
  return response.data;
};

export const updateBlog = async (id, blogData) => {
  const response = await API.put(`/blogs/${id}`, blogData);
  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await API.delete(`/blogs/${id}`);
  return response.data;
};

// Gallery APIs
export const getGallery = async () => {
  const response = await API.get("/gallery");
  return response.data;
};

export const uploadGalleryImage = async (formData) => {
  // formData because we can send file upload!
  const response = await API.post("/gallery", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteGalleryImage = async (id) => {
  const response = await API.delete(`/gallery/${id}`);
  return response.data;
};

// Stats API
export const getStats = async () => {
  const response = await API.get("/stats");
  return response.data;
};

export default API;
