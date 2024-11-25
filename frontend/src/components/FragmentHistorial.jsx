import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import ItemRutina from "./ItemRutina";

function FragmentHistorial() {
  const [rutinas, setRutinas] = useState([]);
  const { user } = useAuthContext();

  const fetchRutinas = async () => {
    if (!user || !user.token) return;

    const response = await fetch("/api/rutinas/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setRutinas(data.filter((rutina) => !rutina.fecha_fin)); // Solo rutinas activas
    }
  };

  useEffect(() => {
    fetchRutinas();
  }, [user]);

  return (
    <div className="container py-4">
      {/* Título */}
      <div className="mb-3">
        <h2 className="text-center">Menú de Rutinas</h2>
        <p className="text-muted text-center">
          Aquí puedes ver todas tus rutinas
        </p>
      </div>

      {/* Listado de rutinas */}
      <div
        className="row g-4"
        style={{
          gap: "1.5rem",
        }}
      >
        {rutinas.length > 0 ? (
          rutinas.map((rutina) => (
            <div
              key={rutina._id}
              className="card shadow-sm p-3"
              style={{
                flex: "1 1 300px",
                minWidth: "400PX",
                maxWidth: "400px",
              }}
            >
              <ItemRutina rutina={rutina} />
            </div>
          ))
        ) : (
          <p className="text-center w-100">No hay rutinas disponibles</p>
        )}
      </div>
    </div>
  );
}

export default FragmentHistorial;
