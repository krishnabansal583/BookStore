import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const MobileNav = () => {
  const role = useSelector((state) => state.auth.role);
  return (
    <>
      {role === "user" && (
        <div className="w-full flex lg:hidden justify-between items-center mt-4">
          {" "}
          <Link
            to="/profile"
            className="text-zinc-800 font-semibold w-full text-center hover:bg-[#5956E9] hover:text-white rounded transition-all duration-300"
          >
            Favourites
          </Link>
          <Link
            to="orderHistory"
            className="text-zinc-800 font-semibold w-full   text-center hover:bg-[#5956E9]  hover:text-white rounded transition-all duration-300"
          >
            Order History
          </Link>
          <Link
            to="settings"
            className="text-zinc-800 font-semibold w-full text-center hover:bg-[#5956E9]  hover:text-white rounded transition-all duration-300"
          >
            Settings
          </Link>
        </div>
      )}
       {role === "admin" && (
        <div className="w-full flex lg:hidden justify-between items-center mt-4">
          {" "}
          <Link
            to="/profile"
            className="text-zinc-800 font-semibold w-full text-center hover:bg-[#5956E9] hover:text-white rounded transition-all duration-300"
          >
            All Orders
          </Link>
          <Link
            to="orderHistory"
            className="text-zinc-800 font-semibold w-full   text-center hover:bg-[#5956E9]  hover:text-white rounded transition-all duration-300"
          >
          Add Book
          </Link>
          
        </div>
      )}
    </>
  );
};

export default MobileNav;
