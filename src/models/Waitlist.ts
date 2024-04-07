import mongoose from "mongoose";

const waitlistEntrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const WaitlistEntry = mongoose.models.WaitlistEntry || mongoose.model("WaitlistEntry", waitlistEntrySchema);

export default WaitlistEntry;