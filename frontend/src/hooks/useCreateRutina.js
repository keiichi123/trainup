import { useState } from "react";
import { useRutinaContext } from "./useRutinaContext";
import { useAuthContext } from "./useAuthContext";

const useCreateRutina = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useRutinaContext();
  const { user } = useAuthContext();

  const createRutina = async (intensidad, nombreRutina, intervalo) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/rutinas/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_usuario: user._id,
        nombre: nombreRutina,
        intensidad: intensidad,
        fecha_inicio: new Date(),
        intervalo: intervalo,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      await createRutinaEjercicio(data._id, intensidad, nombreRutina);
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

  const createRutinaPer = async (
    intensidad,
    nombreRutina,
    intervalo,
    ejercicios
  ) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/rutinas/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_usuario: user._id,
        nombre: nombreRutina,
        intensidad: intensidad,
        fecha_inicio: new Date(),
        intervalo: intervalo,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      await createRutinaEjercicioPer(data._id, ejercicios);
      setIsLoading(false);
      return data;
    } else {
      setIsLoading(false);
      setError(data.error);
    }
  };

  const createRutinaEjercicioPer = async (id_rutina, ejercicios) => {
    for (const { nombre, tiempo, repeticiones } of ejercicios) {
      await fetch("/api/rutinaejercicios/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_rutina,
          nombre: nombre,
          tiempo: tiempo || null,
          repeticiones: repeticiones || null,
        }),
      });
    }
  };

  const createRutinaEjercicio = async (id_rutina, intensidad, objetivo) => {
    const ejerciciosPorObjetivo = {
      "Rutina para Perder Peso": {
        baja: [
          { nombre: "Saltar la cuerda", tiempo: 30 },
          { nombre: "Sentadillas con peso corporal", repeticiones: 15 },
          { nombre: "Plancha", tiempo: 15 },
          { nombre: "Elevación de talones", repeticiones: 15 },
        ],
        media: [
          { nombre: "Caminata rápida", tiempo: 60 },
          { nombre: "Sentadillas con peso corporal", repeticiones: 20 },
          { nombre: "Plancha", tiempo: 25 },
          { nombre: "Mountain Climbers", repeticiones: 30 },
          { nombre: "Danza aeróbica", tiempo: 45 },
          { nombre: "Jumping Jacks", repeticiones: 25 },
          { nombre: "Elevación de talones", repeticiones: 20 },
        ],
        alta: [
          { nombre: "Caminata rápida", tiempo: 90 },
          { nombre: "Saltar la cuerda", tiempo: 60 },
          { nombre: "Burpees", repeticiones: 30 },
          { nombre: "Sentadillas con peso corporal", repeticiones: 30 },
          { nombre: "Zancadas alternas", repeticiones: 25 },
          { nombre: "Plancha", tiempo: 30 },
          { nombre: "Mountain Climbers", repeticiones: 50 },
          { nombre: "Danza aeróbica", tiempo: 60 },
          { nombre: "Jumping Jacks", repeticiones: 30 },
          { nombre: "Elevación de talones", repeticiones: 25 },
        ],
      },
      "Rutina para Tonificarte": {
        baja: [
          { nombre: "Plancha lateral", tiempo: 10 },
          { nombre: "Elevaciones de cadera", repeticiones: 12 },
          { nombre: "Circuito de abdominales", tiempo: 10 },
          { nombre: "Elevaciones de hombros con mancuernas", repeticiones: 15 },
        ],
        media: [
          { nombre: "Flexiones de brazos", repeticiones: 15 },
          { nombre: "Plancha lateral", tiempo: 15 },
          { nombre: "Remo con mancuerna", repeticiones: 10 },
          { nombre: "Circuito de abdominales", tiempo: 20 },
          { nombre: "Patadas de glúteos", repeticiones: 20 },
          { nombre: "Ciclismo estacionario", tiempo: 45 },
          { nombre: "Elevaciones de hombros con mancuernas", repeticiones: 20 },
        ],
        alta: [
          { nombre: "Flexiones de brazos", repeticiones: 20 },
          { nombre: "Plancha lateral", tiempo: 20 },
          { nombre: "Remo con mancuerna", repeticiones: 15 },
          { nombre: "Elevaciones de cadera", repeticiones: 20 },
          { nombre: "Jumping Jacks", repeticiones: 30 },
          { nombre: "Circuito de abdominales", tiempo: 30 },
          { nombre: "Patadas de glúteos", repeticiones: 30 },
          { nombre: "Ciclismo estacionario", tiempo: 60 },
          { nombre: "Elevaciones de hombros con mancuernas", repeticiones: 25 },
          { nombre: "Estiramientos dinámicos", tiempo: 20 },
        ],
      },
      "Rutina de Volumen": {
        baja: [
          { nombre: "Levantamiento de pesas", repeticiones: 10 },
          { nombre: "Press de banca", repeticiones: 10 },
          { nombre: "Circuito de mancuernas", tiempo: 10 },
          { nombre: "Abdominales con peso", repeticiones: 12 },
        ],
        media: [
          { nombre: "Levantamiento de pesas", repeticiones: 15 },
          { nombre: "Prensa de piernas", repeticiones: 15 },
          { nombre: "Peso muerto", repeticiones: 12 },
          { nombre: "Press de banca", repeticiones: 12 },
          { nombre: "Sentadilla frontal", repeticiones: 12 },
          { nombre: "Circuito de mancuernas", tiempo: 15 },
          { nombre: "Press militar", repeticiones: 12 },
        ],
        alta: [
          { nombre: "Levantamiento de pesas", repeticiones: 20 },
          { nombre: "Prensa de piernas", repeticiones: 18 },
          { nombre: "Dominadas", repeticiones: 15 },
          { nombre: "Peso muerto", repeticiones: 15 },
          { nombre: "Press de banca", repeticiones: 15 },
          { nombre: "Sentadilla frontal", repeticiones: 15 },
          { nombre: "Remo en barra", repeticiones: 20 },
          { nombre: "Circuito de mancuernas", tiempo: 20 },
          { nombre: "Press militar", repeticiones: 15 },
          { nombre: "Abdominales con peso", repeticiones: 20 },
        ],
      },
    };

    // Selección de ejercicios según el objetivo e intensidad
    const ejerciciosSeleccionados = ejerciciosPorObjetivo[objetivo][intensidad];

    if (!ejerciciosSeleccionados) {
      console.error(
        "No se encontraron ejercicios para el objetivo o la intensidad seleccionados."
      );
      return;
    }

    // Itera sobre los ejercicios seleccionados y envía cada uno con sus propiedades
    for (const ejercicio of ejerciciosSeleccionados) {
      const { nombre, tiempo, repeticiones } = ejercicio;

      // Realiza la solicitud POST para cada ejercicio
      const response = await fetch("/api/rutinaejercicios/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_rutina,
          nombre,
          tiempo: tiempo || null,
          repeticiones: repeticiones || null,
        }),
      });

      const data = await response.json();

      // Manejo de respuesta
      if (!response.ok) {
        console.error(`Error al crear rutina de ejercicio: ${data.error}`);
      }
    }
  };

  return {
    createRutina,
    createRutinaPer,
    createSesionRutina,
    isLoading,
    error,
  };
};

export default useCreateRutina;
