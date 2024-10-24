import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { Link } from "react-router-dom";
import logoApp from "../../assets/logo_trainup1.png";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [username, setUsername] = useState("");
  const [edad, setEdad] = useState("");
  const [estatura, setEstatura] = useState("");
  const [peso, setPeso] = useState("");

  // Nuevos estados para el sistema de unidades
  const [pesoSistema, setPesoSistema] = useState("kg"); // "kg" o "lb"
  const [estaturaSistema, setEstaturaSistema] = useState("cm"); // "cm" o "in"

  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(username, email, password, cpassword, edad, estatura, peso);
  };

  // Función para cambiar el sistema de peso
  const handlePesoChange = (sistema) => {
    if (sistema !== pesoSistema) {
      if (sistema === "lb") {
        setPeso((prevPeso) => (prevPeso * 2.20462).toFixed(2)); // Convierte a lb
      } else {
        setPeso((prevPeso) => (prevPeso / 2.20462).toFixed(2)); // Convierte a kg
      }
      setPesoSistema(sistema);
    }
  };

  // Función para cambiar el sistema de estatura
  const handleEstaturaChange = (sistema) => {
    if (sistema !== estaturaSistema) {
      if (sistema === "in") {
        setEstatura((prevEstatura) => (prevEstatura / 2.54).toFixed(2)); // Convierte a pulgadas
      } else {
        setEstatura((prevEstatura) => (prevEstatura * 2.54).toFixed(2)); // Convierte a cm
      }
      setEstaturaSistema(sistema);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center vh-100"
      style={{
        maxWidth: "400px",
      }}
    >
      <form
        className="signup mx-auto d-flex flex-column align-items-center"
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-3">
          <h3>Regístrate</h3>
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
          <label>Nombre de Usuario:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="mb-3 w-100">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="mb-3 w-100">
          <label>Contraseña:</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="mb-3 w-100">
          <label>Confirmar contraseña:</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setCpassword(e.target.value)}
            value={cpassword}
          />
        </div>
        <div className="mb-3 w-100">
          <label>Edad:</label>
          <input
            type="number"
            className="form-control"
            onChange={(e) => setEdad(e.target.value)}
            value={edad}
          />
        </div>

        {/* Campo de estatura con botones para alternar unidades */}
        <div className="mb-3 w-100">
          <label>Estatura:</label>
          <div className="d-flex">
            <input
              type="number"
              className="form-control"
              onChange={(e) => setEstatura(e.target.value)}
              value={estatura}
            />
            <div className="btn-group ms-2">
              <button
                type="button"
                className={`btn btn-secondary ${
                  estaturaSistema === "cm" ? "active" : ""
                }`}
                onClick={() => handleEstaturaChange("cm")}
              >
                cm
              </button>
              <button
                type="button"
                className={`btn btn-secondary ${
                  estaturaSistema === "in" ? "active" : ""
                }`}
                onClick={() => handleEstaturaChange("in")}
              >
                in
              </button>
            </div>
          </div>
        </div>

        {/* Campo de peso con botones para alternar unidades */}
        <div className="mb-3 w-100">
          <label>Peso:</label>
          <div className="d-flex">
            <input
              type="number"
              className="form-control"
              onChange={(e) => setPeso(e.target.value)}
              value={peso}
            />
            <div className="btn-group ms-2">
              <button
                type="button"
                className={`btn btn-secondary ${
                  pesoSistema === "kg" ? "active" : ""
                }`}
                onClick={() => handlePesoChange("kg")}
              >
                kg
              </button>
              <button
                type="button"
                className={`btn btn-secondary ${
                  pesoSistema === "lb" ? "active" : ""
                }`}
                onClick={() => handlePesoChange("lb")}
              >
                lb
              </button>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            disabled={isLoading}
            type="submit"
            className="btn btn-primary"
          >
            Registrar
          </button>
        </div>
        <br />
        <div>
          <label>¿Ya tienes una cuenta?</label>
          <Link to="/login"> Inicia sesión</Link>
        </div>
        <div className="error" style={{ color: "red", marginTop: "10px" }}>
          {error ? error : ""}
        </div>
      </form>
    </div>
  );
}

export default SignUp;
