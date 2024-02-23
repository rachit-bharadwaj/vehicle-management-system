import express from "express";
import {
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor,
} from "../controllers/vendor.controller.js";

const router = express.Router();

router.get("/", getVendorById);
router.post("/", createVendor);
router.put("/", updateVendor);
router.delete("/", deleteVendor);

export default router;
