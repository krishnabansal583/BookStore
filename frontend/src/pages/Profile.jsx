// import React, { useEffect, useState } from "react";
// import Sidebar from "../components/Profile/Sidebar";
// import { Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Loader from "../components/Loader/Loader";
// import axios from "axios";
// import MobileNav from "../components/Profile/MobileNav";

// const Profile = () => {
//   const [Profile, setProfile] = useState(null);

//   const headers = {
//     id: localStorage.getItem("id"),
//     authorization: `Bearer ${localStorage.getItem("token")}`,
//   };

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:1000/api/v1/get-user-information",
//           { headers }
//         );
//         setProfile(response.data);
//       } catch (error) {
//         console.error("Error fetching profile data:", error);
//       }
//     };
//     fetchProfile();
//   }, []);

//   return (
//     <div className="gradient-background px-2 md:px-12 flex flex-col md:flex-row  py-8 gap-4 text-black">
//       {!Profile ? (
//         <div className="w-full h-[100%] flex items-center justify-center">
//           {" "}
//           <Loader />{" "}
//         </div>
//       ) : (
//         <>
//           <div className=" w-full md:w-1/5 h-auto lg:h-screen ">
//             <Sidebar data={Profile} />
//             <MobileNav/>
//           </div>
//           <div className="w-full md:w-4/5">
//             <Outlet />
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default Profile;
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import MobileNav from "../components/Profile/MobileNav";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  const headers = {
    id: localStorage.getItem("id") || false,
    authorization: `Bearer ${localStorage.getItem("token")}` || false
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-user-information",
          { headers }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        if (error.response && error.response.status === 403) {
          alert("You don't have permission to access this resource.");
        }
      }
    };
    fetchProfile();
  }, []);
  
  return (
    <div className="gradient-background px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-black">
      {!profile ? (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="w-full md:w-1/5 h-auto lg:h-screen">
            <Sidebar data={profile} />
          </div>
          <div className="w-full md:w-4/5">
            <MobileNav />
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
