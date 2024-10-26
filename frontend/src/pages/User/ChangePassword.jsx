import { useState } from "react";
import { useSignin } from "../../hooks/useSignin";
import logoApp from "../../assets/logo_trainup1.png";
import ChangePassModal from "../../components/ChangePassModal";

function ChangePassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const {
    tryChangePass,
    changeUserPass,
    verifyChangePass,
    error,
    isLoading,
    requires2FA,
    userId,
  } = useSignin();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    await tryChangePass(email);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    await changeUserPass(userId, newPassword, confirmPassword);
  };

  const handleVerifySuccess = () => {
    setVerified(true);
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center vh-100"
      style={{ maxWidth: "400px" }}
    >
      <form
        className="signin mx-auto d-flex flex-column align-items-center"
        onSubmit={verified ? handlePasswordSubmit : handleEmailSubmit}
      >
        <div className="position-relative d-inline-block text-center mb-3">
          <img
            src={logoApp}
            alt="Logo"
            className="rounded-circle"
            style={{ width: "300px", height: "150px" }}
          />
        </div>
        <div className="text-center">
          <h3>Cambiar de contraseña</h3>
          <br />
          <br />
        </div>

        {!verified ? (
          <>
            <div className="mb-3 w-100">
              <label htmlFor="email" className="form-label">
                Ingrese su correo:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="btn btn-primary"
            >
              Enviar
            </button>
          </>
        ) : (
          <>
            <div className="mb-3 w-100">
              <label htmlFor="newPassword" className="form-label">
                Nueva Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
            </div>
            <div className="mb-3 w-100">
              <label htmlFor="confirmPassword" className="form-label">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
            <button
              disabled={isLoading}
              type="submit"
              className="btn btn-primary"
            >
              Guardar
            </button>
          </>
        )}

        <br />
        <div className="error" style={{ color: "red", marginTop: "10px" }}>
          {error ? error : ""}
        </div>
      </form>

      {/* Modal para verificación en 2 pasos */}
      <ChangePassModal
        isVisible={requires2FA && !verified}
        onVerify={async (code) => {
          const isCodeValid = await verifyChangePass(code); // Espera el resultado de verificación
          if (isCodeValid) {
            handleVerifySuccess(); // Solo cambia el estado cuando el código es correcto
          }
        }}
        error={error}
      />
    </div>
  );
}

export default ChangePassword;
