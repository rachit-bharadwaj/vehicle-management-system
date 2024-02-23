import express from "express";
import {
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProductById);
router.post("/", addProduct);
router.put("/", updateProduct);
router.delete("/", deleteProduct);

export default router;
