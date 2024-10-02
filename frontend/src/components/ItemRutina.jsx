function ItemRutina({ rutina }) {
  return (
    <div className="container_fluid border rounded p-3 m-3">
      <h5>Ejercicio: </h5>
      <p>{rutina.ejercicio}</p>
      <h5>Nivel</h5>
      <p>{rutina.nivel}</p>
    </div>
  );
}

export default ItemRutina;
