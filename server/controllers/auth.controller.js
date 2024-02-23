/**
 * Controller for handling authentication-related operations.
 * @module controllers/authController
 */

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../database/models/User.schema.js";
import connectDB from "../database/connection/mongoose.js";

/**
 * Controller function for user login.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    await connectDB();

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "Login Successful", token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

/**
 * Controller function for user registration.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists, try to login instead." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ user: newUser, message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
