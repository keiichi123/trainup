import React, { useState, useEffect } from "react";
import useGetEjercicio from "../hooks/useGetEjercicio";

const AddEjercicioModal = ({ isVisible, objetivo, onAgregar, onCerrar }) => {
  const { fetchEjerciciosByObjetivo, ejercicios, error } = useGetEjercicio(); // Desestructuración del hook
  const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState("");
  const [valor, setValor] = useState("");
  const [tipoEjercicio, setTipoEjercicio] = useState(true);

  useEffect(() => {
    const obtenerEjercicios = async () => {
      await fetchEjerciciosByObjetivo(objetivo);
    };

    if (isVisible) {
      obtenerEjercicios();
    }
  }, [isVisible, objetivo, fetchEjerciciosByObjetivo]);

  useEffect(() => {
    if (ejercicioSeleccionado) {
      const ejercicio = ejercicios.find(
        (ej) => ej.nombre === ejercicioSeleccionado
      );
      if (ejercicio) {
        setTipoEjercicio(ejercicio.tipo);
      }
    }
  }, [ejercicioSeleccionado, ejercicios]);

  const manejarAgregar = () => {
    if (ejercicioSeleccionado && valor) {
      if (tipoEjercicio) {
        onAgregar({
          nombre: ejercicioSeleccionado,
          repeticiones: null,
          tiempo: valor,
        });
        onCerrar();
      }
      if (!tipoEjercicio) {
        onAgregar({
          nombre: ejercicioSeleccionado,
          repeticiones: valor,
          tiempo: null,
        });
        onCerrar();
      }
    }
  };

  return (
    isVisible && (
      <div
        className="modal show d-block fade"
        style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Agregar Ejercicio</h5>
              <button type="button" className="close" onClick={onCerrar}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {error && <p className="text-danger">{error}</p>}{" "}
              {/* Mostrar error si existe */}
              <div className="form-group">
                <label htmlFor="ejercicioSelect">
                  Selecciona un ejercicio:
                </label>
                <select
                  id="ejercicioSelect"
                  className="form-control"
                  value={ejercicioSeleccionado}
                  onChange={(e) => setEjercicioSeleccionado(e.target.value)}
                >
                  <option value="">Selecciona...</option>
                  {ejercicios.map((ejercicio) => (
                    <option key={ejercicio._id} value={ejercicio.nombre}>
                      {ejercicio.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="valorInput">
                  {tipoEjercicio ? "Tiempo (segundos)" : "Repeticiones"}
                </label>
                <input
                  type="number"
                  id="valorInput"
                  className="form-control"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={manejarAgregar}
              >
                Agregar
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCerrar}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AddEjercicioModal;
