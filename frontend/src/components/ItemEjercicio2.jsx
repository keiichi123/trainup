import React, { useEffect, useState } from "react";

const ItemEjercicio2 = ({ ejercicio }) => {
  const { id_ejercicio, tiempo, repeticiones } = ejercicio;
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNombreEjercicio = async () => {
      try {
        const response = await fetch(`/api/ejercicios/id/${id_ejercicio}`);
        if (!response.ok) {
          throw new Error("Error al obtener el nombre del ejercicio");
        }
        const data = await response.json();
        setNombre(data.ejercicio.nombre);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchNombreEjercicio();
  }, [id_ejercicio]);

  if (error) return <li className="list-group-item text-danger">{error}</li>;

  return (
    <li className="list-group-item">
      {nombre ? (
        <>
          {nombre} -{" "}
          {tiempo ? `${tiempo} segundos` : `${repeticiones} repeticiones`}
        </>
      ) : (
        "Cargando..."
      )}
    </li>
  );
};

export default ItemEjercicio2;
