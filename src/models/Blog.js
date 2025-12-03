import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
      default: "Anonymous",
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
