import express from "express";
import Favorite from "../models/Favorite.js";
import Post from "../models/Post.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("", verifyToken, async (req, res, next) => {
  try {
    const newFavorite = await new Favorite({
      userId: req.body.userId,
      postId: req.body.postId,
    });
    if (!req.body.userId || !req.body.postId) {
      return res.status(400).json("Missing required fields");
    }
    const found = await Post.findById(req.body.postId);
    if (!found) {
      return res.status(400).json("Post not found");
    }
    if (req.user._id.toString() !== req.body.userId.toString()) {
      return res.status(400).json("Wrong account.");
    }
    const post = await Post.findById(req.body.postId);
    if (post.author.toString() === req.body.userId.toString()) {
      return res.status(400).json("You cannot favorite your own post");
    }
    if (
      await Favorite.findOne({
        userId: req.body.userId,
        postId: req.body.postId,
      })
    ) {
      return res.status(400).json("You already favorited this post");
    }
    const savedFavorite = await newFavorite.save();
    res.status(200).json(savedFavorite);
  } catch (error) {
    res.status(500);
    next(error);
  }
});

router.delete("/:id", verifyToken, async (req, res, next) => {
  try {
    const favoriteDoc = await Favorite.findById(req.params.id);
    if (!favoriteDoc) {
      return res.status(400).json("Favorite not found");
    }
    if (req.user._id.toString() !== favoriteDoc.userId.toString()) {
      return res.status(400).json("You can only delete your own favorites");
    }
    await Favorite.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Favorite deleted" });
  } catch (error) {
    res.status(500);
    next(error);
  }
});

router.delete("", verifyToken, async (req, res, next) => {
  try {
    if (req.user._id.toString() !== req.query.userId.toString()) {
      return res.status(400).json("You can only delete your own favorites");
    }
    await Favorite.deleteMany({ userId: req.query.userId });
    res.status(200).json("Favorites deleted");
  } catch (error) {
    res.status(500);
    next(error);
  }
});

router.get("/:userId", verifyToken, async (req, res, next) => {
  try {
    if (req.user._id.toString() !== req.params.userId.toString()) {
      return res.status(400).json("You can only get your own favorites");
    }
    const favorites = await Favorite.find({
      userId: req.params.userId,
    }).populate({
      path: "postId",
      populate: {
        path: "author",
        select: "username",
      },
    });
    if (!favorites || favorites.length === 0) {
      return res.status(200).json([]);
    }
    res.status(200).json(favorites.reverse());
  } catch (error) {
    res.status(500);
    next(error);
  }
});

router.get("/post/:postId", verifyToken, async (req, res, next) => {
  try {
    const favorite = await Favorite.find({
      postId: req.params.postId,
      userId: req.user._id,
    }).populate("postId");
    if (!favorite) {
      return res.status(400).json("Favorite not found");
    }
    if (favorite && favorite.length === 0) {
      return res.status(200).json(false);
    }
    res.status(200).json(favorite);
  } catch (error) {
    res.status(500);
    next(error);
  }
});

export default router;
