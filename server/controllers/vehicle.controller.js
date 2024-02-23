/**
 * Controller for handling vehicle-related operations.
 * @module controllers/vehicleController
 */

import Vehicle from "../database/models/Vehicle.schema.js";
import connectDB from "../database/connection/mongoose.js";

/**
 * Controller function to get all vehicles.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
export const getAllVehicles = async (req, res) => {
  try {
    await connectDB();

    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

/**
 * Controller function to get a vehicle by ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
export const getVehicleById = async (req, res) => {
  const { id } = req.params;

  try {
    await connectDB();

    const vehicle = await Vehicle.findById(id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

/**
 * Controller function to add a new vehicle.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
export const addVehicle = async (req, res) => {
  const { deliveryChallanNo, vehiclePhoto, vehicleNo } = req.body;

  try {
    await connectDB();

    const newVehicle = await Vehicle.create({
      deliveryChallanNo,
      vehiclePhoto,
      vehicleNo,
    });
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

/**
 * Controller function to update a vehicle.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
export const updateVehicle = async (req, res) => {
  const { id, deliveryChallanNo, vehiclePhoto, vehicleNo, checkedOut } =
    req.body;

  try {
    await connectDB();

    const vehicle = await Vehicle.findByIdAndUpdate(
      id,
      { deliveryChallanNo, vehiclePhoto, vehicleNo, checkedOut },
      { new: true }
    );
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

/**
 * Controller function to delete a vehicle.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
export const deleteVehicle = async (req, res) => {
  const { id } = req.body;

  try {
    await connectDB();

    const vehicle = await Vehicle.findByIdAndDelete(id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

/**
 * Controller function to mark a vehicle as checked out.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 */
export const markVehicleCheckedOut = async (req, res) => {
  const { id } = req.body;

  try {
    await connectDB();

    const vehicle = await Vehicle.findByIdAndUpdate(
      id,
      { checkedOut: true },
      { new: true }
    );
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res
      .status(200)
      .json({ message: "Vehicle checked out successfully", vehicle });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
