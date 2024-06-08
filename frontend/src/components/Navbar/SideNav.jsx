import React, { useState } from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

export default function SideNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`w-[15%] h-screen bg-black flex flex-col justify-between relative transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-3 text-white">
          <div className="">
            <img src="codepen-main-white.png" alt="" />
          </div>
          <div className="text-2xl rounded-md transition duration-500 ease-out hover:bg-violet-600">
            <h1 className="">Start coding</h1>
          </div>
          <div className="text-2xl rounded-md transition duration-500 ease-out hover:bg-violet-600">
            <h1 className="">Browse Items</h1>
          </div>
          <div className="text-2xl rounded-md transition duration-500 ease-out hover:bg-violet-600">
            <h1 className="">Spark</h1>
          </div>
        </div>
        <div className="mb-3 text-white">
          <p>Additional Text</p>
        </div>
        <div
          className="absolute -end-10 p-3 top-10 bg-slate-400 flex align-center justify-center"
          onClick={toggleMenu}
        >
          <button>
            {!isOpen ? (
              <FaBarsStaggered className="text-black text-2xl" />
            ) : (
              <IoClose className="text-black text-3xl" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}
