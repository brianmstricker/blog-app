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
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(morgan("dev"));
app.use(cookieParser());

// app.use(cors({ origin: true, credentials: true }));
// app.use(cors({origin: "*.brianstricker.com"}, credentials: true))
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:5173"],
    })
  );
}
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
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "./dist")));
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
