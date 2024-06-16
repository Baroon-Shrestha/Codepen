import React, { useEffect, useState } from "react";
import { backendUrl } from "../../../url";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

export default function OnlyCards() {
  const [data, setData] = useState([]);
  const [loggedIn, setLoggedIn] = useState("");
  const [getLength, setGetLength] = useState(0);

  // Function to fetch data from backend
  const fetchData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/codepen/viewyours`, {
        withCredentials: true,
      });
      setData(response.data.viewYourSaves);
      setGetLength(response.data.viewYourSaves.length);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();

    const storedUser = JSON.parse(localStorage.getItem("userDetails"));
    if (storedUser) {
      setLoggedIn(storedUser);
    }
  }, []);

  async function deleteCode(id) {
    try {
      const response = await axios.delete(
        `${backendUrl}/codepen/delete/${id}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const { success } = response.data;
      if (success) {
        alert(`Deleted ${id}`);
        fetchData();
      } else {
        console.error("Delete request failed.");
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  }

  return (
    <>
      <div className="mx-16">
        {loggedIn ? (
          <div className="grid grid-cols-4 gap-2 mt-4">
            {data.length > 0 ? (
              data.map((item) => (
                <div className="p-4 border border-black rounded-lg flex flex-col item gap-6">
                  <div key={item._id} className=" flex flex-col gap-8">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-xl">{item.title}</div>
                      <button onClick={() => deleteCode(item._id)}>
                        <div className="p-2 bg-red-600 rounded-full">
                          <MdDelete />
                        </div>
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>{item.userId.userName}</div>
                      <div className="flex gap-2">
                        <div className="bg-orange-600 text-white p-2 rounded-md">
                          HTML
                        </div>
                        <div className="bg-blue-600 text-white p-2 rounded-md">
                          CSS
                        </div>
                        <div className="bg-yellow-500 text-white p-2 rounded-md">
                          JS
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link to="/code-editor">
                    <div className="text-center p-2 bg-green-600 rounded-md ">
                      Open in editor
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center text-2xl">
                No code snippets found.
              </div>
            )}
          </div>
        ) : (
          <>
            <div>Login to view your code snippets.</div>
            <Link to="/login">
              <div className="p-2 bg-green-400 rounded-md">
                <button>Login</button>
              </div>
            </Link>
          </>
        )}
      </div>
    </>
  );
}
