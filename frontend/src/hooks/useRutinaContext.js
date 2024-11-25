import { RutinaContext } from "../context/RutinaContext";
import { useContext } from "react";

export const useRutinaContext = () => {
  const context = useContext(RutinaContext);

  if (!context) {
    throw Error(
      "useRutinaContext debe ser utilizado dentro de un RutinaContextProvider"
    );
  }

  return context;
};
