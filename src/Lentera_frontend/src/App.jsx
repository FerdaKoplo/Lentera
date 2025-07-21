import { useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import AuthPage from "./pages/user/auth/AuthPage";
import { AuthProvider, useAuth } from "./context/auth-context";
import EditProfile from "./pages/user/profile/EditProfile";
import ProfileLayout from "./layouts/ProfileLayout";
import ProfilePage from "./pages/user/profile/ProfilePage";
import ProfileAnalytics from "./pages/user/profile/ProfileAnalytics";
import SideBarPrincipal from "./components/principal/sidebar-principal";
import CreateArticle from "./pages/principal/articles/create-article";
import ProfileJournal from "./pages/user/profile/ProfileJournal";
import CreateMoodPage from "./pages/journal/CreateMoodPage";
import CreateJournalPage from "./pages/journal/CreateJournalPage";

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
      <Route
        path="/edit-profile"
        element={
          isAuthenticated ? <EditProfile /> : <Navigate to="/login" replace />
        }
      />
      <Route path="/profile" element={<ProfileLayout />}>
        <Route index element={<ProfilePage />} />
        <Route path="analytics" element={<ProfileAnalytics />} />
        <Route path="journals" element={<ProfileJournal />} />
      </Route>
      <Route
        path="/create-journal"
        element={
          isAuthenticated ? (
            <CreateMoodPage />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/create-journal/details"
        element={
          isAuthenticated ? (
            <CreateJournalPage />
          ) : (
            <Navigate to="/login" replace />
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
