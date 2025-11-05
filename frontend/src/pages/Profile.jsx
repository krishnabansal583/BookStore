import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import MobileNav from "../components/Profile/MobileNav";

const Profile = () => {
  const [profile, setProfile] = useState(null);

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
        console.error("Error fetching profile:", error);
        if (error.response?.status === 403) {
          alert("Access denied. Please log in again.");
        }
      }
    };
    fetchProfile();
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FDCFFA] to-white">
        <Loader />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-4 md:p-8 lg:p-5"
      style={{
        background: `linear-gradient(to bottom, #FDCFFA 0%, #ffffff 100%)`,
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <Sidebar data={profile} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Mobile Nav */}
            <div className="lg:hidden mb-6">
              <MobileNav />
            </div>

            {/* Outlet Content */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;