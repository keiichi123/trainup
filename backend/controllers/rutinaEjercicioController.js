import RutinaEjercicio from "../models/rutinaEjercicioModel.js";
import mongoose from "mongoose";
import Ejercicio from "../models/ejercicioModel.js";

const createRutinaEjecicio = async (req, res) => {
  const { id_rutina, nombre, tiempo, repeticiones } = req.body;
  console.log(id_rutina, nombre, tiempo, repeticiones);

  try {
    const ejercicio = await Ejercicio.findOne({ nombre });
    console.log(ejercicio);
    if (!ejercicio) {
      return res.status(404).json({ error: "Ejercicio no encontrado" });
    }

    if (ejercicio.tipo === true && !tiempo) {
      return res
        .status(400)
        .json({ error: "El campo 'tiempo' es requerido para este ejercicio." });
    }

    if (ejercicio.tipo === false && !repeticiones) {
      return res.status(400).json({
        error: "El campo 'repeticiones' es requerido para este ejercicio.",
      });
    }

    // Crear el registro en RutinaEjercicio utilizando el id del ejercicio encontrado
    const rutinaejercicio = await RutinaEjercicio.create({
      id_rutina,
      id_ejercicio: ejercicio._id,
      tiempo: ejercicio.tipo ? tiempo : null,
      repeticiones: ejercicio.tipo ? null : repeticiones,
    });

    res.status(200).json(rutinaejercicio);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRutinaEjercicios = async (req, res) => {
  try {
    const { id } = req.params;
    const rutinaejercicios = await RutinaEjercicio.find({ id_rutina: id }).sort(
      {
        createdAt: -1,
      }
    );

    if (!rutinaejercicios) {
      return res
        .status(404)
        .json({ error: "No se encontraron ejercicios para esta rutina" });
    }

    res.status(200).json(rutinaejercicios);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error al obtener las sesiones de la rutina" });
  }
};

const getRutinaEjercicio = async (req, res) => {
  const { id } = req.params;
  const rutinaejercicio = await RutinaEjercicio.findById(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No existe esa rutina" });
  }
  if (!rutinaejercicio) {
    return res.status(404).json({ error: "No existe esa rutina" });
  }
  res.status(200).json(rutinaejercicio);
};

const deleteRutinaEjercicio = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No existe esa rutina" });
  }
  const rutinaejercicio = await RutinaEjercicio.findOneAndDelete({ _id: id });
  if (!rutinaejercicio) {
    return res.status(404).json({ error: "No existe esa rutina" });
  }
  res.status(200).json(rutinaejercicio);
};

const updateRutinaEjercicio = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No existe esa rutina" });
  }
  const rutinaejercicio = await RutinaEjercicio.findOneAndUpdate(
    { _id: id },
    ...req.body
  );
  if (!rutinaejercicio) {
    return res.status(404).json({ error: "No existe esa rutina" });
  }
  res.status(200).json(rutinaejercicio);
};

export {
  createRutinaEjecicio,
  getRutinaEjercicio,
  getRutinaEjercicios,
  deleteRutinaEjercicio,
  updateRutinaEjercicio,
};
