import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";

const waitlistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    use: { type: String },
    place: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Waitlist = mongoose.models.Waitlist || mongoose.model("Waitlist", waitlistSchema);

export default Waitlist;