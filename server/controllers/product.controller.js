/**
 * Controller for handling product-related operations.
 * @module controllers/productController
 */

import Product from "../database/models/Product.schema.js";
import connectDB from "../database/connection/mongoose.js";

/**
 * Controller function to get a product by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
export const getProductById = async (req, res) => {
  const { id } = req.body;

  try {
    await connectDB();

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

/**
 * Controller function to add a new product.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
export const addProduct = async (req, res) => {
  const { name, description, price } = req.body;

  try {
    await connectDB();

    const newProduct = await Product.create({ name, description, price });
    res.status(201).json({ message: "Product added successfully", newProduct });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

/**
 * Controller function to update a product.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
export const updateProduct = async (req, res) => {
  const { id, name, description, price } = req.body;

  try {
    await connectDB();

    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ product, message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

/**
 * Controller function to delete a product.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
export const deleteProduct = async (req, res) => {
  const { id } = req.body;

  try {
    await connectDB();

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
