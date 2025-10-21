import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true, versionKey: false }
);

if (mongoose.models.Newsletter) {
  mongoose.deleteModel("Newsletter");
}
const Newsletter = mongoose.model("Newsletter", newsletterSchema);

export default Newsletter;
