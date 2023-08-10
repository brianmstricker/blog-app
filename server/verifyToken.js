import jwt from "jsonwebtoken";
import User from "./models/User.js";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("You are not authenticated.");
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(verified.id).select("-password");
    next();
  } catch (error) {
    res.status(500);
    next(error);
  }
};

export const verifyUser = (req, res, next) => {
  if (req.user.id === req.params.id || req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json("You are not allowed to do that.");
  }
};

export const verifyAdmin = (req, res, next) => {
  if (req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json("You are not allowed to do that.");
  }
};
