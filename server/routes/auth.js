import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sanitizeHtml from "sanitize-html";

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
    if (password.length < 6) {
      return res
        .status(400)
        .send("Password must be at least 6 characters long.");
    }
    if (password.length > 40) {
      return res
        .status(400)
        .send("Password must be at most 40 characters long.");
    }
    const cleanName = sanitizeHtml(name, {
      allowedTags: [],
      allowedAttributes: {},
    });
    const cleanUsername = sanitizeHtml(username, {
      allowedTags: [],
      allowedAttributes: {},
    });
    const cleanEmail = sanitizeHtml(email, {
      allowedTags: [],
      allowedAttributes: {},
    });
    const cleanPassword = sanitizeHtml(password, {
      allowedTags: [],
      allowedAttributes: {},
    });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(cleanPassword, salt);
    const newUser = new User({
      name: cleanName,
      username: cleanUsername,
      email: cleanEmail,
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
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24 * 15,
    });
    const {
      password: userpass,
      __v,
      createdAt,
      updatedAt,
      ...rest
    } = newUser._doc;
    res.status(200).json({ user: rest });
  } catch (error) {
    res.status(500);
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    !userDoc && res.status(400).json("Incorrect credentials.");
    const validPassword = await bcrypt.compare(password, userDoc.password);
    !validPassword && res.status(400).json("Incorrect credentials.");
    const token = jwt.sign(
      { id: userDoc._id, role: userDoc.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "15d",
      }
    );
    res.cookie("accessToken", token, {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24 * 15,
    });
    const {
      password: userpass,
      __v,
      createdAt,
      updatedAt,
      ...user
    } = userDoc._doc;
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500);
    next(error);
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json("Logged out successfully.");
});

export default router;
