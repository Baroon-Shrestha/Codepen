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
    <>
      <div className="mx-16">
        <Link to="/code-editor">
          <div className="boder grid grid-cols-4 gap-2 mt-4">
            {data.map((item) => (
              <div
                key={item.id}
                className="p-4 border border-primary rounded-lg flex flex-col gap-8 transition duration-150 ease-in-out hover:bg-primary"
              >
                <div className="font-bold text-xl">{item.title}</div>
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
            ))}
          </div>
        </Link>
      </div>
    </>
  );
}
