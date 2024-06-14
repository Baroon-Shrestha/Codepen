import React from "react";
import SideNav from "./SideNav";
import NavComp from "./NavComp";

export default function MainNav({ children }) {
  return (
    <>
      <div className="flex h-screen">
        <SideNav />
        <div className="flex-grow p-4 transition-all duration-300">
          <NavComp />
          {children}
        </div>
      </div>
    </>
  );
}
