"use client";
import React, { useEffect, useState, useRef } from "react";
import Roadmap from "../roadmap/page";
import { ChevronDown } from "lucide-react";

const Main = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false); // Profile dropdown state
    const [selectedTag, setSelectedTag] = useState(null);
    const [user, setUser] = useState(null);
    const tags = ["AI/Tech", "Productivity", "UI/UX", "Security"];
    const dropdownRef = useRef(null);
    const profileRef = useRef(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
        } else {
            window.location.href = "/login"; // Redirect if no user data
        }
    }, []);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
            if (
                profileRef.current && !profileRef.current.contains(e.target)
            ) {
                setProfileOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user"); // Clear user data
        window.location.href = "/login"; // Redirect to login
    };


    
    return (
      <div className="flex flex-col items-center min-h-screen bg-gray-50">
        <div className="w-full max-w-7xl p-6 relative">
          
          {/* Profile Section - Top Right */}
          {user && (
            <div className="absolute top-6 right-6 flex flex-col items-end gap-3">
              
              {/* Profile Picture & Email */}
              <div className="relative" ref={profileRef}>
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => setProfileOpen((prev) => !prev)}
                >
                  <img
                    src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border border-gray-300"
                  />
                </div>

                {/* Profile Dropdown (Logout) */}
                {profileOpen && (
                  <div
                    className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-xl shadow-md z-10"
                    onClick={handleLogout}
                  >
                    <button
                      className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-100 cursor-pointer rounded-b-xl"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              {/* Dropdown Filter Below Profile */}
              <div className="relative" ref={dropdownRef}>
                <button
                  className="flex gap-2 py-1 px-4 border border-gray-300 rounded-2xl cursor-pointer"
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  {selectedTag || "Show all"} <ChevronDown />
                </button>

                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-md z-10">
                    <ul>
                      <li
                        className={`px-4 py-2 cursor-pointer ${
                          !selectedTag ? "text-blue-600 font-bold bg-blue-100" : ""
                        }`}
                        onClick={() => {
                          setSelectedTag(null);
                          setIsOpen(false);
                        }}
                      >
                        Show all
                      </li>
                      {tags.map((tag) => (
                        <li
                          key={tag}
                          className={`px-4 py-2 cursor-pointer ${
                            selectedTag === tag
                              ? "text-blue-600 font-bold bg-blue-100"
                              : "hover:bg-gray-100"
                          }`}
                          onClick={() => {
                            setSelectedTag(tag);
                            setIsOpen(false);
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
          <div>
            <h1 className="text-3xl font-bold mb-2 ml-3">Roadmaps</h1>
            <p className="text-gray-600 mb-6 ml-3">
              Stay connected with our development journey and get a sneak peek
              at upcoming features! 😉
            </p>
            <Roadmap selectedTag={selectedTag} />
          </div>
        </div>
      </div>
    );
};

export default Main;
