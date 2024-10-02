import mongoose from "mongoose";

const ejercicioSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },

  descripcion: {
    type: String,
    required: true,
  },
});

const Ejercicio = mongoose.model("Ejercicio", ejercicioSchema);

export default Ejercicio;
