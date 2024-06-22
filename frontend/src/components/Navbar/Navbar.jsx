import React from "react";
import "../../index.css"; // Import your custom CSS

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About",
      link: "/about-us",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
  ];

  return (
    <div className="relative bg-white px-8 py-4 flex items-center justify-between">
      <div className="transparency-circle"></div> {/* Transparent circle */}
      <div className="flex items-center">
        <img
          className="h-10 me-4"
          src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
          alt="logo"
        />
        <h1 className="text-3xl font-semibold font-playfair">Book'Store</h1>{" "}
        {/* Added font-playfair class */}
      </div>
      <div className="nav-links flex items-center gap-6 flex-grow justify-center">
        {" "}
        {/* justify-center for centering links */}
        {links.map((item, i) => (
          <div
            className="nav-link text-base font-medium text-gray-700 font-roboto" // Added font-roboto class
            key={i}
          >
            {item.title}
          </div>
        ))}
      </div>
      <div className="flex gap-4 items-center">
        <button className="signin-button px-4 py-2  rounded transform transition-transform hover:scale-105">
          SignIn
        </button>
        <button className="signup-button px-4 py-2 bg-white-500 text-black rounded transform transition-transform hover:scale-105">
          SignUp
        </button>
      </div>
    </div>
  );
};

export default Navbar;
