import React, { createContext, useState, useContext } from "react";
import { COLORS, THEMES } from "../constants/Themes";

export type Theme = {
  name: COLORS;
  background: string;
  statusbar: string;
};

export type ThemeContextType = {
  theme: Theme;
  toggleTheme: (name: COLORS) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: { name: "darkblue", background: "#152439", statusbar: "#091629" },
  toggleTheme: () => {},
});

const _useTheme = () => {
  return useContext(ThemeContext);
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>({
    name: "darkblue",
    background: "#152439",
    statusbar: "#091629",
  });

  const toggleTheme = (name: COLORS) => {
    const theme = THEMES[name];
    setTheme({ ...theme, name: name });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { _useTheme, ThemeProvider };
