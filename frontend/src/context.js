import React, { useState, useContext, createContext } from "react";

const AppContext = createContext();

const ApiProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
export default ApiProvider;
