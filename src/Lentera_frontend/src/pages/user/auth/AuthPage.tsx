import React, { useEffect, useRef } from "react";
import { useAuth } from "../../../context/auth-context";
import LoginButton from "../../../components/auth/LoginButton";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const { user, isAuthenticated, isLoading, error, login } = useAuth();
  const navigate = useNavigate();
  const hasRedirectedRef = useRef(false);

  const handleLogin = async () => {
    const loggedInUser = await login();
  };

  useEffect(() => {
    if (
      !hasRedirectedRef.current &&
      isAuthenticated &&
      !isLoading &&
      user !== null
    ) {
      const needsProfile = !user.hasProfile;
      console.log("Redirecting based on hasProfile:", needsProfile);
      hasRedirectedRef.current = true;
      navigate(needsProfile ? "/edit-profile" : "/homepage", {
        replace: true,
      });
    }
  }, [isAuthenticated, isLoading, user, navigate]);

  // useEffect(() => {
  //   console.log("DEBUG: ", { isAuthenticated, isLoading, user });
  // }, [isAuthenticated, isLoading, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-500 text-lg">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFFFD] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-90 h-90 opacity-30">
          <img
            src="/assets/flower.svg"
            alt="Decorative flower"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] opacity-30">
          <img
            src="/assets/flower.svg"
            alt="Decorative flower"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center w-full">
          {!isAuthenticated ? (
            <>
              <h1 className="text-4xl md:text-7xl font-montserrat  bg-gradient-to-t from-[#9ee0c991] to-[#65C3A6] font-bold  mb-4 bg-clip-text text-transparent">
                Welcome To Lentera
              </h1>
              <p className="text-gray-600 text-lg mb-8 font-montserrat font-normal">
                continue your discovery with internet identity login
              </p>
              <div className="flex justify-center">
                <LoginButton onClick={handleLogin} />
              </div>
            </>
          ) : (
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-light text-teal-400 mb-4">
                Welcome To Lentera
              </h1>
              <p className="text-gray-600 text-lg">Welcome, redirecting...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
