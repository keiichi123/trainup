import Ejercicio from "../models/ejercicioModel.js";
import mongoose from "mongoose";

const createEjercicio = async (req, res) => {
  const { nombre, objetivo, tipo } = req.body;

  try {
    const ejercicio = await Ejercicio.create({ nombre, objetivo, tipo });
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

const getEjerciciosbyObjetivo = async (req, res) => {
  const { objetivo } = req.params;
  try {
    const ejercicios = await Ejercicio.find({ objetivo });
    return res.status(200).json(ejercicios);
  } catch (error) {
    console.error("Error fetching ejercicios by objetivo:", error);
    return res.status(500).json({ error: "Error al obtener ejercicios" });
  }
};

const getEjercicioById = async (req, res) => {
  const { id } = req.params;

  try {
    // Primero validamos que el id sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No existe ese ejercicio" });
    }

    // Luego buscamos el ejercicio por el _id
    const ejercicio = await Ejercicio.findById(id);

    if (!ejercicio) {
      return res.status(404).json({ error: "No existe ese ejercicio" });
    }

    return res.json({ ejercicio });
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener el ejercicio" });
  }
};

const updateEjercicio = async (req, res) => {
  const { id } = req.params; // ID del ejercicio
  const { nombre, objetivo, tipo, link } = req.body; // Datos a actualizar

  try {
    // Validar si existe el ejercicio
    const ejercicio = await Ejercicio.findById(id);
    if (!ejercicio) {
      return res.status(404).json({ error: "Ejercicio no encontrado" });
    }

    // Actualizar el ejercicio
    const updatedEjercicio = await Ejercicio.findByIdAndUpdate(
      id,
      {
        ...(nombre && { nombre }),
        ...(objetivo && { objetivo }),
        ...(tipo !== undefined && { tipo }),
        ...(link && { link }),
      },
      { new: true }
    );

    res.status(200).json(updatedEjercicio);
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar el ejercicio",
      details: error.message,
    });
  }
};

export {
  createEjercicio,
  getEjercicio,
  getEjercicios,
  getEjercicioById,
  getEjerciciosbyObjetivo,
  updateEjercicio,
};
