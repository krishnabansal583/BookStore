import React, { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState([]);
  const [Total, setTotal] = useState(0);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-user-cart",
        { headers }
      );
      setCart(response.data.data);
    };
    fetch();
  }, []);

  useEffect(() => {
    if (Cart && Cart.length > 0) {
      let total = 0;
      Cart.forEach((items) => {
        total += parseFloat(items.price.replace("$", ""));
      });
      setTotal(total);
    }
  }, [Cart]);

  const PlaceOrder = async () => {
    try {
      const response = await axios.post(
        `http://localhost:1000/api/v1/place-order`,
        { order: Cart },
        { headers }
      );
      alert(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {}
  };

  const deleteItem = async (bookid) => {
    const response = await axios.put(
      `http://localhost:1000/api/v1/remove-from-cart/${bookid}`,
      {},
      { headers }
    );

    setCart(Cart.filter((item) => item._id !== bookid));
  };

  return (
    <div className="gradient-background flex flex-col md:flex-row h-full">
      <div className="flex-1 px-4 md:px-12 py-8">
        {!Cart && (
          <div className="w-full h-full flex items-center justify-center">
            <Loader />
          </div>
        )}
        {Cart.length === 0 && (
          <div className="h-screen">
            <div className="h-full flex items-center justify-center flex-col">
              <h1 className="text-2xl md:text-5xl lg:text-6xl font-semibold text-zinc-600 text-center">
                Your Cart is Empty
              </h1>
              <img
                src="./Cart.png"
                alt="empty cart"
                className="h-[20vh] md:h-[40vh] lg:h-[50vh] mb-5"
              />
            </div>
          </div>
        )}
        {Cart.length > 0 && (
          <>
            <h1 className="text-2xl md:text-5xl font-semibold text-zinc-500 mb-8">
              Your Cart
            </h1>
            {Cart.map((items, i) => (
              <div
                className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-blue-800 justify-between items-center"
                key={i}
              >
                <img
                  src={items.imageURL}
                  alt={items.bookTitle}
                  className="h-[15vh] md:h-[10vh] object-cover mr-4"
                />
                <div className="w-full md:w-auto">
                  <h1 className="text-xl md:text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">
                    {items.bookTitle}
                  </h1>
                  <p className="text-sm md:text-normal text-zinc-300 mt-2 hidden lg:block">
                    {items.bookDescription.slice(0, 100)}...
                  </p>
                  <p className="text-sm md:text-normal text-zinc-300 mt-2 hidden md:block lg:hidden">
                    {items.bookDescription.slice(0, 65)}...
                  </p>
                  <p className="text-sm md:text-normal text-zinc-300 mt-2 block md:hidden">
                    {items.bookDescription.slice(0, 100)}...
                  </p>
                </div>
                <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                  <h2 className="text-zinc-100 text-xl md:text-3xl font-semibold flex">
                    {items.price}
                  </h2>
                  <button
                    className="bg-red-100 text-red-700 border border-red-900 rounded p-2 ms-10 text-xl"
                    onClick={() => deleteItem(items._id)}
                  >
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {Cart.length > 0 && (
        <div className="w-full md:w-[30%] lg:w-[25%] h-full flex flex-col justify-between p-4 md:p-8 bg-zinc-500 shadow-lg backdrop-blur-lg bg-opacity-20 border border-gray-600 lg:m-6 ">
          <div className="flex-1">
            <h1 className="text-4xl md:text-4xl items-center justify-center font-semibold text-zinc-800">
              Order Summary
            </h1>
            <div className="mt-4">
              {Cart.map((items, i) => (
                <div className="border-b border-gray-700 py-4" key={i}>
                  <div className="flex items-center">
                    <img
                      src={items.imageURL}
                      alt={items.bookTitle}
                      className="h-[10vh] object-cover mr-4"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-black">
                        {items.bookTitle}
                      </h2>
                      <p className="text-sm text-gray-700">
                        {items.bookDescription.slice(0, 50)}...
                      </p>
                      <p className="text-lg font-semibold text-black">
                        {items.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 w-full">
            <div className="flex items-center justify-between text-lg md:text-xl font-semibold text-black">
              <h2>
                {Cart.length} {Cart.length === 1 ? "book" : "books"}
              </h2>
              <h2>${Total.toFixed(2)}</h2>
            </div>
            <div className="mt-4 w-full">
              <button
                className="bg-yellow-500 text-black rounded px-4 py-2 w-full font-semibold hover:bg-yellow-600"
                onClick={PlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
