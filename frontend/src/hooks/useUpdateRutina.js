import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { Navigate, useNavigate } from "react-router";

export const useUpdateRutina = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const updateRutina = async (id, updatedRutina) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/rutinas/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(updatedRutina),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al actualizar la rutina.");
      }
      if (response.ok) {
        navigate("/");
      }

      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { updateRutina, isLoading, error };
};
