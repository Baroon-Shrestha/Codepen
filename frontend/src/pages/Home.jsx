import React from "react";
import { Link } from "react-router-dom";
import SideNav from "../components/Navbar/SideNav";
import AllCard from "../components/Cards/AllCard";
import Hero from "../components/HomeComponents/Hero";
import NavComp from "../components/Navbar/NavComp";
import MainNav from "../components/Navbar/MainNav";

export default function Home() {
  return (
    <div>
      <MainNav>
        <Hero />
        <AllCard />
      </MainNav>
    </div>
  );
}
