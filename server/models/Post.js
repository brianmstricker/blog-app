import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    title: { type: String, required: true, minLength: 1, maxLength: 50 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    shortDescription: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 150,
    },
    image: { type: String, required: false },
    tags: [{ type: String, required: false }],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
export default Post;
