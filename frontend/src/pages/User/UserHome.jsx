import { useEffect, useState } from "react";
import FragmentPerfil from "../../components/FragmentPerfil";
import FragmentRutinas from "../../components/FragmentRutinas";
import FragmentHistorial from "../../components/FragmentHistorial";
import NavTop from "../../components/NavTop";
import { useRutinaContext } from "../../hooks/useRutinaContext";

function UserHome() {
  const [activeFragment, setActiveFragment] = useState("rutinas");
  const { dispatch } = useRutinaContext();

  useEffect(() => {
    dispatch({ type: "CLEAR_RUTINA" });
  }, [dispatch]);

  const renderFragment = () => {
    switch (activeFragment) {
      case "perfil":
        return <FragmentPerfil />;
      case "rutinas":
        return <FragmentRutinas />;
      case "historial":
        return <FragmentHistorial />;
      default:
        return <FragmentPerfil />;
    }
  };

  return (
    <div className="vh-100 d-flex flex-column">
      {/* Barra superior de navegación */}
      <NavTop
        setActiveFragment={setActiveFragment}
        activeFragment={activeFragment}
      />
      {/* Contenido principal debajo de la barra */}
      <div className="flex-grow-1 p-3" style={{ marginTop: "80px" }}>
        {renderFragment()}
      </div>
    </div>
  );
}

export default UserHome;
