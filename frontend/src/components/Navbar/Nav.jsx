import React from "react";

export default function Nav() {
  return (
    <>
      <div className="flex justify-between bg-slate-400 items-center p-2">
        <div className="flex gap-2">
          <div>
            <img src="./codepen-black.png" alt="" className="h-[35px]" />
          </div>
          <div>First one</div>
        </div>
        <div className="flex gap-2">
          <div className="p-3 bg-slate-600 rounded-md text-white">
            <button>Sign Up</button>
          </div>
          <div className="p-3 bg-green-400 text-white rounded-md">
            <button>Login</button>
          </div>
        </div>
      </div>
    </>
  );
}
