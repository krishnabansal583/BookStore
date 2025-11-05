// import React from "react";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// const MobileNav = () => {
//   const role = useSelector((state) => state.auth.role);
//   return (
//     <>
//       {role === "user" && (
//         <div className="w-full flex lg:hidden justify-between items-center mt-4">
//           {" "}
//           <Link
//             to="/profile"
//             className="text-zinc-800 font-semibold w-full text-center hover:bg-[#5956E9] hover:text-white rounded transition-all duration-300"
//           >
//             Favourites
//           </Link>
//           <Link
//             to="orderHistory"
//             className="text-zinc-800 font-semibold w-full   text-center hover:bg-[#5956E9]  hover:text-white rounded transition-all duration-300"
//           >
//             Order History
//           </Link>
//           <Link
//             to="settings"
//             className="text-zinc-800 font-semibold w-full text-center hover:bg-[#5956E9]  hover:text-white rounded transition-all duration-300"
//           >
//             Settings
//           </Link>
//         </div>
//       )}
//        {role === "admin" && (
//         <div className="w-full flex lg:hidden justify-between items-center mt-4">
//           {" "}
//           <Link
//             to="/profile"
//             className="text-zinc-800 font-semibold w-full text-center hover:bg-[#5956E9] hover:text-white rounded transition-all duration-300"
//           >
//             All Orders
//           </Link>
//           <Link
//             to="orderHistory"
//             className="text-zinc-800 font-semibold w-full   text-center hover:bg-[#5956E9]  hover:text-white rounded transition-all duration-300"
//           >
//           Add Book
//           </Link>
          
//         </div>
//       )}
//     </>
//   );
// };

// export default MobileNav;

// components/Profile/MobileNav.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaHeart,
  FaHistory,
  FaCog,
  FaBoxOpen,
  FaPlus,
} from "react-icons/fa";

const MobileNav = () => {
  const location = useLocation();
  const role = useSelector((state) => state.auth.role);

  // Define navigation items based on role
  const userNav = [
    { to: "/profile", label: "Favourites", icon: <FaHeart /> },
    { to: "/profile/orderHistory", label: "Orders", icon: <FaHistory /> },
    { to: "/profile/settings", label: "Settings", icon: <FaCog /> },
  ];

  const adminNav = [
    { to: "/profile", label: "All Orders", icon: <FaBoxOpen /> },
    { to: "/profile/add-book", label: "Add Book", icon: <FaPlus /> },
  ];

  const navItems = role === "user" ? userNav : adminNav;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="flex justify-around items-center py-3 px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;

          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors min-w-[60px] ${
                isActive
                  ? "text-white"
                  : "text-gray-600 hover:text-[#4E56C0]"
              }`}
              style={{
                backgroundColor: isActive ? "#4E56C0" : "transparent",
              }}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;