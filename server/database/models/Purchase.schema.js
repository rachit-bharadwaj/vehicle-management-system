import mongoose, { Schema } from "mongoose";

const PurchaseSchema = new Schema(
  {
    purchaseOrderNo: {
      type: String,
      required: true,
    },

    vendor: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
    },

    products: [
      {
        productList: [
          {
            product: {
              type: Schema.Types.ObjectId,
              ref: "Product",
            },
            quantity: {
              type: Number,
              required: true,
            },
          },
        ],
      },
    ],

    vehicle: {
      type: Schema.Types.ObjectId,
      ref: "Vehicle",
    },
  },
  { timestamps: true }
);

const Purchase =
  mongoose.models.Purchase ||
  mongoose.model("Purchase", PurchaseSchema, "purchases");
export default Purchase;
