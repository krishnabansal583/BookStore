import React from "react";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gradient-background">
      <h1 className="text-4xl font-semibold mb-4 font-roboto">About Us</h1>
      <p className="text-lg text-gray-700 mb-4 text-left max-w-2xl cursive-font">
        Welcome to Book'Store, your one-stop destination for all your reading needs.
        Our mission is to provide a wide selection of books across various genres, catering
        to readers of all ages and preferences. Whether you're looking for the latest bestsellers,
        classic literature, or academic textbooks, we have it all.
      </p>
      <p className="text-lg text-gray-700 mb-4 text-left max-w-2xl cursive-font">
        At Book'Store, we believe in the power of reading to transform lives and broaden horizons.
        Our team is dedicated to offering exceptional customer service and ensuring that you have
        a seamless shopping experience. Thank you for choosing Book'Store as your trusted source
        for books. Happy reading!
      </p>
      <img
        className="h-64 mt-8"
        src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
        alt="Book'Store"
      />
    </div>
  );
};

export default About;
