import express from "express";
import Post from "../models/Post.js";
import { verifyToken } from "../verifyToken.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find().populate("author", "username");
    res.status(200).json(posts.reverse());
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
    res.status(200).json(post);
  } catch (error) {
    res.status(500);
    next(error);
  }
});

router.post("/create", verifyToken, async (req, res, next) => {
  try {
    const newPost = new Post({
      ...req.body,
      author: req.user.id,
    });
    if (!newPost.title || !newPost.content || !newPost.shortDescription) {
      return res.status(400).json({ msg: "Not all fields have been entered." });
    }
    if (!newPost.author) {
      return res.status(400).json({ msg: "Not authorized." });
    }
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500);
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

export default router;
