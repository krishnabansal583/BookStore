import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

const Settings = () => {
  const [value, setValue] = useState({ address: "" });
  const [profileData, setProfileData] = useState(null);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...value, [name]: value });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-user-information",
          { headers }
        );
        setProfileData(response.data);
        setValue({ address: response.data.address });
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array to run once on mount

  if (!profileData) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const submitAddress = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/update-address",
      value,
      { headers }
    );
    alert(response.data.message);
  };

  return (
    <div className="h-full p-4 bg-purple-800  bg-opacity-20 rounded shadow-md">
      <h1 className="text-4xl font-semibold text-gray-800 mb-8">Settings</h1>
      <div className="flex gap-8">
        <div className="flex flex-col w-1/2">
          <label htmlFor="username" className="font-semibold text-gray-700 text-xl">
            Username
          </label>
          <p className="p-2 bg-white bg-opacity-50 rounded shadow-md mt-2 font-semibold">
            {profileData.username}
          </p>
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="email" className="font-semibold text-gray-700 text-xl">
            Email
          </label>
          <p className="p-2 bg-white bg-opacity-50 rounded shadow-md mt-2 font-semibold">
            {profileData.email}
          </p>
        </div>
      </div>
      <div className="mt-8">
        <label htmlFor="address" className="font-semibold text-gray-700 text-xl">
          Address
        </label>
        <textarea
          className="p-2 bg-white bg-opacity-50 rounded shadow-md mt-2 w-full"
          rows="5"
          placeholder="Enter your address"
          name="address"
          value={value.address}
          onChange={change}
        />
      </div>
      <div className="mt-8 flex justify-end">
        <button
          className="bg-yellow-500 bg-opacity-80 border border-zinc-500 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-600"
          onClick={submitAddress}
        >
          Update Address
        </button>
      </div>
    </div>
  );
};

export default Settings;
