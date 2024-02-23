import express from "express";
import {
  getPurchaseById,
  addPurchase,
  updatePurchase,
  deletePurchase,
} from "../controllers/purchase.controller.js";

const router = express.Router();

router.get("/", getPurchaseById);
router.post("/", addPurchase);
router.put("/", updatePurchase);
router.delete("/", deletePurchase);

export default router;
