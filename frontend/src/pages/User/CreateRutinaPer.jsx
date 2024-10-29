import React, { useState } from "react";
import FrameObjetivos from "./FrameObjetivos";
import CreateRutinaPersonalizada from "./CreateRutinaPersonalizada";

const CreateRutinaPer = () => {
  const [objetivoSeleccionado, setObjetivoSeleccionado] = useState(null);

  const handleSelectObjective = (objetivo) => {
    setObjetivoSeleccionado(objetivo);
  };

  return (
    <div className="container-fluid" style={{ maxWidth: "400px" }}>
      {objetivoSeleccionado ? (
        <CreateRutinaPersonalizada objetivo={objetivoSeleccionado} />
      ) : (
        <FrameObjetivos onSelectObjective={handleSelectObjective} />
      )}
    </div>
  );
};

export default CreateRutinaPer;
