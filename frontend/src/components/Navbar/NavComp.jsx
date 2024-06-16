import React, { useEffect, useState } from "react";
import { Link, useSubmit } from "react-router-dom";

export default function NavComp() {
  const [loggedIn, setLoggedIn] = useState(null);

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(null);
    console.log("logged out");
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userDetails"));
    if (storedUser) {
      setLoggedIn(storedUser);
    }
  }, []);
  return (
    <div>
      <div className="flex justify-between">
        <div></div>
        <div className="flex gap-2">
          {loggedIn ? (
            <div className="flex gap-4 items-center justify-center">
              <div>
                Welcome,{" "}
                <span className="text-green-400">{loggedIn.user.userName}</span>
              </div>
              <div className="p-2 bg-green-400  rounded-md">
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/register">
                <div className="p-2 bg-slate-600 rounded-md text-white">
                  <button>Sign Up</button>
                </div>
              </Link>
              <Link to="/login">
                <div className="p-2 bg-green-400  rounded-md ">
                  <button>Login</button>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
