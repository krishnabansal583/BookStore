import React from "react";
import { Link } from "react-router-dom";
import "../../index.css";
import axios from "axios";

const BookCart = ({ data, favourite, onRemoveBook }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/remove-book-from-favourite",
        {},
        { headers }
      );
      onRemoveBook(data._id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="rounded-2xl p-3 flex flex-col bg-[#DADEFF] custom-shadow transform transition w-[280px] h-[330px]">
      <Link to={`/view-book-details/${data._id}`}>
        <div>
          <div className="bg-[#7C79ED] rounded-2xl flex items-center justify-center shadow-md p-3">
            <img src={data.imageURL} alt={data.bookTitle} className="h-40" />
          </div>
          <h2 className="mt-3 text-black text-xl font-semibold text-center">
            {data.bookTitle}
          </h2>
          <p className="mt-1 text-gray-700 font-semibold text-center">
            by {data.authorName}
          </p>
          {!favourite && (
            <p className="mt-5 text-black text-xl font-semibold text-center">
              {data.price}
            </p>
          )}
        </div>
      </Link>
      {favourite && (
        <button
          className="bg-yellow-400 px-3 py-1 rounded border border-blue-600 text-gray-800 font-semibold mt-3 hover:bg-yellow-500  transition-colors"
          onClick={handleRemoveBook}
        >
          Remove
        </button>
      )}
    </div>
  );
};

export default BookCart;
