import React, { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { ShoppingCart, Trash2, Package, CreditCard, ArrowRight } from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState([]);
  const [Total, setTotal] = useState(0);
  const [isDeleting, setIsDeleting] = useState(null);
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
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const deleteItem = async (bookid) => {
    setIsDeleting(bookid);
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v1/remove-from-cart/${bookid}`,
        {},
        { headers }
      );
      setTimeout(() => {
        setCart(Cart.filter((item) => item._id !== bookid));
        setIsDeleting(null);
        // Trigger a custom event to notify navbar of cart change
        window.dispatchEvent(new Event('cartUpdated'));
      }, 300);
    } catch (error) {
      console.error("Error removing item:", error);
      setIsDeleting(null);
    }
  };

  return (
   <div
  className="min-h-screen py-8 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-white to-[#FDCFFA]"
>
  <div className="max-w-7xl mx-auto">

        {!Cart && (
          <div className="w-full h-[80vh] flex items-center justify-center">
            <Loader />
          </div>
        )}

        {Cart.length === 0 && (
          <div className="h-[80vh] flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-purple-200 to-purple-300 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-16 h-16 text-purple-600" />
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Add some books to get started!
              </p>
              <button
                onClick={() => navigate("/")}
                className="bg-[#4E56C0] text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Browse Books
              </button>
            </div>
          </div>
        )}

        {Cart.length > 0 && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-8">
                <ShoppingCart className="w-8 h-8 text-purple-500" />
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                  Shopping Cart
                </h1>
                <span className="bg-purple-400 text-white px-4 py-1 rounded-full font-semibold">
                  {Cart.length}
                </span>
              </div>

              <div className="space-y-4">
                {Cart.map((items, i) => (
                  <div
                    key={i}
                    className={`bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl ${
                      isDeleting === items._id ? 'scale-95 opacity-50' : 'hover:-translate-y-1'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row p-6 gap-6">
                      {/* Book Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={items.imageURL}
                          alt={items.bookTitle}
                          className="w-32 h-40 object-cover rounded-lg shadow-md"
                        />
                      </div>

                      {/* Book Details */}
                      <div className="flex-1 min-w-0">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2 line-clamp-2">
                          {items.bookTitle}
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base line-clamp-2 mb-4">
                          {items.bookDescription}
                        </p>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <div className="text-2xl md:text-3xl font-bold text-purple-500">
                            {items.price}
                          </div>
                          <button
                            onClick={() => deleteItem(items._id)}
                            disabled={isDeleting === items._id}
                            className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Trash2 className="w-5 h-5" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-[400px]">
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-8">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                  <Package className="w-6 h-6 text-purple-500" />
                  <h2 className="text-2xl font-bold text-gray-800">
                    Order Summary
                  </h2>
                </div>

                {/* Summary Items */}
                <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto">
                  {Cart.map((items, i) => (
                    <div key={i} className="flex gap-3 pb-4 border-b border-gray-100">
                      <img
                        src={items.imageURL}
                        alt={items.bookTitle}
                        className="w-16 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">
                          {items.bookTitle}
                        </h3>
                        <p className="text-xs text-gray-500 line-clamp-1 mt-1">
                          {items.bookDescription}
                        </p>
                        <p className="text-purple-500 font-bold mt-1">
                          {items.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal */}
                <div className="space-y-3 mb-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({Cart.length} {Cart.length === 1 ? "item" : "items"})</span>
                    <span className="font-semibold">${Total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-gray-800 pt-3 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-purple-500">${Total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={PlaceOrder}
                  className="w-full bg-[#4E56C0] text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  Place Order
                  <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  🔒 Secure checkout • 30-day money back guarantee
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;