import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AuthPage from "./pages/user/auth/AuthPage";
import { AuthProvider, useAuth } from "./context/auth-context";

function AppRoutes() {
  const { isAuthenticated, isLoading, user } = useAuth();
  if (isLoading) return <p>Loading...</p>;
  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to={user?.hasProfile ? "/" : "/edit-profile"} replace />
          ) : (
            <AuthPage />
          )
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
