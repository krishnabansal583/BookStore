import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import BookCart from "../components/BookCart/BookCart";

// Debounce hook
const useDebounce = (value, delay) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debounced;
};

const AllBooks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  const search = useDebounce(searchInput, 300);

  // Fetch all books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:1000/api/v1/get-all-books");
        const books = Array.isArray(res.data.data) ? res.data.data : [];
        setData(books);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to load books");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const categories = useMemo(() => {
    const cats = [...new Set(data.map((b) => b.category).filter(Boolean))];
    return ["all", ...cats.sort()];
  }, [data]);

  const parsePrice = (price) => {
    if (!price) return 0;
    return parseFloat(price.toString().replace(/[^\d.]/g, "")) || 0;
  };

  const filteredAndSorted = useMemo(() => {
    let list = [...data];

    if (search.trim()) {
      const term = search.toLowerCase();
      list = list.filter(
        (book) =>
          book.bookTitle?.toLowerCase().includes(term) ||
          book.authorName?.toLowerCase().includes(term)
      );
    }

    if (category !== "all") {
      list = list.filter((book) => book.category === category);
    }

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        break;
      case "price-desc":
        list.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      case "newest":
        list.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
        break;
      default:
        break;
    }

    return list;
  }, [data, search, category, sort]);

  const resetFilters = useCallback(() => {
    setSearchInput("");
    setCategory("all");
    setSort("default");
  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-pink-100">
        <Loader />
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-red-600 px-4 bg-gradient-to-b from-white to-pink-100">
        <p className="text-2xl font-bold mb-2">Oops! Something went wrong.</p>
        <p className="text-lg">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen py-8 px-4 sm:px-6 lg:px-12"
      style={{
        background: "linear-gradient(to bottom, #ffffff 0%, #FDCFFA 100%)",
      }}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
          All Books
        </h1>
        <p className="text-lg text-gray-600">
          {filteredAndSorted.length}{" "}
          {filteredAndSorted.length === 1 ? "book" : "books"} found
        </p>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center justify-center">
          {/* Search */}
          <div className="relative w-full sm:w-60 md:w-72">
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full sm:w-60 md:w-72 px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === "all" ? "All Categories" : cat}
              </option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full sm:w-60 md:w-72 px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="default">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>

          {/* Reset Button */}
          {(search || category !== "all" || sort !== "default") && (
            <button
              onClick={resetFilters}
              className="w-full sm:w-60 md:w-72 px-5 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Books Grid */}
      <div className="max-w-7xl mx-auto">
        {filteredAndSorted.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl font-medium text-gray-500">
              No books match your search.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 text-indigo-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-screen-xl place-items-center">
              {filteredAndSorted.map((book) => (
                <div
                  key={book._id}
                  className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <BookCart data={book} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooks;
