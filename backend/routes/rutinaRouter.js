import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import {
  createRutina,
  deleteRutina,
  getRutina,
  getRutinas,
  updateRutina,
} from "../controllers/rutinaController.js";

const router = express.Router();

router.get("/", authenticate, getRutinas);
router.get("/:id", getRutina);
router.post("/", createRutina);
router.delete("/:id", deleteRutina);
router.patch("/:id", updateRutina);

export default router;
