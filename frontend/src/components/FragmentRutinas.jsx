import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import useGetDatosRutinas from "../hooks/useGetDatosRutinas";
import { useNavigate } from "react-router-dom";

import imgFacil from "../assets/easy.gif";
import imgMedio from "../assets/normal.gif";
import imgDificil from "../assets/dificil1.gif";
import imgPersonalizado from "../assets/personalizado1.gif";
import iconPesas from "../assets/pesas.png";
import iconCalorias from "../assets/calorias.png";
import iconReloj from "../assets/reloj.png";

function FragmentRutinas() {
  const { user } = useAuthContext();
  const systmedida = user.systmedida;
  const peso = user.peso;
  const estatura = user.estatura;

  const [selectedButton, setSelectedButton] = useState("Novato");
  const [imc, setImc] = useState(0);
  const [categoriaIMC, setCategoriaIMC] = useState("");
  const { rutinasCount, totalKcal, totalMinutos } = useGetDatosRutinas();
  const navigate = useNavigate();

  const getImageUrl = () => {
    switch (selectedButton) {
      case "Novato":
        return imgFacil;
      case "Intermedio":
        return imgMedio;
      case "Avanzado":
        return imgDificil;
      case "Personalizado":
        return imgPersonalizado;
      default:
        return imgFacil;
    }
  };

  useEffect(() => {
    let pesoEnKg = peso;
    let estaturaEnM = estatura;

    if (!systmedida) {
      pesoEnKg = peso * 0.453592;
      estaturaEnM = estatura * 0.0254;
    } else {
      estaturaEnM = estatura / 100;
    }

    const calculoIMC = pesoEnKg / (estaturaEnM * estaturaEnM);
    setImc(calculoIMC.toFixed(1));

    if (calculoIMC < 18.5) setCategoriaIMC("Bajo peso");
    else if (calculoIMC < 25) setCategoriaIMC("Normal");
    else if (calculoIMC < 30) setCategoriaIMC("Sobrepeso");
    else setCategoriaIMC("Obesidad");
  }, [peso, estatura, systmedida]);

  const handleStart = () => {
    if (selectedButton === "Personalizado") {
      navigate("/createrutinaper");
    } else {
      navigate("/createrutinabase", { state: { selectedButton } });
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ marginTop: "-80px" }}
    >
      <div className="container py-4">
        <div
          className="row g-4 align-items-center"
          style={{ minHeight: "80vh" }}
        >
          {/* Sección izquierda: Estadísticas */}
          <div className="col-md-4" style={{ height: "400px" }}>
            <div
              className="card shadow-sm p-4"
              style={{ height: "100%", backgroundColor: "#ffffff" }}
            >
              <h5 className="text-center mb-3">Progreso Total</h5>
              <div className="d-flex justify-content-around text-center mb-4">
                <div>
                  <img
                    src={iconPesas}
                    alt="Icono pesas"
                    className="img-fluid mb-2"
                    style={{ width: "40px" }}
                  />
                  <h6 className="mt-2">{rutinasCount}</h6>
                  <small>Rutinas</small>
                </div>
                <div>
                  <img
                    src={iconCalorias}
                    alt="Icono calorías"
                    className="img-fluid mb-2"
                    style={{ width: "40px" }}
                  />
                  <h6 className="mt-2">{totalKcal}</h6>
                  <small>Kcal</small>
                </div>
                <div>
                  <img
                    src={iconReloj}
                    alt="Icono reloj"
                    className="img-fluid mb-2"
                    style={{ width: "40px" }}
                  />
                  <h6 className="mt-2">{totalMinutos}</h6>
                  <small>Minutos</small>
                </div>
              </div>

              <h6 className="text-center">IMC: {categoriaIMC}</h6>
              <div className="progress mb-3" style={{ height: "8px" }}>
                <div
                  className="progress-bar bg-info"
                  style={{ width: `${(imc / 40) * 100}%` }}
                ></div>
              </div>
              <div className="text-center">
                <small>
                  {imc} kg/m² - {categoriaIMC}
                </small>
              </div>
            </div>
          </div>

          {/* Sección central: Selector de nivel */}
          <div className="col-md-4" style={{ height: "400px" }}>
            <div
              className="card shadow-sm p-4 text-center"
              style={{ height: "100%", backgroundColor: "#ffffff" }}
            >
              <h5 className="mb-4">Selecciona tu nivel</h5>
              <div className="d-grid gap-2">
                {["Novato", "Intermedio", "Avanzado", "Personalizado"].map(
                  (level) => (
                    <button
                      key={level}
                      className={`btn ${
                        selectedButton === level
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                      style={{
                        fontWeight: "500",
                        borderRadius: "8px",
                        padding: "12px",
                      }}
                      onClick={() => setSelectedButton(level)}
                    >
                      {level}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Sección derecha: Imagen y acción */}
          <div className="col-md-4" style={{ height: "400px", width: "400px" }}>
            <div
              className="card shadow-sm text-center p-4"
              style={{ height: "100%", backgroundColor: "#ffffff" }}
            >
              <h5 className="mb-3">Inicia tu Rutina</h5>
              <img
                src={getImageUrl()}
                alt="Nivel seleccionado"
                className="img-fluid rounded mb-3"
                style={{ maxHeight: "250px" }}
              />
              <button
                className="btn btn-success w-100"
                style={{
                  fontWeight: "500",
                  borderRadius: "8px",
                  padding: "12px",
                }}
                onClick={handleStart}
                disabled={selectedButton === ""}
              >
                Iniciar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FragmentRutinas;
