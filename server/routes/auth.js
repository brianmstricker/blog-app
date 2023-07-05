import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("access_token", token, { httpOnly: true });
    const {
      password: userpass,
      __v,
      createdAt,
      updatedAt,
      ...rest
    } = newUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    res.status(500);
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    !user && res.status(400).json("Incorrect credentials.");
    const validPassword = await bcrypt.compare(password, user.password);
    !validPassword && res.status(400).json("Incorrect credentials.");
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("access_token", token, { httpOnly: true });
    res.status(200).json({ message: "Login successful." });
  } catch (error) {
    res.status(500);
    next(error);
  }
});

export default router;
