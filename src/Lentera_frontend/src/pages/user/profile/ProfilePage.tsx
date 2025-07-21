import React from "react";
import { useAuth } from "../../../context/auth-context";
import { Navigate, useNavigate } from "react-router-dom";
import { useProfile } from "../../../hooks/useProfile";
import { Principal } from "@dfinity/principal";

const ProfilePage = () => {
  const { isAuthenticated } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/edit-profile");
  };

  const createdAtFormatted =
    profile?.createdAt && profile.createdAt.length > 0
      ? new Date(Number(profile.createdAt[0]) / 1_000_000).toLocaleDateString(
          "id-ID",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        )
      : "Unknown";

  /*  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  } */

  return (
    <div className="  flex items-center justify-center w-full h-full bg-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-90 h-90 opacity-30">
          <img
            src="/assets/flower.svg"
            alt="Decorative flower"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="absolute bottom-0 left-52 w-[250px] h-[250px] opacity-30">
          <img
            src="/assets/flower.svg"
            alt="Decorative flower"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <div className="flex flex-col items-center gap-6">
        <img
          src={profile?.avatar[0] ?? "/assets/profile-dummy.svg"}
          alt=""
          className="h-40 w-40 rounded-full"
        />

        <div className="flex items-center gap-2">
          <h1 className="font-montserrat font-bold text-6xl">
            @{profile?.username}
          </h1>
          <img
            src="assets/pen.svg"
            alt="edit-profile"
            className="h-6 w-6 hover:cursor-pointer"
            onClick={handleEdit}
          />
        </div>

        <h3 className="text-xl font-medium font-montserrat text-gray-400">
          {profile?.id ? Principal.from(profile.id).toText() : ""}
        </h3>
        <h3 className="text-xl font-medium font-montserrat text-gray-400">
          Joined {createdAtFormatted}
        </h3>
      </div>
    </div>
  );
};

export default ProfilePage;
