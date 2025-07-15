import React from "react";
import SidebarMenuItem from "./SidebarMenuItem";
import LogoutButton from "../auth/LogoutButton";
import { useAuth } from "../../context/auth-context";

const menuItems = [
  { label: "Profile", path: "/profile" },
  { label: "Journals", path: "/profile/journals" },
  { label: "Analytics", path: "/profile/analytics" },
  { label: "Community", path: "/profile/community" },
  { label: "Articles", path: "/profile/articles" },
];

const SidebarProfile = () => {
  const { logout } = useAuth();
  return (
    <div className="w-64 h-screen bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold font-montserrat bg-gradient-to-r from-[#A8E6CF] to-[#BCA7E8] bg-clip-text text-transparent">
          LENTERA
        </h1>
      </div>
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <SidebarMenuItem label={item.label} path={item.path} />
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 flex items-center justify-center">
        <LogoutButton onClick={logout} />
      </div>
    </div>
  );
};

export default SidebarProfile;
