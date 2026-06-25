import mongoose from "mongoose";

const offeringSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  img: { type: String },
  icon: { type: String },
});

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Service title is required"],
      unique: true,
    },
    img: {
      type: String,
    },
    desc: {
      type: String,
    },
    path: {
      type: String,
    },
    offerings: [offeringSchema],
  },
  {
    timestamps: true,
  }
);

const Service = mongoose.model("Service", serviceSchema);
export default Service;
