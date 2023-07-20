import express from "express";
import Post from "../models/Post.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts.reverse());
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

export default router;
