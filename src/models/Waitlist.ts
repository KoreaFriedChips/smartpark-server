import mongoose from "mongoose";

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

const Waitlist = mongoose.model("Waitlist", waitlistSchema);

export default Waitlist;