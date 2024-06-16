import React from "react";
import MainNav from "../../components/Navbar/MainNav";
import AllCard from "../../components/Cards/AllCard";

export default function AllProjects() {
  return (
    <div>
      <MainNav>
        <div className="text-center capitalize text-3xl">
          <h1 className="">All projects</h1>
        </div>
        <AllCard />
      </MainNav>
    </div>
  );
}
