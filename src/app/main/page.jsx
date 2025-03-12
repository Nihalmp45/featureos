"use client";
import React, { useEffect, useState, useRef } from "react";
import Roadmap from "../roadmap/page"; // Importing the Roadmap component
import { ChevronDown } from "lucide-react"; // Importing ChevronDown icon for dropdown

const Main = () => {
  const [isOpen, setIsOpen] = useState(false); // State for the tag dropdown (Show all / tags)
  const [profileOpen, setProfileOpen] = useState(false); // State for profile dropdown (for logout)
  const [selectedTag, setSelectedTag] = useState(null); // State for the currently selected tag
  const [user, setUser] = useState(null); // State for storing user information
  const tags = ["AI/Tech", "Productivity", "UI/UX", "Security"]; // Available tags for filtering
  const dropdownRef = useRef(null); // Ref for the dropdown container
  const profileRef = useRef(null); // Ref for the profile container

  // useEffect to check if user data exists in localStorage and redirect to login if not
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser); // If user exists, set user state
    } else {
      window.location.href = "/login"; // If no user, redirect to login page
    }
  }, []);

  // useEffect to handle closing of dropdowns when clicking outside of them
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Close tag dropdown if clicked outside of it
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
      // Close profile dropdown if clicked outside of it
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Add event listener for detecting outside click
    return () => document.removeEventListener("mousedown", handleClickOutside); // Cleanup on unmount
  }, []);

  // Handle user logout, clear user data from localStorage and redirect to login
  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data from localStorage
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl p-6 relative">
        {/* Profile Section - Top Right */}
        {user && (
          <div className="absolute top-6 right-6 flex flex-col items-end gap-3 sm:top-4 sm:right-4">
            {/* Profile Picture & Email */}
            <div className="relative" ref={profileRef}>
              {/* Profile Picture & Toggle Profile Dropdown */}
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => setProfileOpen((prev) => !prev)} // Toggle profile dropdown
              >
                <img
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`} // Generate profile picture using user's email
                  alt="Profile"
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
              </div>

              {/* Profile Dropdown (Logout) */}
              {profileOpen && (
                <div
                  className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-xl shadow-md z-10"
                  onClick={handleLogout} // Call handleLogout on click
                >
                  <button className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-100 cursor-pointer rounded-b-xl">
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Dropdown Filter Below Profile */}
            <div className="relative" ref={dropdownRef}>
              {/* Dropdown button for selecting tags */}
              <button
                className="flex gap-2 py-1 px-4 border border-gray-300 rounded-2xl cursor-pointer"
                onClick={() => setIsOpen((prev) => !prev)} // Toggle dropdown visibility
              >
                {selectedTag || "Show all"} <ChevronDown /> {/* Display selected tag or "Show all" */}
              </button>

              {/* Dropdown options for filtering tags */}
              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-md z-10">
                  <ul>
                    {/* Option for "Show all" tag */}
                    <li
                      className={`px-4 py-2 cursor-pointer ${
                        !selectedTag ? "text-blue-600 font-bold bg-blue-100" : ""
                      }`}
                      onClick={() => {
                        setSelectedTag(null); // Clear selected tag
                        setIsOpen(false); // Close dropdown
                      }}
                    >
                      Show all
                    </li>
                    {/* Map through available tags and create dropdown items */}
                    {tags.map((tag) => (
                      <li
                        key={tag}
                        className={`px-4 py-2 cursor-pointer ${
                          selectedTag === tag
                            ? "text-blue-600 font-bold bg-blue-100"
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => {
                          setSelectedTag(tag); // Set selected tag
                          setIsOpen(false); // Close dropdown after selecting tag
                        }}
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="mt-8 sm:mt-6">
          <h1 className="text-3xl font-bold mb-2 ml-3 sm:text-2xl">Roadmaps</h1>
          <p className="text-gray-600 mb-6 ml-3 sm:text-sm sm:mb-4">
            Stay connected with our development journey and get a sneak peek at upcoming features! 😉
          </p>
          {/* Passing the selectedTag to the Roadmap component for filtering */}
          <Roadmap selectedTag={selectedTag} />
        </div>
      </div>
    </div>
  );
};

export default Main;
