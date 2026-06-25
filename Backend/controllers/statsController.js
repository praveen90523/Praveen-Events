import Booking from "../models/Booking.js";
import Contact from "../models/Contact.js";
import Blog from "../models/Blog.js";
import Service from "../models/Service.js";

// @desc    Get dashboard metrics & statistics
// @route   GET /api/stats
// @access  Private (Admin)
export const getStats = async (req, res, next) => {
  try {
    const totalBookings = await Booking.countDocuments({});
    const totalContacts = await Contact.countDocuments({});
    const totalBlogs = await Blog.countDocuments({});
    const totalServices = await Service.countDocuments({});

    // Retrieve recent bookings and contact submissions
    const recentBookings = await Booking.find({})
      .sort({ createdAt: -1 })
      .limit(5);

    const recentContacts = await Contact.find({})
      .sort({ createdAt: -1 })
      .limit(5);

    // Aggregate counts by status
    const acceptedCount = await Booking.countDocuments({ status: "accepted" });
    const rejectedCount = await Booking.countDocuments({ status: "rejected" });
    const pendingCount = await Booking.countDocuments({
      $or: [{ status: "pending" }, { status: { $exists: false } }, { status: "" }],
    });

    // Aggregate counts by event type
    const bookings = await Booking.find({});
    const eventMap = {};
    bookings.forEach((b) => {
      if (b.eventType) {
        eventMap[b.eventType] = (eventMap[b.eventType] || 0) + 1;
      }
    });

    res.json({
      success: true,
      stats: {
        totalBookings,
        totalContacts,
        totalBlogs,
        totalServices,
        statusCounts: {
          accepted: acceptedCount,
          rejected: rejectedCount,
          pending: pendingCount,
        },
        eventMap,
      },
      recentActivity: {
        bookings: recentBookings,
        contacts: recentContacts,
      },
    });
  } catch (error) {
    next(error);
  }
};
