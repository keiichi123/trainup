import mongoose from "mongoose";

const nivelSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },

  descripcion: {
    type: String,
    required: true,
  },
});

const Nivel = mongoose.model("Nivel", nivelSchema);

export default Nivel;
