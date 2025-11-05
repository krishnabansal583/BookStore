import React, { useEffect, useState } from "react";
import BookCart from "../BookCart/BookCart";
import axios from "axios";
import { FaHeart, FaBookOpen } from "react-icons/fa";

const Favourites = () => {
  const [FavouritesBooks, setFavouritesBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-favourite-books",
          { headers }
        );
        setFavouritesBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching favourites:", error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleRemoveBook = (bookId) => {
    setFavouritesBooks((prevBooks) =>
      prevBooks.filter((book) => book._id !== bookId)
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#4E56C0]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[500px]">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg">
            <FaHeart className="text-white text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Your Favourites</h1>
        </div>
        <p className="text-gray-600 ml-14">
          {FavouritesBooks.length > 0 
            ? `${FavouritesBooks.length} book${FavouritesBooks.length > 1 ? 's' : ''} you love` 
            : "Books you mark as favourite will appear here"}
        </p>
      </div>

      {/* Empty State */}
      {FavouritesBooks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-red-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-pink-100 to-red-100 rounded-full p-8">
              <FaHeart className="text-6xl text-pink-500" />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-700 mb-3 text-center">
            No Favourites Yet
          </h2>
          <p className="text-gray-500 text-center max-w-md mb-6">
            Start building your collection by marking books you love with a heart. 
            They'll all be saved here for easy access!
          </p>
          
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <FaBookOpen />
            <span>Browse books and tap the heart icon to add favourites</span>
          </div>
        </div>
      )}

      {/* Books Grid */}
      {FavouritesBooks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
          {FavouritesBooks.map((items, i) => (
            <div
              key={i}
              className="group relative"
            >
              {/* Favourite Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-red-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
              
              {/* Card Container - exactly matching BookCart dimensions */}
              <div className="relative rounded-2xl overflow-hidden">
                {/* Favourite Badge */}
                <div className="absolute top-5 right-5 z-10">
                  <div className="bg-gradient-to-br from-pink-500 to-red-500 rounded-full p-2 shadow-lg animate-pulse">
                    <FaHeart className="text-white text-sm" />
                  </div>
                </div>

                {/* Book Content */}
                <BookCart
                  data={items}
                  favourite={true}
                  onRemoveBook={handleRemoveBook}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats Footer */}
      {FavouritesBooks.length > 0 && (
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <FaHeart className="text-pink-500" />
            <span>
              You've collected <strong className="text-gray-700">{FavouritesBooks.length}</strong> favourite{FavouritesBooks.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favourites;