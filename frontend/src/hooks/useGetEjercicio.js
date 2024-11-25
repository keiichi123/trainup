import { useState } from "react";

const useGetEjercicio = () => {
  const [error, setError] = useState(null);
  const [ejercicios, setEjercicios] = useState([]);
  const [ejercicio, setEjercicio] = useState(null);

  // Obtener ejercicios por objetivo
  const fetchEjerciciosByObjetivo = async (objetivo) => {
    try {
      const response = await fetch(`/api/ejercicios/objetivo/${objetivo}`);
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Error al obtener ejercicios");
        return;
      }
      const data = await response.json();
      setEjercicios(data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching ejercicios by objetivo:", error);
    }
  };

  // Obtener un ejercicio por su ID
  const getEjercicioById = async (id) => {
    try {
      const response = await fetch(`/api/ejercicios/id/${id}`);
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Error al obtener el ejercicio");
        return;
      }
      const data = await response.json();
      setEjercicio(data.ejercicio);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching ejercicio by ID:", error);
    }
  };

  return {
    fetchEjerciciosByObjetivo,
    getEjercicioById,
    ejercicios,
    ejercicio,
    error,
  };
};

export default useGetEjercicio;
