import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import BookCart from "../components/BookCart/BookCart";

const AllBooks = () => {
  const [Data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-all-books"
      );
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="gradient-background px-12 h-auto py-8">
      <h2 className="text-4xl font-semibold text-black mb-4">All Books</h2>
      {!Data && (
        <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
      )}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {Data &&
          Data.map((items, i) => (
            <div key={i}>
              <BookCart data={items} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllBooks;
