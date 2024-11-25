import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ItemEjercicio2 from "./ItemEjercicio2";
import logoApp from "../assets/logo_trainup1.png";
import { useRutinaContext } from "../hooks/useRutinaContext";

const VerRutina = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [ejercicios, setEjercicios] = useState([]);
  const [error, setError] = useState("");

  const { _id: rutinaId, nombre, intensidad, intervalo } = location.state || {};

  const { dispatch } = useRutinaContext();

  const iniciarRutina = () => {
    dispatch({
      type: "SET_RUTINA",
      payload: {
        id: rutinaId,
        nombre,
        intensidad,
        intervalo,
        ejercicios,
        currentStep: 1,
      },
    });
    navigate("/runrutina");
  };

  useEffect(() => {
    if (!rutinaId) {
      navigate("/");
      return;
    }

    const fetchEjercicios = async () => {
      try {
        const response = await fetch(
          `/api/rutinaejercicios/rutina/${rutinaId}`
        );
        if (!response.ok) {
          throw new Error("Error al obtener los ejercicios de la rutina");
        }
        const data = await response.json();
        setEjercicios(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEjercicios();
  }, [rutinaId, navigate]);

  return (
    <div
      className="container-fluid"
      style={{
        display: "flex",
        flexDirection: "row", // Distribuye en columnas horizontales
        gap: "30px", // Espacio entre las columnas
        marginTop: "20px",
        maxWidth: "1200px", // Ajusta el ancho de la pantalla
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {/* Columna izquierda: Detalles de la rutina */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          borderRight: "1px solid #ddd",
          display: "flex",
          flexDirection: "column",
          maxWidth: "500px",
        }}
      >
        {/* Header: Título y logo */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
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
              style={{ width: "200px", height: "100px" }}
            />
          </button>
          <h5 style={{ margin: 0 }}>Detalles de la Rutina</h5>
        </div>

        {/* Información de la rutina */}
        <div
          style={{
            padding: "16px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            backgroundColor: "#f9f9f9",
            marginBottom: "20px",
          }}
        >
          <p>
            <strong>Nombre:</strong> {nombre}
          </p>
          <p>
            <strong>Intensidad:</strong> {intensidad}
          </p>
          <p>
            <strong>Intervalo:</strong> cada {intervalo} días
          </p>
        </div>
      </div>

      {/* Columna derecha: Ejercicios y botón */}
      <div
        style={{
          flex: 2,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          maxWidth: "500px", // Asegura que la columna tenga un ancho máximo
          marginLeft: "auto", // Centra la columna en la pantalla
          marginRight: "auto", // Centra la columna en la pantalla
        }}
      >
        {/* Lista de ejercicios */}
        <h5 style={{ marginBottom: "20px" }}>Ejercicios</h5>
        {error ? (
          <p className="text-danger" style={{ marginBottom: "20px" }}>
            {error}
          </p>
        ) : (
          <ul
            className="list-group"
            style={{
              paddingLeft: "0",
              listStyleType: "none",
              marginBottom: "40px",
            }}
          >
            {ejercicios.length > 0 ? (
              ejercicios.map((ejercicio, index) => (
                <ItemEjercicio2 key={index} ejercicio={ejercicio} />
              ))
            ) : (
              <li className="list-group-item text-muted">
                No hay ejercicios en esta rutina.
              </li>
            )}
          </ul>
        )}

        {/* Botón para iniciar rutina */}
        <button
          className="btn btn-primary"
          onClick={iniciarRutina}
          style={{
            padding: "12px 20px",
            fontSize: "18px",
            fontWeight: "bold",
            alignSelf: "center", // Esto centra el botón en su contenedor
            marginTop: "auto", // Asegura que el botón se quede al final del contenedor
          }}
        >
          Iniciar Rutina
        </button>
      </div>
    </div>
  );
};

export default VerRutina;
