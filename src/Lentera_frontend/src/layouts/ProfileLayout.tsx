import { Outlet } from "react-router-dom";
import SidebarProfile from "../components/profile/SidebarProfile";

const ProfileLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarProfile />
      <main className="flex-1 overflow-y-auto bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default ProfileLayout;
