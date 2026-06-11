import { createContext, useState } from "react";
import { labs } from "../data/labs";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [laboratories, setLaboratories] = useState(labs);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AppContext.Provider value={{ laboratories, setLaboratories, isSidebarOpen, setSidebarOpen }}>
      {children}
    </AppContext.Provider>
  );
};
