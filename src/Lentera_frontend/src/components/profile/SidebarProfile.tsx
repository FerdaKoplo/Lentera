import React from "react";
import SidebarMenuItem from "./SidebarMenuItem";

const menuItems = [
  { label: "Dashboard", path: "/profile" },
  { label: "Journals", path: "/profile/journals" },
  { label: "Analytics", path: "/profile/analytics" },
  { label: "Community", path: "/profile/community" },
  { label: "Articles", path: "/profile/articles" },
];

const SidebarProfile = () => {
  return (
    <div className="w-64 h-screen bg-gray-50 border-r border-gray-200 flex flex-col">
      <div className="p-6 text-center">
        <h1 className="text-2xl font-light text-gray-400 tracking-wider">
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
      <div className="p-4">
        <button className="flex items-center justify-center w-full px-4 py-2 bg-green-300 hover:bg-green-400 text-gray-700 rounded-full transition-colors duration-200 font-medium">
          <span className="mr-2">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SidebarProfile;
