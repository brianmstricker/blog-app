import express from "express";
import User from "../models/User.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.get("/search/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, __v, createdAt, updatedAt, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    res.status(500);
    next(error);
  }
});
router.get("/search", async (req, res, next) => {
  try {
    const users = await User.find();
    const newUsers = users.map((user) => {
      const { password, __v, createdAt, updatedAt, ...rest } = user._doc;
      return rest;
    });
    res.status(200).json(newUsers);
  } catch (error) {
    res.status(500);
    next(error);
  }
});
router.put("/update/:id", verifyToken, async (req, res, next) => {
  try {
    if (req.params.id === req.user.id) {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } else {
      res.status(401).json("You can only update your account.");
    }
  } catch (error) {
    res.status(500);
    next(error);
  }
});
router.delete("/delete/:id", verifyToken, async (req, res, next) => {
  try {
    if (req.params.id === req.user.id) {
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
});

export default router;
