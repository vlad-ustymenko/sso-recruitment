import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    login: { type: String, required: true },
    password: { type: String, required: true },
  },
  { collection: "user" }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
