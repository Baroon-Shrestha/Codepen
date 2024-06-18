import React, { useState } from "react";
import SideNav from "./SideNav";
import NavComp from "./NavComp";

export default function MainNav({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen">
      <SideNav isOpen={isSidebarOpen} toggleMenu={handleToggleSidebar} />
      <div
        className={`flex-grow p-4 transition-all duration-300 ${
          isSidebarOpen ? "ml-48" : "ml-0"
        }`}
      >
        <NavComp />
        {children}
      </div>
    </div>
  );
}
