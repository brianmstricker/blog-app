import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.listen(process.env.PORT, () => {
  connect();
  console.log(`Server running on port ${process.env.PORT}`);
});
