import { useState } from "react";
import iconRutina from "../assets/icon_rutina.png";
import iconHistorial from "../assets/icon_historial.png";
import iconPerfil from "../assets/icon_perfil.png";

function NavBottom({ setActiveFragment, activeFragment }) {
  const getButtonClass = (fragment) =>
    fragment === activeFragment
      ? "d-flex flex-column align-items-center text-decoration-none text-dark fw-bold"
      : "d-flex flex-column align-items-center text-decoration-none text-secondary";
  return (
    <div
      className="container-fluid bg-light fixed-bottom py-2 border rounded"
      style={{ maxWidth: "400px" }}
    >
      <div className="row justify-content-around text-center">
        <div className="col">
          <button
            onClick={() => setActiveFragment("rutinas")}
            className={getButtonClass("rutinas")}
          >
            <img src={iconRutina} alt="Rutinas" className="img-fluid w-50" />
            <span className="small">Retos</span>
          </button>
        </div>
        <div className="col">
          <button
            onClick={() => setActiveFragment("historial")}
            className={getButtonClass("historial")}
          >
            <img
              src={iconHistorial}
              alt="Historial"
              className="img-fluid w-50"
            />
            <span className="small">Rutina</span>
          </button>
        </div>
        <div className="col">
          <button
            onClick={() => setActiveFragment("perfil")}
            className={getButtonClass("perfil")}
          >
            <img src={iconPerfil} alt="Perfil" className="img-fluid w-50" />
            <span className="small">Perfil</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBottom;
