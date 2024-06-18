import React from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function SideNav({ isOpen, toggleMenu }) {
  return (
    <div
      className={`bg-secondary flex flex-col justify-between fixed top-0 left-0 h-full transition-all duration-300 ${
        isOpen ? "w-48 translate-x-0" : "w-0 -translate-x-full"
      }`}
    >
      <div
        className={`flex flex-col gap-3 text-white p-4 ${!isOpen && "hidden"}`}
      >
        <Link to="/">
          <div className="w-[150px]">
            <img src="codepen-main-white.png" alt="Codepen Logo" />
          </div>
        </Link>
        <Link to="/code-editor">
          <div className="text-xl rounded-md transition duration-500 ease-out hover:bg-violet-600 p-2">
            <h1>Start coding</h1>
          </div>
        </Link>
        <Link to="/projects">
          <div className="text-xl rounded-md transition duration-500 ease-out hover:bg-violet-600 p-2">
            <h1>View Projects</h1>
          </div>
        </Link>
        <Link to="/yourprojects">
          <div className="text-xl rounded-md transition duration-500 ease-out hover:bg-violet-600 p-2">
            <h1>Your projects</h1>
          </div>
        </Link>
      </div>
      <div className={`mb-3 text-white p-4 ${!isOpen && "hidden"}`}>
        <p>Additional Text</p>
      </div>
      <div
        className={`absolute p-3 top-10 bg-slate-400 flex items-center justify-center cursor-pointer transition-all duration-300 ${
          isOpen ? "-right-6" : "-right-8"
        }`}
        onClick={toggleMenu}
      >
        {!isOpen ? (
          <FaBarsStaggered className="text-black text-sm" />
        ) : (
          <IoClose className="text-black text-sm" />
        )}
      </div>
    </div>
  );
}
