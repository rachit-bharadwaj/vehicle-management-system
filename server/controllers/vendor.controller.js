/**
 * Controller for handling vendor-related operations.
 * @module controllers/vendorController
 */

import Vendor from "../database/models/Vendor.schema.js";
import connectDB from "../database/connection/mongoose.js";

/**
 * Controller function to get a vendor by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
export const getVendorById = async (req, res) => {
  const { id } = req.body;

  try {
    await connectDB();

    const vendor = await Vendor.findById(id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

/**
 * Controller function to create a new vendor.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
export const createVendor = async (req, res) => {
  const { name, company } = req.body;

  try {
    await connectDB();

    const newVendor = await Vendor.create({ name, company });
    res.status(201).json({ newVendor, message: "Vendor added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

/**
 * Controller function to update a vendor.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
export const updateVendor = async (req, res) => {
  const { id, name, company } = req.body;

  try {
    await connectDB();

    const vendor = await Vendor.findByIdAndUpdate(
      id,
      { name, company },
      { new: true }
    );
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

/**
 * Controller function to delete a vendor.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
export const deleteVendor = async (req, res) => {
  const { id } = req.body;

  try {
    await connectDB();

    const vendor = await Vendor.findByIdAndDelete(id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
