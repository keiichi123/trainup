import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignin } from "../../hooks/useSignin";
import TwoFAModal from "../../components/AuthEmailModal";
import logoApp from "../../assets/logo_trainup1.png";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signin, verify2FACode, error, isLoading, requires2FA } = useSignin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signin(email, password);
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center vh-100"
      style={{
        maxWidth: "400px",
      }}
    >
      <form
        className="signin mx-auto d-flex flex-column align-items-center"
        onSubmit={handleSubmit}
      >
        <div className="text-center">
          <h3>Inicia Sesión</h3>
        </div>
        <div className="position-relative d-inline-block text-center mb-3">
          <img
            src={logoApp}
            alt="Logo"
            className="rounded-circle"
            style={{ width: "300px", height: "150px" }}
          />
        </div>

        <div className="mb-3 w-100">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="mb-3 w-100">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="text-center">
          <button
            disabled={isLoading}
            type="submit"
            className="btn btn-primary"
          >
            Iniciar Sesión
          </button>
        </div>

        <br />
        <div>
          <label>¿No tienes una cuenta?</label>
          <Link to="/register"> Regístrate</Link>
        </div>
        <div className="error" style={{ color: "red", marginTop: "10px" }}>
          {error ? error : ""}
        </div>
      </form>

      {/* Mostrar el modal si se requiere 2FA */}
      <TwoFAModal
        isVisible={requires2FA}
        onVerify={verify2FACode}
        error={error}
      />
    </div>
  );
}

export default SignIn;
