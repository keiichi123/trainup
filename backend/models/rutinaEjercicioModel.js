import mongoose from "mongoose";

const rutinaEjercicioSchema = mongoose.Schema(
  {
    id_rutina: {
      type: String,
      required: true,
    },

    id_ejercicio: {
      type: String,
      required: true,
    },

    tiempo: {
      type: Number,
      required: false,
    },

    repeticiones: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

const RutinaEjercicio = mongoose.model(
  "RutinaEjercicio",
  rutinaEjercicioSchema
);

export default RutinaEjercicio;
