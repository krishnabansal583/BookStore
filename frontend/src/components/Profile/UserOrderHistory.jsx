import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState(null);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-order-history",
          { headers }
        );
    
        setOrderHistory(response.data.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };
    fetchOrderHistory();
  }, []);

  return (
    <div className="h-full p-4 text-gray-800">
      {!orderHistory ? (
        <div className="h-full flex items-center justify-center">
          <Loader />
        </div>
      ) : orderHistory.length === 0 ? (
        <div className="h-[80vh] flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl font-semibold text-gray-500 mb-8">
            No Order History
          </h1>
          <img
            src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png"
            alt="No Order History"
            className="h-[20vh] mb-8"
          />
        </div>
      ) : (
        <div className="space-y-8">
          <h1 className="text-4xl font-semibold text-gray-800 mb-8">
            Your Order History
          </h1>
          {orderHistory.map((item, i) => (
            <div
              key={i}
              className="bg-purple-100 rounded-lg shadow-md p-6 flex flex-col md:flex-row items-start md:items-center gap-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex-shrink-0">
                <img
                  src={item.imageURL}
                  alt={item.bookTitle}
                  className="h-32 w-24 object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-2">
                  <Link
                    to={`/view-book-details/${item._id}`}
                    className="hover:text-blue-500"
                  >
                    {item.bookTitle}
                  </Link>
                </h2>
                <p className="text-gray-700 mb-4 cursive-font">
                  {item.bookDescription.slice(0, 100) + " ..."}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-lg font-medium text-gray-900">
                    {item.price}
                  </div>
                  <div
                    className={`text-sm border border-zinc-800 font-bold py-1 px-3 rounded-full ${
                      item.status === "Order Placed"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Delivered"
                        ? "bg-blue-100 text-blue-700"
                        : item.status === "Cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status || "No Status"}
                  </div>
                  <div className="hidden md:block text-sm font-semibold text-gray-700">
                  COD
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrderHistory;
