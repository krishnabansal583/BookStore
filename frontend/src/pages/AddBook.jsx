import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [data, setData] = useState({
    imageURL: "",
    bookTitle: "",
    authorName: "",
    price: "",
    bookDescription: "",
    category: "",
    bookPDFURL: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (
        data.imageURL === "" ||
        data.bookTitle === "" ||
        data.authorName === "" ||
        data.price === "" ||
        data.bookDescription === "" ||
        data.category === "" ||
        data.bookPDFURL === ""
      ) {
        alert("All fields are required");
      } else {
        const formattedData = {
          ...data,
          price: parseFloat(data.price).toFixed(2) // Ensure price is formatted to two decimal places
        };
        const response = await axios.post("http://localhost:1000/api/v1/add-book", formattedData, { headers });
        setData({
          imageURL: "",
          bookTitle: "",
          authorName: "",
          price: "",
          bookDescription: "",
          category: "",
          bookPDFURL: "",
        });
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="h-full p-4 bg-purple-800 bg-opacity-20 rounded shadow-md font-roboto">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8">Add Book</h1>
      <div className="flex gap-8">
        <div className="flex flex-col w-1/2">
          <label htmlFor="imageURL" className="font-semibold text-gray-700 text-xl">
            Image URL
          </label>
          <input
            type="text"
            className="p-2 bg-white bg-opacity-50 rounded shadow-md mt-2 outline-none"
            placeholder="URL of image"
            name="imageURL"
            required
            value={data.imageURL}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col w-1/2">
          <label htmlFor="bookTitle" className="font-semibold text-gray-700 text-xl">
            Book Title
          </label>
          <input
            type="text"
            className="p-2 bg-white bg-opacity-50 rounded shadow-md mt-2 outline-none"
            placeholder="Title of book"
            name="bookTitle"
            required
            value={data.bookTitle}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex gap-8 mt-8">
        <div className="flex flex-col w-1/2">
          <label htmlFor="authorName" className="font-semibold text-gray-700 text-xl">
            Author Name
          </label>
          <input
            type="text"
            className="p-2 bg-white bg-opacity-50 rounded shadow-md mt-2 outline-none"
            placeholder="Author of book"
            name="authorName"
            required
            value={data.authorName}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col w-1/2">
          <label htmlFor="category" className="font-semibold text-gray-700 text-xl">
            Category
          </label>
          <input
            type="text"
            className="p-2 bg-white bg-opacity-50 rounded shadow-md mt-2 outline-none"
            placeholder="Category of book"
            name="category"
            required
            value={data.category}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex gap-8 mt-8">
        <div className="flex flex-col w-1/2">
          <label htmlFor="price" className="font-semibold text-gray-700 text-xl">
            Price ($)
          </label>
          <input
            type="text"
            className="p-2 bg-white bg-opacity-50 rounded shadow-md mt-2 outline-none"
            placeholder="Price of book"
            name="price"
            required
            value={data.price}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col w-1/2">
          <label htmlFor="bookPDFURL" className="font-semibold text-gray-700 text-xl">
            Book PDF URL
          </label>
          <input
            type="text"
            className="p-2 bg-white bg-opacity-50 rounded shadow-md mt-2 outline-none"
            placeholder="URL of book PDF"
            name="bookPDFURL"
            required
            value={data.bookPDFURL}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="flex flex-col mt-8">
        <label htmlFor="bookDescription" className="font-semibold text-gray-700 text-xl">
          Description
        </label>
        <textarea
          className="p-2 bg-white bg-opacity-50 rounded shadow-md mt-2 outline-none"
          rows="5"
          placeholder="Description of book"
          name="bookDescription"
          required
          value={data.bookDescription}
          onChange={handleChange}
        />
      </div>
      <div className="mt-8 flex justify-end">
        <button
          className="bg-yellow-500 bg-opacity-80 border border-zinc-500 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-600"
          onClick={handleSubmit}
        >
          Add Book
        </button>
      </div>
    </div>
  );
};

export default AddBook;
