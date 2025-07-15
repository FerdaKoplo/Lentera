import { Outlet } from "react-router-dom";
import SidebarProfile from "../components/profile/SidebarProfile";

const ProfileLayout = () => {
  return (
    <div className="flex">
      <SidebarProfile />
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default ProfileLayout;
