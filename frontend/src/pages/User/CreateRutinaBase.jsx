import React, { useState } from "react";
import FrameObjetivos from "./FrameObjetivos";
import { useLocation, useNavigate } from "react-router-dom";
import useCreateRutina from "../../hooks/useCreateRutina";

const CreateRutinaBase = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { selectedButton } = state;
  const { createRutina, isLoading, error } = useCreateRutina();

  const intensityLevels = {
    Novato: { intensidad: "baja", intervalo: 10 },
    Intermedio: { intensidad: "media", intervalo: 7 },
    Avanzado: { intensidad: "alta", intervalo: 5 },
  };

  const handleObjectiveSelection = async (nombreRutina) => {
    const { intensidad, intervalo } = intensityLevels[selectedButton];
    await createRutina(intensidad, nombreRutina, intervalo);

    navigate("/");
  };

  return (
    <div className="container-fluid" style={{ maxWidth: "400px" }}>
      <FrameObjetivos onSelectObjective={handleObjectiveSelection} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CreateRutinaBase;
