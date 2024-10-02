import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import perfilPic from "../assets/perfil_pic1.png";
import iconEditar from "../assets/icon_editar.png";
import logoApp from "../assets/logo_trainup1.png";

function FragmentPerfil() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };
  return (
    <div
      className="container-fluid"
      style={{
        maxWidth: "400px",
      }}
    >
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
        <h5>Perfil</h5>
        <img
          src={logoApp}
          alt="Logo"
          style={{ width: "100px", height: "50px" }}
        />
      </div>

      <div className="text-center my-4">
        <div className="position-relative d-inline-block">
          <img
            src={perfilPic}
            alt="Foto de perfil"
            className="rounded-circle"
            style={{ width: "150px", height: "150px" }}
          />
          <Link to="/updateuser">
            <img
              src={iconEditar}
              alt="Editar perfil"
              className="position-absolute top-0 end-0"
              style={{
                width: "1.5rem",
                height: "1.5rem",
                cursor: "pointer",
                left: "120px",
              }}
            />
          </Link>
        </div>
        <h5 className="mt-3">{user.username}</h5>{" "}
      </div>

      <div className="border p-3 rounded">
        <p>
          <strong>Nombre:</strong> {user.username}
        </p>
        <p>
          <strong>Edad:</strong> {user.edad} años
        </p>
        <p>
          <strong>Estatura:</strong> {user.estatura} metros
        </p>
        <p>
          <strong>Peso:</strong> {user.peso} kg
        </p>
        <div className="text-center">
          <button onClick={handleClick} className="btn btn-danger">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}

export default FragmentPerfil;
