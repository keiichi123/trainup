import { createContext, useReducer } from "react";

export const RutinaContext = createContext();

export const rutinaReducer = (state, action) => {
  switch (action.type) {
    case "SET_RUTINAS":
      return { rutinas: action.payload };

    case "CREATE_RUTINAS":
      return { rutinas: [action.payload, ...state.rutinas] };

    case "UPDATE_RUTINAS":
      return { rutinas: [action.payload, ...state.rutinas] };

    default:
      return state;
  }
};

export const RutinaContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rutinaReducer, { rutinas: null });
  return (
    <RutinaContext.Provider value={{ state, dispatch }}>
      {children}
    </RutinaContext.Provider>
  );
};
