// // import React from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { FaSignOutAlt } from "react-icons/fa";
// // import { useDispatch, useSelector } from "react-redux";
// // import { authActions } from "../../store/auth";

// // const Sidebar = ({ data }) => {
// //   const dispatch = useDispatch();
// //   const history = useNavigate();
// //   const role = useSelector((state) => state.auth.role);
// //   return (
// //     <div className="bg-[#DADEFF] p-5 rounded flex flex-col items-center justify-between h-auto lg:h-[100%]">
// //       <div className="items-center justify-center flex flex-col">
// //         <img src={data.avatar} className="h-[12vh]" alt="Avatar" />
// //         <p className="mt-3 text-xl text-zinc-800 font-semibold">
// //           {data.username}
// //         </p>
// //         <p className="mt-1 text-normal text-zinc-600">{data.email}</p>
// //         <div className="w-full mt-4 h-[1px] bg-zinc-800 hidden lg:block"></div>
// //       </div>

// //       {role === "user" && (
// //         <div className="w-full flex-col items-center justify-center hidden lg:flex">
// //           <Link
// //             to="/profile"
// //             className="text-zinc-800 font-semibold w-full py-2 text-center hover:bg-[#5956E9] hover:text-white rounded transition-all duration-300"
// //           >
// //             Favourites
// //           </Link>

// //           <Link
// //             to="/profile/orderHistory"
// //             className="text-zinc-800 font-semibold w-full py-2 mt-4 text-center hover:bg-[#5956E9]  hover:text-white rounded transition-all duration-300"
// //           >
// //             Order History
// //           </Link>

// //           <Link
// //             to="/profile/settings"
// //             className="text-zinc-800 font-semibold w-full py-2 mt-4 text-center hover:bg-[#5956E9]  hover:text-white rounded transition-all duration-300"
// //           >
// //             Settings
// //           </Link>
// //         </div>
// //       )}
// //       {role === "admin" && (
// //         <div className="w-full flex-col items-center justify-center hidden lg:flex">
// //           <Link
// //             to="/profile"
// //             className="text-zinc-800 font-semibold w-full py-2 text-center hover:bg-[#5956E9] hover:text-white rounded transition-all duration-300"
// //           >
// //             All Orders
// //           </Link>

// //           <Link
// //             to="/profile/add-book"
// //             className="text-zinc-800 font-semibold w-full py-2 mt-4 text-center hover:bg-[#5956E9]  hover:text-white rounded transition-all duration-300"
// //           >
// //             Add Book
// //           </Link>
// //         </div>
// //       )}
// //       <button
// //         className="bg-[#5956E9] w-3/6 lg:w-full mt-4 lg:mt-0 text-zinc-100 font-semibold flex items-center justify-center py-2 rounded hover:bg-[#6866f0] hover:text-zinc-300 transition-all duration-300"
// //         onClick={() => {
// //           dispatch(authActions.logout());
// //           dispatch(authActions.changeRole("user"));
// //           localStorage.clear("id");
// //           localStorage.clear("token");
// //           localStorage.clear("role");
// //           history("/");
// //         }}
// //       >
// //         Logout <FaSignOutAlt className="ml-4" />
// //       </button>
// //     </div>
// //   );
// // };

// // export default Sidebar;

// // components/Profile/Sidebar.jsx
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { FaSignOutAlt, FaUser, FaHeart, FaHistory, FaCog, FaBoxOpen, FaPlus } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import { authActions } from "../../store/auth";

// const Sidebar = ({ data }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const role = useSelector((state) => state.auth.role);

//   const handleLogout = () => {
//     dispatch(authActions.logout());
//     dispatch(authActions.changeRole("user"));
//     localStorage.clear();
//     navigate("/");
//   };

//   const navItems = role === "user"
//     ? [
//         { to: "/profile", label: "Favourites", icon: <FaHeart /> },
//         { to: "/profile/orderHistory", label: "Order History", icon: <FaHistory /> },
//         { to: "/profile/settings", label: "Settings", icon: <FaCog /> },
//       ]
//     : [
//         { to: "/profile", label: "All Orders", icon: <FaBoxOpen /> },
//         { to: "/profile/add-book", label: "Add Book", icon: <FaPlus /> },
//       ];

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-6 h-full flex flex-col justify-between border border-gray-200">
//       {/* User Info */}
//       <div className="text-center">
//         <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#4E56C0] to-[#9B5DE0] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
//           {data.username.charAt(0).toUpperCase()}
//         </div>
//         <h3 className="mt-3 text-lg font-semibold text-gray-800">{data.username}</h3>
//         <p className="text-sm text-gray-600">{data.email}</p>
//       </div>

//       <hr className="my-6 border-gray-200" />

//       {/* Navigation Links */}
//       <nav className="space-y-2">
//         {navItems.map((item) => (
//           <Link
//             key={item.to}
//             to={item.to}
//             className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-[#4E56C0] hover:text-white transition-colors"
//           >
//             <span className="text-lg">{item.icon}</span>
//             <span>{item.label}</span>
//           </Link>
//         ))}
//       </nav>

//       {/* Logout Button */}
//       <button
//         onClick={handleLogout}
//         className="mt-8 w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg font-medium text-white transition-colors"
//         style={{ backgroundColor: "#4E56C0" }}
//         onMouseEnter={(e) => e.target.style.backgroundColor = "#3a4199"}
//         onMouseLeave={(e) => e.target.style.backgroundColor = "#4E56C0"}
//       >
//         <FaSignOutAlt />
//         <span>Logout</span>
//       </button>
//     </div>
//   );
// };

// export default Sidebar;
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUser, FaHeart, FaHistory, FaCog, FaBoxOpen, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);

  const handleLogout = () => {
    dispatch(authActions.logout());
    dispatch(authActions.changeRole("user"));
    localStorage.clear();
    navigate("/");
  };

  const navItems = role === "user"
    ? [
        { to: "/profile", label: "Favourites", icon: <FaHeart /> },
        { to: "/profile/orderHistory", label: "Order History", icon: <FaHistory /> },
        { to: "/profile/settings", label: "Settings", icon: <FaCog /> },
      ]
    : [
        { to: "/profile", label: "All Orders", icon: <FaBoxOpen /> },
        { to: "/profile/add-book", label: "Add Book", icon: <FaPlus /> },
      ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between border border-gray-200 sticky top-8 h-fit">
      {/* User Info */}
      <div className="text-center">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#4E56C0] to-[#9B5DE0] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
          {data.username.charAt(0).toUpperCase()}
        </div>
        <h3 className="mt-3 text-lg font-semibold text-gray-800">{data.username}</h3>
        <p className="text-sm text-gray-600">{data.email}</p>
      </div>

      <hr className="my-6 border-gray-200" />

      {/* Navigation Links */}
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 font-medium hover:bg-[#4E56C0] hover:text-white transition-colors"
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-8 w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg font-medium text-white transition-colors"
        style={{ backgroundColor: "#4E56C0" }}
        onMouseEnter={(e) => e.target.style.backgroundColor = "#3a4199"}
        onMouseLeave={(e) => e.target.style.backgroundColor = "#4E56C0"}
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;