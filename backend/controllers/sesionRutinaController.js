import SesionRutina from "../models/sesionRutinaModel.js";
import mongoose from "mongoose";

const createSesionRutina = async (req, res) => {
  const { id_rutina, sesion_calorias, sesion_tiempo } = req.body;
  try {
    const sesionrutina = await SesionRutina.create({
      id_rutina,
      sesion_calorias,
      sesion_tiempo,
    });
    res.status(200).json(sesionrutina);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getSesionRutinas = async (req, res) => {
  try {
    const { rutinaid } = req.params;

    const sesionrutinas = await SesionRutina.find({ rutinaid }).sort({
      createdAt: -1,
    });

    if (!sesionrutinas) {
      return res
        .status(404)
        .json({ error: "No se encontraron sesiones para esta rutina" });
    }

    res.status(200).json(sesionrutinas);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error al obtener las sesiones de la rutina" });
  }
};

const getSesionRutina = async (req, res) => {
  const { id } = req.params;
  const sesionrutina = await SesionRutina.findById(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No existe esa rutina" });
  }
  if (!sesionrutina) {
    return res.status(404).json({ error: "No existe esa rutina" });
  }
  res.status(200).json(sesionrutina);
};

const deleteSesionRutina = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No existe esa rutina" });
  }
  const sesionrutina = await SesionRutina.findOneAndDelete({ _id: id });
  if (!sesionrutina) {
    return res.status(404).json({ error: "No existe esa rutina" });
  }
  res.status(200).json(sesionrutina);
};

const updateSesionRutina = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No existe esa rutina" });
  }
  const sesionrutina = await SesionRutina.findOneAndUpdate(
    { _id: id },
    ...req.body
  );
  if (!sesionrutina) {
    return res.status(404).json({ error: "No existe esa rutina" });
  }
  res.status(200).json(sesionrutina);
};

export {
  createSesionRutina,
  getSesionRutina,
  getSesionRutinas,
  deleteSesionRutina,
  updateSesionRutina,
};
