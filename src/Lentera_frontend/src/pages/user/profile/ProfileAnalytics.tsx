import React, { useEffect } from "react";
import { useAuth } from "../../../context/auth-context";
import { Navigate } from "react-router-dom";
import useJournal from "../../../hooks/useJournal";

const ProfileAnalytics = () => {
  // const { isAuthenticated } = useAuth();

  const { mentalState, fetchMyMentalStates } = useJournal()

  useEffect(() => {
    fetchMyMentalStates()
  }, [fetchMyMentalStates])

  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }
  return (
    <div>
      {mentalState?.labelEmotion}
    </div>
  ) 
};

export default ProfileAnalytics;
