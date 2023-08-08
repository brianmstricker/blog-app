import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).send("Please fill out all the fields.");
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).send("User with this email already exists.");
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).send("User with this username already exists.");
    }
    if (password.length < 6)
      return res
        .status(400)
        .send("Password must be at least 6 characters long.");
    if (password.length > 40)
      return res
        .status(400)
        .send("Password must be at most 40 characters long.");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "15d",
      }
    );
    res.cookie("accessToken", token, {
      httpOnly: true,
      expires: token.expiresIn,
    });
    const {
      password: userpass,
      __v,
      createdAt,
      updatedAt,
      role,
      _id,
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
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "15d",
      }
    );
    res.cookie("accessToken", token, { httpOnly: true });
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500);
    next(error);
  }
});

export default router;
