import mongoose from "mongoose";

const ejercicioSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },

  objetivo: {
    type: String,
    required: true,
  },

  tipo: {
    type: Boolean,
    required: true,
  },
});

const Ejercicio = mongoose.model("Ejercicio", ejercicioSchema);

export default Ejercicio;
