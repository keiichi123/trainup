import { useState } from "react";

const useGetEjercicio = () => {
  const [error, setError] = useState(null);
  const [ejercicios, setEjercicios] = useState([]);

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

  return { fetchEjerciciosByObjetivo, ejercicios, error };
};

export default useGetEjercicio;
