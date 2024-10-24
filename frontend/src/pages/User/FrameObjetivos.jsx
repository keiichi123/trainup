import React from "react";

function FrameObjetivos() {
  return (
    <div
      className="container-fluid d-flex flex-column justify-content-center align-items-center py-4"
      style={{ maxWidth: "400px" }}
    >
      <h5 className="mb-2 text-center">¿Cuál es tu objetivo?</h5>
      <p className="text-center mb-4">
        Crea un ejercicio personalizado para tu rutina
      </p>

      <div className="w-100">
        {/* Opción 1: Pierde Peso */}
        <button className="btn btn-outline-primary w-100 mb-3 py-3 d-flex align-items-center justify-content-center">
          <i className="bi bi-clipboard me-2"></i> Pierde Peso
        </button>

        {/* Opción 2: Tonificarte */}
        <button className="btn btn-outline-primary w-100 mb-3 py-3 d-flex align-items-center justify-content-center">
          <i className="bi bi-heart-pulse me-2"></i> Tonificarte
        </button>

        {/* Opción 3: Aumentar Músculo */}
        <button className="btn btn-outline-primary w-100 py-3 d-flex align-items-center justify-content-center">
          <i className="bi bi-arm-flex me-2"></i> Aumentar Músculo
        </button>
      </div>
    </div>
  );
}

export default FrameObjetivos;
