import express from "express";
import { authenticate } from "../middlewares/authMiddleware.js";
import {
  createSesionRutina,
  deleteSesionRutina,
  getSesionRutina,
  getSesionRutinas,
  updateSesionRutina,
} from "../controllers/sesionRutinaController.js";

const router = express.Router();

router.get("/rutina/:id", getSesionRutinas);
router.get("/:id", getSesionRutina);
router.post("/", createSesionRutina);
router.delete("/:id", deleteSesionRutina);
router.patch("/:id", updateSesionRutina);

export default router;
