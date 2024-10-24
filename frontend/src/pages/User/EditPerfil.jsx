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
  const [estatura, setEstatura] = useState(user.estatura);
  const [peso, setPeso] = useState(user.peso);

  const handleClick = (e) => {
    e.preventDefault();
    const updatedUser = {
      username,
      password,
      edad,
      estatura,
      peso,
    };
    editProfile(updatedUser);
  };

  return (
    <div
      className="container-fluid"
      style={{
        maxWidth: "400px",
      }}
    >
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
        <h5 className="mb-0">Editar Perfil</h5>
        <img src={perfilPic} alt="Foto de perfil" style={{ height: "40px" }} />
      </div>

      <div className="text-center my-3">
        <h5 className="mt-3">{user.username}</h5>
      </div>

      <div className="border p-3 rounded container">
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
            <label className="form-label">Edad:</label>
            <input
              type="number"
              className="form-control"
              placeholder={edad}
              onChange={(e) => setEdad(e.target.value)}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Estatura:</label>
            <input
              type="number"
              className="form-control"
              placeholder={estatura}
              onChange={(e) => setEstatura(e.target.value)}
            />
          </div>
          <div className="col-12">
            <label className="form-label">Peso:</label>
            <input
              type="number"
              className="form-control"
              placeholder={peso}
              onChange={(e) => setPeso(e.target.value)}
            />
          </div>
        </form>
        <div className="text-center mt-2">
          <Link to="/" className="btn btn-warning me-4">
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
  );
}

export default EditPerfil;
