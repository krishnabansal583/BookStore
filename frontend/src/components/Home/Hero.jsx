import React, { useState, useEffect } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import "../../index.css";
import { BiRightArrow } from "react-icons/bi";
import { Link } from "react-router-dom";
const Hero = () => {
  const images = ["./book1.jpg", "./book2.jpg", "./book3.jpg", "./book4.jpg"];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleBack = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[75vh] flex bg-ffefe0 flex-col md:flex-row items-center justify-center">
      <div className=" dark-circle"></div>
      <div className="w-full mb-12 md:mb-0 lg:w-3/6 flex flex-col items-center lg:items-start justify-center relative">
        <h1 className="text-4xl lg:text-6xl font-semibold text-black text-center lg:text-left">
          Unlock Adventures through Knowledge
        </h1>
        <p className="mt-4 text-xl text-gray-700 text-center lg:text-left">
          Dive into a world of knowledge and inspiration with our books that
          promise to enrich and empower.
        </p>
        <div className="mt-8">
          <Link
            to="/all-books"
            className="text-white bg-[#7C79ED] text-xl lg:text-2xl font-semibold px-10 py-3 rounded-full shadow-xl hover:shadow-lg flex items-center gap-1"
          >
            Explore Books
            <BiRightArrow
              style={{ fontSize: "1rem", verticalAlign: "middle" }}
            />
          </Link>
        </div>
      </div>
      <div className="w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center relative">
        <button
          onClick={handleBack}
          className="absolute left-0 p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
          aria-label="Previous Image"
        >
          <BsChevronLeft size={24} />
        </button>
        <img
          src={images[currentImageIndex]}
          alt="hero"
          className="mx-4 hero-image"
        />
        <button
          onClick={handleNext}
          className="absolute right-0 p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
          aria-label="Next Image"
        >
          <BsChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Hero;
