import React, { useEffect, useState } from "react";
import { backendUrl } from "../../../url";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllCard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/codepen/view`);
        setData(response.data.view);
        console.log(response.data.view);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mx-16">
      <div className="grid grid-cols-3 gap-2 mt-4">
        {data.map((item) => (
          <div
            key={item._id}
            className="p-4 border bg-secondary border-primary rounded-2xl flex flex-col gap-3 transition duration-150 ease-in-out hover:bg-primary"
          >
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
            <div className="font-bold text-xl">{item.title}</div>
            <div className="flex justify-between items-center text">
              <div className="text">{item.userId.userName}</div>
            </div>
            <Link to={`/editor/${item._id}`}>
              <div className="text-center p-2 bg-green-600 rounded-md text-white">
                Open in editor
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
