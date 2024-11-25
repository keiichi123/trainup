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
  const [estatura, setEstatura] = useState(""); // Para cm o in (total en pulgadas)
  const [peso, setPeso] = useState("");

  // Estados adicionales para ft e in cuando systMedida está en false
  const [estaturaFt, setEstaturaFt] = useState("");
  const [estaturaIn, setEstaturaIn] = useState("");

  // Estado para el sistema de medidas: true para cm/kg, false para ft/in
  const [systMedida, setSystMedida] = useState(true);

  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculamos la estatura en pulgadas si systMedida está en false
    const estaturaFinal = systMedida
      ? estatura
      : parseInt(estaturaFt || 0) * 12 + parseInt(estaturaIn || 0);

    await signup(
      username,
      email,
      password,
      cpassword,
      edad,
      estaturaFinal,
      peso,
      systMedida
    );
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
          <label>Fecha de nacimiento:</label>
          <input
            type="date"
            className="form-control"
            onChange={(e) => setEdad(e.target.value)}
            value={edad}
          />
        </div>

        {/* Campo de estatura con alternancia de unidades */}
        <div className="mb-3 w-100">
          <label>Estatura:</label>
          <div className="d-flex">
            {systMedida ? (
              // Input de estatura en cm
              <input
                type="number"
                className="form-control"
                onChange={(e) => setEstatura(e.target.value)}
                value={estatura}
                placeholder="cm"
              />
            ) : (
              // Inputs de estatura en ft y in
              <>
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => setEstaturaFt(e.target.value)}
                  value={estaturaFt}
                  placeholder="ft"
                  style={{ marginRight: "5px" }}
                />
                <input
                  type="number"
                  className="form-control"
                  onChange={(e) => setEstaturaIn(e.target.value)}
                  value={estaturaIn}
                  placeholder="in"
                />
              </>
            )}
            <div className="btn-group ms-2">
              <button
                type="button"
                className={`btn btn-secondary ${systMedida ? "active" : ""}`}
                onClick={() => {
                  setSystMedida(true);
                  setEstatura("");
                  setEstaturaFt("");
                  setEstaturaIn("");
                  setPeso("");
                }}
                disabled={systMedida}
              >
                cm
              </button>
              <button
                type="button"
                className={`btn btn-secondary ${!systMedida ? "active" : ""}`}
                onClick={() => {
                  setSystMedida(false);
                  setEstatura("");
                  setEstaturaFt("");
                  setEstaturaIn("");
                  setPeso("");
                }}
                disabled={!systMedida}
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
              placeholder={systMedida ? "kg" : "lb"}
            />
            <div className="btn-group ms-2">
              <button
                type="button"
                className={`btn btn-secondary ${systMedida ? "active" : ""}`}
                onClick={() => {
                  setSystMedida(true);
                  setPeso("");
                  setEstatura("");
                }}
                disabled={systMedida}
              >
                kg
              </button>
              <button
                type="button"
                className={`btn btn-secondary ${!systMedida ? "active" : ""}`}
                onClick={() => {
                  setSystMedida(false);
                  setPeso("");
                  setEstatura("");
                }}
                disabled={!systMedida}
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
