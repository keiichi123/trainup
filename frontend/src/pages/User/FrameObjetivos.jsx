import React from "react";
import logoApp from "../../assets/logo_trainup1.png";
import { useNavigate } from "react-router";

function FrameObjetivos({ onSelectObjective }) {
  const navigate = useNavigate();
  return (
    <div
      className="container-fluid"
      style={{
        maxWidth: "800px",
        marginTop: "20px",
        marginLeft: "auto",
        marginRight: "auto", // Centra el contenedor
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
          borderBottom: "1px solid #ddd",
        }}
      >
        <h5 style={{ margin: 0 }}>Creando Rutina</h5>
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

      {/* Título y descripción */}
      <div style={{ padding: "16px", textAlign: "center" }}>
        <h6 style={{ marginBottom: "8px" }}>¿Cuál es tu objetivo?</h6>
        <p style={{ color: "#888", marginBottom: "16px" }}>
          Crea un ejercicio personalizado para tu rutina
        </p>
      </div>

      {/* Contenedor de botones */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        {/* Botones de opciones */}
        {[
          {
            label: "Pierde Peso",
            objective: "Rutina para Perder Peso",
            icon: "bi bi-clipboard",
            color: "#f39c12",
          },
          {
            label: "Tonificarte",
            objective: "Rutina para Tonificarte",
            icon: "bi bi-heart-pulse",
            color: "#2980b9",
          },
          {
            label: "Aumentar Músculo",
            objective: "Rutina de Volumen",
            icon: "bi bi-arm-flex",
            color: "#27ae60",
          },
        ].map((option) => (
          <button
            key={option.label}
            onClick={() => onSelectObjective(option.objective)}
            style={{
              backgroundColor: option.color,
              color: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              transition: "transform 0.2s, box-shadow 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "240px", // Controla el ancho
              height: "120px", // Controla la altura
              padding: "0", // Sin padding extra
              fontSize: "18px",
              fontWeight: "bold",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)";
              e.target.style.boxShadow = "0 6px 8px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
            }}
          >
            <i
              className={`${option.icon} me-3`}
              style={{ fontSize: "30px", marginRight: "8px" }}
            ></i>
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FrameObjetivos;
