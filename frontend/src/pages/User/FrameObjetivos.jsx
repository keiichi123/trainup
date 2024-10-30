import React from "react";
import logoApp from "../../assets/logo_trainup1.png";
import { useNavigate } from "react-router";

function FrameObjetivos({ onSelectObjective }) {
  const navigate = useNavigate();
  return (
    <div className="container-fluid" style={{ maxWidth: "400px" }}>
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
        <h5 className="mb-0">Creando Rutina</h5>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
        >
          <img
            src={logoApp}
            alt="Logo"
            style={{ width: "100px", height: "50px" }}
          />
        </button>
      </div>
      <div className="p-3">
        <h6 className="mb-2 text-center">¿Cuál es tu objetivo?</h6>
        <p className="text-center mb-4">
          Crea un ejercicio personalizado para tu rutina
        </p>
      </div>

      <div className="w-100">
        {/* Botones de opción */}
        {[
          {
            label: "Pierde Peso",
            objective: "Rutina para Perder Peso",
            icon: "bi bi-clipboard",
          },
          {
            label: "Tonificarte",
            objective: "Rutina para Tonificarte",
            icon: "bi bi-heart-pulse",
          },
          {
            label: "Aumentar Músculo",
            objective: "Rutina de Volumen",
            icon: "bi bi-arm-flex",
          },
        ].map((option) => (
          <button
            key={option.label}
            className="btn btn-outline-primary w-100 mb-3 py-3 d-flex align-items-center justify-content-center"
            onClick={() => onSelectObjective(option.objective)}
          >
            <i className={`${option.icon} me-2`}></i> {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FrameObjetivos;
