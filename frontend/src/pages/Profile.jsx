import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";
import axios from "axios"; // Ensure axios is imported

const Profile = () => {
  const [Profile, setProfile] = useState(null); // Initialize as null

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-user-information",
          { headers } // Pass headers as third argument
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="gradient-background px-2 md:px-12 flex flex-col md:flex-row h-screen py-8 gap-4 text-black">
      {!Profile ? (
       <div className="w-full h-[100%] flex items-center justify-center"> <Loader /> </div>
      ) : (
        <>
          <div className=" w-full md:w-1/5">
            <Sidebar data={Profile} />
          </div>
          <div className="w-full md:w-3/5">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
