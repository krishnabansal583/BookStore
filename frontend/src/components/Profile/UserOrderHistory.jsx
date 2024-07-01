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
        console.log("Order history response:", response.data); // Log response data
        setOrderHistory(response.data.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };
    fetchOrderHistory();
  }, []);

  return (
    <>
      {!orderHistory && <Loader />}
      {orderHistory && orderHistory.length === 0 && (
        <div className="h-[80vh] p-4 text-zinc-100">
          <div className="h-full flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
              No Order History
            </h1>
            <img
              src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png"
              alt="No Order History"
              className="h-[20vh] mb-8"
            />
          </div>
        </div>
      )}
      {orderHistory && orderHistory.length > 0 && (
        <div className="h-full p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Your Order History
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[22%]">
              <h1>Books</h1>
            </div>
            <div className="w-[45%]">
              <h1>Description</h1>
            </div>
            <div className="w-[9%]">
              <h1>Price</h1>
            </div>
            <div className="w-[16%]">
              <h1>Status</h1>
            </div>
            <div className="w-none md:w-[5%] hidden md:block">
              <h1>Mode</h1>
            </div>
          </div>
          {orderHistory.map((item, i) => (
            <div
              key={i}
              className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer"
            >
              <div className="w-[3%]">
                <h1 className="text-center">{i + 1}</h1>
              </div>
              <div className="w-[22%]">
                <Link
                  to={`/view-book-details/${item._id}`}
                  className="hover:text-blue-300"
                >
                  {item.bookTitle}
                </Link>
              </div>
              <div className="w-[45%]">
                <h1>{item.bookDescription.slice(0, 50) + " ..."}</h1>
              </div>
              <div className="w-[9%]">
                <h1>{item.price}</h1>
              </div>
              <div className="w-[16%]">
                <h1 className="font-semibold">
                  {item.status ? (
                    <div
                      className={
                        item.status === "Order placed"
                          ? "text-yellow-500"
                          : item.status === "Cancelled"
                          ? "text-red-500"
                          : "text-green-500"
                      }
                    >
                      {item.status}
                    </div>
                  ) : (
                    <div className="text-gray-500">No Status</div>
                  )}
                </h1>
              </div>
              <div className="w-none md:w-[5%] hidden md:block">
                <h1 className="text-sm text-zinc-500">COD</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserOrderHistory;
