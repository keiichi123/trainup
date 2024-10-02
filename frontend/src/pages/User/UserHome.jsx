import { useState } from "react";
import FragmentPerfil from "../../components/FragmentPerfil";
import FragmentRutinas from "../../components/FragmentRutinas";
import FragmentHistorial from "../../components/FragmentHistorial";
import NavBottom from "../../components/NavBottom";

function UserHome() {
  const [activeFragment, setActiveFragment] = useState("rutinas");

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
    <div>
      {renderFragment()}
      <NavBottom
        setActiveFragment={setActiveFragment}
        activeFragment={activeFragment}
      />
    </div>
  );
}

export default UserHome;
