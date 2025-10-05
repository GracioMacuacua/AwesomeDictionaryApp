import React, { createContext, useState, useContext } from "react";
import { Theme, ThemeContextType } from "@/types/theme";
import { COLOR } from "@/types/theme/color";
import { THEMES } from "@constants/Themes";

const ThemeContext = createContext<ThemeContextType>({
  theme: { name: "darkblue", background: "#152439", statusbar: "#091629" },
  toggleTheme: () => {},
});

const useTheme = () => {
  return useContext(ThemeContext);
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>({
    name: "darkblue",
    background: "#152439",
    statusbar: "#091629",
  });

  const toggleTheme = (name: COLOR) => {
    const theme = THEMES[name];
    setTheme({ ...theme, name: name });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { useTheme, ThemeProvider };
