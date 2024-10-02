import { useState, useEffect } from "react";
// import { useRutinaContext } from "../hooks/useRutinaContext";
import { useAuthContext } from "../hooks/useAuthContext";
import useCreateRutina from "../hooks/useCreateRutina";
import useGetDatosRutinas from "../hooks/useGetDatosRutinas";
import logoApp from "../assets/logo_trainup1.png";
import imgFacil from "../assets/easy.gif";
import imgMedio from "../assets/normal.gif";
import imgDificil from "../assets/dificil1.gif";
import imgPersonalizado from "../assets/personalizado1.gif";

function FragmentRutinas() {
  const { user } = useAuthContext();
  const [selectedButton, setSelectedButton] = useState("Novato");
  const peso = user.peso;
  const estatura = user.estatura;
  const [imc, setImc] = useState(0);
  const [categoriaIMC, setCategoriaIMC] = useState("");
  const { createRutina, isLoading, error } = useCreateRutina();
  const { rutinasCount, totalKcal, totalMinutos, rutinas, fetchDatosRutinas } =
    useGetDatosRutinas();
  const [errorMessage, setErrorMessage] = useState("");

  const getImageUrl = () => {
    switch (selectedButton) {
      case "Novato":
        return imgFacil;
      case "Intermedio":
        return imgMedio;
      case "Extremo":
        return imgDificil;
      case "Personalizado":
        return imgPersonalizado;
      default:
        return imgFacil;
    }
  };

  useEffect(() => {
    const calculoIMC = peso / (estatura * estatura);
    setImc(calculoIMC.toFixed(1));

    let categoria = "";
    if (calculoIMC < 18.5) {
      categoria = "Bajo peso";
    } else if (calculoIMC >= 18.5 && calculoIMC < 25) {
      categoria = "Normal";
    } else if (calculoIMC >= 25 && calculoIMC < 30) {
      categoria = "Sobrepeso";
    } else {
      categoria = "Obesidad";
    }
    setCategoriaIMC(categoria);
  }, [peso, estatura]);
  const levelParameters = {
    Novato: {
      nombreNivel: "facil",
      nombreEjercicio: "cardio",
      intervalo: 7,
    },
    Intermedio: {
      nombreNivel: "medio",
      nombreEjercicio: "fuerza",
      intervalo: 5,
    },
    Extremo: {
      nombreNivel: "dificil",
      nombreEjercicio: "resistencia",
      intervalo: 1,
    },
  };

  const handleStart = async () => {
    setErrorMessage("");
    const { nombreNivel, nombreEjercicio, intervalo } =
      levelParameters[selectedButton];

    const rutinaExistente = rutinas.find(
      (rutina) => rutina.ejercicio === nombreEjercicio
    );

    if (rutinaExistente && !rutinaExistente.fecha_fin) {
      setErrorMessage("Ya tienes esa rutina creada.");
      return;
    }

    const rutina = await createRutina(nombreNivel, nombreEjercicio, intervalo);
    if (rutina) {
      await fetchDatosRutinas();
    }
  };

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <div className="container-fluid" style={{ maxWidth: "400px" }}>
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
        <h5>Ejercítate diariamente</h5>
        <img
          src={logoApp}
          alt="Logo"
          style={{ width: "100px", height: "50px" }}
        />
      </div>

      <div className="row text-center py-2">
        <div className="col">
          <h6>{rutinasCount}</h6>
          <small>Rutinas</small>
        </div>
        <div className="col">
          <h6>{totalKcal}</h6>
          <small>Kcal</small>
        </div>
        <div className="col">
          <h6>{totalMinutos}</h6>
          <small>Minutos</small>
        </div>
      </div>

      <div className="border-top py-2">
        <div className="d-flex justify-content-between align-items-center">
          <h6>IMC</h6>
          <span>{imc}</span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span>{categoriaIMC}</span>
          <span
            className="badge bg-warning"
            style={{ width: "10px", height: "10px" }}
          ></span>
        </div>
        <div className="d-flex justify-content-between mt-2">
          <small>15</small>
          <small>18.5</small>
          <small>25</small>
          <small>30</small>
          <small>35</small>
          <small>40</small>
        </div>
        <div className="progress" style={{ height: "8px" }}>
          <div className="progress-bar bg-info" style={{ width: "22%" }}></div>
          <div
            className="progress-bar bg-success"
            style={{ width: "20%" }}
          ></div>
          <div
            className="progress-bar bg-warning"
            style={{ width: "20%" }}
          ></div>
          <div
            className="progress-bar bg-danger"
            style={{ width: "38%" }}
          ></div>
        </div>
      </div>

      <div className="d-flex justify-content-between py-2 border-top">
        {["Novato", "Intermedio", "Extremo", "Personalizado"].map((level) => (
          <button
            key={level}
            className={`py-2 flex-fill m-0 ${
              selectedButton === level ? "btn-active" : ""
            }`}
            onClick={() => setSelectedButton(level)}
            style={{
              backgroundColor:
                selectedButton === level ? "#777" : "transparent",
              color: selectedButton === level ? "white" : "#555",
              cursor: "pointer",
              fontWeight: selectedButton === level ? "bold" : "normal",
            }}
          >
            {level}
          </button>
        ))}
      </div>

      <div className="text-center justify-content-center">
        <img
          src={getImageUrl()}
          alt="Ejercicio"
          className="img-fluid mx-auto"
          style={{
            borderRadius: "5px",
            maxHeight: "200px",
            objectFit: "cover",
          }}
        />
      </div>

      <div className="text-center mt-2">
        <button
          className="btn btn-primary w-50"
          onClick={handleStart}
          disabled={isLoading}
        >
          {isLoading ? "Rutina creada" : "Iniciar"}
        </button>
        <div className="error" style={{ color: "red", marginTop: "10px" }}>
          {error ? error : ""}
        </div>

        <div className="error" style={{ color: "red", marginTop: "10px" }}>
          {errorMessage || (error ? error : "")}
        </div>
      </div>
    </div>
  );
}

export default FragmentRutinas;
