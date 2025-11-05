// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import Loader from "../Loader/Loader";
// // import { Link } from "react-router-dom";

// // const UserOrderHistory = () => {
// //   const [orderHistory, setOrderHistory] = useState(null);
// //   const headers = {
// //     id: localStorage.getItem("id"),
// //     authorization: `Bearer ${localStorage.getItem("token")}`,
// //   };

// //   useEffect(() => {
// //     const fetchOrderHistory = async () => {
// //       try {
// //         const response = await axios.get(
// //           "http://localhost:1000/api/v1/get-order-history",
// //           { headers }
// //         );
    
// //         setOrderHistory(response.data.data);
// //       } catch (error) {
// //         console.error("Error fetching order history:", error);
// //       }
// //     };
// //     fetchOrderHistory();
// //   }, []);

// //   return (
// //     <div className="h-full p-4 text-gray-800">
// //       {!orderHistory ? (
// //         <div className="h-full flex items-center justify-center">
// //           <Loader />
// //         </div>
// //       ) : orderHistory.length === 0 ? (
// //         <div className="h-[80vh] flex flex-col items-center justify-center text-center">
// //           <h1 className="text-5xl font-semibold text-gray-500 mb-8">
// //             No Order History
// //           </h1>
// //           <img
// //             src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png"
// //             alt="No Order History"
// //             className="h-[20vh] mb-8"
// //           />
// //         </div>
// //       ) : (
// //         <div className="space-y-8">
// //           <h1 className="text-4xl font-semibold text-gray-800 mb-8">
// //             Your Order History
// //           </h1>
// //           {orderHistory.map((item, i) => (
// //             <div
// //               key={i}
// //               className="bg-purple-100 rounded-lg shadow-md p-6 flex flex-col md:flex-row items-start md:items-center gap-6 hover:shadow-lg transition-shadow"
// //             >
// //               <div className="flex-shrink-0">
// //                 <img
// //                   src={item.imageURL}
// //                   alt={item.bookTitle}
// //                   className="h-32 w-24 object-cover rounded-lg"
// //                 />
// //               </div>
// //               <div className="flex-1">
// //                 <h2 className="text-2xl font-semibold mb-2">
// //                   <Link
// //                     to={`/view-book-details/${item._id}`}
// //                     className="hover:text-blue-500"
// //                   >
// //                     {item.bookTitle}
// //                   </Link>
// //                 </h2>
// //                 <p className="text-gray-700 mb-4 cursive-font">
// //                   {item.bookDescription.slice(0, 100) + " ..."}
// //                 </p>
// //                 <div className="flex items-center justify-between">
// //                   <div className="text-lg font-medium text-gray-900">
// //                     {item.price}
// //                   </div>
// //                   <div
// //                     className={`text-sm border border-zinc-800 font-bold py-1 px-3 rounded-full ${
// //                       item.status === "Order Placed"
// //                         ? "bg-green-100 text-green-700"
// //                         : item.status === "Delivered"
// //                         ? "bg-blue-100 text-blue-700"
// //                         : item.status === "Cancelled"
// //                         ? "bg-red-100 text-red-700"
// //                         : "bg-yellow-100 text-yellow-700"
// //                     }`}
// //                   >
// //                     {item.status || "No Status"}
// //                   </div>
// //                   <div className="hidden md:block text-sm font-semibold text-gray-700">
// //                   COD
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default UserOrderHistory;

// // pages/UserOrderHistory.jsx
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

  // Status badge styles
  const getStatusStyle = (status) => {
    switch (status) {
      case "Order Placed":
        return { bg: "#e6f7e6", text: "#2e7d32", border: "#a5d6a7" };
      case "Delivered":
        return { bg: "#e3f2fd", text: "#1565c0", border: "#90caf9" };
      case "Cancelled":
        return { bg: "#ffebee", text: "#c62828", border: "#ef9a9a" };
      default:
        return { bg: "#fff3e0", text: "#ef6c00", border: "#ffcc80" };
    }
  };

  return (
    // <div
    //   className="min-h-screen p-6 lg:p-12"
    //   style={{
    //     background: `linear-gradient(to bottom, #FDCFFA 0%, #ffffff 100%)`,
    //   }}
    // >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Your Order History</h1>
          <p className="text-sm text-gray-600 mt-1">
            Track and review all your past purchases
          </p>
        </div>

        {/* Loading State */}
        {orderHistory === null && (
          <div className="flex items-center justify-center h-96">
            <Loader />
          </div>
        )}

        {/* Empty State */}
        {orderHistory && orderHistory.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-200">
            <img
              src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png"
              alt="No orders"
              className="w-24 h-24 mx-auto mb-6 opacity-70"
            />
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              No Orders Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Start exploring and place your first order!
            </p>
            <Link
              to="/all-books"
              className="inline-block px-6 py-3 rounded-lg font-medium text-white transition-colors"
              style={{ backgroundColor: "#4E56C0" }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#3a4199"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#4E56C0"}
            >
              Browse Books
            </Link>
          </div>
        )}

        {/* Orders List */}
        {orderHistory && orderHistory.length > 0 && (
          <div className="space-y-6">
            {orderHistory.map((item, i) => {
              const statusStyle = getStatusStyle(item.status);

              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 flex flex-col md:flex-row gap-6 hover:shadow-lg transition-shadow"
                >
                  {/* Book Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.imageURL}
                      alt={item.bookTitle}
                      className="w-24 h-32 object-cover rounded-lg border border-gray-200"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 space-y-3">
                    <h2 className="text-xl font-semibold text-gray-800">
                      <Link
                        to={`/view-book-details/${item._id}`}
                        className="hover:underline"
                        style={{ color: "#4E56C0" }}
                      >
                        {item.bookTitle}
                      </Link>
                    </h2>

                    <p className="text-gray-600 text-sm line-clamp-2">
                      {item.bookDescription}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      {/* Price */}
                      <div className="font-bold text-gray-900">
                        {item.price}
                      </div>

                      {/* Status Badge */}
                      <div
                        className="px-3 py-1 rounded-full font-medium text-xs border"
                        style={{
                          backgroundColor: statusStyle.bg,
                          color: statusStyle.text,
                          borderColor: statusStyle.border,
                        }}
                      >
                        {item.status || "Pending"}
                      </div>

                      {/* Payment Method */}
                      <div className="text-gray-600 font-medium">
                        COD
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    // </div>
  );
};

export default UserOrderHistory;


