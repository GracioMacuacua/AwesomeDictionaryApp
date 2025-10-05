import { COLOR } from "./color"

export type ThemeProps = {
  [themeName in COLOR]: {
    background: string;
    statusbar: string;
  };
};

export type Theme = {
  name: COLOR;
  background: string;
  statusbar: string;
};

export type ThemeContextType = {
  theme: Theme;
  toggleTheme: (name: COLOR) => void;
};
