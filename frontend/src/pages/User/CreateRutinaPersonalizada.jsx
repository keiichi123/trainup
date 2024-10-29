import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo_trainup1.png";
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
    <div className="container-fluid" style={{ maxWidth: "400px" }}>
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
        <h5 className="mb-0">Rutina Personalizada</h5>
        <img src={logo} alt="Logo" style={{ width: "100px", height: "50px" }} />
      </div>
      <label className="mb-3">{nombreRutina}:</label>
      <br />
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group mb-3">
        {ejercicios.map((ejercicio, index) => (
          <ItemEjercicio key={index} ejercicio={ejercicio} />
        ))}
      </ul>
      <button
        onClick={() => setModalVisible(true)}
        className="btn btn-primary mb-3"
      >
        Agregar ejercicio
      </button>
      <br />

      <button onClick={guardarRutina} className="btn btn-success me-2">
        Guardar Rutina
      </button>
      <button onClick={cancelarCreacion} className="btn btn-secondary">
        Cancelar
      </button>
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
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default CreateRutinaPersonalizada;
