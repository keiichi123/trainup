import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useRutinaContext } from "../../hooks/useRutinaContext";
import useGetEjercicio from "../../hooks/useGetEjercicio";
import logoApp from "../../assets/logo_trainup1.png";
import iconAddTime from "../../assets/icon_add_time.png";
import iconSkip from "../../assets/icon_skip.png";

const FrameDescanso = ({ siguienteEjercicio }) => {
  const navigate = useNavigate();
  const { rutina, dispatch } = useRutinaContext();
  const { getEjercicioById, ejercicio, error } = useGetEjercicio();
  const [timeLeft, setTimeLeft] = useState(30);

  // Obtener datos del siguiente ejercicio
  useEffect(() => {
    if (siguienteEjercicio?.id_ejercicio) {
      getEjercicioById(siguienteEjercicio.id_ejercicio);
    }
  }, [siguienteEjercicio]);

  // Manejo del temporizador
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSkip();
    }
  }, [timeLeft]);

  const handleAddTime = () => setTimeLeft((prev) => prev + 20);

  const handleSkip = () => {
    dispatch({
      type: "UPDATE_RUTINA",
      payload: { currentStep: (rutina.currentStep || 0) + 1 },
    });
  };

  const tipoSiguienteEjercicio =
    siguienteEjercicio?.tiempo !== null
      ? "tiempo"
      : siguienteEjercicio?.repeticiones !== null
      ? "repeticiones"
      : null;

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
        <h3>Descanso</h3>
        <div className="display-1 fw-bold">{`00:${
          timeLeft < 10 ? `0${timeLeft}` : timeLeft
        }`}</div>
        <div className="d-flex justify-content-center py-3">
          <button
            className="btn btn-outline-info mx-2"
            onClick={handleAddTime}
            style={{
              fontSize: "18px",
              padding: "0px 20px",
            }}
          >
            <img
              src={iconAddTime}
              alt="Añadir tiempo"
              style={{ width: "60px", height: "60px" }}
            />
            +20s
          </button>
          <button
            className="btn btn-outline-warning mx-2"
            onClick={handleSkip}
            style={{ fontSize: "18px", padding: "0px 20px" }}
          >
            <img
              src={iconSkip}
              alt="Omitir"
              style={{ width: "60px", height: "60px" }}
            />
            Omitir
          </button>
        </div>
      </div>

      {ejercicio ? (
        <div>
          <h6>Siguiente ejercicio:</h6>
          <img
            src={ejercicio.link}
            alt={ejercicio.nombre}
            style={{ width: "120px", height: "auto", marginBottom: "15px" }}
          />
          <h6>{ejercicio.nombre} </h6>
          <p className="text-muted">
            {tipoSiguienteEjercicio === "repeticiones"
              ? `${siguienteEjercicio.repeticiones} repeticiones`
              : `${siguienteEjercicio.tiempo} segundos`}
          </p>
        </div>
      ) : (
        <p>¡Cargando siguiente ejercicio!</p>
      )}

      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default FrameDescanso;
