import mongoose from "mongoose";

const waitlistCounterSchema = new mongoose.Schema({
  count: { type: Number, required: true, default: 0 },
});

const WaitlistCounter = mongoose.models.WaitlistCounter || mongoose.model("WaitlistCounter", waitlistCounterSchema);

export default WaitlistCounter;
