import React from "react";
import { Link } from "react-router-dom";
import "../../index.css"; // Make sure to import your custom CSS

const BookCart = ({ data }) => {
  return (
    <>
      <Link to={`/view-book-details/${data._id}`}>
        <div className="bg-[#DADEFF] rounded-2xl p-3 flex flex-col custom-shadow transform transition duration-500 hover:scale-105 w-60">
          <div className="bg-[#7C79ED] rounded-2xl flex items-center justify-center shadow-md p-3">
            <img src={data.imageURL} alt={data.bookTitle} className="h-40" />
          </div>
          <h2 className="mt-3 text-black text-xl font-semibold text-center">{data.bookTitle}</h2>
          <p className="mt-1 text-gray-700 font-semibold text-center">
            by {data.authorName}
          </p>
          <p className="mt-1 text-black text-xl font-semibold text-center">
            {data.price}
          </p>
        </div>
      </Link>
    </>
  );
};

export default BookCart;
