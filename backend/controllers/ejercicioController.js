import Ejercicio from "../models/ejercicioModel.js";
import mongoose from "mongoose";

const createEjercicio = async (req, res) => {
  const { nombre, descripcion } = req.body;

  try {
    const ejercicio = await Ejercicio.create({ nombre, descripcion });
    return res.status(200).json(ejercicio);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getEjercicio = async (req, res) => {
  const { nombre } = req.params;

  try {
    const ejercicio = await Ejercicio.findOne({ nombre });

    if (!ejercicio) {
      return res.status(404).json({ error: "No existe ese ejercicio" });
    }
    console.log("id backend: ", ejercicio);
    return res.status(200).json({ ejercicio });
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener el ejercicio" });
  }
};

const getEjercicios = async (req, res) => {
  const ejercicios = await Ejercicio.find({});
  return res.status(200).json(ejercicios);
};

const getEjercicioById = async (req, res) => {
  const { id } = req.params;

  try {
    const ejercicio = await Ejercicio.findById(id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No existe ese ejercicio" });
    }
    if (!ejercicio) {
      return res.status(404).json({ error: "No existe ese ejercicio" });
    }

    return res.json({ ejercicio });
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener el ejercicio" });
  }
};

export { createEjercicio, getEjercicio, getEjercicios, getEjercicioById };
