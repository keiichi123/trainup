import { useState } from "react";

const AuthEmailModal = ({ isVisible, onVerify, error }) => {
  const [code, setCode] = useState("");

  const handleVerify = (e) => {
    e.preventDefault();
    onVerify(code);
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
              <h5 className="modal-title">Verificación en 2 Pasos</h5>
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
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-primary">
                  Verificar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AuthEmailModal;
