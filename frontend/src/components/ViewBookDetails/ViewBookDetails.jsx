import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaEdit, FaHeart, FaShoppingCart } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewBookDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/v1/get-book-by-id/${id}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!data) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#fab9c4]">
        <Loader />
      </div>
    );
  }
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  const handleFavourite = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/add-book-to-favourite",
      {},
      { headers }
    );
    alert(response.data.message);
  };
  const handleCart = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/add-to-cart",
      {},
      { headers }
    );
    alert(response.data.message);
  };
  const deleteBook = async () => {
    const response = await axios.delete(
      "http://localhost:1000/api/v1/delete-book",

      { headers }
    );
    alert(response.data.message);
    navigate("/all-books");
  };
  return (
    <div className="md:h-screen lg:h-screen flex flex-col bg-gradient-to-b from-white to-[#fab9c4]">
      <div className="flex-grow px-4 py-8 flex flex-col md:flex-row gap-8 md:px-12">
        <div className="flex flex-col md:flex-row gap-8 w-full h-auto">
          <div className="relative w-full sm:w-[50%] md:w-[35%]">
            <div className="bg-[#6851CD] rounded-2xl mt-5 p-4 h-[30vh] md:h-[60vh] flex items-center justify-center relative">
              {data.imageURL && (
                <img
                  src={data.imageURL}
                  alt="Book Cover"
                  className="h-full md:h-[60vh] rounded"
                />
              )}

              {isLoggedIn === true && role === "user" && (
                <div className="absolute top-0 right-[-8px] mr-5 mt-4 flex flex-col items-center justify-center">
                  <button
                    className="bg-white rounded-full text-2xl p-2 text-red-500 hover:text-red-600"
                    onClick={handleFavourite}
                  >
                    <FaHeart />
                  </button>
                  <button
                    className="bg-white rounded-full text-2xl p-2 mt-5 text-blue-600 hover:text-blue-700"
                    onClick={handleCart}
                  >
                    <FaShoppingCart />
                  </button>
                </div>
              )}
              {isLoggedIn === true && role === "admin" && (
                <div className="absolute top-0 right-[-8px] mr-5 mt-4 flex flex-col items-center justify-center">
                  <Link
                    to={`/UpdateBook/${id}`}
                    className="bg-white rounded-full text-2xl p-2 "
                  >
                    <FaEdit />
                  </Link>
                  <button
                    className="bg-white rounded-full text-2xl p-2 mt-5 text-red-500"
                    onClick={deleteBook}
                  >
                    <MdOutlineDelete />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="p-4 w-full md:w-[75%]">
            <h1 className="text-3xl lg:text-4xl text-zinc-700 font-semibold mb-2">
              {data.bookTitle}
            </h1>
            <p className="text-gray-600 font-medium mb-2">
              By ~ {data.authorName}
            </p>
            <p className="text-zinc-500 mt-4 text-base lg:font-semibold md:text-xl md:font-normal cursive-font">
              {data.bookDescription}
            </p>
            <p className="text-zinc-700 mb-1 mt-4 text-xl font-semibold">
              Category: {data.category}
            </p>
            <p className="text-zinc-900 text-2xl font-semibold">
              Price: {data.price}
            </p>
            {data.bookPDFURL && (
              <p className="mt-4">
                <a
                  href={data.bookPDFURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 font-semibold hover:no-underline text-lg block"
                >
                  Read More
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBookDetails;
