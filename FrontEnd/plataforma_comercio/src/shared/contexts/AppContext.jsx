import { createContext, useContext } from "react";

export const AppContext = createContext(null);



export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error("Não está dentro do contexto");
  return context;
}
