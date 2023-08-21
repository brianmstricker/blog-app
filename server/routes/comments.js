import express from "express";
import Comment from "../models/Comment.js";
import { verifyToken } from "../verifyToken.js";
import mongoose from "mongoose";
import sanitizeHtml from "sanitize-html";

const router = express.Router();

router.post("", verifyToken, async (req, res, next) => {
  try {
    const newComment = new Comment({
      postId: req.body.postId,
      userId: req.body.userId,
      content: sanitizeHtml(req.body.content),
    });
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    res.status(500);
    next(error);
  }
});

router.post("/reply", verifyToken, async (req, res, next) => {
  try {
    const newReply = {
      userId: req.body.userId,
      content: sanitizeHtml(req.body.content),
    };
    const updatedComment = await Comment.findByIdAndUpdate(
      req.body.commentId,
      {
        $push: { replies: newReply },
      },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500);
    next(error);
  }
});

router.post("/like", verifyToken, async (req, res, next) => {
  try {
    const like = await Comment.findByIdAndUpdate(
      req.body.commentId,
      {
        $push: { likes: req.body.userId },
      },
      { new: true }
    );
    res.status(200).json(like);
  } catch (error) {
    res.status(500);
    next(error);
  }
});

router.post("/reply/like", verifyToken, async (req, res, next) => {
  try {
    const like = await Comment.findOneAndUpdate(
      { _id: req.body.commentId, "replies._id": req.body.replyId },
      {
        $push: { "replies.$.likes": req.body.userId },
      },
      { new: true }
    );
    res.status(200).json(like);
  } catch (error) {
    res.status(500);
    next(error);
  }
});

router.delete("/delete/:id", verifyToken, async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(400).json("No comment found with this id.");
    if (
      req.user.role !== "admin" &&
      req.user._id.toString() !== comment.userId.toString()
    ) {
      return res.status(400).json({ msg: "Not authorized." });
    }
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json("Comment deleted.");
  } catch (error) {
    res.status(500);
    next(error);
  }
});

router.delete("/reply/delete/:id", verifyToken, async (req, res, next) => {
  try {
    const comment = await Comment.findOne({ "replies._id": req.params.id });
    if (!comment) return res.status(400).json("No comment found with this id.");
    if (
      req.user.role !== "admin" &&
      req.user._id.toString() !== comment.userId.toString()
    ) {
      return res.status(400).json({ msg: "Not authorized." });
    }
    await Comment.findOneAndUpdate(
      { "replies._id": req.params.id },
      {
        $pull: { replies: { _id: req.params.id } },
      }
    );
    res.status(200).json("Reply deleted.");
  } catch (error) {
    res.status(500);
    next(error);
  }
});

router.put("/update/:id", verifyToken, async (req, res, next) => {
  try {
    const { content } = req.body;
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json("No comment found with this id.");
    }
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(400).json("No comment found with this id.");
    if (
      req.user.role !== "admin" &&
      req.user._id.toString() !== comment.userId.toString()
    ) {
      return res.status(400).json("Not authorized.");
    }
    await Comment.findByIdAndUpdate(req.params.id, {
      content: sanitizeHtml(content),
    });
    res.status(200).json("Comment updated.");
  } catch (error) {
    res.status(500);
    next(error);
  }
});

router.put("/reply/update/:id", verifyToken, async (req, res, next) => {
  try {
    const { content } = req.body;
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json("No reply found with this id.");
    }
    const comment = await Comment.findOne({ "replies._id": req.params.id });
    if (!comment) return res.status(400).json("No reply found with this id.");
    if (
      req.user.role !== "admin" &&
      req.user._id.toString() !== comment.userId.toString()
    ) {
      return res.status(400).json("Not authorized.");
    }
    await Comment.findOneAndUpdate(
      { "replies._id": req.params.id },
      {
        $set: { "replies.$.content": sanitizeHtml(content) },
      }
    );
    res.status(200).json("Reply updated.");
  } catch (error) {
    res.status(500);
    next(error);
  }
});

export default router;
