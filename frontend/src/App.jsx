import React, { useState, useMemo } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  CssBaseline,
  Switch as MuiSwitch,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

import { AuthProvider } from "./contexts/AuthContext.jsx";
import { useAuth } from "./hooks/useAuth.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AuthLayout from "./components/AuthLayout.jsx";

import TransactionsPage from "./pages/TransactionsPage.jsx";
import SchoolTransactionsPage from "./pages/SchoolTransactionsPage.jsx";
import StatusCheckPage from "./pages/StatusCheckPage.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";

// --- Main App Content ---
function AppContent() {
  const [dark, setDark] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();

  // Toggle dark mode
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const nav = useMemo(
    () => [
      { to: "/", label: "Transactions" },
      { to: "/by-school", label: "By School" },
      { to: "/check-status", label: "Check Status" },
    ],
    []
  );

  return (
    <>
      <CssBaseline />

      {/* 🔹 AppBar only when logged in */}
      {isAuthenticated && (
        <AppBar position="sticky" color="inherit" elevation={1}>
          <Toolbar className="flex justify-between">
            <div className="flex items-center gap-4">
              <IconButton edge="start" aria-label="menu">
                
              </IconButton>
              <Typography
                variant="h6"
                component={Link}
                to="/"
                className="no-underline text-inherit"
              >
                School Payments Dashboard
              </Typography>
            </div>
            <div className="flex items-center gap-6">
              <nav className="hidden sm:flex gap-4">
                {nav.map((n) => (
                  <Typography
                    key={n.to}
                    component={Link}
                    to={n.to}
                    className="no-underline text-sm font-medium"
                  >
                    {n.label}
                  </Typography>
                ))}
              </nav>
              <MuiSwitch checked={dark} onChange={() => setDark((s) => !s)} />
              <div className="flex items-center gap-2">
                <Typography variant="body2">
                  Welcome, {user?.name || "User"}
                </Typography>
                <IconButton onClick={logout} color="inherit" title="Logout">
                  <LogoutIcon />
                </IconButton>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      )}

      {/* 🔹 Container adjusts depending on auth state */}
      <Container maxWidth={isAuthenticated ? "xl" : "sm"} className="py-8">
        <Routes>
          {/* Public routes (only for NOT logged in users) */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <AuthLayout title="Login">
                  <Login />
                </AuthLayout>
              )
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <AuthLayout title="Register">
                  <Register />
                </AuthLayout>
              )
            }
          />

          {/* Private routes (only when logged in) */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <TransactionsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/by-school"
            element={
              <PrivateRoute>
                <SchoolTransactionsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/check-status"
            element={
              <PrivateRoute>
                <StatusCheckPage />
              </PrivateRoute>
            }
          />

          {/* Catch-all route */}
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
          />
        </Routes>
      </Container>
    </>
  );
}

// --- Main App Wrapper ---
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}