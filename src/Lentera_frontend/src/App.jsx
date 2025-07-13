import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/user/auth/AuthPage";

function App() {
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

export default App;
