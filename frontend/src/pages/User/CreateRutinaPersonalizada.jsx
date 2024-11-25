import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoApp from "../../assets/logo_trainup1.png";
import ItemEjercicio from "../../components/ItemEjercicio";
import AddEjercicioModal from "../../components/AddEjercicioModal";
import AddIntervaloModal from "../../components/AddIntervaloModal";
import useCreateRutina from "../../hooks/useCreateRutina";

const CreateRutinaPersonalizada = ({ objetivo }) => {
  const navigate = useNavigate();
  const [ejercicios, setEjercicios] = useState([]);
  const [nombreRutina, setNombreRutina] = useState(objetivo || "");
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [intervaloModalVisible, setIntervaloModalVisible] = useState(false);
  const { createRutinaPer } = useCreateRutina();

  const agregarEjercicio = (nuevoEjercicio) => {
    if (ejercicios.length < 10) {
      setEjercicios([...ejercicios, nuevoEjercicio]);
      setError(null);
    } else {
      setError("No puedes agregar más de 10 ejercicios.");
    }
  };

  const calcularIntensidad = () => {
    const numEjercicios = ejercicios.length;
    if (numEjercicios <= 4) return "baja";
    if (numEjercicios <= 7) return "media";
    return "alta";
  };

  const guardarRutina = () => {
    setIntervaloModalVisible(true);
  };

  const manejarGuardarRutina = async (intervalo) => {
    const intensidad = calcularIntensidad();
    try {
      const response = await createRutinaPer(
        intensidad,
        nombreRutina,
        intervalo,
        ejercicios
      );
      if (response) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error al guardar la rutina:", error);
      setError("Hubo un problema al guardar la rutina.");
    }
  };

  const cancelarCreacion = () => {
    navigate("/");
  };

  return (
    <div
      className="container-fluid"
      style={{
        maxWidth: "1200px",
        marginTop: "20px",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        flexDirection: "row", // Distribuye en filas horizontales
        gap: "40px", // Espacio entre las columnas
      }}
    >
      {/* Columna izquierda */}
      <div
        style={{
          flex: 1,
          minWidth: "400px", // Controla el tamaño mínimo de la columna
          padding: "16px",
          borderRight: "1px solid #ddd",
        }}
      >
        {/* Título y Logo en la parte superior */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "16px",
            borderBottom: "1px solid #ddd",
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
              style={{ width: "160px", height: "80px" }}
            />
          </button>
          <h5 style={{ margin: 0 }}>Rutina Personalizada</h5>
        </div>

        {/* Nombre de la rutina y lista de ejercicios */}
        <label style={{ display: "block", marginBottom: "16px" }}>
          {nombreRutina}:
        </label>
        {error && (
          <div className="alert alert-danger" style={{ marginBottom: "16px" }}>
            {error}
          </div>
        )}
        <ul
          className="list-group"
          style={{
            paddingLeft: "0",
            listStyleType: "none",
            marginBottom: "32px", // Espacio entre la lista de ejercicios y los botones
          }}
        >
          {ejercicios.map((ejercicio, index) => (
            <ItemEjercicio key={index} ejercicio={ejercicio} />
          ))}
        </ul>
      </div>

      {/* Columna derecha */}
      <div
        style={{
          flex: 1,
          minWidth: "200px", // Controla el tamaño mínimo de la columna
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "16px", // Espaciado entre los botones
        }}
      >
        {/* Botón Agregar ejercicio en la parte superior */}
        <button
          onClick={() => setModalVisible(true)}
          className="btn btn-primary"
          style={{
            padding: "10px",
            fontSize: "16px",
            fontWeight: "bold",
            marginBottom: "16px", // Separación del siguiente contenido
          }}
        >
          Agregar ejercicio
        </button>

        {/* Separación entre los botones */}
        <div style={{ marginTop: "auto" }} />

        {/* Botones Guardar y Cancelar en la parte inferior, apilados verticalmente */}
        <div
          style={{
            display: "flex",
            flexDirection: "column", // Alineación vertical
            gap: "16px", // Espacio entre los botones
          }}
        >
          <button
            onClick={guardarRutina}
            className="btn btn-success"
            style={{
              padding: "10px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Guardar Rutina
          </button>
          <button
            onClick={cancelarCreacion}
            className="btn btn-secondary"
            style={{
              padding: "10px",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Cancelar
          </button>
        </div>
      </div>

      {/* Modales */}
      <AddEjercicioModal
        isVisible={modalVisible}
        objetivo={objetivo}
        onAgregar={agregarEjercicio}
        onCerrar={() => setModalVisible(false)}
      />
      <AddIntervaloModal
        isVisible={intervaloModalVisible}
        onGuardar={manejarGuardarRutina}
        onCerrar={() => setIntervaloModalVisible(false)}
      />
    </div>
  );
};

export default CreateRutinaPersonalizada;
