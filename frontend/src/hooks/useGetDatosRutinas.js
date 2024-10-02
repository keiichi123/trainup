import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

const useGetDatosRutinas = () => {
  const [rutinasCount, setRutinasCount] = useState(0);
  const [totalKcal, setTotalKcal] = useState(0);
  const [totalMinutos, setTotalMinutos] = useState(0);
  const [rutinas, setRutinas] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  const fetchDatosRutinas = async () => {
    if (!user) return;

    try {
      const response = await fetch("/api/rutinas/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const rutinasData = await response.json();

      if (response.ok) {
        setRutinasCount(rutinasData.length);
        setRutinas(rutinasData);

        let totalKcalSum = 0; // Acumular calorías totales
        let totalMinutosSum = 0; // Acumular minutos totales

        for (const rutina of rutinasData) {
          const sesionResponse = await fetch(
            `/api/sesionrutinas/rutina/${rutina._id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );

          const sesionesData = await sesionResponse.json();

          sesionesData.forEach((SesionRutina) => {
            totalKcalSum += SesionRutina.sesion_calorias;
            totalMinutosSum += SesionRutina.sesion_tiempo;
          });
        }
        totalKcalSum = totalKcalSum / rutinasData.length; //trucoteca
        totalMinutosSum = totalMinutosSum / rutinasData.length; //iron man

        setTotalKcal(totalKcalSum);
        setTotalMinutos(totalMinutosSum);
      } else {
        setError(rutinasData.error);
      }
    } catch (err) {
      setError("Error al obtener los datos de las rutinas.");
    }
  };

  useEffect(() => {
    fetchDatosRutinas();
  }, [user]);

  return {
    rutinasCount,
    totalKcal,
    totalMinutos,
    rutinas,
    fetchDatosRutinas,
    error,
  };
};

export default useGetDatosRutinas;
