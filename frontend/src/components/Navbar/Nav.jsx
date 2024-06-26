import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Nav({ save, title }) {
  const [loggedIn, setLoggedIn] = useState(null);

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(null);
    alert("logged out");
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userDetails"));
    if (storedUser) {
      setLoggedIn(storedUser);
    }
  }, []);

  return (
    <>
      <div className="flex justify-between bg-black items-center p-2">
        <div className="flex gap-2">
          <div>
            <Link to="/">
              <img src="./codepen-white.png" alt="" className="h-[35px]" />
            </Link>
          </div>
          <div>
            <div className="text-[1.3rem]">{title ? title : "Untitled"}</div>
            {loggedIn ? (
              <div className="text-white flex items-center">
                <span className="text-[.9rem] text">
                  {loggedIn.user.userName}
                </span>
              </div>
            ) : (
              <>
                <div className="text-[.9rem] text">Captain Anonymous</div>
              </>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <div className="p-2 bg-slate-600 rounded-md text-white">
            <button onClick={save}>Save Code</button>
          </div>
          {loggedIn ? (
            <div className="text-white flex items-center">
              welcome,&nbsp;{" "}
              <span className="text-green-400">{loggedIn.user.userName}</span>
            </div>
          ) : (
            <>
              <div className="p-2 bg-slate-600 rounded-md text-white">
                <button>Sign Up</button>
              </div>
              <Link to="/login">
                <div className="p-2 bg-green-400  rounded-md">
                  <button>Login</button>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
