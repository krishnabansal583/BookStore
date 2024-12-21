import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [options, setOptions] = useState(-1);
  const [values, setValues] = useState({ status: "" });
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState(null);

  const headers = {
    id: localStorage.getItem("id") || false,
    authorization: `Bearer ${localStorage.getItem("token")}` || false,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-all-orders",
          { headers }
        );
        setAllOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    const orderId = allOrders[i]?._id;
    console.log("orderId: " , orderId);
    
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v1/update-status/${orderId}`,
        values,
        { headers }
      );
      alert(response.data.message);
      setAllOrders((prevOrders) =>
        prevOrders.map((order, index) =>
          index === i ? { ...order, status: values.status } : order
        )
      );
      setOptions(-1);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const handleUserDetails = (user) => {
    setUserDiv("fixed");
    setUserDivData(user);
  };

  const closeUserDetails = () => {
    setUserDiv("hidden");
    setUserDivData(null);
  };

  if (!allOrders) {
    return (
      <div className="h-[100%] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    // <div className="h-full p-4 text-gray-800">
    //   <h1 className="text-4xl font-semibold text-gray-800 mb-8">All Orders</h1>
    //   {!allOrders.length ? (
    //     <div className="h-[80vh] flex flex-col items-center justify-center text-center">
    //       <h1 className="text-5xl font-semibold text-gray-500 mb-8">
    //         No Orders Available
    //       </h1>
    //       <img
    //         src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png"
    //         alt="No Orders"
    //         className="h-[20vh] mb-8"
    //       />
    //     </div>
    //   ) : (
    //     <div className="space-y-8">
    //       {allOrders.map((order, index) => (
    //         <div
    //           key={order._id}
    //           className="bg-purple-100 rounded-lg shadow-md p-6 flex flex-col md:flex-row items-start md:items-center gap-6 hover:shadow-lg transition-shadow"
    //         >
    //           <div className="flex-shrink-0">
    //             <img
    //               src={order.book?.imageURL}
    //               alt={order.book?.bookTitle}
    //               className="h-32 w-24 object-cover rounded-lg"
    //             />
    //           </div>
    //           <div className="flex-1">
    //             <h2 className="text-2xl font-semibold mb-2">
    //               <Link
    //                 to={`/view-book-details/${order.book._id}`}
    //                 className="hover:text-blue-500"
    //               >
    //                 {order.book.bookTitle}
    //               </Link>
    //             </h2>
    //             <p className="text-gray-700 mb-4">
    //               {order.book.bookDescription
    //                 ? `${order.book.bookDescription.slice(0, 100)} ...`
    //                 : "No description available"}
    //             </p>
    //             <div className="flex items-center justify-between">
    //               <div className="text-lg font-medium text-gray-900">
    //                 {order.book.price}
    //               </div>
    //               <div
    //                 className={`text-sm border border-zinc-800 font-bold py-1 px-3 rounded-full ${
    //                   order.status === "Order Placed"
    //                     ? "bg-green-100 text-green-700"
    //                     : order.status === "Delivered"
    //                     ? "bg-blue-100 text-blue-700"
    //                     : order.status === "Cancelled"
    //                     ? "bg-red-100 text-red-700"
    //                     : "bg-yellow-100 text-yellow-700"
    //                 }`}
    //               >
    //                 {order.status || "No Status"}
    //               </div>
    //               <div className="flex items-center">
    //                 <button
    //                   className="hover:text-blue-600 mx-2"
    //                   onClick={() => setOptions(index)}
    //                 >
    //                   <FaCheck />
    //                 </button>
    //                 <div
    //                   className={`${options === index ? "block" : "hidden"}`}
    //                 >
    //                   <select
    //                     name="status"
    //                     id=""
    //                     className="bg-white"
    //                     onChange={handleChange}
    //                     value={values.status}
    //                   >
    //                     {[
    //                       "Order Placed",
    //                       "Out of Delivery",
    //                       "Delivered",
    //                       "Cancelled",
    //                     ].map((status, idx) => (
    //                       <option key={idx} value={status}>
    //                         {status}
    //                       </option>
    //                     ))}
    //                   </select>
    //                   <button
    //                     className="text-green-500 hover:text-pink-600 mx-2"
    //                     onClick={() => submitChanges(index)}
    //                   >
    //                     <FaCheck />
    //                   </button>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="hidden md:block text-sm font-semibold text-gray-700">
    //               COD
    //             </div>
    //           </div>
    //           <button
    //             className="text-xl hover:text-orange-500"
    //             onClick={() => handleUserDetails(order.user)}
    //           >
    //             <IoOpenOutline />
    //           </button>
    //         </div>
    //       ))}
    //     </div>
    //   )}
    //   {userDiv === "fixed" && (
    //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    //       <div className=" bg-gray-200  text-zinc-900 p-8 rounded-lg w-1/2">
    //         <h2 className="text-2xl font-bold mb-4">User Details</h2>
    //         {userDivData && (
    //           <div>
    //             <p className="font-semibold">
    //               <strong>Name:</strong> {userDivData.username}
    //             </p>
    //             <p className="font-semibold">
    //               <strong>Email:</strong> {userDivData.email}
    //             </p>
    //             <p className="font-semibold">
    //               <strong>Address:</strong> {userDivData.address}
    //             </p>
    //           </div>
    //         )}
    //         <button
    //           className="mt-4 bg-yellow-500 border border-zinc-800 font-semibold text-black px-4 py-2 rounded"
    //           onClick={closeUserDetails}
    //         >
    //           Close
    //         </button>
    //       </div>
    //     </div>
    //   )}
    // </div>


    
    <div className="space-y-8">
  {allOrders.map((order, index) => (
    <div
      key={order?._id || index} // Use `index` as a fallback if `_id` is undefined
      className="bg-purple-100 rounded-lg shadow-md p-6 flex flex-col md:flex-row items-start md:items-center gap-6 hover:shadow-lg transition-shadow"
    >
      <div className="flex-shrink-0">
        <img
          src={order?.book?.imageURL || "https://via.placeholder.com/150"}
          alt={order?.book?.bookTitle || "No Title"}
          className="h-32 w-24 object-cover rounded-lg"
        />
      </div>
      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-2">
          {order?.book ? (
            <Link
              to={`/view-book-details/${order.book._id}`}
              className="hover:text-blue-500"
            >
              {order.book.bookTitle}
            </Link>
          ) : (
            "Book Details Unavailable"
          )}
        </h2>
        <p className="text-gray-700 mb-4">
          {order?.book?.bookDescription
            ? `${order.book.bookDescription.slice(0, 100)} ...`
            : "No description available"}
        </p>
        <div className="flex items-center justify-between">
          <div className="text-lg font-medium text-gray-900">
            {order?.book?.price || "Price not available"}
          </div>
          <div
            className={`text-sm border border-zinc-800 font-bold py-1 px-3 rounded-full ${
              order.status === "Order Placed"
                ? "bg-green-100 text-green-700"
                : order.status === "Delivered"
                ? "bg-blue-100 text-blue-700"
                : order.status === "Cancelled"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {order.status || "No Status"}
          </div>
          <div className="flex items-center">
            <button
              className="hover:text-blue-600 mx-2"
              onClick={() => setOptions(index)}
            >
              <FaCheck />
            </button>
            <div className={`${options === index ? "block" : "hidden"}`}>
              <select
                name="status"
                className="bg-white"
                onChange={handleChange}
                value={values.status}
              >
                {[
                  "Order Placed",
                  "Out of Delivery",
                  "Delivered",
                  "Cancelled",
                ].map((status, idx) => (
                  <option key={idx} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <button
                className="text-green-500 hover:text-pink-600 mx-2"
                onClick={() => submitChanges(index)}
              >
                <FaCheck />
              </button>
            </div>
          </div>
        </div>
        <div className="hidden md:block text-sm font-semibold text-gray-700">
          COD
        </div>
      </div>
      <button
        className="text-xl hover:text-orange-500"
        onClick={() => handleUserDetails(order?.user)}
      >
        <IoOpenOutline />
      </button>
    </div>
  ))}
</div>

  );
};

export default AllOrders;
