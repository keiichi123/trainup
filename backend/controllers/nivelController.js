import Nivel from "../models/nivelModel.js";

const createNivel = async (req, res) => {
  const { nombre, descripcion } = req.body;

  try {
    const nivel = await Nivel.create({ nombre, descripcion });
    return res.status(200).json(nivel);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getNivel = async (req, res) => {
  const { nombre } = req.params;

  try {
    const nivel = await Nivel.findOne({ nombre });

    if (!nivel) {
      return res.status(404).json({ error: "No existe ese nivel" });
    }

    return res.json({ _id: nivel._id, nombre: nivel.nombre });
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener el nivel" });
  }
};

export { createNivel, getNivel };
