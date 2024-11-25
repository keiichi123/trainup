import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRutinaContext } from "../hooks/useRutinaContext";
import iconBasura from "../assets/basura.png";

function ItemRutina({ rutina, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useRutinaContext();

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`/api/rutinas/${rutina._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Hubo un problema al eliminar la rutina");
      }

      navigate("/");
    } catch (error) {
      console.error("Error al eliminar la rutina:", error);
    } finally {
      setShowConfirm(false);
    }
  };

  const handleCancelDelete = (e) => {
    e.stopPropagation();
    setShowConfirm(false);
  };

  const handleNavigate = () => {
    // Dispara el dispatch para almacenar la rutina seleccionada en el contexto
    dispatch({
      type: "SET_RUTINA",
      payload: {
        id: rutina._id,
        nombre: rutina.nombre,
        intensidad: rutina.intensidad,
        intervalo: rutina.intervalo,
      },
    });

    // Navega a la pantalla de Ver Rutina
    navigate("/verrutina", { state: rutina });
  };

  return (
    <div
      className="border rounded p-3 m-3 shadow"
      onClick={handleNavigate}
      style={{ cursor: "pointer" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-2">
        <p className="mb-0">
          <strong>Nombre:</strong>
        </p>
        <p className="mb-0 text-secondary">{rutina.nombre}</p>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <p className="mb-0">
          <strong>Intensidad:</strong>
        </p>
        <p className="mb-0 text-secondary">{rutina.intensidad}</p>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <p className="mb-0">
          <strong>Intervalo:</strong>
        </p>
        <p className="mb-0 text-secondary">cada {rutina.intervalo} días</p>
      </div>

      <div className="d-flex justify-content-end mt-2">
        <button
          className="btn btn-danger"
          style={{ borderRadius: "10px", height: "50px", width: "50px" }}
          onClick={handleDeleteClick}
        >
          <img src={iconBasura} alt="icono_basura" />
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
