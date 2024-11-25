import React from "react";
import iconRutina from "../assets/icon_rutina.png";
import iconHistorial from "../assets/icon_historial.png";
import iconPerfil from "../assets/icon_perfil.png";
import logoApp from "../assets/logo_trainup1.png";

function NavTop({ setActiveFragment, activeFragment }) {
  const getButtonClass = (fragment) =>
    fragment === activeFragment
      ? "d-flex flex-column align-items-center text-decoration-none text-dark fw-bold"
      : "d-flex flex-column align-items-center text-decoration-none text-secondary";

  return (
    <div className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        {/* Logo a la izquierda */}
        <div className="d-flex align-items-center">
          <img
            src={logoApp}
            alt="Logo"
            style={{ width: "160px", height: "80px" }}
          />
        </div>

        {/* Botones centrados completamente en la pantalla */}
        <div
          className="d-flex justify-content-center align-items-center w-100"
          style={{
            flex: "1 1 auto",
            justifyContent: "space-around", // Aumentar la distancia entre los botones
            gap: "80px", // Ajustar el espacio entre los botones
            alignItems: "center",
            marginLeft: "-160px",
          }}
        >
          <button
            onClick={() => setActiveFragment("rutinas")}
            className={getButtonClass("rutinas")}
          >
            <img
              src={iconRutina}
              alt="Rutinas"
              className="img-fluid"
              style={{ width: "50px" }}
            />
            <span className="medium">Home</span>
          </button>
          <button
            onClick={() => setActiveFragment("historial")}
            className={getButtonClass("historial")}
          >
            <img
              src={iconHistorial}
              alt="Historial"
              className="img-fluid"
              style={{ width: "50px" }}
            />
            <span className="medium">Rutina</span>
          </button>
          <button
            onClick={() => setActiveFragment("perfil")}
            className={getButtonClass("perfil")}
          >
            <img
              src={iconPerfil}
              alt="Perfil"
              className="img-fluid"
              style={{ width: "50px" }}
            />
            <span className="madium">Perfil</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavTop;
