import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import favoriteRoutes from "./routes/favorites.js";
import cors from "cors";
import createHttpError, { isHttpError } from "http-errors";
import morgan from "morgan";

const app = express();
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
// app.use(
//   cors({
//     credentials: true,
//     origin: [
//       "https://blog-app-frontend-kz1l.onrender.com",
//       "http://localhost:5173",
//     ],
//   })
// );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
app.use("/api/comments", commentRoutes);
app.use("/api/favorites", favoriteRoutes);
app.listen(process.env.PORT, () => {
  connect();
  console.log(`Server running on port ${process.env.PORT}`);
});
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint Not Found"));
});
app.use((err, req, res, next) => {
  if (isHttpError(err)) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
