// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import Loader from "../Loader/Loader";

// // const Settings = () => {
// //   const [value, setValue] = useState({ address: "" });
// //   const [profileData, setProfileData] = useState(null);
// //   const headers = {
// //     id: localStorage.getItem("id"),
// //     authorization: `Bearer ${localStorage.getItem("token")}`,
// //   };

// //   const change = (e) => {
// //     const { name, value } = e.target;
// //     setValue({ ...value, [name]: value });
// //   };

// //   useEffect(() => {
// //     const fetchUserData = async () => {
// //       try {
// //         const response = await axios.get(
// //           "http://localhost:1000/api/v1/get-user-information",
// //           { headers }
// //         );
// //         setProfileData(response.data);
// //         setValue({ address: response.data.address });
// //       } catch (error) {
// //         console.error("Error fetching user information:", error);
// //       }
// //     };

// //     fetchUserData();
// //   }, []); // Empty dependency array to run once on mount

// //   if (!profileData) {
// //     return (
// //       <div className="w-full h-full flex items-center justify-center">
// //         <Loader />
// //       </div>
// //     );
// //   }

// //   const submitAddress = async () => {
// //     const response = await axios.put(
// //       "http://localhost:1000/api/v1/update-address",
// //       value,
// //       { headers }
// //     );
// //     alert(response.data.message);
// //   };

// //   return (
// //     <div className="h-full p-4 bg-purple-800  bg-opacity-20 rounded shadow-md">
// //       <h1 className="text-4xl font-semibold text-gray-800 mb-8">Settings</h1>
// //       <div className="flex gap-8">
// //         <div className="flex flex-col w-1/2">
// //           <label htmlFor="username" className="font-semibold text-gray-700 text-xl">
// //             Username
// //           </label>
// //           <p className="p-2 bg-white bg-opacity-50 rounded shadow-md mt-2 font-semibold">
// //             {profileData.username}
// //           </p>
// //         </div>
// //         <div className="flex flex-col w-full">
// //           <label htmlFor="email" className="font-semibold text-gray-700 text-xl">
// //             Email
// //           </label>
// //           <p className="p-2 bg-white bg-opacity-50 rounded shadow-md mt-2 font-semibold">
// //             {profileData.email}
// //           </p>
// //         </div>
// //       </div>
// //       <div className="mt-8">
// //         <label htmlFor="address" className="font-semibold text-gray-700 text-xl">
// //           Address
// //         </label>
// //         <textarea
// //           className="p-2 bg-white bg-opacity-50 rounded shadow-md mt-2 w-full"
// //           rows="5"
// //           placeholder="Enter your address"
// //           name="address"
// //           value={value.address}
// //           onChange={change}
// //         />
// //       </div>
// //       <div className="mt-8 flex justify-end">
// //         <button
// //           className="bg-yellow-500 bg-opacity-80 border border-zinc-500 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-600"
// //           onClick={submitAddress}
// //         >
// //           Update Address
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Settings;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Loader from "../Loader/Loader";

// const Settings = () => {
//   const [value, setValue] = useState({ address: "" });
//   const [profileData, setProfileData] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);

//   const headers = {
//     id: localStorage.getItem("id"),
//     authorization: `Bearer ${localStorage.getItem("token")}`,
//   };

//   const change = (e) => {
//     const { name, value } = e.target;
//     setValue((prev) => ({ ...prev, [name]: value }));
//   };

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:1000/api/v1/get-user-information",
//           { headers }
//         );
//         setProfileData(response.data);
//         setValue({ address: response.data.address || "" });
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };
//     fetchUserData();
//   }, []);

//   const submitAddress = async () => {
//     try {
//       const response = await axios.put(
//         "http://localhost:1000/api/v1/update-address",
//         value,
//         { headers }
//       );
//       alert(response.data.message);
//       setIsEditing(false);
//     } catch (error) {
//       alert(error.response?.data?.message || "Update failed");
//     }
//   };

//   if (!profileData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FDCFFA] to-white">
//         <Loader />
//       </div>
//     );
//   }

//   return (
//     <div
//       className="min-h-screen p-6 lg:p-12"
//       style={{
//         background: `linear-gradient(135deg, #FDCFFA 0%, #ffffff 50%, #FDCFFA 100%)`,
//       }}
//     >
//       {/* Animated Background Orbs */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div
//           className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-30 animate-pulse"
//           style={{ background: "radial-gradient(circle, #9B5DE0, transparent)" }}
//         ></div>
//         <div
//           className="absolute bottom-20 right-10 w-80 h-80 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"
//           style={{ background: "radial-gradient(circle, #D78FEE, transparent)" }}
//         ></div>
//       </div>

//       <div className="relative z-10 max-w-4xl mx-auto">
//         {/* Glass Card */}
//         <div
//           className="backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border"
//           style={{
//             background: "rgba(255, 255, 255, 0.85)",
//             borderColor: "rgba(215, 143, 238, 0.3)",
//           }}
//         >
//           {/* Header */}
//           <div
//             className="p-8 text-white text-center"
//             style={{ background: `linear-gradient(135deg, #4E56C0 0%, #9B5DE0 100%)` }}
//           >
//             <div className="flex flex-col items-center gap-4">
//               {/* Avatar with Gradient Ring */}
//               <div className="relative">
//                 <div
//                   className="absolute -inset-1 rounded-full opacity-75 animate-ping"
//                   style={{
//                     background: `conic-gradient(#D78FEE, #9B5DE0, #4E56C0, #D78FEE)`,
//                   }}
//                 ></div>
//                 <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl">
//                   <span className="text-3xl font-bold text-[#4E56C0]">
//                     {profileData.username.charAt(0).toUpperCase()}
//                   </span>
//                 </div>
//               </div>
//               <h1 className="text-3xl font-bold">Profile Settings</h1>
//               <p className="text-white/90">Manage your account details</p>
//             </div>
//           </div>

//           {/* Body */}
//           <div className="p-8 space-y-8">
//             {/* Username & Email */}
//             <div className="grid md:grid-cols-2 gap-6">
//               {/* Username */}
//               <div
//                 className="group p-6 rounded-2xl transition-all duration-300 hover:shadow-xl"
//                 style={{
//                   background: "rgba(78, 86, 192, 0.05)",
//                   border: "1px solid rgba(78, 86, 192, 0.2)",
//                 }}
//               >
//                 <label className="flex items-center gap-2 text-sm font-semibold text-[#4E56C0] mb-2">
//                   <div className="w-2 h-2 rounded-full bg-[#9B5DE0]"></div>
//                   Username
//                 </label>
//                 <p className="text-xl font-bold text-gray-800 group-hover:text-[#4E56C0] transition-colors">
//                   {profileData.username}
//                 </p>
//               </div>

//               {/* Email */}
//               <div
//                 className="group p-6 rounded-2xl transition-all duration-300 hover:shadow-xl"
//                 style={{
//                   background: "rgba(155, 93, 224, 0.05)",
//                   border: "1px solid rgba(155, 93, 224, 0.2)",
//                 }}
//               >
//                 <label className="flex items-center gap-2 text-sm font-semibold text-[#9B5DE0] mb-2">
//                   <div className="w-2 h-2 rounded-full bg-[#D78FEE]"></div>
//                   Email Address
//                 </label>
//                 <p className="text-xl font-bold text-gray-800 group-hover:text-[#9B5DE0] transition-colors break-all">
//                   {profileData.email}
//                 </p>
//               </div>
//             </div>

//             {/* Address */}
//             <div
//               className="p-6 rounded-2xl transition-all duration-300"
//               style={{
//                 background: "rgba(215, 143, 238, 0.05)",
//                 border: "1px solid rgba(215, 143, 238, 0.2)",
//               }}
//             >
//               <div className="flex items-center justify-between mb-3">
//                 <label className="flex items-center gap-2 text-sm font-semibold text-[#D78FEE]">
//                   <div className="w-2 h-2 rounded-full bg-[#4E56C0]"></div>
//                   Delivery Address
//                 </label>
//                 <button
//                   onClick={() => setIsEditing(!isEditing)}
//                   className="text-sm font-medium text-[#4E56C0] hover:text-[#9B5DE0] transition-colors"
//                 >
//                   {isEditing ? "Cancel" : "Edit"}
//                 </button>
//               </div>

//               {isEditing ? (
//                 <textarea
//                   className="w-full p-4 rounded-xl outline-none resize-none transition-all duration-300 text-gray-800 placeholder-gray-400"
//                   style={{
//                     background: "rgba(255, 255, 255, 0.7)",
//                     border: "2px solid transparent",
//                     fontSize: "1rem",
//                   }}
//                   onFocus={(e) => e.target.style.borderColor = "#9B5DE0"}
//                   onBlur={(e) => e.target.style.borderColor = "transparent"}
//                   rows="3"
//                   name="address"
//                   value={value.address}
//                   onChange={change}
//                   placeholder="Enter your full address..."
//                 />
//               ) : (
//                 <p className="text-lg font-medium text-gray-700 min-h-[3rem] flex items-center">
//                   {value.address || (
//                     <span className="text-gray-400 italic">No address saved yet</span>
//                   )}
//                 </p>
//               )}
//             </div>

//             {/* Action Buttons */}
//             <div className="flex justify-end gap-4">
//               {isEditing && (
//                 <button
//                   onClick={submitAddress}
//                   className="group relative px-8 py-3 text-white font-bold rounded-full overflow-hidden shadow-xl transition-all duration-300 transform hover:scale-105"
//                   style={{
//                     background: `linear-gradient(135deg, #4E56C0 0%, #9B5DE0 100%)`,
//                   }}
//                 >
//                   <span className="relative z-10 flex items-center gap-2">
//                     Save Changes
//                     <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
//                   </span>
//                   <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Mobile Tagline */}
//         <p className="text-center text-sm text-gray-600 mt-8 max-w-md mx-auto">
//           Your profile is secure and always up to date
//         </p>
//       </div>

//       {/* Custom Animations */}
//       <style jsx>{`
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(20px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeInUp {
//           animation: fadeInUp 0.6s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Settings;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

const Settings = () => {
  const [value, setValue] = useState({ address: "" });
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-user-information",
          { headers }
        );
        setProfileData(response.data);
        setValue({ address: response.data.address || "" });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUserData();
  }, []);

  const submitAddress = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/update-address",
        value,
        { headers }
      );
      alert(response.data.message);
      setIsEditing(false);
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FDCFFA] to-white">
        <Loader />
      </div>
    );
  }

  return (
    // <div
    //   className="min-h-screen p-6 lg:p-12"
    //   style={{
    //     background: `linear-gradient(to bottom, #FDCFFA 0%, #ffffff 100%)`,
    //   }}
    // >
      <div className="max-w-4xl mx-auto">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          
          {/* Header */}
          <div
            className="p-8 text-white text-center"
            style={{ backgroundColor: "#4E56C0" }}
          >
            <div className="flex flex-col items-center gap-4">
              {/* Avatar */}
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-md">
                <span className="text-2xl font-bold" style={{ color: "#4E56C0" }}>
                  {profileData.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <h1 className="text-2xl font-bold">Account Settings</h1>
              <p className="text-sm opacity-90">Manage your profile information</p>
            </div>
          </div>

          {/* Body */}
          <div className="p-8 space-y-8">
            {/* Username & Email */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Username */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#9B5DE0" }}></div>
                  Username
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="font-semibold text-gray-800">{profileData.username}</p>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#D78FEE" }}></div>
                  Email Address
                </label>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="font-semibold text-gray-800 break-all">{profileData.email}</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#4E56C0" }}></div>
                  Delivery Address
                </label>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-sm font-medium hover:underline"
                    style={{ color: "#4E56C0" }}
                  >
                    Edit
                  </button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-3">
                  <textarea
                    className="w-full p-4 rounded-lg border-2 outline-none resize-none text-gray-800 placeholder-gray-400"
                    style={{
                      borderColor: "#9B5DE0",
                      backgroundColor: "#fdfbff",
                    }}
                    rows="3"
                    name="address"
                    value={value.address}
                    onChange={change}
                    placeholder="Enter your full address..."
                  />
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-5 py-2 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={submitAddress}
                      className="px-6 py-2 rounded-lg font-medium text-white transition-colors"
                      style={{ backgroundColor: "#4E56C0" }}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 min-h-[3.5rem] flex items-center">
                  <p className="text-gray-700">
                    {value.address || (
                      <span className="italic text-gray-400">No address saved</span>
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-500 mt-8">
          Your information is secure and only used for order delivery.
        </p>
      </div>
    // </div>
  );
};

export default Settings;