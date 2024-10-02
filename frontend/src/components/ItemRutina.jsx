import React, { useState } from "react";
import { Link } from "react-router-dom";

function ItemRutina({ rutina, onDelete }) {
  const tiempoPorNivel = {
    facil: 5,
    medio: 10,
    dificil: 15,
  };

  const intensidadPorNivel = {
    facil: "baja",
    medio: "media",
    dificil: "alta",
  };

  const [showConfirm, setShowConfirm] = useState(false);

  const tiempoRutina = tiempoPorNivel[rutina.nivel] || 0;
  const intensidadRutina = intensidadPorNivel[rutina.nivel] || "";

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete(rutina._id);
    setShowConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <div className="border rounded p-3 m-3 shadow">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <p className="mb-0">
          <strong>Ejercicio:</strong>
        </p>
        <p className="mb-0 text-secondary">{rutina.ejercicio}</p>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <p className="mb-0">
          <strong>Intensidad:</strong>
        </p>
        <p className="mb-0 text-secondary">{intensidadRutina}</p>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <p className="mb-0">
          <strong>Intervalo:</strong>
        </p>
        <p className="mb-0 text-secondary">cada {rutina.intervalo} días</p>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <p className="mb-0">
          <strong>Tiempo:</strong>
        </p>
        <p className="mb-0 text-secondary">{tiempoRutina} minutos</p>
      </div>

      <div className="d-flex justify-content-end mt-2">
        <Link
          to={`/updaterutina/${rutina._id}`}
          className="btn btn-warning me-2"
        >
          Editar
        </Link>
        <button className="btn btn-danger" onClick={handleDeleteClick}>
          Cancelar
        </button>
      </div>

      {showConfirm && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar Eliminación</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCancelDelete}
                ></button>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro de que deseas eliminar esta rutina?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancelDelete}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ItemRutina;
