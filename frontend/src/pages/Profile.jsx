import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";
import axios from "axios";

const Profile = () => {
  const [Profile, setProfile] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
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
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="gradient-background px-2 md:px-12 flex flex-col md:flex-row  py-8 gap-4 text-black">
      {!Profile ? (
        <div className="w-full h-[100%] flex items-center justify-center">
          {" "}
          <Loader />{" "}
        </div>
      ) : (
        <>
          <div className=" w-full md:w-1/5 h-auto lg:h-screen ">
            <Sidebar data={Profile} />
          </div>
          <div className="w-full md:w-4/5">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
