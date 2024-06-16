import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainNav from "../components/Navbar/MainNav";
import { backendUrl } from "../../url";
import axios from "axios";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const RegisterFunc = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${backendUrl}/codepen/register`,
        {
          userName,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const data = res.data;

      alert("user registered successfully");
      if (data.success) {
        console.log(data);
        localStorage.setItem("userDetails", JSON.stringify(data));
        navigate("/");
      } else {
        console.error("Registration failed:", data.message);
      }
    } catch (err) {
      console.error("Error during registration:", err);
    }
  };

  return (
    <MainNav>
      <div className="flex items-center justify-center ">
        <div className="grid grid-cols-2 gap-4 w-full max-w-4xl p-4">
          <div className="flex flex-col gap-10 items-center justify-center">
            <div className="w-[170px]">
              <img src="./codepen-white.png" alt="CodePen Logo" />
            </div>
            <div>
              <h1 className="text-center text-4xl">
                Welcome to <span className="font-bold">CODEPEN</span> <br />
              </h1>
              <div className="text-xl text-center mt-10">
                Sign In to continue
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <form
              className="bg-primary p-8 rounded shadow-md w-full max-w-md"
              onSubmit={RegisterFunc}
            >
              <div className="mb-4">
                <label
                  htmlFor="userName"
                  className="block text-white text-sm font-bold mb-2"
                >
                  User Name
                </label>
                <input
                  type="text"
                  id="userName"
                  placeholder="Enter your user name"
                  className="border rounded w-full py-2 px-3 text-gray-700"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
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
                  Register
                </button>
              </div>
              <div className="mt-4 text-center">
                <p className="text-white">
                  Already have an account?
                  <Link to="/login">
                    <div className="text-blue-500 hover:text-blue-700">
                      Login
                    </div>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainNav>
  );
}
