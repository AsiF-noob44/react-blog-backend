import express from "express";
import Blog from "./../models/Blog.js";
const router = express.Router();

// Create Blog
router.post("/", async (req, res) => {
  try {
    const { author, title, content } = req.body;
    const newBlog = new Blog({ author, title, content });
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to create blog" });
  }
});

// Get All Blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ message: "Blogs fetched successfully", blogs });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// Get Blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid blog ID" });
    }
    res.status(500).json({ error: "Failed to fetch blog" });
  }
});

// Update Blog by ID
router.put("/:id", async (req, res) => {
  try {
    const { author, title, content } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { author, title, content },
      { new: true, runValidators: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(updatedBlog);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid blog ID" });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to update blog" });
  }
});

// Delete Blog by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid blog ID" });
    }
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

export default router;
