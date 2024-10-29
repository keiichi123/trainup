import React, { useState } from "react";

const AddIntervaloModal = ({ isVisible, onGuardar, onCerrar }) => {
  const [intervalo, setIntervalo] = useState("");

  const manejarGuardar = () => {
    if (intervalo) {
      onGuardar(intervalo);
      onCerrar();
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
              <h5 className="modal-title">Ingrese el Intervalo</h5>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="intervaloInput">Intervalo en días:</label>
                <input
                  type="number"
                  id="intervaloInput"
                  className="form-control"
                  value={intervalo}
                  onChange={(e) => setIntervalo(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={manejarGuardar}
              >
                Guardar
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

export default AddIntervaloModal;
