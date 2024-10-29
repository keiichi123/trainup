import React from "react";

const ItemEjercicio = ({ ejercicio }) => {
  const { nombre, tiempo, repeticiones } = ejercicio;

  return (
    <li className="list-group-item">
      {nombre} -{" "}
      {tiempo ? `${tiempo} segundos` : `${repeticiones} repeticiones`}
    </li>
  );
};

export default ItemEjercicio;
