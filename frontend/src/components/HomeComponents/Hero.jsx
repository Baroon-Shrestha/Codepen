import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  // const [loggedIn, setLoggedIn] = useState("");

  // useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem("userDetails"));
  //   if (storedUser) {
  //     setLoggedIn(storedUser);
  //   }
  // }, []);

  return (
    <div className="mx-16">
      <div className="grid grid-cols-2 py-16  gap-2">
        <div className=" flex flex-col gap-4 ">
          <div className="flex items-center gap-4">
            <div className="w-[150px]">
              <img src="./codepen-white.png" alt="" />
            </div>
            <div className="text-4xl font-bold">
              The best place to build, test, and discover front-end code.
            </div>
          </div>
          <div className="text-justify">
            CodePen is a{" "}
            <span className="font-bold">social development environment</span>{" "}
            for front-end designers and developers. Build and deploy a website,
            show off your work, build test cases to learn and debug, and find
            inspiration.
          </div>
        </div>
        <div>
          <div className="w-[600px] bg-ed-600">
            <img src="./hero.webp" alt="" />
          </div>
        </div>
      </div>
      <div className="text-2xl font-bold">
        Find inspiration from 1.8 million+ front-end designers and developers.
      </div>
      <div>
        Browse and share work from world-class designers and developers in the
        front-end community.
      </div>
    </div>
  );
}
