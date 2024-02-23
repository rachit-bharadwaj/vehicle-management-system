import express from "express";
import { loginUser, registerUser } from "../controllers/auth.controller.js";

const router = express.Router();

// POST login
router.post("/login", loginUser);

// POST register
router.post("/register", registerUser);

export default router;
