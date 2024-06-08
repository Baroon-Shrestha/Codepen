import React from "react";

export default function NewCard() {
  return (
    <>
      <div className="relative h-[300px] w-[300px] m-8   transition-transform duration-500 ease-in-out hover:scale-50">
        <div className="absolute  bg-red-600 rounded-[10px] inset-0"></div>
        <div className="relative z-10 flex justify-center items-center h-full">
          <img src="codepen-black.png" alt="" />
        </div>
      </div>
    </>
  );
}
