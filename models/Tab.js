import mongoose from "mongoose";

const TabSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { collection: "tabs" }
);

const Tab = mongoose.models.Tab || mongoose.model("Tab", TabSchema);

export default Tab;
