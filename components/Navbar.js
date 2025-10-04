"use client";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeMode } from "../app/providers";

export default function Navbar() {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mini Wallet
        </Typography>
        <Button color="inherit" component={Link} href="/">
          Home
        </Button>
        <Button color="inherit" component={Link} href="/transactions">
          Transactions
        </Button>
        <IconButton color="inherit" onClick={toggleTheme}>
          {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
