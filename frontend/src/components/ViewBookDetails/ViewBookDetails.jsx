import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

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

  return (
    <div className="h-screen flex flex-col bg-gradient-to-b from-white to-[#fab9c4]">
      <div className="flex-grow px-4 py-8 flex flex-col md:flex-row gap-8 md:px-12">
        <div className="flex flex-col md:flex-row gap-8 w-full h-auto">
          <div className="bg-[#6851CD] rounded-2xl mt-5 p-4 h-[30vh] md:h-[60vh] w-full sm:w-[50%] md:w-[30%] flex items-center justify-center">
            {data.imageURL && (
              <img src={data.imageURL} alt="Book Cover" className="h-full md:h-[60vh] rounded" />
            )}
          </div>
          <div className="p-4 w-full md:w-[75%]">
            <h1 className="text-3xl lg:text-4xl text-zinc-500 font-semibold mb-2">
              {data.bookTitle}
            </h1>
            <p className="text-gray-500 font-medium mb-2">By ~ {data.authorName}</p>
            <p className="text-zinc-500 mt-4 text-base lg:font-semibold md:text-xl md:font-normal">
              {data.bookDescription}
            </p>
            <p className="text-zinc-500 mb-1 mt-4 text-xl font-semibold">Category: {data.category}</p>
            <p className="text-zinc-900 text-2xl font-semibold">Price: {data.price}</p>
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
