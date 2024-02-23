import mongoose, { Schema } from "mongoose";

const VendorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Vendor =
  mongoose.models.Vendor || mongoose.model("Vendor", VendorSchema, "vendors");
export default Vendor;
