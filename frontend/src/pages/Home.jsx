import React from "react";
import AllCard from "../components/Cards/AllCard";
import Hero from "../components/HomeComponents/Hero";
import MainNav from "../components/Navbar/MainNav";
import HomeCards from "../components/Cards/HomeCards";
export default function Home() {
  return (
    <div className="">
      <MainNav>
        <Hero />
        <HomeCards />
      </MainNav>
    </div>
  );
}
