import { RutinaContext } from "../context/RutinaContext";
import { useContext } from "react";

export const useRutinaContext = () => {
  const context = useContext(RutinaContext);

  if (!context) {
    throw Error(
      "useRutinaContext must be used inside an RutinaContextProvider"
    );
  }

  return context;
};
