import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useRutinaContext } from "../../hooks/useRutinaContext";
import useGetEjercicio from "../../hooks/useGetEjercicio";
import logoApp from "../../assets/logo_trainup1.png";
import iconComplete from "../../assets/icon_complete.png";
import iconTimer from "../../assets/icon_timer.gif";

const FrameRunEjercicio = ({ ejercicio }) => {
  const navigate = useNavigate();
  const { rutina, dispatch } = useRutinaContext();
  const {
    getEjercicioById,
    ejercicio: ejercicioData,
    error,
  } = useGetEjercicio();

  const tipo =
    ejercicio?.tiempo !== null
      ? "tiempo"
      : ejercicio?.repeticiones !== null
      ? "repeticiones"
      : "indefinido";

  const [timeLeft, setTimeLeft] = useState(
    tipo === "tiempo" ? ejercicio.tiempo : 0
  );

  // Obtener información del ejercicio al cargar
  useEffect(() => {
    if (ejercicio?.id_ejercicio) {
      getEjercicioById(ejercicio.id_ejercicio);
    }
  }, [ejercicio]);

  // Temporizador para ejercicios basados en tiempo
  useEffect(() => {
    if (tipo !== "tiempo") return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [tipo]);

  // Completar automáticamente si el tiempo llega a 0
  useEffect(() => {
    if (timeLeft === 0 && tipo === "tiempo") {
      handleComplete();
    }
  }, [timeLeft, tipo]);

  // Manejar la finalización del ejercicio
  const handleComplete = () => {
    let calorias = 0;
    let tiempo = 0;

    if (tipo === "tiempo") {
      // Calorías quemadas basadas en minutos de actividad
      calorias = (ejercicio.tiempo / 60) * 8; // 8 cal/min como promedio
      tiempo = ejercicio.tiempo; // Tiempo directamente del ejercicio
    } else if (tipo === "repeticiones") {
      // Calorías quemadas basadas en repeticiones (0.25 cal/repetición como promedio)
      calorias = ejercicio.repeticiones * 0.25;
      tiempo = ejercicio.repeticiones * 2; // Estimamos 2 segundos por repetición
    }

    dispatch({
      type: "UPDATE_RUTINA",
      payload: {
        totalCalorias: (rutina.totalCalorias || 0) + calorias,
        totalTiempo: (rutina.totalTiempo || 0) + tiempo,
        currentStep: (rutina.currentStep || 0) + 1,
      },
    });
  };

  return (
    <div
      className="container-fluid"
      style={{ maxWidth: "800px", margin: "0 auto" }}
    >
      {/* Header with logo */}
      <div className="d-flex justify-content-between align-items-center py-3">
        <button onClick={() => navigate("/")}>
          <img
            src={logoApp}
            alt="Logo"
            style={{ width: "300px", height: "150px" }}
          />
        </button>
      </div>

      <div className="text-center">
        {error && <p className="text-danger">{error}</p>}
        <h3>{ejercicioData ? ejercicioData.nombre : "Cargando..."}</h3>

        {/* Mostrar tiempo o repeticiones del ejercicio */}
        {tipo === "tiempo" && ejercicio.tiempo ? (
          <p className="text-muted">{ejercicio.tiempo} segundos</p>
        ) : tipo === "repeticiones" && ejercicio.repeticiones ? (
          <p className="text-muted">x {ejercicio.repeticiones} repeticiones</p>
        ) : (
          <p className="text-muted">Información no disponible</p>
        )}

        {ejercicioData && (
          <img
            src={ejercicioData.link}
            alt={ejercicioData.nombre}
            style={{
              maxWidth: "300px",
              maxHeight: "300px",
              marginBottom: "15px",
            }}
            className="d-block mx-auto"
          />
        )}

        {/* Botón para completar ejercicio */}
        {tipo === "repeticiones" ? (
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-outline-success mt-4 d-flex justify-content-center align-items-center"
              onClick={handleComplete}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                padding: 0,
              }}
            >
              <img
                src={iconComplete}
                alt="Completar"
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />
            </button>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center mt-4">
            <img
              src={iconTimer}
              alt="Temporizador"
              style={{ width: "80px", height: "80px", marginRight: "10px" }}
            />
            <div className="display-1 fw-bold">
              {`00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FrameRunEjercicio;
