import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    username: {
      type: String,
      unique: true,
      required: true,
      minLength: 3,
      maxLength: 40,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      minLength: 3,
      maxLength: 60,
    },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
    role: { type: String, default: "user" },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
