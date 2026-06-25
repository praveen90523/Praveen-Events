import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Full name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    eventType: {
      type: String,
      required: [true, "Event type is required"],
    },
    location: {
      type: String,
      required: [true, "Event location is required"],
    },
    hallname: {
      type: String,
    },
    guests: {
      type: String,
    },
    budget: {
      type: String,
    },
    date: {
      type: Date,
      required: [true, "Event date is required"],
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
