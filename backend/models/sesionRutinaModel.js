import mongoose from "mongoose";

const sesionRutinaSchema = mongoose.Schema(
  {
    id_rutina: {
      type: String,
      required: true,
    },

    sesion_calorias: {
      type: Number,
      required: true,
    },

    sesion_tiempo: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const SesionRutina = mongoose.model("SesionRutina", sesionRutinaSchema);

export default SesionRutina;
