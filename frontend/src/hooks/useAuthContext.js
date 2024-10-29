import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error(
      "useAuthContext tiene que estar dentro de un AuthContextProvider"
    );
  }

  return context;
};
