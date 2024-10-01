import express from "express";
import { getNivel, createNivel } from "../controllers/nivelController.js";

const router = express.Router();

router.post("/", createNivel);
router.get("/:nombre", getNivel);

export default router;
