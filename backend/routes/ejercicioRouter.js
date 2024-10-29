import express from "express";
import {
  createEjercicio,
  getEjercicio,
  getEjercicios,
  getEjercicioById,
  getEjerciciosbyObjetivo,
} from "../controllers/ejercicioController.js";

const router = express.Router();

router.post("/", createEjercicio);
router.get("/nombre/:nombre", getEjercicio);
router.get("/", getEjercicios);
router.get("/id/:id", getEjercicioById);
router.get("/objetivo/:objetivo", getEjerciciosbyObjetivo);

export default router;
