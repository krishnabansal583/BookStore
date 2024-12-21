import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const role = useSelector((state) => state.auth.role);
  return (
    <div className="bg-[#DADEFF] p-5 rounded flex flex-col items-center justify-between h-auto lg:h-[100%]">
      <div className="items-center justify-center flex flex-col">
        <img src={data.avatar} className="h-[12vh]" alt="Avatar" />
        <p className="mt-3 text-xl text-zinc-800 font-semibold">
          {data.username}
        </p>
        <p className="mt-1 text-normal text-zinc-600">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-800 hidden lg:block"></div>
      </div>

      {role === "user" && (
        <div className="w-full flex-col items-center justify-center hidden lg:flex">
          <Link
            to="/profile"
            className="text-zinc-800 font-semibold w-full py-2 text-center hover:bg-[#5956E9] hover:text-white rounded transition-all duration-300"
          >
            Favourites
          </Link>

          <Link
            to="/profile/orderHistory"
            className="text-zinc-800 font-semibold w-full py-2 mt-4 text-center hover:bg-[#5956E9]  hover:text-white rounded transition-all duration-300"
          >
            Order History
          </Link>

          <Link
            to="/profile/settings"
            className="text-zinc-800 font-semibold w-full py-2 mt-4 text-center hover:bg-[#5956E9]  hover:text-white rounded transition-all duration-300"
          >
            Settings
          </Link>
        </div>
      )}
      {role === "admin" && (
        <div className="w-full flex-col items-center justify-center hidden lg:flex">
          <Link
            to="/profile"
            className="text-zinc-800 font-semibold w-full py-2 text-center hover:bg-[#5956E9] hover:text-white rounded transition-all duration-300"
          >
            All Orders
          </Link>

          <Link
            to="/profile/add-book"
            className="text-zinc-800 font-semibold w-full py-2 mt-4 text-center hover:bg-[#5956E9]  hover:text-white rounded transition-all duration-300"
          >
            Add Book
          </Link>
        </div>
      )}
      <button
        className="bg-[#5956E9] w-3/6 lg:w-full mt-4 lg:mt-0 text-zinc-100 font-semibold flex items-center justify-center py-2 rounded hover:bg-[#6866f0] hover:text-zinc-300 transition-all duration-300"
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.clear("id");
          localStorage.clear("token");
          localStorage.clear("role");
          history("/");
        }}
      >
        Logout <FaSignOutAlt className="ml-4" />
      </button>
    </div>
  );
};

export default Sidebar;
