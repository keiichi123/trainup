import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUpdateRutina } from "../../hooks/useUpdateRutina";
import logoApp from "../../assets/logo_trainup1.png";

function EditRutina() {
  const { user } = useAuthContext();
  const { id } = useParams();
  const { updateRutina, isLoading, error } = useUpdateRutina();
  const navigate = useNavigate();

  const [ejercicio, setEjercicio] = useState("");
  const [nivel, setNivel] = useState("");
  const [intervalo, setIntervalo] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [fechaFin, setFechaFin] = useState("");

  useEffect(() => {
    const fetchRutina = async () => {
      const response = await fetch(`/api/rutinas/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEjercicio(data.ejercicio);
        setNivel(data.nivel);
        setIntervalo(data.intervalo);
      }
    };

    fetchRutina();
  }, [id, user.token]);

  const handleClick = async (e) => {
    e.preventDefault();
    const updatedRutina = { ejercicio, nivel, intervalo };
    await updateRutina(id, updatedRutina);
  };

  const handleFinalizarRutina = async () => {
    const fecha_fin = new Date().toISOString();
    const response = await fetch(`/api/rutinas/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ fecha_fin }),
    });

    if (response.ok) {
      setShowModal(false);
      navigate("/");
    }
  };

  return (
    <div className="container-fluid" style={{ maxWidth: "400px" }}>
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
        <h5 className="mb-0">Editar Rutina</h5>
        <img
          src={logoApp}
          alt="Logo de trainup"
          style={{ width: "100px", height: "50px" }}
        />
      </div>

      <div className="text-center my-3">
        <h5 className="mt-3">Rutina: {ejercicio}</h5>
      </div>

      <div className="text-center mb-3">
        <button className="btn btn-danger" onClick={() => setShowModal(true)}>
          Finalizar Rutina
        </button>
      </div>

      <div className="border p-3 rounded container">
        <form className="row g-3">
          <div className="col-12">
            <label className="form-label">Nivel:</label>
            <select
              className="form-control"
              value={nivel}
              onChange={(e) => setNivel(e.target.value)}
            >
              <option value="facil">fácil</option>
              <option value="medio">medio</option>
              <option value="dificil">difícil</option>
            </select>
          </div>
          <div className="col-12">
            <label className="form-label">Intervalo (días):</label>
            <input
              type="number"
              className="form-control"
              value={intervalo}
              onChange={(e) => setIntervalo(Number(e.target.value))}
            />
          </div>
        </form>
        <div className="text-center mt-2">
          <Link to="/" className="btn btn-warning me-4">
            Cancelar
          </Link>
          <button
            onClick={handleClick}
            className="btn btn-success"
            disabled={isLoading}
          >
            {isLoading ? "Guardando..." : "Guardar"}
          </button>
        </div>
        <div className="error" style={{ color: "red", marginTop: "10px" }}>
          {error ? error : ""}
        </div>
      </div>

      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar Finalización</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>¿Estás seguro de que deseas finalizar esta rutina?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleFinalizarRutina}
                >
                  Finalizar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditRutina;
