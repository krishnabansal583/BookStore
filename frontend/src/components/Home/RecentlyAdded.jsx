import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCart from "../BookCart/BookCart";
import Loader from "../Loader/Loader";
const RecentlyAdded = () => {
  const [Data, setData] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-recent-books"
      );
      setData(response.data.data);
    };
    fetch();
  }, []);
  return (
    <div className="mt-8 px-6">
      <h2 className="text-4xl text-center font-semibold text-black mb-4">New Arrivals</h2>
      {!Data && (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      )}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-7">
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

export default RecentlyAdded;
