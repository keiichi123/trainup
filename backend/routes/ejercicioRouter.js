import express from "express";
import {
  createEjercicio,
  getEjercicio,
  getEjercicios,
  getEjercicioById,
} from "../controllers/ejercicioController.js";

const router = express.Router();

router.post("/", createEjercicio);
router.get("/nombre/:nombre", getEjercicio);
router.get("/", getEjercicios);
router.get("/:id", getEjercicioById);

export default router;
