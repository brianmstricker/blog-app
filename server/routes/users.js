import express from "express";
import User from "../models/User.js";
import { verifyAdmin, verifyToken, verifyUser } from "../verifyToken.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/search/:id", verifyToken, verifyUser, async (req, res, next) => {
  try {
    !mongoose.isValidObjectId(req.params.id) &&
      res.status(404).json("User not found.");
    const user = await User.findById(req.params.id);
    !user && res.status(404).json("User not found.");
    const { password, __v, createdAt, updatedAt, role, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    res.status(500);
    next(error);
  }
});
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    const newUsers = users.map((user) => {
      const {
        password,
        __v,
        createdAt,
        updatedAt,
        _id,
        email,
        role,
        name,
        ...rest
      } = user._doc;
      return rest;
    });
    res.status(200).json(newUsers);
  } catch (error) {
    res.status(500);
    next(error);
  }
});
router.put("/update/:id", verifyToken, verifyUser, async (req, res, next) => {
  try {
    const { name, username, email, image } = req.body;
    if (req.params.id === req.user.id) {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: { name, username, email, profilePic: image },
        },
        { new: true }
      );
      res.status(200).json({
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          username: updatedUser.username,
          email: updatedUser.email,
          role: updatedUser.role,
          profilePic: updatedUser.profilePic,
        },
      });
    } else {
      res.status(401).json("You can only update your account.");
    }
  } catch (error) {
    next(error);
  }
});
router.delete(
  "/delete/:id",
  verifyToken,
  verifyUser,
  async (req, res, next) => {
    try {
      if (req.params.id === req.user.id || req.user.role === "admin") {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie("access_token");
        res.status(200).json("User deleted successfully.");
      } else {
        res.status(401).json("You can only delete your account.");
      }
    } catch (error) {
      res.status(500);
      next(error);
    }
  }
);

export default router;
