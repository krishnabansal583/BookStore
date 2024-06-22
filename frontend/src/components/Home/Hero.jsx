import React, { useState, useEffect } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import "../../index.css"; // Import your custom CSS
import { BiRightArrow } from "react-icons/bi";
const Hero = () => {
  // Define an array of image paths
  const images = ["./book1.png", "./book2.png", "./book3.png", "./book4.png"];

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

  // Use useEffect to set up an interval for automatic image sliding
  useEffect(() => {
    const interval = setInterval(handleNext, 4000); // Change image every 4 seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []); // Empty dependency array to run effect only once on mount

  return (
    <div className="relative h-[75vh] flex bg-ffefe0">
      {/* Dark circle patch */}
      <div className="dark-circle"></div>
      <div className="w-full lg:w-3/6 flex flex-col items-center lg:items-start justify-center relative">
        <h1 className="text-4xl lg:text-6xl font-semibold text-black text-center lg:text-left">
          Unlock Adventures through Knowledge
        </h1>
        <p className="mt-4 text-xl text-black text-center lg:text-left">
          Dive into a world of knowledge and inspiration with our books that
          promise to enrich and empower.
        </p>
        <div className="mt-8">
      <button className="text-white bg-[#7C79ED] text-xl lg:text-2xl font-semibold px-10 py-3 rounded-full shadow-xl hover:shadow-lg flex items-center gap-1">
        Explore Books
        <BiRightArrow style={{ fontSize: '1rem', verticalAlign: 'middle' }} />
      </button>
    </div>
      </div>
      <div className="w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center relative">
        <button
          onClick={handleBack}
          className="absolute left-0 p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
          aria-label="Previous Image"
        >
          <BsChevronLeft size={24} /> {/* Left arrow icon */}
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
          <BsChevronRight size={24} /> {/* Right arrow icon */}
        </button>
      </div>
    </div>
  );
};

export default Hero;
