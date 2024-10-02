import { useState } from "react";

const useFetchEjercicio = () => {
  const [error, setError] = useState(null);
  const [ejercicioId, setEjercicioId] = useState(null);

  const fetchEjercicioId = async (nombreEjercicio) => {
    try {
      const response = await fetch(`/api/ejercicios/nombre/${nombreEjercicio}`);
      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Error al obtener ejercicio ID");
      }

      const data = await response.json();
      setEjercicioId(data._id);
      console.log("id:", data._id);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching ejercicio ID:", error);
    }
  };
  return { fetchEjercicioId, ejercicioId, error };
};

export default useFetchEjercicio;
