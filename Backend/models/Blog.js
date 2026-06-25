import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
    },
    image: {
      type: String,
    },
    excerpt: {
      type: String,
    },
    content: {
      type: String,
    },
    date: {
      type: String,
    },
    readTime: {
      type: String,
    },
    category: {
      type: String,
    },
    path: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
