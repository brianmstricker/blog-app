import express from "express";
import Post from "../models/Post.js";
import { verifyToken } from "../verifyToken.js";
import mongoose from "mongoose";
import sanitizeHtml from "sanitize-html";

const router = express.Router();

router.get("/search", async (req, res, next) => {
  const searchQuery = req.query.search;
  if (!searchQuery) {
    return res.status(400).json("No search query.");
  }
  try {
    const posts = await Post.find({
      $or: [
        { title: { $regex: searchQuery, $options: "i" } },
        { tags: { $regex: searchQuery, $options: "i" } },
      ],
    }).populate("author", "username");
    res.status(200).json(posts.reverse());
  } catch (error) {
    res.status(500);
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const page_size = 12;
    const page = req.query.page || 1;
    const total = await Post.countDocuments();
    const posts = await Post.find()
      .populate("author", "username")
      .limit(12)
      .skip(page_size * page - page_size)
      .sort({ createdAt: -1 });
    res.status(200).json({ totalPages: Math.ceil(total / page_size), posts });
  } catch (error) {
    res.status(500);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username"
    );
    if (!post) return res.status(400).json("Post not found.");
    res.status(200).json(post);
  } catch (error) {
    res.status(500);
    next(error);
  }
});

router.get("/user/:id", verifyToken, async (req, res, next) => {
  try {
    console.log(req.params.id);
    console.log(req.user._id.toString());
    if (
      req.user._id.toString() !== req.params.id &&
      req.user.role !== "admin"
    ) {
      return res.status(400).json("Not authorized.");
    }
    const posts = await Post.find({ author: req.params.id }).populate(
      "author",
      "username"
    );
    if (!posts) return res.status(400).json("No posts found.");
    res.status(200).json(posts);
  } catch (error) {
    res.status(500);
    next(error);
  }
});

router.post("/create", verifyToken, async (req, res, next) => {
  try {
    if (
      req.body.tags &&
      req.body.tags.length === 1 &&
      req.body.tags.includes(" ")
    ) {
      return res.status(400).json("Cannot send empty tags.");
    }
    if (req.body.tags && req.body.tags.length > 250)
      return res.status(400).json("Try condensing your tags.");
    const cleanTags = sanitizeHtml(req.body.tags, {
      allowedTags: [],
      allowedAttributes: {},
    });
    const splitTags = cleanTags.split(",").map((tag) => tag.trim());
    const cleanContent = sanitizeHtml(req.body.content);
    const cleanTitle = sanitizeHtml(req.body.title, {
      allowedTags: [],
      allowedAttributes: {},
    });
    const cleanShortDescription = sanitizeHtml(req.body.shortDescription, {
      allowedTags: [],
      allowedAttributes: {},
    });
    const newPost = new Post({
      ...req.body,
      title: cleanTitle,
      content: cleanContent,
      shortDescription: cleanShortDescription,
      author: req.user.id,
      tags: splitTags,
    });
    if (!newPost.title || !newPost.content || !newPost.shortDescription) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }
    if (!newPost.author) {
      return res.status(400).json({ msg: "Not authorized." });
    }
    if (newPost.tags.length > 10) {
      return res.status(400).json({ msg: "You can only add 10 tags." });
    }
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500);
    console.log(error);
    next(error);
  }
});

router.delete("/delete/:id", verifyToken, async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json("No post found with this id.");
    const id = req.user._id;
    if (!id) return res.status(400).json({ msg: "Not authorized." });
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(400).json("No post found with this id.");
    if (id.toString() !== post.author.toString() && req.user.role !== "admin") {
      return res.status(400).json({ msg: "Not authorized." });
    }
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("Post deleted.");
  } catch (error) {
    res.status(500);
    next(error);
  }
});

router.put("/update/:id", verifyToken, async (req, res, next) => {
  try {
    const { title, content, shortDescription, tags } = req.body;
    if (req.body.tags.length === 1 && req.body.tags.includes(" ")) {
      return res.status(400).json("Cannot send empty tags.");
    }
    if (req.body.tags.length > 250)
      return res.status(400).json("Try condensing your tags.");
    const splitTags = req.body.tags.split(",").map((tag) => tag.trim());
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json("No post found with this id.");
    }
    const id = req.user._id;
    if (!id) return res.status(400).json({ msg: "Not authorized." });
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(400).json("No post found with this id.");
    if (id.toString() !== post.author.toString() && req.user.role !== "admin") {
      return res.status(400).json("Not authorized.");
    }
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, shortDescription, tags: splitTags },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500);
    next(error);
  }
});

export default router;
