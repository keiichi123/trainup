import { useState } from "react";

const ChangePassModal = ({ isVisible, onVerify, error }) => {
  const [code, setCode] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    await onVerify(code); // Llama a onVerify sin almacenar el error
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
              <h5 className="modal-title">
                Verifica tu correo electrónico para cambiar de contraseña
              </h5>
            </div>
            <div className="modal-body">
              <form onSubmit={handleVerify}>
                <div className="mb-3">
                  <label htmlFor="code" className="form-label">
                    Introduzca el código de verificación
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Verificar
                </button>
              </form>
              {/* Muestra el error directamente desde la prop */}
              {error && (
                <div
                  className="error"
                  style={{ color: "red", marginTop: "10px" }}
                >
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ChangePassModal;
