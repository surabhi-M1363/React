import React, { createContext, useState, useContext } from "react";
import './ThemeContext.css';

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};


const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={typeof theme === "string" ? theme : "light"}>
        {React.Children.toArray(children)} 
      </div>
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };