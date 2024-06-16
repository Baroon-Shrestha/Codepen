import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainNav from "../components/Navbar/MainNav";
import axios from "axios";
import { backendUrl } from "../../url";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginFunc = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${backendUrl}/codepen/login`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const data = res.data;
      if (data.success) {
        localStorage.setItem("userDetails", JSON.stringify(data));
        alert("Login successful! Moving to the home page.");
        navigate("/");
      } else {
        alert("Login failed! Please check your credentials and try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred while logging in. Please try again later.");
    }
  };

  return (
    <MainNav>
      <div className="flex items-center justify-center ">
        <div className="">
          <div className="grid grid-cols-2 gap-4 w-full max-w-4xl p-4">
            <div className="flex flex-col gap-10 items-center justify-center">
              <div className="w-[170px]">
                <img src="./codepen-white.png" alt="CodePen Logo" />
              </div>
              <div>
                <h1 className="text-center text-5xl">
                  Welcome to <span className="font-bold">CODEPEN</span>
                </h1>
              </div>
            </div>
            <div className="flex items-center justify-center ">
              <form
                className="e p-8 rounded-3xl shadow-md w-full max-w-md bg-primary"
                onSubmit={loginFunc}
              >
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-white text-sm font-bold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="border rounded w-full py-2 px-3 text-gray-700"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="password"
                    className="block text-white text-sm font-bold mb-2"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-green-500 w-full text-white font-bold py-2 px-4 rounded"
                  >
                    Login
                  </button>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-white">
                    Don't have an account?{" "}
                    <Link to="/register">
                      <div className="text-blue-500 hover:text-blue-700">
                        Register
                      </div>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>{" "}
    </MainNav>
  );
}
