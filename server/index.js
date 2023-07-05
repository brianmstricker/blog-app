import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";

const app = express();
app.use(express.json());
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
app.listen(process.env.PORT, () => {
  connect();
  console.log(`Server running on port ${process.env.PORT}`);
});
