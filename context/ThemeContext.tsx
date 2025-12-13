import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme, ThemeContextType } from "@/types/theme";
import { COLOR } from "@/types/theme/color";
import { THEMES } from "@constants/Themes";

const STORAGE_KEY = "theme";
const DEFAULT_THEME: Theme = {
  name: "darkblue",
  background: "#152439",
  statusbar: "#091629",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
  }

  return context;
};

const getStoredTheme = async (): Promise<Theme | null> => {
  try {
    const storedTheme = await AsyncStorage.getItem(STORAGE_KEY);

    if (!storedTheme) {
      return null;
    }

    return JSON.parse(storedTheme) as Theme;
  } catch (error) {
    console.error("Erro ao recuperar tema armazenado:", error);
    return null;
  }
};

const storeTheme = async (theme: Theme): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
  } catch (error) {
    console.error("Erro ao armazenar tema:", error);
  }
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await getStoredTheme();

      if (storedTheme) {
        setTheme(storedTheme);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = (name: COLOR) => {
    const selectedTheme = THEMES[name];

    if (!selectedTheme) {
      console.warn(`Tema "${name}" não encontrado`);
      return;
    }

    const newTheme: Theme = { ...selectedTheme, name };

    setTheme(newTheme);
    storeTheme(newTheme);
  };

  const value: ThemeContextType = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export { useTheme, ThemeProvider };
