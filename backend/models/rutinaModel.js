import mongoose from "mongoose";

const rutinaSchema = mongoose.Schema(
  {
    id_usuario: {
      type: String,
      required: true,
    },

    nombre: {
      type: String,
      required: true,
    },

    intensidad: {
      type: String,
      required: true,
    },

    fecha_inicio: {
      type: Date,
      required: true,
    },

    fecha_fin: {
      type: Date,
      required: false,
    },

    intervalo: {
      type: Number,
      required: true,
    },

    total_calorias: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

const Rutina = mongoose.model("Rutina", rutinaSchema);

export default Rutina;
