import { useState } from "react";

const useFetchNivel = () => {
  const [error, setError] = useState(null);
  const [nivelId, setNivelId] = useState(null);

  const fetchNivelId = async (nombreNivel) => {
    try {
      const response = await fetch(`/api/niveles/${nombreNivel}`);

      if (!response.ok) {
        const data = await response1.json();
        setError(data.error || "Error al obtener nivel ID");
      }

      const data = await response.json();
      setNivelId(data._id);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching nivel ID:", error);
    }
  };
  return { fetchNivelId, nivelId, error };
};

export default useFetchNivel;
