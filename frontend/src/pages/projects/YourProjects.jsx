import React from "react";
import MainNav from "../../components/Navbar/MainNav";
import OnlyCards from "../../components/Cards/OnlyCards";

export default function YourProjects() {
  return (
    <div>
      <MainNav>
        <div className="text-center capitalize text-3xl">
          <h1 className="">your projects</h1>
        </div>
        <OnlyCards />
      </MainNav>
    </div>
  );
}
