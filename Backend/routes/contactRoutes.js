import express from "express";
import { createContact, getContacts } from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", createContact);
router.get("/", protect, adminOnly, getContacts);

export default router;
