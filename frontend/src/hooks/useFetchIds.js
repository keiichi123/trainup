import { useState } from "react";

const useFetchIds = () => {
  const [error, setError] = useState(null);
  const [nivelId, setNivelId] = useState(null);
  const [ejercicioId, setEjercicioId] = useState(null);

  const fetchNivelId = async (nombreNivel) => {
    try {
      const response = await fetch(`/api/niveles/${nombreNivel}`);

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Error al obtener nivel ID");
        return null; // o lanza una excepción
      }

      const data = await response.json();
      setNivelId(data._id);
      return data._id;
    } catch (err) {
      setError(err.message);
      console.error("Error fetching nivel ID:", err);
    }
  };

  const fetchEjercicioId = async (nombreEjercicio) => {
    try {
      const response = await fetch(`/api/ejercicios/nombre/${nombreEjercicio}`);

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Error al obtener ejercicio ID");
        return null;
      }

      const data = await response.json();
      setEjercicioId(data._id);
      return data._id;
    } catch (err) {
      setError(err.message);
      console.error("Error fetching ejercicio ID:", err);
    }
  };

  return { fetchNivelId, fetchEjercicioId, nivelId, ejercicioId, error };
};

export default useFetchIds;
