import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | 'system';


type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}


type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null
}

const ThemePoviderContext = createContext<ThemeProviderState>(initialState);


export function ThemeProvider({ children, defaultTheme = "system", storageKey = "vite-ui-them", ...props }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) || defaultTheme);

  useEffect(() => {
    const root = window.document.documentElement;  // get the root
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme])


  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    }
  }

  return <ThemePoviderContext.Provider {...props} value={value}>
    {children}
  </ThemePoviderContext.Provider>
}


export const useTheme = () => {
  const context = useContext(ThemePoviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context;
}





