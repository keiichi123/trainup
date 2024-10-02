import { useState } from "react";
import { useRutinaContext } from "./useRutinaContext";
import { useAuthContext } from "./useAuthContext";

const useCreateRutina = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useRutinaContext();
  const { user } = useAuthContext();

  const createRutina = async (nivel, ejercicio, intervalo) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/rutinas/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_usuario: user._id,
        ejercicio: ejercicio,
        nivel: nivel,
        fecha_inicio: new Date(),
        intervalo: intervalo,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      await createSesionRutina(data._id, nivel);
      setIsLoading(true);
      return data;
    } else {
      setIsLoading(false);
      setError(data.error);
    }
  };

  const createSesionRutina = async (id_rutina, nombreNivel) => {
    let calorias, tiempo;

    switch (nombreNivel) {
      case "facil":
        calorias = 30;
        tiempo = 5;
        break;
      case "normal":
        calorias = 60;
        tiempo = 10;
        break;
      case "dificil":
        calorias = 90;
        tiempo = 15;
        break;
      default:
        calorias = 60;
        tiempo = 10;
    }

    const response = await fetch("/api/sesionrutinas/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_rutina,
        sesion_calorias: calorias,
        sesion_tiempo: tiempo,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setIsLoading(false);
      return data;
    } else {
      setIsLoading(false);
      setError(data.error);
    }
  };

  return { createRutina, createSesionRutina, isLoading, error };
};

export default useCreateRutina;
