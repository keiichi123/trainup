import { createContext, useReducer } from "react";

export const RutinaContext = createContext();

export const rutinaReducer = (state, action) => {
  switch (action.type) {
    case "SET_RUTINA":
      return { rutina: action.payload };
    case "CLEAR_RUTINA":
      return { rutina: null };
    case "UPDATE_RUTINA":
      return { rutina: { ...state.rutina, ...action.payload } };
    default:
      return state;
  }
};

export const RutinaContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rutinaReducer, {
    rutina: null,
  });

  console.log("RutinaContext state: ", state);

  return (
    <RutinaContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RutinaContext.Provider>
  );
};
