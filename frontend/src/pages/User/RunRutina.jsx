import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FrameRunEjercicio from "./FrameRunEjercicio";
import FrameDescanso from "./FrameDescanso";
import { useRutinaContext } from "../../hooks/useRutinaContext";

const RunRutina = () => {
  const { rutina, dispatch } = useRutinaContext();
  const navigate = useNavigate();

  // Verificar si la rutina está correctamente cargada
  useEffect(() => {
    if (!rutina || !rutina.ejercicios) {
      console.warn("Rutina no cargada o mal formada.");
    }
  }, [rutina]);

  if (!rutina || !rutina.ejercicios) {
    return <div className="text-center">Cargando rutina...</div>;
  }

  const { ejercicios, currentStep, totalCalorias, totalTiempo } = rutina;

  const handleFinishRutina = async () => {
    try {
      // Los divvidiré entre 2 temporalmente (puede ser causado por el StrictMode)
      const caloriasEnKcal = parseFloat(
        ((totalCalorias || 0) / 1000 / 2).toFixed(4)
      ); // De calorías a Kcal
      const tiempoEnMinutos = parseFloat(
        ((totalTiempo || 0) / 60 / 2).toFixed(4)
      ); // De segundos a minutos
      const response = await fetch("/api/sesionrutinas/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_rutina: rutina.id,
          sesion_calorias: caloriasEnKcal, // En Kcal
          sesion_tiempo: tiempoEnMinutos, // En minutos
        }),
      });

      if (!response.ok) throw new Error("Error al registrar la sesión");

      // Limpiar la rutina y redirigir al usuario
      dispatch({ type: "CLEAR_RUTINA" });
      navigate("/");
    } catch (error) {
      console.error("Error:", error.message);
      alert("Error al finalizar la rutina. Por favor, inténtalo nuevamente.");
    }
  };

  // Verificar si la rutina ha terminado
  if (currentStep >= ejercicios.length * 2 + 1) {
    handleFinishRutina();
    return <div className="text-center">¡Rutina completada!</div>;
  }

  // Calcular el índice del ejercicio actual basado en `currentStep`
  const ejercicioIndex = Math.floor(currentStep / 2) - 1;
  const isDescanso = currentStep % 2 !== 0;

  // Manejar errores de índice
  const currentEjercicio = ejercicios[ejercicioIndex] || null;
  const siguienteEjercicio = ejercicios[ejercicioIndex + 1] || null;

  return (
    <div>
      {isDescanso ? (
        <FrameDescanso siguienteEjercicio={siguienteEjercicio} />
      ) : (
        <FrameRunEjercicio ejercicio={currentEjercicio} />
      )}
    </div>
  );
};

export default RunRutina;
