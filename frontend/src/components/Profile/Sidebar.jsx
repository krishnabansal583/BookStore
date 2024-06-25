import React from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"; // Import the icon from react-icons

const Sidebar = ({ data }) => {
  return (
    <div className="bg-[#DADEFF] p-5 rounded flex flex-col items-center justify-between h-[100%]">
      <div className="items-center justify-center flex flex-col">
        <img src={data.avatar} className="h-[12vh]" alt="Avatar" />
        <p className="mt-3 text-xl text-zinc-800 font-semibold">
          {data.username}
        </p>
        <p className="mt-1 text-normal text-zinc-600">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-800 hidden lg:block"></div>
      </div>

      <div className="w-full flex-col items-center justify-center hidden lg:flex">
        <Link
          to="/profile"
          className="text-zinc-800 font-semibold w-full py-2 text-center hover:bg-[#5956E9] hover:text-white rounded transition-all duration-300"
        >
          Favourites
        </Link>

        <Link
          to="orderHistory"
          className="text-zinc-800 font-semibold w-full py-2 mt-4 text-center hover:bg-[#5956E9]  hover:text-white rounded transition-all duration-300"
        >
          Order History
        </Link>

        <Link
          to="settings"
          className="text-zinc-800 font-semibold w-full py-2 mt-4 text-center hover:bg-[#5956E9]  hover:text-white rounded transition-all duration-300"
        >
          Settings
        </Link>
      </div>
      <button className="bg-[#5956E9] w-3/6 lg:w-full mt-4 lg:mt-0 text-zinc-100 font-semibold flex items-center justify-center py-2 rounded hover:bg-[#6866f0] hover:text-zinc-300 transition-all duration-300">
        Logout <FaSignOutAlt className="ml-4" />
      </button>
    </div>
  );
};

export default Sidebar;
