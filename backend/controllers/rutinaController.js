import Rutina from "../models/rutinaModel.js";
import SesionRutina from "../models/sesionRutinaModel.js";
import mongoose from "mongoose";

const createRutina = async (req, res) => {
  const { id_usuario, nombre, intensidad, fecha_inicio, intervalo } = req.body;

  try {
    const rutina = await Rutina.create({
      id_usuario,
      nombre,
      intensidad,
      fecha_inicio,
      intervalo,
    });
    res.status(200).json(rutina);
  } catch (error) {
    console.error("Error al crear rutina:", error);
    res.status(400).json({ error: "No se pudo crear la rutina" });
  }
};

const getRutinas = async (req, res) => {
  const userid = req.user._id;

  const rutinas = await Rutina.find({ id_usuario: userid }).sort({
    createdAt: -1,
  });

  if (!rutinas) {
    return res
      .status(404)
      .json({ error: "No se encontraron rutinas para este usuario" });
  }
  if (rutinas) {
    return res.status(200).json(rutinas);
  }
};

const getRutina = async (req, res) => {
  const { id } = req.params;
  const rutina = await Rutina.findById(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No existe esa rutina" });
  }
  if (!rutina) {
    return res.status(404).json({ error: "No existe esa rutina" });
  }
  res.status(200).json(rutina);
};

const deleteRutina = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No existe esa rutina" });
  }
  const rutina = await Rutina.findOneAndDelete({ _id: id });
  await SesionRutina.deleteMany({ id_rutina: id });
  if (!rutina) {
    return res.status(404).json({ error: "No existe esa rutina" });
  }
  res.status(200).json(rutina);
};

const updateRutina = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No existe esa rutina" });
  }

  try {
    const rutina = await Rutina.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );

    if (!rutina) {
      return res.status(404).json({ error: "No existe esa rutina" });
    }

    res.status(200).json(rutina);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la rutina" });
  }
};

export { createRutina, getRutina, getRutinas, deleteRutina, updateRutina };
