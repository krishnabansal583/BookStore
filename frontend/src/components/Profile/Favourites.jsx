import React, { useEffect, useState } from "react";
import BookCart from "../BookCart/BookCart";
import axios from "axios";

const Favourites = () => {
  const [FavouritesBooks, setFavouritesBooks] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-favourite-books",
        { headers }
      );
      setFavouritesBooks(response.data.data);
    };
    fetch();
  }, []);

  const handleRemoveBook = (bookId) => {
    setFavouritesBooks((prevBooks) =>
      prevBooks.filter((book) => book._id !== bookId)
    );
  };

  return (
    <>
      {FavouritesBooks && FavouritesBooks.length === 0 && (
        <div className="text-4xl font-semibold h-[100%] flex  justify-center items-center text-zinc-600">
          No Books in Favourite
          <img
            src="./favourite.png "
            alt="favourite"
            className="h-[20vh] my-4"
          />
        </div>
      )}
      <div className="grid grid-cols-3 gap-3 ml-9 ">
        {FavouritesBooks &&
          FavouritesBooks.map((items, i) => (
            <div
              key={i}
              className={`w-full p-4 ${
                items.isFavourite
                  ? "border-2 border-yellow-500 bg-yellow-100 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
                  : ""
              }`}
            >
              <BookCart
                data={items}
                favourite={true}
                onRemoveBook={handleRemoveBook}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default Favourites;
