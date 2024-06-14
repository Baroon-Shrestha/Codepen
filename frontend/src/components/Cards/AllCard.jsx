import React, { useEffect, useState } from "react";
import { backendUrl } from "../../../url";
import axios from "axios";

export default function AllCard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/codepen/view`);
        setData(response.data.view); // Set data to array of items from API
        console.log(response.data.view); // Log fetched data to console
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call fetchData function when component mounts
  }, []);

  return (
    <>
      <div className="mx-16 borer">
        <div className="boder grid grid-cols-4 gap-2 mt-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="p-4 border border-black rounded-lg flex flex-col gap-8"
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
      </div>
    </>
  );
}
