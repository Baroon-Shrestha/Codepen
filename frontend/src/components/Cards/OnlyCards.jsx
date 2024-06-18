import React, { useEffect, useState } from "react";
import { backendUrl } from "../../../url";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";

export default function OnlyCards() {
  const [data, setData] = useState([]);
  const [loggedIn, setLoggedIn] = useState("");
  const [getLength, setGetLength] = useState(0);

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
        alert(`Deleted`);
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
                <div className="p-4 bg-secondary border border-black rounded-lg flex flex-col item gap-6">
                  <iframe
                    className="bg-white rounded-lg"
                    srcDoc={`<html>
                <body>${item.html}</body>
                <style>${item.css}</style>
                <script>${item.js}</script>
              </html>`}
                    title={item.title}
                    sandbox="allow-scripts"
                    frameBorder="0"
                    width="100%"
                    height="150px"
                  />
                  <div key={item._id} className=" flex flex-col gap-8">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-xl">{item.title}</div>
                      <button>
                        <div
                          className="p-2 bg-red-600 rounded-full"
                          onClick={() => deleteCode(item._id)}
                        >
                          <MdDelete />
                        </div>
                      </button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text">{item.userId.userName}</div>
                    </div>
                  </div>
                  <Link to={`/editor/${item._id}`}>
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
            <div className="flex flex-col items-center mt-16 gap-4">
              <div>Login to view your saved code snippets.</div>
              <Link to="/login">
                <div className="p-2 w-30 bg-green-400 rounded-md">
                  <button>Login</button>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
