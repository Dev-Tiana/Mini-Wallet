"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WalletProvider } from "../context/WalletContext";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { useState, useMemo, createContext, useContext } from "react";

const queryClient = new QueryClient();

// Create Theme Context
const ThemeModeContext = createContext();

export function useThemeMode() {
  return useContext(ThemeModeContext);
}

export function Providers({ children }) {
  const [mode, setMode] = useState("light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode, // "light" or "dark"
        },
      }),
    [mode]
  );

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <WalletProvider>
        <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
          <ThemeProvider theme={theme}>
            <CssBaseline /> {/* ✅ applies proper dark/light background */}
            {children}
          </ThemeProvider>
        </ThemeModeContext.Provider>
      </WalletProvider>
    </QueryClientProvider>
  );
}
