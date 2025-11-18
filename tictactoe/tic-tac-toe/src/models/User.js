import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  score: { type: Number, default: 0 },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
