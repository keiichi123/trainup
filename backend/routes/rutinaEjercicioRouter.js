import express from "express";
import {
  createRutinaEjecicio,
  deleteRutinaEjercicio,
  getRutinaEjercicio,
  getRutinaEjercicios,
  updateRutinaEjercicio,
} from "../controllers/rutinaEjercicioController.js";

const router = express.Router();

router.get("/rutina/:id", getRutinaEjercicios);
router.get("/:id", getRutinaEjercicio);
router.post("/", createRutinaEjecicio);
router.delete("/:id", deleteRutinaEjercicio);
router.patch("/:id", updateRutinaEjercicio);

export default router;
