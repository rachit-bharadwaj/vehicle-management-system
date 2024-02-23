import express from "express";
import {
  getAllVehicles,
  getVehicleById,
  addVehicle,
  updateVehicle,
  deleteVehicle,
  markVehicleCheckedOut,
} from "../controllers/vehicle.controller.js";

const router = express.Router();

router.get("/", getAllVehicles);
router.get("/:id", getVehicleById);
router.post("/", addVehicle);
router.put("/", updateVehicle);
router.put("/checkout", markVehicleCheckedOut);
router.delete("/", deleteVehicle);

export default router;
