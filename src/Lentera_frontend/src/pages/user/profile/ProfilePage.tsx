import React from "react";
import SidebarProfile from "../../../components/profile/SidebarProfile";
import { useAuth } from "../../../context/auth-context";
import { Navigate } from "react-router-dom";

const ProfilePage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <div></div>;
};

export default ProfilePage;
