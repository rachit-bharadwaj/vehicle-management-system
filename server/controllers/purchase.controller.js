import Purchase from "../database/models/Purchase.schema.js";
import connectDB from "../database/connection/mongoose.js";

/**
 * Controller function to get a purchase by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
export const getPurchaseById = async (req, res) => {
  const { id } = req.body;

  try {
    await connectDB();
    const purchase = await Purchase.findById(id);
    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    res.status(200).json(purchase);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

/**
 * Controller function to add a new purchase.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
export const addPurchase = async (req, res) => {
  const { purchaseOrderNo, vendor, products, vehicle } = req.body;

  try {
    await connectDB();
    const newPurchase = await Purchase.create({
      purchaseOrderNo,
      vendor,
      products,
      vehicle,
    });
    res
      .status(201)
      .json({ newPurchase, message: "Purchase added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

/**
 * Controller function to update a purchase.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
export const updatePurchase = async (req, res) => {
  const { id, purchaseOrderNo, vendor, products, vehicle } = req.body;

  try {
    await connectDB();
    const purchase = await Purchase.findByIdAndUpdate(
      id,
      { purchaseOrderNo, vendor, products, vehicle },
      { new: true }
    );
    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    res
      .status(200)
      .json({ purchase, message: "Purchase updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

/**
 * Controller function to delete a purchase.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
export const deletePurchase = async (req, res) => {
  const { id } = req.body;

  try {
    await connectDB();
    const purchase = await Purchase.findByIdAndDelete(id);
    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    res.status(200).json({ message: "Purchase deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
