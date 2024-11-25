import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import perfilPic from "../assets/perfil_pic1.png";
import iconEditar from "../assets/icon_editar.png";
import fondo_workout from "../assets/workout_bg.gif";

function FragmentPerfil() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  // Función para calcular la edad según la fecha de nacimiento
  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    return edad;
  };

  // Función para convertir cm a m
  const convertirCmAMetros = (cm) => (cm / 100).toFixed(2);

  // Función para convertir in a ft y in
  const convertirInAPiesYPulgadas = (inches) => {
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    return `${feet}'${remainingInches} ft`;
  };

  return (
    <div className="container py-4">
      <div className="row g-4 align-items-center">
        {/* Columna izquierda: Foto y acciones */}
        <div className="col-md-4 text-center">
          <div className="position-relative d-inline-block">
            <img
              src={perfilPic}
              alt="Foto de perfil"
              className="rounded-circle border shadow"
              style={{ width: "300px", height: "300px" }}
            />
            <Link to="/updateuser">
              <img
                src={iconEditar}
                alt="Editar perfil"
                className="position-absolute"
                style={{
                  width: "2rem",
                  height: "2rem",
                  cursor: "pointer",
                  bottom: "10px",
                  right: "10px",
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = "scale(1.3)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "scale(1)";
                }}
              />
            </Link>
          </div>
          <h4 className="mt-3">{user.username}</h4>
          <button onClick={handleClick} className="btn btn-danger mt-3">
            Cerrar Sesión
          </button>
        </div>

        {/* Columna derecha: Datos del usuario */}
        <div className="col-md-8">
          <div
            className="border rounded p-4 shadow-sm"
            style={{
              backgroundImage: `url(${fondo_workout})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: "0.9",
            }}
          >
            <h5 className="mb-4">Datos del Usuario</h5>
            <p>
              <strong>Nombre:</strong> {user.username}
            </p>
            <p>
              <strong>Edad:</strong> {calcularEdad(user.edad)} años
            </p>
            <p>
              <strong>Estatura:</strong>{" "}
              {user.systmedida
                ? `${convertirCmAMetros(user.estatura)} m`
                : convertirInAPiesYPulgadas(user.estatura)}
            </p>
            <p>
              <strong>Peso:</strong> {user.peso} {user.systmedida ? "kg" : "lb"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FragmentPerfil;
