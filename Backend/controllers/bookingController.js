import Booking from "../models/Booking.js";
import sendEmail from "../utils/sendEmail.js";

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public (or Protected)
export const createBooking = async (req, res, next) => {
  const {
    name,
    email,
    phone,
    eventType,
    location,
    hallname,
    guests,
    budget,
    date,
    message,
  } = req.body;

  try {
    const booking = await Booking.create({
      name,
      email,
      phone: phone || "N/A", // Ensure phone is stored
      eventType,
      location,
      hallname,
      guests,
      budget,
      date,
      message,
    });

    // Send confirmation email to client
    try {
      await sendEmail({
        email: booking.email,
        subject: "Praveen Events - Booking Submitted Successfully!",
        message: `Dear ${booking.name},\n\nThank you for booking with Praveen Events. We have received your booking request for a ${booking.eventType} on ${new Date(booking.date).toLocaleDateString()}.\n\nWe will review your request and get back to you shortly.\n\nBest regards,\nPraveen Events Team`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #FF4500;">Praveen Events Booking Confirmation</h2>
            <p>Dear <strong>${booking.name}</strong>,</p>
            <p>Thank you for choosing Praveen Events. Your booking request has been submitted successfully!</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr style="background-color: #f8f8f8;"><td style="padding: 8px; border: 1px solid #ddd;"><strong>Event Type</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${booking.eventType}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Date</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${new Date(booking.date).toLocaleDateString()}</td></tr>
              <tr style="background-color: #f8f8f8;"><td style="padding: 8px; border: 1px solid #ddd;"><strong>Location</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${booking.location}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Theme/Hall Name</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${booking.hallname || "N/A"}</td></tr>
              <tr style="background-color: #f8f8f8;"><td style="padding: 8px; border: 1px solid #ddd;"><strong>Budget Range</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${booking.budget || "N/A"}</td></tr>
            </table>
            <p style="margin-top: 20px;">We will review your details and contact you shortly with more information.</p>
            <br>
            <p>Warm regards,<br><strong>Praveen Events Team</strong></p>
          </div>
        `,
      });
    } catch (mailError) {
      console.error("Error sending booking confirmation email:", mailError.message);
    }

    res.status(201).json({
      success: true,
      booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private (Admin)
export const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
export const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      res.status(404);
      return next(new Error("Booking not found"));
    }

    res.json({
      success: true,
      booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking status (Accept/Reject)
// @route   PUT /api/bookings/:id/status
// @access  Private (Admin)
export const updateBookingStatus = async (req, res, next) => {
  const { status } = req.body;

  if (!["accepted", "rejected", "pending"].includes(status)) {
    res.status(400);
    return next(new Error("Invalid status value"));
  }

  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      res.status(404);
      return next(new Error("Booking not found"));
    }

    booking.status = status;
    await booking.save();

    // Send email notification of status update
    try {
      await sendEmail({
        email: booking.email,
        subject: `Praveen Events - Booking Request ${status.charAt(0).toUpperCase() + status.slice(1)}`,
        message: `Dear ${booking.name},\n\nYour booking request for a ${booking.eventType} on ${new Date(booking.date).toLocaleDateString()} has been ${status}.\n\nBest regards,\nPraveen Events Team`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2 style="color: ${status === "accepted" ? "#2e7d32" : "#c62828"};">
              Booking Request ${status.charAt(0).toUpperCase() + status.slice(1)}
            </h2>
            <p>Dear <strong>${booking.name}</strong>,</p>
            <p>Your booking request for a <strong>${booking.eventType}</strong> on <strong>${new Date(booking.date).toLocaleDateString()}</strong> has been <strong>${status}</strong> by our planning team.</p>
            ${
              status === "accepted"
                ? "<p>We will contact you shortly to discuss details, coordination, and next steps.</p>"
                : "<p>We apologize that we are unable to fulfill your booking at this time. Feel free to submit another request for different dates or locations.</p>"
            }
            <br>
            <p>Warm regards,<br><strong>Praveen Events Team</strong></p>
          </div>
        `,
      });
    } catch (mailError) {
      console.error("Error sending booking status update email:", mailError.message);
    }

    res.json({
      success: true,
      booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
// @access  Private (Admin)
export const deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      res.status(404);
      return next(new Error("Booking not found"));
    }

    await booking.deleteOne();
    res.json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
