import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import { useAuthContext } from "../../hooks/useAuthContext";
import perfilPic from "../../assets/perfil_pic1.png";

function EditPerfil() {
  const { editProfile, isLoading, error } = useUpdateUser();
  const { user } = useAuthContext();

  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [edad, setEdad] = useState(user.edad);

  // Sistema de medidas y valores para estatura y peso
  const [systMedida, setSystMedida] = useState(user.systmedida);
  const [estatura, setEstatura] = useState(user.estatura || "");
  const [estaturaFt, setEstaturaFt] = useState(""); // Para ft/in
  const [estaturaIn, setEstaturaIn] = useState(""); // Para ft/in
  const [peso, setPeso] = useState(user.peso || "");

  const handleClick = (e) => {
    e.preventDefault();

    // Convertimos la estatura a pulgadas si estamos usando ft/in
    const estaturaFinal = systMedida
      ? estatura
      : parseInt(estaturaFt || 0) * 12 + parseInt(estaturaIn || 0);

    const updatedUser = {
      username,
      password,
      edad,
      estatura: estaturaFinal,
      peso,
      systmedida: systMedida,
    };

    editProfile(updatedUser);
  };

  return (
    <div className="container-fluid py-4 d-flex justify-content-center">
      <div className="row g-4 justify-content-center">
        {/* Columna izquierda: Foto de perfil */}
        <div
          className="col-lg-3 col-md-4 text-center"
          style={{ marginTop: "100px" }}
        >
          <div className="d-flex justify-content-center">
            <img
              src={perfilPic}
              alt="Foto de perfil"
              className="rounded-circle border shadow"
              style={{ width: "300px", height: "300px" }}
            />
          </div>
          <h5 className="mt-3">{user.username}</h5>
        </div>

        {/* Columna derecha: Campos de edición */}
        <div className="col-lg-4 col-md-8" style={{ marginTop: "100px" }}>
          <div className="border rounded p-4 shadow-sm">
            <h5 className="mb-4">Editar Perfil</h5>
            <form className="row g-3">
              <div className="col-12">
                <label className="form-label">Nombre:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="col-12">
                <label className="form-label">Contraseña:</label>
                <input
                  type="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="col-12">
                <label className="form-label">Fecha de nacimiento:</label>
                <input
                  type="date"
                  className="form-control"
                  value={edad ? new Date(edad).toISOString().split("T")[0] : ""}
                  onChange={(e) => setEdad(e.target.value)}
                />
              </div>

              {/* Campo de estatura con alternancia de unidades */}
              <div className="col-12">
                <label className="form-label">Estatura:</label>
                <div className="d-flex">
                  {systMedida ? (
                    // Input de estatura en cm
                    <input
                      type="number"
                      className="form-control"
                      value={estatura}
                      onChange={(e) => setEstatura(e.target.value)}
                      placeholder="cm"
                    />
                  ) : (
                    // Inputs de estatura en ft y in
                    <>
                      <input
                        type="number"
                        className="form-control"
                        value={estaturaFt}
                        onChange={(e) => setEstaturaFt(e.target.value)}
                        placeholder="ft"
                        style={{ marginRight: "5px" }}
                      />
                      <input
                        type="number"
                        className="form-control"
                        value={estaturaIn}
                        onChange={(e) => setEstaturaIn(e.target.value)}
                        placeholder="in"
                      />
                    </>
                  )}
                  <div className="btn-group ms-2">
                    <button
                      type="button"
                      className={`btn btn-secondary ${
                        systMedida ? "active" : ""
                      }`}
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
                      className={`btn btn-secondary ${
                        !systMedida ? "active" : ""
                      }`}
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
              <div className="col-12">
                <label className="form-label">Peso:</label>
                <div className="d-flex">
                  <input
                    type="number"
                    className="form-control"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                    placeholder={systMedida ? "kg" : "lb"}
                  />
                  <div className="btn-group ms-2">
                    <button
                      type="button"
                      className={`btn btn-secondary ${
                        systMedida ? "active" : ""
                      }`}
                      onClick={() => setSystMedida(true)}
                      disabled={systMedida}
                    >
                      kg
                    </button>
                    <button
                      type="button"
                      className={`btn btn-secondary ${
                        !systMedida ? "active" : ""
                      }`}
                      onClick={() => setSystMedida(false)}
                      disabled={!systMedida}
                    >
                      lb
                    </button>
                  </div>
                </div>
              </div>
            </form>

            <div className="text-center mt-2">
              <Link to="/" className="btn btn-secondary me-4">
                Cancelar
              </Link>
              <button
                onClick={handleClick}
                className="btn btn-success"
                disabled={isLoading}
              >
                {isLoading ? "Guardando..." : "Guardar"}
              </button>
            </div>
            <div className="error" style={{ color: "red", marginTop: "10px" }}>
              {error ? error : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPerfil;
