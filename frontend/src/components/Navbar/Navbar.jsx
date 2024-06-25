import React, { useState } from "react";
import "../../index.css"; // Import your custom CSS
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";

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

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === false) {
    links.splice(3, 3);
  }
  const [MobileNav, setMobileNav] = useState("hidden");

  return (
    <>
      <nav className="relative z-50 bg-white px-8 py-4 flex items-center justify-between">
        <div className="transparency-circle"></div> {/* Transparent circle */}
        <Link to="/" className="flex items-center">
          <img
            className="h-10 mr-4"
            src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
            alt="logo"
          />
          <h1 className="text-3xl font-semibold font-playfair">Book'Store</h1>
        </Link>
        <div className="hidden md:flex nav-links flex items-center gap-6 flex-grow justify-center">
          {links.map((item, i) => (
            <div className="flex items-center" key={i}>
              {item.title === "Profile" ? (
                <Link
                  to={item.link}
                  className="signin-button px-4 py-2 bg-white-500 text-black rounded transform transition-transform hover:scale-105"
                >
                  {item.title}
                </Link>
              ) : (
                <Link
                  to={item.link}
                  className="nav-link text-base font-medium text-gray-700 font-roboto"
                >
                  {item.title}
                </Link>
              )}
            </div>
          ))}
        </div>
        {isLoggedIn === false && (
          <div className="hidden md:flex gap-4 items-center">
            <Link
              to="/SignIn"
              className="signin-button px-4 py-2 bg-white-500 text-black rounded transform transition-transform hover:scale-105"
            >
              Sign In
            </Link>
            <Link
              to="/SignUp"
              className="signup-button px-4 py-2 bg-white-500 text-black rounded transform transition-transform hover:scale-105"
            >
              Sign Up
            </Link>
          </div>
        )}
        <button
          className="block md:hidden text-black text-2xl hover:text-gray-600"
          onClick={() =>
            MobileNav === "hidden"
              ? setMobileNav("block")
              : setMobileNav("hidden")
          }
        >
          <FaGripLines />
        </button>
      </nav>
      <div
        className={`${MobileNav} bg-[#7C79ED] h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((item, i) => (
          <Link
            to={item.link}
            className={`${MobileNav} text-white text-3xl font-semibold mb-7  nav-link font-roboto`}
            key={i}
            onClick={() =>
              MobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden")
            }
          >
            {item.title}
          </Link>
        ))}

        <Link
          to="/SignIn"
          className={`${MobileNav} signin-button mb-7 text-3xl text-black font-semibold px-4 py-2  bg-white rounded transform transition-transform hover:scale-105`}
        >
          Sign In
        </Link>
        <Link
          to="/SignUp"
          className={`${MobileNav} signup-button mb-7 text-3xl font-semibold px-4 py-2 bg-white text-black rounded transform transition-transform hover:scale-105`}
        >
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default Navbar;
