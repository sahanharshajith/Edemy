// src/context/AppContext.jsx
import React, { createContext, useState } from 'react'; // ✅ Fix

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [state, setState] = useState(null);

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};
