import mongoose, { Schema } from "mongoose";

const VehicleSchema = new Schema(
  {
    deliveryChallanNo: {
      type: String,
      required: true,
      unique: true,
    },

    vehiclePhoto: {
      type: String,
      required: true,
    },

    vehicleNo: {
      type: String,
      required: true,
      unique: true,
    },

    checkedOut: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true }
);

export default mongoose.models.Vehicle ||
  mongoose.model("Vehicle", VehicleSchema, "vehicles");
